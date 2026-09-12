---
title: "bridge operator scripts (scripts/ quartet)"
description: "Census H22 — setup-runtime-bridge, bridge-health, verify-bridge, bridge-cleanup: the clone-side bash tooling that sets up, probes, smoke-tests, and cleans up after the aif bridge."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge operator scripts (scripts/ quartet)

**Status:** shipped-beta · **Ships to:** clone (operator tooling — `packages/runtime-bridge/scripts/` is not part of the vendored consumer subset) · **Fires at:** run by the operator — setup at configuration time, health at session start, verify on demand ("did it actually work?"), cleanup when probe junk piles up.

## What it is

Four bash scripts enumerated by `ls packages/runtime-bridge/scripts/` → `bridge-cleanup.sh bridge-health.sh setup-runtime-bridge.sh verify-bridge.sh` (census enumeration, verified at pin). Two of them exist for the same documented reason (qloop-ux-probe 2026-06-01): "the costly, recurring bugs lived on the host↔container↔aif boundary that neither unit tests nor CI cover (a full agent run costs LLM tokens → no-paid-llm-in-ci). They were only ever found by a live probe MID-TASK" (`scripts/bridge-health.sh:3-6`).

## How it works

**setup-runtime-bridge.sh** — "interactive consumer setup for the runtime bridge. Phase 1 scope: aif-handoff-or-skip (2-way). amux is Phase 2 (SW-H), not here" (`scripts/setup-runtime-bridge.sh:2-4`). "DETECT + INSTRUCT — never auto-installs aif-handoff": (1) "Probes whether an aif-handoff coordinator is reachable on RUNTIME_BRIDGE_AIF_URL"; (2) asks whether to enable the bridge (`:5-9`).

**bridge-health.sh** — "deterministic CONTAINER-side health check for the aif bridge … run it at session start (or after any bridge change) and get \"bridge red, fix first\"" (`scripts/bridge-health.sh:2-7`) — a $0 pre-flight for the boundary class unit tests can't cover.

**verify-bridge.sh** — "paste-and-run smoke test for the runtime bridge (REST dispatch) … the operator's \"did it actually work?\" check … It creates ONE throwaway task on your aif-handoff project and deletes it again" (`scripts/verify-bridge.sh:2-6`); exit/PASS-FAIL readable without an agent run.

**bridge-cleanup.sh** — "nuke the test/probe junk the bridge accrues each session … probe/smoke runs leave orphan aif tasks, /tmp ManualBackend kickoffs, and dedup-store cruft behind every session. This is the one-command sweep … It deletes ONLY clearly-test artefacts (title matches the test allowlist); real work is never touched" (`scripts/bridge-cleanup.sh:2-6`).

**Fail mode / which channel fails:** each script reports on its own stdout/stderr and exit code — health/verify are the FAILURE DETECTORS (red ⇒ fix before dispatch), cleanup is best-effort by design (test artefacts only), setup refuses to auto-install anything.

## Satellites & companions

Health/verify exercise the same REST surface as the CLIs (H2, H11); cleanup sweeps the dedup log (H18) and ManualBackend /tmp artefacts (H17); the boundary bugs they probe are the ones the vitest suite cannot reach (H23).

## Anchors

- `packages/runtime-bridge/scripts/setup-runtime-bridge.sh:2` — «# setup-runtime-bridge.sh — interactive consumer setup for the runtime bridge.»
- `packages/runtime-bridge/scripts/bridge-health.sh:2` — «# bridge-health.sh — $0 deterministic CONTAINER-side health check for the aif bridge.»
- `packages/runtime-bridge/scripts/verify-bridge.sh:2` — «# verify-bridge.sh — paste-and-run smoke test for the runtime bridge (REST dispatch).»
- `packages/runtime-bridge/scripts/bridge-cleanup.sh:2` — «# bridge-cleanup.sh — nuke the test/probe junk the bridge accrues each session.»
