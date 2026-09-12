---
title: aif-dockerize
description: AIF-suite skill that generates Docker configuration — multi-stage Dockerfile, compose files for dev and hardened production, and .dockerignore — with a production security audit; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-dockerize

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("dockerize", "add docker", "docker compose")

## What it is

A Docker configuration generator. Its description (frontmatter block scalar): "Analyze project and generate Docker configuration: Dockerfile (multi-stage dev/prod), compose.yml, compose.override.yml (dev), compose.production.yml (hardened), and .dockerignore. Includes production security audit." (`.claude/skills/aif-dockerize/SKILL.md:3-6`).

## How it works

Same detect-then-generate shape as the other generators: context load (`.claude/skills/aif-dockerize/SKILL.md:31`), "### 1.1 Scan for Existing Files" (`.claude/skills/aif-dockerize/SKILL.md:66`) into "### 1.2 Determine Mode" (`.claude/skills/aif-dockerize/SKILL.md:80`), an interactive generate path ("### 1.3 Interactive Setup (Generate Mode Only)", `.claude/skills/aif-dockerize/SKILL.md:98`), then deep analysis of language/runtime, framework + dev server, package manager and entry point (`.claude/skills/aif-dockerize/SKILL.md:155,167,191,197`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's existing Docker files as its audit/enhance baseline (Step 1).
- **ADAPTS:** one analysis pass to the four-file compose family it emits.
- **ADDS:** a hardened production compose variant + production security audit (description, line 6).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-dockerize/SKILL.md:2` — `name: aif-dockerize`
- `.claude/skills/aif-dockerize/SKILL.md:3` — `description: >-`
- `.claude/skills/aif-dockerize/SKILL.md:4` — `  Analyze project and generate Docker configuration: Dockerfile (multi-stage dev/prod),`
- `.claude/skills/aif-dockerize/SKILL.md:80` — `### 1.2 Determine Mode`
- `.claude/skills/aif-dockerize/SKILL.md:98` — `### 1.3 Interactive Setup (Generate Mode Only)`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
