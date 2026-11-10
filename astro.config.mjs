// @ts-check
import { defineConfig } from 'astro/config';

// The repo is named "personal", so GitHub serves the site at
//   https://niharikagoparaju.github.io/personal/
// If the repo is renamed to "niharikagoparaju.github.io", delete the `base` line.
// For a custom domain, set `site` to it, delete `base`, and add public/CNAME.
export default defineConfig({
  site: 'https://niharikagoparaju.github.io',
  base: '/personal',
});
