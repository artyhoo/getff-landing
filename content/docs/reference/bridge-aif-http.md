---
title: "bridge aifHttp (aifHttp.ts)"
description: "Census H11 — the SINGLE REST request implementation shared by every runtime-bridge CLI and the WS status snapshot, with one BackendError mapping and one timeout policy (deduped from copies that had already diverged)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge aifHttp (aifHttp.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/aifHttp.ts` is vendored; "already vendored for dispatch" and "the only shared sibling" of the five later-admitted CLIs) and clone · **Fires at:** inside every REST call the bridge CLIs make — never invoked directly by a human.

## What it is

`packages/runtime-bridge/src/cli/aifHttp.ts` — "Shared aif-handoff REST helpers — the SINGLE request implementation for every CLI in this tree and for the aifWsStatus REST snapshot" (`src/cli/aifHttp.ts:3-4`). It exists because "answer.ts `post` and aifWsStatus `getTaskStatus` used to carry their own copies, which had already diverged (#1597 ledger R-7 / S-4)" (`:5-6`).

## How it works

**The one error mapping** (`:4-5`): connection → `unavailable`; HTTP 429 → `quota_exceeded`; anything else → `dispatch_failed` — thrown as `BackendError` (imported from `../backend.js`, `:8`) so every caller branches on one code set. dispatch.ts's fallback eligibility (H2) keys exactly on this mapping's environmental codes.

**The task shape it reads:** `AifTaskFull` — "The subset of an aif-handoff task these CLIs read/mutate (GET /tasks/:id)" (`:11-12`) — carries `id/title/status/plan/paused/blockedReason` plus two aif-persisted fields harvest reads back: `branchName` ("aif's persisted feature-branch name (planner source-of-truth)", `:16-17`) and `worktreePath` ("aif's persisted per-task CHECKOUT — the worktree it ran the task in … Null on tasks that ran before/without parallel worktrees (11/183 live tasks, 2026-08-07)", `:19-24`).

**Env:** none of its own — base URL resolution lives in the callers (`RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? http://localhost:3009` convention).

**Fail mode / which channel fails:** every network failure surfaces as the mapped `BackendError` code on the calling CLI's stderr + exit-1 channel (H3/H4/H6/H7/H9's exit contracts); timeouts are the shared timeout policy of this module — one policy, not per-CLI guesses.

## Satellites & companions

The REST substrate under dispatch (H2), claim (H3), park (H4), answer (H6), questions (H7), ensure-parallel (H9), harvest's task reads, and aifWsStatus's REST snapshot (H20); the BackendError codes it throws are declared by backend.ts/types.ts (H13).

## Anchors

- `packages/runtime-bridge/src/cli/aifHttp.ts:3` — «* Shared aif-handoff REST helpers — the SINGLE request implementation for every CLI in»
- `packages/runtime-bridge/src/cli/aifHttp.ts:5` — «* mapping (connection → unavailable, 429 → quota_exceeded, other → dispatch_failed) and»
- `packages/runtime-bridge/src/cli/aifHttp.ts:11` — «/** The subset of an aif-handoff task these CLIs read/mutate (GET /tasks/:id). */»
- `packages/runtime-bridge/src/cli/aifHttp.ts:26` — «   * the fallback record when git's own worktree list has no entry for the branch; measuring»
- `packages/runtime-bridge/vendor/README.md:66` — «`cli/aifHttp.ts`, already vendored for dispatch. The copy stays import-closed — every relative»
