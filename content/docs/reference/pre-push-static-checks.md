---
title: "pre-push static check trio (prior-art, s17, unpinned-tool-install)"
description: "Census D23 — the three statically imported check modules the TS-core pre-push hook runs on every push, plus the declarative check registry the bash fallback and tests consume."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# pre-push static check trio (prior-art, s17, unpinned-tool-install)

**Status:** shipped-beta · **Ships to:** npm-lane consumers — the installer copies the trio (with the rest of the TS-core import graph) into `packages/core/hooks/checks/` (`setup.d/50-hooks.sh:30-32`) · **Fires at:** every `git push`, inside the TS-core pre-push gate (Node ≥20 arm of the `.husky/pre-push` dispatcher).

## What it is

Three check modules statically imported by `packages/core/hooks/pre-push.ts` — the "static check trio" of the shipped consumer graph: `checks/prior-art.ts` (the §7 Prior-art trailer check), `checks/s17.ts` (the §1.7 discipline-trailer check), `checks/unpinned-tool-install.ts` (the bare-run unpinned CI-tool install gate). Beside them sits `checks/registry.ts`, a declarative check registry that decouples check-set selection from execution for the bash fallback and the test suite.

## How it works

**prior-art.ts** validates `Prior-art:` trailers on capability commits: capability-commit detection + trailer validation (length, placeholder rejection, escape-hatch substance arm), a "Faithful TS port of `pa_*` from the former legacy-trailer-checks.sh" (`packages/core/hooks/checks/prior-art.ts:2-5`). The SSOT-existence arm checks that a `prior-art-evaluations.md#N` citation "actually resolves to a real SSOT row — not merely that the trailer is present" (`:11-14`); commits authored before the Wave 8.5 cutoff `2026-05-12` bypass the check (`:22`).

**s17.ts** detects rule/principle/SKILL-introducing commits and validates the `§1.7:` forward/backward trailer, "including the Bootstrap exemption (B1), the Wave 8.3 file:line substance arm, and the Wave 9.4 body-prose detection" (`packages/core/hooks/checks/s17.ts:4-7`); doc-only prefixes (`docs(research-patches)`, `chore(snapshot-regen)`, `chore(prior-art-update)`) bypass via the allow-list regex (`:17-19`). Same historical cutoff (`:15`).

**unpinned-tool-install.ts** scans `.github/workflows/*.yml` for bare `run:` shell commands that install a tool "WITHOUT an explicit version pin" — a slice "NOT covered by zizmor's `adhoc-packages` audit" (`packages/core/hooks/checks/unpinned-tool-install.ts:9-13`); scope widened 2026-07-10 to executable shell scripts in the framework repo after the retired `setup.sh` bare `npm install -g` incident (`:15-19`).

**registry.ts** is "a pure data table — no control flow" (`packages/core/hooks/checks/registry.ts:6`) consumed by `pre-push.fallback.sh` ("bash iterates `criticalForFallback: true` entries", `:9-10`) and `registry.test.ts`; `pre-push.ts` itself "currently uses direct function calls" (`:13-14`).

**Fail mode / which channel fails:** all three are in-process imports of the pre-push gate — a violation prints its report and the gate exits non-zero, so the **push aborts** (the pre-push git channel). Pure logic is separated from I/O via the injected `GitProvider` (`utils/git.ts`) in all the ported checks, which is what makes them unit-testable and Stryker-mutatable.

## Satellites & companions

Deployed by the D24b copy list; failures gate exactly like pre-push.ts's own sections (D22); the dynamic companions are guard-liveness + cmd-script-liveness (D24), which are `await import()`-loaded rather than static; GitProvider comes from the utils pair (D24b); registry's `criticalForFallback` flags drive pre-push.fallback.sh (the bash lane of the same gate).

## Anchors

- `setup.d/50-hooks.sh:30` — «  checks/prior-art.ts \» (trio lines :30-32 of the copy list)
- `packages/core/hooks/checks/prior-art.ts:2` — « * prior-art.ts — §7 Prior-art trailer check (Phase 8.8 T8), ported from bash in»
- `packages/core/hooks/checks/prior-art.ts:22` — «export const PA_HISTORICAL_CUTOFF = '2026-05-12';»
- `packages/core/hooks/checks/s17.ts:2` — « * s17.ts — §1.7 discipline-trailer check (phase-research-coverage.md §1.7),»
- `packages/core/hooks/checks/unpinned-tool-install.ts:9` — « * Problem class: bare `run:` shell commands in .github/workflows/*.yml that»
- `packages/core/hooks/checks/registry.ts:2` — « * registry.ts — declarative check-registry for the pre-push hook (Wave 10.5).»
- `packages/core/hooks/checks/registry.ts:9` — « *   - `pre-push.fallback.sh` (Wave 10.5) — bash iterates `criticalForFallback: true`»
