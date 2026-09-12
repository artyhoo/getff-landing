---
title: aif-evolve
description: AIF-suite skill that self-improves installed AI Factory skills from accumulated patches, project context and codebase patterns — including a stale-rule sweep over skill-context; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-evolve

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-evolve/SKILL.md:6`)

## What it is

A skill self-improvement pass. Its description: "Self-improve AI Factory skills based on project context, accumulated patches, and codebase patterns. Analyzes what went wrong, what works, and enhances skills to prevent future issues." (`.claude/skills/aif-evolve/SKILL.md:3`). Target selection: `argument-hint: '[skill-name or "all"]'` (`.claude/skills/aif-evolve/SKILL.md:4`).

## How it works

A six-step workflow under `## Workflow` (`.claude/skills/aif-evolve/SKILL.md:47`): resolve target, "### Step 1: Collect Intelligence" (`.claude/skills/aif-evolve/SKILL.md:128`), read targets, then a distinctive "### Step 3: Check for Stale Rules in Skill-Context" (`.claude/skills/aif-evolve/SKILL.md:228`) with "### Step 4: Present & Resolve Stale Rules" (`.claude/skills/aif-evolve/SKILL.md:278`), gap analysis (`.claude/skills/aif-evolve/SKILL.md:329`) and improvement generation (`.claude/skills/aif-evolve/SKILL.md:379`). Two guardrails are first-class: a `## Patch Consumption Policy` (`.claude/skills/aif-evolve/SKILL.md:23`) and "## Critical: Never Edit Built-in Skills Directly" (`.claude/skills/aif-evolve/SKILL.md:35`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the accumulated patches + skill-context corpus as its improvement input.
- **ADAPTS:** AIF's own installed skills (never built-ins — its Critical section).
- **ADDS:** the stale-rule detection sweep over skill-context files.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-evolve/SKILL.md:2` — `name: aif-evolve`
- `.claude/skills/aif-evolve/SKILL.md:3` — `description: Self-improve AI Factory skills based on project context, accumulated patches, and codebase patterns. Analyzes what went wrong, what works, and enhances skills to prevent future issues. Use when you want to make AI smarter for your project.`
- `.claude/skills/aif-evolve/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-evolve/SKILL.md:23` — `## Patch Consumption Policy`
- `.claude/skills/aif-evolve/SKILL.md:35` — `## Critical: Never Edit Built-in Skills Directly`
- `.claude/skills/aif-evolve/SKILL.md:228` — `### Step 3: Check for Stale Rules in Skill-Context`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
