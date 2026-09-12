---
title: "require-otel-span — generated eslint rule"
description: "ESLint rule requiring exported async functions to open an OTel span (tracer.startActiveSpan or withSpan) — manifest rule R8, auto-skipped when @opentelemetry/api is absent."
---

> **Census id:** F34 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F34: MISSING → drafted E4) |
| Ships-to | npm-lane pre-push barrel (`setup.d/50-hooks.sh:47` copy arm) |
| Fires-at | exported async functions without a span in `src/application/**` — bound as manifest rule R8's check (`packages/core/manifest/rules-manifest.json:129`) |

## What it bans

Silent async operations without observability. The rule's own description: `packages/core/eslint-rules/require-otel-span.ts:68` «'Exported async functions must open an OTel span (tracer.startActiveSpan or withSpan) — R8.',» — message: `:72` «'Exported async function "{{name}}" must open an OTel span (tracer.startActiveSpan / withSpan) — R8.',» The span detectors (`:22-37`): a `startActiveSpan` member call (`tracer.startActiveSpan(...) / x.startActiveSpan(...)`) or a `withSpan(...)` call, found by iterative DFS over the function body (`:16-17` «// Iterative DFS to avoid stack overflow on large bodies»). The R8 policy: `packages/core/manifest/rules-manifest.json:134` (policy) «Public application commands/queries open an OTel span. Span attributes include relevant business identifiers and active feature flags. Errors set span status with structured cause.»

## Never (fires)

The manifest's paired negative test: `packages/core/manifest/rules-manifest.json:132` «"bad": "export async function placeOrder(o) { return await save(o); }",» with `:140` «"expect-violation": "rules-as-tests/require-otel-span"». Scope gating comes from the manifest row, not the rule: `packages/core/manifest/rules-manifest.json:123-124` «"applies-to": ["src/application/**"],» / «"requires-package": "@opentelemetry/api",» with `:125` «"auto-skip-if-missing": true,».

## Always (clean)

`packages/core/manifest/rules-manifest.json:133` «"good": "export async function placeOrder(o) {\n  return tracer.startActiveSpan('placeOrder', () => save(o));\n}"» — and any function whose body contains a span call (`packages/core/eslint-rules/require-otel-span.ts:90` «if (functionHasSpan(body)) return;»). A declared known gap: `:60` «// TODO: decorator @span not supported in this version, left for future».

## Enforcement channels

- **ESLint (npm lane):** the R8 manifest binding `check.type: "eslint"`, rule `rules-as-tests/require-otel-span` (`:128-129`); shipped through the barrel (`setup.d/50-hooks.sh:47`).
- **FF-routing honesty:** the npm capability matrix records `type-aware`/`dep-graph` selector classes as «"status": "no", "refusedCode": "FF7001"» (`packages/core/backends/npm/capability-matrix.json`) — FF7001 is the not-expressible → deferred-backend refusal (`packages/core/diagnostics/registry.ts:321`), FF7002 the params-contract refusal (`:329`). This rule is pure-AST (no type info, `:3` imports AST_NODE_TYPES only); the honest statement is: npm eslint lane only, no cross-backend claim.
