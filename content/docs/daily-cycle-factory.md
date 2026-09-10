---
title: "Daily cycle — factory"
description: "The factory day in four beats — /arch an idea, pick a launch preset, ask /pipeline what to start, dispatch and harvest. The loop from kickoff to finished branch."
---

**Experimental.** A day on the factory layer has four beats: turn an idea into a
reviewed design, pick how the work should run, ask the pipeline what to start next, and
bring the finished branch home. This is the steady-state loop behind
[First Steps — factory](/docs/first-steps-factory/), which walks the same beats once
with a first task.

## `/arch` — an idea becomes a design

Invoke `/arch <topic>`: the external design contour turns a raw idea into a reviewed
design plus a routed handoff. On a harness without skills, read
`.claude/skills/arch/SKILL.md` and follow it by hand. A design that comes out of
`/arch` plan-complete also changes how the task routes — a plan-complete kickoff from
`/arch` is exactly the case the tier rubric routes whole-pipeline to the executor tier;
the rubric owns the conditions.

## preset — pick how the work runs

Launch presets are named run configurations for the pipeline:
`/pipeline <task> --preset <name>`. The list below is vendored from the shipped preset
data (`.claude/skills/pipeline/references/presets/*.json`, read at framework `staging`
`94a3a9efcd`; the landing carries no mechanical regen check — re-vendor on upgrade):

- `aif` — Autonomous overnight aif-handoff dispatch (mode=autonomous, project-default profiles, no marker)
- `economy` — Cost-conscious whole-line on executor tier (mode=whole-line-executor, marker=Z.AI GLM-5.3 SDK)
- `night` — Night-mode unattended single-session (mode=mode-a-inline)
- `sdd` — Interactive single-feature SDD (mode=in-session)

Resolve details (tier routing, predicates) live in the preset JSON itself and
`.claude/skills/pipeline/references/mode-overrides.md`.

## status — ask the pipeline what to start next

Invoke `/pipeline` with no task: it reads your kickoffs plus
`.ai-factory/orchestrator-prompts/plan.md` (created on first run), ranks them, and
emits a launch table. An empty backlog just renders the overview with zero open
umbrellas — that is normal, not an error. The table's ranking is where the tier rubric meets your backlog: design-heavy
rows plan on the top tier; mechanical rows run whole-line on the executor tier.

## dispatch → harvest — start it, then bring it home

Dispatch the launch table's top row, then bring the finished branch back with
`/harvest`. The worker works on its own branch inside your compiled gates. If a task
stalls or the runtime misbehaves,
`/aif-doctor` is the diagnostic entry point.

## Next

Why work routes to different tiers at all: [Overview — multi-model pipeline](/docs/factory-overview/).
What degrades when a capability is absent: [Degradations](/docs/degradations/).
