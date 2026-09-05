---
title: "First Steps — env"
description: "Add the env profile on top of core: tier criteria on disk and one idea taken through /arch — six steps rendered from the First-Steps source of truth."
---

<!--
  VENDORED RENDER — DO NOT EDIT BY HAND.

  Source:   packages/core/templates/shared/first-steps.source.json
            (schema getff.first-steps/v1, sequence "env")
  Read at framework commit: f49e35311c
  Regen:    re-vendor from the source at the current staging HEAD; do not edit by hand.
-->

Env is core plus the multi-model contour: the tier-routing criteria land on disk as a
file you can read, and you take one idea through `/arch` to see the design contour work.
**Experimental.** The sequence's goal, from the source: core + the tier criteria on disk
and one idea through `/arch`.

Run it with the profile flag `--profile env`.

## The six steps

<!-- step: install -->

1. **Install at env depth** — `bash <getff>/install.sh <stack> --profile env`. Already on
   core? Re-run that same command: the deeper payload is added and every core artefact
   stays byte-identical except `.prettierignore`, whose managed block gains the new
   paths. Do not reach for `--refresh` to upgrade — it re-delivers fixes to what you
   already have and does not reliably deepen an install: on a `core` project
   `--refresh --profile env` exits 0 while `tier-home.md` and `.claude/skills/arch/`
   stay absent.

<!-- step: verify-payload -->

2. **Verify the payload landed** — `ls AGENTS.md .ai-factory/ scripts/`, plus
   `.ai-factory/tier-home.md` and `.claude/skills/arch/`. Those last two are the
   artefacts `env` adds over `core`, and they are what the rest of this sequence uses.

<!-- step: fill-passport -->

3. **Fill the project passport** — replace every `<PLACEHOLDER>` in
   `.ai-factory/DESCRIPTION.md`. If you installed straight to `env` this is the same
   passport step as core's; if you deepened an existing install, it is worth re-reading
   what you wrote there before the design contour starts reading it.

<!-- step: prove-rules-not-inert -->

4. **Prove the rules are not inert on your layout** — `bash scripts/check-rule-globs.sh`,
   then `bash scripts/check-fences-fire.sh` to see a rule go RED on planted input. On an
   empty skeleton `check-rule-globs.sh` fails by design (zero source files to match);
   re-run it once you have some. Same gates as core, same reason: a rule nobody has seen
   fire is an unproven claim.

<!-- step: read-tier-home -->

5. **Read the tier + degradation SSOT** — open `.ai-factory/tier-home.md`. It owns the
   Tier 0/1/2 routing criteria and the capability-absence degradation matrix: what still
   works with no aif runtime, no executor-tier model, or a non-Claude-Code harness.
   `AGENTS.md` only points there; the criteria live in that one file. The degradation
   half is rendered publicly on our [Degradations](/docs/degradations/) page.

<!-- step: arch-one-idea -->

6. **Take one idea through `/arch`** — invoke `/arch <topic>`: the external design
   contour turns a raw idea into a reviewed design plus a routed handoff. On a harness
   without skills, read `.claude/skills/arch/SKILL.md` and follow it by hand. Pick a
   small real idea from your own backlog — the point of the step is to see the contour
   produce a design you would actually merge.

## Where this goes next

What the tiers route to, one level up: [Overview — multi-model pipeline](/docs/factory-overview/).
Or continue the sequence at [First Steps — factory](/docs/first-steps-factory/), which
drives one task through the pipeline end to end.
