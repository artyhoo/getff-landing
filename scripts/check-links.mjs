/**
 * check-links.mjs — the R20 `lychee --offline` link gate over the export
 * (S1 BUILD), with a fail-closed classifier for the INHERITED dangle classes.
 *
 * WHY A CLASSIFIER AND NOT BARE LYCHEE (measured 2026-09-21, pin 9706bdc7117a,
 * lychee 0.24.2): a bare `lychee --offline --root-dir out` over the `out/`
 * HTML glob is
 * RED on the inherited live surface — 16 errors / 1170 unique links. Two of
 * lychee's own suppression mechanisms cannot express this:
 *   · `exclude` in lychee.toml never matches an UNPARSEABLE URI, and two of
 *     the 16 are autolink artifacts whose URIs fail to parse
 *     (`http://localhost:3009}/health` — a `${VAR:-default}` shell default
 *     glued to the brace by the content autolinker; `http://localhost:3009.»`
 *     — prose punctuation glued on);
 *   · `--include-verbatim=false` (measured) does NOT help: remark turned the
 *     text inside those code spans into real `<a href>` ELEMENTS, which the
 *     verbatim filter no longer sees.
 * The remaining 14 are framework-authored reference prose carrying RELATIVE
 * refs into the framework tree (`.claude/rules/*.md`, `packages/core/**`,
 * `setup.d/**`, sibling `*.md`, `README.md`) — paths that resolve inside the
 * framework repo but do not exist in a static export. Editing that prose is
 * content work (S1 RUN half / framework-side) and is NOT done here; deleting
 * the links from the export would certify an artifact that will not ship.
 *
 * POSTURE (the framework's own lychee.toml philosophy, applied where its
 * mechanism cannot reach): every error from the PINNED lychee is classified
 * against named, reasoned allow-classes below; structural classes enumerate
 * their CURRENT members and carry an explicit shrink trigger; one-off
 * artifacts are enumerated exactly. Any error that matches NO class is a
 * FAILURE — the gate is green only when every dangle is accounted for BY
 * NAME, and each CI run prints the full allowed list, so the debt stays
 * visible instead of watched.
 *
 * FAIL-CLOSED ARMS (no vacuous green — attention-is-not-a-mechanism):
 *   · lychee not found → FAIL (CI installs the pinned release; local dev gets
 *     the install command). A SKIP here would be the lychee-shipped-md
 *     self-skip class the framework promoted to a hard failure.
 *   · unparseable JSON → FAIL.
 *   · vacuity guard: fewer than LINK_FLOOR unique links checked → FAIL (a
 *     glob that misses `out/` exits 0 with zero links — a green gate over
 *     nothing). Floor 500, measured 1170 at pin 9706bdc7117a.
 *
 * Output format stability: lychee is VERSION-PINNED in CI (v0.24.2 +
 * sha256, same tarball the framework's audit-self.yml pins), and this
 * parser targets its `--format json` `error_map` — the pin is what makes
 * parsing the report safe.
 *
 * Logging: counts + per-class members at INFO; failures name source, target
 * and reason. Exit non-zero on any failure.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = process.env.OUT_DIR ? resolve(process.env.OUT_DIR) : resolve(REPO_ROOT, 'out');
const DEBUG = process.env.LOG_LEVEL === 'debug';
const T0 = Date.now();
const LINK_FLOOR = 500;

const info = (m) => console.log(`[check-links] ${m}`);
const die = (msg, items = []) => {
  console.error(`[check-links] FAIL: ${msg}`);
  for (const i of items.slice(0, DEBUG ? items.length : 20)) console.error(`  ✗ ${i}`);
  if (items.length > 20 && !DEBUG) console.error(`  …and ${items.length - 20} more (LOG_LEVEL=debug to see all)`);
  process.exit(1);
};

// ── Allow-classes ────────────────────────────────────────────────────────────
// Each entry: name, why (with owner + shrink trigger), and a matcher over a
// normalised error {sourcePage, targetPath, status}. Members of structural
// classes are enumerated so growth is visible in review, not just matched.

/** Framework-tree relative refs that cannot exist in a static export.
 * Owner: framework content (the prose is authored there); shrink trigger: the
 * framework rewrites those refs as site-absolute /docs/... links, or S2
 * rehomes the referenced surfaces into the export — then delete the class. */
