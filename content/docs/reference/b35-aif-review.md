---
title: aif-review
description: Code review on staged changes or a pull request — checks bugs, security, performance, and best practices with read-only context gates; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-review

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation ("review code", "check my code", "review PR", "is this code okay") — `disable-model-invocation: false` (`.claude/skills/aif-review/SKILL.md:6`)

## What it is

Code review skill. Its self-description: "Perform code review on staged changes or a pull request. Checks for bugs, security issues, performance problems, and best practices." (`.claude/skills/aif-review/SKILL.md:3`). The body titles it "Code Review Assistant" (`.claude/skills/aif-review/SKILL.md:9`) and states the focus: "Perform thorough code reviews focusing on correctness, security, performance, and maintainability." It accepts a PR number, a git ref, or nothing (argument-hint: "[PR number | branch/commit/tag | empty]", `.claude/skills/aif-review/SKILL.md:4`).

## How it works

A `## Behavior` section (`.claude/skills/aif-review/SKILL.md:25`) branches three ways: without arguments it reviews staged changes — "1. Run `git diff --cached` to get staged changes", falling back to "2. If nothing staged, run `git diff` for unstaged changes" (`.claude/skills/aif-review/SKILL.md:29-30`); with a PR number/URL it reviews the pull request; with a git ref it runs commits mode. Before finalizing findings it runs "## Context Gates (Read-Only)" (`.claude/skills/aif-review/SKILL.md:106`) — read-only checks against the resolved architecture artifact for boundary/dependency alignment. Findings are then produced through a `## Review Checklist` (`.claude/skills/aif-review/SKILL.md:156`) whose subsections are Correctness, Security, Performance, Best Practices, Testing (`.claude/skills/aif-review/SKILL.md:158-190`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's skill-context override — "**Read `.ai-factory/skill-context/aif-review/SKILL.md`** — MANDATORY if the file exists." (`.claude/skills/aif-review/SKILL.md:136`) — which is the npm-lane anti-tautology override documented as [C22](/docs/reference/c22-skill-context-aif-review) (the census's B35 satellite column labels it "C19 skill-context", but the census's own C-family row for the aif-review override is C22 and cross-references B35; recorded as a census cross-reference finding in E2-REPORT).
- **ADAPTS:** the generic review checklist to repo context via the read-only context gates (architecture artifact, boundary/dependency alignment).
- **ADDS:** the allowed-tools confinement to review verbs only — `allowed-tools: Bash(git *) Bash(gh *) Read Glob Grep AskUserQuestion` (`.claude/skills/aif-review/SKILL.md:5`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-review/SKILL.md:2` — `name: aif-review`
- `.claude/skills/aif-review/SKILL.md:3` — `description: Perform code review on staged changes or a pull request. Checks for bugs, security issues, performance problems, and best practices. Use when user says "review code", "check my code", "review PR", or "is this code okay".`
- `.claude/skills/aif-review/SKILL.md:4` — `argument-hint: "[PR number | branch/commit/tag | empty]"`
- `.claude/skills/aif-review/SKILL.md:5` — `allowed-tools: Bash(git *) Bash(gh *) Read Glob Grep AskUserQuestion`
- `.claude/skills/aif-review/SKILL.md:6` — `disable-model-invocation: false`
- `.claude/skills/aif-review/SKILL.md:9` — `# Code Review Assistant`
- `.claude/skills/aif-review/SKILL.md:13` — `## Step 0: Load Config`
- `.claude/skills/aif-review/SKILL.md:25` — `## Behavior`
- `.claude/skills/aif-review/SKILL.md:29` — `` `1. Run `git diff --cached` to get staged changes` ``
- `.claude/skills/aif-review/SKILL.md:106` — `## Context Gates (Read-Only)`
- `.claude/skills/aif-review/SKILL.md:136` — `` `**Read `.ai-factory/skill-context/aif-review/SKILL.md`** — MANDATORY if the file exists.` ``
- `.claude/skills/aif-review/SKILL.md:156` — `## Review Checklist`
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-12 disk read; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
