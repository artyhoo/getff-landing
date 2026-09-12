---
title: aif-roadmap
description: Create or update the project roadmap artifact (default .ai-factory/ROADMAP.md) — a strategic checklist of milestones with create, update, and check modes; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-roadmap

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-roadmap/SKILL.md:6`); its description names the ask-triggers ("roadmap", "project plan", "milestones", "what to build next", `.claude/skills/aif-roadmap/SKILL.md:3`)

## What it is

Roadmap skill. Its self-description: "Create or update a project roadmap with major milestones. Generates the configured roadmap artifact (default .ai-factory/ROADMAP.md) — a strategic checklist of high-level goals." (`.claude/skills/aif-roadmap/SKILL.md:3`). The body titles it "Roadmap - Strategic Project Planning" (`.claude/skills/aif-roadmap/SKILL.md:9`): "Create and maintain a high-level project roadmap with major milestones."

## How it works

Three modes under a `## Workflow` header (`.claude/skills/aif-roadmap/SKILL.md:13`): "### Mode 1: Create Roadmap (First Run)" (`.claude/skills/aif-roadmap/SKILL.md:64`), "### Mode 2: Update Roadmap (Subsequent Run)" (`.claude/skills/aif-roadmap/SKILL.md:150`), and "### Mode 3: Check Progress (`/aif-roadmap check`)" (`.claude/skills/aif-roadmap/SKILL.md:225`) — the check mode is an "Automated scan — analyze the codebase and mark completed milestones without interactive questions." (`.claude/skills/aif-roadmap/SKILL.md:227`). The artifact path is resolved, not hardcoded: "Otherwise check if the resolved roadmap path exists (`paths.roadmap`, default: `.ai-factory/ROADMAP.md`):" (`.claude/skills/aif-roadmap/SKILL.md:58`), and a `## ROADMAP.md Format` section (`.claude/skills/aif-roadmap/SKILL.md:277`) fixes the file shape.

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the configured roadmap artifact from the project's config (resolved `paths.roadmap`, default `.ai-factory/ROADMAP.md`, `.claude/skills/aif-roadmap/SKILL.md:58`) — the same artifact `/aif-implement` reads for milestone linkage.
- **ADAPTS:** one roadmap format to three lifecycle moments (create, update, automated progress check).
- **ADDS:** nothing recorded in the census (satellites column «—»); within this stage its companions are the other AIF workflow skills (plan/implement/verify) that consume or feed the artifact.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-roadmap/SKILL.md:2` — `name: aif-roadmap`
- `.claude/skills/aif-roadmap/SKILL.md:3` — `description: Create or update a project roadmap with major milestones. Generates the configured roadmap artifact (default .ai-factory/ROADMAP.md) — a strategic checklist of high-level goals. Use when user says "roadmap", "project plan", "milestones", or "what to build next".`
- `.claude/skills/aif-roadmap/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-roadmap/SKILL.md:9` — `# Roadmap - Strategic Project Planning`
- `.claude/skills/aif-roadmap/SKILL.md:13` — `## Workflow`
- `.claude/skills/aif-roadmap/SKILL.md:58` — `` `Otherwise check if the resolved roadmap path exists (`paths.roadmap`, default: `.ai-factory/ROADMAP.md`):` ``
- `.claude/skills/aif-roadmap/SKILL.md:64` — `### Mode 1: Create Roadmap (First Run)`
- `.claude/skills/aif-roadmap/SKILL.md:150` — `### Mode 2: Update Roadmap (Subsequent Run)`
- `.claude/skills/aif-roadmap/SKILL.md:225` — `` `### Mode 3: Check Progress (`/aif-roadmap check`)` ``
- `.claude/skills/aif-roadmap/SKILL.md:227` — `Automated scan — analyze the codebase and mark completed milestones without interactive questions.`
- `.claude/skills/aif-roadmap/SKILL.md:277` — `## ROADMAP.md Format`
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-12 disk read; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
