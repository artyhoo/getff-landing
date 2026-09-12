---
title: claude-glm-executor-handoff
description: Factory-tier skill defining the input-prompt contract and GLM behavioural deltas for an in-aif Claude coordinator dispatching an executable task to a GLM-5.3 worker — a thin, cc-only adapter.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# claude-glm-executor-handoff

**Status:** shipped-beta · **Ships to:** `factory` tier arm (`GETFF_SKILLS_FACTORY`, `setup.d/lib.sh:63`) · **Fires at:** Claude Code skill auto-activation when an in-aif coordinator is about to dispatch to a GLM worker ("GLM executor", "parsing a GLM worker's REPORT", …)

## What it is

The cross-model dispatch edge: "Use when an in-aif Claude coordinator is about to dispatch an executable task to a GLM-5.3 worker (any agent whose frontmatter carries `model: glm-5.3` or a GLM-family model). … NOT for Claude→Claude worker dispatch (use SDD directly)" (`.claude/skills/claude-glm-executor-handoff/SKILL.md:3`). Note the executor tier moved to **glm-5.3** "since 2026-09-11" per the skill's own header — the census (pin `a1337cb301`) still recorded GLM-5.2; this page documents the re-probed pin (W2 delta row, §1 of the stage report). The skill is "A **thin adapter** for the narrow case where an in-aif Claude coordinator dispatches to a GLM worker (executor tier glm-5.3)" and owns "only the prompt side" — aif's per-agent `model:` frontmatter decides which model spawns (`.claude/skills/claude-glm-executor-handoff/SKILL.md:13`).

## How it works

Sections: §0 when it fires (coordinator on Claude-family AND worker frontmatter `model:` GLM-family; a ZCode delivery constraint names plugin-channel agents as diagnosticOnly there) (`.claude/skills/claude-glm-executor-handoff/SKILL.md:15` heading), §1 verified GLM facts with a refuted-folklore sidebar (line 31), §2 the input contract for the GLM edge (line 51), §3 "Status translation (GLM reply → orchestrator REPORT)" (`.claude/skills/claude-glm-executor-handoff/SKILL.md:76`), §4 recovery protocol (line 89), §5 "Honest gaps — designed-not-proven" (`.claude/skills/claude-glm-executor-handoff/SKILL.md:112`). Harness posture: `cc-only` — "requires an in-aif CC coordinator + aif runtime-bridge + GLM worker; without the bridge/worker it cannot run" (`.claude/skills/claude-glm-executor-handoff/SKILL.md:6`).

## Satellites & companions

- **USES:** `superpowers:subagent-driven-development` (the dispatch loop it adapts); aif's per-agent `model:` frontmatter mechanics.
- **ADAPTS:** the orchestrator REPORT schema (owned by `agents/orchestrator-worker-discipline.md`, census C1) for GLM replies; the relative-tier model posture owned by `night-mode` (census B6).
- **ADDS:** the GLM-specific input-prompt contract, verified behavioural deltas (text-only I/O, `reasoning_effort` value-collapse, Anthropic-compat endpoint mechanics), and the status-translation table.
- Census family satellites: **H** (runtime-bridge).

## Anchors

- `.claude/skills/claude-glm-executor-handoff/SKILL.md:2` — `name: claude-glm-executor-handoff`
- `.claude/skills/claude-glm-executor-handoff/SKILL.md:3` — `description: Use when an in-aif Claude coordinator is about to dispatch an executable task to a GLM-5.3 worker … NOT for Claude→Claude worker dispatch (use SDD directly).`
- `.claude/skills/claude-glm-executor-handoff/SKILL.md:6` — `<!-- @harness-posture: cc-only — factory-depth thin adapter: requires an in-aif CC coordinator + aif runtime-bridge + GLM worker; … -->`
- `.claude/skills/claude-glm-executor-handoff/SKILL.md:13` — `A **thin adapter** for the narrow case where an in-aif Claude coordinator dispatches to a GLM worker (executor tier glm-5.3). … this owns only the prompt side.`
- `.claude/skills/claude-glm-executor-handoff/SKILL.md:76` — `## §3 Status translation (GLM reply → orchestrator REPORT)`
- `.claude/skills/claude-glm-executor-handoff/SKILL.md:112` — `## §5 Honest gaps — designed-not-proven`
- `setup.d/lib.sh:63` — `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
