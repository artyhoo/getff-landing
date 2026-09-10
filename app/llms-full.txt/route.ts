import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

/**
 * D4: llms-full.txt — every page's processed Markdown, generated from the
 * same source the HTML pages render from. Static export writes
 * out/llms-full.txt.
 */
export const dynamic = 'force-static';

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);
  return new Response(scanned.join('\n\n'));
}
