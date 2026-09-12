---
title: ".nvmrc — pinned node version seed (E2)"
description: "A one-line Node version seed (22.23.1) copied to the consumer project root at install; the CI gate reads it via node-version-file and the CI stage warns when a kept workflow hardcodes a different major."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# .nvmrc — pinned node version seed (E2)

**Status:** shipped-beta ·
**Ships to:** npm-lane, all tier arms (core / env+ / factory), every npm stack (ts-server + react-* presets) · **Fires at:** install time (setup.d/40-configs.sh shared-templates block); afterwards read by `nvm use` locally and by the delivered CI workflow's `node-version-file`

## What it is

A single-line file in the shared template tree whose entire content is a Node version: `22.23.1`. The installer copies it to the consumer's project root as `.nvmrc`, where nvm and the delivered CI workflow pick it up as the Node pin. It is a seed, not a lock — copy_safe means a consumer's own `.nvmrc` is never overwritten.

## How it works

- The template is one line long. Delivered via `copy_safe` (skip-if-exists) in the shared-templates block of `setup.d/40-configs.sh`, so a brownfield consumer's existing `.nvmrc` is recorded as SKIPPED and kept.
- The delivered ts-server CI workflow does not hardcode a version — it points at the seed with `node-version-file: '.nvmrc'`, so CI and local `nvm use` read the same file.
- The dependency stage treats `.nvmrc` 22.23.1 as the reference environment for its pinned tool array: the pins were chosen Node-20-compatible and still run on the shipped seed, while brownfield consumers may keep an older 20.19+ `.nvmrc`.
- The CI stage (`setup.d/60-ci.sh`) runs a drift WARN: if a kept workflow hardcodes `node-version: NN` with a different major than `.nvmrc`, the install prints an alignment warning (it stays a warning, not a failure). A workflow using `node-version-file: '.nvmrc'` cannot drift by construction.
- Lane honesty: the python, cargo and go lanes never deliver `.nvmrc` — their stages (setup.d/45/46/47) contain no reference to it.

## Satellites & companions

USES `copy_safe` from `setup.d/lib.sh` (A3) for skip-if-exists delivery. Is depended on by the CI stage (A16): `setup.d/60-ci.sh`'s header names `.nvmrc` among the files `40-configs` must already have written. Companion of the delivered CI workflows (A2 family), which consume it through `node-version-file`. ADDS over a bare nvm workflow: the seed ships so a fresh install's local Node and its CI Node resolve from one file instead of drifting.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/.nvmrc:1` — «22.23.1»
- `setup.d/40-configs.sh:98` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/.nvmrc" "$PROJECT_ROOT/.nvmrc"»
- `templates/ts-server/github-actions-ci.yml:31` — «node-version-file: '.nvmrc'»
- `setup.d/70-deps.sh:180` — «# fine on the shipped .nvmrc 22.23.1 (brownfield consumers may keep an older 20.19+ .nvmrc); this array is the single canonical pin source now that the orphaned Batch-K»
- `setup.d/60-ci.sh:32` — «echo "⚠ .nvmrc pins Node ${_nvmrc_major}.x but ${_wf#"$PROJECT_ROOT"/} hardcodes node-version: ${_ci_ver} — local 'nvm use' will differ from this CI. Align them, or switch the workflow to: node-version-file: '.nvmrc'.»
- `setup.d/60-ci.sh:8` — «# Depends on: 40-configs (eslint.config.mjs + .nvmrc + .github/workflows/ already written)»
