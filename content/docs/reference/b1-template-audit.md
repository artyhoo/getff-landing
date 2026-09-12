---
title: template-audit
description: Core-tier skill that audits rendered templates via a two-step local advisory review — deterministic probes first, then session-bound LLM checks; no API key, not blocking.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# template-audit

**Status:** shipped-beta · **Ships to:** `core` tier arm (`GETFF_SKILLS_CORE`, `setup.d/lib.sh:61`) · **Fires at:** Claude Code skill auto-activation on the trigger phrases in its frontmatter description

## What it is

A skill that audits the docs templates the framework renders (e.g. a project's `AGENTS.md`) via a **local advisory review**, in two steps. Its own self-description: a "Session-bound advisory audit. **FREE under Claude Code subscription.** No API key. Not blocking." (`.claude/skills/template-audit/SKILL.md:13`). It is advisory — it reports findings for the session to act on; the deterministic enforcement of the same templates stays in a CI gate the skill names but does not own.

## How it works

Per its `## Procedure` section (`.claude/skills/template-audit/SKILL.md:15`):

1. **Step 1 — deterministic probes (CI-equivalent).** Run `npm --prefix packages/core run test:template-render`; "If this fails — stop and fix before Step 2" (`.claude/skills/template-audit/SKILL.md:20,23`).
2. **Step 2 — LLM advisory checks (session-bound, P2/P3/P5).** "Ask the current Claude session (no API call)" (`.claude/skills/template-audit/SKILL.md:25`), starting with "P2 — Paraphrase fidelity: Does rendered `AGENTS.md` convey" the rule's meaning (`.claude/skills/template-audit/SKILL.md:29`).

A `## Promotion trigger` section (`.claude/skills/template-audit/SKILL.md:38`) closes the skill. Harness posture is declared portable: "prose advisory audit checklist; no harness primitives" (`.claude/skills/template-audit/SKILL.md:6`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the deterministic template-render audit in `packages/core` (`npm … run test:template-render`, Step 1) — the skill's header points there as the "Deterministic CI gate" while disclaiming ownership of it (`.claude/skills/template-audit/SKILL.md:11`).
- **ADAPTS:** the local advisory-review pattern (session-bound, no paid API) shared by the core-tier skill family.
- **ADDS:** the trigger vocabulary for template audits ("template, audit, render, generated docs, AGENTS.md, paraphrase, cue placement, …", SKILL.md:3) and the two-step ordering that gates the advisory pass on the deterministic one.
- Census family satellites: **E** (templates + vendored renders) — the surfaces this skill audits.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/template-audit/SKILL.md:2` — `name: template-audit`
- `.claude/skills/template-audit/SKILL.md:3` — `description: Use when auditing rendered templates via local advisory review. Triggers: template, audit, render, generated docs, AGENTS.md, paraphrase, cue placement, local advisory, template-render, audit-template.`
- `.claude/skills/template-audit/SKILL.md:6` — `<!-- @harness-posture: portable — prose advisory audit checklist; no harness primitives -->`
- `.claude/skills/template-audit/SKILL.md:13` — `Session-bound advisory audit. **FREE under Claude Code subscription.** No API key. Not blocking.`
- `.claude/skills/template-audit/SKILL.md:20` — `npm --prefix packages/core run test:template-render`
- `.claude/skills/template-audit/SKILL.md:25` — `**Step 2 — LLM advisory checks (session-bound, P2/P3/P5)**`
- `setup.d/lib.sh:61` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
