// Refreshes src/data/publications.json from Niharika's public ORCID record, filling in
// citation details (authors, volume, issue, pages, print and online dates) from Crossref.
// Runs automatically before every build (npm "prebuild"). If ORCID can't be reached, it keeps
// the existing file so the build still succeeds. If Crossref can't be reached for a work, that
// work keeps the details from the last saved list (or, for a new work, what ORCID has).
import { readFile, writeFile } from 'node:fs/promises';

const ORCID = '0000-0003-3983-4355';
const SELF = { family: 'Goparaju', given: 'N' };
const OUT = new URL('../src/data/publications.json', import.meta.url);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function getJson(url, attempts = 3) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': 'personal-site-publications/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) return res.json();
    // Rate limited or a temporary server error: wait and retry.
    if ((res.status === 429 || res.status >= 500) && attempt < attempts) {
      await sleep((Number(res.headers.get('retry-after')) || attempt * 2) * 1000);
      continue;
    }
    throw new Error(`${url}: HTTP ${res.status}`);
  }
}
const orcid = (path) => getJson(`https://pub.orcid.org/v3.0/${ORCID}${path}`);

// "Jesse M" + "Pines" -> "Pines JM"
const initials = (given = '') =>
  given.split(/[\s.-]+/).filter(Boolean).map((part) => part[0].toUpperCase()).join('');
const author = (given, family) => ({
  name: `${family} ${initials(given)}`.trim(),
  self: family === SELF.family && initials(given).startsWith(SELF.given),
});
const isoDate = (parts) => (parts ? parts.map((n) => String(n).padStart(2, '0')).join('-') : null);
const stripTags = (text) => text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function fromCrossref(doi) {
  const { message: m } = await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  const print = isoDate(m['published-print']?.['date-parts']?.[0] ?? m['journal-issue']?.['published-print']?.['date-parts']?.[0]);
  const online = isoDate(m['published-online']?.['date-parts']?.[0] ?? m.issued?.['date-parts']?.[0]);
  const date = print ?? online;
  const pages = m.page ? m.page.replace(/^(\w+)-\1$/, '$1') : (m['article-number'] ?? null);
  return {
    title: m.title?.[0] ? stripTags(m.title[0]) : null,
    journal: m['container-title']?.[0] ?? null,
    authors: (m.author ?? []).filter((a) => a.family).map((a) => author(a.given, a.family)),
    date,
    volume: m.volume ?? null,
    issue: m.issue ?? null,
    pages,
    // Note the online date when the print issue came out in a later year.
    publishedOnline: print && online && online.slice(0, 4) !== print.slice(0, 4) ? online : null,
  };
}

try {
  const current = await readFile(OUT, 'utf8').catch(() => '');
  const previous = new Map((current ? JSON.parse(current).publications : []).filter((p) => p.doi).map((p) => [p.doi, p]));
  const { group } = await orcid('/works');
  const works = await Promise.all(group.map((g) => orcid(`/work/${g['work-summary'][0]['put-code']}`)));
  const publications = [];
  // One work at a time, to stay within Crossref's rate limits.
  for (const w of works) publications.push(await (async () => {
      const ids = w['external-ids']?.['external-id'] ?? [];
      const doi = ids.find((id) => id['external-id-type'] === 'doi')?.['external-id-value'] ?? null;
      const d = w['publication-date'] ?? {};
      const base = {
        title: w.title?.title?.value ?? 'Untitled',
        journal: w['journal-title']?.value ?? null,
        authors: (w.contributors?.contributor ?? [])
          .map((c) => c['credit-name']?.value)
          .filter(Boolean)
          .map((full) => {
            const parts = full.trim().split(/\s+/);
            return author(parts.slice(0, -1).join(' '), parts.at(-1));
          }),
        date: [d.year?.value, d.month?.value, d.day?.value].filter(Boolean).join('-'),
        volume: null,
        issue: null,
        pages: null,
        publishedOnline: null,
      };
      let extra = {};
      if (doi) {
        try {
          extra = await fromCrossref(doi);
        } catch (error) {
          const saved = previous.get(doi);
          if (saved) {
            const { title, journal, authors, date, volume, issue, pages, publishedOnline } = saved;
            extra = { title, journal, authors, date, volume, issue, pages, publishedOnline };
          }
          console.warn(`publications: Crossref lookup failed for ${doi} (${error.message}); using ${saved ? 'the last saved details' : 'ORCID data'}.`);
        }
      }
      const merged = { ...base };
      for (const [key, value] of Object.entries(extra)) {
        if (value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) merged[key] = value;
      }
      return {
        ...merged,
        year: merged.date.slice(0, 4),
        type: w.type ?? null,
        doi,
        url: doi ? `https://doi.org/${doi}` : (w.url?.value ?? null),
      };
  })());
  publications.sort((a, b) => b.date.localeCompare(a.date));

  const next = JSON.stringify({ orcid: ORCID, publications }, null, 2) + '\n';
  if (next !== current) await writeFile(OUT, next);
  console.log(`publications: ${publications.length} works from ORCID${next === current ? ' (unchanged)' : ' (updated)'}`);
} catch (error) {
  console.warn(`publications: could not refresh from ORCID (${error.message}); keeping the existing list.`);
}
