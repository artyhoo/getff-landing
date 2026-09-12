---
title: manual-rule-liveness-prober
description: Probes a manifest manual rule for liveness via with/without-rule fresh-subagent dispatch, capturing a RED→GREEN delta (baseline fails → rule-loaded complies); session-bound, reporting-only, never CI.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# manual-rule-liveness-prober

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:26` case-skip, `#552`) · **Fires at:** operator-run in a framework session, top-level only (`claude --agent`, not a dispatched subagent — `agents/manual-rule-liveness-prober.md:130`); never wired into CI (`:131`)

## What it is

Session-bound RED→GREEN liveness probe for manifest manual rules (`check.type==='manual'`): dispatch a fresh subagent without the rule (expect the `observable-failure`), then with the rule's policy text loaded (expect the `observable-compliance`), and report the delta (`agents/manual-rule-liveness-prober.md:11`). It closes the gap principle 02 leaves open — the mechanical gate proves structural liveness only; "Structure is the floor; behaviour is the proof" (`agents/manual-rule-liveness-prober.md:18`). Reporting-only: no edits to manifest, rule text, or source; the only artefact is a probe report (`agents/manual-rule-liveness-prober.md:20`).

## How it works

- **Why not CI.** A fresh subagent per pass is an LLM dispatch on the operator's own subscription; no paid LLM call may run in CI, so the probe is session-bound and operator-initiated (`agents/manual-rule-liveness-prober.md:26`).
- **Input.** A single manual rule id or the keyword `all`; the manual rules at time of writing are `R10`/`R13`/`R18` (code-grep-shaped, demoable) and `IR5`/`IR6` (runtime-shaped, behavioural demo deferred) (`agents/manual-rule-liveness-prober.md:32-43`).
- **Two-source scenario lookup.** Pressure-scenarios read first from `.ai-factory/generated-scenarios.json` (validated generated scenarios), falling back to `packages/core/manifest/rules-manifest.json` (`agents/manual-rule-liveness-prober.md:47-50`).
- **Demoability split.** code-grep-shaped rules run the full RED→GREEN dispatch; runtime-shaped rules report structural-validation-only — "Do NOT run a text RED→GREEN on the code-marker and present it as proof of runtime liveness" (`agents/manual-rule-liveness-prober.md:66-69`).
- **Verdicts.** Exactly one of LIVE (the only verdict that proves liveness), BASELINE-DIDN'T-FAIL (T-V3-B — strengthen the baseline and re-run, never conclude redundancy from one non-failing baseline), WITH-RULE-DIDN'T-COMPLY, RUNTIME-SHAPED (DEFERRED) (`agents/manual-rule-liveness-prober.md:90-95`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the pressure-scenario contract (rules-manifest.schema.json + principle 02) and the manifest's fixed pressure vocabulary `time` / `authority` / `sunk-cost` / `scope-creep` (`agents/manual-rule-liveness-prober.md:57`).
- **ADAPTS:** Superpowers `writing-skills` pressure-scenario methodology — "same RED→GREEN mechanism, different artifact": a SKILL that imparts a capability vs. a RULE that constrains a behaviour (`agents/manual-rule-liveness-prober.md:125`).
- **ADDS:** the behavioural channel of two-channel liveness — principle 02 is the structural gate; running this prober on `R10`/`R13`/`R18` is the behavioural proof (`agents/manual-rule-liveness-prober.md:140-141`).
- Census satellite: **B3**. The two later probers (shipped-agent C19, getff-cold-run C20) reuse its fresh-subagent-per-pass machinery as their ADAPT source.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/manual-rule-liveness-prober.md:2` — `name: manual-rule-liveness-prober`
- `agents/manual-rule-liveness-prober.md:3` — `description: Probes a manifest manual rule for liveness via with/without-rule fresh-subagent dispatch, capturing a RED→GREEN delta …`
- `setup.d/20-agents.sh:26` — `manual-rule-liveness-prober.md) continue ;;  # authoring-only tool (#552)`
- `agents/manual-rule-liveness-prober.md:11` — ``> **Authoritative for:** the `manual-rule-liveness-prober` sub-agent prompt — the session-bound RED→GREEN liveness probe for manifest manual rules …``
- `agents/manual-rule-liveness-prober.md:18` — `The point of this role: principle 02's mechanical gate proves a manual rule _has_ a well-formed pressure-scenario (structural liveness …`
- `agents/manual-rule-liveness-prober.md:45` — `## Step 1 — Load the rule's pressure-scenario + policy text`
- `agents/manual-rule-liveness-prober.md:66` — `## Step 2 — Classify demoability (do this BEFORE dispatching)`
- `agents/manual-rule-liveness-prober.md:88` — `## Step 5 — Compute and report the RED→GREEN delta`
- `agents/manual-rule-liveness-prober.md:130` — ``- **Top-level only.** Must be invoked via top-level `claude --agent`, not as a dispatched subagent (a normal CC subagent cannot spawn subagents). …``

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
