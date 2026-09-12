---
title: "reviewer-discipline — review-session protocol (rules copy)"
description: "Class C rule: a reviewer never crosses into orchestrator-role strategy decisions mid-session — findings needing a strategy call surface as DECISION-NEEDED with both options described, then the reviewer stops."
---

> **Census id:** F25 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F25: MISSING → drafted E4; census satellite C2 — the reviewer agent) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «review sessions (`/review`, `/ultrareview`, or a prose "проверь"/verdict ask).» (`.claude/rules/reviewer-discipline.md:6`) — agent channel |

## What it bans

Role-swap: a reviewer session making project-strategy decisions. `.claude/rules/reviewer-discipline.md:1` «# Reviewer discipline — discipline rule»; the rule: `:14` «When acting as reviewer (after `/review`, `/ultrareview`, or any explicit «проверь / verdict / second opinion» request), do NOT cross into orchestrator-role decisions mid-session.» and the boundary: `:18` «The reviewer can describe what each path implies; **the reviewer cannot pick between them.**» Origin: `:10` «Reviewer session (post-`/review`) made a project-strategy decision («is architecture.md §2.3 a v2 future spec or v1 active requirement?») mid-session instead of surfacing it as decision-needed.» Class header: `:5` «> **Class:** C — prose-only, no current compensating mechanism (reclassed from B per Track 3 §3.3, commit 4d52a72). Promotion criterion in §4.»

## Never (fires)

The three anti-patterns: `.claude/rules/reviewer-discipline.md:35` «- **`#role-swap-mid-session`** — reviewer session, prompted with `/review` or similar, makes orchestrator-track decisions instead of surfacing them.»; `:36` «- **`#strategy-decided-by-reviewer`** — variant; reviewer concludes «X is the answer» and writes that as a verdict instead of «X or Y, both legitimate, maintainer decides».»; `:37` «- **`#reviewer-as-secondary-orchestrator`** — pattern across multiple sessions where reviewer's strategic calls become precedent and subsequent sessions normalize scope creep.»

## Always (clean)

The surface-as-decision-needed pattern (`:26-29`): `.claude/rules/reviewer-discipline.md:26` «1. **Name the decision explicitly** as «DECISION-NEEDED: <one-line summary>».» … `:29` «4. **Stop.** Do not infer the maintainer's likely answer and proceed.» — preserving independence: `:31` «This preserves the reviewer's independence as a falsification check. A reviewer who picks strategy becomes a second orchestrator — losing the independent-verification property.» Severity contract: `:60` «- **Recorded-premise test:** the reviewer may stand only on RECORDED premises. … Premise unrecorded (payoff, priority, worth-building) → finding class **`ESCALATED`**: routed to the concept holder».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:33` «| `reviewer-discipline.md` | C | review sessions (`/review`, `/ultrareview`, or a prose "проверь"/verdict ask). | agent |»
- **Agent channel:** `.claude/rules/reviewer-discipline.md:3` «<!-- channel: agent agents/reviewer-discipline.md#reviewer-discipline -->» — the condensed run-moment protocol the review session reads (`:20`).
- No CI mechanism: `:46` «No compensating mechanism currently in place; the rule is enforced solely by maintainer / reviewer awareness at session time.»; the compliance-verifier is explicitly NOT this rule's mechanism (`:50` — «empirically scoped to PR description §1.7 substance review … not to reviewer role-swap detection»).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: agent-embed + session-time awareness; promotion to a principle test pre-declared at `:41` (3 role-swap incidents / 6 months).
