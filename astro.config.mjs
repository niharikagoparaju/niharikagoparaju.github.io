// @ts-check
import { defineConfig } from 'astro/config';

// The repo is named "niharikagoparaju.github.io", so GitHub serves the site at the root:
//   https://niharikagoparaju.github.io/
// For a custom domain, set `site` to it and add public/CNAME containing the domain.
export default defineConfig({
  site: 'https://niharikagoparaju.github.io',
  // Pages that moved. Old links get a page that forwards to the new address.
  redirects: {
    '/ai-literacy/review-game': '/ai-toolkit/review-game/',
  },
});
