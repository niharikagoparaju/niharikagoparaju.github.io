# Niharika Goparaju — personal site

Personal site for Niharika Goparaju, pediatric emergency medicine physician at Dell Children's Medical Center and assistant clinical professor at UT Austin Dell Medical School. Built with [Astro](https://astro.build) and published to GitHub Pages by GitHub Actions.

Live at **https://niharikagoparaju.github.io/**

## Pages

| Page | Source |
| --- | --- |
| About (home) | `src/pages/index.astro`, bio text in `src/data/about.md` |
| AI literacy | `src/pages/ai-literacy/index.astro`, content in `src/data/ai-literacy.ts` |
| AI Toolkit | `src/pages/ai-toolkit/index.astro`, list in `src/data/ai-toolkit.ts` |
| DATA-MD lecture series | `src/pages/ai-literacy/data-md.astro`, sessions in `src/data/ai-literacy.ts`, PDFs in `public/presentations/data-md/` |
| Publications | `src/pages/publications.astro`, list in `src/data/publications.json` (synced from ORCID) plus `src/data/publications-extra.ts` (added by hand) |
| Review game guide | `src/pages/ai-toolkit/review-game.astro`, prompt in `src/data/review-game-prompt.txt`, game in `public/games/pem-jeopardy-ortho.html` |
| Simulation skill guide | `src/pages/ai-toolkit/simulation-builder.astro`, skill zip and example files in `public/skills/` |

Name, roles, contact links, photo, footer, and the nav menu live in `src/data/site.ts`.

## Common edits

**Add a presentation**

1. Copy the `.pptx` into `public/presentations/`.
2. Add an entry to `presentations` in `src/data/ai-literacy.ts` (title, date, and file; venue, description, PDF, and link are optional).
3. Commit and push. The site updates in a minute or two.

The **View slides** button opens the deck in Microsoft's free online viewer, so visitors don't need PowerPoint. That viewer can only reach the public site, so it won't work in local preview. Keep each file under 100 MB (GitHub's limit). Exporting a PDF copy too is a good idea for phones.

**Add a handout or link:** put files in `public/resources/` and add them to `resources` in `src/data/ai-literacy.ts`.

**Publications:** the list syncs from ORCID ([0000-0003-3983-4355](https://orcid.org/0000-0003-3983-4355)) before every build, and the site rebuilds weekly, so new works added to ORCID appear automatically. To refresh by hand, run `npm run publications`. Works that aren't on ORCID (such as conference abstracts) go in `src/data/publications-extra.ts`; set `kind: 'abstract'` to list one under Conference abstracts.

**Edit the bio:** `src/data/about.md`.

**Add a photo:** save it as `public/headshot.jpg` and set `photo: '/headshot.jpg'` in `src/data/site.ts`.

## Local preview

Needs Node 24 (see `.nvmrc`).

```sh
nvm use
npm install
npm run dev      # http://localhost:4321/
npm run build    # production build into dist/
npm run check    # type-check
```

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it. One-time setup: in the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
