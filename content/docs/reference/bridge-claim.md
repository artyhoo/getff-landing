---
title: "bridge claim (claim.ts)"
description: "Census H3 — the operator/skill-facing half of two-phase dispatch — claim create/release/cancel over the aif-handoff REST API, with a real exit code where dispatch.ts has none."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge claim (claim.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — the vendored copy carries `src/cli/claim.ts`, admitted 2026-08-18; vendored consumers run it via tsx from `.claude/vendor/runtime-bridge/`) and clone · **Fires at:** invoked BY `/pipeline` §6 Step 3 around the Phase -1 window, or manually by an operator — never by a hook.

## What it is

`packages/runtime-bridge/src/cli/claim.ts` — "the operator/skill-facing half of two-phase dispatch" (`src/cli/claim.ts:2`) with three subcommands: `create <kickoff-path>`, `release <taskId>`, `cancel <taskId>` (`src/cli/claim.ts:5-7`).

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/claim.ts create <kickoff-path>` (etc.). A claim is the opposite contract from dispatch.ts — dispatch runs inside a PostToolUse hook and "exits 0 on EVERY path (injection, never gate)", while claim "exits NON-ZERO on failure and never falls back to ManualBackend: a backend with no queue cannot hold a claim" (`src/cli/claim.ts:8-13`) — a silently-failed claim would send the stage out believing the lane was probed clean. `create` "prints the TaskHandle as one line of JSON on stdout so a caller can capture the taskId; human-facing narration goes to stderr" (`:17-18`). Claim support is backend-gated (`claim`/`release`/`cancelClaim` + a `supportsClaims` guard live in the backend; both framework and vendor copies were re-vendored together on 2026-08-18 so a vendored claim.ts cannot call a pre-split backend — `vendor/README.md:75-80`).

**Env:** `RUNTIME_BRIDGE_AIF_URL` (base URL, default `http://localhost:3009`), `RUNTIME_BRIDGE_AIF_PROJECT_ID` (queue project), same convention as the sibling CLIs (`vendor/README.md:99-103`).

**Fail mode / which channel fails:** a REST error or bad args exits non-zero with the message on stderr; no /tmp artefact, no fallback backend — the caller's `$?` is the gate. Shared REST failure mapping (connection → `unavailable`, 429 → `quota_exceeded`, other → `dispatch_failed`) rides `cli/aifHttp.ts` (H11).

## Satellites & companions

Sibling of dispatch (H2, the hook-facing half), park/answer/questions (H4, H6, H7); the claim protocol methods live in the backend layer (H13); vendored per the A7 closure criterion with its backend re-vendored in the same pass (H21).

## Anchors

- `packages/runtime-bridge/src/cli/claim.ts:2` — «* CLI claim entrypoint — the operator/skill-facing half of two-phase dispatch.»
- `packages/runtime-bridge/src/cli/claim.ts:5` — «*   tsx packages/runtime-bridge/src/cli/claim.ts create <kickoff-path>»
- `packages/runtime-bridge/src/cli/claim.ts:14` — « * entrypoint exits NON-ZERO on failure and never falls back to ManualBackend: a»
- `packages/runtime-bridge/src/cli/claim.ts:18` — « * `create` prints the TaskHandle as one line of JSON on stdout so a caller can capture»
- `packages/runtime-bridge/vendor/README.md:75` — «`src/cli/claim.ts` was admitted 2026-08-18 under the same criterion, on the same trigger: the»
