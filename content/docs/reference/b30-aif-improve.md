---
title: aif-improve
description: AIF-suite skill that refines an existing implementation plan in a second iteration — re-analyzes the codebase for gaps, missing tasks and wrong dependencies; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-improve

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("improve plan", "refine plan")

## What it is

A second-iteration plan refiner. Its description: "Refine and enhance an existing implementation plan with a second iteration. Re-analyzes the codebase, checks for gaps, missing tasks, wrong dependencies, and improves the plan quality. Use after /aif-plan to polish the plan before implementation, or to improve an existing /aif-fix plan." (`.claude/skills/aif-improve/SKILL.md:3`).

## How it works

Plan discovery (`.claude/skills/aif-improve/SKILL.md:25`, with its own `--list` at `.claude/skills/aif-improve/SKILL.md:51`) feeds "### Step 2: Deep Codebase Analysis" (`.claude/skills/aif-improve/SKILL.md:172`) and "### Step 3: Identify Improvements" (`.claude/skills/aif-improve/SKILL.md:209`), presented for approval (`.claude/skills/aif-improve/SKILL.md:245`) and reported in a structured "## Plan Refinement Report" with "### Findings" (`.claude/skills/aif-improve/SKILL.md:250,255`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** plans from `/aif-plan` (B32) and `/aif-fix` (B27) as its input artifact.
- **ADAPTS:** the same plans-directory conventions as its sibling skills.
- **ADDS:** the deep-codebase-analysis pass that re-validates plan assumptions before execution.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-improve/SKILL.md:2` — `name: aif-improve`
- `.claude/skills/aif-improve/SKILL.md:3` — `description: Refine and enhance an existing implementation plan with a second iteration. Re-analyzes the codebase, checks for gaps, missing tasks, wrong dependencies, and improves the plan quality. Use after /aif-plan to polish the plan before implementation, or to improve an existing /aif-fix plan.`
- `.claude/skills/aif-improve/SKILL.md:51` — `### Step 0.list: List Available Plans (`--list`)`
- `.claude/skills/aif-improve/SKILL.md:172` — `### Step 2: Deep Codebase Analysis`
- `.claude/skills/aif-improve/SKILL.md:250` — `## Plan Refinement Report`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
