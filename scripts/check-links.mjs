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
 * against named, reasoned allow-classes below, and every class matches ONLY
 * its ENUMERATED members — exact (source page, target) pairs measured in the
 * export. Shape matching (path prefix / extension) was REMOVED (W-1, harvest
 * fidelity audit round 1, 2026-09-21): a prefix matcher lets any FUTURE
 * broken link of the same shape pass green, and the S1 RUN half is about to
 * write ~211 reference pages under /docs/reference/ — exactly where those
 * shapes live. Any error that matches NO enumerated pair is a FAILURE — the
 * gate is green only when every dangle is accounted for BY NAME, and each CI
 * run prints the full allowed list, so the debt stays visible instead of
 * watched.
 *
 * FAIL-CLOSED ARMS (no vacuous green — attention-is-not-a-mechanism):
 *   · lychee not found → FAIL (CI installs the pinned release; local dev gets
 *     the install command). A SKIP here would be the lychee-shipped-md
 *     self-skip class the framework promoted to a hard failure.
 *   · unparseable JSON → FAIL.
 *   · vacuity guard: fewer than LINK_FLOOR unique links checked → FAIL (a
 *     glob that misses `out/` exits 0 with zero links — a green gate over
 *     nothing). Floor 500, measured 1170 at pin 9706bdc7117a.
 *   · unenumerated dangle → FAIL (new broken link of any shape).
 *   · stale allow-list member → FAIL (an enumerated dangle that no longer
 *     fires means the content was fixed; the entry must be DELETED, not
 *     watched — the pair list may only shrink).
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
// Each class carries: name, why (with owner + shrink trigger), an ENUMERATED
// member list, and ONE predicate `matchesMember(normalisedError, member)` that
// drives BOTH directions — classifying an error (does any member match?) and
// the stale audit (did this member fire?). One predicate per class means the
// matcher and the member list cannot drift apart (the W-1 defect: the matcher
// matched whole path SHAPES while the member list was display-only).
// All 16 pairs below were measured in the export of the pinned tree: first
// enumerated at pin 9706bdc7117a, re-measured 2026-09-21 at pin 6f6edf3e0775
// (staging had advanced; the dangle set was identical: 16 errors / 1170
// unique links, lychee 0.24.2).

/** An exact inherited dangle: source page (relative to out/) + fragment-free
 * target path (relative to out/). */
const pair = (sourcePage, targetPath) => ({ sourcePage, targetPath });

/** Framework-tree relative refs that cannot exist in a static export.
 * Owner: framework content (the prose is authored there); shrink trigger: the
 * framework rewrites those refs as site-absolute /docs/... links, or S2
 * rehomes the referenced surfaces into the export — then delete the pair. */
const FRAMEWORK_TREE_DANGLES = [
  pair('docs/reference/c5-claims-conformance-auditor/index.html', 'docs/reference/.claude/rules/ai-laziness-traps.md'),
  pair('docs/reference/c11-memory-codification-auditor/index.html', 'docs/reference/.claude/rules/memory-codification.md'),
  pair('docs/reference/c8-fidelity-auditor/index.html', 'docs/reference/.claude/rules/reviewer-discipline.md'),
  pair('docs/reference/c2-reviewer-discipline/index.html', 'docs/reference/.claude/rules/reviewer-discipline.md'),
  pair('docs/reference/c4-capability-reuse-auditor/index.html', 'docs/reference/docs/meta-factory/prior-art-evaluations.md'),
  pair('docs/reference/rule-build-first-reuse-default/index.html', 'docs/packages/core/principles/11-build-first-reuse-default.test.ts'),
  pair('docs/reference/rule-ai-laziness-traps/index.html', 'docs/packages/core/principles/12-ai-laziness-traps.test.ts'),
  pair('docs/reference/rule-companion-install-principle/index.html', 'docs/reference/hooks/inject-matching-rule.sh'),
  pair('docs/reference/rule-companion-install-principle/index.html', 'docs/setup.d/companions.manifest'),
  pair('docs/reference/rule-companion-install-principle/index.html', 'docs/setup.d/engine.sh'),
];

/** Sibling raw-`.md` / README refs inside reference prose — resolve in the
 * framework docs tree, absent in out/. Same owner + shrink trigger as the
 * framework-tree class. */
