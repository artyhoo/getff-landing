---
title: "effort-worthiness — rigor must buy goal progress"
description: "Class C prose statute: the burden of proof sits on MORE rigor — every probe/extra-round demand states what breaks if skipped; a four-test card and six-layer loop (L0-L5) keep effort proportional to reversibility."
---

> **Census id:** F13 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F13: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «any effort/rigor fork: probe demand, extra round, budget breach.» (`.claude/rules/effort-worthiness.md:9`) — skill-embed(4) |

## What it bans

Effort theatre: rigor spent to prove effort rather than move the goal. `.claude/rules/effort-worthiness.md:1` «# Effort worthiness — rigor must buy goal progress»; the default and burden: `:27` «Default is **practice-first**: build the reversible thing and verify it live. The burden of» / «proof sits on MORE rigor — whoever demands a probe, an experiment, or an extra round must» / «state (a) **what breaks if we skip it** and (b) **what learning-in-practice costs instead**» / «(proportionality rule).» Class header: `:8` «> **Class:** C — prose statute; the mechanical skeleton lands on its own channels (§2 L3).» The KPI line: `:47` «Zero-finding reviews and «not worth it» verdicts are legitimate outcomes — the KPI is» / «goal-shift, never findings-produced or rounds-run.»

## Never (fires)

The named anti-patterns: `.claude/rules/effort-worthiness.md:74` «- `#type1-process-on-type2` — heavy research-grade process on a reversible surface; the named failure mode of the Type-1/Type-2 distinction (§4). Counter: L0 label + L1 test 4.»; `:76` «- `#findings-as-KPI` — a review round or follow-up PR spawned to prove effort, carrying no failure scenario. Counter: severity contract»; `:78` «- `#rigor-by-paraphrase` — re-litigating a recorded verdict without new evidence. Counter: L2 journal + copy-or-pointer transfer.»

## Always (clean)

The four-test card at every effort fork, quoted: `.claude/rules/effort-worthiness.md:34` «Before spending effort, run the card — four tests, judged honestly, trace recorded:» then `:36-39` («1. Does this effort move us toward the goal? 2. Is it theatre (form satisfied, substance absent)? 3. Is it immaterial — changes nothing a consumer or decision would notice? 4. Material but cheaper to **verify in practice after building**?»). Materiality scaling: `:41` «**Materiality scales with the highest layer touched** (idea → design → architecture → plan → implementation; conflicts resolve upward)».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:21` «| `effort-worthiness.md` | C | any effort/rigor fork: probe demand, extra round, budget breach. | skill-embed(4) |»
- **Skill-embed, four hosts:** `.claude/rules/effort-worthiness.md:3` «<!-- channel: skill-embed .claude/skills/dispatcher/SKILL.md#effort-worthiness -->» through `:6` (night-mode, arch, reviewer-discipline).
- **L3 mechanical skeleton, named channels** (`:59-64`): «(a) `Failure-scenario:` required on round-triggering findings — deterministic arm in [pr-body-fidelity.ts] …; (b) ask-file schema validity + (c) answered⇒journal-entry cross-check — pre-push section …; (d) L0 label presence — kickoff principle test (landing item).»
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: four skill-embeds + deterministic pr-body-fidelity arm; promotion criteria per layer at `:106-109`.
