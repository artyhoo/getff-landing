/**
 * Shared site constants.
 *
 * The static search client's `from`/`api` URLs are resolved against the site
 * origin by plain `fetch()` — fumadocs-core's internal BASE_PATH default is
 * Vite's `import.meta.env.BASE_URL`, which is undefined under Next.js — so
 * the path must be spelled out explicitly here (BS0 finding, kept).
 */
export const searchApi = '/api/search';

/** Canonical origin — metadataBase, RSS, sitemap. */
export const siteOrigin = 'https://getff.ai';
