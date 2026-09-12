---
title: "eslint-rules/index.ts — the barrel"
description: "The four-rule ESLint plugin barrel (@rules-as-tests/core-eslint-rules) that the npm-lane pre-push guard's liveness depends on, installed file-wise into consumer packages by the A-stage copy loop."
---

> **Census id:** F31 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F31: MISSING → drafted E4; satellites D22, F32-F35) |
| Ships-to | npm-lane consumers — the pre-push barrel (`setup.d/50-hooks.sh` copy group) |
| Fires-at | every ESLint run over consumer source (via the manifest `check.type: "eslint"` bindings) |

## What it is

`packages/core/eslint-rules/index.ts` is the plugin barrel that assembles the four shipped rules into one ESLint plugin. The plugin identity: `packages/core/eslint-rules/index.ts:7` «name: '@rules-as-tests/core-eslint-rules',» / `:8` «version: '0.1.0',». The rule map (`:10-15`) registers exactly four: `no-unsafe-zod-parse`, `no-direct-time-randomness`, `require-otel-span`, `restricted-syntax-audit-exempt` (`:1-4` import them). Exports: `packages/core/eslint-rules/index.ts:19` «export default plugin;» / `:20` «export const rules = plugin.rules;».

## What it carries

Four rule modules — each documented on its own page (census F32-F35). The install arm names the whole group: `setup.d/50-hooks.sh:43` «for esl_hook in \» / `:44-48` « index.ts / no-unsafe-zod-parse.ts / no-direct-time-randomness.ts / require-otel-span.ts / restricted-syntax-audit-exempt.ts; do» — five files, barrel + four rules.

## Where it lands

Consumer installs receive the barrel at the same relative path as the framework repo: `setup.d/50-hooks.sh:42` «echo "▶ Core ESLint rules → packages/core/eslint-rules/"» with the copy loop's destination comment at `:39-40` «Destination: packages/core/eslint-rules/ / (same relative path as in the framework repo). (#735)». The guard-liveness dependency is stated in the same block: `setup.d/50-hooks.sh:38` «Without this group, guard-liveness.ts die()/push-blocks on load even after the 3 checks above ship.» — i.e. the shipped pre-push guard dies loudly if the barrel group is missing rather than silently degrading.

## Enforcement channels

- **ESLint rule bindings (declarative manifest):** consumer rule rows bind via `check.type: "eslint"` — e.g. `packages/core/manifest/rules-manifest.json:28` «"rule": "rules-as-tests/no-unsafe-zod-parse"» (R2), `:109` (R7), `:129` (R8) — resolved through this barrel's rule map.
- **FF-routing honesty:** the npm backend's capability matrix records what renders where — `packages/core/backends/npm/capability-matrix.json` cells: `syntax` «"status": "yes"» with `kind: "live-fired"` evidence, while `type-aware` and `dep-graph` are «"status": "no", "refusedCode": "FF7001"» — FF7001 = «not expressible in {backend}: selectorClass {selectorClass} (node {nodeId})» (`packages/core/diagnostics/registry.ts:321`), i.e. those selector classes route to a deferred backend, and FF7002 («params contract violation for {backend} renderer», `packages/core/diagnostics/registry.ts:329`) is the params-class refusal. The four shipped rules live in the expressible `syntax`/eslint lane; nothing here claims type-aware or dep-graph coverage.
