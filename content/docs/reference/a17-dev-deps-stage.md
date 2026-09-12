---
title: "70-deps — scripts merge + dev-dep install (A17)"
description: "The stage that merges the canonical scripts block into package.json non-destructively, installs hooks runtime dev-deps, and lands tsx at the repo root."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 70-deps — scripts merge + dev-dep install (A17)

**Status:** shipped-beta · **Ships to:** npm lane (no `package.json` → the scripts merge no-ops) · **Fires at:** install time, stage 70 — after `60-ci` has written the configs it references

## What it is

`setup.d/70-deps.sh` — three jobs in one stage: the `§7` canonical `package.json` scripts merge, the `§8` dev-dependency install (the hooks' runtime deps), and the `§8b` tsx-at-root placement. It sets the `DEPS_INSTALLED` / `DEVDEPS` globals that `99-finalize` (A20) reads to report honestly.

## How it works

The scripts merge exists because the installer historically left scripts as a manual step, so consumers landed an empty `scripts:` block while the shipped AGENTS.md, CI workflow, and hooks all call `npm run lint/typecheck/arch:check/test:*` — every gate failed with "Missing script". The stage injects the canonical block non-destructively: it only adds keys the consumer lacks. One injected script is self-resolving: `arch:check`'s dependency-cruiser target is computed at install time (workspace root → root `src/` → `.`, in that order) so the architecture gate cruises something that exists on flat, layered, and monorepo shapes instead of crashing on a missing directory.

The stage is honest about the boundary in its own header: the referenced devDependencies (eslint, dependency-cruiser, stryker, npm-run-all2, vitest, prettier, husky) are not all installed here — scripts present does not mean runnable until the consumer's own `npm install` lands them; "Missing script" → "tool not installed" is the intended, documented path.

Opt-outs: no `package.json` → no scripts merge; `--dry-run` prints the intended merge; missing `node` skips the node-dependent branches.

## Satellites & companions

DEPENDS ON `60-ci` (A16) — the configs the scripts reference are already written when this stage runs. FEEDS `99-finalize` (A20) with the deps-installed state. The scripts it injects are what `.husky/pre-push` (E13) and the shipped CI workflow call.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/70-deps.sh:2` — «# setup.d/70-deps.sh — §7 package.json scripts merge + §8 dev-dep install + §8b tsx-at-root.»
- `setup.d/70-deps.sh:13` — «# install.sh historically left scripts as a manual INSTALL.md §3 step, so consumers landed»
- `setup.d/70-deps.sh:17` — «# The referenced devDependencies (eslint, dependency-cruiser,»
- `setup.d/70-deps.sh:20` — «if [ -f "$PROJECT_ROOT/package.json" ]; then»
- `setup.d/70-deps.sh:24` — «    echo "▶ Merging canonical scripts → package.json (non-destructive)"»
