---
title: "ci-tool-pinning — pin CI tools"
description: "Class A rule with a pre-push gate: bare run: tool installs in workflows and repo shell scripts must carry version pins, --prefix installs must be lockfile-aware (npm ci), escape hatch # ci-tool-pin: allow."
---

> **Census id:** F7 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F7: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «editing `.github/workflows/**` or any repo shell script.» (`.claude/rules/ci-tool-pinning.md:19`) — paths:(6) + edit-time inject |

## What it bans

Unpinned, non-deterministic tool installs in CI. `.claude/rules/ci-tool-pinning.md:16` «# CI tool pinning — discipline rule»; Rule A: `.claude/rules/ci-tool-pinning.md:29` «In `.github/workflows/` YAML files, any bare `run:` shell command that installs a tool MUST include an explicit version pin:» with the two forms at `:31-32` («`pip install <pkg>==<ver>` (NOT `pip install <pkg>)`» / «`npm install -g <pkg>@<ver>` (NOT `npm install -g <pkg>)`»), and the rationale: `:34` «A bare install without a pin is non-deterministic: the CI job's behaviour depends on the package registry's current "latest", making CI output unreliable across time and across runner snapshots.» Rule B: `:40` «- `npm ci --prefix <P>` (NOT `npm install --prefix <P>`)» — «`npm ci` is strictly reproducible from `package-lock.json`» (`:42`). Class header: `:18` «> **Class:** A — companion principle test (paired-negative) shipped at `packages/core/hooks/unpinned-tool-install.test.ts` (issue #654, 2026-06-22); pre-push gate at `packages/core/hooks/pre-push.ts` (unpinnedToolInstallSection).»

## Never (fires)

A bare `run:` install with no version pin and no escape hatch — e.g. `pip install some-tool` in a workflow or shell script. The gate skips nothing silently: `.claude/rules/ci-tool-pinning.md:76` «A bare comment not containing this token does NOT trigger the escape hatch — the gate will still flag the line.» The honest deferred gap is stated, not hidden: `:44` «> **Deferred — bare root `npm install` is NOT yet gated.** … a prose-only MUST that the repo itself violates would be `#trap-stated-but-not-enforced` — the "documents lie; tests don't" failure this project exists to prevent.»

## Always (clean)

A pinned install, or the escape hatch with rationale — quoted from §3: `.claude/rules/ci-tool-pinning.md:69` «When a tool genuinely cannot or should not be version-pinned in a specific step, add the token `# ci-tool-pin: allow <reason>` at the end of the `run:` line:» and the example `:71-74`:

```yaml
- name: Install bleeding-edge tool
  run: pip install some-tool  # ci-tool-pin: allow no stable release; main branch only
```

Carve-outs (not flagged): `pip install -r <file>`, `pip install .`, `pip install -e .`, already-pinned installs, comments, printed hints (`echo`/`printf`), escape-hatch lines (`:57-65`).

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:15` «| `ci-tool-pinning.md` | A | editing `.github/workflows/**` or any repo shell script. | paths:(6), edit-time inject |»
- **Edit-time inject**, 6 globs: `.claude/rules/ci-tool-pinning.md:12` «<!-- globs: .github/workflows/**, .github/actions/**, *.sh, setup, .husky/**, plugin/hooks/** -->», inject text at `:13`.
- **Pre-push gate:** `unpinnedToolInstallSection` in `packages/core/hooks/pre-push.ts` (named at `:18`, `:99`, `:112`); wired into both `main()` and `PREPUSH_ONLY` paths (`:104`).
- **Paired-negative principle test (CI):** `packages/core/hooks/unpinned-tool-install.test.ts` (`:18`, `:113`).
- **zizmor CI gate (Rule B, REUSE verdict):** «Rule B is **enforced by the existing zizmor CI gate** (REUSE verdict, SSOT #153a) — not by a separate check.» (`:42`)
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: deterministic regex pre-push gate + CI principle test + zizmor.
