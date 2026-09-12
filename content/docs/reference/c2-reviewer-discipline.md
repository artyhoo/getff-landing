---
title: reviewer-discipline
description: Review-session protocol for reviewer/orchestrator role separation — when a finding needs a project-strategy call, surface it as DECISION-NEEDED with both options described, never pick a side. Reports; does not decide.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# reviewer-discipline

**Status:** shipped-beta · **Ships to:** npm lane, `--profile factory` only (or legacy `--with-aif-suite`; an existing copy is refreshed in place) — gated by the agents arm case (`setup.d/20-agents.sh:39`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

The dispatched reviewer-session prompt: "> **Authoritative for:** `reviewer-discipline` sub-agent prompt — the review-session protocol for" the "reviewer/orchestrator role separation … condensed for a reviewer session to follow at run-moment; reporting-only." (`agents/reviewer-discipline.md:12-14`). It is a pointer, not a copy — the rule file stays SSOT and this agent is "is a thin protocol pointer, not a second copy). This is NOT the detection-mechanism agent the" rule's §5 reserves (`agents/reviewer-discipline.md:17`); that future verifier is named at line 19: "> (`agents/reviewer-discipline-verifier.md`, gated on 3+ documented role-swap incidents).". Its whole role in one line: "You report. You do **not** decide." (line 85).

## How it works

- §1: "## §1 — The discipline (do NOT cross into orchestrator-role decisions mid-session)" (line 41) — the fork gate; line 49: "You **can** describe what each path implies. You **cannot** pick between them."
- §2: "## §2 — Surface-as-decision-needed pattern" (line 56) — "1. **Name the decision explicitly**: `DECISION-NEEDED: <one-line summary>`" (line 60), then "3. **Flag that the answer needs the maintainer or a `/orchestrator` session**, not you." (line 63) and "4. **Stop.** Do not infer the maintainer's likely answer and proceed as if it were confirmed." (line 63).
- §3: "## §3 — Self-check before posting your verdict" (line 65) — converts strategy-imperative phrasing into the §2 format before posting.
- §4: "## §4 — Anti-patterns (see [.claude/rules/reviewer-discipline.md §3](../.claude/rules/reviewer-discipline.md) for full definitions)" (line 75), e.g. "- `#role-swap-mid-session` — making an orchestrator-track decision instead of surfacing it." (line 77).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `.claude/rules/reviewer-discipline.md` — the SSOT rule whose §1 discipline + §2 pattern this condenses (lines 15-17); the severity contract and triage rubric live in the rule's §6/§6.1, which peer auditors quote (e.g. `agents/review-sidecar.md:158`).
- **ADAPTS:** the rule into a run-moment session protocol (line 14: "pattern), condensed for a reviewer session to follow at run-moment; reporting-only.").
- **ADDS:** the DECISION-NEEDED output grammar plus the §3 self-check and §4 anti-pattern tags — and an explicit non-claim: it is not the gated future verifier (line 19).
- Census family satellites: **B9** (reviewer — the interactive env+-tier review skill layered over the same rule); **C1** (orchestrator-worker-discipline — carries a condensed reviewer-discipline layer for dispatched reviewers, `agents/orchestrator-worker-discipline.md:137`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/reviewer-discipline.md:2` — `name: reviewer-discipline`
- `agents/reviewer-discipline.md:3` — `description: Review-session protocol for reviewer/orchestrator role separation — when a finding needs a project-strategy call, surface it as DECISION-NEEDED …`
- `agents/reviewer-discipline.md:12` — `> **Authoritative for:** `reviewer-discipline` sub-agent prompt — the review-session protocol for`
- `agents/reviewer-discipline.md:17` — `> is a thin protocol pointer, not a second copy). This is NOT the detection-mechanism agent the`
- `agents/reviewer-discipline.md:19` — `> (`agents/reviewer-discipline-verifier.md`, gated on 3+ documented role-swap incidents).`
- `agents/reviewer-discipline.md:49` — `You **can** describe what each path implies. You **cannot** pick between them.`
- `agents/reviewer-discipline.md:60` — `1. **Name the decision explicitly**: `DECISION-NEEDED: <one-line summary>.``
- `agents/reviewer-discipline.md:63` — `4. **Stop.** Do not infer the maintainer's likely answer and proceed as if it were confirmed.`
- `agents/reviewer-discipline.md:77` — `- `#role-swap-mid-session` — making an orchestrator-track decision instead of surfacing it.`
- `agents/reviewer-discipline.md:85` — `You report. You do **not** decide.`
- `setup.d/20-agents.sh:33` — `orchestrator-worker-discipline.md|reviewer-discipline.md)`
- `setup.d/20-agents.sh:39` — `if [ "${PROFILE:-core}" != "factory" ] && [ -z "${WITH_AIF_SUITE:-}" ] \`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
