---
title: "cold-seat-economy — re-audit on substance"
description: "Class C rule: a cold seat's verdict is re-earned by substance movement, not SHA movement; the expensive audit runs on the final diff; follow-ups are fresh narrow seats with an inlined watch-list."
---

> **Census id:** F8 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F8: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «re-running a cold seat on already-judged work; resume-vs-fresh choice.» (`.claude/rules/cold-seat-economy.md:11`) — skill-embed at the two choreography owners |

## What it bans

Spending full cold re-audits because a SHA moved while the judged substance did not, and burning the expensive seat on a non-final diff. `.claude/rules/cold-seat-economy.md:1` «# Cold-seat economy — re-audit on substance, follow up with a fresh narrow seat»; the core: `.claude/rules/cold-seat-economy.md:25` «A cold seat's verdict is re-earned by a change in **what that seat judges**, never by the head» / «commit moving. A SHA mismatch alone is a bookkeeping problem»; seat ordering: `:53` «## §2 Seat ordering — the expensive WHAT-audit runs on the FINAL diff» with `:55` «Dispatch cold seats **serially, cheapest-consequence first**, and run the expensive» / «WHAT-conformance audit **only once the diff is final**.» Class header: `:6` «> **Class:** C — prose-only. The two calls this rule governs — «did the substance this seat judges change?» and «resume or fresh?» — are judgment, not mechanically detectable, so no gate is reachable».

## Never (fires)

The named anti-patterns: `.claude/rules/cold-seat-economy.md:105` «- **`#reaudit-on-sha-move`** — spending a full cold re-audit because `Audited-SHA` no longer prefixes HEAD, without asking whether the seat's substance moved.»; `:111` «- **`#self-issued-verdict`** — the dispatching session writing the seat's verdict itself to save the re-audit cost. Counter: §1 third bullet — smaller cold check, never no cold check.»; `:113` «- **`#expensive-seat-on-nonfinal-diff`** — dispatching the costliest audit in parallel with a seat whose findings can still change the diff.»; `:115` «- **`#resume-sold-as-savings`** — justifying a resumed seat by token economy. The measurement says ~11%; resuming is the *expensive* continuity vehicle.» The hard floor: `:48` «- **Never self-issue the verdict to dodge the cost.** … The cheap path is a *smaller cold check*, never *no cold check*.»

## Always (clean)

A scope check then a narrow cold delta: `.claude/rules/cold-seat-economy.md:31` «- **Same deliverables, same permitted files, same descopes** → the fidelity verdict stands in substance. Confirm scope mechanically (`git diff --name-only <audited>..HEAD` against the kickoff's permitted-file list), then re-establish the verdict with a **narrow cold delta check**: hand a **fresh** cold agent only the incremental diff, the kickoff's scope sections, and the prior round's watch-list». And the measured default — inlined inputs, zero tool turns: `:79` «| fresh agent (executor tier), inputs inlined, zero tools | 85,855 | 0 | 16 s |» vs `:76` «| fresh agent (top tier), full fidelity audit | 185,239 | 19 | 174 s |».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:16` «| `cold-seat-economy.md` | C | re-running a cold seat on already-judged work; resume-vs-fresh choice. | skill-embed(2) |»
- **Skill-embed, two hosts:** `.claude/rules/cold-seat-economy.md:3` «<!-- channel: skill-embed .claude/skills/harvest/SKILL.md#seat-economy -->» and `:4` «<!-- channel: skill-embed .claude/skills/dispatcher/SKILL.md#seat-economy -->» — «Delivery = skill-embed at the two choreography owners (markers above); this file is the SSOT read on demand.» (`:9-10`)
- No CI mechanism at all (stated at `:137` — «no CI mechanism at all; seats are session-read agents»); not backend-rendered, so no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`). Honest status: two skill-embeds + review-time judgment; promotion path to a `SCOPE-UNCHANGED`/`SCOPE-MOVED` helper is scoped in §5 (`:124-128`) and deliberately not built.
