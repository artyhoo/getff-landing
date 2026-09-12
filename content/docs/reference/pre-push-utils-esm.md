---
title: "pre-push utils pair + ESM marker (run-check.ts, git.ts, hooks package.json)"
description: "Census D24b — the injected I/O seam of the shipped pre-push hook (run-check.ts, git.ts) and the hooks-scoped {\"type\":\"module\"} package.json that keeps the authored-as-ESM hook loading as ESM in consumers."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# pre-push utils pair + ESM marker (run-check.ts, git.ts, hooks package.json)

**Status:** shipped-beta · **Ships to:** npm-lane consumers — first three entries of the TS-core copy list plus the marker copy (`setup.d/50-hooks.sh:27-29`, `:58`) · **Fires at:** every `git push`, as the process boundary and git boundary of every pre-push check (static trio D23, dynamic pair D24, the hook's own sections D22).

## What it is

The infrastructure pair under `packages/core/hooks/utils/` that all shipped pre-push checks funnel external commands and git I/O through, plus one two-line file with a load-bearing content type: `templates/shared/hooks-package.json` — `{"type": "module"}` — copied to the consumer's `packages/core/hooks/package.json` so the authored-as-ESM hook actually loads as ESM there.

## How it works

**run-check.ts** is the "testable external-command runner for the pre-push hook" — an "ADAPT of Aider's `Linter.run_cmd`" that runs a command via the OS and captures exit code + stdout + stderr (`packages/core/hooks/utils/run-check.ts:2-5`). It strictly exceeds upstream on one axis: "we add a **timeout** case Aider omits — a hung actionlint / lychee must not hang the hook" (`:12-13`). The `CheckResult` surface synthesizes exit codes for the failure classes upstream doesn't model: "Process exit code; synthesised for timeout (124) and spawn-failure (127)" (`:18`), plus `timedOut` and `notFound` booleans (`:22-25`).

**git.ts** funnels "All git I/O for the trailer checks" through thin helpers "so the check logic (checks/prior-art.ts) stays pure + unit-testable against a fake GitProvider" (`packages/core/hooks/utils/git.ts:3-6`). Changed-file scoping (`getChangedFiles`) is the lint-staged technique adapted from aif-handoff: "scope expensive checks to the push range `origin/main..HEAD` rather than the whole tree" (`:8-10`). The exported `GitProvider` interface is the injection seam the check trio's unit tests fake.

**hooks-package.json (the ESM marker).** GH #532: the shipped `pre-push.ts` is authored as an ES module, "but its module-type is decided by the NEAREST package.json" — in the framework repo `packages/core/package.json` declares `"type":"module"`, but "in a consumer the nearest package.json is usually the project root with no `type` → CJS default → tsx's `require(esm)` bridge hits Node ≥22 cycle detection and the hook dies with ERR_REQUIRE_CYCLE_MODULE *at module load*, before any §7/§1.7 check runs (every git push aborts with a stack trace)" (`setup.d/50-hooks.sh:50-55`). The fix is a hooks-scoped marker — "Scoped to packages/core/hooks/ (AIF-owned) so it can't collide with a consumer's own packages/core package or be picked up as a workspace member" (`:56-57`) — copied by `copy_safe … hooks-package.json … "$PROJECT_ROOT/packages/core/hooks/package.json"` (`:58`). The file is exactly `{\n  "type": "module"\n}` (`packages/core/templates/shared/hooks-package.json:1-3`).

**Fail mode / which channel fails:** without the marker, the failure is at module load — every push aborts with `ERR_REQUIRE_CYCLE_MODULE` before any check runs (the marker is what prevents that channel). Through `runCheck`, a command that cannot be found surfaces as `notFound`/exit 127 and a hang as `timedOut`/exit 124 — synthesized codes the calling check converts into its failure report, so the push still aborts deterministically rather than hanging.

## Satellites & companions

Imported by pre-push.ts (D22) and the checks (D23, D24); the copy list they ride in is the same `setup.d/50-hooks.sh` block that ships the dispatcher pair (D20); the scoped-marker technique parallels the fallback dispatcher's Node-detection (D20/D21) in keeping the TS-core arm reachable.

## Anchors

- `setup.d/50-hooks.sh:28` — «  utils/run-check.ts \» (continuation list :26-34 also names utils/git.ts at :28)
- `setup.d/50-hooks.sh:53` — «# no "type" → CJS default → tsx's `require(esm)` bridge hits Node ≥22 cycle detection and the hook dies»
- `setup.d/50-hooks.sh:58` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/hooks-package.json" "$PROJECT_ROOT/packages/core/hooks/package.json"»
- `packages/core/hooks/utils/run-check.ts:2` — « * run-check.ts — testable external-command runner for the pre-push hook.»
- `packages/core/hooks/utils/run-check.ts:12` — « * Difference from upstream: we add a **timeout** case Aider omits — a hung»
- `packages/core/hooks/utils/git.ts:2` — « * git.ts — thin git helpers for the pre-push hook (Wave 10.2).»
- `packages/core/hooks/utils/git.ts:10` — « * push range `origin/main..HEAD` rather than the whole tree.»
- `packages/core/templates/shared/hooks-package.json:2` — «  "type": "module"»
