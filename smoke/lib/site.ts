/**
 * Shared site constants.
 *
 * The static client's `from`/`api` URLs are resolved against the site origin
 * by plain `fetch()` — fumadocs-core's internal BASE_PATH default is Vite's
 * `import.meta.env.BASE_URL`, which is undefined under Next.js — so the
 * basePath prefix must be spelled out explicitly here.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/getff-docs-smoke';
