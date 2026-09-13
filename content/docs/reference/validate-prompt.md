---
title: "validate-prompt (hook)"
description: "Plugin hook that validates batch-spec frontmatter when kickoff/batch-spec files are edited; exit 2 + stderr is the violation channel the model receives."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# validate-prompt (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit`. Gate: exit 2 + stderr on violation (CC), JSON additionalContext on ZCode.

## What it is

The edit-time validator for batch-spec documents on orchestrator-prompts: after an Edit/Write touches a matching file, it runs the portable validator (`packages/core/spec-validation/validate-batch-spec.ts`) and reports red findings at the earliest channel — inside the authoring session, not at dispatch or CI time.

## How it works

Input is the hook JSON from stdin (`tool_input.file_path`); unmatched paths exit 0 silently. The validator itself is portable TS — this hook is only its CC fire-point. Channel semantics are load-bearing: on CC the VIOLATION path is exit 2 + stderr — the only non-JSON channel the model receives on PostToolUse (exit-1 stderr reaches the operator transcript but NOT the model; live-verified 2026-07-24). On ZCode, plain non-zero exits are swallowed, so violations ride JSON `additionalContext`. Graceful skips (jq/tsx unavailable, emit prelude absent) exit 0 — and on an exit-0 PostToolUse the model receives ONLY JSON hookSpecificOutput, so a dependency-missing skip is indistinguishable from a pass (a documented limitation of the skip channel). Per-hook off-switch: `AIF_VALIDATE_PROMPT=0` (`plugin/hooks/validate-prompt:87`).

**Fail mode:** exit 2 + stderr (CC) / JSON emit (ZCode) on a spec-validation violation; silent pass otherwise. Never blocks the edit itself (PostToolUse fires after).

## Satellites & companions

USES the shared emit prelude at `plugin/hooks/lib/hook-emit.sh` (one definition of `_is_zcode`/`_emit_skip`/`_emit_ctx` — #1597 R-2/K-1); the validator SSOT is `packages/core/spec-validation/validate-batch-spec.ts`.

## Anchors

- `plugin/hooks/validate-prompt:2` — «# Wave 7 sub-wave 7.2.b — PostToolUse hook: validate batch-spec on orchestrator-prompts.»
- `plugin/hooks/validate-prompt:3` — «# Fires on Edit|Write tool calls. Input: hook JSON via stdin (tool_input.file_path).»
- `plugin/hooks/validate-prompt:4` — «# Exits 0 silently on pass or unmatched path; non-zero + diagnostic on red.»
- `plugin/hooks/validate-prompt:13` — «# non-zero exits; JSON additionalContext reaches the model. CC VIOLATION path: exit 2 +»
- `plugin/hooks/validate-prompt:87` — «[[ "${AIF_VALIDATE_PROMPT:-1}" == "0" ]] && exit 0»
