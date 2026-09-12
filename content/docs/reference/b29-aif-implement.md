---
title: aif-implement
description: AIF-suite skill that executes implementation tasks from the current plan sequentially, tracking completion in plan checkboxes and the task list for cross-session continuation; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-implement

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("implement", "start coding", "execute plan", "continue implementation")

## What it is

The AIF plan-execution loop. Its description: "Execute implementation tasks from the current plan. Works through tasks sequentially, marks completion, and preserves progress for continuation across sessions." (`.claude/skills/aif-implement/SKILL.md:3`). It is the largest skill in the suite — 964 lines total.

## How it works

Argument surface: `argument-hint: '[--list] [--without-plan <description>] [@plan-file] [task-id or "status"]'` (`.claude/skills/aif-implement/SKILL.md:4`). The workflow is plan-file-driven: Handoff-mode detection (`.claude/skills/aif-implement/SKILL.md:15`), current-state check (`.claude/skills/aif-implement/SKILL.md:43`), a `--list` mode (`.claude/skills/aif-implement/SKILL.md:66`), an inline `--without-plan` mode (`.claude/skills/aif-implement/SKILL.md:93`), resume/recovery after a break (`.claude/skills/aif-implement/SKILL.md:238`), and plan-file discovery (`.claude/skills/aif-implement/SKILL.md:398`) before task execution. It syncs with the handoff MCP tools (allowed-tools, `.claude/skills/aif-implement/SKILL.md:5`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** plan files produced by `/aif-plan` (B32) or fix plans from `/aif-fix` (B27).
- **ADAPTS:** the handoff MCP task surface when a Handoff task is linked.
- **ADDS:** the inline `--without-plan` one-shot mode and resume/recovery reconciliation.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-implement/SKILL.md:2` — `name: aif-implement`
- `.claude/skills/aif-implement/SKILL.md:3` — `description: Execute implementation tasks from the current plan. Works through tasks sequentially, marks completion, and preserves progress for continuation across sessions. Use when user says "implement", "start coding", "execute plan", or "continue implementation".`
- `.claude/skills/aif-implement/SKILL.md:4` — `argument-hint: '[--list] [--without-plan <description>] [@plan-file] [task-id or "status"]'`
- `.claude/skills/aif-implement/SKILL.md:93` — `### Step 0.inline: Inline Implementation Mode (`--without-plan`)`
- `.claude/skills/aif-implement/SKILL.md:238` — `### Step 0.0: Resume / Recovery (after a break or after /clear)`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
