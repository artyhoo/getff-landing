/**
 * check-redirects.mjs — the redirect coverage gate over the enumerated
 * old-URL list (R7/R21/D33/D37, S1 BUILD). Runs post-build + post-stub-writer.
 *
 * Every URL in old-urls.txt must be in EXACTLY ONE of three states:
 *   1. REAL  — out/ serves a built page (index.html) or a real file
 *   2. STUB  — listed in the stub manifest with an EXISTING target, the
 *              stub file on disk carries the stub marker, its target exists
 *   3. RETIRED — listed in retired-urls.txt (404s by design; P-AC)
 * An unlisted URL that resolves to nothing = coverage hole = FAIL.
 *
 * Additional assertions:
 *   · D33/R21 census URLs must be REAL — a stub there is a FAILURE.
 *   · No stub shadows a real page (the writer refuses; this re-checks the
 *     surviving state via the manifest + the build output).
 *   · No stub URL appears in out/llms.txt (R21 exclusion).
 *   · --framework-full <dir> (D37/D51(5)): greps the framework's own
 *     surfaces (README.md, docs/**, docs/site/llms-head.txt,
 *     packages/core/README.md) for every retired URL — a hit is an ERROR
 *     (fix the reference or un-retire the URL as a stub).
 *
 * Logging: counts + classifications at INFO; every failure names the URL
 * and the state found. Exit non-zero on any failure.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = process.env.OUT_DIR ? resolve(process.env.OUT_DIR) : resolve(REPO_ROOT, 'out');
const OLD_URLS = resolve(REPO_ROOT, 'old-urls.txt');
const RETIRED = resolve(REPO_ROOT, 'retired-urls.txt');
const MANIFEST = resolve(OUT_DIR, '.redirect-stubs.json');
const DEBUG = process.env.LOG_LEVEL === 'debug';
const T0 = Date.now();
const info = (m) => console.log(`[check-redirects] ${m}`);
const warn = (m) => console.warn(`[check-redirects] WARN: ${m}`);
const die = (msg, urls = []) => {
  console.error(`[check-redirects] FAIL: ${msg}`);
  for (const u of urls.slice(0, DEBUG ? urls.length : 20)) console.error(`  ✗ ${u}`);
  if (urls.length > 20 && !DEBUG) console.error(`  …and ${urls.length - 20} more (LOG_LEVEL=debug to see all)`);
  process.exit(1);
};

// ── D33 census URLs — must resolve to REAL content, never a stub ────────────
const CENSUS = [
  '/docs/quickstart-ts',
  '/docs/quickstart-rust',
  '/docs/executable-agents-md',
  '/docs/faq',
  '/docs/limits',
  '/',
  '/consulting',
  '/blog/',
  '/blog/executable-agents-md',
  '/rss.xml',
  '/llms.txt',
].map((u) => (u !== '/' && !u.endsWith('/') && !/\.[a-z0-9]+$/i.test(u) ? `${u}/` : u));

// ── Load inputs ──────────────────────────────────────────────────────────────
if (!existsSync(OUT_DIR)) die(`out/ absent at ${OUT_DIR} — run \`next build\` + the stub writer first`);
const enumerated = readFileSync(OLD_URLS, 'utf8')
  .split('\n')
  .map((l) => l.replace(/#.*$/, '').trim())
  .filter(Boolean);
info(`enumerated URLs: ${enumerated.length} (from old-urls.txt)`);

const retired = new Map();
for (const line of readFileSync(RETIRED, 'utf8').split('\n')) {
  const l = line.replace(/#.*$/, '').trim();
  if (!l) continue;
  const [url, ...reason] = l.split(/\s+/);
  retired.set(url, reason.join(' ') || '(no reason given)');
}
info(`retired URLs: ${retired.size}`);

let stubs = [];
if (existsSync(MANIFEST)) {
  stubs = JSON.parse(readFileSync(MANIFEST, 'utf8')).stubs ?? [];
}
info(`stub manifest: ${stubs.length} stub(s)`);

// ── State helpers ────────────────────────────────────────────────────────────
const stubBySource = new Map(stubs.map((s) => [s.source, s]));
const norm = (u) => (u !== '/' && !/\.[a-z0-9]+$/i.test(u) && !u.endsWith('/') ? `${u}/` : u);
const STUB_MARKER = 'redirect stub written by scripts/write-redirect-stubs.mjs';

/**
 * A REAL page = a BUILT artifact in out/. A stub sitting at the same path is
 * NOT a real page — manifest sources are excluded first, or a stub would
 * masquerade as real content and the census arm could never fire.
 */
