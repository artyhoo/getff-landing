---
title: "ask-question-reminder (hook)"
description: "Plugin hook that challenges the first AskUserQuestion of a session (fork-challenge nudge) via PreToolUse deny, then lets the retry through."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# ask-question-reminder (hook)

**Status:** shipped-beta · **Ships to:** plugin; also shipped to consumer CC projects (GH #934) via install.sh + do_refresh — a generic pre-question nudge, not framework-bound · **Fires at:** PreToolUse with matcher `AskUserQuestion`. CAN block: one deny per session via `permissionDecision:"deny"`.

## What it is

The PRE-QUESTION half of the recap discipline (its companion `end-of-turn-reminder` owns the END-OF-TURN half). The moment the model is about to ask the user a question, this hook challenges the question once: is this a genuine fork, or something the model should decide itself?

## How it works

PreToolUse blocks via `hookSpecificOutput.permissionDecision="deny"` + `permissionDecisionReason`; exit 0 → JSON parsed (verified dual-channel 2026-05-21, `plugin/hooks/ask-question-reminder:20`). A Stop hook does NOT reliably fire when a turn ends in AskUserQuestion (the harness treats AUQ as interaction-pending), which is why this lives on PreToolUse. Loop safety: PreToolUse has no `stop_hook_active` equivalent, so a blanket deny would loop (deny → regenerate → ask → deny…). Guard = a session-scoped TWO-STATE flag (content "challenged"/"passed" + mtime): challenge once, then let the post-challenge retry through count-based.

**Fail mode:** deny on the FIRST AskUserQuestion of a session (the challenge), pass thereafter. Missing `jq` → exit 0 silently (never error-spam a consumer's every question, `plugin/hooks/ask-question-reminder:43`).

## Satellites & companions

USES the shipped lang pack (`aif_msg_question_challenge`) for its payload prose; ADAPTS the CC-native permissionDecision contract (no portable counterpart by nature); ADDS the two-state loop-safety flag. Companion: `end-of-turn-reminder` (Stop).

## Anchors

- `plugin/hooks/ask-question-reminder:1` — «#!/usr/bin/env bash»
- `plugin/hooks/ask-question-reminder:3` — «# @cc-only-rationale: CC-specific PreToolUse:AskUserQuestion hook — it can only fire inside a»
- `plugin/hooks/ask-question-reminder:20` — «# hookSpecificOutput.permissionDecision="deny" + permissionDecisionReason; exit 0 → JSON parsed.»
- `plugin/hooks/ask-question-reminder:43` — «command -v jq >/dev/null 2>&1 || exit 0»
- `plugin/hooks/hooks.json:37` — «"PreToolUse": [» (the AskUserQuestion matcher arm)
