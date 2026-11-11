// Works that aren't on ORCID (or have no DOI for Crossref to fill in), added by hand.
// The Publications page merges these with the ORCID list in src/data/publications.json.
// If a work here is later added to ORCID with the same URL, DOI, or title, the ORCID copy wins.
//
// `kind` picks the section: 'article' (peer-reviewed articles) or 'abstract' (conference abstracts).

export interface Author {
  /** "Family Initials", e.g. "Goparaju N". */
  name: string;
  /** True for Niharika, so her name is bolded. */
  self: boolean;
}

export interface Publication {
  title: string;
  journal: string | null;
  authors: Author[];
  /** 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD'; used for ordering. */
  date: string;
  year: string;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  publishedOnline: string | null;
  type: string | null;
  doi: string | null;
  url: string | null;
  kind?: 'article' | 'abstract';
  /** Extra text after the source, e.g. where an abstract was presented. */
  note?: string;
}

const authors = (names: string[]): Author[] => names.map((name) => ({ name, self: name === 'Goparaju N' }));

export const extraPublications: Publication[] = [
  {
    kind: 'article',
    title: 'Magnetic Mishap: Multidisciplinary Care for Magnet Ingestion in a 2-Year-Old',
    journal: 'Emergency Care and Medicine',
    authors: authors(['Goparaju N', 'Yarbrough DP', 'Fuller G']),
    date: '2025-07-08',
    year: '2025',
    volume: '2',
    issue: '3',
    pages: '32',
    publishedOnline: null,
    type: 'journal-article',
    doi: '10.3390/ecm2030032',
    url: 'https://doi.org/10.3390/ecm2030032',
  },
  {
    kind: 'abstract',
    title: 'Artificial Intelligence (AI) Curriculum for Continuing and Graduate Medical Education: A Multi-Center Pilot',
    journal: 'Arthritis & Rheumatology',
    authors: authors([
      'Goparaju N',
      'Nguyen T',
      'East T',
      'Baker J',
      'Zickuhr L',
      'Wang S',
      'Shah K',
      'Sheffield V',
      'Barrison P',
      'Perry L',
      'Guzman N',
      'Wong A',
      'Balczewski E',
    ]),
    date: '2026-11-10',
    year: '2026',
    volume: '78',
    issue: 'suppl 9',
    pages: null,
    publishedOnline: null,
    type: 'conference-abstract',
    doi: null,
    url: 'https://acrabstracts.org/abstract/artificial-intelligence-ai-curriculum-for-continuing-and-graduate-medical-education-a-multi-center-pilot/',
    note: 'Abstract 2897. Presented at ACR Convergence 2026; November 10, 2026.',
  },
];
