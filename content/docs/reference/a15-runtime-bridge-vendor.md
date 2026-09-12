---
title: "55-runtime-bridge-vendor — vendored runtime-bridge subset (A15)"
description: "The factory-only stage that copies the vendored runtime-bridge subset and its dispatch hook into the consumer tree — file-copy only; activation is a separate runtime decision."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 55-runtime-bridge-vendor — vendored runtime-bridge subset (A15)

**Status:** shipped-beta · **Ships to:** npm lane, `factory` profile only (or legacy `--with-aif-suite`) — `env` and `core` skip · **Fires at:** install time, stage 55

## What it is

`setup.d/55-runtime-bridge-vendor.sh` — the install-time, file-copy-only stage that gives a consumer (non-framework) repo the ability to dispatch aif tasks locally via `tsx .claude/vendor/runtime-bridge/...`. It is the consumer-side bridgehead for the runtime-bridge (family H): a vendored subset of the bridge, plus the dispatch hook, without any runtime bring-up.

## How it works

Two copies happen: the vendored subset moves from `packages/runtime-bridge/vendor/` in the framework payload to `.claude/vendor/runtime-bridge/` in the consumer tree, and the dispatch PostToolUse hook moves from `packages/runtime-bridge/vendor/hooks/runtime-bridge-dispatch.sh` to `.claude/hooks/runtime-bridge-dispatch.sh` (idempotent with the runtime's own setup flow).

The stage is explicit about what it does NOT do: it never registers the hook in the consumer's `.claude/settings.json`. Installing the file does not activate it — activation is the consumer's separate runtime decision, offered by the bridge's own setup script once the runtime is reachable. Unregistered, the hook file is a no-op even though it is present. This is the stage's honesty boundary: install-time copies never silently wire a PostToolUse hook into the consumer's session.

Opt-outs: any non-factory profile skips (silently, by design); `--with-aif-suite` routes through factory and installs.

## Satellites & companions

ADDS a consumer-local dispatch path over the runtime-bridge (H family) — the bridge itself is not installed by this stage; guided detection/install is `bridge-guided.sh` (A24) and `aif-handoff-guided-install.sh` (A23). The dispatch hook it copies is the same script the plugin hooks wire (I-family context, censused in D). The profile gate mirrors `85-worktree-scripts.sh` (A19) but at the factory depth instead of env+.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/55-runtime-bridge-vendor.sh:2` — «# setup.d/55-runtime-bridge-vendor.sh — §5d vendored runtime-bridge subset (factory-only).»
- `setup.d/55-runtime-bridge-vendor.sh:11` — «#   1. Copies the vendored runtime-bridge subset from»
- `setup.d/55-runtime-bridge-vendor.sh:16` — «#      $PKG_ROOT/packages/runtime-bridge/vendor/hooks/runtime-bridge-dispatch.sh»
- `setup.d/55-runtime-bridge-vendor.sh:22` — «#   - Register the PostToolUse hook in .claude/settings.json — that is the»
- `setup.d/55-runtime-bridge-vendor.sh:29` — «#     no-op even if the file is present).»
- `setup.d/55-runtime-bridge-vendor.sh:36` — «#   - PROFILE=env      → skip (env depth lacks the aif-handoff operator runtime).»
