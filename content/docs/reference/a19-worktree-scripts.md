---
title: "85-worktree-scripts — worktree helper cluster (A19)"
description: "The env+ stage that ships the three worktree helper scripts verbatim so getff work works for consumers — core skips, and the trio must land together."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 85-worktree-scripts — worktree helper cluster (A19)

**Status:** shipped-beta · **Ships to:** npm lane, `env`+ profile (`env`, `factory`, or legacy `--with-aif-suite`) — `core` skips · **Fires at:** install time, stage 85 — after `40-configs` created `scripts/`

## What it is

`setup.d/85-worktree-scripts.sh` — ships the three worktree helper scripts from the framework's `scripts/` tree into the consumer's `scripts/` tree, so `getff work <name>` (and direct `scripts/create-worktree.sh <name>` invocations) work at env+ depth: parallel-session worktrees with provisioned `node_modules`.

## How it works

The three scripts form a call chain — `create-worktree.sh` → `worktree-node-modules.sh` → `link-coordination.sh` — and the stage ships all three together, because a partial ship makes `create-worktree.sh` print loud warnings when its callees are absent. The copies are verbatim per the stage's REUSE contract: no rewrite, no patching. `create-worktree.sh` is dual-pair with the framework's CC-native worktree-setup hook — the hook is the in-harness path, the script is the portable one.

Opt-outs: `core` depth skips silently (not an error — core lacks the workspace surface); dry-run prints the skip. Nothing consumer-owned is ever overwritten: delivery goes through `copy_safe` (skip-if-exists).

## Satellites & companions

DEPENDS ON `40-configs` (A13) for the `scripts/` directory. The scripts are the consumer-portable twin of a CC-native hook — same capability, two delivery channels (the hook is not censused in this stage's scope). The env+ gate is the same shape as `55-runtime-bridge-vendor.sh` (A15) but one depth lower: env gets the workspace conveniences, factory gets the operator runtime on top.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/85-worktree-scripts.sh:2` — «# setup.d/85-worktree-scripts.sh — §5e worktree scripts cluster (env+ profile).»
- `setup.d/85-worktree-scripts.sh:11` — «#   Ships the three worktree helper scripts from the framework's scripts/ tree»
- `setup.d/85-worktree-scripts.sh:15` — «#     create-worktree.sh  →  worktree-node-modules.sh  →  link-coordination.sh»
- `setup.d/85-worktree-scripts.sh:16` — «#   so all three MUST ship together (a partial ship produces loud warnings»
- `setup.d/85-worktree-scripts.sh:27` — «#   The scripts are copied VERBATIM from $PKG_ROOT/scripts/ — no rewrite,»
- `setup.d/85-worktree-scripts.sh:34` — «if [ "${PROFILE:-core}" != "env" ] \»
