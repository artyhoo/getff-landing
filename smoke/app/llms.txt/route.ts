import { llms } from 'fumadocs-core/source';
import { source } from '@/lib/source';

/**
 * D4: llms.txt index generated from the actual page tree
 * (fumadocs.dev/docs/integrations/llms). Static export writes out/llms.txt.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(llms(source).index());
}
