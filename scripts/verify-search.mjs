/**
 * §3 gate row 10: query the exported static search index using the
 * SAME client stack the browser uses (`staticClient` from fumadocs-core),
 * pointed at the served export, and require the ported page to come back.
 *
 * Usage: node scripts/verify-search.mjs [index-url] [query] [expected-slug]
 * Exit 0 = expected page found in results; exit 1 = not found / no results.
 * `expected-slug` defaults to the BS1 ported page; pass a docs slug
 * (e.g. `quickstart-python`) to assert a different page comes back.
 */
import { staticClient } from 'fumadocs-core/search/client/orama-static';

const from = process.argv[2] ?? 'http://localhost:8099/api/search';
const query = process.argv[3] ?? 'live-fired';
const expected = process.argv[4] ?? 'executable-agents-md';

const client = staticClient({ from });
const results = await client.search(query);

console.log(`index:  ${from}`);
console.log(`query:  ${query}`);
console.log(`expect: /docs/${expected}`);
console.log(`results (${results.length}):`);
for (const r of results) {
  console.log(`  - type=${r.type} url=${r.url}${r.content ? ` content=${JSON.stringify(r.content.slice(0, 80))}` : ''}`);
}

const hit = results.some((r) => r.url?.replace(/\/$/, '').endsWith(`/docs/${expected}`));
if (!hit) {
  console.error(`FAIL: page /docs/${expected} not in results`);
  process.exit(1);
}
console.log(`PASS: /docs/${expected} returned by static search`);
