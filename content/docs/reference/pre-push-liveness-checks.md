---
title: "pre-push dynamic check pair (guard-liveness, cmd-script-liveness)"
description: "Census D24 — the two await-import()ed liveness gates of the TS-core pre-push hook that prove a guard actually fires, and that die() loudly (never degrade silently) when their module graph is missing."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# pre-push dynamic check pair (guard-liveness, cmd-script-liveness)

**Status:** shipped-beta · **Ships to:** npm-lane consumers — copied by the same installer loop as the static trio (`setup.d/50-hooks.sh:33-34`) · **Fires at:** every `git push`, on the sections of the TS-core pre-push gate where the changed-file set makes them relevant.

## What it is

Two change-scoped liveness checks that pre-push.ts loads lazily via `await import()` rather than static import: `checks/guard-liveness.ts` (runs the ESLint roundtrip over changed manifest rules to prove the guard catches its violation) and `checks/cmd-script-liveness.ts` (the same liveness proof for `command`/`script`-type manifest rules). Lazy loading is deliberate — these modules pull the ESLint stack, which needs a root-level workspace install the shipped consumer graph does not include.

## How it works

**guard-liveness.ts** "Reuses the ESLint roundtrip logic from validator/gate-rule-tester.ts" and covers "the rules-as-tests namespace from both packages" — core (R2/R7/R8) and preset-next-15-canonical (R12/R14/R20) (`packages/core/hooks/checks/guard-liveness.ts:12-19`). "Rules using unavailable plugins (R5 @typescript-eslint, R15 jsx-a11y, R16 @next/next) are skipped with a visible SKIP notice — not failures" (`:21-23`). The pre-push section imports the gate, and on load failure calls `die(...)` — "❌ guard-liveness: failed to load the ESLint stack — the gate requires a root-level workspace install" (`packages/core/hooks/pre-push.ts:519-525`). The section header states the contract plainly: "resolution failure here is a loud die, never a silent pass" (`:515`).

**cmd-script-liveness.ts** closes "the liveness gap for `check.type ∈ {command, script}` manifest rules" (`packages/core/hooks/checks/cmd-script-liveness.ts:4-5`); liveness mode is "DERIVED from check.type by default" (command → run-and-assert, script → resolve-and-run) with an optional manifest `liveness-mode` override, and "the mode rides IN the manifest … NO rule-id→mode map is hard-coded in this runner" (`:9-16`). Its honesty contract: the check "must exit 0 on the CLEAN pre-fixture state AND non-zero on the violating fixture to `pass`"; a check that cannot run in this environment "is SKIPPED … NEVER force-passed" (`:18-28`).

**Fail mode / which channel fails:** two distinct channels, both ending the push. (1) Missing module graph (e.g. the consumer never ran a root `npm install`, or the eslint-rules barrel didn't ship) → `die()` at import time → non-zero exit → **push blocked** (`pre-push.ts:521-526`, `:585-588`). (2) The check ran and caught a non-live guard → failure report → non-zero exit → **push blocked**. Skips (unavailable plugin, unavailable binary, clean-state crash) and EXEMPT verdicts are ℹ/⚠ notices that do NOT block — "this distinguishes 'guard caught the violation' from 'script crashed before evaluating it'" (`cmd-script-liveness.ts:24-26`).

## Satellites & companions

Part of the D24b-shipped import graph; the installer comment notes the eslint-rules barrel (F43 territory) must ship too or "guard-liveness.ts die()/push-blocks on load even after the 3 checks above ship" (`setup.d/50-hooks.sh:37-39`); static siblings are the check trio (D23); `@dual-pair: guard-liveness-eslint` pairs the TS gate with its portable form (`guard-liveness.ts:8`).

## Anchors

- `setup.d/50-hooks.sh:33` — «  checks/guard-liveness.ts \» (pair at :33-34)
- `setup.d/50-hooks.sh:38` — «# ../../eslint-rules/index.ts). Without this group, guard-liveness.ts die()/push-blocks»
- `packages/core/hooks/checks/guard-liveness.ts:4` — « * Channel: pre-push (liveness — runs ESLint roundtrip).»
- `packages/core/hooks/checks/guard-liveness.ts:21` — « * Rules using unavailable plugins (R5 @typescript-eslint, R15 jsx-a11y, R16 @next/next)»
- `packages/core/hooks/checks/cmd-script-liveness.ts:4` — « * Closes the liveness gap for `check.type ∈ {command, script}` manifest rules — the»
- `packages/core/hooks/checks/cmd-script-liveness.ts:22` — « * exit 0 on the CLEAN pre-fixture state AND non-zero on the violating fixture to»
- `packages/core/hooks/pre-push.ts:515` — «  // resolution failure here is a loud die, never a silent pass — the gate only»
- `packages/core/hooks/pre-push.ts:519` — «    gate = await import('./checks/guard-liveness.ts');»
- `packages/core/hooks/pre-push.ts:583` — «    gate = await import('./checks/cmd-script-liveness.ts');»
