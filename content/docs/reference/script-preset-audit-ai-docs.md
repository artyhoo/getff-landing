---
title: "preset audit scripts — audit-ai-docs.react-*.sh"
description: "The react-lane code-vs-docs audit trio shipped from the three preset packages (react-next / react-spa / react-native): each probe maps explicitly to a RULES.react-*.md rule, delegating to ESLint/dependency-cruiser where a rule is machine-checkable."
---

> **Census id:** F56 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F56: MISSING → drafted E4 — three preset-lane scripts in one row; census satellites G5-G7) |
| Ships-to | react preset lanes — react-next via `setup.d/40-configs.sh:77-78`; spa/native arms at `:88` / `:92` |
| Fires-at | the react lanes' audit step (`bash scripts/audit-ai-docs.react-next.sh` and siblings) |

## Invocation

`bash scripts/audit-ai-docs.react-next.sh` (and `.react-spa.sh` / `.react-native.sh`) from the consumer project root. Install arms name the lane condition: `setup.d/40-configs.sh:77` «  copy_safe "$PKG_ROOT/packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh" "$PROJECT_ROOT/scripts/audit-ai-docs.react-next.sh"» + `:78` chmod; the census satellites are the three preset packages (G5 `preset-next-15-canonical`, G6 `preset-react-spa`, G7 `preset-react-native`).

## Exit codes

- **0** — all probes pass: `packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh:118` «exit 0».
- **1** — any probe fails: `:116` «  exit 1». The same 0/1 grammar as the base `audit-ai-docs.sh` (census F43, documented on-site).

## What they probe

Code-vs-docs consistency for the react lanes, with explicit rule mapping. Header: `packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh:4-5` «# Code-vs-docs consistency audit for React 19 + Next.js 15 App Router projects. / # Each probe maps EXPLICITLY to a rule from .ai-factory/RULES.react-next.md.» The mapping (quoted from `:7-17`): «R12 Server vs Client          → delegated to ESLint /                                   (no-restricted-globals + rules-as-tests/no-server-imports-in-client)» … «R17 Component tests           → probe_R17  (each component has .stories.tsx)» … «R20 Server Actions            → delegated to ESLint rule rules-as-tests/require-use-server-directive»; plus `:19` «# Plus base server-side probes from audit-ai-docs.sh.» — the trio layers over the base auditor rather than duplicating it.

## Where they live

Sources: `packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh` (118 lines), `packages/preset-react-spa/audit-self/audit-ai-docs.react-spa.sh` (162), `packages/preset-react-native/audit-self/audit-ai-docs.react-native.sh` (180) — one per react preset package (census G5/G6/G7). Consumer copies land at `scripts/audit-ai-docs.react-*.sh`, react preset lanes only.
