/**
 * generate-old-urls.mjs — enumerate the live surface into old-urls.txt
 * (R7/R21, S1 BUILD).
 *
 * TWO enumeration paths, never one (the inventory's /docs/reference lesson:
 * a folder index has no content file, so a `git ls-files content/docs`
 * enumeration is blind to it by construction):
 *
 *   PATH A — source tree (reproducible without a build):
 *     · every .md under content/docs → /docs/<slug>/            (196 incl. hub)
 *     · folder indices: meta.json in a content/docs SUBDIRECTORY →
 *           /docs/<subdir>/         (the /docs/reference class of URL)
 *     · app/docs/<slug>.md/route.ts → /docs/<slug>.md          (195 twins)
 *     · content/blog/*.md not draft → /blog/<slug>/
 *     · app/(site)/ page.tsx routes → /, /blog/, /consulting/
 *     · infra: /llms.txt /llms-full.txt /rss.xml /sitemap-0.xml
 *              /sitemap-index.xml /api/search
 *
 *   PATH B — the BUILT surface (when out/ exists; always true in CI and in
 *   a local run after `next build`): the sitemap's <loc> entries plus the
 *   .md twins on disk. The script then asserts BOTH DIRECTIONS between the
 *   paths: a URL the build serves but PATH A missed is a generator gap (the
 *   blind-spot class) and FAILS the run; a URL PATH A claims but the build
 *   does not serve (e.g. a draft blog post) is reported and excluded.
 *
 * `old-urls.txt` is COMMITTED (R7: the check runs against the enumerated
 * list). Regeneration beats appending — rerun this script when the surface
 * changes and commit the diff; never hand-edit the list.
 *
 * Logging: counts per source at INFO; the two-way diff at INFO; failures
 * name the URLs. Exit non-zero on any mismatch when out/ exists, and on a
 * write failure.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT_FILE = resolve(REPO_ROOT, 'old-urls.txt');
const OUT_DIR = resolve(REPO_ROOT, 'out');
const DEBUG = process.env.LOG_LEVEL === 'debug';
const T0 = Date.now();
const info = (m) => console.log(`[generate-old-urls] ${m}`);
const die = (m) => {
  console.error(`[generate-old-urls] FAIL: ${m}`);
  process.exit(1);
};

const git = (args) =>
  execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();

/** A set of URL paths, always trailing-slash-normalised for page URLs. */
const norm = (p) => (p !== '/' && p.endsWith('/') ? p : p.endsWith('/') ? p : p);
function addUrl(set, url) {
  const u = url.startsWith('/') ? url : `/${url}`;
  set.add(u === '/' ? '/' : u.endsWith('/') ? u : `${u}/`);
}
function addFileUrl(set, url) {
  const u = url.startsWith('/') ? url : `/${url}`;
  set.add(u); // file-shaped URLs keep their exact form (/docs/faq.md, /rss.xml)
}

// ── PATH A — source tree ─────────────────────────────────────────────────────
const srcUrls = new Set();

