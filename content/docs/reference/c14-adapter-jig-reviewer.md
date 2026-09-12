---
title: adapter-jig-reviewer
description: Cold adversarial multi-dimension review of an ecosystem-adapter wiring diff against the eight §3 conformance groups, one structured verdict per group; PR-blind, reporting-only, never CI-invoked.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# adapter-jig-reviewer

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:30` case-skip) · **Fires at:** framework authoring/review sessions only

## What it is

Sub-agent prompt for the session-bound review half of the adapter-jig process rig — "the deterministic 22-arm suite is the other half" (`agents/adapter-jig-reviewer.md:30-33`). Dispatched as a fresh sub-agent to review an ecosystem-adapter wiring stage; it reports and does not fix, edit, or commit (`agents/adapter-jig-reviewer.md:35-37`). Not a GitHub Action, makes no LLM API call, bills no tokens beyond the existing session (`agents/adapter-jig-reviewer.md:27-28`).

## How it works

- **Cold input contract.** Only the diff (or a base..head range resolved with `git diff`) plus the eight §3 conformance groups as review dimensions (`agents/adapter-jig-reviewer.md:58-60`). Hard rule — refuse the PR narrative: if dispatched with the PR body or a «here's what I changed» summary, ignore it; every verdict must be an independent interrogation of a dimension against the code (`agents/adapter-jig-reviewer.md:62`).
- **Eight groups, one verdict each** (`GO` / `REVISE` / `INSUFFICIENT`) with per-arm evidence: 1 parsing/resolution (A1-A2), 2 trust (B1-B3), 3 delivery cells (C1-C4), 4 lock integrity (D1-D3), 5 firing (E1-E3), 6 CI pinning (P1), 7 type-shape/atomicity (G1-G3), 8 tripwire lockstep (H1-H3) (`agents/adapter-jig-reviewer.md:74`, `:82-89`).
- **Judge the real lane, not a fixture (T-AJ-A).** A dimension is GO only if the real lane file/output inspected is cited — an arm «wired to the fixture but never exercised against the real lane» is flagged `INSUFFICIENT` (`agents/adapter-jig-reviewer.md:68`).
- **Output grammar.** Structured review block with per-group verdict lines, a roll-up («N GO / N REVISE / N INSUFFICIENT (of 8)»), a frozen-row breach line, and a recommendation (`agents/adapter-jig-reviewer.md:95`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the §3 conformance-group + arm-ID definitions from the adapter-jig design spec (its `spec:` pointer, `agents/adapter-jig-reviewer.md:7`); verdict vocab per dispatch-input-checker.md §Output grammar, with INSUFFICIENT = STOP-class (`agents/adapter-jig-reviewer.md:24-25`).
- **PEER:** same skip-loop classification as backward-sweep-auditor.md (`agents/adapter-jig-reviewer.md:38`).
- **ADDS:** PR-blindness by construction — cold context means "you never saw the PR body, so you **cannot** recap it", defeating trap T21 (`agents/adapter-jig-reviewer.md:47`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/adapter-jig-reviewer.md:2` — `name: adapter-jig-reviewer`
- `agents/adapter-jig-reviewer.md:3` — `description: Cold adversarial multi-dimension review of an ecosystem-adapter wiring diff. Given ONLY the diff + the eight §3 conformance groups …`
- `setup.d/20-agents.sh:30` — `adapter-jig-reviewer.md) continue ;;  # authoring-only tool (framework-side adapter-wiring conformance review, adapter-jig J1)`
- `agents/adapter-jig-reviewer.md:11` — ``> **Authoritative for:** the `adapter-jig-reviewer` sub-agent prompt — cold, PR-blind``
- `agents/adapter-jig-reviewer.md:37` — `You do **not** fix, edit, or commit. **Classification — operator-only (authoring-only), not`
- `agents/adapter-jig-reviewer.md:62` — ``**Hard rule — refuse the PR narrative.** If dispatched with the PR body, a «here's what I changed»``
- `agents/adapter-jig-reviewer.md:74` — `## Method — walk the eight groups (no prose-only findings — per T3)`
- `agents/adapter-jig-reviewer.md:95` — `## Output grammar`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
