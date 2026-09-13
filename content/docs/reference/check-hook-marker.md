---
title: "check-hook-marker (hook)"
description: "Plugin hook that requires a delivery-channel marker (@dual-pair or @cc-only-rationale) on every edit of a .claude/hooks/*.sh file, preventing silent CC vendor lock-in."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# check-hook-marker (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit` on `.claude/hooks/*.sh`. Gate: exit 2 + stderr on violation (`_adv_violation`).

## What it is

The delivery-channel marker gate on touched hooks (dual-implementation-discipline §6): every edit of a hook file must leave the hook stating its channel intent — `# @dual-pair: <anchor>` (a portable counterpart exists) or `# @cc-only-rationale: <reason>` (deliberately CC-only, with a reason).

## How it works

Edit-time IS the "at next touch" semantics the doctrine wants: legacy hooks are flagged only when actually edited, never retroactively. Marker PRESENCE is all this gate checks — the heavier §5 drift-check (does the @dual-pair anchor name a real counterpart?) belongs to the CI-side population sweep `channel-coverage.sh` (Surface 8, run by principle 21), which also resolves anchors. The violation path is `_adv_violation()` at `plugin/hooks/check-hook-marker:54`: on CC `printf … >&2; exit 2` — the PostToolUse channel the model receives; on ZCode the same message rides JSON `additionalContext` (exit 2 is swallowed as HookRunFailed).

**Fail mode:** exit 2 + stderr (CC) / JSON emit (ZCode) when an edited hook lacks both markers; silent exit 0 off-path or when a marker is present.

## Satellites & companions

USES `.claude/rules/dual-implementation-discipline.md` §6 as spec; CI companion `tests/agnosticism/probes/channel-coverage.sh` (population-wide, resolves anchors); twin of `.claude/hooks/check-hook-marker.sh`; shares the `plugin/hooks/lib/hook-emit.sh` prelude.

## Anchors

- `plugin/hooks/check-hook-marker:1` — «#!/usr/bin/env bash»
- `plugin/hooks/check-hook-marker:3` — «# PostToolUse gate — delivery-channel marker on touched hooks (Wave N8 C4).»
- `plugin/hooks/check-hook-marker:12` — «# `# @cc-only-rationale: <reason>` (CC-only, with a reason). Missing → exit 1.»
- `plugin/hooks/check-hook-marker:54` — «_adv_violation() { if _is_zcode; then _emit_ctx "PostToolUse" "$1"; else printf '%s\n' "$1" >&2; exit 2; fi; }»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the check-hook-marker arm)
