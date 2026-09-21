/**
 * self-test-mermaid-build.mjs — the R6 Mermaid BUILD-INTEGRATION fixture
 * (W-2, harvest fidelity audit round 1, 2026-09-21).
 *
 * WHY THIS EXISTS: the paired unit fixtures (`self-test-gates.mjs --only
 * mermaid`) call `assertAllowed` in isolation — they prove the allow-list
 * module fires, but NOT that a fence ever REACHES it. No committed content
 * page carries a mermaid fence today, so if the remark rewrite stops firing
 * (plugin order / preset change in source.config.ts), a `gantt` fence ships
 * as a plain shiki code block and both unit fixtures stay green. Kickoff §6
 * seam: «an unsupported type must FAIL the build» — the BUILD, not the
 * module. So this script exercises the real pipeline end to end:
 *
 *   remarkMdxMermaid (source.config.ts) → <Mermaid> (mdx-components.tsx)
 *     → assertAllowed (lib/mermaid-allowlist.ts) → renderMermaid
 *     → build-time SVG in the static export.
 *
 * Three subcommands, wired as separate pr.yml steps:
 *   plant   — write content/docs/mermaid-build-fixture.md (a VALID flowchart
 *             fence) so the REAL production-config build renders it. Runs
 *             BEFORE `next build`; adds no separate build — the page rides
 *             the export the job is already producing, and clean removes it
 *             afterwards so nothing lands in the repo.
 *   verify  — (a) SVG ARM: the built page must carry a RENDERED diagram —
 *             the Mermaid component's `mermaid-svg` wrapper + an `<svg>` —
 *             and NO shiki `language-mermaid` code block (what the fence
 *             would degrade to if the rewrite stopped firing).
 *             (b) GANTT ARM: inject an unsupported-type fence (`gantt`) into
 *             a THROWAWAY copy of the repo and run `next build` there — it
 *             must exit non-zero AND its output must name the allow-list's
 *             rejection ("unsupported diagram type"), proving it failed
 *             THROUGH the gate rather than for some copy artefact.
 *   clean   — remove the planted page (idempotent; pr.yml runs it under
 *             `if: always()`).
 *
 * Fail-closed: a missing plant, a missing built page, an unrendered fence,
 * and a throwaway build that exits 0 are hard failures. A throwaway build
 * that fails WITHOUT naming the allow-list rejection is never accepted as
 * the RED — it is retried on a fresh copy (bounded, 3 attempts) and then
 * dies naming itself.
 *
 * The throwaway copy excludes node_modules (copied separately — a symlink
 * makes Turbopack panic), .git, .next, out/ and .scratch at the repo-root
 * level; .framework/ is copied (the build reads the pinned tree). The copy
 * is deleted after the case.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const DEBUG = process.env.LOG_LEVEL === 'debug';
const T0 = Date.now();

const FIXTURE_SLUG = 'mermaid-build-fixture';
const FIXTURE_PAGE = join(REPO_ROOT, 'content', 'docs', `${FIXTURE_SLUG}.md`);
const FIXTURE_OUT = join(REPO_ROOT, 'out', 'docs', FIXTURE_SLUG, 'index.html');
const GANTT_SLUG = 'mermaid-gantt-fixture';

const VALID_CHART = 'flowchart TD\n    A[Start] --> B[End]';
const GANTT_CHART = 'gantt\n    title Plan\n    section A\n    task t :a1, 2026-01-01, 2d';

const fence = (chart) => `\`\`\`mermaid\n${chart}\n\`\`\``;
const page = (chart) =>
  `---\n` +
  `title: "Mermaid build fixture"\n` +
  `description: "S1 BUILD fixture planted by scripts/self-test-mermaid-build.mjs for one build and removed after — never committed, never shipped."\n` +
  `---\n\n${fence(chart)}\n`;

const info = (m) => console.log(`[mermaid-build-fixture] ${m}`);
const die = (msg) => {
  console.error(`[mermaid-build-fixture] FAIL: ${msg}`);
  process.exit(1);
};

function plant() {
  const t = Date.now();
  writeFileSync(FIXTURE_PAGE, page(VALID_CHART));
  info(`planted ${relative(REPO_ROOT, FIXTURE_PAGE)} with a valid flowchart fence (${Date.now() - t}ms) — the real build must render it`);
}

function clean() {
  const existed = existsSync(FIXTURE_PAGE);
  rmSync(FIXTURE_PAGE, { force: true });
  info(`fixture page ${existed ? 'removed' : 'already absent (idempotent)'}`);
}

/** (a) The valid fence must have gone through the COMPONENT (wrapper div),
 * come out as a build-time <svg>, and NOT degraded to a shiki code block. */
