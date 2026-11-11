# CLAUDE.md

Astro static site for Niharika Goparaju (PEM physician, Dell Children's / UT Austin Dell Med), deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## Layout

- `src/data/site.ts` — name, roles, contact links, photo, disclaimer, nav. Add a nav entry for every new page.
- `src/data/about.md` — home-page bio (markdown).
- `src/data/ai-literacy.ts` — AI literacy page content: `lectures`, plus optional `presentations` and `resources`.
- `src/data/ai-toolkit.ts` — AI Toolkit page: `tools`, one entry per guide page in `src/pages/ai-toolkit/`.
- `src/data/publications.json` — generated from ORCID by `scripts/fetch-publications.mjs` (runs as `prebuild`; keeps the old file if ORCID is down). Don't hand-edit; fix the record on ORCID instead.
- `src/data/publications-extra.ts` — hand-added works that aren't on ORCID (e.g. conference abstracts with no DOI). `kind: 'abstract'` puts a work under Conference abstracts instead of Peer-reviewed articles. An ORCID entry with the same DOI, URL, or title replaces the hand-added one.
- `public/presentations/`, `public/resources/` — uploaded files, referenced as `/presentations/<file>` etc.
- `public/games/pem-jeopardy-ortho.html` — the review game. Must stay a single self-contained file (no external CSS/JS/fonts) so visitors can download and run it offline. All content lives in the JSON `GAME` block between the `GAME CONTENT: START/END` comments; `downloadGame()` relies on those markers. The guide page (`src/pages/ai-toolkit/review-game.astro`) reads that block at build time.
- `public/skills/pem-simulation-builder.zip` — the simulation skill, built in the separate `~/git/sim-drafter` repo (`scripts/package.sh`) and copied here. Keep the filename; the install shortcuts on `src/pages/ai-toolkit/simulation-builder.astro` refer to it.
- `public/skills/example-dka/` — the skill's raw output from one test run (`sim-drafter/tests/evals/results/v2-A`), shown on the simulation page as unreviewed examples. Keep them byte-for-byte; the page promises they are exactly what the AI produced.
- `src/data/review-game-prompt.txt` — the prompt shown on the guide page. Its JSON format must match what the game's `parseGame()` accepts.
- `src/styles/global.css` — all styling; design tokens at the top.

## Rules

- Commits are authored as Niharika (repo-local git config) and pushed with her SSH key. Do not add `Co-Authored-By` or other AI attribution lines to commit messages.

- The site is served from the root (`https://niharikagoparaju.github.io/`), but still wrap internal hrefs in `withBase()` from `src/lib/url.ts` so a future `base` or domain change stays a one-line config edit. In markdown, use relative links.
- Do not invent biographical facts, credentials, titles, or talk details. Leave a `TODO` and ask.
- Design: the one decorative motif is the resuscitation-tape color band (`src/components/Band.astro`). Keep everything else quiet; don't add new accent colors, cards, or animations.
- In `.astro` markup, never start or end a line with an inline tag (`<strong>`, `<a>`, `<code>`, `<em>`): Astro drops the line-break space beside it, gluing words together. Keep a word on the same line as the tag.
- When a published page moves, add the old path to `redirects` in `astro.config.mjs` so shared links keep working.
- Verify with `npm run check && npm run build` (Node 24 via `nvm use`).
- A future blog should use an Astro content collection (`src/content.config.ts`, posts in `src/content/blog/`).
