---
title: "@rules-as-tests/lint-config — the shared markdownlint structural config (G3)"
description: "Workspace-private three-file package defining the hand-rolled structural-only markdownlint rule set applied to the framework repo's own staged Markdown by its pre-commit hook."
---
<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/lint-config — the shared markdownlint structural config (G3)

**Status:** shipped-beta · **Ships to:** clone only (workspace-internal discipline; NOT in the npm dist payload, NOT delivered to consumer installs) · **Fires at:** the framework repo's own `git commit` — markdownlint-cli2 on staged `*.md` via `.husky/pre-commit`

## What it is

The smallest package in the workspace: `package.json`, `markdownlint.json`, `README.md`. Its `files` allowlist is exactly two entries («"files": ["markdownlint.json", "README.md"]», `packages/lint-config/package.json:7`) and it is `private: true` — a workspace member, not a product. The payload is one JSON config with six structural rules enabled over a `default: false` base:

| rule | meaning (per the package README) |
|---|---|
| MD001 | heading-increment — heading levels must increment by one |
| MD003 | heading-style — ATX (`#`) only |
| MD007 | ul-indent — unordered lists indent 2 spaces |
| MD009 | no-trailing-spaces |
| MD034 | no-bare-urls |
| MD040 | fenced-code-language — every fenced block names a language |

The rule set is deliberately hand-rolled, not a preset: «Rules are hand-rolled for this project — no Microsoft, Google, or markdownlint-standard preset.» Prose-style rules stay off on purpose — MD013 (line-length) is disabled so long prose/table lines are legal, and the only length gate is the 500-line file limit enforced in pre-commit (`packages/lint-config/README.md:26-31`).

## How it works

Two consumers, both inside the framework repo:

1. **The root `.markdownlint.json` mirrors this package's `markdownlint.json` byte-for-byte** — markdownlint-cli2 auto-discovers the root file when run from the repo root: «The root `.markdownlint.json` mirrors the content of `markdownlint.json` exactly.» The README's change protocol requires editing both in the same commit plus updating the rule table (`packages/lint-config/README.md:84-91`).
2. **The repo's own `.husky/pre-commit` applies the rule set to staged Markdown** — «The root `.husky/pre-commit` hook applies this rule set to every staged `*.md` file.» The hook's structural-lint block is marked «# ── markdownlint-cli2 on staged *.md (structural rules) ─────────────────────» and fails the commit on violations.

**Asymmetry (the load-bearing negative):** consumer installs do NOT receive this package. «Consumer projects that install this framework via `install.sh` inherit the pre-commit hook but do» (not the config package — the sentence continues onto the next line advising consumers to copy or reference the rule set directly). It is also absent from the dist assembler's PAYLOAD list (`scripts/build-getff-dist.sh:42` names `packages/core` and the three `preset-*` packages but not `lint-config`), so the npm tarball does not carry it either.

## Satellites & companions

COMPLEMENTS the consumer-side gate scripts (F45 check-rule-globs, F49 check-lintstaged-resolves): those police consumer repos at pre-push/pre-commit after delivery; this package polices the framework repo's own docs at pre-commit. It ADDS nothing to any delivered capability — it is the workspace's own hygiene contract. The root mirror file, not this package, is what markdownlint-cli2 actually reads. Related discipline: doc-authority headers on authority-bearing docs (`.claude/rules/doc-authority-hierarchy.md` is cited by the README as the motivation for structural linting).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/lint-config/package.json:4` — «"private": true,»
- `packages/lint-config/package.json:6` — «"description": "Shared markdownlint structural config for rules-as-tests-aif workspace",»
- `packages/lint-config/markdownlint.json:2` — «"default": false,»
- `packages/lint-config/README.md:13` — «Rules are hand-rolled for this project — no Microsoft, Google, or markdownlint-standard preset.»
- `packages/lint-config/README.md:43` — «The root `.markdownlint.json` mirrors the content of `markdownlint.json` exactly.»
- `packages/lint-config/README.md:78` — «Consumer projects that install this framework via `install.sh` inherit the pre-commit»
- `.husky/pre-commit:100` — «# ── markdownlint-cli2 on staged *.md (structural rules) ─────────────────────»
- `scripts/build-getff-dist.sh:42` — «packages/core packages/preset-next-15-canonical» (PAYLOAD list — lint-config absent)