function verifySvgArm() {
  if (!existsSync(FIXTURE_PAGE)) {
    die('fixture page not planted — run the `plant` step BEFORE `next build`');
  }
  if (!existsSync(FIXTURE_OUT)) {
    die(`built page absent at ${relative(REPO_ROOT, FIXTURE_OUT)} — was the fixture planted before the build?`);
  }
  const html = readFileSync(FIXTURE_OUT, 'utf8');
  const hasWrapper = html.includes('mermaid-svg');
  const hasSvg = /<svg[\s>]/.test(html);
  const hasCodeBlock = html.includes('language-mermaid');
  if (!hasWrapper || !hasSvg || hasCodeBlock) {
    die(
      `the valid flowchart fence did NOT render as a build-time SVG ` +
        `(mermaid-svg wrapper=${hasWrapper} <svg>=${hasSvg} shiki-code-block=${hasCodeBlock}) — ` +
        `the remarkMdxMermaid rewrite or the <Mermaid> component mapping is not firing`,
    );
  }
  info(`svg arm: ${relative(REPO_ROOT, FIXTURE_OUT)} carries a rendered <svg> in the Mermaid wrapper, no shiki code block`);
}

/** (b) An unsupported type must FAIL a real `next build` (kickoff §6).
 * Returns only when a build RED has been NAMED by the allow-list; every
 * other outcome is fatal. */
