---
title: ".storybook/preview.ts — storybook preview seed (E38)"
description: "The Storybook preview seed copied alongside main.ts into react-next consumers: default control matchers for color and date plus a commented Tailwind hook — the second half of the CI test-storyjob scaffold."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# .storybook/preview.ts — storybook preview seed (E38)

**Status:** shipped-beta · **Ships to:** react-next stack only (same storybook scaffold block as main.ts) · **Fires at:** install time (setup.d/40-configs.sh, react-next arm); afterwards loaded by every Storybook build and by the CI test-storybook job

## What it is

The preview config seed for react-next consumers: a typed `Preview` exporting default control `matchers` — `color` matched by `/(background|color)$/i` and `date` by `/Date$/i` — so Storybook's controls panel auto-detects those arg types. It ships one commented line showing where to import global styles if the consumer uses Tailwind.

## How it works

- It is the smaller sibling in a fixed pair: the stage copies `main.ts` (E37) then this file, back to back, inside the react-next-only scaffold block — one mkdir, two copy_safe calls, nothing else.
- Content is intentionally minimal and dependency-free; the seed makes the delivered `.storybook/` directory a valid Storybook project immediately, which is what the CI workflow's test-storybook job requires to build.
- `copy_safe` semantics: a consumer who already authored a preview keeps theirs; `--dry-run` previews, `--force` overwrites.
- Lane honesty: react-next only — no react-spa, react-native, python, cargo or go delivery of any `.storybook/` content.

## Satellites & companions

Sibling of `.storybook/main.ts` (E37); both exist to feed the shipped react-next CI workflow's test-storybook job. Like E37 it belongs to the react-next payload family (G5) and gets its dependencies via the deps stage (A17).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/react-next/.storybook/preview.ts:1` — «import type { Preview } from '@storybook/react';»
- `packages/core/templates/react-next/.storybook/preview.ts:2` — «// import '../src/app/globals.css'; // uncomment if consumer project uses Tailwind»
- `packages/core/templates/react-next/.storybook/preview.ts:8` — «        color: /(background|color)$/i,»
- `setup.d/40-configs.sh:83` — «mkdir_safe "$PROJECT_ROOT/.storybook"»
- `setup.d/40-configs.sh:85` — «copy_safe "$PKG_ROOT/packages/core/templates/react-next/.storybook/preview.ts" "$PROJECT_ROOT/.storybook/preview.ts"»
- `setup.d/40-configs.sh:86` — «fi» (closes the react-next-only scaffold block)
