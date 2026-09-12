---
title: "bridge backend contract (backend.ts + types.ts)"
description: "Census H13 — the RuntimeBackend interface every dispatch backend implements (available/dispatch/getStatus/awaitDone) and the shared MVP shapes (KickoffSpec, TaskHandle, TaskStatus, TaskResult)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge backend contract (backend.ts + types.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — both files are in the vendored dispatch closure) and clone · **Fires at:** never on its own — it is the interface + type layer every backend (H15, H16, H17) and every CLI call path implements.

## What it is

Two files that fix the bridge's seams: `packages/runtime-bridge/src/backend.ts` — "RuntimeBackend interface — the common contract for all runtime bridge backends" (`src/backend.ts:2`) — and `src/types.ts` — "Core type definitions for the runtime-bridge adapter … Keep shapes MVP" (`src/types.ts:2-5`).

## How it works

**The contract** — four methods (`backend.ts:22-43`): `available()` — "Probe whether this backend is currently reachable / usable. MUST be cheap (≤1s timeout, no side effects)" (`:20-22`); `dispatch(kickoff: KickoffSpec): Promise<TaskHandle>` — "On failure throws a BackendError" (`:29-31`); `getStatus(handle)` (`:35`); `awaitDone(handle, timeoutMs?)` → `TaskResult` (`:43`). Backend names are a closed union: `'aif-handoff' | 'amux' | 'manual'` (`:14-15`).

**The dependency-free substrate invariant** (`:6-9`): "Design invariant (DECISION=C): substrate stays dependency-free … The main packages/core substrate imports NOTHING from this package" — the bridge is opt-in for consumers; the enforcement substrate never pulls it in.

**The shared shapes** (`types.ts`): `KickoffSpec` — "Represents a dispatched kickoff document. Derived from the `.claude/orchestrator-prompts/<umbrella>/kickoff.md` file content" (`types.ts:12-14`) — carries `filePath`, `content`, `umbrellaName` ("derived from kickoff directory name"), and the SHA-256 used for dedup. `TaskHandle`, `TaskStatus`, `TaskResult` complete the set. `@dual-pair: runtime-bridge-types` on both files.

**Fail mode / which channel fails:** the contract's failure channel IS `BackendError` — every backend wraps its failures in it, and dispatch.ts's environmental-vs-spec split (exit 0 vs 2, H2) and aifHttp's mapping (H11) are consumers of that vocabulary.

## Satellites & companions

Implemented by AifHandoffBackend (H15), ManualBackend (H17), AifFireBackend (H16, deliberately NOT `implements` — it must not widen the name union); selected by resolver (H14); consumed by every CLI; vendored as dispatch closure (H21).

## Anchors

- `packages/runtime-bridge/src/backend.ts:2` — «* RuntimeBackend interface — the common contract for all runtime bridge backends.»
- `packages/runtime-bridge/src/backend.ts:22` — «  available(): Promise<boolean>;»
- `packages/runtime-bridge/src/backend.ts:29` — «  dispatch(kickoff: KickoffSpec): Promise<TaskHandle>;»
- `packages/runtime-bridge/src/backend.ts:43` — «  awaitDone(handle: TaskHandle, timeoutMs?: number): Promise<TaskResult>;»
- `packages/runtime-bridge/src/types.ts:2` — «* Core type definitions for the runtime-bridge adapter.»
- `packages/runtime-bridge/src/types.ts:13` — « * `.claude/orchestrator-prompts/<umbrella>/kickoff.md` file content.»
