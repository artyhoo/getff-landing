---
title: "bridge ws status (aifWsStatus.ts)"
description: "Census H20 — the WebSocket-based status consumer for aif-handoff tasks — schema discovered from the aif source at build time of the feature, and the stream await.ts blocks on."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge ws status (aifWsStatus.ts)

**Status:** shipped-beta · **Ships to:** vendored module + clone consumer — the vendor copy CARRIES the file (it is the closure of `AifHandoffBackend → ./aifWsStatus.js`, `vendor/README.md:48`), but its only entrypoint consumer (`cli/await.ts`) is clone-only — so as a usable capability it is clone-side (the census's "clone" ships-to names the consumer; the vendored file is dead weight without it). · **Fires at:** whenever `awaitDone` (H13's contract, await.ts's default mode) or a REST status snapshot needs live task state.

## What it is

`packages/runtime-bridge/src/aifWsStatus.ts` — "aifWsStatus — WebSocket-based status consumer for aif-handoff tasks" (`src/aifWsStatus.ts:2`). Its header is a schema-discovery record: "SW-C SCHEMA DISCOVERY (kickoff §SCHEMA DISCOVERY FIRST requirement) … Discovered via gh api (2026-05-30)" (`:5-7`).

## How it works

**The discovered schema** (documented in-file, `:9-30`): the WS endpoint lives on the SAME port as the REST API — "ws://localhost:3009/ws (SAME port as API/REST server; different from MCP stdio)". The broadcast payload for status events is `{ id, title, status }` (from aif's `toTaskBroadcastPayload`), with broadcast types `"task:updated" | "task:moved"`; "`payload.id` IS the taskId (confirmed from toTaskBroadcastPayload source)". The aif status vocabulary it watches: `"backlog" | "planning" | "plan_ready" | "implementing" | "review" | "blocked_external" | "done" | "verified"` — and, load-bearing for honest read-back, "NO `error` or `failed` status exists" (`:24-28`). REST fallback: `GET /tasks/:id` ("REST STATUS ENDPOINT", `:30-32`); the REST snapshot ride is shared with the CLIs through aifHttp (H11).

**Consumers:** await.ts's default mode — "block on awaitDone (WebSocket status stream) until the task is done/verified (success) or blocked_external (resolves, !success)" (`await.ts:11-13`).

**Env:** the same base-URL convention (`RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? http://localhost:3009`), ws scheme derived from it.

**Fail mode / which channel fails:** a dropped/unreachable socket falls back to the REST snapshot channel (the discovered `GET /tasks/:id`); terminal-state decisions key on the exact aif status strings above — there is no `failed` status to wait for, which is why await's non-success arm is `blocked_external` (H10's exit table).

## Satellites & companions

Substrate of awaitDone (H13) and await.ts (H10); snapshots share aifHttp (H11); vendored as closure of AifHandoffBackend (H15, H21).

## Anchors

- `packages/runtime-bridge/src/aifWsStatus.ts:2` — «* aifWsStatus — WebSocket-based status consumer for aif-handoff tasks.»
- `packages/runtime-bridge/src/aifWsStatus.ts:5` — «* SW-C SCHEMA DISCOVERY (kickoff §SCHEMA DISCOVERY FIRST requirement)»
- `packages/runtime-bridge/src/aifWsStatus.ts:13` — «*   → ws://localhost:3009/ws  (SAME port as API/REST server; different from MCP stdio)»
- `packages/runtime-bridge/src/aifWsStatus.ts:24` — «*   "backlog" | "planning" | "plan_ready" | "implementing" |»
- `packages/runtime-bridge/vendor/README.md:40` — «| `src/aifWsStatus.ts`               | AifHandoffBackend → `./aifWsStatus.js`                            |»
