---
title: "autonomous-loop-continuity — loop continuity discipline"
description: "Class B rule with a real mechanism: under AIF_AUTONOMOUS=1 the Stop hook blocks turn-end while dispatched work is in flight, and every load-bearing wait must emit a terminal verdict — silence is not health."
---

> **Census id:** F5 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F5: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «unattended turn ending with work in flight.» (`.claude/rules/autonomous-loop-continuity.md:11`) — Stop hook + session-bootstrap digest |

## What it bans

Ending an unattended turn at the reportable boundary, and reading monitor silence as health. `.claude/rules/autonomous-loop-continuity.md:5` «# Autonomous-loop continuity — discipline rule»; the stop rule: `:19` «**An unattended turn must not end merely because there is something reportable.** Report *and*» / «continue in the same turn while work remains: a dispatched task in flight, an accepted branch» / «not yet harvested, an open item you own.»; the wait rule: `:49` «**A monitor that has died and a monitor with nothing to report look identical.**» Class header: `:10` «> **Class:** B — the mechanism is the opt-in `AIF_AUTONOMOUS=1` pair: (a) the **Stop-hook arm** … which emits `decision:block` when dispatched work is in flight, so the turn does **not** end — a mechanism, not a reminder; … and (b) the always-on autonomy block … which is honestly **prose delivered reliably**, not a gate.»

## Never (fires)

The named anti-patterns: `.claude/rules/autonomous-loop-continuity.md:71` «- **`#stop-at-the-reportable-boundary`** — ending an unattended turn because a coherent report» / «exists, while dispatched work continues. The report is not the deliverable; the landed work» / «is.»; and `:74` «- **`#silence-read-as-health`** — treating "the monitor said nothing" or "the probe returned» / «nothing" as "nothing is wrong".» Origin (F10 recurrence, twice in one session): `:15` «F10 recurred **twice in one session, in two different forms** — first the loop was switched off, then it was left armed while every turn still ended on a report — and the operator caught both.»

## Always (clean)

The Stop-hook mechanism, quoted: `.claude/rules/autonomous-loop-continuity.md:24` «**Mechanism, not exhortation.** Under `AIF_AUTONOMOUS=1` the Stop hook probes `GET /tasks` and,» / «when any un-paused task has a status that is NOT terminal (`done` / `verified`), returns» / «`decision:block` with the continuation directive as `reason` — the field that reaches» / «the model. The turn does not end.» For waits: `:54` «**Therefore, for any wait the loop depends on:** use a bounded waiter that **always emits a» / «terminal verdict** — the awaited state, a timeout, or a fetch failure — never nothing.» Safety properties: one block per stop chain, fail closed and say so, off by default (`:36-45`).

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:13` «| `autonomous-loop-continuity.md` | B | unattended turn ending with work in flight. | hook, digest |»
- **Hook channel:** `.claude/rules/autonomous-loop-continuity.md:7` «<!-- channel: hook .claude/hooks/end-of-turn-reminder.sh#F10 -->» — the Stop-hook arm; paired self-tests at `packages/core/hooks/end-of-turn-reminder.test.ts` (named at `:10`).
- **Digest channel:** `.claude/rules/autonomous-loop-continuity.md:8` «<!-- channel: digest .claude/hooks/inject-session-bootstrap.sh#F10AUTONOMY -->» — the always-on autonomy block, «prose delivered reliably, not a gate» (`:10`).
- Not backend-rendered — no FF diagnostic applies (`packages/core/diagnostics/registry.ts:321`/`:329` define FF7001/FF7002 as backend render refusals; this rule ships bash hooks + prose, honest status: hook gate for the mechanisable half, labelled prose for the rest).
