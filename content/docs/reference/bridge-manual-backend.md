---
title: "bridge ManualBackend (ManualBackend.ts)"
description: "Census H17 — the always-available fallback backend: copies the kickoff to /tmp, prints paste-it-yourself instructions, and treats a response file appearing in /tmp as the task's completion."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge ManualBackend (ManualBackend.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — in the dispatch closure; the fallback both the framework and vendored resolvers land on) and clone · **Fires at:** whenever no better backend is available — resolver's guaranteed tail (H14) and dispatch.ts's environmental-fallback target (H2).

## What it is

`packages/runtime-bridge/src/ManualBackend.ts` — "always-available fallback backend" (`src/ManualBackend.ts:2`). When aif-handoff (or amux) is unreachable, dispatch degrades to copy-paste dispatch instead of failing the operator's turn.

## How it works

**Behaviour** (`:4-8`): `dispatch` — "copies kickoff to /tmp/runtime-bridge-<task-id>.md, prints copy-paste instructions to stderr, returns a TaskHandle"; `getStatus` — "checks for /tmp/runtime-bridge-<task-id>.response.md existence"; `awaitDone` — "polls every 30s until the response file appears (no MVP timeout — documented acceptable limitation per kickoff §12 mn2)".

**Task IDs** (`:10-13`): "ISO-timestamp + first 8 chars of SHA-256 hash of umbrellaName. This keeps IDs human-readable and deterministically reproducible for the same umbrella … while remaining unique per dispatch timestamp."

**Self-cleaning** (`:25-31`): `/tmp` artefacts older than `ARTIFACT_TTL_MS = 7 * 24 * 60 * 60 * 1000` (7 days — "generous (don't nuke an unpasted recent one)", `:25`) are pruned on the next dispatch. `isStaleArtifact` is pure and matches "only our own `runtime-bridge-*.md` / `.response.md` files" — "self-cleaning never touches unrelated files or fresh kickoffs" (`:28-31`). A file that vanishes mid-sweep "is skipped, never throws into the dispatch path" (`:34-35`).

**Env:** none of its own; the await CLI reconstructs a manual handle from the taskId and uses it "for the /tmp response-file path" (`await.ts:18-19`).

**Fail mode / which channel fails:** the paste-it-yourself channel — completion is signalled by a human dropping `<task-id>.response.md` into /tmp; nothing times out (documented limitation), so a never-pasted dispatch simply stays pending until the 7-day TTL prunes the kickoff. A dispatch into ManualBackend is deliberately NOT recorded in the dedup log (H2 behaviour 4) so a later real retry isn't blocked.

## Satellites & companions

The resolver's tail — "ManualBackend is always the tail — never excluded" (H14); the fallback arm of dispatch's environmental failures (H2); exports `isStaleArtifact` for the self-cleaning tests (H23's `aif-self-cleaning.test.ts` family); contract in H13.

## Anchors

- `packages/runtime-bridge/src/ManualBackend.ts:2` — «* ManualBackend — always-available fallback backend.»
- `packages/runtime-bridge/src/ManualBackend.ts:5` — «*   dispatch: copies kickoff to /tmp/runtime-bridge-<task-id>.md, prints»
- `packages/runtime-bridge/src/ManualBackend.ts:25` — «const ARTIFACT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days — generous (don't nuke an unpasted recent one)»
- `packages/runtime-bridge/src/ManualBackend.ts:30` — « * older than the TTL — so self-cleaning never touches unrelated files or fresh kickoffs.»