function verifyGanttArm() {
  const ATTEMPTS = 3;
  let fatal = null;
  for (let attempt = 1; attempt <= ATTEMPTS && !fatal; attempt++) {
    const t = Date.now();
    // INSIDE the repo under .scratch/ (gitignored) — the build inputs stay
    // on the same filesystem the site actually builds from.
    const dst = join(REPO_ROOT, '.scratch', `mermaid-throwaway-${process.pid}-${attempt}`);
    // Top-level entries only; everything else (app, content, lib,
    // components, scripts, .framework, .source, configs, package*.json) is
    // copied. tar, because cpSync refuses a destination inside its own
    // source tree.
    const EXCLUDES = ['./node_modules', './.git', './.next', './out', './.scratch'];
    try {
      rmSync(dst, { recursive: true, force: true });
      mkdirSync(dst, { recursive: true });
      const pack = spawnSync(
        'tar',
        ['-C', REPO_ROOT, ...EXCLUDES.flatMap((e) => ['--exclude', e]), '-cf', '-', '.'],
        { encoding: 'buffer', maxBuffer: 512 * 1024 * 1024 },
      );
      if (pack.status !== 0) fatal = `tar pack of the repo failed: ${pack.stderr?.toString().slice(0, 200)}`;
      if (!fatal) {
        const unpack = spawnSync('tar', ['-xf', '-', '-C', dst], { input: pack.stdout, encoding: 'buffer' });
        if (unpack.status !== 0) fatal = `tar unpack into the throwaway failed: ${unpack.stderr?.toString().slice(0, 200)}`;
      }
      // node_modules is COPIED, not symlinked: Turbopack (the default build
      // in this Next version) panics on a workspace symlink pointing outside
      // the project root — measured: «Symlink [project]/node_modules is
      // invalid, it points out of the filesystem root». And the copy must be
      // `cp -a`, NOT fs.cpSync: bisected 2026-09-21, a cpSync copy of
      // node_modules kills the build workers with «Invariant: Expected
      // workStore to be initialized» before any page renders, while a
      // `cp -a` copy (symlinks + timestamps preserved) builds clean to the
      // named mermaid rejection.
      if (!fatal) {
        const cp = spawnSync('cp', ['-a', join(REPO_ROOT, 'node_modules'), join(dst, 'node_modules')], { encoding: 'utf8' });
        if (cp.status !== 0) fatal = `cp -a of node_modules failed: ${cp.stderr?.slice(0, 200)}`;
      }
      // Pin the workspace root for THE COPY ONLY: nested under the repo,
      // Next sees two lockfiles and infers the OUTER repo as root (measured
      // warning), which destabilises the build workers before the mermaid
      // page is even reached. This is the fix Next's own warning prescribes;
      // the pipeline under test (source.config.ts, the plugin, the
      // component, the allow-list) is untouched.
      if (!fatal) {
        const cfgPath = join(dst, 'next.config.mjs');
        const anchor = 'const nextConfig = {';
        const cfg = readFileSync(cfgPath, 'utf8');
        if (!cfg.includes(anchor)) {
          fatal = 'next.config.mjs does not match the expected shape — refusing to pin turbopack.root blindly';
        } else {
          writeFileSync(
            cfgPath,
            cfg.replace(
              anchor,
              `${anchor}\n  // Pinned for this throwaway copy only (self-test-mermaid-build.mjs):\n  // the copy is nested in the repo, so workspace-root inference would\n  // mis-pick the outer lockfile. Not part of the committed config.\n  turbopack: { root: ${JSON.stringify(dst)} },`,
            ),
          );
        }
      }
      if (!fatal) {
        writeFileSync(join(dst, 'content', 'docs', `${GANTT_SLUG}.md`), page(GANTT_CHART));
        info(`gantt arm (attempt ${attempt}/${ATTEMPTS}): throwaway at ${relative(REPO_ROOT, dst)} — running the real build (must exit non-zero, naming the rejection)`);
        const r = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', cwd: dst });
        const out = `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
        if (DEBUG) console.log(out.slice(-4000));
        if (r.status === 0) {
          fatal = 'the throwaway build with a gantt fence exited 0 — an unsupported type did NOT fail the build (the §6 seam is broken)';
        } else if (/unsupported diagram type/i.test(out)) {
          const line = out.split('\n').find((l) => /unsupported diagram type/i.test(l))?.trim().slice(0, 160);
          info(`gantt arm: build RED as designed in ${Date.now() - t}ms (exit ${r.status}) · ${line}`);
          return;
        } else {
          // Measured flake mode: Next workers dying with «Invariant:
          // Expected workStore to be initialized» before the mermaid page
          // is reached (under container load) — a failure for the WRONG
          // reason, never acceptable as the RED. Retry on a fresh copy.
          info(`gantt arm: attempt ${attempt}/${ATTEMPTS} failed (exit ${r.status}) without naming the allow-list rejection — retrying on a fresh copy`);
        }
      }
    } finally {
      rmSync(dst, { recursive: true, force: true });
    }
  }
  die(
    fatal ??
      `the gantt build failed ${ATTEMPTS} attempt(s) without ever naming the allow-list rejection ` +
        `("unsupported diagram type") — an unnamed failure is not the designed RED (kickoff §6)`,
  );
}

const cmd = process.argv[2];
if (cmd === 'plant') {
  plant();
} else if (cmd === 'clean') {
  clean();
} else if (cmd === 'verify') {
  if (!existsSync(join(REPO_ROOT, 'out'))) die('out/ absent — run the build first');
  verifySvgArm();
  verifyGanttArm();
  info(`done in ${Date.now() - T0}ms`);
  console.log('MERMAID_BUILD_FIXTURE=PASS');
} else {
  die('usage: node scripts/self-test-mermaid-build.mjs <plant|verify|clean>');
}
