---
title: "check-shields-up.sh — husky shields prober"
description: "Proves the installed husky shields are wired and active: core.hooksPath resolves to a real .husky dir, pre-commit runs lint-staged, pre-push references the dispatcher — PASS/FAIL/SKIP tally, exit 0 with the tally printed."
---

> **Census id:** F51 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F51: MISSING → drafted E4) |
| Ships-to | npm-lane — copied + chmod'd to consumer `scripts/` (`setup.d/40-configs.sh:57-58`) |
| Fires-at | consumer verification runs — post-install proof the hook shields are live |

## Invocation

`bash scripts/check-shields-up.sh` from the consumer project root (npm-lane copy).

## Exit codes

- **0** — probe completed; the tally line carries the verdict shape: `packages/core/audit-self/check-shields-up.sh:48` «  echo ""; echo "PASS=$PASS FAIL=$FAIL SKIP=$SKIP"; exit 0» (and the second tally arm `:53`). A FAIL>0 tally is the signal a human/agent reads — the script reports rather than aborts, so it composes inside larger audit runs.
- The three assertions are itemised in the header (`:3-7`).

## What it probes

That the enforcement shell actually fires — not just that files exist. Header: `packages/core/audit-self/check-shields-up.sh:2` «# check-shields-up.sh — prove installed Husky shields are wired and active.»; the assertions: `:4-5` «#   1. git core.hooksPath RESOLVES to an existing husky hooks dir — '<root>/.husky' (husky v8) / #      or '<root>/.husky/_' (husky v9). Resolution, not string equality: see the block at / #      "Check 1" below for the measurement that forced this.»; `:6-7` «#   2. .husky/pre-commit exists, is executable, and references 'lint-staged' (the gate command) / #   3. .husky/pre-push exists, is executable, and references the pre-push dispatcher».

## Where it lives

Source: `packages/core/audit-self/check-shields-up.sh`. Consumer copy: `scripts/check-shields-up.sh` (npm-lane, `setup.d/40-configs.sh:57` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-shields-up.sh" "$PROJECT_ROOT/scripts/check-shields-up.sh"» + `:58` chmod).
