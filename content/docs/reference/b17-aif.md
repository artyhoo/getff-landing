---
title: aif
description: The AI Factory installer entry skill — analyzes a project's tech stack, installs relevant skills from skills.sh, generates custom skills, and configures MCP servers; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` name only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation ("set up project", "configure AI", "what skills do I need")

## What it is

The AI Factory project-setup entry skill. Its self-description: "Set up agent context for a project. Analyzes tech stack, installs relevant skills from skills.sh, generates custom skills, and configures MCP servers." (`.claude/skills/aif/SKILL.md:3`). It is the skill whose repeated setup produces the `.claude/skills/aif*` suite the rest of this family documents.

## How it works

The skill's own workflow header is `# AI Factory - Project Setup` (`.claude/skills/aif/SKILL.md:8`), with a mandatory security posture ("## CRITICAL: Security Scanning", `.claude/skills/aif/SKILL.md:16`), a "## Skill Acquisition Strategy" section (`.claude/skills/aif/SKILL.md:85`), and a "## Language Resolution" section (`.claude/skills/aif/SKILL.md:119`) that localizes generated artifacts. It takes a free-form project description as its argument (`argument-hint: "[project description]"`, `.claude/skills/aif/SKILL.md:4`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `skills.sh` as its skill-acquisition channel and MCP configuration (its own description, `.claude/skills/aif/SKILL.md:3`).
- **ADAPTS:** the generic installer-skill pattern to the project's detected stack.
- **ADDS:** the installed `.claude/skills/aif-*` operator suite itself — this page family (B17-B40) is its footprint in the framework clone.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif/SKILL.md:2` — `name: aif`
- `.claude/skills/aif/SKILL.md:3` — `description: Set up agent context for a project. Analyzes tech stack, installs relevant skills from skills.sh, generates custom skills, and configures MCP servers. Use when starting new project, setting up AI context, or asking "set up project", "configure AI", "what skills do I need".`
- `.claude/skills/aif/SKILL.md:4` — `argument-hint: "[project description]"`
- `.claude/skills/aif/SKILL.md:8` — `# AI Factory - Project Setup`
- `.claude/skills/aif/SKILL.md:85` — `## Skill Acquisition Strategy`
- `.gitignore:120` — `/.claude/skills/aif/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
