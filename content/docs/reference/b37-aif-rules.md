---
title: aif-rules
description: Appends project-specific rules and conventions to the configured RULES.md artifact, which /aif-implement auto-loads before execution; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-rules

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-rules/SKILL.md:6`); its description names the ask-triggers ("add rule", "remember this", "convention", "always do X", `.claude/skills/aif-rules/SKILL.md:3`)

## What it is

Rules-capture skill. Its self-description: "Add project-specific rules and conventions to the configured RULES.md artifact. Each invocation appends new rules. These rules are automatically loaded by /aif-implement before execution." (`.claude/skills/aif-rules/SKILL.md:3`). The body titles it "AI Factory Rules - Project Conventions" (`.claude/skills/aif-rules/SKILL.md:9`) and restates the contract: "Add short, actionable rules and conventions for the current project. Rules are saved to the configured RULES.md artifact (default: `.ai-factory/RULES.md`) and automatically loaded by `/aif-implement` before task execution."

## How it works

A "## Rules Hierarchy" section (`.claude/skills/aif-rules/SKILL.md:13`) fixes the first tier of a "three-level rules hierarchy" (`.claude/skills/aif-rules/SKILL.md:15`): "1. **RULES.md** - Axioms (universal project rules)" — "Short, flat list of hard requirements" (`.claude/skills/aif-rules/SKILL.md:18`). Under `## Workflow` (`.claude/skills/aif-rules/SKILL.md:34`) three add modes follow: "### Mode A: Direct Add" (`.claude/skills/aif-rules/SKILL.md:78`, "User provided rule text as argument:"), "### Mode B: Interactive" (`.claude/skills/aif-rules/SKILL.md:88`), and "### Mode C: Area Rules" (`.claude/skills/aif-rules/SKILL.md:109`, "User wants to create or update area-specific rules:"), then "### Step 3: Write Rule" (`.claude/skills/aif-rules/SKILL.md:208`) and "### Step 4: Confirm" (`.claude/skills/aif-rules/SKILL.md:219`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the configured rules artifact from the project's config (default `.ai-factory/RULES.md`) — the same axioms tier the rules-check gate ([B38](/docs/reference/b38-aif-rules-check)) evaluates read-only.
- **ADAPTS:** free-form operator instructions into the hierarchy's axiom tier (short, flat, hard-requirement form).
- **ADDS:** nothing recorded in the census (satellites column «—»); within this stage its companions are the skill-context rules loads documented at [C21](/docs/reference/c21-skill-context-aif-orchestrator-discipline)/[C22](/docs/reference/c22-skill-context-aif-review)/[C23](/docs/reference/c23-skill-context-aif-rules-check).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-rules/SKILL.md:2` — `name: aif-rules`
- `.claude/skills/aif-rules/SKILL.md:3` — `description: Add project-specific rules and conventions to the configured RULES.md artifact. Each invocation appends new rules. These rules are automatically loaded by /aif-implement before execution. Use when user says "add rule", "remember this", "convention", or "always do X".`
- `.claude/skills/aif-rules/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-rules/SKILL.md:9` — `# AI Factory Rules - Project Conventions`
- `.claude/skills/aif-rules/SKILL.md:13` — `## Rules Hierarchy`
- `.claude/skills/aif-rules/SKILL.md:15` — `AI Factory supports a three-level rules hierarchy:`
- `.claude/skills/aif-rules/SKILL.md:17` — `1. **RULES.md** - Axioms (universal project rules)`
- `.claude/skills/aif-rules/SKILL.md:19` — `   - Short, flat list of hard requirements`
- `.claude/skills/aif-rules/SKILL.md:34` — `## Workflow`
- `.claude/skills/aif-rules/SKILL.md:78` — `### Mode A: Direct Add`
- `.claude/skills/aif-rules/SKILL.md:88` — `### Mode B: Interactive`
- `.claude/skills/aif-rules/SKILL.md:109` — `### Mode C: Area Rules`
- `.claude/skills/aif-rules/SKILL.md:208` — `### Step 3: Write Rule`
- `.claude/skills/aif-rules/SKILL.md:219` — `### Step 4: Confirm`
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-12 disk read; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