const SIBLING_MD_DANGLES = [
  pair('docs/reference/rule-00-rule-index/index.html', 'docs/README.md'),
  pair('docs/reference/rule-ai-laziness-digest/index.html', 'docs/reference/rule-ai-laziness-digest/ai-laziness-traps.md'),
  pair('docs/reference/rule-attention-is-not-a-mechanism/index.html', 'docs/reference/rule-attention-is-not-a-mechanism/ci-tool-pinning.md'),
];

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

/** Exact (source page, target path) match — targetPath is already
 * fragment-free (the normaliser strips it), so README#fragment and README
 * are one and the same member. */
const matchesPair = (e, m) => e.sourcePage === m.sourcePage && e.targetPath === m.targetPath;
/** Matched against url AND status — for unparseable URIs the raw text only
 * exists in the status string, percent-encoded. */
const matchesArtifact = (e, a) =>
  e.sourcePage === a.sourcePage && `${e.url} ${e.status}`.includes(a.urlSuffix);

const formatPair = (m) => `${m.sourcePage} → ${m.targetPath}`;
const formatArtifact = (a) => `${a.sourcePage} → ${a.urlSuffix}`;

const ALLOW_CLASSES = [
  {
    name: 'framework-tree relative ref (export cannot serve it)',
    members: FRAMEWORK_TREE_DANGLES,
    matchesMember: matchesPair,
    format: formatPair,
    why: 'framework-authored prose references a framework-repo path; editing content is out of S1 BUILD scope — framework content fix / S2 rehome',
  },
  {
    name: 'sibling raw-.md / README ref inside reference prose',
    members: SIBLING_MD_DANGLES,
    matchesMember: matchesPair,
    format: formatPair,
    why: 'same framework-content class, targets inside the docs tree itself — framework content fix / S2 rehome',
  },
  {
    name: 'one-off unparseable autolink artifact (enumerated exactly)',
    members: EXACT_ARTIFACTS,
    matchesMember: matchesArtifact,
    format: formatArtifact,
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
      return c.members.some((m) => c.matchesMember(e, m));
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
  if (DEBUG) for (const m of c.members) info(`  member: ${c.format(m)}`);
}

// Enumerated-member audit: a member that no longer fires means the content
// was FIXED — the entry must be DELETED (the pair list may only shrink). This
// is a FAILURE, not a note (W-1, harvest fidelity audit round 1: a warning
// nobody reads is not a gate — enumerated debt that nobody is forced to
// delete rots exactly like unenumerated debt). It uses the SAME per-class
// predicate as classification, in the inverse direction: member → allowed
// errors, so the two can never disagree.
const staleMembers = [];
for (const c of ALLOW_CLASSES) {
  for (const m of c.members) {
    const fired = allowed.some((a) => a.class === c.name && c.matchesMember(a, m));
    if (!fired) staleMembers.push(`${c.name}: ${c.format(m)}`);
  }
}

if (unexpected.length || staleMembers.length) {
  const reasons = [];
  if (unexpected.length) {
    reasons.push(
      `${unexpected.length} link error(s) match NO enumerated allow-list member — NEW dangle(s) in the export. ` +
        `Fix the link, or (only if it is the SAME measured inherited debt) enumerate the exact ` +
        `(source page, target) pair in check-links.mjs with reason + owner:`,
    );
  }
  if (staleMembers.length) {
    reasons.push(
      `${staleMembers.length} allow-list member(s) did NOT fire this run — the content was FIXED; ` +
        `DELETE the stale entries from scripts/check-links.mjs (the list may only shrink):`,
    );
  }
  die(
    reasons.join('\n'),
    [
      ...unexpected.map((e) => `new dangle: ${e.sourcePage} → ${e.url || '(unparseable URI)'} | ${e.status}`),
      ...staleMembers.map((s) => `stale member: ${s} — delete it`),
    ],
  );
}

const dur = typeof report.duration === 'object' && report.duration !== null
  ? `${report.duration.secs}s`
  : `${report.duration ?? '?'}`;
info(`PASS — ${allowed.length} inherited dangle(s) accounted for by name; 0 unclassified; ${unique} links checked in ${dur}`);
info(`done in ${Date.now() - T0}ms`);
console.log('LINK_GATE=PASS');
