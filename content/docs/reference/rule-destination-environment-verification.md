---
title: "destination-environment-verification — verify the destination env"
description: "Class B rule: a dispatched worker's environment is not where work is accepted — kickoffs declare host-verify command blocks, the runner exits 0/1/2, and negative-existence claims about the destination must quote a live probe."
---

> **Census id:** F10 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F10: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «kickoff authoring; accepting container work; a cannot-reach claim.» (`.claude/rules/destination-environment-verification.md:13`) — paths:(1) + edit-time inject |

## What it bans

Accepting container-produced work on container evidence, and environment claims made without probing the environment. `.claude/rules/destination-environment-verification.md:7` «# Destination-environment verification — discipline rule»; the contract: `:21` «A kickoff under `.claude/orchestrator-prompts/<umbrella>/kickoff.md` MUST declare the commands» / «whose result decides acceptance, **as they will be run on the host**, inside a fenced block whose» / «info-string carries the `host-verify` marker:» — the grammar example at `:26-28` (``` ```bash host-verify ``` with a vitest invocation). Opt-out is explicit, never silent: `:41` «A kickoff with no executable deliverable opts out **explicitly**, never by silence:» with the `<!-- host-verify: none — … -->` form at `:44` and a «rationale must be ≥20 characters» floor at `:47`. The §1b obligation: `:75` «In a dispatch input, a claim that the destination lacks a capability, a path,» / «a tool, or a network route MUST carry, on the claim or in its block:» `:78` «1. **the probe** — a command executed against the **live destination**».

## Never (fires)

`.claude/rules/destination-environment-verification.md:167` «- **`#container-green-as-acceptance`** — accepting work because the suite passed where the worker ran it. Counter: §1 contract + `host-verify.sh`; quote the host output, not the worker's.»; `:173` «- **`#silent-contract-skip`** — a missing contract treated as "nothing to verify". Counter: the runner exits **2** on a missing block and the gate rejects the kickoff; silence is never a pass.»; `:175` «- **`#optout-as-reflex`** — reaching for `host-verify: none` because it is the shortest path past the gate.»; `:195` «- **`#destination-limit-by-inference`** (§1b, added 2026-08-09) — asserting that the destination» (a negative-existence claim without a live probe). A missing contract is fail-closed: `:53` «**2 = no contract found, a no-op-only contract, or a too-short opt-out**. A missing contract is a FAIL, not a pass — fail-closed, because "nobody declared anything" is precisely the state this rule exists to end.»

## Always (clean)

A kickoff whose contract exists and passes on the host: `:51` «**Running it:** `bash scripts/host-verify.sh <umbrella>` (or a kickoff path). Exit 0 = every declared command passed on this host, OR a valid opt-out was found; 1 = one failed;». Grammar lives in one place — the runner is the single implementation, the gate a thin caller: `:57` «**Grammar lives in one place.** Both contract extraction AND opt-out recognition live in `host-verify.sh`. … so the gate and the runner cannot disagree about what counts as a contract or an opt-out». Class header (honest status): `:12` «> **Class:** B — the mechanism is (a) the edit-time gate `check-kickoff-traps.sh` arm 1 … plus (b) the runner [`scripts/host-verify.sh`] … plus — since the 2026-08-21 retrofit — (c) the population principle test [`packages/core/principles/43-kickoff-host-verify-presence.test.ts`] … Class A is **not yet reached**: nothing forces the runner to be *invoked* before acceptance».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:18` «| `destination-environment-verification.md` | B | kickoff authoring; accepting container work; a cannot-reach claim. | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/destination-environment-verification.md:9` «<!-- globs: .claude/orchestrator-prompts/** -->» with the full inject text at `:10` (contract grammar + §1b probe requirement).
- **Edit-time gate:** `check-kickoff-traps.sh` arm 1, paired-negative at `packages/core/hooks/check-kickoff-traps.test.ts` (`:12`).
- **Runner:** `scripts/host-verify.sh` — exit 0 / 1 / 2 semantics (`:51-55`); coverage emission `scripts/host-verify-coverage.sh` wired at `agents/dispatch-input-checker.md` K6 (`:186-187`).
- **CI principle test:** `packages/core/principles/43-kickoff-host-verify-presence.test.ts` — «contract-or-opt-out over the whole *tracked* kickoff family» (`:12`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: gate checks presence, runner execution remains an orchestrator duty (§5, unclosed half stated at `:162-163`).
