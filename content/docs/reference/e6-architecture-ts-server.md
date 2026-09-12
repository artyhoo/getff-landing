---
title: "ARCHITECTURE.ts-server.md — stack architecture template (E6)"
description: "The hexagonal server-side TypeScript architecture starter — layer tree, dependency direction, test suffixes and the enforcement map — delivered as the named .ai-factory variant and materialized as .ai-factory/ARCHITECTURE.md on ts-server stacks."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# ARCHITECTURE.ts-server.md — stack architecture template (E6)

**Status:** shipped-beta ·
**Ships to:** npm-lane, all tier arms; delivered on every npm install, but its content is authoritative for the ts-server stack (react-* presets ship their own ARCHITECTURE variants instead) · **Fires at:** install time, twice — as the named `.ai-factory/ARCHITECTURE.ts-server.md` and as the materialized `.ai-factory/ARCHITECTURE.md` when the stack is (or falls back to) ts-server

## What it is

The server-side TypeScript architecture starter: a hexagonal layer tree (`domain/` → `application/` → `infrastructure/` → `web/` → `config/`), the dependency-direction rules between those layers, the test-suffix convention (`.unit.ts` / `.integration.ts` / `.audit.ts`), a forbidden-patterns list, and a table mapping each convention to the channel that enforces it (dependency-cruiser, ESLint rules, `audit-ai-docs.sh` probes R1–R9). Header declares it consumer-customisable and NOT authoritative for the project goal.

## How it works

- Delivery arm 1 — named variant: `setup.d/30-templates.sh` copies the template to `.ai-factory/ARCHITECTURE.ts-server.md` on every npm install, before the stack branches.
- Delivery arm 2 — materialized SoT: AGENTS.md.template points the first agent session at `.ai-factory/ARCHITECTURE.md`; the stage materializes that file from `arch_sot_src_for_stack` and rewrites its "Drop into …" first line into "This install-generated starter IS your `.ai-factory/ARCHITECTURE.md`" via `rewrite_arch_sot_header` (only on a fresh write — a consumer-edited ARCHITECTURE.md is never mutated).
- Stack selection: for `react-next` / `react-spa` / `react-native` the materialized SoT comes from the preset's own ARCHITECTURE template; any unknown or empty stack falls back to this ts-server variant (an unknown npm stack is still TypeScript, per the helper's comment).
- The `--refresh` path re-runs arm 2 through the same two lib.sh helpers so install and refresh cannot diverge.
- Lane honesty: the python lane never sees this file — its stage names the python starter directly instead of consulting the stack map (45-python.sh A2-10), precisely because the ts-server doc would hand a Python repo a Zod/vitest/dependency-cruiser architecture.

## Satellites & companions

ADAPTS the "Drop into `.ai-factory/ARCHITECTURE.md`" seed into the consumer's live architecture SSOT via `rewrite_arch_sot_header` (lib.sh). Companion of `dependency-cruiser` config delivery (`40-configs.sh` ships `.dependency-cruiser.cjs`) — the doc's layer rules name dependency-cruiser as their enforcer. Peer templates: `ARCHITECTURE.react-next.md` (preset), `ARCHITECTURE.python.md` (E36). Its enforcement table points at `.ai-factory/RULES.md` (E5's sibling render) for the full R1–R11 list. ADDS over a blank ARCHITECTURE.md: a starter whose every rule names a real enforcement channel.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/ARCHITECTURE.ts-server.md:1` — «# Architecture — server-side TypeScript»
- `packages/core/templates/shared/ARCHITECTURE.ts-server.md:3` — «> Layer rules and dependency direction. Enforced by `dependency-cruiser`.»
- `packages/core/templates/shared/ARCHITECTURE.ts-server.md:6` — «> Drop into `.ai-factory/ARCHITECTURE.md` and override only what your project needs. For React/Next.js projects, see `ARCHITECTURE.react-next.md`.»
- `packages/core/templates/shared/ARCHITECTURE.ts-server.md:38` — «- `domain/` → nothing project-internal (only stdlib + Zod)»
- `packages/core/templates/shared/ARCHITECTURE.ts-server.md:94` — «See `.ai-factory/RULES.md` for full list R1–R11.»
- `setup.d/30-templates.sh:19` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/ARCHITECTURE.ts-server.md" "$PROJECT_ROOT/.ai-factory/ARCHITECTURE.ts-server.md"»
- `setup.d/30-templates.sh:81` — «copy_safe "$_arch_sot_src" "$_arch_sot_dst"»
- `setup.d/lib.sh:1347` — «*)            printf '%s\n' "$PKG_ROOT/packages/core/templates/shared/ARCHITECTURE.ts-server.md" ;;»
