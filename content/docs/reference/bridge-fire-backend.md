---
title: "bridge AifFireBackend (AifFireBackend.ts)"
description: "Census H16 — the honest dispatch-only adapter for CC Routines /fire — operator opt-in, never the default; completion is unobservable by design and every read-back says so instead of guessing."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge AifFireBackend (AifFireBackend.ts)

**Status:** shipped-beta (operator opt-in) · **Ships to:** clone ONLY — deliberately absent from the vendor copy ("referenced only outside the dispatch closure", `vendor/README.md:88`) · **Fires at:** only when the operator selects it — "it is NEVER the default; REST (AifHandoffBackend) remains the agnostic default backend" (`src/AifFireBackend.ts:5-6`).

## What it is

`packages/runtime-bridge/src/AifFireBackend.ts` — "honest dispatch-only adapter for CC Routines `/fire` API" (`src/AifFireBackend.ts:2`). DISPATCH = `POST /fire` with a bearer token + `anthropic-beta` header (`:3-4`).

## How it works

**The honesty contract** (`:8-15`): the `/fire` token is write-only by design; the API returns ONLY `session_id` + `session_url`, so "Completion is therefore UNOBSERVABLE from the API layer" — and the backend refuses to fake it: `awaitDone()` "resolves IMMEDIATELY (no poll, no hang)" with `{ success:false, finalStatus:'dispatched_no_readback', meta:{ sessionUrl, sessionId } }`; `getStatus()` "returns { status:'running', rawStatus:'dispatched_no_readback' } honestly"; `available()` is "a presence-gate only (routineId + token present) — NO network call".

**Type discipline** (`:17-20`): "Shared types (TaskStatus.status / RuntimeBackend.name / TaskHandle.backend) are NOT extended — Type-decision (b) encodes honesty in rawStatus/finalStatus fields that already exist in the shared shapes. AifFireBackend does NOT declare `implements RuntimeBackend` so the RuntimeBackend.name union is not widened."

**Invocation + env** (`:22-28`, mirrors `RUNTIME_BRIDGE_AIF_*` naming):
- `RUNTIME_BRIDGE_FIRE_ROUTINE_ID` — CC Routines routine ID (required for available())
- `RUNTIME_BRIDGE_FIRE_TOKEN` — Bearer token (write-only, `sk-ant-oat01-…`)
- `RUNTIME_BRIDGE_FIRE_BASE_URL` — default `https://api.anthropic.com/v1/claude_code/routines`
- `RUNTIME_BRIDGE_FIRE_BETA` — `anthropic-beta` header value
- `RUNTIME_BRIDGE_FIRE_ANTHROPIC_VERSION` — `anthropic-version` header value

**Cost policy** (DN-2, `:30-31`): "operator-manual /fire = OK (subscription-bundled). Committed-CI /fire = DEFER-permanent (no-paid-llm-in-ci.md §3 / #paid-llm-creep)."

**Fail mode / which channel fails:** no read-back channel exists — the backend encodes that as a permanent honest status (`dispatched_no_readback`) rather than a guessed success; a dispatch REST failure throws `BackendError` like the other backends.

## Satellites & companions

Implements the dispatch half of the RuntimeBackend contract (H13) without joining its name union; alternative backends: AifHandoffBackend (H15, the default) and ManualBackend (H17); selected via resolver (H14) when the operator sets the mode.

## Anchors

- `packages/runtime-bridge/src/AifFireBackend.ts:2` — «* AifFireBackend — honest dispatch-only adapter for CC Routines `/fire` API.»
- `packages/runtime-bridge/src/AifFireBackend.ts:5` — «* This backend is **operator opt-in** — it is NEVER the default; REST»
- `packages/runtime-bridge/src/AifFireBackend.ts:12` — «*   - awaitDone() resolves IMMEDIATELY (no poll, no hang) with:»
- `packages/runtime-bridge/src/AifFireBackend.ts:23` — «*   RUNTIME_BRIDGE_FIRE_ROUTINE_ID       — CC Routines routine ID (required for available()).»
- `packages/runtime-bridge/vendor/README.md:84` — «- `src/AifFireBackend.ts`, `src/index.ts` — referenced only outside the dispatch closure.»
