---
title: "ai-laziness-traps — T1-T21 trap catalogue"
description: "The canonical AI-laziness trap catalogue rule: 21 named traps with trigger/tempted-output/counter, kickoff-author citation obligations, and the anti-patterns that review rejects."
---

> **Census id:** F3 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F3: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «any R-phase, audit, sample-based investigation, or open-ended AI task.» (`.claude/rules/ai-laziness-traps.md:16`) — path-scoped inject (5 globs) |

## What it bans

The producing of «the shape of the expected output without performing the underlying work» — AI-laziness failure modes, formalised as a project invariant: `.claude/rules/ai-laziness-traps.md:34` «AI agents under time pressure (their own session quota, perceived user impatience, or absence of an external done-check) reliably converge to **path of least resistance**: producing the shape of the expected output without performing the underlying work.» The general law it states: `.claude/rules/ai-laziness-traps.md:36` «**any AI task whose stopping criterion is «when I'm done» rather than «when an external check passes» will under-shoot the actual stopping point.»** The fix: `.claude/rules/ai-laziness-traps.md:38` «The fix is **operationalising the laziness traps and forcing kickoff authors to instantiate them**, not just reference them generically.»

Scope: `.claude/rules/ai-laziness-traps.md:28` «The rule applies to **any AI session running an R-phase, audit, sample-based investigation, decision-register exercise, doc-creation / doc-revision of a discipline-bearing artefact … or other open-ended task whose output is bounded only by «when do I stop».** It does NOT apply to mechanical edits with explicit done-criteria». Header: `.claude/rules/ai-laziness-traps.md:10` «# AI laziness traps — discipline rule»; §2 is the catalogue: `.claude/rules/ai-laziness-traps.md:40` «## §2 Canonical trap catalogue» — T1-T21, each with trigger / tempted output / counter (T1 at `:44`-`:48`, T21 at `:167`-`:181`).

## Never (fires)

A kickoff that cites the catalogue without instantiating it. The §3 obligations require citation + enumeration + a domain trap: `.claude/rules/ai-laziness-traps.md:188` «2. **Enumerate which T-numbers apply** to its specific R-phase by listing them: `Active traps for this R-phase: T1, T3, T4, T7, T11, T13, T15, T20`.» — and the firing shape is named as anti-pattern: `.claude/rules/ai-laziness-traps.md:195` «- **`#trap-catalogue-blanket-reference`** — kickoff cites this rule but does not enumerate T-numbers or add domain-specific traps. Treats the catalogue as decoration, not discipline. Counter: review-phase rejection.» The rule closes the escape hatch itself: `.claude/rules/ai-laziness-traps.md:191` «Blanket reference («see ai-laziness-traps.md» without enumeration or domain extension) is **insufficient and itself a form of T7 (pattern-matching the prompt instead of reasoning against it)**.»

## Always (clean)

A kickoff that enumerates its active T-numbers and extends the catalogue with ≥1 domain trap (`.claude/rules/ai-laziness-traps.md:189` «3. **Add ≥1 domain-specific trap** that is NOT in the canonical catalogue but is structurally possible in this R-phase's context.»), and findings that carry verification — the T3 counter as the canonical clean shape: `.claude/rules/ai-laziness-traps.md:60` «Counter: every finding must have ONE of: (a) command + output, (b) file:line citation + the line's actual content, (c) explicit `INCONCLUSIVE-needs-LLM` or `INCONCLUSIVE-needs-human` if you cannot verify mechanically. **No prose-only findings.**»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:11` «| `ai-laziness-traps.md` | A | any R-phase, audit, sample-based investigation, or open-ended AI task. | paths:(5), edit-time inject |»
- **Edit-time inject**, 5 path globs: `.claude/rules/ai-laziness-traps.md:12` «<!-- globs: .claude/rules/**, .claude/skills/**, agents/**, .claude/orchestrator-prompts/**, docs/meta-factory/research-patches/** -->» with the inject text at `:13` «<!-- inject: AI-laziness traps (T1-T21) apply when running R-phases, audits, … consult the full catalogue (.claude/rules/ai-laziness-traps.md §2) and the resident hot digest (.claude/rules/ai-laziness-digest.md). Self-apply T15. -->»
- **Companion principle test (CI, shipped):** `.claude/rules/ai-laziness-traps.md:15` «> **Class:** A — companion principle test shipped at [packages/core/principles/12-ai-laziness-traps.test.ts](../../packages/core/principles/12-ai-laziness-traps.test.ts) (#74, 2026-05-17).» — a mechanical check on kickoff files for the §3 citation + T-enumeration syntax (`.claude/rules/ai-laziness-traps.md:207`).
- Not backend-rendered — no FF diagnostic (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`) applies; the honest status is: edit-time inject + CI principle test + review-time rejection.
