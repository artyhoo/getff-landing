---
title: getff-cold-run-prober
description: One-beat cold-run acceptance probe for the getff-any-stack-trace umbrella (spec §9.3) — hands a fresh subagent only a consumer project path and verifies the framework's shipped docs suffice to reach a firing stack-specific rule.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# getff-cold-run-prober

**Status:** shipped-beta · **Ships to:** `clone` — framework-only; run BY the framework against a consumer, never shipped (`setup.d/20-agents.sh:32`) · **Fires at:** operator-run in a framework session — header status DORMANT: shipped once at umbrella closure (S4 runs it once), later runs voluntary; never a CI gate, never a required merge step beyond S4's single closure run (`agents/getff-cold-run-prober.md:14`)

## What it is

Session-bound one-beat cold-run acceptance probe for the getff-any-stack-trace umbrella: dispatch a fresh subagent with ONLY a consumer project path and verify the framework's shipped docs suffice to reach a firing stack-specific rule, with no second human prompt and no framework-source reading (`agents/getff-cold-run-prober.md:11`). Single-pass journey-completion, NOT RED→GREEN two-pass — "the rule has not been authored yet, which is the point" (`agents/getff-cold-run-prober.md:11`). It closes the gap the deterministic W6 cell leaves open: that cell proves the chain closes under a scripted fixture, not that a cold agent with no framework knowledge succeeds with what ships (`agents/getff-cold-run-prober.md:18`).

## How it works

- **Cold-start conditions (all verifiable; any failure invalidates the run).** Fresh consumer project (framework installed, no generated rule yet), no kickoff text, no framework-source access (working directory is the consumer root; opening anything under `packages/` or `setup.d/` fails the protocol), no second human prompt (questions are answered with silence — "stalling IS data"), shipped docs only (`.claude/`, `.getff/`, `AGENTS.md`, `INSTALL-FOR-AI.md`, `.ai-factory/`) (`agents/getff-cold-run-prober.md:30-39`).
- **Flow.** Verify the cold-start checks before dispatch (`agents/getff-cold-run-prober.md:61-85`) → compose the smallest realistic consumer ask, with no internal vocabulary and no hint at the answer (`:89-105`) → one cold dispatch with the full transcript captured (`agents/getff-cold-run-prober.md:109`) → audit and emit a binary GREEN or RED verdict, no partial credit.
- **GREEN requires ALL of:** a firing stack-specific rule landed; the rule fires on a planted violation (ast-grep exit 1); the file-open sequence contains only shipped-doc paths (`agents/getff-cold-run-prober.md:137-139`). RED if the agent stalled, opened framework source, or produced a rule that does not fire.
- **Never edit the protocol to force a pass** (spec §9.3 T-S4-C): a RED is the honest result — either «the docs have gap X» or a park; a GREEN achieved by editing the protocol is the domain trap T-AST-B (`agents/getff-cold-run-prober.md:211`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the W6 `python-unfamiliar-stack-cell.sh` fixture as a valid cold-start input, and the delivered agent surface of the python install lane as the system under test (`agents/getff-cold-run-prober.md:34`).
- **ADAPTS:** the operational class of manual-rule-liveness-prober (#115) + shipped-agent-liveness-prober — session-bound, DORMANT, reporting-only, top-level only — but changes the methodology to single-pass journey-completion and the evidence base to the file-open sequence (`agents/getff-cold-run-prober.md:198`).
- **ADDS:** the umbrella's only recursive-self-application artefact — the framework probing whether its own shipped docs suffice for the journey it claims to enable (`agents/getff-cold-run-prober.md:218-220`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/getff-cold-run-prober.md:2` — `name: getff-cold-run-prober`
- `agents/getff-cold-run-prober.md:3` — `description: One-beat cold-run acceptance probe for the getff-any-stack-trace umbrella (spec §9.3). Hands a fresh subagent ONLY a consumer project path …`
- `setup.d/20-agents.sh:32` — `getff-cold-run-prober.md) continue ;;  # framework-only (S4 one-beat cold-run protocol — run BY framework against consumer, not shipped …`
- `agents/getff-cold-run-prober.md:11` — ``> **Authoritative for:** `getff-cold-run-prober` sub-agent prompt — the session-bound one-beat cold-run acceptance probe for the getff-any-stack-trace umbrella (spec §9.3) …``
- `agents/getff-cold-run-prober.md:14` — `> **Status: DORMANT** — not a mandatory step. **Trigger:** spec §9.3 names this protocol the binding acceptance mechanism for the getff-any-stack-trace umbrella …`
- `agents/getff-cold-run-prober.md:34` — ``1. **Fresh consumer project.** The cold agent receives a path to a consumer project that has the framework installed (`install.sh python` already run) BUT has no generated rule yet. …``
- `agents/getff-cold-run-prober.md:109` — `## Step 3 — The cold dispatch (single pass; the run IS the verdict)`
- `agents/getff-cold-run-prober.md:198` — ``> `manual-rule-liveness-prober` (#115) proves a **manifest RULE is LIVE**: without-rule RED → with-rule GREEN, two-pass on the same baseline-prompt. …``

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
