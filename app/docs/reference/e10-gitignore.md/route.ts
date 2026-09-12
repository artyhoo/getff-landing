import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

/**
 * Raw-Markdown twin of the docs page — a REAL file in the static export
 * (`out/docs/reference/e10-gitignore.md`), served as text/markdown.
 *
 * Fumadocs' documented pattern puts twins behind `rewrites()`, which
 * `output: 'export'` does not support; a literal route segment (the `.md`
 * folder) is the static-export equivalent. Content is composed from the SAME
 * source as the HTML page — nothing here is hand-copied.
 */
export const dynamic = 'force-static';

export async function GET() {
  const page = source.getPage(['reference', 'e10-gitignore']);
  if (!page) {
    return new Response('page not found', { status: 404 });
  }
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
