---
title: "recommendation-laziness-discipline — mechanism layer"
description: "Class C rule operationalising phase-research-coverage §1.12: every inline verdict carries at least one evidence-bearing tool call quoted in the same turn; genuine ambiguous forks surface via AskUserQuestion, never a silent action."
---

> **Census id:** F23 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F23: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «before an inline verdict/recommendation or an ambiguous fork.» (`.claude/rules/recommendation-laziness-discipline.md:6`) — digest channel (always-on) |

## What it bans

Inline verdicts without evidence, and forks decided by silent action. `.claude/rules/recommendation-laziness-discipline.md:1` «# Recommendation-laziness discipline — mechanism layer»; the trigger: `:18` «An AI session is about to issue an **inline-chat verdict, recommendation, or design call**» — verdict words `ADOPT`/`BUILD`/`REJECT`/`DEFER`, directive phrases — `:23` «— **without having run at least one evidence-bearing tool call** (`Bash | Read | Grep | Glob | WebFetch | WebSearch`) in the same turn. The recommendation is fabricated from training-data or session-recall rather than grounded in present-moment verification.» The relation to the parent rule: `:33` «**This file does NOT redefine `phase-research-coverage.md §1.12` — it operationalises it.**» Class header: `:5` «> **Class:** C — prose-only, no companion executable artifact. Promotion criterion in §6.»

## Never (fires)

The two anti-patterns: `.claude/rules/recommendation-laziness-discipline.md:55` «- **`#inline-verdict-without-evidence`** — verdict or recommendation issued in dialogue without a preceding evidence-bearing tool call in the same turn.»; `:56` «- **`#fork-decided-by-silent-action`** — a genuine taste/strategy fork … embedded directly in an action (command, edit, dispatch) that bakes in the choice, *without* first surfacing it via `AskUserQuestion`.» with the incident: «Incident 2026-06-01 (PR #348 battle-test): an explicitly-50/50 README-structure fork was auto-decided by running `answer.ts --decision resume` directly, bypassing the ask-path entirely.» The measured evidence a Stop-hook scan does NOT work: `:47` «> `FP_rate = 84.2% (Wilson 95% CI: [62%, 95%], n=19) >> 20% threshold → Drop narrow-B from Option D. Option D = A+C only.`»

## Always (clean)

The operationalisation: `.claude/rules/recommendation-laziness-discipline.md:31` «**Operationalisation:** Before issuing any verdict or recommendation in dialogue, run **at minimum one evidence-bearing tool call** in the same turn and **quote its output** (file:line, command result, or fetched excerpt). The recommendation is then backed rather than vibes-only.» The fork posture: `:35` «**Operating posture (maintainer decision 2026-06-01): autonomous by default — the human-gate fires ONLY on a genuine ambiguous fork; a clear call (one option better on the merits) is decided and *reported*, NOT routed through a question.»»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:31` «| `recommendation-laziness-discipline.md` | C | before an inline verdict/recommendation or an ambiguous fork. | digest |»
- **Digest channel:** `.claude/rules/recommendation-laziness-discipline.md:3` «<!-- channel: digest .claude/hooks/inject-session-bootstrap.sh#H1 -->» — «always-on UserPromptSubmit injection; deterministic; fires every turn» (`:41`).
- **T-trap twin:** T20 in `ai-laziness-traps.md §2` — «path-scoped reinforcement via `inject-matching-rule.sh` when touching `.claude/rules/**`» (`:43`).
- **Ask-hook discriminator:** `ask-question-reminder.sh` bounces clear forks to «decide it yourself, say what you did» and lets genuine forks through (`:35`); `end-of-turn-reminder.sh` Branch-A backstop (`:56`).
- Deliberately NOT a gate — judgment-shaped, `#gate-where-judgment-needed` (`:56`); the narrow-B Stop-hook scan was dropped at 84.2% FP (`:45-49`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: always-on digest + T20 path-scoped twin + ask-hook.
