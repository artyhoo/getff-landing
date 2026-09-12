---
title: "bridge ensure-parallel (ensure-parallel.ts)"
description: "Census H9 — the self-heal half of the dirty_worktree finding — flips a project's parallelEnabled on through the only write path aif exposes, carefully preserving budgets the naive write would wipe."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge ensure-parallel (ensure-parallel.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/ensure-parallel.ts` is vendored) and clone · **Fires at:** operator run, smoke test, or auto pre-dispatch — also imported by `AifHandoffBackend.dispatch()` as a pre-flight.

## What it is

`packages/runtime-bridge/src/cli/ensure-parallel.ts` — "the self-heal half of Finding A (dirty_worktree)" (`src/cli/ensure-parallel.ts:3`). aif creates a per-task git worktree only when a 3-gate AND holds: "AIF_TASK_WORKTREES_ENABLED (env) && project.parallelEnabled (DB) && projectSupportsTaskWorktrees" (`:10-11`). Gate 2 is a project-level DB flag set ONLY via the web UI / raw DB — "there is no env or config.yaml knob, so a freshly-provisioned instance has it 0 and every task runs in-place on the shared checkout → dirties it → the next dispatch 409s on dirty_worktree. This guard re-applies the fix on any instance" (`:11-14`).

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/ensure-parallel.ts --project <id>`; `--project` "defaults to $RUNTIME_BRIDGE_AIF_PROJECT_ID" (`:5-6`).

**Why the round-trip, NOT a minimal PUT** (`:19-25`): aif exposes no targeted `parallelEnabled` write — only `PATCH /:id/auto-queue-mode` exists. "The sole parallelEnabled path is the full PUT /projects/:id, whose handler NULLs each omitted `*MaxBudgetUsd` field … So a minimal `{name,rootPath,parallelEnabled}` PUT would wipe any UI-set budget." The guard therefore "read[s] the full project back from GET /projects and write[s] every field, flipping ONLY parallelEnabled. Budgets that are null stay omitted". The noted long-term fix is an upstream `PATCH /projects/:id/parallel-enabled` — "this guard is the our-side stopgap (BFR: REFERENCE upstream, build the glue)" (`:26-27`).

**Env:** `RUNTIME_BRIDGE_AIF_URL` (base URL) + `RUNTIME_BRIDGE_AIF_PROJECT_ID` (default project).

**Fail mode / which channel fails:** "Exit codes: 0 (already-enabled or enabled-now); 1 bad args / project missing / REST error" (`:31`) — the caller (including the backend's own pre-dispatch path) can gate on `$?`; REST failures map through the shared BackendError mapping (H11).

## Satellites & companions

Consumed as a pre-flight by AifHandoffBackend.dispatch (H15); the dispatch it protects is H2; the worktree layout it enables is what harvest.ts reads back (`worktreePath`, H11's `AifTaskFull`); REST plumbing H11.

## Anchors

- `packages/runtime-bridge/src/cli/ensure-parallel.ts:3` — «* CLI ensure-parallel entrypoint — the self-heal half of Finding A (dirty_worktree).»
- `packages/runtime-bridge/src/cli/ensure-parallel.ts:11` — «*   (planner.ts): AIF_TASK_WORKTREES_ENABLED (env) && project.parallelEnabled»
- `packages/runtime-bridge/src/cli/ensure-parallel.ts:20` — «*   exists. The sole parallelEnabled path is the full PUT /projects/:id, whose»
- `packages/runtime-bridge/src/cli/ensure-parallel.ts:31` — «* Exit codes: 0 (already-enabled or enabled-now); 1 bad args / project missing / REST error.»
