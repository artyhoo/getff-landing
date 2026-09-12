---
title: ".storybook/main.ts — storybook config seed (E37)"
description: "A static Storybook 10.x config seed (nextjs-vite framework, no addons) copied only into react-next consumers so the shipped CI workflow's test-storybook job has a config to build — replacing a retired npx storybook init with a network-free copy."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not edit prose -->

# .storybook/main.ts — storybook config seed (E37)

**Status:** shipped-beta · **Ships to:** react-next stack only (the storybook scaffold block inside setup.d/40-configs.sh) · **Fires at:** install time (setup.d/40-configs.sh, react-next arm); afterwards read by Storybook builds and by the shipped CI workflow's test-storybook job

## What it is

The Storybook main config seed for react-next consumers: a typed `StorybookConfig` for `@storybook/nextjs-vite` whose stories glob is `../src/**/*.stories.@(js|jsx|ts|tsx)`. Its header comment records the Storybook-10 fact that addon-essentials and addon-interactions are merged into core, so the config declares no addons.

## How it works

- It exists because the shipped react-next CI workflow carries a `test-storybook` job, and that job needs a `.storybook` config to build — the seed is the CI gate's missing half, not a general scaffolding convenience.
- Delivery is a static template copy (Storybook 10.x, `@storybook/nextjs-vite`) that REPLACES the retired installer Batch-K approach of running `npx storybook init` at install time — no network, no generated surprises; `copy_safe` honors `--dry-run`/`--force` and never overwrites a consumer's existing files.
- The stage creates the `.storybook/` directory first (`mkdir_safe`), then copies this file and its preview sibling (E38). Storybook dependencies and scripts themselves are resolved later by the deps stage (70-deps), not here.
- Lane honesty: react-next only. The react-spa and react-native stack arms of the same stage deliver their audit script but no storybook scaffold — their CI workflows have no test-storybook job to feed, and the python/cargo/go lanes never see this file.

## Satellites & companions

Sibling of `.storybook/preview.ts` (E38) — delivered in the same two-line block. Consumed by the shipped react-next CI workflow's test-storybook job; its dependencies land via the deps stage (A17). Part of the react-next preset package's payload family (G5), though delivered from the shared template tree.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/react-next/.storybook/main.ts:1` — «import type { StorybookConfig } from '@storybook/nextjs-vite';»
- `packages/core/templates/react-next/.storybook/main.ts:3` — «// Storybook 10.x: addon-essentials + addon-interactions are merged into core — no addons needed.»
- `packages/core/templates/react-next/.storybook/main.ts:7` — «    name: '@storybook/nextjs-vite',»
- `setup.d/40-configs.sh:76` — «if [ "$STACK" = "react-next" ]; then»
- `setup.d/40-configs.sh:79-82` — «# .storybook config to build. Static template copy (SB 10.x, @storybook/nextjs-vite) replaces» «# retired setup.sh Batch K's `npx storybook init` (#946) — no network; copy_safe honours» «# --dry-run/--force and never overwrites a consumer's existing files. Deps + scripts: 70-deps.»
- `setup.d/40-configs.sh:84` — «copy_safe "$PKG_ROOT/packages/core/templates/react-next/.storybook/main.ts" "$PROJECT_ROOT/.storybook/main.ts"»
