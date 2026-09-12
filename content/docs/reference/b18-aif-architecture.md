---
title: aif-architecture
description: AIF-suite skill that generates .ai-factory/ARCHITECTURE.md from DESCRIPTION.md stack analysis, recommending an architecture pattern; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-architecture

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("which architecture", "after /aif setup")

## What it is

An architecture-guideline generator. Its description: "Generate architecture guidelines for the project. Analyzes tech stack from DESCRIPTION.md, recommends an architecture pattern, and creates .ai-factory/ARCHITECTURE.md." (`.claude/skills/aif-architecture/SKILL.md:3`). The pattern is selectable via argument: `argument-hint: "[clean|ddd|microservices|monolith|layers]"` (`.claude/skills/aif-architecture/SKILL.md:4`).

## How it works

A three-step workflow — "### Step 0: Load Config & Project Context" (`.claude/skills/aif-architecture/SKILL.md:15`), "### Step 1: Analyze & Recommend" (`.claude/skills/aif-architecture/SKILL.md:67`), "### Step 2: Generate the Architecture Artifact" (`.claude/skills/aif-architecture/SKILL.md:99`) — emitting an artifact whose section skeleton is Overview / Decision Rationale / Folder Structure / Dependency Rules / Layer-Module Communication / Key Principles (`.claude/skills/aif-architecture/SKILL.md:108,111,116,122,128,133`). Model invocation stays enabled: `disable-model-invocation: false` (`.claude/skills/aif-architecture/SKILL.md:6`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `DESCRIPTION.md` as its stack input and the AIF config loader (Step 0).
- **ADAPTS:** generic architecture-pattern guidance to the detected stack.
- **ADDS:** the `.ai-factory/ARCHITECTURE.md` artifact the other AIF workflow skills read.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-architecture/SKILL.md:2` — `name: aif-architecture`
- `.claude/skills/aif-architecture/SKILL.md:3` — `description: Generate architecture guidelines for the project. Analyzes tech stack from DESCRIPTION.md, recommends an architecture pattern, and creates .ai-factory/ARCHITECTURE.md. Use when setting up project architecture, asking "which architecture", or after /aif setup.`
- `.claude/skills/aif-architecture/SKILL.md:4` — `argument-hint: "[clean|ddd|microservices|monolith|layers]"`
- `.claude/skills/aif-architecture/SKILL.md:6` — `disable-model-invocation: false`
- `.claude/skills/aif-architecture/SKILL.md:122` — `## Dependency Rules`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
