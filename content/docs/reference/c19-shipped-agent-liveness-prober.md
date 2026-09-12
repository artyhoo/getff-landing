---
title: shipped-agent-liveness-prober
description: Probes each shipped sub-agent for behavioural liveness via with/without-tools fresh-subagent dispatch, capturing a RED→GREEN delta (tool-less fabricates → tool-using cites real evidence); status DORMANT, operator-initiated only.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# shipped-agent-liveness-prober

**Status:** shipped-beta (framework-side authoring tool) · **Ships to:** `clone` — excluded from consumer delivery (`setup.d/20-agents.sh:27` case-skip, "M2 probe, #552 sibling") · **Fires at:** operator-initiated only — header status DORMANT, "never a CI gate, never a required merge step" (`agents/shipped-agent-liveness-prober.md:14-19`)

## What it is

Session-bound RED→GREEN behavioural liveness probe for the framework's shipped sub-agents: dispatch a fresh subagent without tools (expect fabrication / no `tool_uses`), then with the agent fully loaded (expect `tool_uses > 0` and real `file:line` citations), and report the delta (`agents/shipped-agent-liveness-prober.md:11`). Principle 21's M1 gate (shipped #576) form-checks `tools:` NAMES are CC-canonical; this M2 probe checks that a validly-named agent actually uses its tools — "Structure is the floor (M1); behaviour is the proof (this M2 probe)" (`agents/shipped-agent-liveness-prober.md:29`). Built build-only under T-M2PROBE-A: the RED→GREEN deltas are a design specification, not a verified observation; the first operator run is the honest point of validation (`agents/shipped-agent-liveness-prober.md:21-25`).

## How it works

- **Dormancy.** Promotion trigger (§5.2): a 2nd dispatch-fabrication incident (after #551) OR #550 post-install acceptance ships — both UNFIRED as of 2026-06-16; until then the probe is a ready-to-run artifact an operator MAY invoke voluntarily (`agents/shipped-agent-liveness-prober.md:14-19`).
- **Shipped surface — derived, never hardcoded.** The authoritative shipped surface is install.sh §2's `for f in "$PKG_ROOT"/agents/*.md` loop minus the case skip-arms; the `all` keyword iterates exactly that verified set (`agents/shipped-agent-liveness-prober.md:43`, `:71`). Boundary that matters: "an authoring-only agent fabricating findings costs the maintainer; a shipped agent fabricating findings costs the consumer" (`agents/shipped-agent-liveness-prober.md:71`).
- **Per-agent fixtures.** For each agent: read `agents/<slug>.md` frontmatter (`tools:`, description) and the fixture at `tests/fixtures/shipped-agent-liveness/<slug>.md` (`task-prompt`, `observable-failure`, `observable-compliance`), quoted verbatim with `file:line` in the report preamble (`agents/shipped-agent-liveness-prober.md:88-95`).
- **Two passes, fresh contexts.** Pass 1 tool-less (`tools: []` — the #551 state) must show fabricated findings or a decline; Pass 2 with the full declared tool set must show `tool_uses > 0` plus a real `file:line` reachable only via a tool call (`agents/shipped-agent-liveness-prober.md:111-130`).
- **Verdicts.** LIVE / BASELINE-DIDN'T-FAIL / WITH-TOOLS-DIDN'T-COMPLY / DISPATCH-INFEASIBLE (PARK) (`agents/shipped-agent-liveness-prober.md:138-141`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** principle 21's M1 form-gate as the CI floor it complements; install.sh §2 as the shipped-surface SSOT (`agents/shipped-agent-liveness-prober.md:12`).
- **ADAPTS:** manual-rule-liveness-prober (#115) — same fresh-subagent-per-pass, isolated-context machinery, retargeted from "does this rule change behaviour?" to "does this shipped agent use its declared tools?" (`agents/shipped-agent-liveness-prober.md:195`).
- **ADDS:** the behavioural counterfactual to #551 — M1 caught it by form; this probe would have caught it by behaviour, because with `tools: []` the agent IS in its RED state (`agents/shipped-agent-liveness-prober.md:207-211`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/shipped-agent-liveness-prober.md:2` — `name: shipped-agent-liveness-prober`
- `agents/shipped-agent-liveness-prober.md:3` — `description: Probes each shipped sub-agent for behavioural liveness via with/without-tools fresh-subagent dispatch, capturing a RED→GREEN delta …`
- `setup.d/20-agents.sh:27` — `shipped-agent-liveness-prober.md) continue ;;  # authoring-only tool (M2 probe, #552 sibling)`
- `agents/shipped-agent-liveness-prober.md:11` — ``> **Authoritative for:** `shipped-agent-liveness-prober` sub-agent prompt — the session-bound RED→GREEN behavioural liveness probe for the framework's shipped sub-agents …``
- `agents/shipped-agent-liveness-prober.md:14` — `> **Status: DORMANT** — not a mandatory step. Promotion trigger (§5.2 of`
- `agents/shipped-agent-liveness-prober.md:29` — ``The point of this role: principle 21's mechanical gate (M1, shipped #576) proves shipped agents' `tools:` NAMES are CC-canonical — a **form-check**. …``
- `agents/shipped-agent-liveness-prober.md:43` — ``**Do NOT use a hardcoded list.** The authoritative shipped surface is defined by `install.sh` §2's `for f in "$PKG_ROOT"/agents/*.md` loop …``
- `agents/shipped-agent-liveness-prober.md:138` — ``- **LIVE (PASS):** Pass 1 exhibited the `observable-failure` (or a clear decline) AND Pass 2 exhibited the `observable-compliance` with `tool_uses > 0`. …``

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
