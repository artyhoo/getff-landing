---
title: aif-loop
description: AIF-suite reflex-loop skill — PLAN, PRODUCE/PREPARE, EVALUATE, CRITIQUE, REFINE iterations with persistence (current.json, aliases, history) until quality gates pass or limits are reached; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-loop

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-loop/SKILL.md:6`)

## What it is

A multi-iteration reflex loop. Its description: "Run a strict multi-iteration Reflex Loop with phases (PLAN, PRODUCE||PREPARE, EVALUATE, CRITIQUE, REFINE) to improve an artifact until quality gates pass or iteration limits are reached." (`.claude/skills/aif-loop/SKILL.md:3`).

## How it works

A persisted loop, not just a prompt pattern: a "## Persistence Contract" (`.claude/skills/aif-loop/SKILL.md:62`) with "### File Roles" (`.claude/skills/aif-loop/SKILL.md:75`) and an on-disk `current.json` ("### 1.3 Write `current.json`", `.claude/skills/aif-loop/SKILL.md:151`), driven by command modes (`## Command Modes`, `.claude/skills/aif-loop/SKILL.md:82`) — `argument-hint: "[new|resume|status|stop|list|history|clean] [task or alias]"` (`.claude/skills/aif-loop/SKILL.md:4`) — with alias/ID assignment per loop ("### 1.2 Alias and IDs (new loop)", `.claude/skills/aif-loop/SKILL.md:144`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** a loop-state directory on disk (directories ensured at 1.1, `.claude/skills/aif-loop/SKILL.md:138`).
- **ADAPTS:** —
- **ADDS:** resumable, aliased loop state — the persistence contract generic prompt-chaining lacks.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-loop/SKILL.md:2` — `name: aif-loop`
- `.claude/skills/aif-loop/SKILL.md:3` — `description: Run a strict multi-iteration Reflex Loop with phases (PLAN, PRODUCE||PREPARE, EVALUATE, CRITIQUE, REFINE) to improve an artifact until quality gates pass or iteration limits are reached. Use when user asks for iterative refinement, quality-gated generation, or "generate -> critique -> refine" loops.`
- `.claude/skills/aif-loop/SKILL.md:4` — `argument-hint: "[new|resume|status|stop|list|history|clean] [task or alias]"`
- `.claude/skills/aif-loop/SKILL.md:62` — `## Persistence Contract`
- `.claude/skills/aif-loop/SKILL.md:82` — `## Command Modes`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
