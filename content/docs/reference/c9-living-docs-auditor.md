---
title: living-docs-auditor
description: Runs scripts/audit-ai-docs.sh and reports findings. Catches backward Living-Documentation drift — whether AGENTS.md/RULES.md rules still hold in the actual code. Reports; does not fix.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# living-docs-auditor

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

"> **Authoritative for:** `living-docs-auditor` sub-agent prompt — runs `audit-ai-docs.sh` and reports backward Living-Documentation drift …" between `AGENTS.md`/`RULES.md` rules and code; reporting-only (`agents/living-docs-auditor.md:10`). The job in one line: "You enforce **code-vs-docs consistency**: rules declared in `AGENTS.md` must hold in the actual code. …" (`agents/living-docs-auditor.md:13`). The name is the de-collision record: "#   - docs-auditor — RENAMED to living-docs-auditor (de-collides with AIF's same-named agent)." (`setup.d/20-agents.sh:14`); the agent header carries the same note — "(Renamed from `docs-auditor` to coexist with AI Factory's same-named, different-job agent.)" (line 10 tail).

## How it works

- Mechanism: "The mechanism is `scripts/audit-ai-docs.sh` (or `scripts/audit-ai-docs.react-next.sh` for UI projects). …" (`agents/living-docs-auditor.md:15`).
- "### Step 1: Detect which audit script applies" (line 23) — Next.js/React detection selects the react-next script (lines 27-33).
- "### Step 2: Verify the script exists" (line 37): `[ -f "$SCRIPT" ] || {` (`agents/living-docs-auditor.md:39`) — graceful degradation, "echo "INFO: $SCRIPT not present in this project."" (line 41).
- "### Step 4: Parse output" (line 53): "- `PASS: R<N>: <rule name>` — rule satisfied (e.g. `PASS: R7: Time/randomness injected via Clock/Random`)" (line 57), "- `FAIL: R<N>: <rule name>` followed by indented violation lines (`file:line: details`)" (line 58); "- `R1`–`R9` map to rules in `.ai-factory/RULES.md`." (line 63).
- Auxiliary drift checks (§5.1-5.5, line 128 heading) run even when the script is absent (line 170).
- "## Rules of engagement" (line 167): "- **You don't modify code.** You don't even modify the audit script. Only run and report." (line 169); "- **WARN ≠ block.** Decay-watch warnings inform but don't block. Only FAIL blocks `/aif-verify`." (line 173).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `scripts/audit-ai-docs.sh` / `audit-ai-docs.react-next.sh` (line 15) and `.ai-factory/RULES.md` / `RULES.react-next.md` probe mappings (lines 63-64).
- **ADAPTS:** the AIF installer's script population in consumer projects — in the source project the script is absent and Step-2 degradation applies (frontmatter description block, lines 4-5).
- **ADDS:** the translation layer from raw probe output to PASS/FAIL/WARN verdicts plus the auxiliary awk/grep drift checks (lines 128-163); the reporting-only engagement rules (lines 167-174).
- Census family satellites: **F28** (audit script family — the `audit-ai-docs.sh` scripts this agent executes).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/living-docs-auditor.md:2` — `name: living-docs-auditor`
- `agents/living-docs-auditor.md:3` — `description: >-`
- `agents/living-docs-auditor.md:4` — `Runs scripts/audit-ai-docs.sh and reports findings. Catches backward Living-Documentation drift — whether AGENTS.md/RULES.md rules still hold …`
- `agents/living-docs-auditor.md:10` — `> **Authoritative for:** `living-docs-auditor` sub-agent prompt — runs `audit-ai-docs.sh` and reports backward Living-Documentation drift …`
- `agents/living-docs-auditor.md:15` — `The mechanism is `scripts/audit-ai-docs.sh` (or `scripts/audit-ai-docs.react-next.sh` for UI projects). …`
- `agents/living-docs-auditor.md:23` — `### Step 1: Detect which audit script applies`
- `agents/living-docs-auditor.md:39` — `[ -f "$SCRIPT" ] || {`
- `agents/living-docs-auditor.md:53` — `### Step 4: Parse output`
- `agents/living-docs-auditor.md:63` — `- `R1`–`R9` map to rules in `.ai-factory/RULES.md`.`
- `agents/living-docs-auditor.md:169` — `- **You don't modify code.** You don't even modify the audit script. Only run and report.`
- `setup.d/20-agents.sh:14` — `#   - docs-auditor — RENAMED to living-docs-auditor (de-collides with AIF's same-named agent).`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