// content/docs pages: every .md becomes /docs/<slug>/ (index.md → /docs/)
const docFiles = git(['ls-files', 'content/docs']).split('\n').filter((f) => f.endsWith('.md'));
for (const f of docFiles) {
  let slug = f.replace(/^content\/docs\//, '').replace(/\.md$/, '');
  if (slug === 'index') slug = '';
  addUrl(srcUrls, `/docs/${slug}`);
}
info(`PATH A: ${docFiles.length} content/docs pages → docs HTML URLs`);

// folder indices: a subdirectory carrying meta.json serves /docs/<dir>/
// even with no index file (fumadocs renders the folder index from the nav).
const docDirs = git(['ls-files', 'content/docs']).split('\n').filter((f) => f.endsWith('meta.json'));
let folderIndices = 0;
for (const m of docDirs) {
  const dir = dirname(m);
  if (dir === 'content/docs') continue; // hub already covered by index.md
  const sub = dir.replace(/^content\/docs\//, '');
  addUrl(srcUrls, `/docs/${sub}`);
  folderIndices++;
  if (DEBUG) console.log(`[generate-old-urls]   folder index: /docs/${sub}/ (from ${m})`);
}
info(`PATH A: ${folderIndices} folder index URL(s) recovered from meta.json nav`);

// .md route twins — enumerated from the ROUTE files, not inferred:
// a content page without a twin (the /docs/ hub today) has no .md URL.
const twinFiles = git(['ls-files', 'app/docs']).split('\n').filter((f) => /^app\/docs\/.+\.md\/route\.ts$/.test(f));
for (const f of twinFiles) {
  const slug = f.replace(/^app\/docs\//, '').replace(/\.md\/route\.ts$/, '');
  addFileUrl(srcUrls, `/docs/${slug}.md`);
}
info(`PATH A: ${twinFiles.length} .md route twins`);

// blog posts (skip drafts — they are not built and not part of the surface)
const blogFiles = git(['ls-files', 'content/blog']).split('\n').filter((f) => f.endsWith('.md'));
let blogLive = 0;
for (const f of blogFiles) {
  const fm = readFileSync(resolve(REPO_ROOT, f), 'utf8').slice(0, 400);
  const slug = basename(f).replace(/\.md$/, '');
  if (/^draft:\s*true\b/m.test(fm)) {
    info(`PATH A: skipping draft blog post /blog/${slug}/ (draft: true — not in the live surface)`);
    continue;
  }
  addUrl(srcUrls, `/blog/${slug}`);
  blogLive++;
}
info(`PATH A: ${blogLive} live blog posts`);

// site pages: app/(site)/**/page.tsx → URL path
const sitePages = git(['ls-files', 'app/(site)']).split('\n').filter((f) => f.endsWith('page.tsx'));
for (const f of sitePages) {
  let p = f.replace(/^app\/\(site\)/, '').replace(/\/page\.tsx$/, '');
  if (p.endsWith('/[slug]')) p = p.replace('/[slug]', ''); // dynamic: covered by content/blog posts above
  addUrl(srcUrls, p === '' ? '/' : p);
}
info(`PATH A: ${sitePages.length} site page route(s)`);

// infra URLs — enumerated explicitly, not pattern-matched
for (const u of ['/llms.txt', '/llms-full.txt', '/rss.xml', '/sitemap-0.xml', '/sitemap-index.xml', '/api/search']) {
  addFileUrl(srcUrls, u);
}
info(`PATH A: 6 infra URLs`);

function basename(p) {
  return p.split('/').pop() ?? p;
}

// ── PATH B — built surface cross-check (both directions) ─────────────────────
if (existsSync(OUT_DIR)) {
  const sitemap = resolve(OUT_DIR, 'sitemap-0.xml');
  if (!existsSync(sitemap)) die('out/ exists but sitemap-0.xml is absent — stale or partial build; run `npm run build` first');
  const xml = readFileSync(sitemap, 'utf8');
  const liveUrls = new Set(
    [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]*/, '')),
  );
  // .md twins + infra files on disk (the sitemap lists pages, not the twins)
  const walk = (dir, base = '') => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      const rel = `${base}/${e.name}`;
      if (e.isDirectory()) walk(full, rel);
      else if (e.name.endsWith('.md')) liveUrls.add(rel);
      else if (['llms.txt', 'llms-full.txt', 'rss.xml', 'sitemap-0.xml', 'sitemap-index.xml', 'search'].includes(e.name) && rel.split('/').length <= 3) {
        if (rel === '/api/search' || !rel.slice(1).includes('/')) liveUrls.add(rel);
      }
    }
  };
  walk(OUT_DIR);

  const missingFromA = [...liveUrls].filter((u) => !srcUrls.has(u) && !u.startsWith('/_next') && u !== '/404/' && u !== '/404.html' && !u.startsWith('/demo/') && !u.startsWith('/__next'));
  const extraInA = [...srcUrls].filter((u) => !liveUrls.has(u));

  if (missingFromA.length) {
    console.error('[generate-old-urls] FAIL — the build serves URL(s) PATH A does not enumerate (generator gap — the /docs/reference blind-spot class):');
    for (const u of missingFromA.sort()) console.error(`  ✗ ${u}`);
    die('extend PATH A enumeration; never hand-append to old-urls.txt');
  }
  if (extraInA.length) {
    // NOT a hard failure: this is the production-drift direction (a URL the
    // source suggests but today's build does not produce — e.g. a folder
    // index fumadocs never builds). Including it would make the coverage
    // check fail against out/, and inventing a stub or a retirement for it
    // is an operator decision (the inventory keeps /docs/reference OPEN for
    // exactly this). Warn by name, EXCLUDE from the list, and record.
    console.warn('[generate-old-urls] WARN — enumerated URL(s) the current build does NOT serve; excluded from old-urls.txt (surface drift — operator decision at cutover):');
    for (const u of extraInA.sort()) console.warn(`  ⚠ ${u}`);
    for (const u of extraInA) srcUrls.delete(u);
  }
  info(`PATH B: cross-check PASS — enumeration matches the built surface (${liveUrls.size} URLs; ${extraInA.length} drift exclusion(s))`);
} else {
  info('PATH B: out/ absent — cross-check skipped (run `npm run build` for the two-way check)');
}

// ── Write ────────────────────────────────────────────────────────────────────
const urls = [...srcUrls].sort();
const header =
  '# old-urls.txt — the enumerated live surface (R7/R21).\n' +
  '# GENERATED by scripts/generate-old-urls.mjs — regenerate, never hand-edit:\n' +
  '#   node scripts/generate-old-urls.mjs\n' +
  `# ${urls.length} URLs. Consumed by scripts/check-redirects.mjs.\n`;
try {
  writeFileSync(OUT_FILE, header + urls.join('\n') + '\n');
} catch (err) {
  die(`cannot write ${OUT_FILE}: ${err.message}`);
}
info(`wrote ${OUT_FILE} with ${urls.length} URLs in ${Date.now() - T0}ms`);
console.log(`OLD_URLS_COUNT=${urls.length}`);
