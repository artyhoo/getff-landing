---
title: aif-build-automation
description: AIF-suite skill that generates or enhances a build automation file (Makefile, Taskfile.yml, Justfile, Magefile.go) from project analysis; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-build-automation

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("generate makefile", "create taskfile", "add justfile", "setup mage", "build automation")

## What it is

A build-file generator. Its description (frontmatter block scalar): "Analyze project and generate or enhance build automation file (Makefile, Taskfile.yml, Justfile, Magefile.go). If a build file already exists, improves it by adding missing targets and best practices." (`.claude/skills/aif-build-automation/SKILL.md:3-5`).

## How it works

Detect-then-generate: "## Step 1: Detect Existing Build Files & Determine Mode" (`.claude/skills/aif-build-automation/SKILL.md:58`) with an explicit scan ("### 1.1 Scan for Existing Build Files", `.claude/skills/aif-build-automation/SKILL.md:60`) and mode decision ("### 1.2 Determine Mode", `.claude/skills/aif-build-automation/SKILL.md:70`), preceded by context loading (`.claude/skills/aif-build-automation/SKILL.md:26`) and followed by deep analysis of language, package manager, framework, Docker, CI and database (`.claude/skills/aif-build-automation/SKILL.md:123,138,152,180,208,216`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's own build files as its enhancement baseline (Step 1).
- **ADAPTS:** four build-file dialects (make/task/just/mage) to one analysis pass.
- **ADDS:** missing targets + best practices to an existing build file rather than replacing it.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-build-automation/SKILL.md:2` — `name: aif-build-automation`
- `.claude/skills/aif-build-automation/SKILL.md:3` — `description: >-`
- `.claude/skills/aif-build-automation/SKILL.md:4` — `  Analyze project and generate or enhance build automation file (Makefile, Taskfile.yml, Justfile, Magefile.go).`
- `.claude/skills/aif-build-automation/SKILL.md:58` — `## Step 1: Detect Existing Build Files & Determine Mode`
- `.claude/skills/aif-build-automation/SKILL.md:70` — `### 1.2 Determine Mode`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
