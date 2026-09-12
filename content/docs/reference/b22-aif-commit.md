---
title: aif-commit
description: AIF-suite skill that creates conventional commit messages by analyzing staged changes; git and read-only tools only; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-commit

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("commit", "save changes", "create commit")

## What it is

A conventional-commit message generator. Its description: "Create conventional commit messages by analyzing staged changes. Generates semantic commit messages following the Conventional Commits specification." (`.claude/skills/aif-commit/SKILL.md:3`). Its tooling is deliberately narrow: `allowed-tools: Read Bash(git *) AskUserQuestion Questions` (`.claude/skills/aif-commit/SKILL.md:5`).

## How it works

A linear workflow (`## Workflow`, `.claude/skills/aif-commit/SKILL.md:13`) over the staged diff, followed by format rules (`## Format`, `.claude/skills/aif-commit/SKILL.md:82`), worked `## Examples` (`.claude/skills/aif-commit/SKILL.md:92`), and explicit `## Behavior` (`.claude/skills/aif-commit/SKILL.md:116`) and `## Important` (`.claude/skills/aif-commit/SKILL.md:170`) sections. An optional scope/context can be passed: `argument-hint: "[scope or context]"` (`.claude/skills/aif-commit/SKILL.md:4`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `git diff` over the staged changes (its allowed-tools, line 5).
- **ADAPTS:** the Conventional Commits spec to the project's own history conventions.
- **ADDS:** the ask-before-commit behavior documented in its Behavior section.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-commit/SKILL.md:2` — `name: aif-commit`
- `.claude/skills/aif-commit/SKILL.md:3` — `description: Create conventional commit messages by analyzing staged changes. Generates semantic commit messages following the Conventional Commits specification. Use when user says "commit", "save changes", or "create commit".`
- `.claude/skills/aif-commit/SKILL.md:5` — `allowed-tools: Read Bash(git *) AskUserQuestion Questions`
- `.claude/skills/aif-commit/SKILL.md:82` — `## Format`
- `.claude/skills/aif-commit/SKILL.md:116` — `## Behavior`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
