---
title: orchestrator
description: Env+-tier skill for the in-repo orchestration contour — Mode A/B dispatch choice, task-size triage, quota zones, and the Phase -1 to Phase 4.5 sequence for senior-delegates-juniors-execute work.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# orchestrator

**Status:** shipped-beta · **Ships to:** `env+` tier arm (`GETFF_SKILLS_ENV`, `setup.d/lib.sh:62`) · **Fires at:** Claude Code skill auto-activation on orchestration triggers («оркестратор», "delegate", "umbrella", "batch fixes", task decomposing into ≥3 independent subtasks, …)

## What it is

The operator-side orchestration workflow, titled "Orchestrator — the senior coordinates, juniors execute and verify" (`.claude/skills/orchestrator/SKILL.md:15`). Its frontmatter description is a block scalar (`.claude/skills/orchestrator/SKILL.md:3`), with the trigger vocabulary in a `when_to_use:` field (line 10). The skill is authoritative for "the operator-side orchestration workflow — the Mode A/B dispatch choice rule …, the task-size decision matrix, quota zones, the Phase -1 → Phase 4.5 phase sequence, and the Queue-mode entry conditions" (`.claude/skills/orchestrator/SKILL.md:17-19`).

## How it works

The 480-line skill is organized as a phase sequence over a shared vocabulary:

- **Dispatch channels:** Mode A (inline `Agent` on Opus) is the default; "Mode B — an explicit option, not the default" for file-prompt dispatch to a cheaper model, taken only under specific conditions (N-way parallelism, audit-trail need, explicit user ask, or Opus pool under load) (`.claude/skills/orchestrator/SKILL.md:92,101`).
- **Task-size triage:** "Task size picks the mechanism (small → the senior's own `Edit`, bulk → an isolated inline `Agent`, a queue of research kickoffs → Queue mode)" (`.claude/skills/orchestrator/SKILL.md:57`).
- **Cross-session dispatch:** "worktree by default" (`.claude/skills/orchestrator/SKILL.md:139`), with in-session sub-agent isolation via the `Agent` tool's worktree isolation (line 156).
- **Quota monitoring:** a cross-cutting rule "active from Phase 3" with zones, responses, reset windows, and anti-patterns (`.claude/skills/orchestrator/SKILL.md:187`).
- **Phase -1:** cold self-review of a kickoff before dispatch (`.claude/skills/orchestrator/SKILL.md:225` heading).

Harness posture: `cc-native-with-fallback` — Agent-tool subagent dispatch is portable; Skill-tool invocation degrades to direct file reads (`.claude/skills/orchestrator/SKILL.md:6` area).

## Satellites & companions

- **USES:** `superpowers:subagent-driven-development` for the executor loop; `superpowers:using-git-worktrees` for isolation mechanics; channel definitions in its own `references/glossary.md` (SKILL.md:17 area, NOT-authoritative header).
- **ADAPTS:** the portable worker-discipline subset that travels into aif containers — `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md` (named at SKILL.md:17 area; drafted as census C21/E15).
- **ADDS:** the Mode A/B choice rule, quota zones, Phase -1 dual-review, and Queue-mode entry conditions — none of which the wrapped upstream skills own.
- Census family satellites: **A4** (installer tiers/lanes context).

## Anchors

- `.claude/skills/orchestrator/SKILL.md:2` — `name: orchestrator`
- `.claude/skills/orchestrator/SKILL.md:3` — `description: |` (block scalar; body carries the trigger text, lines 4-9)
- `.claude/skills/orchestrator/SKILL.md:15` — `# Orchestrator — the senior coordinates, juniors execute and verify`
- `.claude/skills/orchestrator/SKILL.md:57` — `Task size picks the mechanism (small → the senior's own `Edit`, bulk → an isolated inline `Agent`, a queue of research kickoffs → Queue mode), …`
- `.claude/skills/orchestrator/SKILL.md:139` — `## Cross-session dispatch — worktree by default`
- `.claude/skills/orchestrator/SKILL.md:187` — `## Quota monitoring (cross-cutting rule, active from Phase 3)`
- `setup.d/lib.sh:62` — `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
