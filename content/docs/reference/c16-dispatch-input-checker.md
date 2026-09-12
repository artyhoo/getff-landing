---
title: dispatch-input-checker
description: Cold dispatch-input reality-check at the aif-dispatch station boundary — judges whether a dispatch input is fit for an executor to burn tokens on, with a machine-consumed DISPATCH-INPUT verdict recorded as a calibration-ledger row.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# dispatch-input-checker

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:31` case-skip; the skip comment names it an authoring-only "station") · **Fires at:** every aif-dispatch boundary in framework authoring work — the dispatching session invokes it on the dispatch input before the executor consumes it (`agents/dispatch-input-checker.md:16`)

## What it is

Cold dispatch-input reality-check — the bottom seat of the arch-v2-context-pipeline contract v2, class B named cold-agent detection layer (`agents/dispatch-input-checker.md:11`). It answers ONE question: "is this dispatch input fit for an executor to burn tokens on?" — receiving only the input itself and the runtime-state probes it names (`agents/dispatch-input-checker.md:42-43`). Classification: operator-only (authoring-only), not shipped to consumers — "consumers do not author aif-dispatch inputs" (`agents/dispatch-input-checker.md:36`).

## How it works

- **Inputs.** The dispatch input text, the kickoff's permitted-file list (K1 anchor resolution), and the runtime profile list (K5 preconditions) — never the chat, the implementation log, or the executor's session (`agents/dispatch-input-checker.md:54-62`).
- **Five EQUAL classes (ADR-6 — no primary/background split).** K1 anchors exist; K2 quoted outputs reproduce; K3 sibling-pattern consistency; K4 format mechanics incl. silent failure modes; K5 external-state preconditions (`agents/dispatch-input-checker.md:64`, `:72-76`).
- **K6 is a split check.** This agent emits candidates only (framing-bias lexicon hits, allowlist↔obligation closure, contract↔deliverable coverage); the Opus framing-bias look adjudicates — the executor arm is a candidate generator, never the decision layer (`agents/dispatch-input-checker.md:81-88`).
- **Output grammar is machine-consumed.** A paste-ready ledger row whose first line is `DISPATCH-INPUT: GO | REVISE | STOP` (`agents/dispatch-input-checker.md:165-168`); verdict rule — any K1/K2/K5 finding that blocks executor fitness → STOP, any K3/K4 finding → REVISE, only clean or coverage-insufficient → GO (`agents/dispatch-input-checker.md:181`). The dispatching session appends the ledger row, not this agent (`agents/dispatch-input-checker.md:186-188`).
- **Grammar source.** The S-D′ map row records that this agent IS the GO/REVISE/STOP grammar source per kickoff §3 rev-5 — its own grammar is preserved verbatim (`agents/dispatch-input-checker.md:33`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the calibration ledger and the ADR-5 shadow-A/B threshold pre-registered in its header as fail-closed transport (`agents/dispatch-input-checker.md:13-15`).
- **PEER:** the other cold auditors (backward-sweep, dual-channel-drift, adapter-jig) borrow its GO/REVISE/STOP verdict vocabulary.
- **ADDS:** measured candidate-emission economics — e.g. 63 candidates across the 11 contract-bearing kickoffs (5.7/file), a density that disqualifies a gate and is exactly right for a candidate list (`agents/dispatch-input-checker.md:146-148`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/dispatch-input-checker.md:2` — `name: dispatch-input-checker`
- `agents/dispatch-input-checker.md:3` — `description: Cold dispatch-input reality-check at the aif-dispatch station boundary. Given ONLY the dispatch input (kickoff/scoped section) …`
- `setup.d/20-agents.sh:31` — `dispatch-input-checker.md) continue ;;  # authoring-only station (arch-v2 S-B contract v2, dispatch-input reality-check)`
- `agents/dispatch-input-checker.md:16` — `> **Fires:** at every aif-dispatch boundary — the dispatching session invokes this agent on the`
- `agents/dispatch-input-checker.md:18` — `> **Authoritative for:** the dispatch-input-check protocol — inputs, the five equal K-classes, the`
- `agents/dispatch-input-checker.md:36` — `**Classification — operator-only (authoring-only), not shipped to consumers.** Consumers do not`
- `agents/dispatch-input-checker.md:64` — `## The five EQUAL classes (ADR-6 — no primary/background split)`
- `agents/dispatch-input-checker.md:81` — `## K6 — split check: candidate generator (this agent) vs adjudicator (Opus)`
- `agents/dispatch-input-checker.md:165` — `## Output grammar (mandatory, machine-consumed — paste-ready into the ledger row)`
- `agents/dispatch-input-checker.md:168` — `DISPATCH-INPUT: GO | REVISE | STOP`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