const FRAMEWORK_TREE_PREFIXES = [
  'docs/reference/.claude/',
  'docs/packages/core/',
  'docs/setup.d/',
  'docs/reference/hooks/',
  'docs/reference/docs/',
];
const frameworkTreeMembers = [
  'docs/reference/.claude/rules/memory-codification.md',
  'docs/reference/.claude/rules/reviewer-discipline.md', // ×2 sources
  'docs/reference/.claude/rules/ai-laziness-traps.md',
  'docs/reference/docs/meta-factory/prior-art-evaluations.md',
  'docs/packages/core/principles/11-build-first-reuse-default.test.ts',
  'docs/packages/core/principles/12-ai-laziness-traps.test.ts',
  'docs/reference/hooks/inject-matching-rule.sh',
  'docs/setup.d/companions.manifest',
  'docs/setup.d/engine.sh',
];
const isFrameworkTreeRef = (e) =>
  e.targetPath != null &&
  FRAMEWORK_TREE_PREFIXES.some((p) => e.targetPath.startsWith(p));

/** Sibling raw-`.md` refs inside a reference page's own slug dir (and the
 * hub README.md ref): resolve in the framework docs tree, absent in out/.
 * Same owner + shrink trigger as the framework-tree class. */
const isSiblingMdRef = (e) =>
  e.targetPath != null &&
  (e.targetPath === 'docs/README.md' ||
    (e.targetPath.startsWith('docs/reference/') && /\.md($|#)/.test(e.targetPath)));

/** One-off prose autolink artifacts — enumerated EXACTLY (source page + raw
 * target). Matched against url AND status: for an UNPARSEABLE URI lychee
 * puts the raw text only in the status string, percent-encoded. Owner:
 * content fix (escape the brace / reword) at S2 or framework-side; shrink
 * trigger: the content fix lands → delete the entry. */
const EXACT_ARTIFACTS = [
  {
    sourcePage: 'docs/reference/a22-companions-manifest/index.html',
    urlSuffix: 'localhost:3009%7D/health',
    why: 'shell `${RUNTIME_BRIDGE_AIF_URL:-http://localhost:3009}` autolinked with the closing brace glued to the URL — unparseable URI',
  },
  {
    sourcePage: 'docs/reference/bridge-park/index.html',
    urlSuffix: 'localhost:3009.%C2%BB',
    why: 'prose «…localhost:3009.» glued the sentence period onto the URL — unparseable URI',
  },
  {
    sourcePage: 'docs/reference/c5-claims-conformance-auditor/index.html',
    urlSuffix: 'file:///line',
    why: 'angle-bracket placeholder «<file:line>» in prose autolinked to a relative href "line" that resolves nowhere',
  },
];
const isExactArtifact = (e) =>
  EXACT_ARTIFACTS.some(
    (a) => e.sourcePage === a.sourcePage && `${e.url} ${e.status}`.includes(a.urlSuffix),
  );

const ALLOW_CLASSES = [
  {
    name: 'framework-tree relative ref (export cannot serve it)',
    match: isFrameworkTreeRef,
    members: frameworkTreeMembers,
    why: 'framework-authored prose references a framework-repo path; editing content is out of S1 BUILD scope — framework content fix / S2 rehome',
  },
  {
    name: 'sibling raw-.md / README ref inside reference prose',
    match: isSiblingMdRef,
    members: [
      'docs/README.md#why-this-exists',
      'docs/reference/rule-ai-laziness-digest/ai-laziness-traps.md',
      'docs/reference/rule-attention-is-not-a-mechanism/ci-tool-pinning.md',
    ],
    why: 'same framework-content class, targets inside the docs tree itself — framework content fix / S2 rehome',
  },
  {
    name: 'one-off unparseable autolink artifact (enumerated exactly)',
    match: isExactArtifact,
    members: EXACT_ARTIFACTS.map((a) => `${a.sourcePage} → ${a.urlSuffix}`),
    why: 'content autolink defect, one-off — content fix at S2/framework-side, then delete the entry',
  },
];

// ── 1. Locate lychee ─────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const lycheeArgIdx = argv.indexOf('--lychee');
const lycheeBin = lycheeArgIdx !== -1 ? resolve(argv[lycheeArgIdx + 1]) : process.env.LYCHEE_BIN ?? 'lychee';
info(`lychee binary: ${lycheeBin}`);

let binOk = false;
try {
  const v = execFileSync(lycheeBin, ['--version'], { encoding: 'utf8' }).trim();
  info(`lychee ${v}`);
  binOk = true;
} catch (err) {
  die(
    `lychee not runnable ("${lycheeBin}"): ${err.message.split('\n')[0]}\n` +
      `  install: curl -sSfL https://github.com/lycheeverse/lychee/releases/download/lychee-v0.24.2/lychee-x86_64-unknown-linux-gnu.tar.gz | tar -xz --strip-components=1\n` +
      `  (a missing lychee is a hard failure here, not a skip — a gate that silently skips is a gate that never fires)`,
  );
}
if (!binOk) die('unreachable');

// ── 2. Run the offline sweep over the export ────────────────────────────────
if (!existsSync(OUT_DIR)) die(`out/ absent at ${OUT_DIR} — run \`next build\` first`);
const args = ['--offline', '--no-progress', '--format', 'json', '--root-dir', OUT_DIR, `${OUT_DIR}/**/*.html`];
DEBUG && info(`lychee ${args.join(' ')}`);
let raw;
try {
  raw = execFileSync(lycheeBin, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
} catch (err) {
  // lychee exits non-zero WHEN ERRORS EXIST — expected; the report is on stdout.
  raw = (err.stdout ?? '').toString();
  if (!raw.trim()) die(`lychee produced no report (exit ${err.status}): ${(err.stderr ?? '').toString().slice(0, 400)}`);
}
let report;
try {
  report = JSON.parse(raw);
} catch (err) {
  die(`lychee report is not parseable JSON (was the version changed without re-pinning?): ${err.message}`);
}

const unique = report.unique ?? 0;
info(`lychee: ${report.total ?? '?'} total · ${unique} unique · ${report.excludes ?? 0} excluded`);
if (unique < LINK_FLOOR) {
  die(
    `vacuity guard: only ${unique} unique links checked (floor ${LINK_FLOOR}) — ` +
      `the glob probably missed the export. A green gate over nothing is not a gate.`,
  );
}

// ── 3. Classify every error ──────────────────────────────────────────────────
const errors = Object.entries(report.error_map ?? {}).flatMap(([src, list]) =>
  (list ?? []).map((e) => {
    const absTarget = (e.url ?? '').startsWith('file://') ? e.url.replace(/^file:\/\//, '') : null;
    // fragment-free comparison key; the raw target (fragment kept) stays in `url`
    const targetPath = absTarget
      ? relative(OUT_DIR, decodeURIComponent(absTarget.split('#')[0])).split(sep).join('/')
      : null;
    return {
      sourcePage: relative(OUT_DIR, src).split(sep).join('/'),
      url: e.url ?? '',
      targetPath,
      status: e.status?.details ?? e.status?.text ?? '(no status)',
    };
  }),
);
info(`errors reported by lychee: ${errors.length}`);

const allowed = [];
const unexpected = [];
for (const e of errors) {
  const cls = ALLOW_CLASSES.find((c) => {
    try {
      return c.match(e);
    } catch {
      return false;
    }
  });
  if (cls) allowed.push({ ...e, class: cls.name, why: cls.why });
  else unexpected.push(e);
}

for (const c of ALLOW_CLASSES) {
  const n = allowed.filter((a) => a.class === c.name).length;
  info(`allowed · ${c.name}: ${n} — ${c.why}`);
  if (DEBUG) for (const m of c.members) info(`  member: ${m}`);
}

if (unexpected.length) {
  die(
    `${unexpected.length} link error(s) match NO allow-class — new dangle(s) in the export. ` +
      `Fix the link, or (only if it is the SAME structural class) extend check-links.mjs with reason + owner:`,
    unexpected.map((e) => `${e.sourcePage} → ${e.url || '(unparseable URI)'} | ${e.status}`),
  );
}

// Enumerated-member audit: a class member that no longer fires means the
// content was FIXED — surface it so the entry gets deleted instead of rotting.
// Member-matching is per class, mirroring how the class itself matches:
//   · path classes → member is a fragment-free target path;
//   · the exact-artifact class → member is "<sourcePage> → <urlSuffix>",
//     matched the way isExactArtifact matches (url + status, encoded form).
const staleMembers = [];
for (const c of ALLOW_CLASSES) {
  for (const m of c.members) {
    const fired =
      c === ALLOW_CLASSES.find((x) => x.match === isExactArtifact)
        ? allowed.some((a) => {
            const [page, ...rest] = m.split(' → ');
            const suffix = rest.join(' → ');
            return a.sourcePage === page && `${a.url} ${a.status}`.includes(suffix);
          })
        : allowed.some((a) => {
            const key = m.split('#')[0].replace(/ ×2 sources$/, '');
            return a.targetPath != null && (a.targetPath === key || a.targetPath.startsWith(key));
          });
    if (!fired) staleMembers.push(`${c.name}: ${m}`);
  }
}
if (staleMembers.length) {
  info(`NOTE: ${staleMembers.length} allow-list member(s) did NOT fire this run — the content was fixed; DELETE these entries:`);
  for (const s of staleMembers) info(`  ↩ ${s}`);
}

const dur = typeof report.duration === 'object' && report.duration !== null
  ? `${report.duration.secs}s`
  : `${report.duration ?? '?'}`;
info(`PASS — ${allowed.length} inherited dangle(s) accounted for by name; 0 unclassified; ${unique} links checked in ${dur}`);
info(`done in ${Date.now() - T0}ms`);
console.log('LINK_GATE=PASS');
