import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export async function GET() {
  const page = source.getPage(["ai-agents"]);
  if (!page) throw new Error('Missing admitted framework page: ai-agents');
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
