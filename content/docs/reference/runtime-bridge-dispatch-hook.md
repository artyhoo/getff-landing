---
title: "runtime-bridge-dispatch (hook)"
description: "Plugin hook that auto-dispatches a meta-launch kickoff to the aif runtime the moment it is written (opt-in via the kickoff's bridge:auto first line), with a failure-warning arm for lost dispatches."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# runtime-bridge-dispatch (hook)

**Status:** shipped-beta · **Ships to:** plugin; setup.d/55-runtime-bridge-vendor.sh also ships this hook to factory consumers (vendor copy) · **Fires at:** PostToolUse with matcher `Write|Edit|MultiEdit` AND — new at this pin — PostToolUseFailure with the same matcher. Injection, never a gate (exit 0 on every dispatch outcome the operator cannot fix by editing the kickoff).

## What it is

The edit-time dispatch bridge for meta-launch kickoffs: when a Write/Edit lands on `.claude/orchestrator-prompts/<anything>-meta-launch/kickoff.md`, the hook hands the kickoff to the runtime-bridge dispatch CLI (`packages/runtime-bridge/src/cli/dispatch.ts` is its spec), so an authored kickoff becomes a dispatched autonomous task without a manual command.

## How it works

Per-task opt-IN (kickoff §7, maintainer decision 2026-05-31): auto-dispatch is real, metered autonomous work — the hook fires ONLY when the first line of the file is exactly `<!-- bridge: auto -->` (trimmed match, checked at `plugin/hooks/runtime-bridge-dispatch:131`). Default is no auto-dispatch; the manual flow `tsx packages/runtime-bridge/src/cli/dispatch.ts <kickoff>` stays available, and a `<!-- bridge: skip -->` marker keeps serving the manual path. The PostToolUseFailure arm (P3-1, added 2026-09-11 at `:106`): a FAILED Write/Edit of a marked kickoff is a dispatch the author opted into that silently never happened — the success path never fires, so this arm injects the missing warning. Injection only (the write already failed; there is nothing to gate). Silence boundaries: `is_interrupt=true` (user cancelled) is intentional, not a loss; a failed FRESH write leaves no file, so the opt-in marker is unknowable — warn only when the on-disk kickoff carries `<!-- bridge: auto -->` (the failed-EDIT-of-a-marked-kickoff case).

**Fail mode:** never blocks the edit. Warnings and dispatch results ride JSON `hookSpecificOutput.additionalContext` (CC PostToolUse contract); a lost dispatch (failed edit of a marked kickoff) surfaces as an injected warning via the PostToolUseFailure arm.

## Satellites & companions

USES `packages/runtime-bridge/src/cli/dispatch.ts` (spec) for the actual dispatch; ADAPTS `.claude/hooks/runtime-bridge-dispatch.sh` (auto-generated twin — the twin fires the same PostToolUse + PostToolUseFailure moments on ZCode, doctrine row 17); the vendor copy ships to factory consumers via setup.d/55-runtime-bridge-vendor.sh.

## Anchors

- `plugin/hooks/runtime-bridge-dispatch:1` — «#!/usr/bin/env bash»
- `plugin/hooks/runtime-bridge-dispatch:3` — «# PostToolUse hook — runtime-bridge dispatch for meta-launch kickoffs.»
- `plugin/hooks/runtime-bridge-dispatch:23` — «# Per-task opt-IN (kickoff §7, maintainer decision 2026-05-31): auto-dispatch»
- `plugin/hooks/runtime-bridge-dispatch:106` — «# ── PostToolUseFailure arm (P3-1, 2026-09-11) ────────────────────────────────»
- `plugin/hooks/runtime-bridge-dispatch:131` — «     && [ "$(head -n1 "$FILE_PATH" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')" = '<!-- bridge: auto -->' ]; then»
- `plugin/hooks/hooks.json:140` — «"PostToolUseFailure": [» (the failure arm registered here; success arm in the PostToolUse block at `plugin/hooks/hooks.json:57`)
