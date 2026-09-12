---
title: aif-orchestrator-discipline (skill-context override)
description: Worker discipline for aif-dispatched agents — REPORT format, park-vs-proceed contract, stage-gate verification, plus condensed orchestrator-planning (launch-table, Mode A/B) and reviewer-discipline (GO/REVISE/STOP, DECISION-NEEDED) layers.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# aif-orchestrator-discipline (skill-context override)

**Status:** shipped-beta (AIF-native skill-context override) · **Ships to:** npm lane — copied into the consumer's `.ai-factory/skill-context/aif-orchestrator-discipline/SKILL.md` · **Fires at:** mandatory-read by AIF's own background sidecars when dispatched into this project

Covers census rows C21 and E15 — the same file rows in both families.

## What it is

Skill-context override at `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md` (frontmatter `name: aif-orchestrator-discipline`). It is the condensed portable subset of orchestrator-worker discipline for agents dispatched into a project via `runtime-bridge/dispatch.ts`: "the conventions below are required — they are not optional style preferences" (`…/aif-orchestrator-discipline/SKILL.md:13-14`). The FULL operator-side orchestrator workflow does NOT travel into the container — quota zones, queue-mode anti-collusion and the Phase -1 dual-reviewer stay in the `orchestrator` skill, cross-umbrella priority/plan-currency in the `pipeline` skill; only this subset ships (`…/aif-orchestrator-discipline/SKILL.md:8`).

## How it works

- **Delivery mechanism.** setup.d/20-agents.sh §3c: skill-context overrides are the AIF-native "extend a vendored sub-agent" mechanism (C-1, SSOT #50) — "AIF's own background sidecars MANDATORY-read .ai-factory/skill-context/<skill>/SKILL.md", verified live with a background maxTurns:6 sidecar (`setup.d/20-agents.sh:55-57`). The copy is made by the SHIPPED_DOCS-derived loop (`setup.d/20-agents.sh:74`).
- **Factory-profile gate.** aif-orchestrator-discipline pairs with the gated orchestrator-worker-discipline agent (F7 companion split): copied only under `--profile factory` (or the legacy `--with-aif-suite` escape), or when a copy is already present (= prior opt-in) (`setup.d/20-agents.sh:70-72`).
- **Worker layer.** REPORT schema mandatory on task completion — Status DONE|BLOCKED|PARTIAL, Deliverable, Evidence (file:line or gh pr URL), BLOCKER, MINOR; "No REPORT = orchestrator cannot verify your work" (`…/aif-orchestrator-discipline/SKILL.md:27`). Park-vs-proceed: on a genuine fork do not pick — run the park CLI, stop the task, proceed on unambiguous parts only (`…/aif-orchestrator-discipline/SKILL.md:42`). Stage-gate check: verify the prior stage's PR is actually merged before starting Stage N+1 (`…/aif-orchestrator-discipline/SKILL.md:52`).
- **Planner + reviewer layers** (applied when the kickoff asks for planning or review). Orchestrator-planning: launch-table per sub-wave, Mode A inline vs Mode B parallel-worktree, stage-gate before Stage N+1 (`…/aif-orchestrator-discipline/SKILL.md:62`, `:75`). Reviewer-discipline: exactly one of GO / REVISE / STOP, and the DECISION-NEEDED pattern — never pick project strategy (`…/aif-orchestrator-discipline/SKILL.md:92`, `:97`, `:103`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **ADAPTS:** `agents/orchestrator-worker-discipline.md` — this file carries `<!-- spec: agents/orchestrator-worker-discipline.md -->` and `@dual-pair: aif-orchestrator-discipline` (`…/aif-orchestrator-discipline/SKILL.md:10-11`); the full agent stays operator-side/gated, the condensed subset travels.
- **PEER:** the other two skill-context overrides (aif-review C22/E16, aif-rules-check C23/E17) ride the same §3c copy loop and mandatory-read wiring.
- Census satellite: **B7**.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:2` — `name: aif-orchestrator-discipline`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:7` — `> **Authoritative for:** orchestrator-worker discipline for aif-dispatched agents — REPORT format, park-vs-proceed contract, stage-gate verification …`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:10` — `<!-- @dual-pair: aif-orchestrator-discipline -->`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:16` — `## When to read this`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:27` — `## REPORT schema (mandatory on task completion)`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:42` — `## Park-vs-proceed contract`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:52` — `## Stage-gate check`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:62` — `## Orchestrator-planning layer (when your kickoff asks you to plan a multi-stage task)`
- `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:92` — `## Reviewer-discipline layer (when your kickoff asks you to review a result)`
- `setup.d/20-agents.sh:55` — `# skill-context overrides — AIF-native "extend a vendored sub-agent" mechanism (C-1, SSOT #50).`
- `setup.d/20-agents.sh:56` — `# AIF's own background sidecars MANDATORY-read .ai-factory/skill-context/<skill>/SKILL.md`
- `setup.d/20-agents.sh:70` — ``if [ "$_sc" = "aif-orchestrator-discipline" ] && [ "${PROFILE:-core}" != "factory" ] \``

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
