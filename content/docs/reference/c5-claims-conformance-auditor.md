---
title: claims-conformance-auditor
description: Cold conformance audit of docs-site claims against shipped reality. Given ONLY the doc surface(s) to audit (never the authoring narrative), enumerates every factual claim the docs make about the repo/state, verifies each against the live source with command+output or file:line evidence.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# claims-conformance-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** the claims-conformance audit protocol — claim taxonomy, inputs," per-claim verification method, output grammar (`agents/claims-conformance-auditor.md:21-22`). Class B cold detection layer: "> **Class:** B — the named cold-agent DETECTION layer for docs-claims drift. A release" checklist is merge authority, never detection (`agents/claims-conformance-auditor.md:10-11`). Fires "before merging or publishing any change that touches docs which assert facts" about the repository (`agents/claims-conformance-auditor.md:15`); in-framework it backs "> assembly gate (row F5)." of the beta-program spec §8 (`agents/claims-conformance-auditor.md:19-20`).

## How it works

- Cold seat: "You are a COLD conformance auditor. You are dispatched with ONLY the doc surface(s) to audit" and paths only (`agents/claims-conformance-auditor.md:31`); one question — does every factual claim match the repo right now (lines 33-34).
- "## Claim taxonomy (what is in scope)" (line 45): "- **counts** — «10 agents», «all 20 hooks», «6 dirs at the default depth»;" (line 50), existence/shipped, behaviour, and path/process claims; normative prose and already-gated generated sections are out (line 56).
- "## Method (no prose-only findings — per the [AI-laziness traps](../.claude/rules/ai-laziness-traps.md) cited below)" (line 60): "1. **Enumerate the claim population BEFORE verdicting** (T10): read the audited surface" (line 62), then "2. **Verify each claim against the LIVE source, never against another doc** (T3 +" (line 66) — command output first, `file:line` second; a second doc proves nothing (lines 69-73).
- "3. **Verdict per claim:**" (line 74) — VERIFIED / GAP (quote both doc line and probe output) / UNVERIFIABLE-needs-human.
- "## Output format" (line 84): per-claim rows (line 95: "  - <file:line> «<claim, verbatim, ≤15 words>» — VERIFIED (<file:line | command → output>)"), coverage line, "Overall: GO | REVISE | STOP — <one-line basis>" (line 99); "`GAP` → REVISE; population too small, surface unreadable, or claims not enumerable → STOP;" (line 88).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** reviewer-discipline clauses (line 38 heading) and the live-source posture from destination-environment-verification §1b (lines 66-68).
- **ADAPTS:** the dispatch-input-checker GO/REVISE/STOP verdict grammar (line 86-87).
- **ADDS:** the claim taxonomy + per-claim live-probe evidence rule; the dispatching session "folds `GAP` rows into fixes (owner-gated files get" patch proposals and cites the VERIFIED evidence (`agents/claims-conformance-auditor.md:102-103`).
- Census family satellites: **E6** (the encyclopedia's own claims-conformance pass dispatches this agent at a fresh pin); in-framework, the beta-program spec §8 assembly gate row F5 (lines 19-20).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/claims-conformance-auditor.md:2` — `name: claims-conformance-auditor`
- `agents/claims-conformance-auditor.md:3` — `description: Cold conformance audit of docs-site claims against shipped reality. Given ONLY the doc surface(s) to audit (never the authoring narrative), …`
- `agents/claims-conformance-auditor.md:21` — `> **Authoritative for:** the claims-conformance audit protocol — claim taxonomy, inputs,`
- `agents/claims-conformance-auditor.md:31` — `You are a COLD conformance auditor. You are dispatched with ONLY the doc surface(s) to audit`
- `agents/claims-conformance-auditor.md:45` — `## Claim taxonomy (what is in scope)`
- `agents/claims-conformance-auditor.md:62` — `1. **Enumerate the claim population BEFORE verdicting** (T10): read the audited surface`
- `agents/claims-conformance-auditor.md:66` — `2. **Verify each claim against the LIVE source, never against another doc** (T3 +`
- `agents/claims-conformance-auditor.md:74` — `3. **Verdict per claim:**`
- `agents/claims-conformance-auditor.md:99` — `Overall: GO | REVISE | STOP — <one-line basis>`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
