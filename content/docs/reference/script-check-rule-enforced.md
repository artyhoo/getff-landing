---
title: "check-rule-enforced.sh — the +E deep gate"
description: "Resolves the ACTUALLY-APPLIED ESLint config for a representative boundary file and proves R2 really binds — closing check-rule-globs' monorepo blind spot; SKIPs (exit 0) when eslint is absent; sourced r2-na-marker honours a recorded R2 N/A."
---

> **Census id:** F46 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F46: MISSING → drafted E4; census satellite F45 — check-rule-globs) |
| Ships-to | npm-lane — copied + chmod'd to consumer `scripts/` (`setup.d/40-configs.sh:27-28`) |
| Fires-at | consumer audit runs (the deep arm after check-rule-globs) |

## Invocation

`bash scripts/check-rule-enforced.sh` from the project root (consumer path after the npm-lane copy; the script guards its own CWD: `packages/core/audit-self/check-rule-enforced.sh:70` «[ -f "$CFG" ] || { echo "check-rule-enforced: $CFG not found (run from the project root)" >&2; exit 2; }»).

## Exit codes

- **0** — R2 binds on the resolved config, or a legitimate skip: `:19` «# degrades to a clear SKIP (exit 0) when eslint is absent so a pre-install standalone run is not a»; the N/A-holds verdict `:81` «    holds) echo "▶ check-rule-enforced: R2 N/A recorded for this layout — precondition holds (declarative validation)."; echo "check-rule-enforced: OK"; exit 0 ;;».
- **1** — failure: the rule is marked N/A but a boundary now exists (`:82` «    broke) echo "  ✗ check-rule-enforced: R2 marked N/A in $R2_DECISIONS_FILE but a parse boundary now exists — wire R2 or update the decision." >&2; echo "check-rule-enforced: FAILED — stale R2 N/A marker." >&2; exit 1 ;;») or any probe fails — aggregation rule: `:45` «# SKIPs (exit 0), the correct deps-free degrade. Aggregate exit codes (any non-zero → non-zero).»
- **2** — invoked from the wrong directory (`:70`).

## What it probes

That a custom rule actually BINDS, not merely matches files. Header: `packages/core/audit-self/check-rule-enforced.sh:2` «# check-rule-enforced.sh — GH #535. The "+E" deep gate that closes check:globs' blind spot.»; the blind spot: `:6-9` «# on a monorepo whose packages ship their OWN eslint.config.* re-exporting a shared base that does / # NOT wire R2, the rule never actually BINDS — yet `npm run validate` stays green … check:globs / # can only WARN on a re-export it cannot follow»; the fix: `:11` «# This gate resolves the ACTUALLY-APPLIED config for a representative boundary file in each config». The shared N/A marker reader: `packages/core/audit-self/r2-na-marker.sh:3` «# r2-na-marker.sh — shared C3-marker reader for the R2 inertness gates (GH #547 Point 2).» / `:5-6` «# SOURCED by check-rule-globs.sh AND check-rule-enforced.sh so the two gates can NEVER diverge on / # whether/how they honor a recorded `R2 N/A` decision».

## Where it lives

Source: `packages/core/audit-self/check-rule-enforced.sh` (+ helper `r2-na-marker.sh`, both in `packages/core/audit-self/`). Consumer copies: `scripts/check-rule-enforced.sh` + `scripts/r2-na-marker.sh` (npm-lane, `setup.d/40-configs.sh:27` and `:35`).
