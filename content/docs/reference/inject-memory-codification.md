---
title: "inject-memory-codification (hook)"
description: "Plugin hook that nudges codify-into-the-repo discipline at the write moment — fires when a Write targets a user-scope agent-memory file."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-memory-codification (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Write` (only Write — the narrower matcher of the PostToolUse arms). Non-blocking: JSON `additionalContext` injection, exit 0.

## What it is

The write-time half of the codify-then-pointer discipline: when the model Writes to a user-scope agent-memory file, this hook injects the reminder that durable conventions belong codified in the repo (rules, templates), with memory carrying only pointers — not the other way round.

## How it works

Capability-check by PATH, not brand name (dual-implementation-discipline §4): it fires only when the Write's target path contains a `/memory/` segment under a user-scope projects directory — never on a brand string or harness identifier. Output contract: plain stdout is IGNORED for PostToolUse; context must be JSON `additionalContext` (verified 2026-05-22 against the hooks reference). Mirrors inject-matching-rule's structure (session-cache, JSON contract); without jq it is a graceful no-op.

**Fail mode:** none — a nudge, never a gate. The channel is the injected reminder text at the write moment.

## Satellites & companions

Two channels deliver the discipline: this hook (write-time, per-write nudge) and the AI-agnostic `agents/memory-codification-auditor.md` (session-read, semantic sweep of the whole memory store). `@dual-pair: memory-codification-writemoment` records the pairing; spec is the discipline itself plus the auditor.

## Anchors

- `plugin/hooks/inject-memory-codification:1` — «#!/usr/bin/env bash»
- `plugin/hooks/inject-memory-codification:2` — «# PostToolUse memory-codification reminder — path-scoped just-in-time delivery of»
- `plugin/hooks/inject-memory-codification:4` — «# @dual-pair: memory-codification-writemoment»
- `plugin/hooks/inject-memory-codification:23` — «command -v jq >/dev/null 2>&1 || exit 0   # graceful no-op without jq»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the inject-memory-codification arm, matcher `Write`)
