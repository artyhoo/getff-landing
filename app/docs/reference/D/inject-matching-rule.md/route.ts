import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export async function GET() {
  const page = source.getPage(["reference","D","inject-matching-rule"]);
  if (!page) throw new Error('Missing admitted framework page: reference/D/inject-matching-rule');
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
