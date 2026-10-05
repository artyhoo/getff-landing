/**
 * write-redirect-stubs.mjs — materialise redirect stubs into out/
 * (R7/D33/D37, S1 BUILD). Runs POST-`next build` (redirects() and headers()
 * are inert under `output: 'export'` — literal files are the only mechanism).
 *
 * BOTH SHAPES (rollout spec Redirect contract):
 *   · directory URL `/docs/foo/`    → out/docs/foo/index.html
 *   · file-shaped URL `/docs/b.md` → out/docs/b.md (a literal file —
 *     out/docs/b.md/index.html is NOT served at that path)
 *
 * Every stub carries: a meta-refresh to the successor, a <link rel="canonical">
 * to the successor, and a visible link. NO `noindex` (D33 amended
 * 2026-09-14: contradictory beside a cross-URL canonical, R21).
 *
 * SHADOW PREVENTION: the writer REFUSES to write a stub where `out/` already
 * serves a real page — a stub must never shadow a real page (the coverage
 * checker re-asserts the surviving state).
 *
 * STUB MANIFEST: the writer records every stub it wrote in
 * out/.redirect-stubs.json (source, target, shape) — the machine-readable
 * contract consumed by scripts/check-redirects.mjs and the S1 measurement
 * (stub count printed; must equal the mapping size).
 *
 * Logging: one INFO line per stub (source → target, shape); failures name
 * the URL. Exit non-zero on any refusal or write error.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = process.env.OUT_DIR ? resolve(process.env.OUT_DIR) : resolve(REPO_ROOT, 'out');
const MAP_FILE = resolve(REPO_ROOT, 'redirects.json');
const MANIFEST = resolve(OUT_DIR, '.redirect-stubs.json');
const T0 = Date.now();
const info = (m) => console.log(`[write-redirect-stubs] ${m}`);
const die = (m) => {
  console.error(`[write-redirect-stubs] FAIL: ${m}`);
  process.exit(1);
};

if (!existsSync(OUT_DIR)) die(`out/ is absent at ${OUT_DIR} — run \`next build\` first (stubs are written POST-build)`);
if (!existsSync(MAP_FILE)) die(`redirect map not found at ${MAP_FILE}`);

const map = JSON.parse(readFileSync(MAP_FILE, 'utf8'));
const rows = map.filter((r) => r.source && r.destination);
info(`redirect map: ${rows.length} row(s) from ${MAP_FILE}`);

/** Does `out/` serve REAL content at this URL? (a built page or a real file) */
function isRealPage(urlPath) {
  const asDir = resolve(OUT_DIR, urlPath.replace(/^\//, ''), 'index.html');
  if (existsSync(asDir)) return true;
  const asFile = resolve(OUT_DIR, urlPath.replace(/^\//, '').replace(/\/$/, ''));
  return existsSync(asFile) && statSync(asFile).isFile() && !asFile.endsWith('.redirect-stubs.json');
}

const stubPage = (source, dest) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<!-- redirect stub written by scripts/write-redirect-stubs.mjs (R7/D33) -->
<meta http-equiv="refresh" content="0; url=${dest}">
<link rel="canonical" href="${dest}">
<title>Redirecting to ${dest}</title>
</head>
<body>
<p>This page has moved to <a href="${dest}">${dest}</a>.</p>
<script>location.replace('${dest}');</script>
</body>
</html>
`;

const written = [];
for (const row of rows) {
  const { source, destination } = row;
  if (isRealPage(source)) {
    die(`refusing to stub ${source} — a REAL page already exists there (a stub must never shadow a real page)`);
  }
  if (!isRealPage(destination)) {
    die(`stub target ${destination} (for ${source}) does not exist in out/ — a stub must map to a real target`);
  }
  const fileShaped = /\.[a-z0-9]+$/i.test(source.replace(/\/$/, ''));
  if (fileShaped) {
    // A file-shaped stub must be a literal FILE. If a directory already sits
    // at that path, writeFileSync would die with a bare EISDIR stack — name
    // the collision instead (the shape contract the coverage gate checks).
    const asDirPath = resolve(OUT_DIR, source.replace(/^\//, '').replace(/\/$/, ''));
    if (existsSync(asDirPath) && statSync(asDirPath).isDirectory()) {
      die(`file-shaped stub ${source} collides with an existing DIRECTORY in out/ — a file-shaped stub must be written as a literal file, not over a directory`);
    }
  }
  const target = fileShaped
    ? resolve(OUT_DIR, source.replace(/^\//, '')) // out/docs/b.md — literal file
    : resolve(OUT_DIR, source.replace(/^\//, '').replace(/\/$/, ''), 'index.html'); // out/docs/foo/index.html
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, stubPage(source, destination));
  written.push({ source, destination, shape: fileShaped ? 'file' : 'directory' });
  info(`stub: ${source} → ${destination} [${fileShaped ? 'file' : 'directory'}]`);
}

writeFileSync(MANIFEST, `${JSON.stringify({ generatedBy: 'scripts/write-redirect-stubs.mjs', stubs: written }, null, 2)}\n`);
info(`manifest: ${MANIFEST} — ${written.length} stub(s)`);
if (written.length !== rows.length) die(`stub count ${written.length} != mapping size ${rows.length} (S1 measurement: they must be equal)`);
info(`done in ${Date.now() - T0}ms`);
console.log(`STUB_COUNT=${written.length}`);
