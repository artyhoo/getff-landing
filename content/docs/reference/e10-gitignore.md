---
title: "gitignore — seed .gitignore (E10)"
description: "A five-line seed .gitignore (node_modules, dist, coverage, .stryker-tmp, reports) delivered skip-if-exists so a gitignore-less consumer never stages node_modules — a consumer's own .gitignore always wins, warned but never edited."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# gitignore — seed .gitignore (E10)

**Status:** shipped-beta · **Ships to:** npm-lane, all tier arms (core / env+ / factory) · **Fires at:** install time (setup.d/40-configs.sh shared-templates block)

## What it is

A deliberately undotted template file named `gitignore` whose five lines are the minimal ignore set a fresh consumer needs: `node_modules/`, `dist/`, `coverage/`, `.stryker-tmp/`, `reports/`. The installer copies it to the consumer's project root as `.gitignore`.

## How it works

- The source file is NOT dotted on purpose: the npm tarball packaging drops dotted files from its manifest (measured in-stage and commented at the delivery site), so a dotted source would silently vanish on the npm delivery channel and `copy_safe` would fail.
- Without a seed, a gitignore-less consumer staging `git add -A` would commit `node_modules/` — and lint-staged's per-directory config discovery would then execute vendored configs from inside node_modules. The seed exists to close exactly that hole.
- `copy_safe` semantics apply in full: an existing consumer `.gitignore` is recorded SKIPPED and left untouched — Layer-2 ownership, warned below, never edited.
- The stage adds one honesty guard after delivery: if the (kept) consumer `.gitignore` has no `node_modules` line, the install prints a warning saying `git add -A` will stage node_modules and suggesting the line — the file stays untouched either way.
- Lane honesty: npm-lane only — the python, cargo and go lanes deliver no `.gitignore` seed (their stages have no gitignore reference).

## Satellites & companions

Delivered by the same `40-configs` stage (A13) as its neighbors `.lintstagedrc.json` (E1) and `.prettierignore` (E3); the same `_prettierignore_in_skipped` helper that classifies the prettierignore classifies this file's skip state. The pre-commit chain (E12 / D20) is the downstream consumer of the guarantee it seeds.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/gitignore:1` — «node_modules/»
- `packages/core/templates/shared/gitignore:4` — «.stryker-tmp/»
- `setup.d/40-configs.sh:105` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/gitignore" "$PROJECT_ROOT/.gitignore"»
- `setup.d/40-configs.sh:100-104` — «# drops a dotted .gitignore from the tarball (measured 2026-09-02), so a dotted source would be» … «# .gitignore always wins (Layer-2) — warned below, never edited.»
- `setup.d/40-configs.sh:107` — «echo "  ⚠ .gitignore exists without a node_modules line — 'git add -A' will stage node_modules/. Consider adding node_modules/ to .gitignore (file left untouched)." >&2»
