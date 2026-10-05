import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

/**
 * Raw-Markdown twin of the docs HUB page (`/docs/`) — the one twin that was
 * missing (D10 falsifier: a page whose copy action points at a twin that
 * does not exist 404s). Follows the existing twin pattern exactly
 * (`app/docs/faq.md/route.ts`): a REAL file in the static export
 * (`out/docs/index.md`), composed from the SAME source as the HTML page.
 *
 * The hub's content file is content/docs/index.md → slug `[]`.
 */
export const dynamic = 'force-static';

export async function GET() {
  const page = source.getPage([]);
  if (!page) {
    return new Response('page not found', { status: 404 });
  }
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
