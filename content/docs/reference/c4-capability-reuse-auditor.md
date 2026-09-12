---
title: capability-reuse-auditor
description: Audits a proposed or just-authored new capability (a SKILL.md, an agent, or a packages/core module) for overlap with an existing own-stack or upstream capability, and checks that its Prior-art trailer's verdict matches what the body actually does. Flags reinvention before handoff. Reports; does not fix.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# capability-reuse-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** `capability-reuse-auditor` sub-agent prompt — the semantic overlap" triage of a proposed/just-authored capability plus the trailer↔body verdict-consistency check; reporting-only (`agents/capability-reuse-auditor.md:11-13`). The gap it fills: F1 can confirm a `Prior-art:` trailer exists but "carries a `Prior-art:` trailer, but it **cannot** tell whether the body actually **reuses** the" cited art or merely re-describes it (`agents/capability-reuse-auditor.md:30`). Motivating incident: "Origin: PR #858 shipped `.claude/skills/night-mode/SKILL.md` re-describing the executor + dual-" reviewer loop with a correct-sounding trailer that passed F1 (line 33).

## How it works

- "## Input" (line 43) — either a proposed capability or a just-authored file: "just-authored** capability file (path to a new `SKILL.md`, `agents/*.md`, or" (`agents/capability-reuse-auditor.md:46`).
- "## Method (no prose-only findings — per T3)" (line 50): name the problem-class functionally (step 1), enumerate the overlap set with counts (step 2, line 54: "2. **Enumerate the candidate overlap set** (state counts before judging — T10):") over the SSOT (line 55: "- `Grep`/`Glob` the SSOT ([docs/meta-factory/prior-art-evaluations.md](../docs/meta-factory/prior-art-evaluations.md))") and `.claude/skills/` + `agents/` (line 59), then "3. **For each overlap candidate, apply the problem-class match test** (T16): «Upstream/existing" (line 63).
- Trailer check (step 4, line 66: "4. **Trailer↔body consistency** (if a trailer/verdict is supplied): does the body _do_ what the") — reuse verdicts must "subordinate" to the owner, not claim authority over it (lines 67-70).
- Coverage honesty: "5. **Distinguish «no overlap» from «low coverage»** (T14): partial coverage reported as partial," (line 71).
- "## Verdicts you recommend (with GO/REVISE/STOP overlay per dispatch-input-checker.md §Output grammar)" (line 74) — REUSE-EXISTING / THIN-ADAPT / BUILD-JUSTIFIED / TRAILER-BODY-MISMATCH / INCONCLUSIVE, output grammar at line 93: "VERDICT: <REUSE-EXISTING | THIN-ADAPT | BUILD-JUSTIFIED | TRAILER-BODY-MISMATCH | INCONCLUSIVE>".

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the prior-art SSOT (`docs/meta-factory/prior-art-evaluations.md`, line 55) and the reviewer-discipline clauses it imports (line 37: "## Reviewer-discipline clauses (reviewer-discipline.md §1+§2)").
- **ADAPTS:** the dispatch-input-checker GO/REVISE/STOP verdict overlay (line 74; also line 22: "> overlay on verdicts per dispatch-input-checker.md §Output grammar.").
- **ADDS:** the reuse-vs-reinvent judgment the deterministic F1 gate cannot make (line 30) and the verdict table — e.g. "| **REUSE-EXISTING**        | An own-stack/upstream capability already covers this problem-class; …" (line 79) and the mismatch row (line 82).
- Census family satellites: **C2** (reviewer-discipline — its §1+§2 clauses are imported verbatim at line 37).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/capability-reuse-auditor.md:2` — `name: capability-reuse-auditor`
- `agents/capability-reuse-auditor.md:3` — `description: Audits a proposed or just-authored new capability (a SKILL.md, an agent, or a packages/core module) for overlap …`
- `agents/capability-reuse-auditor.md:11` — `> **Authoritative for:** `capability-reuse-auditor` sub-agent prompt — the semantic overlap`
- `agents/capability-reuse-auditor.md:37` — `## Reviewer-discipline clauses (reviewer-discipline.md §1+§2)`
- `agents/capability-reuse-auditor.md:43` — `## Input`
- `agents/capability-reuse-auditor.md:50` — `## Method (no prose-only findings — per T3)`
- `agents/capability-reuse-auditor.md:63` — `3. **For each overlap candidate, apply the problem-class match test** (T16): «Upstream/existing`
- `agents/capability-reuse-auditor.md:66` — `4. **Trailer↔body consistency** (if a trailer/verdict is supplied): does the body _do_ what the`
- `agents/capability-reuse-auditor.md:74` — `## Verdicts you recommend (with GO/REVISE/STOP overlay per dispatch-input-checker.md §Output grammar)`
- `agents/capability-reuse-auditor.md:93` — `VERDICT: <REUSE-EXISTING | THIN-ADAPT | BUILD-JUSTIFIED | TRAILER-BODY-MISMATCH | INCONCLUSIVE>`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
