---
title: "egress-no-api-bypass — host-push-default egress"
description: "Class B rule: a finished aif-agent branch lands via host git push (running the real pre-push gate); the Git-Data-API path is break-glass only, with a mandatory local CI-sweep gate-substitute."
---

> **Census id:** F14 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F14: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «harvesting/egressing a finished aif-agent branch to a PR.» (`.claude/rules/egress-no-api-bypass.md:6`) — skill-embed (harvest §1) |

## What it bans

Landing branches through the Git-Data-API by default, silently skipping the pre-push gate. `.claude/rules/egress-no-api-bypass.md:1` «# Egress no-API-bypass — host-push-default discipline rule»; the origin: `:10` «The [/harvest] skill (#729) §1 step 4 "Push channel" prescribed **Git-Data-API land (`harvest-via-api.sh`) as the DEFAULT egress channel** … The operator flagged this as a **pre-push-gate bypass**: API-land creates the commit + ref server-side, so the local `.husky/pre-push` hook never runs (verified: `harvest-via-api.sh` = 9× `gh api`, 0 real `git push`).» Class header: `:5` «> **Class:** B — compensating mechanism without a CI test: the discipline is about **egress channel choice at harvest time** … The compensating mechanism is the [/harvest] §1 procedure (host-push default, API break-glass) + the existing [`scripts/run-local-ci-sweep.sh`] gate-substitute on the break-glass path.»

## Never (fires)

API-land chosen while host transport is alive: `.claude/rules/egress-no-api-bypass.md:24` «**Channel B — BREAK-GLASS ONLY: Git-Data-API land (`harvest-via-api.sh`).»** / `:26` «Used **solely when the host transport is ALSO dead** (no working `git push` from the host either). When taken, it is **not a free pass**: `scripts/run-local-ci-sweep.sh` is the mandatory gate-substitute». The invariant violated: `:22` «This is the default because the project invariant is "earliest reachable channel": host-push runs the literal pre-push hook before the PR exists; nothing later (CI, audit) is a substitute for the channel that fires first.»

## Always (clean)

Channel A, quoted: `.claude/rules/egress-no-api-bypass.md:14` «**Channel A — DEFAULT: host-pull + host `git push` (runs the real pre-push gate).**» with the steps at `:18-20` («1. Read the agent's `branchName` + commit … `git -C <container-worktree> bundle create` → `docker cp` → host `git fetch <bundle>`» … «3. `git push origin <branch>` **from the host**. The host has working transport + the full pre-push toolchain (`gh` / `actionlint` / `zizmor`), so `.husky/pre-push` runs for real»). Why the container cannot push — a feature: `:34` «The container **cannot push** — and that is a **feature, not a bug** (do NOT "fix the container push"):»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:22` «| `egress-no-api-bypass.md` | B | harvesting/egressing a finished aif-agent branch to a PR. | skill-embed |»
- **Skill-embed, one host:** `.claude/rules/egress-no-api-bypass.md:3` «<!-- channel: skill-embed .claude/skills/harvest/SKILL.md#egress -->» — the rule sets the preference, the skill owns the steps (`:40`).
- **Break-glass gate-substitute:** `scripts/run-local-ci-sweep.sh` mandatory on the API path (`:26`, `:55`).
- No CI test possible for the channel-choice itself (`:5` — «a branch-scoped CI run cannot assert "this branch was landed via the host pre-push hook rather than the Git-Data-API"»); promotion to a gate pre-declared at `:44`.
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: skill-embed + break-glass deterministic sweep + promotion trigger.
