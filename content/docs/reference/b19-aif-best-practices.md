---
title: aif-best-practices
description: AIF-suite read-only code-quality reference skill — naming, structure, error handling, testing and review standards; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-best-practices

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** Claude Code skill auto-activation ("how should I name this", "best practice for", "clean code")

## What it is

A code-quality guidelines skill. Its description: "Code quality guidelines and best practices for writing clean, maintainable code. Covers naming, structure, error handling, testing, and code review standards." (`.claude/skills/aif-best-practices/SKILL.md:3`). It is advisory-only by tooling: `allowed-tools: Read Glob Grep` (`.claude/skills/aif-best-practices/SKILL.md:5`) — it cannot write.

## How it works

A reference document more than a procedure: `# Best Practices Guide` (`.claude/skills/aif-best-practices/SKILL.md:9`) with a `## Quick Reference` (`.claude/skills/aif-best-practices/SKILL.md:35`) and named sections for `## Naming Conventions` (`.claude/skills/aif-best-practices/SKILL.md:46`), `## Code Structure` (`.claude/skills/aif-best-practices/SKILL.md:86`), `## Error Handling` (`.claude/skills/aif-best-practices/SKILL.md:146`), and `## Testing Practices` (`.claude/skills/aif-best-practices/SKILL.md:193`). An area can be requested directly: `argument-hint: "[naming|structure|errors|testing|review]"` (`.claude/skills/aif-best-practices/SKILL.md:4`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** nothing upstream — it is a static reference body.
- **ADAPTS:** —
- **ADDS:** the quality vocabulary later AIF review/verify passes lean on.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-best-practices/SKILL.md:2` — `name: aif-best-practices`
- `.claude/skills/aif-best-practices/SKILL.md:3` — `description: Code quality guidelines and best practices for writing clean, maintainable code. Covers naming, structure, error handling, testing, and code review standards. Use when writing code, reviewing, refactoring, or asking "how should I name this", "best practice for", "clean code".`
- `.claude/skills/aif-best-practices/SKILL.md:5` — `allowed-tools: Read Glob Grep`
- `.claude/skills/aif-best-practices/SKILL.md:46` — `## Naming Conventions`
- `.claude/skills/aif-best-practices/SKILL.md:193` — `## Testing Practices`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
