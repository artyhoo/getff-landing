---
title: "tsconfig.json — delivered tsconfig (E19)"
description: "The strict TypeScript config delivered to npm-lane consumers: ES2022 + NodeNext modules, the full strict family (noUncheckedIndexedAccess, exactOptionalPropertyTypes, verbatimModuleSyntax) and a tests-covering include set the stage's FC3 check reads."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# tsconfig.json — delivered tsconfig (E19)

**Status:** shipped-beta · **Ships to:** npm-lane, all tier arms (core / env+ / factory) · **Fires at:** install time (setup.d/40-configs.sh); afterwards read by every typecheck rung — the pre-push hook's `tsc` pass, vitest, and the delivered CI workflow

## What it is

The baseline TypeScript configuration a fresh consumer starts from. The compiler-options block is strict by default in the strongest sense: `strict` plus the individually-opt-in flags that `strict` does not imply — `noUncheckedIndexedAccess`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules` — over `ES2022` / `NodeNext`.

## How it works

- The `include` set covers `src/**/*`, `apps/*/src/**/*`, `packages/*/src/**/*` and `tests/**/*` — the monorepo-shaped default, with tests deliberately inside the compile surface.
- That tests-in-include property is load-bearing beyond typing: the stage's FC3 "tests setup" check reads the delivered (or consumer-kept) tsconfig and treats tests as covered when the installer wrote the tsconfig itself, OR the config has no `include` key (tsc default = whole tree), OR some include entry starts with `tests` — otherwise the install notes the gap. An unreadable/JSONC tsconfig fails OPEN (treated covered, never aborts).
- Delivery is `copy_safe`: a brownfield consumer's own tsconfig.json is SKIPPED and kept — the FC3 check above is how the stage stays honest about what a kept config covers.
- The `exclude` list mirrors the gitignore seed (E10): `node_modules`, `dist`, `coverage`, `.stryker-tmp`, `reports`.
- Lane honesty: npm-lane only — the python lane's architecture doc explicitly tells agents there is no `tsconfig.json` in a Python project, and the cargo/go lanes ship no TypeScript surface at all.

## Satellites & companions

Delivered by `40-configs` (A13) next to the other configs (E1, E3, E10). Read by the pre-push rung's typecheck (E13/D20) and by the shipped CI workflow's typecheck job. The ts-server architecture template (E6) documents the layer rules this config's `verbatimModuleSyntax` + `isolatedModules` posture supports.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/tsconfig.json:3` — «    "target": "ES2022",»
- `packages/core/templates/shared/tsconfig.json:9` — «    "noUncheckedIndexedAccess": true,»
- `packages/core/templates/shared/tsconfig.json:12` — «    "exactOptionalPropertyTypes": true,»
- `packages/core/templates/shared/tsconfig.json:27-29` — «    "apps/*/src/**/*",» «    "packages/*/src/**/*",» «    "tests/**/*"»
- `setup.d/40-configs.sh:138` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/tsconfig.json" "$PROJECT_ROOT/tsconfig.json"»
- `setup.d/40-configs.sh:146-148` — «# Covered ⇔ the installer wrote tsconfig.json itself (not in SKIPPED), OR the tsconfig has NO» «# include key (tsc default = whole tree), OR some include entry starts with "tests".» «# Unreadable/JSONC tsconfig → fail-OPEN: treat covered, no note, never abort the layer.»
