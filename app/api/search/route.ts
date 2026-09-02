import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

/**
 * D3: statically exported search index. `dynamic = 'force-static'` makes
 * Next.js materialise this GET handler as a real file (`out/api/search`)
 * under output: 'export'; the browser client (`staticClient` wired in
 * RootProvider) fetches it and runs the query client-side.
 */
export const dynamic = 'force-static';

const api = createFromSource(source);

export function GET() {
  return api.staticGET();
}
