---
title: "bridge await (await.ts)"
description: "Census H10 — the result read-back half of the bridge — watches a dispatched task to a terminal state over the WebSocket status stream and prints the result; clone-only (deliberately absent from the vendor copy)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge await (await.ts)

**Status:** shipped-beta · **Ships to:** clone ONLY — "NOT in the vendor copy" (census row H10; verified below: the vendored tree deliberately omits it) · **Fires at:** run after dispatch (H2 fired the task fire-and-forget inside a PostToolUse hook that must not block).

## What it is

`packages/runtime-bridge/src/cli/await.ts` — "the result read-back half of the bridge" (`src/cli/await.ts:2`). It "closes the \"результат назад\" loop": dispatch.ts fires fast and unobserved; "this command is run afterwards to watch the task to a terminal state and print the result, removing the manual \"go check aif-handoff's UI\" step" (`:7-9`).

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/await.ts <taskId> [--timeout-ms N]`, or `<taskId> --once` (`:5-6`).

**Two modes** (`:11-14`): default — "block on awaitDone (WebSocket status stream) until the task is done/verified (success) or blocked_external (resolves, !success), then print the TaskResult as JSON. `--timeout-ms` bounds the wait"; `--once` — "non-blocking getStatus snapshot (point-in-time), print + exit".

**Backend resolution:** "resolved the same way as dispatch (RUNTIME_BRIDGE_MODE + available()). The handle is reconstructed from the taskId argument — backend.name supplies the handle.backend tag" (`:16-18`). The WebSocket stream itself is `aifWsStatus.ts` (H20) — `ws://<host>:3009/ws`, same port as REST.

**Exit codes** (`:24-29`): default (await) mode — "0 = terminal success (done/verified); 1 = non-success (blocked_external) / timeout / error"; `--once` — "0 unless the backend reports an 'error' state. A still-running task (pending/running) also exits 0 — a snapshot is not a verdict; use the default (await) mode when you need a terminal success/fail code."

**Why clone-only:** the vendor README's deliberate-omissions list — `src/cli/await.ts` is "the one agent-loop entrypoint **no shipped skill mentions** (measured 2026-08-17: `grep -rl 'cli/await\.ts' --include='*.md' .claude/skills/` → 0 files …)"; its closure is already present, "so admitting it later is a one-file copy" (`vendor/README.md:82-90`).

**Fail mode / which channel fails:** non-zero exit on timeout/error in await mode (the waiter's channel); the underlying status channel is the WS broadcast (`task:updated`/`task:moved`, payload `{id, title, status}`) with REST `GET /tasks/:id` as the snapshot fallback (H20).

## Satellites & companions

Consumer of aifWsStatus (H20) and the RuntimeBackend contract's `awaitDone` (H13); counterpart of dispatch (H2); resolver (H14) picks its backend; sibling of questions/answer in the loop (H7, H6).

## Anchors

- `packages/runtime-bridge/src/cli/await.ts:2` — «* CLI await/status entrypoint — the result read-back half of the bridge.»
- `packages/runtime-bridge/src/cli/await.ts:5` — «*   tsx packages/runtime-bridge/src/cli/await.ts <taskId> [--timeout-ms N]»
- `packages/runtime-bridge/src/cli/await.ts:25` — «*   default (await): 0 = terminal success (done/verified); 1 = non-success»
- `packages/runtime-bridge/vendor/README.md:85` — «- `src/cli/await.ts` — the one agent-loop entrypoint **no shipped skill mentions** (measured»
