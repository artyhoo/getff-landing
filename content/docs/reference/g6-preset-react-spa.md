---
title: "@rules-as-tests/preset-react-spa — react-spa preset package (G6)"
description: "The workspace-private react-spa preset: one shipped ESLint rule (require-error-boundary) with its test, the react eslint/vitest/playwright config templates, stack RULES docs and its own audit script — delivered file-wise on the react-spa stack arm, never as an npm artifact."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/preset-react-spa — react-spa preset package (G6)

**Status:** shipped-beta · **Ships to:** react-spa stack arm, npm lane (workspace-only — `private: true`; contents reach consumers as files through the stages, never as an npm artifact) · **Fires at:** install time on the react-spa stack arm (setup.d/30-templates.sh + setup.d/40-configs.sh)

## What it is

The react-spa slice of the preset family: a 17-file package carrying the stack's rule docs (`RULES.md`, `RULES.react-spa.md`), the architecture template, ESLint config template (`eslint.config.react.mjs`), vitest + playwright configs, a tests-setup seed, its own audit script (`audit-ai-docs.react-spa.sh`), and one shipped custom ESLint rule — `require-error-boundary` — with its TypeScript source, declaration, test and barrel entry.

## How it works

- Like every workspace package except `getff` (G1), it is `private: true` — consumers never install it; the stages copy selected FILES out of it when `STACK=react-spa` resolves: RULES.md to `.ai-factory/RULES.md` (30-templates), the architecture template and `RULES.react-spa.md` into `.ai-factory/`, the audit script into `scripts/` (40-configs), and the eslint/vitest/playwright templates to the consumer root (or per-workspace, in monorepo shape).
- It has NO `preset.meta.json` — the staleness-pin mechanism its Next-15 sibling (G5) carries does not exist here, so no deps-free staleness WARN anchors to this package. That is a real asymmetry within the preset family, not an omission of the docs.
- Unlike the react-native preset (G7), it carries a `main` entry (`./eslint-rules/index.ts`) and an `exports` map — the shipped rule barrel is reachable as a package surface for in-repo tooling and tests.
- Its custom rule ships the full rules-as-tests material: rule source (`.ts`), runtime loader (`.mjs`), type declaration and a vitest rule-tester test — the same shape the meta-factory emits for generated rules.
- Lane honesty: react-spa arm only. The react-next arm uses the shared template tree + G5; the react-native arm has its own package (G7); no python/cargo/go lane reads anything from this package.

## Satellites & companions

Peer of `preset-next-15-canonical` (G5) and `preset-react-native` (G7); peer-dependency on `@rules-as-tests/core` (G2) like the whole preset family. Its deliveries land through `30-templates` (A12) and `40-configs` (A13). The storybook scaffold (E37/E38) belongs to react-next only — this package ships no Storybook config, and no CI workflow of its own beyond the shared `github-actions-ci-ui.yml` template it carries for the stack arm.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/preset-react-spa/package.json:2` — «"name": "@rules-as-tests/preset-react-spa",»
- `packages/preset-react-spa/package.json:4` — «"private": true,»
- `packages/preset-react-spa/package.json:7` — «"main": "./eslint-rules/index.ts",»
- `setup.d/30-templates.sh:25` — «copy_safe "$PKG_ROOT/packages/preset-react-spa/RULES.md" "$PROJECT_ROOT/.ai-factory/RULES.md"»
- `setup.d/40-configs.sh:474` — «copy_safe "$PKG_ROOT/packages/preset-react-spa/templates/playwright.config.ts" "$PROJECT_ROOT/playwright.config.ts"»
- `packages/preset-react-spa/eslint-rules/require-error-boundary.test.ts:1` — (rule-tester test present; the shipped rule carries its own test material)
