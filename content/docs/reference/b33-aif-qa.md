---
title: aif-qa
description: QA workflow for testing a feature or task implementation — analyzes changes, produces test plans, and describes concrete test scenarios; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-qa

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation ("test this", "write test plan", "what should I test", "QA this branch")

## What it is

QA workflow skill. Its self-description: "QA workflow for testing a feature or task implementation. Analyzes changes, produces test plans, and describes concrete test scenarios." (`.claude/skills/aif-qa/SKILL.md:3`). The body restates it: "Generates change summaries, produces test plans, and describes test scenarios for a feature or task implementation." (`.claude/skills/aif-qa/SKILL.md:11`).

## How it works

"The skill operates in three sequential modes." (`.claude/skills/aif-qa/SKILL.md:15`) — a "## Modes" table maps `change-summary`, `test-plan`, `test-cases`, plus `--all` ("Full pipeline | Run all three modes in sequence without prompting between stages", `.claude/skills/aif-qa/SKILL.md:22`). Artifacts are saved per branch under a collision-resistant `branch-slug` (`.claude/skills/aif-qa/SKILL.md:84`), and the "## Critical Rules" section locks the stage order: "1. MUST NOT create a `test-plan` without a `change-summary` artifact" (`.claude/skills/aif-qa/SKILL.md:186`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's skill-context override — "**Read `.ai-factory/skill-context/aif-qa/SKILL.md`** — MANDATORY if the file exists." (`.claude/skills/aif-qa/SKILL.md:56`).
- **ADAPTS:** per-mode reference playbooks — `references/CHANGE-SUMMARY.md`, `references/TEST-PLAN.md`, `references/TEST-CASES.md` (`.claude/skills/aif-qa/SKILL.md:121`).
- **ADDS:** the strict sequential stage chain (`change-summary → test-plan → test-cases`, `.claude/skills/aif-qa/SKILL.md:114`) that the critical rules enforce.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-qa/SKILL.md:2` — `name: aif-qa`
- `.claude/skills/aif-qa/SKILL.md:3` — `description: QA workflow for testing a feature or task implementation. Analyzes changes, produces test plans, and describes concrete test scenarios. Use when user says "test this", "write test plan", "what should I test", or "QA this branch".`
- `.claude/skills/aif-qa/SKILL.md:11` — `Generates change summaries, produces test plans, and describes test scenarios for a feature or task implementation.`
- `.claude/skills/aif-qa/SKILL.md:15` — `The skill operates in three sequential modes.`
- `.claude/skills/aif-qa/SKILL.md:22` — `` `| `--all`          | Full pipeline  | Run all three modes in sequence without prompting between stages |` ``
- `.claude/skills/aif-qa/SKILL.md:56` — `` `**Read `.ai-factory/skill-context/aif-qa/SKILL.md`** — MANDATORY if the file exists.` ``
- `.claude/skills/aif-qa/SKILL.md:121` — `Read `references/CHANGE-SUMMARY.md``
- `.claude/skills/aif-qa/SKILL.md:186` — `` `1. MUST NOT create a `test-plan` without a `change-summary` artifact` ``
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
