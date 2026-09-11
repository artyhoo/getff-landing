---
title: "ai-laziness-digest — resident hot digest"
description: "The always-on resident digest of the AI-laziness trap catalogue: exact-quote T-number counters, rollback trigger, and the anti-drift principle test that pins it to the catalogue."
---

> **Census id:** F2 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F2: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «any R-phase, audit, sample-based investigation, or open-ended AI task.» (`.claude/rules/ai-laziness-digest.md:4`) — always-on core |

## What it bans

A resident **hot digest** of the T-number trap catalogue (see the full catalogue rule, census F3) that paraphrases instead of quoting, or silently loses T-numbers. `.claude/rules/ai-laziness-digest.md:1` «# AI laziness traps — resident hot digest»; its authority line: `.claude/rules/ai-laziness-digest.md:5` «> **Authoritative for:** the resident hot digest — every §2 T-number + its one-line counter (exact-prefix quotes from the catalogue).» It is deliberately NOT authoritative for the full entries: `.claude/rules/ai-laziness-digest.md:6` «> **NOT authoritative for:** the full T-number entries, examples, anti-patterns, or §3 kickoff-author obligations — see [ai-laziness-traps.md §2](ai-laziness-traps.md).»

## Never (fires)

A digest that drifts from the catalogue — a counter that is a paraphrase, or a catalogue T-number missing from the digest. The anti-drift gate states the failure mode verbatim: `packages/core/principles/35-ai-laziness-digest-anti-drift.test.ts:6` « * catalogue and the resident digest becomes a stage-0 trust source (the exact failure» — in context: `:5` « * carries every §2 T-number from the full catalogue (.claude/rules/ai-laziness-traps.md §2)» / «with a one-line counter. T-SG-B counter: the digest counter must be an EXACT QUOTE of catalogue text, not a paraphrase — otherwise the digest silently drifts from the» `:6-7`. The gate enumerates T-numbers from the catalogue at runtime so a new catalogue entry cannot be missed: `packages/core/principles/35-ai-laziness-digest-anti-drift.test.ts:9` « * Mechanism: enumerate T-numbers from the catalogue at runtime (no hardcoded list —».

A residency rollback also fires on incident: `.claude/rules/ai-laziness-digest.md:8` «**Rollback trigger:** ONE senior-seat incident of a digest-under-carried trap → full residency restored (the full catalogue re-enters the resident set), incident recorded.»

## Always (clean)

A digest whose every §2 entry is an exact-prefix quote of the catalogue's counter line — e.g. the digest's T3 line (`.claude/rules/ai-laziness-digest.md:14`) is prefix-equal to the catalogue's T3 counter (`.claude/rules/ai-laziness-traps.md:60` «Counter: every finding must have ONE of: (a) command + output, (b) file:line citation + the line's actual content, (c) explicit `INCONCLUSIVE-needs-LLM` or `INCONCLUSIVE-needs-human` if you cannot verify mechanically. **No prose-only findings.**»). The digest carries all 21 T-numbers (T1-T21, `.claude/rules/ai-laziness-digest.md:10` «## §2 T-number counters (exact-prefix quotes — anti-drift gate enforces)»).

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:10` «| `ai-laziness-digest.md` | A | any R-phase, audit, sample-based investigation, or open-ended AI task. | always-on core |» — **always-on core**: loaded resident, not path-scoped.
- **Anti-drift principle test (CI):** `packages/core/principles/35-ai-laziness-digest-anti-drift.test.ts` (slot 35, named at `.claude/rules/ai-laziness-digest.md:3`).
- Digest channel of the framework's inject machinery: the digest is the resident half of the trap pair; the path-scoped half is `ai-laziness-traps.md` (census F3, satellite link in census row F2).
- Not backend-rendered — no ESLint/clippy artifact is generated from this rule, so no FF diagnostic (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`) applies; the honest status is: resident context + CI principle test only.
