/**
 * BS0 leg-A gate row 6: query the exported static search index using the
 * SAME client stack the browser uses (`staticClient` from fumadocs-core),
 * pointed at the served export, and require the ported page to come back.
 *
 * Usage: node scripts/verify-search.mjs [index-url] [query]
 * Exit 0 = ported page found in results; exit 1 = not found / no results.
 */
import { staticClient } from 'fumadocs-core/search/client/orama-static';

const from = process.argv[2] ?? 'http://localhost:8099/getff-docs-smoke/api/search';
const query = process.argv[3] ?? 'live-fired';

const client = staticClient({ from });
const results = await client.search(query);

console.log(`index:  ${from}`);
console.log(`query:  ${query}`);
console.log(`results (${results.length}):`);
for (const r of results) {
  console.log(`  - type=${r.type} url=${r.url}${r.content ? ` content=${JSON.stringify(r.content.slice(0, 80))}` : ''}`);
}

const hit = results.some((r) => r.url?.replace(/\/$/, '').endsWith('/docs/executable-agents-md'));
if (!hit) {
  console.error('FAIL: ported page /docs/executable-agents-md not in results');
  process.exit(1);
}
console.log('PASS: ported page returned by static search');
