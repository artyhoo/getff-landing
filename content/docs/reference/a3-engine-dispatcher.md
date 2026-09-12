---
title: "Engine + lib — the installer's stage dispatcher (A3)"
description: "setup.d/engine.sh dispatches companion installs; setup.d/lib.sh carries the shared helpers (copy_safe, tier skill lists, managed-block writers) every stage sources."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# Engine + lib — the installer's stage dispatcher (A3)

**Status:** shipped-beta · **Ships to:** clone→consumer (runs FROM the clone; sourced into every lane's install) · **Fires at:** install time, inside `install.sh`'s shell scope

## What it is

Two files under `setup.d/` that are not numbered stages but are sourced by everything that is. `engine.sh` is the companion-manifest engine: it defines `companion_step`, the function that turns one row of `companions.manifest` into a detect-first install decision. `lib.sh` is the shared helper library — copy semantics, the per-tier skill lists, the managed-block fence constants, and the AGENTS.md fence machinery.

## How it works

`engine.sh` is sourceable in lib-only mode (`ENGINE_LIB_ONLY=1`), so the setup wrapper can use its helpers without arming the install loop. Its routing is by `kind`: `cc-plugin` rows install via the plugin CLI under a post-install wrapper loop, `external-service` rows are handed to the runtime-bridge guided-detect with their install command ignored, and `mcp` rows are consumed by the `05-mcp` layer inside `install.sh` — before `70-deps`, and explicitly NOT by the post-install wrapper loop. Detection failures are graceful: an external service prints and returns 0; a missing `claude` CLI skips MCP rows with a notice rather than failing the install.

`lib.sh` owns three capability groups the rest of the installer leans on:

- **Tier skill lists** — one list per depth (`GETFF_SKILLS_CORE`, `GETFF_SKILLS_ENV`, `GETFF_SKILLS_FACTORY`), read by both install (`setup.d/10-skills.sh`) and refresh arms so the two cannot drift.
- **`copy_safe`** — skip-if-exists delivery: a destination already on disk is recorded as SKIPPED and left untouched unless `--force` is passed. This is the mechanism behind "the installer never clobbers your files".
- **Managed-block writers** — begin/end fence constants used to insert getff-owned sections into consumer-owned files (prettierignore fences, the `getff-framework` fenced section in AGENTS.md), so regeneration replaces exactly the fenced slice.

## Satellites & companions

USES `companions.manifest` (A22) as its row source and `setup.d/LAYERS.md` (A21) as its registry. `install.sh` (A2) sources both files before the numbered stages run. The tier lists here are what stage `20-agents` and stage `10-skills` read — the engine adapts nothing of them, it IS the shared vocabulary.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/engine.sh:2` — «# Companion manifest engine. Sourceable in lib-only mode (ENGINE_LIB_ONLY=1).»
- `setup.d/engine.sh:5` — «# Principle: detect-first; install only via the companion's own official command; no version pin.»
- `setup.d/engine.sh:8-12` — «#   cc-plugin        — Claude Code plugin (claude plugin install …); post-install wrapper loop» … «#   mcp              — Claude MCP server (claude mcp add …); detect-first; consumed by the»
- `setup.d/lib.sh:61` — «GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"»
- `setup.d/lib.sh:65` — «PRETTIERIGNORE_BEGIN='# >>> rules-as-tests-aif (managed) >>>'»
- `setup.d/lib.sh:474` — «copy_safe() {»
