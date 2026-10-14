import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export async function GET() {
  const page = source.getPage(["quick-start"]);
  if (!page) throw new Error('Missing admitted framework page: quick-start');
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
