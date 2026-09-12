---
title: aif-docs
description: AIF-suite skill that generates and maintains project documentation — a lean README landing page plus topic-split docs pages; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-docs

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("create docs", "write documentation", "update docs", "generate readme", "document project")

## What it is

A documentation generator. Its description: "Generate and maintain project documentation. Creates a lean README as a landing page with detailed docs pages split by topic in the configured docs directory." (`.claude/skills/aif-docs/SKILL.md:3`). Takes a flag argument (`argument-hint: "[--web]"`, `.claude/skills/aif-docs/SKILL.md:4`).

## How it works

State-driven: "### Step 1: Determine Current State" (`.claude/skills/aif-docs/SKILL.md:93`) including a scan for scattered markdown ("### Step 1.1: Check for Scattered Markdown Files", `.claude/skills/aif-docs/SKILL.md:123`), then either "### Step 2 (State A): Generate from Scratch" (`.claude/skills/aif-docs/SKILL.md:185`) with a README skeleton (`.claude/skills/aif-docs/SKILL.md:236,242,248`) — under declared `## Core Principles` (`.claude/skills/aif-docs/SKILL.md:17`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the configured docs directory from the AIF config (Step 0).
- **ADAPTS:** existing scattered markdown as migration input (Step 1.1).
- **ADDS:** the README-as-landing-page + topic-split docs structure.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-docs/SKILL.md:2` — `name: aif-docs`
- `.claude/skills/aif-docs/SKILL.md:3` — `description: Generate and maintain project documentation. Creates a lean README as a landing page with detailed docs pages split by topic in the configured docs directory. Use when user says "create docs", "write documentation", "update docs", "generate readme", or "document project".`
- `.claude/skills/aif-docs/SKILL.md:17` — `## Core Principles`
- `.claude/skills/aif-docs/SKILL.md:123` — `### Step 1.1: Check for Scattered Markdown Files`
- `.claude/skills/aif-docs/SKILL.md:185` — `### Step 2 (State A): Generate from Scratch`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
