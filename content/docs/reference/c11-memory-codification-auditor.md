---
title: memory-codification-auditor
description: Audits user-scope agent memory for durable conventions that live only in memory and were never codified into the repo. Flags stage-0 entries; reports candidates with a codify-or-leave verdict. Reports; does not fix.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# memory-codification-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** `memory-codification-auditor` sub-agent prompt — semantic triage of user-scope agent-memory entries …" for un-codified durable conventions, the `#convention-stranded-in-memory` anti-pattern; reporting-only (`agents/memory-codification-auditor.md:17-18`). The gap it fills: a deterministic grep can flag entries lacking a codification pointer, "but it cannot tell a **durable convention** (must be codified) from **ephemeral state / identity / a reference fact**" (`agents/memory-codification-auditor.md:22`).

## How it works

- Why the agent exists at all: "User-scope memory (`~/.claude/projects/<slug>/memory/*.md`) lives **outside the repo and outside CI by construction**. …" — nothing mechanical can reach a convention stranded there, the stage-0 worst case (`agents/memory-codification-auditor.md:30`).
- "## Input" (line 32): "Read every `feedback_*.md` and `project_*.md` entry (these are the convention-shaped types). …" — skip `user_*` and pure `reference_*` unless they smuggle a rule (`agents/memory-codification-auditor.md:40`).
- "## The triage test (per memory-codification rule §2)" (line 42): "For each entry, ask: **would a fresh session on a different machine — with no access to this memory store — need this to behave correctly?**" (`agents/memory-codification-auditor.md:44`).
- Verdicts: "| **CODIFY**           | Durable behavioural rule: "always/never X", "when Y do Z", a policy or discipline applicable to any future session. …" (line 48), "| **LEAVE**            | Ephemeral state, project status/progress, identity, or a reference fact/pointer. …" (line 49), plus ALREADY-CODIFIED for entries carrying a pointer or `TODO-codify:` marker (line 50).
- "## Method (no prose-only findings — per ai-laziness-traps.md T3)" (line 52): "1. Enumerate the population first: count the entries you will review (`Glob` on the memory dir). …" (line 54); cross-check the repo before recommending CODIFY (line 56); report partial coverage as partial (line 57).
- Output grammar (line 59): "POPULATION: <M> entries reviewed of <total> (coverage %)" (line 62) then CODIFY / LEAVE / ALREADY-CODIFIED / RESIDUAL sections (lines 63-70).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `.claude/rules/memory-codification.md` — the SSOT discipline (line 18: "> [.claude/rules/memory-codification.md](../.claude/rules/memory-codification.md) (SSOT).").
- **ADAPTS:** the same discipline as the write-time hook — "<!-- This anchor pairs with .claude/hooks/inject-memory-codification.sh (CC PostToolUse" write-time reminder; the hook fires at write-moment, this agent at periodic sweep (`agents/memory-codification-auditor.md:9-13`).
- **ADDS:** the semantic half the grep cannot do (line 22) and the codify-or-leave verdict table with suggested codification homes (lines 48-50, 64).
- Census family satellites: **C2**-adjacent reporting-only posture; no upstream agent dependency — its inputs are memory files, not repo state.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/memory-codification-auditor.md:2` — `name: memory-codification-auditor`
- `agents/memory-codification-auditor.md:3` — `description: Audits user-scope agent memory for durable conventions that live only in memory and were never codified into the repo. Flags stage-0 entries; reports candidates with a codify-or-leave verdict. Reports; does not fix.`
- `agents/memory-codification-auditor.md:17` — `> **Authoritative for:** `memory-codification-auditor` sub-agent prompt — semantic triage of user-scope agent-memory entries …`
- `agents/memory-codification-auditor.md:30` — `User-scope memory (`~/.claude/projects/<slug>/memory/*.md`) lives **outside the repo and outside CI by construction**. …`
- `agents/memory-codification-auditor.md:32` — `## Input`
- `agents/memory-codification-auditor.md:42` — `## The triage test (per memory-codification rule §2)`
- `agents/memory-codification-auditor.md:44` — `For each entry, ask: **would a fresh session on a different machine — with no access to this memory store — need this to behave correctly?**`
- `agents/memory-codification-auditor.md:52` — `## Method (no prose-only findings — per ai-laziness-traps.md T3)`
- `agents/memory-codification-auditor.md:59` — `## Output format`
- `agents/memory-codification-auditor.md:62` — `POPULATION: <M> entries reviewed of <total> (coverage %)`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
