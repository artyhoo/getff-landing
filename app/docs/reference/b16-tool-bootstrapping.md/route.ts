import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

/**
 * Raw-Markdown twin of /docs/reference/b16-tool-bootstrapping — same pattern as the
 * flat docs twins (see app/docs/factory-overview.md/route.ts), one folder deeper:
 * the slug array is the subfolder-aware ['reference', '<slug>'].
 */
export const dynamic = 'force-static';

export async function GET() {
  const page = source.getPage(['reference', 'b16-tool-bootstrapping']);
  if (!page) {
    return new Response('page not found', { status: 404 });
  }
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
