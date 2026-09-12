---
title: "hooks-package.json — the ESM marker (E11)"
description: 'A three-line {"type":"module"} package.json delivered into the consumer''s packages/core/hooks/ so the shipped TypeScript pre-push hook loads as ESM instead of dying at module load under Node''s require(esm) cycle detection.'
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# hooks-package.json — the ESM marker (E11)

**Status:** shipped-beta · **Ships to:** npm-lane, all tier arms (core / env+ / factory) · **Fires at:** install time (setup.d/50-hooks.sh); its effect is at every `git push`, when the pre-push hook's TypeScript source is first loaded

## What it is

The smallest template in the tree: `{"type": "module"}` and nothing else. The installer places it at `packages/core/hooks/package.json` in the consumer project, which marks that one directory's JavaScript as ESM so the shipped `pre-push.ts` hook loads the way it does inside the framework repo.

## How it works

- Without it, the failure is total and early: in a consumer the nearest package.json is usually the project root with no `type` field, the CJS default applies, and tsx's `require(esm)` bridge hits Node's cycle detection — the hook dies with `ERR_REQUIRE_CYCLE_MODULE` at module load, before any check runs, so every `git push` aborts with a stack trace.
- The marker is deliberately scoped to `packages/core/hooks/` (the AIF-owned directory) rather than set at the project root: it can't collide with a consumer's own `packages/core` package and can't be picked up as a workspace member.
- Delivery is `copy_safe` like everything else — but because the destination is a getff-owned path (not a consumer-authored file), a refresh can re-write it without violating the consumer-ownership rules.
- Lane honesty: npm-lane only. The delivered python pre-push rung is plain bash (no module system) and the cargo/go lanes ship no hooks — none of them need or receive this marker.

## Satellites & companions

Delivered by `50-hooks` (A14) in the same stage as the hooks it enables — `husky-pre-commit.sh` (E12) and `husky-pre-push.sh` (E13). Its whole reason to exist is the shipped TypeScript pre-push dispatcher (the D-family hook graph, D22's ESM loading); without it that graph never executes in a consumer repo.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/hooks-package.json:1` — «{»
- `packages/core/templates/shared/hooks-package.json:2` — «  "type": "module"»
- `setup.d/50-hooks.sh:58` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/hooks-package.json" "$PROJECT_ROOT/packages/core/hooks/package.json"»
- `setup.d/50-hooks.sh:53-55` — «# with ERR_REQUIRE_CYCLE_MODULE *at module load*, before any §7/§1.7 check runs (every git push aborts» «# with a stack trace). Ship a hooks-scoped {"type":"module"} marker so the shipped .ts loads as ESM —»
- `setup.d/50-hooks.sh:56` — «# collide with a consumer's own packages/core package or be picked up as a workspace member.»
