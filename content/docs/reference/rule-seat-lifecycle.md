---
title: "seat-lifecycle — SLP: one SSOT, four pointers"
description: "Class B rule sequencing the registry-role seat lifecycle (birth, work, self-cleaning, retirement) — it owns only the sequence; every mechanism is owned by a named ADR/spec, and a grep test asserts all four seat skills link here."
---

> **Census id:** F27 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F27: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «seat birth, self-cleaning handoff, or retirement in a seat session.» (`.claude/rules/seat-lifecycle.md:17`) — paths:(4), read-time load (no edit-time inject) |

## What it bans

Divergent seat-lifecycle prose across the seat skills, and skipped lifecycle phases. `.claude/rules/seat-lifecycle.md:10` «# Seat lifecycle protocol (SLP) — one SSOT, four pointers»; the ownership boundary: `:18` «> **Authoritative for:** the lifecycle SEQUENCE only — §1 the four phases, which settled mechanism each phase reuses, and which steps are Part-II-gated» with `:22` «> Every mechanism this file sequences is OWNED elsewhere». Origin: `:32-34` «The four seat skills carried divergent (or absent) birth/cleanup/retirement prose — `#parallel-evolution-creep`.» Class header: `:12` «> **Class:** B — the compensating mechanism ships in the same PR: the all-four-carry-the-pointer grep check ([packages/core/skills/seat-lifecycle-pointer.test.ts]) asserts every SKILL.md named in `paths:` above links here.» Scope: «Exactly three roles — arch, pipeline, dispatcher; night is a MODE existing seats enter, never a fourth role» (`:42-43`).

## Never (fires)

The anti-patterns: `.claude/rules/seat-lifecycle.md:74` «- **`#fifth-description-of-the-loop`** — this file (or a skill's pointer block) growing operational detail an owner already carries.»; `:77` «- **`#lifecycle-phase-skipped`** — a live seat skipping a phase (e.g. retiring with no residue artifact, or a night birth outside an isolated worktree).»; `:80` «- **`#normative-now-from-parked-machinery`** — treating a PART-II-GATED step as live before its probe lands.»

## Always (clean)

The four phases reusing settled mechanisms — birth quoted: `.claude/rules/seat-lifecycle.md:49` «1. **Birth.** NOW: the spawn prompt assigns the role; the first turn verifies an isolated worktree — repo-root sessions are ineligible as seats»; retirement: `:65` «4. **Retirement.** NOW: artifact handoff — D6 residue discipline; nothing load-bearing lives only in working memory (v2 §4 rung 1).» Pointer blocks stay small: `:75-76` «pointer blocks in the four skills stay 3–5 lines, never a restatement.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:35` «| `seat-lifecycle.md` | B | seat birth, self-cleaning handoff, or retirement in a seat session. | paths:(4) |»
- **`paths:` frontmatter, 4 skills:** `.claude/rules/seat-lifecycle.md:3-8` (arch, pipeline, dispatcher, night-mode SKILL.md) — «read-time load on matching work; no edit-time inject» (`:16`, principle 31 branch (a)).
- **Compensating grep check (CI):** `packages/core/skills/seat-lifecycle-pointer.test.ts` — asserts all four skills carry the pointer (`:12-13`, `:112`).
- PART-II-GATED steps are explicitly inert until probes land: «Steps marked PART-II-GATED activate only when the session-bus Part-II probes (P1/F4/P4) land; until then they are inert, not improvised.» (`:46-47`)
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: read-time paths + one deterministic vitest grep.
