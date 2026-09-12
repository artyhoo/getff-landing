---
title: aif-fix
description: AIF-suite bug-fix skill with immediate and plan-first modes, FIX_PLAN.md execution without arguments, and suggested test coverage + logging; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-fix

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("fix bug", "debug this", "something is broken", pasted error message)

## What it is

The AIF bug-fix workflow. Its description: "Fix a specific bug or problem in the codebase. Supports two modes - immediate fix or plan-first. Without arguments executes existing FIX_PLAN.md. Always suggests test coverage and adds logging." (`.claude/skills/aif-fix/SKILL.md:3`). Its allowed-tools include the handoff MCP tools (`mcp__handoff__handoff_sync_status`, …, `.claude/skills/aif-fix/SKILL.md:5`), so it operates in Handoff-linked sessions too.

## How it works

A Handoff-mode detection prelude ("### Step 0 (pre): Detect Handoff Mode", `.claude/skills/aif-fix/SKILL.md:15`) precedes config load and an existing-fix-plan check ("### Step 0.1: Check for Existing Fix Plan", `.claude/skills/aif-fix/SKILL.md:64`), then "### Step 1: Understand the Problem & Choose Mode" (`.claude/skills/aif-fix/SKILL.md:135`) and "### Step 1.1: Create Fix Plan" (`.claude/skills/aif-fix/SKILL.md:168`) with a Fix Plan skeleton (`.claude/skills/aif-fix/SKILL.md:189,194,202,210`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** an existing `FIX_PLAN.md` when invoked without arguments (description, line 3).
- **ADAPTS:** the Handoff MCP sync surface used by the AIF implement/plan skills.
- **ADDS:** the plan-first/immediate mode split with mandatory test-coverage and logging suggestions.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-fix/SKILL.md:2` — `name: aif-fix`
- `.claude/skills/aif-fix/SKILL.md:3` — `description: Fix a specific bug or problem in the codebase. Supports two modes - immediate fix or plan-first. Without arguments executes existing FIX_PLAN.md. Always suggests test coverage and adds logging. Use when user says "fix bug", "debug this", "something is broken", or pastes an error message.`
- `.claude/skills/aif-fix/SKILL.md:15` — `### Step 0 (pre): Detect Handoff Mode`
- `.claude/skills/aif-fix/SKILL.md:64` — `### Step 0.1: Check for Existing Fix Plan`
- `.claude/skills/aif-fix/SKILL.md:168` — `### Step 1.1: Create Fix Plan`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
