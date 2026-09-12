---
title: docplan-auditor
description: Cold semantic-grouping judgment for a DocPlan. Given ONLY the DocPlan (its sections + excluded[]) and the ConventionNodes it references — NEVER the diff, the PR body, or the rendered AGENTS.md region — judges whether each section's title coheres with its member nodes, flags mis-grouped nodes, checks exclusion reasons are substantive, and assesses section granularity.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# docplan-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** the `docplan-auditor` sub-agent prompt — cold, PR-blind semantic" judgment of a DocPlan's section grouping — title↔member-node coherence, mis-grouping candidates, exclusion-reason substance, section granularity; reporting-only (`agents/docplan-auditor.md:11-13`). It is the semantic complement to the composition gate: the gate mechanizes the structural facts (FF8001–8004) and this agent is "the **semantic** layer those deterministic codes" cannot reach (`agents/docplan-auditor.md:30-32`).

## How it works

- Cold-seat rationale: "## Why a COLD, PR-blind agent is the mechanism" (line 43) — an author deep in a composition PR will "rationalize the grouping they already made" rather than judge it afresh (line 47); handed only plan + nodes, it cannot rubber-stamp.
- "## Input contract" (line 51): "1. **The DocPlan** — its `sections[]` (each `{ sectionId, title, nodeIds[] }`) and its optional" `excluded[]` (line 55), plus the referenced ConventionNodes (lines 57-58).
- "**Hard rule — refuse the PR narrative.** If dispatched with the diff, the PR body, the rendered" region, ignore it (line 60); "plan + nodes. If you find yourself about to write «the author grouped these because…», STOP —" (line 62).
- "## Dimensions (judge every section on all four; no prose-only findings — quote the node claim)" (line 68): "(a) Title ↔ member-node coherence." (line 70), mis-grouping candidates (line 74), "(c) Exclusion-reason substance. For each `excluded[]` entry, is the `reason` a _substantive_" justification beyond what FF8002 rejects structurally (line 79), and "(d) Section granularity." both directions (line 85).
- "## Method" (line 89) — enumerate the population first (line 91: "1. **Enumerate the population first** (per T10): count the sections and the nodes before").
- Output (line 100): "Per-section verdicts: `CLEAN` / `GAP` (GAP = REVISE-class). Overall verdict tokens" GO/REVISE/STOP, "→ STOP; complete population + zero GAP → GO." (line 104); population line at 107: "Population: <N sections>, <M nodes>, <K excluded>.".

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the composition gate + doc-plan schema as the structural layer it complements (lines 15-17); the attention-is-not-a-mechanism principle it instances (line 19).
- **ADAPTS:** reviewer-discipline clauses (line 37 heading) and the dispatch-input-checker verdict grammar — line 24: "> trigger in map §4.2. Overall verdict vocab GO/REVISE/STOP per dispatch-input-checker.md §Output grammar.".
- **ADDS:** the four judgment dimensions a regex cannot run, the PR-narrative refusal, and the fix path — "You report. The author folds `GAP`/`REVISE` findings into the DocPlan data (a reviewable JSON" edit, then re-runs the gate + ratchet (lines 118-120).
- Census family satellites: peer cold auditors **C8** (fidelity-auditor, dialogue-blind) and **C5** (claims-conformance-auditor, narrative-blind) — same Class-B cold-seat pattern.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/docplan-auditor.md:2` — `name: docplan-auditor`
- `agents/docplan-auditor.md:3` — `description: Cold semantic-grouping judgment for a DocPlan. Given ONLY the DocPlan (its sections + excluded[]) and the ConventionNodes it references …`
- `agents/docplan-auditor.md:11` — `> **Authoritative for:** the `docplan-auditor` sub-agent prompt — cold, PR-blind semantic`
- `agents/docplan-auditor.md:24` — `> trigger in map §4.2. Overall verdict vocab GO/REVISE/STOP per dispatch-input-checker.md §Output grammar.`
- `agents/docplan-auditor.md:43` — `## Why a COLD, PR-blind agent is the mechanism`
- `agents/docplan-auditor.md:51` — `## Input contract`
- `agents/docplan-auditor.md:60` — `**Hard rule — refuse the PR narrative.** If dispatched with the diff, the PR body, the rendered`
- `agents/docplan-auditor.md:62` — `plan + nodes. If you find yourself about to write «the author grouped these because…», STOP —`
- `agents/docplan-auditor.md:68` — `## Dimensions (judge every section on all four; no prose-only findings — quote the node claim)`
- `agents/docplan-auditor.md:79` — `**(c) Exclusion-reason substance.** For each `excluded[]` entry, is the `reason` a _substantive_`
- `agents/docplan-auditor.md:89` — `## Method`
- `agents/docplan-auditor.md:107` — `Population: <N sections>, <M nodes>, <K excluded>.`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
