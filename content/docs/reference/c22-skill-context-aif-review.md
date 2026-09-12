---
title: aif-review (skill-context override)
description: Anti-tautology two-AI review conventions injected into AI Factory's aif-review skill and its background review-sidecar — the test-quality checks this project adds over AIF's generic review.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# aif-review (skill-context override)

**Status:** shipped-beta (AIF-native skill-context override) · **Ships to:** npm lane — copied into the consumer's `.ai-factory/skill-context/aif-review/SKILL.md` by the SHIPPED_DOCS-derived §3c copy loop (`setup.d/20-agents.sh:74`) · **Fires at:** mandatory-read by AIF's own background sidecars (`setup.d/20-agents.sh:56`) — concretely, AIF's `aif-review` skill and its background `review-sidecar` at review time

Covers census rows C22 and E16 — the same file rows in both families.

## What it is

Skill-context override at `packages/core/templates/shared/skill-context/aif-review/SKILL.md`. File name `aif-review/SKILL.md`; frontmatter `name: aif-review-project-context` — the name E16's census row quotes. H1: "aif-review skill-context — anti-tautology two-AI review conventions". It carries "project-specific review conventions injected into AI Factory's `aif-review` skill (and its background `review-sidecar`)" — the anti-tautology / two-AI test-review checks this project requires in addition to AIF's generic review (`…/aif-review/SKILL.md:7`). The generic correctness/security/performance review stays owned by AIF's `aif-review` SKILL.md; this file augments it (`…/aif-review/SKILL.md:8`). The delivery route is deliberate: rather than ship a colliding `review-sidecar` agent, "aif-review gets our anti-tautology test-review content" (`setup.d/20-agents.sh:58`).

## How it works

- **Dual-implementation status.** `<!-- @dual-pair: review-sidecar -->` + `<!-- spec-of: agents/review-sidecar.md -->` (`…/aif-review/SKILL.md:10-11`). Census C10 is `agents/review-sidecar.md`, the portable SSOT: the marker comment says "Portable SSOT for this content is agents/review-sidecar.md. This file is the AIF-native delivery channel (skill-context override) for the same anti-tautology spec … Edit the SSOT first, then mirror here." (`…/aif-review/SKILL.md:12-14`).
- **Premise.** The highest-value review signal is test quality, not just code correctness; apply the conventions as project-level overrides — when they add a check AIF's defaults lack, perform it and include it in the output (`…/aif-review/SKILL.md:16`).
- **Stance.** Review the diff as a cold external reviewer — read the changed code as if you had never seen it and did not write it; be skeptical of comments and commit messages; read the actual diff (`…/aif-review/SKILL.md:18`).
- **The seven MUST-checks.** Tautological tests (assertions true by construction — "if I removed this assertion, what bug could now ship?"), mock-only tests, missing edge cases, test name ≠ behaviour, test independence, React/Next anti-patterns, React testing anti-patterns (`…/aif-review/SKILL.md:22-36`).
- **Output augmentation.** A `### Test-Quality Review` section listing each finding with severity (BLOCKER/MAJOR/MINOR), `file:line`, "what I saw", "why it's a problem", and a one-line fix; report only — never modify code (`…/aif-review/SKILL.md:38-40`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **ADAPTS:** `agents/review-sidecar.md` (census C10) — same anti-tautology spec, different delivery channel; the AIF-native skill-context override instead of a colliding agent file.
- **USES:** AIF's `aif-review` skill + `review-sidecar` as the host pipeline whose output this file augments (the mandatory-read wiring, `setup.d/20-agents.sh:56-58`).
- **ADDS:** the two-AI rationale — the implementer wrote code and tests in one head; the reviewer's value is being a different head (`…/aif-review/SKILL.md:20`).
- Census satellites: **B35, C10**.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:2` — `name: aif-review-project-context`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:5` — `# aif-review skill-context — anti-tautology two-AI review conventions`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:7` — ``> **Authoritative for:** project-specific review conventions injected into AI Factory's `aif-review` skill (and its background `review-sidecar`) …``
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:10` — `<!-- @dual-pair: review-sidecar -->`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:11` — `<!-- spec-of: agents/review-sidecar.md -->`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:12` — ``<!-- Portable SSOT for this content is agents/review-sidecar.md. This file is the AIF-native``
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:18` — `## Review the diff as a cold external reviewer`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:22` — `## MUST additionally check — test quality`
- `packages/core/templates/shared/skill-context/aif-review/SKILL.md:38` — `## Output augmentation`
- `setup.d/20-agents.sh:56` — `# AIF's own background sidecars MANDATORY-read .ai-factory/skill-context/<skill>/SKILL.md`
- `setup.d/20-agents.sh:58` — `# instead of shipping colliding agents: aif-review gets our anti-tautology test-review content;`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
