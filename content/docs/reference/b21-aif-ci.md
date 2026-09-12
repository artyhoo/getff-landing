---
title: aif-ci
description: AIF-suite skill that generates a CI/CD pipeline (GitHub Actions / GitLab CI) with linting, static analysis, tests and security; model-invocation disabled; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-ci

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-ci/SKILL.md:6`)

## What it is

A CI/CD pipeline generator. Its description: "Generate CI/CD pipeline (GitHub Actions / GitLab CI) with linting, static analysis, tests, security." (`.claude/skills/aif-ci/SKILL.md:3`). Target and mode come via argument: `argument-hint: "[github|gitlab] [--enhance]"` (`.claude/skills/aif-ci/SKILL.md:4`).

## How it works

"### 1.1 Scan for Existing CI Configuration" (`.claude/skills/aif-ci/SKILL.md:61`) feeds "### 1.2 Determine Mode" (`.claude/skills/aif-ci/SKILL.md:72`), with an interactive setup path in generate mode ("### 1.3 Interactive Setup (Generate Mode Only)", `.claude/skills/aif-ci/SKILL.md:90`) and a read-existing path for enhance/audit modes ("### 1.4 Read Existing Files (Enhance / Audit Modes)", `.claude/skills/aif-ci/SKILL.md:125`), then deep analysis of language/runtime, language version and package manager (`.claude/skills/aif-ci/SKILL.md:140,152,167`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the existing CI configuration as its audit/enhance baseline (Step 1.4).
- **ADAPTS:** one analysis pass to two CI dialects (GitHub Actions / GitLab CI).
- **ADDS:** security tooling alongside lint/static-analysis/test jobs (its description, line 3).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-ci/SKILL.md:2` — `name: aif-ci`
- `.claude/skills/aif-ci/SKILL.md:3` — `description: Generate CI/CD pipeline (GitHub Actions / GitLab CI) with linting, static analysis, tests, security. Use when user says "ci", "setup ci", "github actions", "gitlab ci", "pipeline".`
- `.claude/skills/aif-ci/SKILL.md:4` — `argument-hint: "[github|gitlab] [--enhance]"`
- `.claude/skills/aif-ci/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-ci/SKILL.md:90` — `### 1.3 Interactive Setup (Generate Mode Only)`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
