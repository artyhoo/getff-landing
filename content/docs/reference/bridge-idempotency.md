---
title: "bridge idempotency (idempotency.ts)"
description: "Census H18 — content-hash dispatch dedup over a self-cleaning JSONL log; state at $RUNTIME_BRIDGE_DEDUP_PATH (default /tmp/runtime-bridge-dedup.jsonl), 24h TTL, so a re-fired identical kickoff does not dispatch twice."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge idempotency (idempotency.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — in the dispatch closure; kickoff.ts imports its `hashContent`) and clone · **Fires at:** inside dispatch.ts's step 2 — every dispatch checks the log before any backend call.

## What it is

`packages/runtime-bridge/src/idempotency.ts` — "Content-hash idempotency for dispatch deduplication" (`src/idempotency.ts:2`). "State path: $RUNTIME_BRIDGE_DEDUP_PATH, default /tmp/runtime-bridge-dedup.jsonl" (`:4`); "Each line: { hash, taskHandle, timestamp }"; "TTL: 24 hours (lines older than 24h are ignored on lookup)" (`:5-7`).

## How it works

**Self-cleaning JSONL** (`:9-13`): "prune-on-write JSONL — recordDispatch rewrites the file keeping only entries within the TTL window, so it is SELF-CLEANING: the file never grows unbounded and a stale entry (incl. a one-off manual fallback) auto-expires without any manual sweep. (Was append-only; changed for self-cleaning per the \"junk must not accumulate / not be cleaned each session\" requirement 2026-06-01.)"

**Per-project dedup path** (`:29-39`): `resolveDedupPath()` — "`RUNTIME_BRIDGE_DEDUP_PATH` makes it per-project, which is what the vendored copy's own README has documented since the vendor drop landed — while no code in either copy read it and the path stayed a single hard-coded global (#1597 review ledger A5-3 / E-1)." The defect that fixed: "With N consumers vendored on one host, that global log made project B's identical-content kickoff read as «already dispatched» because project A had dispatched it inside the 24h TTL, and the knob the README told the consumer to export did nothing." "Pure and env-injectable so both arms are testable without touching the real log; an empty or whitespace-only value falls back to the default rather than writing to `''`" (`:40-41`).

**Env:** `RUNTIME_BRIDGE_DEDUP_PATH` (optional; empty/whitespace → default).

**Fail mode / which channel fails:** a dedup HIT is not an error — dispatch.ts exits 0 on it (already-dispatched), and `--force` skips the check for deliberate re-dispatch (H2 behaviour 2). A missing log is treated as empty; the failure it prevents is double dispatch of identical autonomous work.

## Satellites & companions

Consumed by dispatch.ts's dedup step (H2); supplies `hashContent` to kickoff.ts's KickoffSpec (H19); the dedup-log cruft is what bridge-cleanup.sh sweeps (H22); the vendor README documents the knob this code finally honors (H21).

## Anchors

- `packages/runtime-bridge/src/idempotency.ts:2` — «* Content-hash idempotency for dispatch deduplication.»
- `packages/runtime-bridge/src/idempotency.ts:4` — «* State path: $RUNTIME_BRIDGE_DEDUP_PATH, default /tmp/runtime-bridge-dedup.jsonl»
- `packages/runtime-bridge/src/idempotency.ts:34` — «export function resolveDedupPath(env: NodeJS.ProcessEnv = process.env): string {»
- `packages/runtime-bridge/src/idempotency.ts:38` — «const DEDUP_PATH = resolveDedupPath();»
