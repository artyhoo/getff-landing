---
title: orchestrator-worker-discipline
description: Discipline for aif-dispatched workers — REPORT schema (incl. advisor-consult sub-form on BLOCKER), park-vs-proceed, stage-gate check. Read when you are a worker dispatched via runtime-bridge/dispatch.ts.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# orchestrator-worker-discipline

**Status:** shipped-beta · **Ships to:** npm lane, `--profile factory` only (or legacy `--with-aif-suite`; an existing copy is refreshed in place) — gated by the agents arm case (`setup.d/20-agents.sh:39`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

The portable worker/orchestrator prompt carried into aif dispatches: "> **Authoritative for:** orchestrator-worker discipline for aif-dispatched agents — REPORT format, park-vs-proceed contract, stage-gate …" (`agents/orchestrator-worker-discipline.md:9`). Scope is deliberately condensed: "> **NOT authoritative for:** project goal — see consumer's README.md. The FULL orchestrator workflow … Only the condensed portable subset travels here." (`agents/orchestrator-worker-discipline.md:10`). Entry assumption: "You are a Claude Code agent dispatched into a project via `runtime-bridge/dispatch.ts`." (`agents/orchestrator-worker-discipline.md:17`).

## How it works

- REPORT on completion: "## REPORT schema (mandatory on task completion)" (`agents/orchestrator-worker-discipline.md:26`), status vocabulary `- Status: DONE | BLOCKED | PARTIAL` (`agents/orchestrator-worker-discipline.md:32`).
- Forks: "## Park-vs-proceed contract" (`agents/orchestrator-worker-discipline.md:41`) — park via `- Run: `npx tsx packages/runtime-bridge/src/cli/park.ts --question "Fork: Option A → X. Option B → Y."`` (`agents/orchestrator-worker-discipline.md:46`).
- Judgment-call blocks use the advisor-consult sub-form inside the existing BLOCKER field (line 57: "### Sub-form — uses the existing `BLOCKER` field, no schema extension"), capped at line 86: "- **Per task:** max **2** advisor-consult cycles. On the 3rd, the task is genuinely under-specified — escalate via regular BLOCKED …".
- Stage gates: "## Stage-gate check" (`agents/orchestrator-worker-discipline.md:97`) — "Before starting Stage N+1 work, verify Stage N PR is merged:" (line 99).
- When the kickoff asks for planning or review, two extra layers attach: "## Orchestrator-planning layer (when your kickoff asks you to plan a multi-stage task)" (line 107) and "## Reviewer-discipline layer (when your kickoff asks you to review a result)" (line 137), where "**DECISION-NEEDED pattern — do NOT pick strategy.**" (line 148) applies.

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the runtime-bridge dispatch surface it is read before (line 17, quoted above) and the reviewer-discipline rule it condenses (line 9: "… and reviewer-discipline (GO/REVISE/STOP, DECISION-NEEDED)").
- **ADAPTS:** night-mode's advisor pattern for non-overnight dispatch — line 91 carries the verbatim segment "This protocol is the **same strategy** generalised to any aif-dispatch" as a `BLOCKER: advisor-consult:` sub-form.
- **ADDS:** the worker-side REPORT/park/stage-gate grammar plus the advisor-consult routing table (lines 76-81) and its own honest-gap marker (line 95: "Whether workers will **reliably emit** the `advisor-consult:` prefix … assumed from the function-calling spec, not tested").
- Census family satellites: **B10** (dispatcher — the operator-side loop whose dispatches this prompt answers).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/orchestrator-worker-discipline.md:2` — `name: orchestrator-worker-discipline`
- `agents/orchestrator-worker-discipline.md:3` — `description: Discipline for aif-dispatched workers — REPORT schema (incl. advisor-consult sub-form on BLOCKER), park-vs-proceed, stage-gate check. …`
- `agents/orchestrator-worker-discipline.md:9` — `> **Authoritative for:** orchestrator-worker discipline for aif-dispatched agents — REPORT format, park-vs-proceed contract, stage-gate …`
- `agents/orchestrator-worker-discipline.md:26` — `## REPORT schema (mandatory on task completion)`
- `agents/orchestrator-worker-discipline.md:32` — `- Status: DONE | BLOCKED | PARTIAL`
- `agents/orchestrator-worker-discipline.md:41` — `## Park-vs-proceed contract`
- `agents/orchestrator-worker-discipline.md:46` — `- Run: `npx tsx packages/runtime-bridge/src/cli/park.ts --question "Fork: Option A → X. Option B → Y."``
- `agents/orchestrator-worker-discipline.md:86` — `- **Per task:** max **2** advisor-consult cycles. On the 3rd, the task is genuinely under-specified — escalate via regular BLOCKED …`
- `agents/orchestrator-worker-discipline.md:97` — `## Stage-gate check`
- `agents/orchestrator-worker-discipline.md:148` — `**DECISION-NEEDED pattern — do NOT pick strategy.**`
- `setup.d/20-agents.sh:33` — `orchestrator-worker-discipline.md|reviewer-discipline.md)`
- `setup.d/20-agents.sh:39` — `if [ "${PROFILE:-core}" != "factory" ] && [ -z "${WITH_AIF_SUITE:-}" ] \`
- `setup.d/20-agents.sh:40` — `&& [ ! -e "$PROJECT_ROOT/.claude/agents/$(basename "$f")" ]; then continue; fi ;;`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
