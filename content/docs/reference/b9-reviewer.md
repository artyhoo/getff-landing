---
title: reviewer
description: Env+-tier skill for interactive review sessions with a GO/REVISE/STOP verdict — the orchestrator's QA partner protocol, with modes, economy defaults, and a severity-contract-bound verdict shape.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# reviewer

**Status:** shipped-beta · **Ships to:** `env+` tier arm (`GETFF_SKILLS_ENV`, `setup.d/lib.sh:62`) · **Fires at:** Claude Code skill auto-activation on review-ask triggers («проверь», «ревью», «вердикт», "is this correct?", "verify deliverable", …)

## What it is

The interactive review-session skill: "You are the orchestrator's interactive QA partner: they build → you verify → they move on" (`.claude/skills/reviewer/SKILL.md:21`). Its description scopes the deliverable as "a GO/REVISE/STOP verdict or a verified answer, not code", and excludes implementing fixes, writing tests, and the cold PR-boundary protocols (`.claude/skills/reviewer/SKILL.md:3`). The header pins what it layers over: reviewer-discipline role rules and the severity contract are owned by `.claude/rules/reviewer-discipline.md` (§6 operating SSOT) — "which this skill layers over, never re-describes" (`.claude/skills/reviewer/SKILL.md:9` header).

## How it works

Evidence discipline is explicit: "claims are verified through tools (file:line quotes, real command runs), never from memory or the orchestrator's narrative" (`.claude/skills/reviewer/SKILL.md:22-23` area). The `## Modes` section (`.claude/skills/reviewer/SKILL.md:25`) defines at least Question mode — answer `YES / NO / PARTIALLY` + one-line why + `file:line` evidence — and Deliverable-verification mode ("run the acceptance commands", line 217 area of the modes list). A `## Verdict shape (severity contract binding)` section (`.claude/skills/reviewer/SKILL.md:42`) binds output to the severity contract, followed by `## Economy default` (line 34) and `## Hard bounds` (line 66). Harness posture: portable — "prose review protocol over file reads + git" (`.claude/skills/reviewer/SKILL.md:6`).

## Satellites & companions

- **USES:** `.claude/rules/reviewer-discipline.md` (role separation + severity contract) — layered over, not re-described (SKILL.md:9 header).
- **ADAPTS:** the reviewer role for interactive sessions, as distinct from the dispatched cold auditors.
- **ADDS:** the session choreography — modes, economy defaults, verdict output shape — plus the trigger vocabulary that makes an interactive review reachable by phrase.
- Census family satellites: **C19** (shipped-agent-liveness-prober — the probe class that exercises shipped agents) and, via the NOT-authoritative header, the cold auditors `agents/fidelity-auditor.md` (census C8) and `agents/review-sidecar.md` (census C10).

## Anchors

- `.claude/skills/reviewer/SKILL.md:2` — `name: reviewer`
- `.claude/skills/reviewer/SKILL.md:3` — `description: Use when the operator or an orchestrator asks for an interactive review with a verdict — «проверь», … — and the deliverable is a GO/REVISE/STOP verdict or a verified answer, not code. …`
- `.claude/skills/reviewer/SKILL.md:6` — `<!-- @harness-posture: portable — prose review protocol over file reads + git; … -->`
- `.claude/skills/reviewer/SKILL.md:21` — `You are the orchestrator's interactive QA partner: they build → you verify → they move on.`
- `.claude/skills/reviewer/SKILL.md:25` — `## Modes`
- `.claude/skills/reviewer/SKILL.md:42` — `## Verdict shape (severity contract binding)`
- `setup.d/lib.sh:62` — `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
