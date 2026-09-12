---
title: "source-before-shape — read the source before committing to a shape"
description: "Class B rule delivered at edit-time: before authoring a new capability or scoping a dispatch, the authoritative source is read first as an input to the shape — grep the SSOT for reuse-overlap, quote the spec's scope-chain; never author from recall."
---

> **Census id:** F29 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F29: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «creating a new SKILL.md/agent/module, or authoring a dispatch/kickoff.» (`.claude/rules/source-before-shape.md:14`) — paths:(3) + edit-time inject |

## What it bans

Authoring or scoping from internal recall when the authoritative source was one probe away. `.claude/rules/source-before-shape.md:8` «# Source-before-shape — read the authoritative source before committing to a shape»; the rule: `:26` «Before an authoring or scoping action that **commits to an artifact's shape**, the authoritative external source MUST be read **first, and as an input that drives the shape** — not consulted post-hoc as a trailer or a correction:» Origin incidents: `:20` «1. **BFR-reinvention:** PR #858 shipped `.claude/skills/night-mode/SKILL.md` re-describing the executor + dual-reviewer loop **already owned by Superpowers `subagent-driven-development`** … The trailer said the right thing; the body did the wrong thing.»; `:21` «2. **Scope-from-memory:** an autonomous launch prompt was scoped to «implement D1» from recall, when the spec defines the chain as D1 → B». Class header: `:13` «> **Class:** B — compensating mechanism without a CI principle test on the discipline itself: the violation … is a **judgment** call, not mechanically detectable, so it cannot be gated».

## Never (fires)

The anti-pattern family: `.claude/rules/source-before-shape.md:57` «- **`#authoring-from-internal-state`** (the family) — committing to an artifact's shape or a dispatch's scope from an internal mental model / session recall at an authoring moment that has no action-scoped gate, when the authoritative external source was one cheap probe away and would have changed the artifact.» with sub-cases `:58` «**`#consult-as-trailer-not-input`** — the prior-art consult _happened_ but only as a post-hoc `Prior-art:` trailer, too late to shape the body» and `:59` «**`#scope-from-memory-not-source`** — scoping a dispatch/launch from recall instead of re-reading the spec's scope-chain.»

## Always (clean)

The two surfaces: `:28` «- **Reuse surface** …: `grep` the SSOT … + the existing `.claude/skills/` and `agents/` for overlap on this capability-area **before writing the body**. If an own-stack or upstream analog exists, the body is a **thin adapter that subordinates to it**» and `:29` «- **Scope surface** (scoping a dispatch, launch prompt, or kickoff): re-read the spec's scope / chain section (`sed`/`Read` the actual lines) **before scoping**. A scope stated from recollection is provisional until the source is quoted.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:37` «| `source-before-shape.md` | B | creating a new SKILL.md/agent/module, or authoring a dispatch/kickoff. | paths:(3), edit-time inject |»
- **Layer A — edit-time injection**, 3 globs: `.claude/rules/source-before-shape.md:10` «<!-- globs: .claude/skills/**, agents/**, .claude/orchestrator-prompts/** -->» (inject text at `:11`), via `inject-matching-rule.sh`, once per session (`:44`).
- **Layer B — AI-agnostic auditor:** `agents/capability-reuse-auditor.md` — the semantic overlap pass, run before handoff (`:46`, `:78`).
- **Honest limitations stated, not hidden** (`:48-53`): the once-per-session token can be «spent» on a routine edit — «**Layer A would not have fired on its own origin incident**»; `packages/core/**` deliberately excluded; inline dispatch prompts unreachable.
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: best-effort first-touch injection + auditor + parents (BFR, §1.11) + principle 11 F1.
