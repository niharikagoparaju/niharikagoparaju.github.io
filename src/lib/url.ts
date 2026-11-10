const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-relative path ("/ai-literacy/") with the deploy base. External URLs pass through. */
export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  return encodeURI(`${base}/${path.replace(/^\//, '')}`);
}

/** Full public URL for a site-relative path, e.g. for the Office slide viewer. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) throw new Error('Set `site` in astro.config.mjs');
  return new URL(withBase(path), site).href;
}
