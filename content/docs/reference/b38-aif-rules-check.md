---
title: aif-rules-check
description: Standalone read-only rules compliance gate against changed files or a git ref — evaluates rules, never edits them, and suggests /aif-rules for gaps; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-rules-check

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** the use-case its description names — "a dedicated project-rules check without a full review or verify pass" (`.claude/skills/aif-rules-check/SKILL.md:3`) — or explicit `/aif-rules-check [git ref | empty]` (argument-hint, `.claude/skills/aif-rules-check/SKILL.md:4`); auto-activation enabled, `disable-model-invocation: false` (`.claude/skills/aif-rules-check/SKILL.md:6`)

## What it is

Read-only rules-compliance gate. Its self-description: "Run a standalone read-only rules compliance gate against changed files or a git ref. Use when you need a dedicated project-rules check without a full review or verify pass." (`.claude/skills/aif-rules-check/SKILL.md:3`). The body titles it "Rules Compliance Gate" (`.claude/skills/aif-rules-check/SKILL.md:13`); frontmatter metadata tags it `category: quality`, `author: AI Factory` (`.claude/skills/aif-rules-check/SKILL.md:8-10`).

## How it works

Under `## Step 3: Evaluate Rules` (`.claude/skills/aif-rules-check/SKILL.md:138`) it evaluates the loaded rule sources against the resolved changed scope; "### Step 2.2: Resolve Rule Sources" (`.claude/skills/aif-rules-check/SKILL.md:113`) and "### Step 1.1: Load Skill Context" (`.claude/skills/aif-rules-check/SKILL.md:48`) feed that evaluation. The boundary is explicit: "## Step 4: Read-Only Boundary" (`.claude/skills/aif-rules-check/SKILL.md:154`) — "This command is read-only: do not edit `RULES.md`, `rules/base.md`, `rules.<area>`, plan files, or source code." (`.claude/skills/aif-rules-check/SKILL.md:156`) — and gaps route back to the writer skill instead ("Suggest `/aif-rules <rule text>` for axioms", `.claude/skills/aif-rules-check/SKILL.md:159`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's skill-context override — "**Read `.ai-factory/skill-context/aif-rules-check/SKILL.md`** - MANDATORY if the file exists." (`.claude/skills/aif-rules-check/SKILL.md:50`) — which is the npm-lane R10-naming + test-existence override documented as [C23](/docs/reference/c23-skill-context-aif-rules-check) (the census's B38 satellite column labels it "C21 skill-context", but the census's own C-family row for the aif-rules-check override is C23 and cross-references B38; recorded as a census cross-reference finding in E2-REPORT).
- **ADAPTS:** the axioms produced by [B37](/docs/reference/b37-aif-rules) into a per-change evaluation pass without any write path.
- **ADDS:** the read-only gate posture itself — evaluate and suggest, never edit (`.claude/skills/aif-rules-check/SKILL.md:154-156`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-rules-check/SKILL.md:2` — `name: aif-rules-check`
- `.claude/skills/aif-rules-check/SKILL.md:3` — `description: Run a standalone read-only rules compliance gate against changed files or a git ref. Use when you need a dedicated project-rules check without a full review or verify pass.`
- `.claude/skills/aif-rules-check/SKILL.md:6` — `disable-model-invocation: false`
- `.claude/skills/aif-rules-check/SKILL.md:8` — `  author: AI Factory`
- `.claude/skills/aif-rules-check/SKILL.md:10` — `  category: quality`
- `.claude/skills/aif-rules-check/SKILL.md:13` — `# Rules Compliance Gate`
- `.claude/skills/aif-rules-check/SKILL.md:17` — `## Step 0: Load Contract`
- `.claude/skills/aif-rules-check/SKILL.md:48` — `### Step 1.1: Load Skill Context`
- `.claude/skills/aif-rules-check/SKILL.md:50` — `` `**Read `.ai-factory/skill-context/aif-rules-check/SKILL.md`** - MANDATORY if the file exists.` ``
- `.claude/skills/aif-rules-check/SKILL.md:113` — `### Step 2.2: Resolve Rule Sources`
- `.claude/skills/aif-rules-check/SKILL.md:138` — `## Step 3: Evaluate Rules`
- `.claude/skills/aif-rules-check/SKILL.md:154` — `## Step 4: Read-Only Boundary`
- `.claude/skills/aif-rules-check/SKILL.md:156` — `` `This command is read-only: do not edit `RULES.md`, `rules/base.md`, `rules.<area>`, plan files, or source code.` ``
- `.claude/skills/aif-rules-check/SKILL.md:159` — `- Suggest `/aif-rules <rule text>` for axioms`
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-12 disk read; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
