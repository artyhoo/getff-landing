---
title: "audit-r4.ts — R4 audit probe"
description: "ts-morph-based R4 probe: every named export from src/domain/*.ts must have a co-located <base>.unit.ts whose text mentions the export; exits 1 on any violation. Shipped to consumers as scripts/audit-r4.ts."
---

> **Census id:** F44 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F44: MISSING → drafted E4; census satellite F43 — the audit-ai-docs gate) |
| Ships-to | npm-lane — copied to consumer `scripts/audit-r4.ts` (`setup.d/40-configs.sh:17`) |
| Fires-at | invoked by `audit-ai-docs.sh` via `npx tsx scripts/audit-r4.ts` (`setup.d/40-configs.sh:16`) |

## Invocation

`npx tsx scripts/audit-r4.ts` from the project root — the shebang declares the runner: `packages/core/probes/audit-r4.ts:1` «#!/usr/bin/env -S node --experimental-strip-types». The install comment states the caller: `setup.d/40-configs.sh:16` «# R4 probe (ts-morph) invoked by audit-ai-docs.sh via `npx tsx scripts/audit-r4.ts`.»

## Exit codes

- **0** — every domain export carries a live unit-test mention.
- **1** — any violation: `packages/core/probes/audit-r4.ts:9` « * Exits 1 on any violation.»

## What it probes

R4 — tests for new public code, mechanically. Header: `packages/core/probes/audit-r4.ts:3-8` (« * R4 — ts-morph-based check. / * / * Every named export from src/domain/*.ts must have: / *   1. A matching <base>.unit.ts file co-located, AND / *   2. The export name actually appears in the text of that .unit.ts.»). The scanned population excludes tests and barrels: `:16-22` (`project.addSourceFilesAtPaths(['src/domain/**/*.ts', '!src/domain/**/*.unit.ts', … '!src/domain/**/index.ts'])`). The manifest binds it as R4's check: `packages/core/manifest/rules-manifest.json` R4 row — «"check": { "type": "script", "script": "scripts/audit-r4.ts" }».

## Where it lives

Source: `packages/core/probes/audit-r4.ts` (framework repo). Consumer copy: `scripts/audit-r4.ts`, npm-lane installs (`setup.d/40-configs.sh:17` «copy_safe "$PKG_ROOT/packages/core/probes/audit-r4.ts" "$PROJECT_ROOT/scripts/audit-r4.ts"»). The census note applies: the corpus is clone-side; consumers receive the file, and this is the lane/tier that receives it.
