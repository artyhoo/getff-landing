---
title: "@rules-as-tests/preset-react-native — react-native preset package (G7)"
description: "The workspace-private react-native preset: bare-RN and Expo eslint config variants plus a shared common module, stack RULES docs, its own audit script and CI template — no preset.meta.json staleness pins and no main entry, unlike its preset siblings."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/preset-react-native — react-native preset package (G7)

**Status:** shipped-beta · **Ships to:** react-native stack arm, npm lane (workspace-only — `private: true`; contents delivered file-wise by the stages, never as an npm artifact) · **Fires at:** install time on the react-native stack arm (setup.d/30-templates.sh + setup.d/40-configs.sh)

## What it is

The react-native slice of the preset family: a 12-file package carrying `RULES.md` + `RULES.react-native.md`, the architecture template, its own audit script (`audit-ai-docs.react-native.sh`), a `github-actions-ci-ui.yml` template, vitest config, a tsconfig — and an eslint config trio that is its distinguishing feature: `eslint.config.bare-rn.mjs` (bare React Native), `eslint.config.expo.mjs` (Expo), and `eslint.config.rn-common.mjs` (the shared module both variants compose), wiring `@react-native/eslint-config`, `eslint-config-expo` and the react-native a11y plugin declared in devDependencies.

## How it works

- The eslint trio is the package's real payload: on the react-native arm the stage copies the VARIANT the consumer's stack resolves to as `eslint.config.mjs` and ALWAYS delivers `eslint.config.rn-common.mjs` alongside it — bare and Expo differ only in their thin top config, the rules live in the common module.
- Delivery is file-wise on `STACK=react-native`: RULES.md → `.ai-factory/RULES.md`, the stack RULES + architecture docs → `.ai-factory/`, the audit script → `scripts/`, configs → consumer root (or per-workspace in monorepo shape).
- It has NO `preset.meta.json` — no staleness pins, so the deps-free staleness WARN (which anchors to G5's pin table) has no react-native arm. It also has NO `main`/`exports` entry (unlike G6): nothing imports this package; it is pure delivery payload.
- Lane honesty: react-native arm only — react-next, react-spa, and the non-npm lanes never read from it.

## Satellites & companions

Peer of `preset-next-15-canonical` (G5) and `preset-react-spa` (G6); peer-dependency on `@rules-as-tests/core` (G2). Delivered through `30-templates` (A12) and `40-configs` (A13). Its CI template feeds the stack arm's workflow seeding the same way G6's does.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/preset-react-native/package.json:2` — «"name": "@rules-as-tests/preset-react-native",»
- `packages/preset-react-native/package.json:4` — «"private": true,»
- `setup.d/30-templates.sh:27` — «copy_safe "$PKG_ROOT/packages/preset-react-native/RULES.md" "$PROJECT_ROOT/.ai-factory/RULES.md"»
- `setup.d/40-configs.sh:367-368` — «copy_safe "$PKG_ROOT/packages/preset-react-native/templates/$_rn_eslint" "$_ws_abs/eslint.config.mjs"» «copy_safe "$PKG_ROOT/packages/preset-react-native/templates/eslint.config.rn-common.mjs" "$_ws_abs/eslint.config.rn-common.mjs"»
- `setup.d/40-configs.sh:497` — «copy_safe "$PKG_ROOT/packages/preset-react-native/templates/eslint.config.rn-common.mjs" "$PROJECT_ROOT/eslint.config.rn-common.mjs"»
- `packages/preset-react-native/package.json:16-18` — «"@react-native/eslint-config": "^0.86.0",» «"eslint-config-expo": "^56.0.4",» «"eslint-plugin-react-native-a11y": "^3.5.1",»
