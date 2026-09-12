---
title: self-reflection
description: Framework-native recommendation-discipline gate skill — enforces §1.7 forward/backward checks on discipline-introducing recommendations via a portable prose checklist; tracked in the framework repo (unlike the gitignored aif-* suite).
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Unlike the aif-* suite (B17-B40), self-reflection IS tracked in the framework repo —
     anchors below are git objects at the pin (git show b069c593:.claude/skills/self-reflection/SKILL.md),
     not disk reads; the on-disk copy is byte-identical to the pin (git diff b069c593 -- that path is empty). -->

# self-reflection

**Status:** shipped-beta (framework-native skill, tracked in the repo) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** skill auto-activation on the description's trigger list — «правило», «принцип», discipline/process/meta wording, "forward check", "backward check", "self-reflection", or "any edit touching `.claude/rules/`, `packages/core/principles/`, `docs/meta-factory/EXECUTION-PLAN.md`, `docs/meta-factory/prior-art-evaluations.md`, `CLAUDE.md`" (`.claude/skills/self-reflection/SKILL.md:3`)

## What it is

A recommendation-discipline gate. Its self-description: "Use when introducing or extending a rule, principle, pattern, methodology, discipline, or process change in this repository." (`.claude/skills/self-reflection/SKILL.md:3`). The body titles it "Self-reflection — recommendation discipline gate" (`.claude/skills/self-reflection/SKILL.md:8`) and scopes its authority: "**Authoritative for:** skill activation conditions (frontmatter `description`); §1.7 forward+backward checklist summary; output contract for discipline-introducing recommendations; pointers to cold references" — explicitly "**NOT authoritative for:** the §1.7 rule itself" (`.claude/skills/self-reflection/SKILL.md:10-11`). It declares a harness posture: "portable — prose self-application checklist over repo artefacts; no harness primitives" (`.claude/skills/self-reflection/SKILL.md:6`).

## How it works

It exists because of recurrence: "Three documented occurrences of the same shape in 2026:" (`.claude/skills/self-reflection/SKILL.md:15`). Its output contract requires that before closing a discipline-introducing recommendation — "and in any PR description that touches discipline-bearing files" — the recommendation carries two non-empty sections "with the exact `### §1.7` heading prefix the CI gate matches" (`.claude/skills/self-reflection/SKILL.md:45`); a heading without the prefix does not match the gate. The skill tracks its own enforcement surface: "5 active layers as of Wave 8.1 (2026-05-12)." (`.claude/skills/self-reflection/SKILL.md:108`), and closes the loop on itself in "## How this skill itself complies with §1.7" (`.claude/skills/self-reflection/SKILL.md:121`), including a self-reflexive trigger check where the bootstrap research-patch "walks §1.7 through itself" (`.claude/skills/self-reflection/SKILL.md:125`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `.claude/rules/phase-research-coverage.md` as the authority it points at ("the §1.7 rule itself — see `.claude/rules/phase-research-coverage.md §1.7`", `.claude/skills/self-reflection/SKILL.md:11`) — the census's B41 satellite column records this as family F (framework rules/docs).
- **ADAPTS:** the §1.7 forward/backward checklist into a portable prose skill with no harness primitives (`.claude/skills/self-reflection/SKILL.md:6`).
- **ADDS:** the repo's first project-internal skill — its own backward-check records that "directory empty before this commit (this is the first project-internal skill)" (`.claude/skills/self-reflection/SKILL.md:124`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/self-reflection/SKILL.md:2` — `name: self-reflection`
- `.claude/skills/self-reflection/SKILL.md:3` — `description: Use when introducing or extending a rule, principle, pattern, methodology, discipline, or process change in this repository. Auto-trigger on «правило», «принцип», «дисциплина», «методология», «процесс», recommend, introduce rule, new principle, discipline change, process rule, meta, recursive, applies to itself, check own work, self-review, forward check, backward check, closing recommendation, discipline-bearing artefact, self-reflection, anti-pattern, or any edit touching `.claude/rules/`, `packages/core/principles/`, `docs/meta-factory/EXECUTION-PLAN.md`, `docs/meta-factory/prior-art-evaluations.md`, `CLAUDE.md`. Do NOT trigger on simple typo fixes, code edits without rule changes, or routine PR work.`
- `.claude/skills/self-reflection/SKILL.md:6` — `<!-- @harness-posture: portable — prose self-application checklist over repo artefacts; no harness primitives -->`
- `.claude/skills/self-reflection/SKILL.md:8` — `# Self-reflection — recommendation discipline gate`
- `.claude/skills/self-reflection/SKILL.md:10` — `> **Authoritative for:** skill activation conditions (frontmatter `description`); §1.7 forward+backward checklist summary; output contract for discipline-introducing recommendations; pointers to cold references.`
- `.claude/skills/self-reflection/SKILL.md:11` — `> **NOT authoritative for:** the §1.7 rule itself — see [`.claude/rules/phase-research-coverage.md §1.7`](../../rules/phase-research-coverage.md). Project goal — see [README.md#why-this-exists](../../../README.md#why-this-exists).`
- `.claude/skills/self-reflection/SKILL.md:15` — `Three documented occurrences of the same shape in 2026:`
- `.claude/skills/self-reflection/SKILL.md:45` — `Before closing a recommendation under skill scope — and in any PR description that touches discipline-bearing files — the recommendation must contain two non-empty sections **with the exact `### §1.7` heading prefix the CI gate matches**. [`discipline-self-check.yml`](../../../.github/workflows/discipline-self-check.yml) anchors its `awk` on `^### §1\.7 Forward-check applied` and `^### §1\.7 Backward-check applied`; a heading without the `§1.7` prefix does **not** match and the gate reports the section as missing.`
- `.claude/skills/self-reflection/SKILL.md:106` — `## §1.7 enforcement layers`
- `.claude/skills/self-reflection/SKILL.md:108` — `5 active layers as of Wave 8.1 (2026-05-12). Previously: 4 active layers as of Wave 7 sub-wave 7.6.c (2026-05-11). §13.23 closure shipped layer 4; §13.29 closure shipped layer 5.`
- `.claude/skills/self-reflection/SKILL.md:121` — `## How this skill itself complies with §1.7`
- `.claude/skills/self-reflection/SKILL.md:124` — `- **Backward-check applied:** complete sweep of `.claude/skills/` — directory empty before this commit (this is the first project-internal skill); no existing entries to migrate. Exemption mechanism: skill is itself an exemption from `.claude/skills/*/SKILL.md` from `principle 09` canonical list (project-internal skills have looser authority than shipped `skills/rules-as-tests/`); flagged as open question for follow-up.`
- `.claude/skills/self-reflection/SKILL.md:125` — `- **Self-reflexive trigger applied:** the [bootstrap research-patch](../../../docs/meta-factory/research-patches/2026-05-09-recommendation-skips-own-discipline.md) walks §1.7 through itself — 6/6 forward + 3/3 backward items independently catch the gap that motivated §1.7.`
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified); `.claude/skills/self-reflection/SKILL.md` IS a tracked git object at that pin (read via `git show b069c593:.claude/skills/self-reflection/SKILL.md`), unlike the gitignored aif-* suite pages [B17](/docs/reference/b17-aif)–[B40](/docs/reference/b40-aif-skill-generator).
