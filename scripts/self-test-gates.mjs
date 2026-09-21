/**
 * self-test-gates.mjs — the S1 BUILD tests deliverable (kickoff §6 seams).
 *
 * «An installed rule never seen to fire is an unproven claim.» Every gate
 * shipped in S1 is made to go RED here, ON EACH RUN, against deliberately
 * planted bad input inside a sandbox under .scratch/self-test/ (inside the
 * repo workdir, deleted after each case). The suite EXECUTES the gate scripts
 * by spawning them — it never string-greps their source (T-S1-C: coverage
 * that invokes nothing is not coverage; `pre-push.test.ts` executes nothing,
 * R13 — that is the anti-pattern, not the model).
 *
 * Sections (run all; `--only mermaid,links` filters — pr.yml runs --only
 * mermaid as its dedicated R6 fixtures step before the full suite):
 *
 *   redirects — check-redirects.mjs:
 *     (a) an enumerated URL with no artifact (deleted page) → RED
 *     (b) a stub planted at a D33 census URL → RED (tamper/census arm)
 *     (c) a retired URL referenced from a framework surface → RED (--framework-full)
 *   pin-json — check-pin-json.mjs: missing required field → RED; wrong schema
 *     marker → RED; unmodified pin → GREEN control.
 *   mermaid — the R6 paired fixtures, executed through the REAL allow-list
 *     module (node --experimental-strip-types imports lib/mermaid-allowlist.ts
 *     directly — the same code the build runs):
 *     (a) unsupported type (`gantt`) must throw; (b) supported type carrying a
 *     dropped element (`click`) must throw; valid chart → GREEN control.
 *   stubs — write-redirect-stubs.mjs: file-shaped URL colliding with a
 *     DIRECTORY in out/ → RED; both shapes written cleanly → GREEN controls.
 *   hero-fs8 — check-hero-fs8.mjs: a stack word planted OUTSIDE the pin-fed
 *     props → RED; the untouched page → GREEN control.
 *   links — check-links.mjs: missing lychee → RED; vacuous sweep → RED; an
 *     unallow-listed dangle in a synthetic export → RED.
 *
 * Fail-closed posture: every case must be RED (or GREEN control, as labelled)
 * or the suite exits non-zero. A gate that cannot be made to fire fails the
 * suite, because that gate would also never fire on a real defect.
 *
 * Logging: one line per case (name → RED/GREEN with the quoted evidence
 * line), a summary, exit code. LOG_LEVEL=debug adds spawn details.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const SANDBOX_ROOT = join(REPO_ROOT, '.scratch', 'self-test');
const DEBUG = process.env.LOG_LEVEL === 'debug';
const info = (m) => console.log(`[self-test-gates] ${m}`);
const detail = (m) => DEBUG && console.log(`[self-test-gates:debug] ${m}`);

// ── argv ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const onlyIdx = argv.indexOf('--only');
const only = onlyIdx !== -1 ? argv[onlyIdx + 1].split(',').map((s) => s.trim()) : null;
const want = (section) => !only || only.includes(section);
if (only) {
  const known = ['redirects', 'pin-json', 'mermaid', 'stubs', 'hero-fs8', 'links'];
  const unknown = only.filter((o) => !known.includes(o));
  if (unknown.length) {
    console.error(`[self-test-gates] FAIL: unknown --only section(s): ${unknown.join(', ')} (known: ${known.join(', ')})`);
    process.exit(1);
  }
}

const results = [];
let sandboxSeq = 0;

/** Run one case. `expect: 'red'` → the spawn must exit non-zero AND the
 * output must match `pattern`; `expect: 'green'` → exit 0. */
