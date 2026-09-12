---
title: "First Steps — core"
description: "Install getff at core depth and end with a rule that has gone red on planted input in your own repo — seven steps rendered from the First-Steps source of truth."
---

<!--
  VENDORED RENDER — DO NOT EDIT BY HAND.

  Source:   packages/core/templates/shared/first-steps.source.json
            (schema getff.first-steps/v1, sequence "core")
  Read at framework commit: 94a3a9efcd (staging, 2026-09-10)
  Regen:    re-vendor from the source at the current staging HEAD; do not edit by hand.
  Deviation: the source's install step still ties `-y` to core depth — the installer's
  non-interactive default was raised to env on 2026-08-18 (install.sh:645-650). This
  render states the real behaviour; see CLAIMS-LEDGER.md BS3 round 4.
-->

Core is the rules layer at its smallest: install the gates, then prove on your own machine
that one of them actually fires. The sequence ends with a rule that has gone red on input
planted on purpose — which is why these steps ask you to break things deliberately. The
rules layer ships as a **beta**.

You need a project with a `package.json` (the npm stacks below). A Python, Rust or Go
project takes a separate lane — see [Quickstart — Python](/docs/quickstart-python/) for
the Python one.

The sequence's goal, from the source: install → a rule provably fires on your code.

## The seven steps

<!-- step: install -->

1. **Install at core depth** — from your project root run
   `bash <getff>/setup --profile core <stack>`.
   The stacks are `ts-server`, `react-next`, `react-spa` and `react-native`; omit the
   stack to auto-detect. (`install.sh python`, `install.sh cargo` and `install.sh go`
   are separate non-npm lanes, each an explicit positional.) Note the interactive
   default depth is `env` (raised from `core` on 2026-08-18): `-y` answers the prompts
   with that default, so this rules-only walk passes `--profile core` explicitly —
   everything later in getff stacks on top of it.

<!-- step: verify-payload -->

2. **Verify the payload landed** — `ls AGENTS.md .ai-factory/ scripts/`. You should see
   `AGENTS.md`, `.ai-factory/{DESCRIPTION.md,ARCHITECTURE.md,RULES.md}` and
   `scripts/audit-ai-docs.sh`. Nothing here is optional: a missing file means the install
   did not finish, and every later step leans on this one.

<!-- step: fill-passport -->

3. **Fill the project passport** — replace every `<…>` placeholder field in
   `.ai-factory/DESCRIPTION.md` (domain, stack, constraints, non-goals). This is the file
   `AGENTS.md` sends every future session to first, so a passport left unfilled degrades
   every later session. Ten minutes here is the highest-leverage ten minutes of the
   install.

<!-- step: prove-rules-not-inert -->

4. **Prove the rules are not inert on your layout** — `bash scripts/check-rule-globs.sh`.
   It fails when a shipped custom rule matches **zero** files in your layout — installed,
   but silently enforcing nothing. If it fires, widen `RULE_GLOBS` in
   `eslint.config.mjs` to cover your layout. On a brand-new skeleton with no source files
   yet this FAILS by design: every rule matches zero files. That is the expected first
   run; re-run it once your first `src/` files exist.

<!-- step: watch-a-rule-fire -->

5. **Watch a rule actually fire** — `bash scripts/check-fences-fire.sh`. It plants
   deliberately-bad input in a temp dir and asserts the installed ESLint rules go RED on
   it. This is the first-rule-fires moment: an installed rule that has never been seen to
   fire is an unproven claim, and this step is where the claim stops being a claim.

<!-- step: run-the-gate -->

6. **Run the gate you will run every day** — `bash scripts/audit-ai-docs.sh` (drift +
   code-vs-docs probes, ~10 sec). Expect findings on a fresh project; the INSTALL-FOR-AI
   «Expected first-run failures» table lists which ones are normal.

<!-- step: research-your-stack -->

7. **Continue into rule research in the same session** — invoke `/rule-research` (or read
   `.claude/agents/rule-researcher.md` on a harness without skills). The installer
   delivered a curated starter set; researching stack-specific rules from live
   documentation is the next step of the same lifecycle, not a later project.

The agent behind that command is `rule-researcher`: it detects the project's stack,
researches best-practices and anti-patterns from canonical official docs, and authors two
committed JSON files — a ResearchPlan and a GenerateSelection — that the deterministic
factory turns into a real ESLint rule + paired-negative test
(`agents/rule-researcher.md:3-11`).

## Where this goes next

The daily loop these gates put you in is one screen long: [Daily cycle — rules](/docs/daily-cycle-rules/).
For what "executable" means when an AGENTS.md claims it: [Executable AGENTS.md, defined](/docs/executable-agents-md/).
The deeper profiles add design review and a dispatch pipeline — see the factory's
[Overview](/docs/factory-overview/) (experimental).
