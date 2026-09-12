---
title: "check-kickoff-traps (hook)"
description: "Plugin hook that gates kickoff edits on a minimum enumeration of named AI-laziness traps (≥3 distinct T-numbers when the rule is engaged)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# check-kickoff-traps (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit` on `.claude/orchestrator-prompts/<wave>/kickoff.md`. Gate: exit 2 + stderr on violation.

## What it is

The kickoff T-enumeration floor (ai-laziness-traps §3, obligation #2): when a kickoff ENGAGES the traps rule (mentions `ai-laziness-traps`), the hook asserts the mechanical floor — at least 3 DISTINCT canonical T-numbers enumerated in the kickoff.

## How it works

Fewer than 3 named traps is the `#trap-catalogue-blanket-reference` anti-pattern: citing the rule as decoration while naming no traps. Principle 12 (CI) checks citation PRESENCE only — this hook adds the COUNT floor and reaches edit-time, the earliest (and for kickoffs the only) gate: kickoffs are authored and dispatched before any pre-push/CI channel runs on their content. Whether the named traps are the RIGHT ones stays judgment — review-time, not gated. Exit 2 on violation is the PostToolUse channel the model receives; ZCode gets JSON `additionalContext` (exit 2 swallowed as HookRunFailed). Without jq the skip is graceful-but-LOUD.

**Fail mode:** exit 2 + stderr (CC) / JSON emit (ZCode) when an engaged kickoff names <3 distinct traps; silent exit 0 otherwise (including kickoffs that never engage the rule).

## Satellites & companions

USES `.claude/rules/ai-laziness-traps.md` §3 as the spec; complements principle 12's citation-presence CI test; shares the `plugin/hooks/lib/hook-emit.sh` prelude; twin of `.claude/hooks/check-kickoff-traps.sh` (auto-generated).

## Anchors

- `plugin/hooks/check-kickoff-traps:1` — «#!/usr/bin/env bash»
- `plugin/hooks/check-kickoff-traps:3` — «# PostToolUse gate — kickoff T-enumeration floor (Wave N8 C2, ai-laziness-traps §3).»
- `plugin/hooks/check-kickoff-traps:26` — «# additionalContext (exit 2 swallowed as HookRunFailed); exit 0.»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the check-kickoff-traps arm)
