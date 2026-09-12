---
title: dual-channel-drift-auditor
description: Cold pairwise audit of a declared @dual-pair anchor group — measures verbatim overlap and divergence, and judges each group INTENTIONAL-TWIN / SSOT-POINTER / COPY-RISK / DRIFT; reporting-only, never CI-invoked.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# dual-channel-drift-auditor

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:29` case-skip) · **Fires at:** framework authoring/review sessions — dispatched with one `@dual-pair` anchor name, or with the instruction to sweep every anchor group (`agents/dual-channel-drift-auditor.md:51-52`)

## What it is

Cold, PR-blind pairwise audit of a declared `@dual-pair` anchor group, reporting one INTENTIONAL-TWIN / SSOT-POINTER / COPY-RISK / DRIFT verdict per group — "the intentional-vs-accidental call no clone detector makes" (`agents/dual-channel-drift-auditor.md:3`). Reporting-only; classification operator-only (authoring-only), not shipped to consumers (`agents/dual-channel-drift-auditor.md:23-24`).

## How it works

- **Why no tool replaces it.** `#two-prompts-drift` and `#sync-by-copy-paste` are judgment anti-patterns; surveyed clone detectors (jscpd, PMD CPD, Vendetect) do threshold-based token similarity with no semantic intentional-vs-accidental judgment (`agents/dual-channel-drift-auditor.md:28-31`). Measured on the repo (24 anchor groups, 2026-08-09): the reviewer-time grep sketch scored 38% precision, and a raw «≥5 verbatim lines» threshold fires on byte-identical-by-construction vendor copies — "neither direction is gateable — hence this agent" (`agents/dual-channel-drift-auditor.md:36-41`).
- **Method.** Enumerate the group's members via `git grep` over the anchor and state the member count (a group of 1 is a dangling anchor — note and skip) (`agents/dual-channel-drift-auditor.md:62-71`); measure overlap with `python3 difflib.SequenceMatcher` — GNU `diff --*-group-format` is absent on macOS/BSD and silently voided the first run (`agents/dual-channel-drift-auditor.md:73-77`).
- **Classification.** INTENTIONAL-TWIN (high overlap by construction — evidence required: a regenerating hook, a byte-identity test, or a `vendor/` path) / SSOT-POINTER / COPY-RISK (≥5 verbatim lines, no mechanism, no pointer) / DRIFT (≥3 diverging substantive lines) / INCONCLUSIVE (`agents/dual-channel-drift-auditor.md:79-87`). The intentional call must be justified "with a mechanism, never a vibe" (`agents/dual-channel-drift-auditor.md:89`).
- **Output.** ANCHOR/OVERLAP/DIVERGENCE/MECHANISM/VERDICT/COVERAGE block with OVERALL GO/REVISE/STOP: any COPY-RISK or DRIFT → REVISE; any INCONCLUSIVE or unenumerable population → STOP (`agents/dual-channel-drift-auditor.md:100-101`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** dual-implementation-discipline.md §7-§8 as SSOT (`agents/dual-channel-drift-auditor.md:14-15`); the GO/REVISE/STOP tokens per dispatch-input-checker.md §Output grammar (`agents/dual-channel-drift-auditor.md:100`).
- **PEER:** audits the same `@dual-pair` anchors the skill-context overrides carry — e.g. `@dual-pair: review-sidecar` (census C10) and `@dual-pair: aif-orchestrator-discipline` are exactly the group shapes it judges.
- **ADDS:** the semantic half of the drift check that the channel-coverage probe (dangling anchors) does not do — overlap measurement plus the twin/copy verdict.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/dual-channel-drift-auditor.md:2` — `name: dual-channel-drift-auditor`
- `agents/dual-channel-drift-auditor.md:3` — `description: Cold pairwise audit of a declared @dual-pair anchor group. Given ONLY an anchor (never the PR diff or narrative) …`
- `setup.d/20-agents.sh:29` — ``dual-channel-drift-auditor.md) continue ;;  # authoring-only tool (dual-implementation-discipline §8 semantic half — @dual-pair group drift/copy audit)``
- `agents/dual-channel-drift-auditor.md:11` — ``> **Authoritative for:** the `dual-channel-drift-auditor` sub-agent prompt — the cold,``
- `agents/dual-channel-drift-auditor.md:23` — `You report. You do **not** fix, edit, or commit. **Classification — operator-only`
- `agents/dual-channel-drift-auditor.md:26` — `## Why a COLD agent is the mechanism (and why no tool replaces it)`
- `agents/dual-channel-drift-auditor.md:60` — `## Method (no prose-only findings — per T3)`
- `agents/dual-channel-drift-auditor.md:83` — ``| **INTENTIONAL-TWIN** | High overlap is by construction — a vendored copy, a generated/dogfood twin, an i18n string-table sibling. …``
- `agents/dual-channel-drift-auditor.md:98` — `## Output format`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
