---
title: aif-rules-check (skill-context override)
description: R10-naming + R4/R17 test-existence checks injected into AI Factory's aif-rules-check — the residue of the removed best-practices-sidecar that has no earlier deterministic enforcement channel.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# aif-rules-check (skill-context override)

**Status:** shipped-beta (AIF-native skill-context override) · **Ships to:** npm lane — copied into the consumer's `.ai-factory/skill-context/aif-rules-check/SKILL.md` by the SHIPPED_DOCS-derived §3c copy loop (`setup.d/20-agents.sh:74`) · **Fires at:** mandatory-read by AIF's own background sidecars (`setup.d/20-agents.sh:56`) — concretely, AIF's `aif-rules-check` skill and its `rules-sidecar` at verify time

Covers census rows C23 and E17 — the same file rows in both families.

## What it is

Skill-context override at `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md`. File name `aif-rules-check/SKILL.md`; frontmatter `name: aif-rules-check-project-context`. H1: "aif-rules-check skill-context — naming + test-existence residue". It carries "project-specific rule checks injected into AI Factory's `aif-rules-check` skill (and its `rules-sidecar`)" — the two checks from this project's `RULES.md` that are NOT enforced at an earlier deterministic channel (R10 naming, R4/R17 test-existence) and therefore need a verify-time pass (`…/aif-rules-check/SKILL.md:7`). This is the residue of the removed best-practices-sidecar: "aif-rules-check gets the R10-naming + test-existence residue of the removed best-practices-sidecar." (`setup.d/20-agents.sh:59`).

## How it works

- **No paired agent.** The file is the standalone SSOT for the R10/R4/R17 residue; there is no paired agent file — "the former best-practices-sidecar.md was removed; this skill-context carries the residue spec in full" (`…/aif-rules-check/SKILL.md:14-15`). Delivery as a skill-context augmentation rather than a colliding sub-agent is the C-1 KEEP-AIF resolution (`…/aif-rules-check/SKILL.md:14`).
- **Scope discipline.** `rules-sidecar` already reads `.ai-factory/RULES.md` for the full R1–R20 corpus; do not re-run checks the project enforces at edit-time (custom ESLint rules) or pre-push (`tsc`, `depcruise`, `audit-ai-docs.sh`) — those are the authoritative, earlier channels (`…/aif-rules-check/SKILL.md:18`).
- **R10 — naming conventions.** `RULES.md` marks R10 "manual review only" with no probe: filename matches primary exported symbol, `*Repository` interfaces in the domain layer, `*Service` types NOT in the domain layer, `*Controller` only under the web/HTTP layer; reported as `R10 naming: PASS|FAIL` and treated as advisory unless RULES.md marks it blocking (`…/aif-rules-check/SKILL.md:20-29`).
- **R4 / R17 — test-existence for new code.** ESLint cannot assert a test file exists: R4 — every newly exported function under `src/` has a matching test file with at least one assertion; R17 — every new `.tsx` component has a matching `.unit.ts` (and `.stories.tsx` where required). Report only — do not create the tests (`…/aif-rules-check/SKILL.md:31-38`).
- **Output augmentation.** Append a `### Project Residue Checks (R10 / R4 / R17)` section; do not duplicate verdicts for rules already covered by edit-time ESLint or pre-push — name those "enforced earlier (ESLint/pre-push)" and move on (`…/aif-rules-check/SKILL.md:40-42`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **ADAPTS:** the removed `best-practices-sidecar.md` — its surviving residue is carried here in full instead of as an agent file (C-1 KEEP-AIF).
- **USES:** AIF's `aif-rules-check` skill + `rules-sidecar` as the host verify-time pass whose RULES.md read this file augments.
- **ADDS:** exactly the two checks with no earlier deterministic channel — the residue boundary is stated in-file so the verify pass cannot balloon into re-running R1–R20.
- Census satellite: **B38**.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:2` — `name: aif-rules-check-project-context`
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:5` — `# aif-rules-check skill-context — naming + test-existence residue`
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:7` — ``> **Authoritative for:** project-specific rule checks injected into AI Factory's `aif-rules-check` skill (and its `rules-sidecar`) …``
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:15` — `the former best-practices-sidecar.md was removed; this skill-context carries the`
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:18` — `` `rules-sidecar` already reads `.ai-factory/RULES.md` for the full R1–R20 corpus. … ``
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:20` — `## R10 — Naming conventions (no earlier automated channel)`
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:31` — `## R4 / R17 — Test-existence for new code (structural, not an ESLint rule)`
- `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:40` — `## Output augmentation`
- `setup.d/20-agents.sh:56` — `# AIF's own background sidecars MANDATORY-read .ai-factory/skill-context/<skill>/SKILL.md`
- `setup.d/20-agents.sh:59` — `# aif-rules-check gets the R10-naming + test-existence residue of the removed best-practices-sidecar.`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
