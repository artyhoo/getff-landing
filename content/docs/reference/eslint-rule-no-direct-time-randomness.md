---
title: "no-direct-time-randomness — generated eslint rule"
description: "ESLint rule forbidding Date.now(), new Date(), Math.random() and direct fs/http/https imports outside infrastructure — injected Clock/Random required (manifest rule R7); // audit:exempt honored."
---

> **Census id:** F33 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F33: MISSING → drafted E4) |
| Ships-to | npm-lane pre-push barrel (`setup.d/50-hooks.sh:46` copy arm) |
| Fires-at | `Date.now()` / `new Date()` / `Math.random()` calls and forbidden-module imports in linted source — bound as manifest rule R7's check (`packages/core/manifest/rules-manifest.json:109`) |

## What it bans

Direct time, randomness, and IO outside the infrastructure layer. The rule's own description: `packages/core/eslint-rules/no-direct-time-randomness.ts:28` «'Forbid Date.now(), new Date(), Math.random(), and direct fs/http/https imports outside infrastructure (R7).',» — four messages (`:31-36`): «'Use an injected Clock instead of `Date.now()` (R7).',» / «'Use an injected Clock instead of `new Date()` (R7).',» / «'Use an injected Random source instead of `Math.random()` (R7).',» / «'Direct `{{module}}` import is forbidden outside `infrastructure/` (R7). Wrap it in an infrastructure module.',». The forbidden set: `:9-16` `FORBIDDEN_MODULES = new Set(['fs', 'http', 'https', 'node:fs', 'node:http', 'node:https'])`. The R7 policy: `packages/core/manifest/rules-manifest.json:114` (policy) «No `Date.now()`, `new Date()`, `performance.now()` in `src/` (except `infrastructure/clock/`). No `Math.random()` (except `infrastructure/random/`). No direct `fs`, `http`, `https` outside `infrastructure/`.»

## Never (fires)

The manifest's paired negative test: `packages/core/manifest/rules-manifest.json:112` «"bad": "const now = Date.now();",» with `:118` «"expect-violation": "rules-as-tests/no-direct-time-randomness"». Any non-exempt line carrying the banned shapes fires (rule listeners at `packages/core/eslint-rules/no-direct-time-randomness.ts:47-72`).

## Always (clean)

`packages/core/manifest/rules-manifest.json:113` «"good": "const now = clock.now(); // injected from infrastructure/clock"» — and exempt lines: `:18-20` «function isExempt(line: string): boolean { / return line.includes('// audit:exempt'); / }» applied per listener (`:50`, `:56`, `:61`, `:66`).

## Enforcement channels

- **ESLint (npm lane):** the R7 manifest binding `check.type: "eslint"`, rule `rules-as-tests/no-direct-time-randomness` (`:108-109`); shipped through the barrel (`setup.d/50-hooks.sh:46`).
- **FF-routing honesty (per-backend):** the same capability in other lanes is expressed only where expressible — the ruff matrix records the call-kind ban as refused: «kind 'call' (call-with-args ban) is refused FF7001» (`packages/core/backends/ruff/capability-matrix.json`, syntax cell caps); the cargo matrix records the whole `syntax` class as «"status": "no", "refusedCode": "FF7001"» (`packages/core/backends/cargo/capability-matrix.json`). FF7001 = «not expressible in {backend}» (`packages/core/diagnostics/registry.ts:321`) → deferred backend; FF7002 is the params-class refusal (`:329`). The honest statement: this eslint rule is npm-lane; other backends carry narrower slices, not a softened equivalent.