function runCase(section, name, expect, pattern, setup) {
  // OPAQUE sandbox name — the case name must never leak into the sandbox path,
  // or an assertion pattern could match the path instead of the gate's output
  // (measured false positive: a pattern matched «…stub_planted_at_a_census…»
  // from the directory name while the gate had died on a missing input).
  const sandbox = join(SANDBOX_ROOT, `${section}-${sandboxSeq++}-${process.pid}`);
  const summary = { section, name, expect, ok: false, evidence: '' };
  try {
    mkdirSync(sandbox, { recursive: true });
    const { cmd, args, env, check } = setup(sandbox);
    const r = spawnSync(cmd, args, { encoding: 'utf8', env: { ...process.env, ...env }, cwd: sandbox });
    const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
    if (DEBUG) detail(`spawn ${cmd} ${args.join(' ')} → exit ${r.status}\n${out.slice(0, 2000)}`);
    if (expect === 'red') {
      if (r.status === 0) {
        summary.evidence = 'unexpectedly exited 0 — the gate did NOT fire';
      } else if (pattern && !pattern.test(out)) {
        summary.evidence = `exited ${r.status} but the output does not name the expected failure (${pattern})`;
      } else {
        summary.ok = true;
        const line = pattern ? out.split('\n').find((l) => pattern.test(l)) : out.split('\n').find(Boolean);
        summary.evidence = `exit ${r.status} · ${line?.trim().slice(0, 160) ?? '(no output)'}`;
      }
    } else {
      if (r.status === 0) {
        summary.ok = true;
        summary.evidence = 'exit 0';
      } else {
        summary.evidence = `unexpectedly failed (${r.status}): ${out.split('\n').filter(Boolean).slice(-3).join(' | ').slice(0, 200)}`;
      }
    }
    if (check) check(sandbox, summary);
  } catch (err) {
    summary.evidence = `case error: ${err.message}`;
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
  results.push(summary);
  console.log(`  ${summary.ok ? '✓' : '✗'} [${section}] ${name} (${expect}) — ${summary.evidence}`);
}

// ── redirects ────────────────────────────────────────────────────────────────
function setupRedirectsSandbox(sandbox) {
  const out = join(sandbox, 'out');
  // The export copy is a full copy (cpSync), the gate script sits at
  // sandbox/scripts/ so its `new URL('..', import.meta.url)` root resolves to
  // the sandbox and finds the sandbox's old-urls.txt / retired-urls.txt.
  cpSync(join(REPO_ROOT, 'out'), out, { recursive: true, verbatimSymlinks: true });
  mkdirSync(join(sandbox, 'scripts'), { recursive: true });
  cpSync(join(REPO_ROOT, 'scripts', 'check-redirects.mjs'), join(sandbox, 'scripts', 'check-redirects.mjs'));
  cpSync(join(REPO_ROOT, 'old-urls.txt'), join(sandbox, 'old-urls.txt'));
  cpSync(join(REPO_ROOT, 'retired-urls.txt'), join(sandbox, 'retired-urls.txt'));
  return out;
}

function caseRedirects() {
  // (a) enumerated URL with NO state — delete a real page from the export copy
  runCase('redirects', 'enumerated URL with no artifact', 'red', /NO state|neither a real page/i, (sandbox) => {
    const out = setupRedirectsSandbox(sandbox);
    rmSync(join(out, 'docs', 'faq'), { recursive: true, force: true });
    return { cmd: process.execPath, args: [join(sandbox, 'scripts', 'check-redirects.mjs')], env: { OUT_DIR: out } };
  });

  // (b) stub planted at a D33 census URL (overwrite the real page with a stub)
  runCase('redirects', 'stub planted at a census URL', 'red', /planted or stale|census URL/i, (sandbox) => {
    const out = setupRedirectsSandbox(sandbox);
    writeFileSync(join(out, 'docs', 'quickstart-ts', 'index.html'), '<!doctype html><html><body>redirect stub written by scripts/write-redirect-stubs.mjs</body></html>\n');
    return { cmd: process.execPath, args: [join(sandbox, 'scripts', 'check-redirects.mjs')], env: { OUT_DIR: out } };
  });

  // (c) retired URL referenced from a framework surface (--framework-full arm)
  runCase('redirects', 'retired URL referenced from a framework surface', 'red', /retired URL\(s\) still referenced/i, (sandbox) => {
    const out = setupRedirectsSandbox(sandbox);
    const retiredUrl = '/docs/retired-self-test-probe/';
    writeFileSync(join(sandbox, 'retired-urls.txt'), `${retiredUrl} self-test probe — retired by design\n`);
    const fw = join(sandbox, 'framework-full');
    mkdirSync(fw, { recursive: true });
    writeFileSync(join(fw, 'README.md'), `See ${retiredUrl} for the old page.\n`);
    return { cmd: process.execPath, args: [join(sandbox, 'scripts', 'check-redirects.mjs'), '--framework-full', fw], env: { OUT_DIR: out } };
  });
}

// ── pin-json ─────────────────────────────────────────────────────────────────
function setupPinSandbox(sandbox) {
  const fw = join(sandbox, 'framework');
  cpSync(join(REPO_ROOT, '.framework', 'docs'), join(fw, 'docs'), { recursive: true });
  return fw;
}

function casePinJson() {
  // GREEN control: the fetched pin as-is passes the gate.
  runCase('pin-json', 'unmodified pin passes (control)', 'green', null, (sandbox) => ({
    cmd: process.execPath,
    args: [join(REPO_ROOT, 'scripts', 'check-pin-json.mjs')],
    env: { FRAMEWORK_DIR: setupPinSandbox(sandbox) },
  }));

  // RED: required field removed from hero-copy.json
  runCase('pin-json', 'hero-copy missing required field', 'red', /cta\.primary\.label|failed validation|FAIL/i, (sandbox) => {
    const fw = setupPinSandbox(sandbox);
    const heroPath = join(fw, 'docs', 'site', 'hero-copy.json');
    const hero = JSON.parse(readFileSync(heroPath, 'utf8'));
    delete hero.cta.primary.label;
    writeFileSync(heroPath, JSON.stringify(hero, null, 2));
    return { cmd: process.execPath, args: [join(REPO_ROOT, 'scripts', 'check-pin-json.mjs')], env: { FRAMEWORK_DIR: fw } };
  });

  // RED: schema marker changed
  runCase('pin-json', 'wrong schema marker', 'red', /schema|marker|FAIL/i, (sandbox) => {
    const fw = setupPinSandbox(sandbox);
    const heroPath = join(fw, 'docs', 'site', 'hero-copy.json');
    const hero = JSON.parse(readFileSync(heroPath, 'utf8'));
    hero.schema = 'getff-hero-copy/2';
    writeFileSync(heroPath, JSON.stringify(hero, null, 2));
    return { cmd: process.execPath, args: [join(REPO_ROOT, 'scripts', 'check-pin-json.mjs')], env: { FRAMEWORK_DIR: fw } };
  });
}

// ── mermaid ──────────────────────────────────────────────────────────────────
const MERMAID_RUNNER = `
import { assertAllowed } from <ALLOWLIST>;
const chart = process.argv[2];
const expectThrow = process.argv[3] === 'expect-throw';
const expectFragment = process.argv[4] ?? '';
try {
  const type = assertAllowed(chart);
  if (expectThrow) { console.error('DID NOT THROW for chart: ' + JSON.stringify(chart.slice(0, 60))); process.exit(1); }
  console.log('allowed as ' + type);
  process.exit(0);
} catch (err) {
  if (!expectThrow) { console.error('UNEXPECTED throw: ' + err.message); process.exit(1); }
  if (expectFragment && !String(err.message).includes(expectFragment)) {
    console.error('threw, but the message does not name the expected defect (' + expectFragment + '): ' + err.message);
    process.exit(1);
  }
  console.log('RED (fired): ' + String(err.message).split('\\n')[0].slice(0, 140));
  process.exit(0);
}
`;

/** The R6 fixtures must fire through the REAL module the build runs. The
 * runner exits 0 when the fixture FIRED (throw caught, message names the
 * defect) — so from the suite's side a fixture case is labelled `fires` and
 * evaluated by the green path with the /RED \(fired\)/ pattern. */
function caseMermaid() {
  const cases = [
    { name: 'fixture A — unsupported type (gantt) must fail the build', chart: 'gantt\n    title Plan\n    section A\n    task t :a1, 2026-01-01, 2d', expectThrow: true, fragment: 'unsupported diagram type' },
    { name: 'fixture B — supported type + dropped element (click)', chart: 'flowchart TD\n    A[Start] --> B[End]\n    click A callback_fn', expectThrow: true, fragment: 'click' },
    { name: 'control — valid flowchart renders', chart: 'flowchart TD\n    A[Start] --> B[End]', expectThrow: false, fragment: '' },
  ];
  for (const c of cases) {
    runCase('mermaid', c.name, c.expectThrow ? 'fires' : 'green', c.expectThrow ? /RED \(fired\)/ : /allowed as/, (sandbox) => {
      const runnerPath = join(sandbox, 'mermaid-runner.mjs');
      writeFileSync(runnerPath, MERMAID_RUNNER.replace('<ALLOWLIST>', JSON.stringify(join(REPO_ROOT, 'lib', 'mermaid-allowlist.ts'))));
      return {
        cmd: process.execPath,
        args: ['--experimental-strip-types', runnerPath, c.chart, c.expectThrow ? 'expect-throw' : 'expect-ok', ...(c.expectThrow ? [c.fragment] : [])],
        env: {},
      };
    });
  }
}

// ── stubs (writer) ───────────────────────────────────────────────────────────
function setupWriterSandbox(sandbox, map, plantDirAtSource = false) {
  const out = join(sandbox, 'out');
  mkdirSync(join(out, 'docs', 'quickstart-ts'), { recursive: true });
  writeFileSync(join(out, 'docs', 'quickstart-ts', 'index.html'), '<!doctype html><html><body>real page</body></html>\n');
  if (plantDirAtSource) mkdirSync(join(out, 'docs', 'faq.md'), { recursive: true });
  // script under sandbox/scripts/ → its repo-root resolves to the sandbox,
  // where the sandbox's own redirects.json lives
  mkdirSync(join(sandbox, 'scripts'), { recursive: true });
  cpSync(join(REPO_ROOT, 'scripts', 'write-redirect-stubs.mjs'), join(sandbox, 'scripts', 'write-redirect-stubs.mjs'));
  writeFileSync(join(sandbox, 'redirects.json'), JSON.stringify(map, null, 2));
  return out;
}

function caseStubs() {
  // RED: file-shaped stub colliding with an existing DIRECTORY
  runCase('stubs', 'file-shaped stub over an existing directory', 'red', /collides with an existing DIRECTORY/i, (sandbox) => ({
    cmd: process.execPath,
    args: [join(sandbox, 'scripts', 'write-redirect-stubs.mjs')],
    env: {
      OUT_DIR: setupWriterSandbox(sandbox, [{ source: '/docs/faq.md', destination: '/docs/quickstart-ts/' }], true),
    },
  }));

  // GREEN control: both shapes written cleanly into a minimal export
  runCase('stubs', 'both stub shapes written cleanly (control)', 'green', null, (sandbox) => {
    const out = setupWriterSandbox(sandbox, [
      { source: '/docs/quick-start/', destination: '/docs/quickstart-ts/' },
      { source: '/docs/faq.md', destination: '/docs/quickstart-ts/' },
    ]);
    return {
      cmd: process.execPath,
      args: [join(sandbox, 'scripts', 'write-redirect-stubs.mjs')],
      env: { OUT_DIR: out },
      check: (dir, summary) => {
        const file = join(dir, 'out', 'docs', 'faq.md');
        const dirStub = join(dir, 'out', 'docs', 'quick-start', 'index.html');
        const manifest = JSON.parse(readFileSync(join(dir, 'out', '.redirect-stubs.json'), 'utf8')).stubs;
        const shapes = Object.fromEntries(manifest.map((s) => [s.source, s.shape]));
        const fileIsFile = existsSync(file) && !existsSync(join(file, 'index.html')) && readFileSync(file, 'utf8').includes('redirect stub written by');
        const dirIsDir = existsSync(dirStub) && readFileSync(dirStub, 'utf8').includes('redirect stub written by');
        if (!fileIsFile || !dirIsDir || shapes['/docs/faq.md'] !== 'file' || shapes['/docs/quick-start/'] !== 'directory') {
          summary.ok = false;
          summary.evidence = `shape contract broken: fileIsFile=${fileIsFile} dirIsDir=${dirIsDir} shapes=${JSON.stringify(shapes)}`;
        }
      },
    };
  });
}

// ── hero-fs8 ─────────────────────────────────────────────────────────────────
function setupFs8Sandbox(sandbox, inject) {
  mkdirSync(join(sandbox, 'scripts'), { recursive: true });
  mkdirSync(join(sandbox, 'app', '(site)'), { recursive: true });
  cpSync(join(REPO_ROOT, 'scripts', 'check-hero-fs8.mjs'), join(sandbox, 'scripts', 'check-hero-fs8.mjs'));
  const page = readFileSync(join(REPO_ROOT, 'app', '(site)', 'page.tsx'), 'utf8');
  // Injected INSIDE the hero CTA block (a guarded, not §5.9-untouched, region)
  // — the injected words must trip the guard as pin-less literals.
  const doctored = inject
    ? page.replace('<div className="cta-row">', '<div className="cta-row">\n            <p>Rust and Python ship tomorrow, roadmap says alpha beta</p>')
    : page;
  if (inject && doctored === page) throw new Error('FS8 injection anchor not found — the case would be vacuous');
  writeFileSync(join(sandbox, 'app', '(site)', 'page.tsx'), doctored);
  return {};
}

function caseHeroFs8() {
  runCase('hero-fs8', 'stack word planted outside pin-fed props', 'red', /FAIL|line \d+/i, (sandbox) => ({
    cmd: process.execPath,
    args: [join(sandbox, 'scripts', 'check-hero-fs8.mjs')],
    env: setupFs8Sandbox(sandbox, true),
  }));

  runCase('hero-fs8', 'untouched page passes (control)', 'green', null, (sandbox) => ({
    cmd: process.execPath,
    args: [join(sandbox, 'scripts', 'check-hero-fs8.mjs')],
    env: setupFs8Sandbox(sandbox, false),
  }));
}

// ── links ────────────────────────────────────────────────────────────────────
function caseLinks() {
  const lychee = process.env.LYCHEE_BIN ?? 'lychee';

  // RED: lychee missing — a gate that silently skips is a gate that never fires
  runCase('links', 'lychee binary missing', 'red', /lychee not runnable/i, (sandbox) => ({
    cmd: process.execPath,
    args: [join(REPO_ROOT, 'scripts', 'check-links.mjs')],
    env: { LYCHEE_BIN: '/nonexistent/lychee-self-test' },
  }));

  // RED: vacuous sweep — the glob misses the export
  runCase('links', 'vacuous sweep (empty export)', 'red', /vacuity guard/i, (sandbox) => {
    const out = join(sandbox, 'out');
    mkdirSync(out, { recursive: true });
    return { cmd: process.execPath, args: [join(REPO_ROOT, 'scripts', 'check-links.mjs')], env: { LYCHEE_BIN: lychee, OUT_DIR: out } };
  });

  // RED: an unallow-listed dangle in a synthetic export (≥ LINK_FLOOR unique
  // links so classification is reached, exactly 1 error, no allow-class)
  runCase('links', 'unallow-listed dangle in the export', 'red', /match NO allow-class/i, (sandbox) => {
    const out = join(sandbox, 'out');
    const N = 505;
    const links = [];
    for (let i = 0; i < N; i++) {
      mkdirSync(join(out, `p${i}`), { recursive: true });
      writeFileSync(join(out, `p${i}`, 'index.html'), '<!doctype html><html><body>page</body></html>\n');
      links.push(`<a href="/p${i}/">p${i}</a>`);
    }
    links.push('<a href="/definitely-no-such-page-self-test/">broken</a>');
    writeFileSync(join(out, 'index.html'), `<!doctype html><html><body>${links.join('\n')}</body></html>\n`);
    return { cmd: process.execPath, args: [join(REPO_ROOT, 'scripts', 'check-links.mjs')], env: { LYCHEE_BIN: lychee, OUT_DIR: out } };
  });
}

// ── run ──────────────────────────────────────────────────────────────────────
if (!existsSync(join(REPO_ROOT, 'out'))) {
  console.error('[self-test-gates] FAIL: out/ absent — run `npm run build` first (the redirects cases copy it)');
  process.exit(1);
}
if (!existsSync(join(REPO_ROOT, '.framework', 'docs', 'site'))) {
  console.error('[self-test-gates] FAIL: .framework/ absent — run `node scripts/fetch-framework.mjs` first');
  process.exit(1);
}
mkdirSync(SANDBOX_ROOT, { recursive: true });

info(`sandbox root: ${SANDBOX_ROOT}`);
if (want('redirects')) { info('section: redirects'); caseRedirects(); }
if (want('pin-json')) { info('section: pin-json'); casePinJson(); }
if (want('mermaid')) { info('section: mermaid'); caseMermaid(); }
if (want('stubs')) { info('section: stubs'); caseStubs(); }
if (want('hero-fs8')) { info('section: hero-fs8'); caseHeroFs8(); }
if (want('links')) {
  info('section: links');
  // fail-closed: the links section needs lychee; without it the cases cannot
  // execute, which is a FAILURE here, not a skip (attention-is-not-a-mechanism).
  const probe = spawnSync(process.env.LYCHEE_BIN ?? 'lychee', ['--version'], { encoding: 'utf8' });
  if (probe.status !== 0) {
    results.push({ section: 'links', name: 'lychee availability', expect: 'green', ok: false, evidence: `lychee not runnable ("${process.env.LYCHEE_BIN ?? 'lychee'}") — install the pinned release; a self-test that cannot execute its gate must fail, not skip` });
    console.log('  ✗ [links] lychee availability — install: curl -sSfL https://github.com/lycheeverse/lychee/releases/download/lychee-v0.24.2/lychee-x86_64-unknown-linux-gnu.tar.gz | tar -xz --strip-components=1 && LYCHEE_BIN=$PWD/lychee');
  } else {
    caseLinks();
  }
}

const failed = results.filter((r) => !r.ok);
info(`summary: ${results.length - failed.length}/${results.length} case(s) behaved as designed`);
if (failed.length) {
  console.error('[self-test-gates] FAIL — gate(s) that did NOT fire when fed bad input (or controls that broke):');
  for (const f of failed) console.error(`  ✗ [${f.section}] ${f.name}: ${f.evidence}`);
  process.exit(1);
}
console.log('SELF_TESTS=PASS');
