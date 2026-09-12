---
title: "skill-description-quality — SKILL.md description quality"
description: "Class C prose rule: a SKILL.md description must distinguish the skill from its peers and when_to_use must name ≥1 concrete trigger — deferred with an explicit promotion criterion (≥3 misrouting incidents / 6 months)."
---

> **Census id:** F28 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F28: MISSING → drafted E4; census satellite B — the skills suite) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «authoring/updating any SKILL.md `description` field.» (`.claude/rules/skill-description-quality.md:13`) — paths:(1) + edit-time inject |

## What it bans

Vague skill descriptions that misroute routing. `.claude/rules/skill-description-quality.md:10` «# SKILL.md description quality — discipline rule»; the problem: `:21` «A vague, empty, or misleading `description` causes the model to skip the skill when it would have been appropriate, or to invoke it when it would not.» with the evidence: `:23` «**Empirical evidence (SkillRouter, [SSOT #179]):** hiding the skill body and routing only on the description produces a 31–44 percentage-point drop in task-routing accuracy.» and the gap the rules fills: `:25` «a `description: "Helper"` passes both tests and still misroutes every task. The quality gap is unaddressed.» Class header: `:12` «> **Class:** C — prose-only; no current executable artifact. Promotion criterion in §3. Deferred per the R4b decision …: «no misrouting incidents yet; a structural length/non-empty proxy would be `#discipline-theatre`; defer is explicitly valid when the trigger is recorded».»

## Never (fires)

A description that fails the distinction test: `.claude/rules/skill-description-quality.md:37` «- The `description` field MUST be specific enough to distinguish the skill from its peers in the registry. Vague one-word summaries (`"Helper"`, `"Tool"`) are not compliant with this rule even in the absence of a mechanical gate.» and `:38` «- The `when_to_use` section (or equivalent trigger block) MUST enumerate at least one **concrete trigger phrase or condition** under which the skill applies.»

## Always (clean)

The author self-check: `.claude/rules/skill-description-quality.md:39` «- Authors SHOULD self-check: *if I had to route a task description to this skill using only its `description` field, would the routing be unambiguous?*» — enforced at review time, not by a gate (`:41`). The future test design is pre-declared: `:47` «The test design should be **semantic, not purely structural** — a structural proxy (non-empty, length ≥ N) would be `#discipline-theatre`.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:36` «| `skill-description-quality.md` | C | authoring/updating any SKILL.md `description` field. | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/skill-description-quality.md:7` «<!-- globs: .claude/skills/** -->», inject text at `:8`.
- **Structural complements (not this rule):** principle 15 (`packages/core/principles/15-skill-paired-negative.test.ts`) + principle 14 (`14-skill-drift-detection.test.ts`) check presence/drift, not quality (`:15`, `:25`, `:60-61`).
- No gate today — review-time only; promotion trigger at `:45` («≥3 documented misrouting incidents … within a 6-month window»), retirement at `:49`.
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: prose rule + edit-time inject + review-time judgment.
