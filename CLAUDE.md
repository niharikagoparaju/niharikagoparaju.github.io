# CLAUDE.md

Astro static site for Niharika Goparaju (PEM physician, Dell Children's / UT Austin Dell Med), deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## Layout

- `src/data/site.ts` — name, roles, contact links, photo, disclaimer, nav. Add a nav entry for every new page.
- `src/data/about.md` — home-page bio (markdown).
- `src/data/ai-literacy.ts` — presentations and resource lists rendered by `src/pages/ai-literacy.astro`.
- `public/presentations/`, `public/resources/` — uploaded files, referenced as `/presentations/<file>` etc.
- `src/styles/global.css` — all styling; design tokens at the top.

## Rules

- Commits are authored as Niharika (repo-local git config) and pushed with her SSH key. Do not add `Co-Authored-By` or other AI attribution lines to commit messages.

- The site deploys under `base: '/personal'`. Never hardcode internal hrefs: wrap them in `withBase()` from `src/lib/url.ts`. In markdown, use relative links.
- Do not invent biographical facts, credentials, titles, or talk details. Leave a `TODO` and ask.
- Design: the one decorative motif is the resuscitation-tape color band (`src/components/Band.astro`). Keep everything else quiet; don't add new accent colors, cards, or animations.
- Verify with `npm run check && npm run build` (Node 24 via `nvm use`).
- A future blog should use an Astro content collection (`src/content.config.ts`, posts in `src/content/blog/`).
