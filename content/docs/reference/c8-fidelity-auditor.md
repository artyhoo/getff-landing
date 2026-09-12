---
title: fidelity-auditor
description: Cold WHAT-conformance acceptance audit at a stage-PR boundary. Given ONLY the kickoff/spec (or a scoped section of it) and the 3-dot diff — NEVER the chat, the design dialogue, or the implementation log — judges whether the diff is what the kickoff asked for.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# fidelity-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** the fidelity-audit protocol — inputs, question, output grammar." (`agents/fidelity-auditor.md:19`). Class B detection layer of the acceptance contour: "> **Class:** B — the named cold-agent detection layer of the acceptance contour" with "> the fail-closed transport is the `pr-body-fidelity` CI gate" (`agents/fidelity-auditor.md:11-14`). Fires "> **Fires:** at every stage-PR boundary — `/harvest` §4 fidelity step, `/dispatcher` §2.4" pre-egress gate, night-mode PR-gate (`agents/fidelity-auditor.md:17-18`). One question: "is this diff WHAT the" kickoff asked for (`agents/fidelity-auditor.md:35-36`) — design altitude only, never code quality.

## How it works

- "## Role — cold by construction" (line 32): "You are a COLD design-altitude acceptance auditor. You never saw the design dialogue or the" implementation session (`agents/fidelity-auditor.md:34`).
- "## Inputs (paths/text only — never chat context, never implementation logs)" (line 45): "1. The kickoff/spec path (the sole statement of intent — if something was agreed but is not in" that file, it cannot know it (line 47); the full 3-dot diff (line 51); audited SHA + round (line 52).
- "## Protocol" (line 54): read the kickoff fully — "1. Read the kickoff/spec fully. Extract the deliverables list, the declared descopes" (line 56); map every deliverable to diff evidence (line 58); "3. Report three drift lists, each entry with file:line evidence:" (line 59) — missing / "**extra** — present in the diff, not asked (scope creep; check the kickoff's out-of-scope" (line 61) / diverged; ambiguous kickoffs get flagged not graded (line 64).
- "## Output grammar (mandatory, machine-consumed)" (line 73): "FIDELITY: GO | REVISE | STOP" (line 76); "Verdict rule: any BLOCKER → STOP. Any MAJOR missing/diverged → REVISE. Only MINOR or clean →" GO (line 87); single-block invariant — "The PR body carries exactly ONE" `## Fidelity verdict` section, rework replaces, never appends (lines 100-104).
- "**Severity contract ([reviewer-discipline.md §6](../.claude/rules/reviewer-discipline.md)):**" gates which findings may trigger a round (line 91).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the pr-body-fidelity gate as transport (line 13) and reviewer-discipline §6 severity contract + §6.1 triage rubric (lines 91, 98).
- **ADAPTS:** the GO/REVISE/STOP vocabulary — line 30: "> vocabulary** per dispatch-input-checker.md §Output grammar alignment.".
- **ADDS:** the machine-consumed FIDELITY verdict block and the Watch-list: "Every round emits a `### Watch-list` sub-block below the verdict, **including on GO**: on GO" the items are what a later round must not undo (line 113).
- Census family satellites: peer cold auditors **C7** (docplan-auditor — PR-blind vs this agent's dialogue-blind contract) and **C5** (claims-conformance-auditor).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/fidelity-auditor.md:2` — `name: fidelity-auditor`
- `agents/fidelity-auditor.md:3` — `description: Cold WHAT-conformance acceptance audit at a stage-PR boundary. Given ONLY the kickoff/spec (or a scoped section of it) and the 3-dot diff …`
- `agents/fidelity-auditor.md:19` — `> **Authoritative for:** the fidelity-audit protocol — inputs, question, output grammar.`
- `agents/fidelity-auditor.md:32` — `## Role — cold by construction`
- `agents/fidelity-auditor.md:45` — `## Inputs (paths/text only — never chat context, never implementation logs)`
- `agents/fidelity-auditor.md:59` — `3. Report three drift lists, each entry with file:line evidence:`
- `agents/fidelity-auditor.md:76` — `FIDELITY: GO | REVISE | STOP`
- `agents/fidelity-auditor.md:87` — `Verdict rule: any BLOCKER → STOP. Any MAJOR missing/diverged → REVISE. Only MINOR or clean →`
- `agents/fidelity-auditor.md:100` — `**Single-block invariant (enforced by the gate).** The PR body carries exactly ONE`
- `agents/fidelity-auditor.md:113` — `Every round emits a `### Watch-list` sub-block below the verdict, **including on GO**: on GO`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
