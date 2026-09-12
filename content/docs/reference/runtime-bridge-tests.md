---
title: "runtime-bridge vitest suite (test/)"
description: "Census H23 — the 23-file vitest suite covering dispatch, claim, park, answer, harvest, idempotency and the CLI entry plumbing, including the symlink-entry and import-no-sideeffect guards."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# runtime-bridge vitest suite (test/)

**Status:** shipped-beta · **Ships to:** clone — the test suite is NOT vendored (the vendor copy ships no tests; `vendor/` carries only the dispatch closure) · **Fires at:** `vitest` runs in CI and locally — it is the framework-side regression net for every bridge behaviour the CLIs promise.

## What it is

`packages/runtime-bridge/test/` — 23 test files (enumerated `ls packages/runtime-bridge/test/ | wc -l` → 23 at this pin) covering "dispatch/claim/park/answer/harvest/idempotency/cli-entry (incl. symlink-entry and no-sideeffect import guards)" (census row H23).

## How it works

The suite maps onto the bridge's contracts file-by-file: dispatch behaviour (`aif-dispatch-dedup.test.ts`, `aif-dispatch-preflight.test.ts`, `dispatch-spec-invalid.test.ts` — the exit-2 spec channel), the question loop (`aif-park.test.ts`, `aif-park-live.test.ts`, `aif-questions.test.ts`, `aif-answer.test.ts`), two-phase dispatch (`aif-claim-split.test.ts`), egress (`harvest.test.ts`, `harvest-cli.test.ts`, `harvest-merge-report.test.ts`), backends (`aif-backend-semantics.test.ts`, `aif-rest-dispatch.test.ts`, `aif-fire-backend.test.ts`, `runtime-bridge.test.ts`), plumbing (`cli-entry.test.ts`, `cli-symlink-entry.test.ts`, `aif-http.test.ts`), hygiene (`aif-self-cleaning.test.ts`, `dispatch-import-no-sideeffect.test.ts`, `vendor-hook-stderr.test.ts`).

Three guards are structural, not behavioural:
- **cli-symlink-entry** — regression for the A6-1 defect: "invoking a CLI through a symlink … made the guard false and the CLI exited 0 having done nothing, silently" (`src/cli/cliEntry.ts:9-12`) — the realpath'd `isMain` fix (H12) stays honest.
- **dispatch-import-no-sideeffect** — the import guard: importing the dispatch entrypoint must not dispatch anything (a CLI module that acts on import would make every tooling import a dispatch).
- **aif-self-cleaning** — the prune-on-write dedup log and the ManualBackend TTL sweep (H18, H17) delete only what they own.

**Fail mode / which channel fails:** the vitest channel — a red suite blocks the framework repo's own pre-push/CI lanes (npm-lane), not the consumer's; the no-paid-llm-in-ci rule is why the suite mocks the REST boundary rather than running live agents (the live-boundary class is what bridge-health.sh probes instead, H22).

## Satellites & companions

Tests every H-family module H2-H19; the symlink guard pins cliEntry (H12); `aif-park.test.ts` pins the park PUT semantics (H4); hygiene tests cover the self-cleaning contracts (H17, H18).

## Anchors

- `packages/runtime-bridge/test/aif-park.test.ts:1` — «// packages/runtime-bridge/test/aif-park.test.ts»
- `packages/runtime-bridge/test/cli-symlink-entry.test.ts:1` — «// packages/runtime-bridge/test/cli-symlink-entry.test.ts»
- `packages/runtime-bridge/test/dispatch-import-no-sideeffect.test.ts:1` — «/**»
- `packages/runtime-bridge/src/cli/cliEntry.ts:10` — « * /tmp → /private/tmp) made the guard false and the CLI exited 0 having done nothing,»
