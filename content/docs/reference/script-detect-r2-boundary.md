---
title: "detect-r2-boundary.sh + r2-na-marker.sh — R2 boundary classifier"
description: "Classifies a repo into exactly one R2-boundary verdict (boundary-present / no-boundary-confident / ambiguous) by reading it in pure bash; ambiguous stays red — no auto-green on doubt. Its verdict feeds the installer and both inertness gates."
---

> **Census id:** F47 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F47: MISSING → drafted E4 — a two-script pair in one row; census satellite F43) |
| Ships-to | npm-lane — copied to consumer `scripts/` (`setup.d/40-configs.sh:33` detector, `:35` marker helper) |
| Fires-at | install auto-wire (C2) and the inertness gates (C4) — both consume its verdict |

## Invocation

`bash scripts/detect-r2-boundary.sh` from the project root — pure bash + find/grep, no node/eslint: `packages/core/audit-self/detect-r2-boundary.sh:4` «# Classifies a repo into exactly one R2-boundary verdict by READING it (pure bash + find/grep, no / # node/eslint).» The marker helper is sourced, not run: `packages/core/audit-self/r2-na-marker.sh:5` «# SOURCED by check-rule-globs.sh AND check-rule-enforced.sh so the two gates can NEVER diverge»; `:7` «# Defines two functions; sourcing has no side effects.»

## Exit codes

- **0** — a verdict was produced (all three verdicts exit 0; the verdict is the first stdout line, `:9` «# Verdicts (the FIRST stdout line is exactly one of):» — exits at `:109`, `:114`, `:118`).
- The marker helper's `r2_na_marker_present` → rc 0 iff the decision block exists (`r2-na-marker.sh:9-10`); `r2_na_recheck` echoes `holds` or `broke` (`:11-15`).

## What it probes

Whether the R2 boundary rule has anything to guard — with a conservative invariant. The verdicts: `:10-12` «#   boundary-present       — a manual-parse HTTP boundary exists: ≥1 file under a RULE_GLOBS.boundary / #                            token folder … OR a zod parse / #                            call … in NON-TEST source. R2 must be active.»; `:17-18` «#   no-boundary-confident  — declarative-validation framework (allowlist) present AND zero boundary / #                            signals. Safe to record a conditional R2 N/A.»; `:19-20` «#   ambiguous              — anything else. Stay red (today's behaviour). No auto-green on doubt.»; the load-bearing invariant: `:20` «# Conservative invariant (LOAD-BEARING): no-boundary-confident requires a POSITIVE allowlist match». Consumers: the installer and both inertness gates (`:5-6` «# The installer (C2, install.sh §6b-bis) and BOTH inertness gates (C4: check-rule- / # globs.sh + check-rule-enforced.sh via r2-na-marker.sh) consume the verdict»).

## Where it lives

Source: `packages/core/audit-self/detect-r2-boundary.sh` + `packages/core/audit-self/r2-na-marker.sh`. Consumer copies: `scripts/detect-r2-boundary.sh` + `scripts/r2-na-marker.sh` (npm-lane, `setup.d/40-configs.sh:33` / `:35`).
