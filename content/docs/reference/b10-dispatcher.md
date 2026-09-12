---
title: dispatcher
description: Factory-tier skill that executes a chosen umbrella's stages through the aif-control loop — dispatch, monitor, Q&A parks, harvest, stage-gate advance; explicit /dispatcher invocation only.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# dispatcher

**Status:** shipped-beta · **Ships to:** `factory` tier arm (`GETFF_SKILLS_FACTORY`, `setup.d/lib.sh:63`) · **Fires at:** explicit `/dispatcher <umbrella-name>` only — the frontmatter carries `arguments: [umbrella]` and `disable-model-invocation: true` (`.claude/skills/dispatcher/SKILL.md:4-6`)

## What it is

The aif-control execution loop: "# /dispatcher — aif-control execution loop" (`.claude/skills/dispatcher/SKILL.md:28`). Its description: "Use when you need to EXECUTE a chosen umbrella's stages through the aif-control loop. … Invocation channel: explicit /dispatcher only — disable-model-invocation:true is a channel flag and not a permission (§0). NOT for planning — priority and launch-table are /pipeline" (`.claude/skills/dispatcher/SKILL.md:3`). It complements `/pipeline` (plan) with "the execution half" (`.claude/skills/dispatcher/SKILL.md:31` area), on a substrate of "CC slash-command + 4 existing CLI primitives (zero new npm deps, zero new code)" (`.claude/skills/dispatcher/SKILL.md:33` area).

## How it works

The skill's sections are the loop itself: §0 Invocation, §1 Primitives table, §2 The execution loop (`.claude/skills/dispatcher/SKILL.md:38,49,64`), §3 Q&A with a three-type park taxonomy (technical fork / strategic fork / terminal) and routing seats (`.claude/skills/dispatcher/SKILL.md:374,378,389`), §4 Harvest details and ATTN conditions (line 462), §5 Anti-scope (line 474). Its frontmatter pins the runtime surface: `model: opus` and an `allowed-tools` allowlist (git, gh, tsx, npx, ls, cat, Read, Agent) (`.claude/skills/dispatcher/SKILL.md:7-16`). The aif environment rule binds failures to the doctor: "On ANY aif environment symptom … — **first action = invoke `/aif-doctor`**" (`.claude/skills/dispatcher/SKILL.md:34`). Harness posture: `cc-native-with-fallback` with a documented CC-absent degradation (`.claude/skills/dispatcher/SKILL.md:19`).

## Satellites & companions

- **USES:** the aif runtime-bridge primitives (REST dispatch, status endpoints) and `/pipeline`'s launch table as its input.
- **ADAPTS:** the umbrella kickoffs' stage gates into an executable loop; the park taxonomy into a Q&A contract.
- **ADDS:** the execution loop, harvest procedure, and stage-gate advance — planning/priority stay in `/pipeline`.
- Census family satellites: **H** (runtime-bridge — dispatch + review-state return channel). Companion: `/aif-doctor` (census B11) for environment failures.

## Anchors

- `.claude/skills/dispatcher/SKILL.md:2` — `name: dispatcher`
- `.claude/skills/dispatcher/SKILL.md:3` — `description: Use when you need to EXECUTE a chosen umbrella's stages through the aif-control loop. … NOT for planning — priority and launch-table are /pipeline.`
- `.claude/skills/dispatcher/SKILL.md:4` — `arguments: [umbrella]`
- `.claude/skills/dispatcher/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/dispatcher/SKILL.md:28` — `# /dispatcher — aif-control execution loop`
- `.claude/skills/dispatcher/SKILL.md:34` — `> **⚡ aif environment rule:** `/dispatcher` is the ONLY skill that works with aif. … **first action = invoke `/aif-doctor`** …`
- `.claude/skills/dispatcher/SKILL.md:64` — `## §2 The execution loop`
- `setup.d/lib.sh:63` — `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
