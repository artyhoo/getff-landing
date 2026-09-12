---
title: "run-rule-tests-firing.sh — firing-test runner"
description: "Standing firing check for the enrichment-sidecar rule-test material (.ai-factory/rule-tests/<backend>.json): bad[] samples must fire, good[] must stay clean — RED exit 1 on broken material, loud no-op exit 0 when sidecars are absent."
---

> **Census id:** F53 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F53: MISSING → drafted E4; census satellite B4 — the rule-tests skill) |
| Ships-to | npm-lane — copied + chmod'd to consumer `scripts/` (`setup.d/40-configs.sh:66-67`) |
| Fires-at | standing channel (pre-push) — so repaired sidecar material fails there, not only on demand |

## Invocation

`bash scripts/run-rule-tests-firing.sh` (consumer copy) — it reads the enrichment sidecars `.ai-factory/rule-tests/<backend>.json`, the map `ruleId → { bad: string[], good: string[] }`: `packages/core/synthesizer/run-rule-tests-firing.sh:4-5` «# The consumer-side companion to run-generated-rule-mutation.sh (npm lane). Where the mutation / # runner verifies npm-lane `negative-test` material, THIS runner verifies the NON-npm test / # material that lives in the S2 enrichment sidecar `.ai-factory/rule-tests/<backend>.json`» / `:6` «# (map `ruleId → { bad: string[], good: string[] }`, rule-tests-sidecar.ts).»

## Exit codes

- **0** — all present-lane material fired correctly, or a loud skip: `:23-25` «#   - all sidecars absent                       → loud no-op, exit 0.» / «#                                                 green"), exit 0 (a skip must not block a push).» and the summary `:48` «# exit 0 = all present-lane material fired correctly OR loudly skipped; exit 1 = broken material.»
- **1** — broken material: `:41` «#   - bad[] sample does NOT fire, or good[]     → per-sample loud FAIL; overall exit 1 (RED).»
- Backend failure shapes are distinguished from material failure: `:39-40` «#       rule invalid (the RULE artifact is    → RED, never "fired" (astgrep exit 8 / / #         broken)                               non-JSON stdout; ruff config error, exit 2).»

## What it probes

That rule-test material still proves its rule fires — at a standing channel. Header: `packages/core/synthesizer/run-rule-tests-firing.sh:2` «# run-rule-tests-firing.sh — standing firing check for enrichment-sidecar rule-test material.»; the channel rationale: `:7-9` «# It exists so a / # hash-exempt repair of that material (spec §2) fails at a STANDING channel (pre-push) rather / # than only on an on-demand invocation — README earliest-reachable-channel / attention-is-not-a- / # mechanism.md §1 (`#hope-as-gate`).» The self-check discipline: `:84` «# sail through green). Prints the first violation reason to stderr and exits non-zero; exit 0 on a».

## Where it lives

Source: `packages/core/synthesizer/run-rule-tests-firing.sh` (with its paired test `run-rule-tests-firing.test.sh`). Consumer copy: `scripts/run-rule-tests-firing.sh` (npm-lane, `setup.d/40-configs.sh:66` «copy_safe "$PKG_ROOT/packages/core/synthesizer/run-rule-tests-firing.sh" "$PROJECT_ROOT/scripts/run-rule-tests-firing.sh"» + `:67` chmod).