function realPage(urlPath) {
  if (stubBySource.has(urlPath) || stubBySource.has(urlPath.replace(/\/$/, ''))) return false;
  const asDir = resolve(OUT_DIR, urlPath.replace(/^\//, ''), 'index.html');
  if (existsSync(asDir)) return true;
  const asFile = resolve(OUT_DIR, urlPath.replace(/^\//, ''));
  if (!existsSync(asFile)) return false;
  return statSync(asFile).isFile() && !asFile.endsWith('.redirect-stubs.json');
}

// ── Classify every enumerated URL ────────────────────────────────────────────
const missing = [];
const classified = { real: 0, stub: 0, retired: 0 };
for (const raw of enumerated) {
  const url = norm(raw);
  if (realPage(url)) {
    classified.real++;
    continue;
  }
  const stub = stubBySource.get(url) ?? stubBySource.get(url.replace(/\/$/, ''));
  if (stub) {
    // stub file exists on disk + carries the marker + target exists
    const shape = stub.shape === 'file' ? resolve(OUT_DIR, stub.source.replace(/^\//, '')) : resolve(OUT_DIR, stub.source.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
    const onDisk = existsSync(shape) && readFileSync(shape, 'utf8').includes(STUB_MARKER);
    const targetOk = realPage(norm(stub.destination));
    if (!onDisk) die(`stub ${url} is in the manifest but the file on disk is missing or not a stub`);
    if (!targetOk) die(`stub ${url} targets ${stub.destination} which does not exist in out/`);
    classified.stub++;
    continue;
  }
  if (retired.has(url) || retired.has(url.replace(/\/$/, ''))) {
    classified.retired++;
    continue;
  }
  missing.push(url);
}
info(`classified: ${classified.real} real · ${classified.stub} stub · ${classified.retired} retired`);
if (missing.length) die('enumerated URL(s) with NO state — neither a real page, nor a stub, nor retired:', missing);

// ── Census: must be REAL ─────────────────────────────────────────────────────
const censusViolations = CENSUS.filter((c) => {
  if (realPage(c)) return false;
  return stubBySource.has(c) || stubBySource.has(c.replace(/\/$/, ''));
});
if (censusViolations.length) die('D33 census URL(s) resolve to a STUB — census pages must be REAL content:', censusViolations);
for (const c of CENSUS) {
  if (!realPage(c)) die(`census URL ${c} does not resolve in out/ at all (real content required)`);
}
info(`census: all ${CENSUS.length} D33 URLs resolve to REAL content`);

// ── No stub shadows a real page ──────────────────────────────────────────────
const shadows = stubs.filter((s) => {
  const shape = s.shape === 'file' ? resolve(OUT_DIR, s.source.replace(/^\//, '')) : resolve(OUT_DIR, s.source.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  if (!existsSync(shape)) return false;
  const content = readFileSync(shape, 'utf8');
  return !content.includes(STUB_MARKER);
});
if (shadows.length) die('stub source(s) whose on-disk artifact is NOT our stub — a stub may be shadowing a real page:', shadows.map((s) => s.source));

// Reverse sweep (tamper): a stub-marked artifact on disk that the manifest
// does NOT list — e.g. a stub planted at a census URL without a manifest
// entry. Reads only the artifacts of URLs classified REAL (html/md, <2 MB).
const tampered = [];
for (const raw of enumerated) {
  const url = norm(raw);
  if (stubBySource.has(url) || stubBySource.has(url.replace(/\/$/, ''))) continue;
  const asDir = resolve(OUT_DIR, url.replace(/^\//, ''), 'index.html');
  const asFile = existsSync(asDir) ? asDir : resolve(OUT_DIR, url.replace(/^\//, ''));
  if (!existsSync(asFile) || !/\.(html|md)$/.test(asFile)) continue;
  if (statSync(asFile).size > 2 * 1024 * 1024) continue;
  if (readFileSync(asFile, 'utf8').includes(STUB_MARKER)) tampered.push(url);
}
if (tampered.length) die('stub-marked artifact(s) on disk that the stub manifest does NOT list — planted or stale:', tampered);
info('no-shadow: every stub source carries exactly our stub artifact; no unlisted stubs on disk');

// ── No stub URL in out/llms.txt (R21) ────────────────────────────────────────
const llmsPath = resolve(OUT_DIR, 'llms.txt');
if (existsSync(llmsPath) && stubs.length) {
  const llms = readFileSync(llmsPath, 'utf8');
  const hits = stubs.filter((s) => llms.includes(s.source)).map((s) => s.source);
  if (hits.length) die('stub URL(s) appear in out/llms.txt — stubs are excluded from the LLM surface (D33 via R21):', hits);
  info('llms.txt: no stub URL present');
}

// ── D37/D51(5): retired URLs must not be referenced from framework surfaces ──
const fwIdx = process.argv.indexOf('--framework-full');
if (fwIdx !== -1) {
  const fwDir = resolve(process.argv[fwIdx + 1] ?? '');
  if (!existsSync(fwDir)) die(`--framework-full directory not found: ${fwDir} (fetch with: node scripts/fetch-framework.mjs --full <dir>)`);
  const surfaces = ['README.md', 'docs', 'docs/site/llms-head.txt', 'packages/core/README.md'];
  const corpus = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(md|txt)$/.test(e.name)) corpus.push(full);
    }
  };
  for (const s of surfaces) {
    const p = resolve(fwDir, s);
    if (!existsSync(p)) continue;
    if (statSync(p).isDirectory()) walk(p);
    else corpus.push(p);
  }
  info(`--framework-full: ${fwDir} — ${corpus.length} surface file(s) in corpus`);
  if (!corpus.length) die('--framework-full corpus is empty — the checkout layout does not match the expected surfaces');

  const hits = [];
  for (const [url] of retired) {
    for (const file of corpus) {
      let text;
      try {
        text = readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      if (text.includes(url)) hits.push(`${url} referenced in ${file.replace(fwDir, '')}`);
    }
  }
  if (hits.length) {
    die('retired URL(s) still referenced from the framework\'s own surfaces (fix the reference or un-retire as a stub — D37):', hits);
  }
  info('framework surfaces: no retired URL referenced');
} else {
  warn('skipping --framework-full arm (no directory given) — required in CI (D51(5) cadence)');
}

info(`done in ${Date.now() - T0}ms`);
console.log(`REDIRECT_COVERAGE=PASS (${enumerated.length} enumerated: ${classified.real} real / ${classified.stub} stub / ${classified.retired} retired)`);
