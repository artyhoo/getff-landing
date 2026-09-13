---
title: "check-worker-dispatch-channel (hook)"
description: "Plugin hook that enforces the #worker-dispatch-via-subagent channel declaration on kickoff edits, delegating to the single shared principle-29 matcher."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# check-worker-dispatch-channel (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit` on `.claude/orchestrator-prompts/<umbrella>/kickoff.md`. Gate: exit 2 on a hit.

## What it is

The M6 edit-time channel for the `#worker-dispatch-via-subagent` declaration: when a kickoff is edited, this hook checks the dispatch-channel marker against the SINGLE shared matcher and exits 2 on a violation.

## How it works

It delegates to `29-worker-dispatch-channel.bin.ts → .ts` — the same one matcher the principle-29 CI test calls; never two divergent copies (the `#two-prompts-drift` anti-pattern). Edit-time is the earliest reachable channel for the kickoff author; the harness-agnostic backstop is the paired CI principle test (`packages/core/principles/29-worker-dispatch-channel.test.ts`), which catches kickoffs authored outside CC or pasted in pre-wired — together covering earliest-channel + portability. The maintainer wiring block in the file header documents the settings.json registration (agent-uncommittable — added by hand).

**Fail mode:** exit 2 (the PostToolUse channel the model receives) on a channel-discipline violation in the edited kickoff; silent exit 0 off-path.

## Satellites & companions

USES the shared `29-worker-dispatch-channel` matcher (bin + CI test); spec: the 2026-06-27 meta-orch channel-discipline mechanism research patch; twin of `.claude/hooks/check-worker-dispatch-channel.sh`; sibling gate of check-kickoff-traps (both fire on kickoff edits with different floors).

## Anchors

- `plugin/hooks/check-worker-dispatch-channel:1` — «#!/usr/bin/env bash»
- `plugin/hooks/check-worker-dispatch-channel:3` — «# PostToolUse gate — M6 edit-time channel for `#worker-dispatch-via-subagent`.»
- `plugin/hooks/check-worker-dispatch-channel:4` — «# On Edit|Write|MultiEdit of a `.claude/orchestrator-prompts/<umbrella>/kickoff.md`,»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the check-worker-dispatch-channel arm)
