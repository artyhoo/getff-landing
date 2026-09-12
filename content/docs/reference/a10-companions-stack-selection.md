---
title: "15-companions-stack — stack-aware companion selection (A10)"
description: "The stage that reads companions.manifest, detects the consumer's stack from package.json signals, and reports which companions are relevant — selection only, no installs."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 15-companions-stack — stack-aware companion selection (A10)

**Status:** shipped-beta · **Ships to:** npm lane (runs for every install that sources the dispatcher) · **Fires at:** install time, stage 15

## What it is

`setup.d/15-companions-stack.sh` — the static, stack-aware companion selection layer. It reads `companions.manifest` (A22), detects the current stack from `package.json` signals, and reports which companions are relevant for the detected stack. It performs no installs: the actual companion installs happen in the setup wrapper's companion loop via `engine.sh` (A3).

## How it works

Stack detection is grep-based and node-free, shared as a single source of truth with `install.sh`'s own stack pick via the `_detect_stack_from_pkg` helper in `lib.sh`. The signal table: `next` present → `react-next`; `react` without `next` → `react-spa`; `react-native` present → `react-native`; `typescript` without react/next → `ts-server` (the default for TS projects). A companion row matches when its `stacks` field covers the detected stack; a `*` stacks field matches every stack, and an unknown detected stack includes all companions.

The layer is under a hard gate recorded in its own header: no AIF-engine mapping and no live registry call — a static table only.

Opt-outs and asymmetries: there is nothing to opt out of at this layer — it writes nothing. Its output is informational selection; the only consumer-visible effect is which companions the wrapper later offers. Non-npm lanes (python/cargo/go) get no companion selection from this layer — it reads `package.json`, which those lanes' consumers may not even have.

## Satellites & companions

Reads `companions.manifest` (A22) — the manifest is its input contract. Depends on `lib.sh` (A3) for the shared stack detector. Feeds the setup wrapper's companion loop, which routes rows by `kind` (A3).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/15-companions-stack.sh:2` — «# setup.d/15-companions-stack.sh — Stack-specific companion selection layer (S3).»
- `setup.d/15-companions-stack.sh:6` — «# This layer provides the static stack-aware selection; the actual installs are»
- `setup.d/15-companions-stack.sh:10` — «#   react-next   → next package present»
- `setup.d/15-companions-stack.sh:19` — «# R1 hard gate: no AIF-engine mapping, no live registry call — static table only (umbrella §9).»
- `setup.d/15-companions-stack.sh:34` — «  [ "$stacks_field" = "*" ] && return 0   # unknown stack: include all companions»
