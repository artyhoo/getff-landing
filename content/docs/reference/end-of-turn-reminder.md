---
title: "end-of-turn-reminder (hook)"
description: "Plugin Stop hook that gates turn ends on a recap (the largest shipped hook: SDK guard, F10 autonomy arm, handoff-currency gates, marker guards, ZCode thin-recap branch)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# end-of-turn-reminder (hook)

**Status:** shipped-beta · **Ships to:** plugin; also shipped to consumer CC projects (GH #934), companion of the shipped /story skill · **Fires at:** Stop. CAN block: `decision:"block"` JSON on CC (loop-guarded by `stop_hook_active`).

## What it is

The END-OF-TURN recap + goal-drift gate (924 lines at this pin — the largest shipped hook): when the model tries to end its turn, this hook decides whether the turn may end (a recap exists, autonomy conditions hold, handoff currency is intact) or is sent back with a continuation directive.

## How it works

Layered, position-ordered gates over one bounded transcript read: a consumer-skip guard (no jq → exit 0 silently — never error-spam a consumer's every turn), the `stop_hook_active` loop guard (`:72-73` — a re-fired Stop must not re-block), the SDK-entrypoint guard at `:77` (a non-interactive session has no reader for a recap; must not block SDK-driven sessions — the aif review-sidecar contract, window #1693), the F10 autonomy arm at `:94` (opt-in `AIF_AUTONOMOUS=1`: do not end a turn merely because there is something reportable — report AND continue while work remains), the D7 context/handoff trigger at `:253`, and the handoff-currency gates at POSITION 1 (`:418`) and POSITION 2 (`:568`) whose ORDER is load-bearing. At `:596` (hoisted at this pin, fix #1706): marker guards — if the current assistant turn already contains the active-language recap marker (`$AIF_RECAP_MARKER`, sourced from `lang/`), or a story marker was already emitted, the hook suppresses re-injection and exits through `_autonomy_exit` (the 2026-07-24 cold-audit lesson: a bare `exit 0` there made the F10 arm silent in precisely its motivating scenario). Blocking rides `{decision: "block", reason: …}` JSON (`:208`); language packs `lang/en.sh`/`lang/ru.sh` supply the payload prose and recap marker.

**Fail mode:** `decision:"block"` sends the turn back with the recap/continuation directive; WARN-shaped story branches and marker-guard exits never block. Missing jq or transcript → silent exit 0 (consumer-safe).

## Satellites & companions

USES the lang packs (`lang/{en,ru}.sh`, `@dual-pair: hook-lang-i18n`) and the transcript via jq; companion of ask-question-reminder (the PRE-QUESTION half); twin of `.claude/hooks/end-of-turn-reminder.sh` (auto-generated; the guards above were hoisted in both at this pin).

## Anchors

- `plugin/hooks/end-of-turn-reminder:1` — «#!/usr/bin/env bash»
- `plugin/hooks/end-of-turn-reminder:3` — «# @cc-only-rationale: CC-specific Stop hook (session-recap) — a Stop hook only runs INSIDE a»
- `plugin/hooks/end-of-turn-reminder:72` — «stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active // false' 2>/dev/null || echo "false")»
- `plugin/hooks/end-of-turn-reminder:77` — «# ── SDK-entrypoint guard — a non-interactive session has no reader for a recap ────────────»
- `plugin/hooks/end-of-turn-reminder:94` — «# ── F10 autonomy arm (opt-in, AIF_AUTONOMOUS=1) ───────────────────────────────»
- `plugin/hooks/end-of-turn-reminder:208` — «    jq -n --arg msg "$_extra" '{decision: "block", reason: $msg}'»
- `plugin/hooks/end-of-turn-reminder:596` — «# ── Marker guards — hoisted above the B2 Part B ZCode thin-recap branch (#1706) ──»
- `plugin/hooks/hooks.json:151` — «"Stop": [» (the end-of-turn-reminder arm)
