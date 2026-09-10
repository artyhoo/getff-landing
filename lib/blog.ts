import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blog } from '../.source/server';

/**
 * Blog loader over the custom `blog` collection. Unlike `docs` (whose
 * DocsCollectionEntry carries `.toFumadocsSource()`), a plain doc collection
 * resolves to entry arrays in `.source/server`; the standalone
 * `toFumadocsSource(pages, metas)` from fumadocs-mdx/runtime/server is the
 * documented runtime export for this wiring (verified against
 * fumadocs-mdx@15.4.0 dist/runtime/server.d.ts — the collections doc page
 * does not show it).
 */
export const blogSource = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blog, []),
});

/** page.url carries the baseUrl ('/blog/<slug>') — expose the bare slug. */
export function blogSlug(page: (typeof blogSource)['$inferPage']): string {
  return page.url.replace(/^\/blog\//, '');
}
