---
title: "check-arch-boundaries.sh — the R3 inertness alarm"
description: "Fails when the shipped dependency-cruiser boundary rules are silently inert on the consumer's layout — the R3 counterpart of check-rule-globs; non-monorepo layouts exit 0, an inert apps/+packages/ boundary set exits 1."
---

> **Census id:** F48 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F48: MISSING → drafted E4) |
| Ships-to | npm-lane — copied + chmod'd to consumer `scripts/` (`setup.d/40-configs.sh:42-43`) |
| Fires-at | consumer audit runs / pre-merge — anywhere `arch:check` results need an inertness cross-check |

## Invocation

`bash scripts/check-arch-boundaries.sh` from the consumer project root (npm-lane copy; reads the consumer's `.dependency-cruiser.cjs`).

## Exit codes

- **0** — either not an apps/+packages monorepo (nothing to alarm on — exits at `packages/core/audit-self/check-arch-boundaries.sh:23`, `:37`, `:47`) or the boundaries are genuinely wired.
- **1** — the alarm: a monorepo layout whose boundary rules match nothing — `:54` «exit 1» is the fail arm of the monorepo check.

## What it probes

Silent inertness of path-keyed architecture rules. Header: `packages/core/audit-self/check-arch-boundaries.sh:2` «# check-arch-boundaries.sh — GH #534. The R3 inertness alarm, parallel to check:globs (R2).»; the failure mode: `:4-7` «# The shipped .dependency-cruiser.cjs carries layered + monorepo boundary rules, but every rule is / # PATH-keyed and silently INERT on a layout it doesn't match. On a pnpm-workspace monorepo (apps/* + / # packages/*) the boundaries that matter are packages↛apps and apps↔apps — and if the consumer's / # arch config carries no such rule … `arch:check` passes GREEN while those imports go unguarded.»; why R3 needed its own detector: `:9-11` «# Unlike R2 — where check:globs loudly fails on a rule that matches zero files — R3 had NO detector, / # so the inertness was silent. This gate is that alarm: on an apps/+packages/ monorepo it FAILS when».

## Where it lives

Source: `packages/core/audit-self/check-arch-boundaries.sh`. Consumer copy: `scripts/check-arch-boundaries.sh` (npm-lane, `setup.d/40-configs.sh:42` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-arch-boundaries.sh" "$PROJECT_ROOT/scripts/check-arch-boundaries.sh"» + `:43` chmod).
