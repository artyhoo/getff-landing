/**
 * fetch-framework.mjs — the R3/R5 pin mechanism (S1 BUILD, landing).
 *
 * Reads `framework.pin` (one non-comment line: branch name or full SHA),
 * resolves a branch through `git ls-remote`, then materialises the pinned
 * tree into `.framework/` via a depth-1 sparse fetch:
 *
 *   git init + git fetch --depth 1 origin <sha>
 *   git sparse-checkout set <paths> + git checkout FETCH_HEAD
 *
 * A depth-1 fetch of a non-tip SHA works against GitHub because the server
 * advertises `allow-reachable-sha1-in-want` (measured 2026-09-21).
 *
 * ORDERING IS BINDING (R5): every caller runs this BEFORE `npm ci` — the
 * postinstall (`fumadocs-mdx`) reads `source.config.ts` and would otherwise
 * resolve a collection directory that does not exist yet.
 *
 * Modes:
 *   node scripts/fetch-framework.mjs               → narrow checkout: docs/site
 *   node scripts/fetch-framework.mjs --full <dir>  → full-surface checkout at
 *       the SAME resolved SHA into <dir> (README.md, docs/, llms-head.txt,
 *       packages/core/README.md) for check-redirects.mjs --framework-full
 *       (D37/D51(5)). The pin is read and resolved exactly once either way.
 *
 * Output contract: `.framework/SHA` (or `<dir>/SHA`) carries the resolved SHA;
 * the last stdout line is `FRAMEWORK_SHA=<sha>` for CI capture.
 *
 * Logging: INFO by default (steps, SHAs, timing); LOG_LEVEL=debug adds argv
 * and per-command detail. Every failure exits non-zero and NAMES the step and
 * cause — never a bare exit code.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const PIN_FILE = process.env.FRAMEWORK_PIN ?? resolve(REPO_ROOT, 'framework.pin');
const REPO = process.env.FRAMEWORK_REPO ?? 'https://github.com/artyhoo/getff';
const NARROW_DIR = process.env.FRAMEWORK_DIR ?? resolve(REPO_ROOT, '.framework');
const NARROW_PATHS = (process.env.FRAMEWORK_SPARSE_PATHS ?? 'docs/site').split(/[\s,]+/).filter(Boolean);
const FULL_PATHS = ['docs', 'README.md', 'packages/core/README.md'];
const DEBUG = process.env.LOG_LEVEL === 'debug';
const T0 = Date.now();

const info = (msg) => console.log(`[fetch-framework] ${msg}`);
const debug = (msg) => DEBUG && console.log(`[fetch-framework:debug] ${msg}`);
const die = (step, cause) => {
  console.error(`[fetch-framework] FAIL at step "${step}": ${cause}`);
  console.error(`[fetch-framework] pin file: ${PIN_FILE} · repo: ${REPO}`);
  process.exit(1);
};

/** Run git (or other) commands; loud, named failure on non-zero exit. */
function run(step, cmd, args, opts = {}) {
  debug(`${step}: ${cmd} ${args.join(' ')} ${opts.cwd ? `(cwd ${opts.cwd})` : ''}`);
  try {
    const out = execFileSync(cmd, args, {
      cwd: opts.cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_ASKPASS: 'echo' },
    });
    return out;
  } catch (err) {
    const stderr = (err.stderr ?? '').toString().trim().split('\n').slice(-3).join(' | ');
    die(step, `${cmd} ${args[0]} failed: ${err.message.split('\n')[0]}${stderr ? ` — git: ${stderr}` : ''}`);
  }
}

// ── Mode ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const fullMode = argv[0] === '--full';
const fullDir = fullMode ? argv[1] : undefined;
if (fullMode && !fullDir) die('mode', '--full requires a target directory');
const targetDir = fullMode ? resolve(fullDir) : NARROW_DIR;
const sparsePaths = fullMode ? FULL_PATHS : NARROW_PATHS;
debug(`argv: ${JSON.stringify(argv)} · fullMode=${fullMode} · target=${targetDir}`);

// ── 1. Read the pin ──────────────────────────────────────────────────────────
if (!existsSync(PIN_FILE)) die('read-pin', `pin file not found at ${PIN_FILE}`);
const pin = readFileSync(PIN_FILE, 'utf8')
  .split('\n')
  .map((l) => l.replace(/#.*$/, '').trim())
  .filter(Boolean)[0];
if (!pin) die('read-pin', `no non-comment line in ${PIN_FILE}`);
info(`pin: ${pin} (${/^[0-9a-f]{40}$/i.test(pin) ? 'sha' : 'branch'})`);

// ── 2. Resolve the pin to a SHA ──────────────────────────────────────────────
let sha;
if (/^[0-9a-f]{40}$/i.test(pin)) {
  sha = pin.toLowerCase();
  info(`pin is a literal SHA: ${sha}`);
} else {
  const ls = run('resolve', 'git', ['ls-remote', REPO, `refs/heads/${pin}`]);
  const line = ls.split('\n').find((l) => l.endsWith(`refs/heads/${pin}`));
  if (!line) die('resolve', `branch "${pin}" not found on ${REPO} (ls-remote returned no matching ref)`);
  sha = line.split(/\t/)[0].trim();
  info(`resolved ${pin} → ${sha}`);
}

// ── 3. Cache check: same SHA + tree already present → skip the fetch ─────────
const shaFile = resolve(targetDir, 'SHA');
if (existsSync(shaFile) && existsSync(resolve(targetDir, ...sparsePaths[0].split('/')))) {
  const cached = readFileSync(shaFile, 'utf8').trim();
  if (cached === sha) {
    info(`cache hit: ${targetDir} already holds ${sha} — skipping fetch`);
    info(`done in ${Date.now() - T0}ms`);
    console.log(`FRAMEWORK_SHA=${sha}`);
    process.env.FRAMEWORK_SHA = sha;
    process.exit(0);
  }
  info(`stale pin cache (${cached}) → refetching at ${sha}`);
}

// ── 4. Materialise the tree (depth-1 sparse fetch) ───────────────────────────
info(`fetching ${fullMode ? 'full surface' : `sparse ${sparsePaths.join(', ')}`} at ${sha} into ${targetDir}`);
rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
run('init', 'git', ['init', '-q', '.'], { cwd: targetDir });
run('remote', 'git', ['remote', 'add', 'origin', REPO], { cwd: targetDir });
run('fetch', 'git', ['fetch', '--depth', '1', '--quiet', 'origin', sha], { cwd: targetDir });
run('sparse-init', 'git', ['sparse-checkout', 'init', '--no-cone'], { cwd: targetDir });
run('sparse-set', 'git', ['sparse-checkout', 'set', '--', ...sparsePaths], { cwd: targetDir });
run('checkout', 'git', ['checkout', '-q', 'FETCH_HEAD'], { cwd: targetDir });

// ── 5. Verify the requested paths actually landed ────────────────────────────
for (const p of sparsePaths) {
  if (!existsSync(resolve(targetDir, p))) {
    die('verify', `sparse path "${p}" is absent at ${sha} — does ${REPO}@${pin} carry it?`);
  }
}

// ── 6. Export the SHA ────────────────────────────────────────────────────────
writeFileSync(shaFile, `${sha}\n`);
process.env.FRAMEWORK_SHA = sha;
info(`wrote ${shaFile}`);
info(`done in ${Date.now() - T0}ms`);
console.log(`FRAMEWORK_SHA=${sha}`);
