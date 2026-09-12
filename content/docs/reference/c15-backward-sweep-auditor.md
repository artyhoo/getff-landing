---
title: backward-sweep-auditor
description: Cold backward-sweep for a §1.7 Backward-check — given only a change's class/logic, enumerates every parallel surface where that class applies and reports GAP/CLEAN per surface; PR-blind, reporting-only.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# backward-sweep-auditor

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:28` case-skip) · **Fires at:** framework authoring sessions — dispatched by an author about to write a `### §1.7 Backward-check applied` section (`agents/backward-sweep-auditor.md:27`)

## What it is

Sub-agent prompt for the cold, PR-blind enumeration of every codebase surface where a given change-class applies, reporting GAP/CLEAN per surface for a §1.7 Backward-check (`agents/backward-sweep-auditor.md:11-13`). Reporting-only — no fix, edit, or commit; classification is operator-only (authoring-only), not shipped to consumers (`agents/backward-sweep-auditor.md:29`).

## How it works

- **Cold mechanism.** The §1.7 Backward-check fails as restatement (T21) when the author's context is saturated with the PR's own narrative; the syntactic CI gate cannot tell restatement from sweep. This agent defeats it structurally — "you never saw the PR, so you _cannot_ restate it" (`agents/backward-sweep-auditor.md:42-43`).
- **Input contract.** Only the change's class/logic — a content predicate abstracted from where it was applied. If dispatched with a diff and no explicit class, derive the class first, then sweep — never sweep the diff's file list (`agents/backward-sweep-auditor.md:64-66`).
- **Method.** State the class as a one-sentence predicate → enumerate the complete surface set with real Grep/Glob/Bash evidence (population count stated before verdicting, per T10) → per-surface verdict `SWEPT-CLEAN` (quoted guard `file:line`) or `GAP-FOUND` (quoted site + reachability proof) → list the surfaces NOT touched by the originating change — "the deliverable's whole point" (`agents/backward-sweep-auditor.md:68`, `:79-81`).
- **Output.** Per-surface rows plus overall token GO/REVISE/STOP: any `GAP-FOUND` → REVISE; incomplete population or too-vague class → STOP; complete population + zero GAP-FOUND → GO (`agents/backward-sweep-auditor.md:88-90`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the §1.7 backward-check discipline (SSOT: phase-research-coverage.md §1.7) and the T21 trap definition — pointed at, never re-described (`agents/backward-sweep-auditor.md:7`).
- **PEER:** shares the reviewer-discipline clauses and the GO/REVISE/STOP verdict vocab sourced from dispatch-input-checker.md §Output grammar (`agents/backward-sweep-auditor.md:21`); same authoring-only skip-loop family as the other cold auditors.
- **ADDS:** the incident-grounded cold-seat construction — PR #857 shipped a restatement backward-check; the real parallel gap was caught only by operator challenge (`agents/backward-sweep-auditor.md:38-40`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/backward-sweep-auditor.md:2` — `name: backward-sweep-auditor`
- `agents/backward-sweep-auditor.md:3` — `description: Cold backward-sweep for a §1.7 Backward-check. Given ONLY a change's class/logic (never the PR diff or narrative) …`
- `setup.d/20-agents.sh:28` — `backward-sweep-auditor.md) continue ;;  # authoring-only tool (§1.7 backward-check cold-sweep, T21)`
- `agents/backward-sweep-auditor.md:11` — ``> **Authoritative for:** the `backward-sweep-auditor` sub-agent prompt — the cold, PR-blind``
- `agents/backward-sweep-auditor.md:29` — `commit. **Classification — operator-only (authoring-only), not shipped to consumers.**`
- `agents/backward-sweep-auditor.md:43` — `load-bearing property — **you never saw the PR**, so you _cannot_ restate it.`
- `agents/backward-sweep-auditor.md:68` — `## Method (no prose-only findings — per T3)`
- `agents/backward-sweep-auditor.md:86` — `## Output format`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
