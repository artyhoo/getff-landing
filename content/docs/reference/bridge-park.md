---
title: "bridge park (park.ts)"
description: "Census H4 — the agent-side \"I hit a hard fork, stop and ask\" half of the bridge — parks a task via PUT /tasks/:id {paused:true} so the coordinator stops re-picking it, and anchors the question in the plan."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge park (park.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/park.ts` is in the vendored closure) and clone · **Fires at:** run BY the autonomous agent itself, from inside the aif agent container, when it hits a genuine blocking fork it cannot default.

## What it is

`packages/runtime-bridge/src/cli/park.ts` — "the agent-side «I hit a hard fork, stop and ask» half" (`src/cli/park.ts:3`). Soft/advisory questions do NOT use it ("they already flow non-blocking to chat"); it is "ONLY for a hard fork that blocks continuing the implementation" (`:12-13`).

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/park.ts --task <id> --question "<fork + options>"`; `--task` "defaults to $HANDOFF_TASK_ID (set in the aif agent context)" (`:5-6`).

**Mechanism** (spec §2 F2/F3/F5 — `:8-11`): a single `PUT /tasks/:id { paused:true, blockedReason, plan }` where `paused:true` is THE stop — "the coordinator candidate query filters paused=false, so the agent is NOT re-picked (blockedReason ALONE does NOT stop it — F2)"; `blockedReason` carries the question and makes questions.ts `isParked()` true; the plan gains an `## ⏸ OPEN QUESTION` anchor (the shared constant, H5) under which the resume answer is injected.

**Env (base-URL precedence):** `RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? http://localhost:3009` (`:16`). park.ts is "the ONLY CLI run from INSIDE the aif agent container, which exposes the service as API_BASE_URL=http://api:3009 (localhost is unreachable there)" (`:17-18`) — the container override is why the triple precedence exists.

**Fail mode / which channel fails:** "Exit codes: 0 parked; 1 bad args or REST error (message on stderr)" (`:22`) — the agent's `$?` tells it whether the park landed; a failed park leaves the task running, which is exactly the failure the non-zero code surfaces.

## Satellites & companions

Writes the shared OPEN-QUESTION anchor (H5); its parks are read back by questions.ts (H7) and resolved by answer.ts (H6); REST plumbing shared with every CLI (H11); arg parsing/`isMain` guard from cliEntry (H12).

## Anchors

- `packages/runtime-bridge/src/cli/park.ts:3` — «* CLI park entrypoint — the agent-side "I hit a hard fork, stop and ask" half.»
- `packages/runtime-bridge/src/cli/park.ts:5` — «* Usage (the autonomous agent runs this on a genuine BLOCKING fork it cannot default):»
- `packages/runtime-bridge/src/cli/park.ts:10` — «*   - paused:true is THE stop — the coordinator candidate query filters paused=false,»
- `packages/runtime-bridge/src/cli/park.ts:18` — « * Config: base URL precedence RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? http://localhost:3009.»
- `packages/runtime-bridge/src/cli/park.ts:22` — «* Exit codes: 0 parked; 1 bad args or REST error (message on stderr).»
