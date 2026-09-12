---
title: "Overview — multi-model pipeline"
description: "The AI factory in one screen: what a task is, how the Tier 0/1/2 rubric decides who plans and who implements, and how a finished branch comes back."
---

**Experimental.** The factory is getff's second layer: a dispatch pipeline where work
is written up as a kickoff, routed by a fixed tier rubric, executed by AI workers, and
brought back as a finished branch. It builds on the rules layer — every dispatched
worker works inside the same compiled gates — and it expects a specific operator
runtime; where a piece is missing, it degrades in named ways rather than pretending
otherwise.

## What a task is

A task starts as a **kickoff**: a short file in
`.ai-factory/orchestrator-prompts/<work-item>/kickoff.md` with a `Type:` line
(`fix` / `research` / `feature`), the goal, and — if the work splits — a sub-wave table
with one row per sub-step. The kickoff is the whole brief the worker gets.

## Plan → implement → review, by tier

The tier rubric is the factory's routing criteria, owned by one file in your install
(`.ai-factory/tier-home.md` §2). Two questions decide:

1. **Is the change ≤~5 lines in a single file at a known exact path?**
   **Tier 0 — tiny.** No dispatch at all; the senior session does the edit directly.
   Forcing a pipeline around a five-line fix is pure overhead.
2. **Otherwise, does producing the PLAN require a design/architecture judgment** —
   choosing between approaches, a non-obvious «how», an open «will this even work»?
   - **No — the «how» is one determinable sentence; the work is voluminous/mechanical**
     → **Tier 1 — bulky-simple.** The whole pipeline (plan + implement + review) runs on
     the executor tier.
   - **Yes — the plan itself needs judgment** → **Tier 2 — bulky-complex.** The top tier
     plans; the executor tier implements and reviews from below.

| Tier | Trigger | Who plans |
|---|---|---|
| 0 — tiny | ≤~5 lines, 1 file, exact path known, no ambiguity | — (no dispatch) |
| 1 — bulky-simple | many files/steps, but the «how» is one determinable sentence | executor tier |
| 2 — bulky-complex | the plan requires a design decision | top tier, unless the kickoff came through `/arch` plan-complete → executor tier |

Two binding details from the same rubric. The tie-breaker: unsure between Tier 1 and
Tier 2, default to **Tier 2** — a wrong-but-cheap plan costs a full redo downstream;
one extra planning pass is the cheaper error. And the discriminator in one line: if you
can state the «how» in a single sentence and the rest is expansion → Tier 1; if stating
the «how» forces you to _choose_ → Tier 2.

Tiers are **relative capability tiers, not hard-coded models**: the window slides to
whatever the active harness offers. The criteria classify the same way on any stack;
the harness fills each tier's seat with what it has.

## Harvest

A dispatched task ends with a branch, and `/harvest` is what brings the finished branch
back. If a task stalls or the
runtime misbehaves, `/aif-doctor` is the diagnostic entry point. The day-to-day shape
of this loop is one page: [Daily cycle — factory](/docs/daily-cycle-factory/).

## Portability, honestly

The layers do not all reach every AI harness equally, and the shipped guide says so:
the gates (ESLint rules, pre-commit, pre-push, CI) and `AGENTS.md`-as-session-context
work on any harness — nothing in them is harness-specific. Skills
(`/rule-research`, `/arch`, `/pipeline`, …) auto-activate on Claude Code; on other
harnesses they do not auto-activate — you read the matching `SKILL.md` by hand when the
topic comes up. What a missing piece does to the factory is itemized on
[Degradations](/docs/degradations/).

One more skill ships to every tier, always: `getff` — the product's own entry skill, whose
activation triggers cover "treating any codebase rule as an executable test" and whose body
carries the 5-layer framework summary (`skills/getff/SKILL.md:3,10`). The installer copies
it from the repo-root `skills/` (not `.claude/skills/`) and rewrites its cross-references to
upstream blob URLs so they do not dangle on a consumer tree (`setup.d/10-skills.sh:22-27`).
(Plugin-install consumers get a sibling set in the
marketplace payload — the product skill `getff` plus `using-getff`,
`installing-enforcement` and `tool-bootstrapping` — which follow the same
auto-activate-or-read-by-hand split; the skill named `getff` is the product-framing
skill that carries the rules-as-tests trigger surface.)
