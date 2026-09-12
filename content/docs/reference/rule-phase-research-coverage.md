---
title: "phase-research-coverage — searching discipline"
description: "Class A rule: the coverage checklist applied before closing any «no production analog» claim — own-stack sweep, category sweep, semantic distance, adversarial negative-existence check, forward/backward self-review — with the companion principle test enforcing §1.7 on research patches."
---

> **Census id:** F22 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F22: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «phase research, prior-art lookups, negative-existence claims.» (`.claude/rules/phase-research-coverage.md:13`) — paths:(4), read-time only (no edit-time sibling, by design) |

## What it bans

Closing a negative-existence claim with incomplete search coverage. `.claude/rules/phase-research-coverage.md:10` «# Phase research coverage — searching discipline»; the application point: `:27` «Apply before closing any «N candidates checked → no production analog» claim. Failing any single item → the negative-existence verdict is **provisional**, not load-bearing.» The checklist (§1, `:29-34`): own-stack sweep, category sweep, semantic-distance check, adversarial check on negative-existence claims, «Prompt-list ≠ complete», trigger sweep — plus §1.7 recommendation self-discipline (forward-check + backward-check, `:35-39`). Class header: `:12` «> **Class:** A — companion principle test shipped at [packages/core/principles/13-phase-research-coverage-s17.test.ts] (#74, 2026-05-17); enforces §1.7 Forward+Backward self-review on research patches via the HISTORICAL_CUTOFF mechanism.»

## Never (fires)

A load-bearing «no analog» verdict with a floor-level lookup: `.claude/rules/phase-research-coverage.md:33` «5. **Prompt-list ≠ complete.** Hard Constraint #5 / #10 in the entry-research prompt typically lists ≥3 candidates per area. That is a **floor, not a ceiling.** Closing at the floor is permitted only if items 1-4 above also hold. If they don't, the lookup must continue past the listed minimum.» And the backward-check restatement shape: `:37` «A backward-check whose surface list is exactly the diff's own files … is a **restatement**, not a sweep — the [`#backward-check-restates-not-sweeps`] (T21) failure that is worst under context fatigue.»

## Always (clean)

Each checklist item run and recorded — e.g. item 4: `.claude/rules/phase-research-coverage.md:32` «4. **Adversarial check on negative-existence claims.** A claim of the form «no production tool implements X» is a strong assertion. Before accepting it, generate at least one *counter-prompt* that assumes the tool exists and tries to find it»; and the §1.7 authoring format: `:37` «**Authoring format (enforced at review, mandatory since T21):** write the backward-check as `Class of this change = <content predicate>. Surfaces where class-X occurs: [enumerate the COMPLETE set with grep/find evidence]. Per surface: SWEPT-CLEAN (evidence file:line) | GAP-FOUND (action).`»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:30` «| `phase-research-coverage.md` | A | phase research, prior-art lookups, negative-existence claims. | paths:(4) |»
- **CC-native `paths:` only — no edit-time sibling, by design:** `.claude/rules/phase-research-coverage.md:21` «> **Delivery channel — CC-native `paths:` only; no `<!-- globs: -->` sibling, by design (T-SEF-A).**» — the hook glob grammar cannot express the mid-path-star scope, and the expressible superset «would over-fire on **every** meta-factory doc edit».
- **Companion principle test (CI):** `packages/core/principles/13-phase-research-coverage-s17.test.ts` (#74) — §1.7 Forward+Backward enforcement on research patches (`:12`).
- **Cold-agent delegation** for sibling sweeps: `agents/backward-sweep-auditor.md` («hand it ONLY the change's *class* … so it enumerates siblings without being able to restate the PR it never saw», `:37`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: read-time paths + CI principle test + review-time format enforcement.
