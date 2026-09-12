---
title: aif-explore
description: AIF-suite thinking-partner skill for exploring ideas and clarifying requirements before or during a change, optionally persisting exploration context to paths.research; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-explore

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-explore/SKILL.md:6`)

## What it is

An exploration-mode skill. Its description: "Enter explore mode - a thinking partner for exploring ideas, investigating problems, and clarifying requirements. Use when the user wants to think through something before or during a change." (`.claude/skills/aif-explore/SKILL.md:3`). It declares a stance rather than a pipeline: "## The Stance" (`.claude/skills/aif-explore/SKILL.md:37`).

## How it works

Config load (`.claude/skills/aif-explore/SKILL.md:15`) and "## Artifact Ownership" (`.claude/skills/aif-explore/SKILL.md:29`) frame a mode that branches on plan state — "### When no plan exists" (`.claude/skills/aif-explore/SKILL.md:146`) vs "### When a plan exists" (`.claude/skills/aif-explore/SKILL.md:153`) — and can persist output: "### Optional: Persist exploration context (`paths.research`)" (`.claude/skills/aif-explore/SKILL.md:186`), producing a Research artifact with an "## Active Summary (input for /aif-plan)" section (`.claude/skills/aif-explore/SKILL.md:213`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the AIF config + plan state on disk.
- **ADAPTS:** —
- **ADDS:** a `paths.research` artifact whose Active Summary is declared input for `/aif-plan` (B32).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-explore/SKILL.md:2` — `name: aif-explore`
- `.claude/skills/aif-explore/SKILL.md:3` — `description: Enter explore mode - a thinking partner for exploring ideas, investigating problems, and clarifying requirements. Use when the user wants to think through something before or during a change.`
- `.claude/skills/aif-explore/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-explore/SKILL.md:37` — `## The Stance`
- `.claude/skills/aif-explore/SKILL.md:186` — `### Optional: Persist exploration context (`paths.research`)`
- `.claude/skills/aif-explore/SKILL.md:213` — `## Active Summary (input for /aif-plan)`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
