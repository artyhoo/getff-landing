---
title: "no-unsafe-zod-parse — generated eslint rule"
description: "ESLint rule forbidding Zod schema .parse() in HTTP boundary code — .safeParse() required; stdlib .parse() and fully-static literal args are not flagged; per-line // audit:exempt honored."
---

> **Census id:** F32 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F32: MISSING → drafted E4) |
| Ships-to | npm-lane pre-push barrel (`setup.d/50-hooks.sh:45` copy arm) |
| Fires-at | `.parse()` on a Zod-ish receiver in linted source — bound as manifest rule R2's check (`packages/core/manifest/rules-manifest.json:28`) |

## What it bans

Throwing Zod parses in boundary code. The rule's own description: `packages/core/eslint-rules/no-unsafe-zod-parse.ts:103` «'Forbid Zod schema `.parse()` in HTTP boundary files; require `.safeParse()`. Stdlib `.parse()` (JSON, Date, path) and fully-static literal arguments (fail-fast config parses) are not flagged.',» — message text: `:107` «'Use `.safeParse()` instead of `.parse()` in HTTP boundaries — `.parse()` throws and bypasses structured error handling (R2).',» The receiver heuristic is AST + scope only, zero type info: `:22-23` «// Uses AST + ESLint scope analysis only — zero type info, zero new dependencies. / // Three signals: (1) direct z.* chain, (2) *Schema naming, (3) scope-resolved z.* init or 'zod' import.»

## Never (fires)

The manifest's paired negative test: `packages/core/manifest/rules-manifest.json:31` «"bad": "const body = OrderSchema.parse(req.body);",» with `:37` «"expect-violation": "rules-as-tests/no-unsafe-zod-parse"». The R2 policy narrows where it applies: `packages/core/manifest/rules-manifest.json:38` (policy) «Zod schema `.parse()` is forbidden in HTTP boundary code. Use `.safeParse()` and branch on `.success`. Stdlib `.parse()` (`JSON.parse`, `Date.parse`, `path.parse`) is not flagged — the rule targets Zod schema `.parse()` only. Outside the path-scoped globs, `.parse()` is allowed … Escape hatch: `// audit:exempt` on the same line.» The static-literal skip is deliberate: `packages/core/eslint-rules/no-unsafe-zod-parse.ts:63-64` «// A fully-static literal expression cannot carry external input, so a throwing .parse() / // on it is deliberate fail-fast … not a boundary-validation gap.»

## Always (clean)

`packages/core/manifest/rules-manifest.json:32` «"good": "const r = OrderSchema.safeParse(req.body); if (!r.success) return reply.code(400).send(r.error.flatten());"» — and any `.parse()` line carrying the escape token: `packages/core/eslint-rules/no-unsafe-zod-parse.ts:121` «if (currentLine.includes('// audit:exempt')) return;»

## Enforcement channels

- **ESLint (npm lane):** the R2 manifest binding `check.type: "eslint"`, rule `rules-as-tests/no-unsafe-zod-parse` (`:27-28`); shipped through the barrel (`setup.d/50-hooks.sh:45`).
- **FF-routing honesty:** this rule is the expressible eslint lane of the R2 capability; the npm capability matrix records `type-aware`/`dep-graph` selector classes as «"status": "no", "refusedCode": "FF7001"» (`packages/core/backends/npm/capability-matrix.json`) — FF7001 is the framework's own not-expressible → deferred-backend refusal (`packages/core/diagnostics/registry.ts:321`); FF7002 (`:329`) is the params-contract refusal. No type-aware claim is made for this rule anywhere.
- **Liveness:** the manifest's `negative-test` block (`:36-38`) is the firing evidence contract; E1's census probes use the same grammar.
