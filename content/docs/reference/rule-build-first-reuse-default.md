---
title: "build-first-reuse-default — operating philosophy"
description: "Class A rule: every capability proposal resolves to one of seven verdicts (ADOPT/ADOPT VOCABULARY/ADAPT/REFERENCE/KEEP NARROW/BUILD/REJECT); default is ADOPT or REFERENCE, BUILD requires the §3 prior-art mechanism."
---

> **Census id:** F6 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F6: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «any capability commit / new-capability proposal.» (`.claude/rules/build-first-reuse-default.md:18`) — paths:(7) + edit-time inject |

## What it bans

Reinventing what upstream already ships, and macro-level parallel evolution. `.claude/rules/build-first-reuse-default.md:15` «# Build-first, reuse-default — operating philosophy»; the core contract: `.claude/rules/build-first-reuse-default.md:32` «**Every capability proposed for this project resolves into ONE of seven verdicts:**» (the verdict table `:34-42`: ADOPT / ADOPT VOCABULARY / ADAPT / REFERENCE / KEEP NARROW / BUILD / REJECT), and `.claude/rules/build-first-reuse-default.md:44` «**Default = ADOPT or REFERENCE.** BUILD only after §3 mechanism confirms a documented problem-class mismatch or load-bearing gap.» Class header: `:17` «> **Class:** A — companion principle test shipped at [packages/core/principles/11-build-first-reuse-default.test.ts](../../packages/core/principles/11-build-first-reuse-default.test.ts) (#75, 2026-05-17).»

## Never (fires)

BUILD chosen without the prior-art mechanism, or adoption refused out of vanity. Named anti-patterns: `.claude/rules/build-first-reuse-default.md:84` «- **`#parallel-evolution-creep`** — building parallel to existing production tool because per-commit decisions never composed at scope level. Counter: this rule (macro check).»; `:85` «- **`#own-stack-blind-spot`** — believing «our problem is unique» because we never surveyed upstream. Counter: §3 mechanism mandatory before BUILD.»; `:86` «- **`#adoption-shame`** — refusing to adopt because «we can do it our way» (vanity ≠ technical reason). Counter: explicit verdict justification, not «we prefer to build».» The BUILD bar in full: `:41` «| **BUILD** | Write ourselves; no upstream / fundamental misfit / load-bearing gap | Confirmed via §3 mechanism that no production-grade upstream candidate exists for our problem-class |»

## Always (clean)

A capability commit carrying one of the seven verdicts with the §3 mechanism behind it — six layers, quoted: `.claude/rules/build-first-reuse-default.md:71` «1. **Prior-art SSOT trailer** required on capability commits (already enforced via `.husky/pre-push`).» … `:75` «3. **DeepWiki `ask_question` MCP tool** for repository-level inquiry … Use ≥3 phrasings.» and `:76` «4. **WebSearch ≥3 phrasings** on problem-domain term — for general state-of-art surveys («what frameworks exist for problem-class Z?»). Counters context7-only training-data bias.» The tooling caveat names what does NOT count: `:80` «> **Tooling caveat:** `context7` MCP is intentionally **excluded** from this list.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:14` «| `build-first-reuse-default.md` | A | any capability commit / new-capability proposal. | paths:(7), edit-time inject |»
- **Edit-time inject**, 7 globs: `.claude/rules/build-first-reuse-default.md:12` «<!-- globs: .claude/skills/**, agents/**, .claude/rules/**, setup.d/**, docs/meta-factory/prior-art-evaluations.md, package.json, packages/core/package.json -->» with inject text at `:13` (7-verdict reminder, «BUILD requires SSOT consult + DeepWiki+WebSearch ≥3 phrasings»).
- **Companion principle test (CI, shipped):** `packages/core/principles/11-build-first-reuse-default.test.ts` (#75; named at `:17` and `:93`).
- **Pointer carriers** (post-2026-08-08 re-scope, `:17`/`:126`): «always-on pointer carriers: session-bootstrap digest invariant (1) + CLAUDE.md per-commit gate.»
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`, are backend render refusals); honest status: path-scoped inject + CI principle test + husky pre-push prior-art trailer.
