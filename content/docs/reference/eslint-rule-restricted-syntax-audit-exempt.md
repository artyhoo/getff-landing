---
title: "restricted-syntax-audit-exempt — generated eslint rule"
description: "The exempt-aware counterpart to ESLint's built-in no-restricted-syntax: runs declarative {selector, message} pairs but honours the per-line // audit:exempt suppression convention that esquery selectors cannot see."
---

> **Census id:** F35 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F35: MISSING → drafted E4) |
| Ships-to | npm-lane pre-push barrel (`setup.d/50-hooks.sh:48` copy arm) |
| Fires-at | any node matching a configured esquery selector, unless the node's line carries `audit:exempt` |

## What it bans

Whatever the declarative rule tier configures — with an escape hatch. The rule's own header comment is the spec: `packages/core/eslint-rules/restricted-syntax-audit-exempt.ts:4-5` «// Generic exempt-aware counterpart to ESLint's built-in `no-restricted-syntax`. / //» and `:6-8` «// Why this exists: the declarative rule tier (synthesizer `check.type:"declarative"`, / // engine `eslint-restricted`) compiles a `{selector, message}` pair into an ESLint / // rule.» The gap it closes: `:8-10` «// The built-in `no-restricted-syntax` cannot honour the project's per-line / // `// audit:exempt` suppression convention because esquery selectors cannot see / // comments.» Description: `:37-38` «'Disallow syntax matching the given selector(s), honouring per-line `audit:exempt` suppression (exempt-aware no-restricted-syntax).',» The npm backend's live-fired evidence shows the declarative tier in action: `packages/core/backends/npm/capability-matrix.json` capturedDiagnostic carries «"ruleId":"no-restricted-syntax" … "message":"Read configuration through a typed config module, never process.env directly"».

## Never (fires)

A node whose line carries the exempt token is suppressed: `packages/core/eslint-rules/restricted-syntax-audit-exempt.ts:68-70` «// Mirror the handwritten rules: suppress when the violation's line is exempt. / const line = lines[node.loc.start.line - 1] ?? ''; / if (line.includes(EXEMPT_TOKEN)) return;» with the token defined at `:30` «const EXEMPT_TOKEN = 'audit:exempt';». Otherwise any selector match reports: `:71-75` «context.report({ / node, / messageId: 'restrictedSyntax', / data: { message }, / });» — default message when none configured: `:64-65` «entry.message ?? / `Using '${selector}' is restricted (audit:exempt to override).`».

## Always (clean)

Source free of restricted selectors, or with the escape token on the flagged line. Options mirror `no-restricted-syntax`: `:14-15` «// Options shape mirrors `no-restricted-syntax`: a variadic list of {selector, message} / // entries. Reports under messageId `restrictedSyntax` with the entry's message.» Multiple entries on one selector chain their handlers: `:78-80` «// Multiple entries may target the same selector — chain their handlers so / // ESLint's single-listener-per-selector contract is preserved.»

## Enforcement channels

- **ESLint (npm lane):** the declarative rule tier's engine — «engine `eslint-restricted`» (`:7`); shipped through the barrel (`setup.d/50-hooks.sh:48`). The synthesizer's `check.type:"declarative"` emits the selector pairs this rule runs (`:6`).
- **FF-routing honesty:** the npm backend's declarative tier is live-fired for the `syntax` selector class («"status": "yes"» with `kind: "live-fired"` evidence, `packages/core/backends/npm/capability-matrix.json`), while `type-aware`/`dep-graph` remain «"status": "no", "refusedCode": "FF7001"» — the not-expressible → deferred-backend refusal (`packages/core/diagnostics/registry.ts:321`); FF7002 is the params-contract refusal (`:329`). A selector this rule cannot express routes through the FF7001 vocabulary; it is never silently softened.
