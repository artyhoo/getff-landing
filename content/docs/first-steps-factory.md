---
title: "First Steps — factory"
description: "The factory profile: one task driven through the dispatch pipeline end to end — eight steps rendered from the First-Steps source of truth."
---

<!--
  VENDORED RENDER — DO NOT EDIT BY HAND.

  Source:   packages/core/templates/shared/first-steps.source.json
            (schema getff.first-steps/v1, sequence "factory")
  Read at framework commit: 94a3a9efcd (staging, 2026-09-10)
  Regen:    re-vendor from the source at the current staging HEAD; do not edit by hand.
-->

Factory is env plus one real task driven through the pipeline: you write a kickoff, ask
the pipeline what to start, dispatch it, and harvest the finished branch. **Experimental.**
The sequence's goal, from the source: env + one task driven through the pipeline.

Run it with the profile flag `--profile factory` (legacy equivalents:
`--with-aif-suite`, `--all`). One precondition before you start: pick this only if this
machine runs the aif-handoff operator runtime — the factory payload dead-ends without it.

## The eight steps

<!-- step: install -->

1. **Install at factory depth** — `bash <getff>/install.sh <stack> --profile factory`.
   As with env: already on a shallower depth, re-running the same command adds the
   deeper payload on top.

<!-- step: verify-payload -->

2. **Verify the payload landed** — `ls .claude/skills/`. On top of env you should see
   `dispatcher`, `aif-doctor`, `harvest`, `story` and `claude-glm-executor-handoff`.
   (`pipeline` and `night-mode` are NOT factory additions — they arrive with env+ and
   are already there.) These are the pipeline's moving parts; the sequence
   below uses four of them by name.

<!-- step: fill-passport -->

3. **Fill the project passport** — replace every `<…>` placeholder field in
   `.ai-factory/DESCRIPTION.md`. Dispatched workers read this passport too — a vague
   one sends every dispatched task out with a vague brief.

<!-- step: prove-rules-not-inert -->

4. **Prove the rules are not inert on your layout** — `bash scripts/check-rule-globs.sh`,
   then `bash scripts/check-fences-fire.sh` to see a rule go RED on planted input. On an
   empty skeleton `check-rule-globs.sh` fails by design (zero source files to match);
   re-run it once you have some. Dispatched workers inherit these gates on every branch
   they touch, which is why they are proven here and not assumed.

<!-- step: read-tier-home -->

5. **Read the tier + degradation SSOT** — open `.ai-factory/tier-home.md`: it decides
   which tier a task routes to, and what degrades when a capability is absent. The
   public render of its degradation matrix lives on our
   [Degradations](/docs/degradations/) page.

<!-- step: write-a-kickoff -->

6. **Write your first kickoff** — create
   `.ai-factory/orchestrator-prompts/<work-item>/kickoff.md`: a `Type:` line
   (`fix` / `research` / `feature`), the goal, and — if the work splits into parallel
   sub-steps — a `## §1 Sub-wave` section with one table row per sub-step. The kickoff
   is the whole brief the worker gets; write it so that a stranger could act on it.

<!-- step: run-pipeline -->

7. **Ask the pipeline what to start next** — invoke `/pipeline`. It reads your kickoffs
   plus `.ai-factory/orchestrator-prompts/plan.md` (created on first run), ranks them,
   and emits a launch table. An empty backlog just renders the overview with zero open
   umbrellas — that is normal, not an error, and it means you are one kickoff away from
   a launch table.

<!-- step: dispatch-one -->

8. **Dispatch the top row and read the result** — dispatch the launch table's top row,
   then bring the finished branch back with `/harvest`. If a task stalls or the runtime
   misbehaves, `/aif-doctor` is the diagnostic entry point.

## Where this goes next

The same loop as a working day: [Daily cycle — factory](/docs/daily-cycle-factory/).
What each tier means and what degrades when a piece is missing:
[Overview — multi-model pipeline](/docs/factory-overview/) and
[Degradations](/docs/degradations/).
