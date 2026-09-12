---
title: aif-plan
description: Plan implementation for a feature or task — two modes, fast (single quick plan) or full (richer plan with optional git branch/worktree flow); clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-plan

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation ("plan", "new feature", "start feature", "create tasks")

## What it is

Implementation planning skill. Its self-description: "Plan implementation for a feature or task. Two modes — fast (single quick plan) or full (richer plan with optional git branch/worktree flow)." (`.claude/skills/aif-plan/SKILL.md:3`). The body defines the split: "**Fast** – quick plan, no git branch, saves to the configured fast plan path (default: `.ai-factory/PLAN.md`)" (`.claude/skills/aif-plan/SKILL.md:14`). It takes a mode plus subcommand flags as its argument (`argument-hint: "[fast | full] [--parallel | --list | --cleanup <branch>] <description>"`, `.claude/skills/aif-plan/SKILL.md:4`).

## How it works

After a pre-step that detects Handoff mode, the workflow reaches "### Step 0: Load Project Context" (`.claude/skills/aif-plan/SKILL.md:85`), which resolves config paths and reads the mandatory project override — "**Read `.ai-factory/skill-context/aif-plan/SKILL.md`** — MANDATORY if the file exists." (`.claude/skills/aif-plan/SKILL.md:120`). It then parses arguments and picks fast vs full at "### Step 0.2: Parse Arguments & Select Mode" (`.claude/skills/aif-plan/SKILL.md:176`), and states its ownership rule: "9. **Ownership boundary** – This command owns plan files only … Use owner commands (`/aif-roadmap`, `/aif-rules`, `/aif-explore`) for their artifacts." (`.claude/skills/aif-plan/SKILL.md:672`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's skill-context override (`.claude/skills/aif-plan/SKILL.md:120`) and the resolved DESCRIPTION/ARCHITECTURE/roadmap artifacts read at Step 0 (`.claude/skills/aif-plan/SKILL.md:85`).
- **ADAPTS:** the canonical plan template — "Use the canonical template in `references/TASK-FORMAT.md` (Plan File Template)." (`.claude/skills/aif-plan/SKILL.md:543`).
- **ADDS:** the fast/full mode split with optional `--parallel` worktree flow and `--list`/`--cleanup` subcommands (`.claude/skills/aif-plan/SKILL.md:4`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-plan/SKILL.md:2` — `name: aif-plan`
- `.claude/skills/aif-plan/SKILL.md:3` — `description: Plan implementation for a feature or task. Two modes — fast (single quick plan) or full (richer plan with optional git branch/worktree flow). Use when user says "plan", "new feature", "start feature", "create tasks".`
- `.claude/skills/aif-plan/SKILL.md:4` — `argument-hint: "[fast | full] [--parallel | --list | --cleanup <branch>] <description>"`
- `.claude/skills/aif-plan/SKILL.md:14` — `` `- **Fast** – quick plan, no git branch, saves to the configured fast plan path (default: `.ai-factory/PLAN.md`)` ``
- `.claude/skills/aif-plan/SKILL.md:85` — `### Step 0: Load Project Context`
- `.claude/skills/aif-plan/SKILL.md:120` — `` `**Read `.ai-factory/skill-context/aif-plan/SKILL.md`** — MANDATORY if the file exists.` ``
- `.claude/skills/aif-plan/SKILL.md:176` — `### Step 0.2: Parse Arguments & Select Mode`
- `.claude/skills/aif-plan/SKILL.md:543` — `` `Use the canonical template in `references/TASK-FORMAT.md` (Plan File Template).` ``
- `.claude/skills/aif-plan/SKILL.md:672` — `` `9. **Ownership boundary** – This command owns plan files only … Use owner commands (`/aif-roadmap`, `/aif-rules`, `/aif-explore`) for their artifacts.` ``
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
