---
title: "99-finalize — synth-wire, R2 AST-wire, warnings, done (A20)"
description: "The last installer stage: wires synthesized rules into eslint.config.mjs, AST-wires the R2 boundary, warns on otel strict-runtime gaps and preset staleness, and closes the install."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 99-finalize — synth-wire, R2 AST-wire, warnings, done (A20)

**Status:** shipped-beta · **Ships to:** npm lane (runs on every install that reaches the end of the dispatcher) · **Fires at:** install time, stage 99 — explicitly LAST, and after `70-deps` installed ts-morph

## What it is

`setup.d/99-finalize.sh` — the closing stage. Four payloads: the synth-wire (deterministic synthesizer → root `eslint.config.mjs`), the R2 AST-wire (per-workspace dependency-boundary rules, using ts-morph), the V2 otel WARN, and the `ignore_shipped_configs` close-out, followed by the final report. Its own header flags it the highest-risk ordering item: it must run after `70-deps` and last, because it reads state (`_r2_verdict`, `DEPS_INSTALLED`, `DEVDEPS`, the accumulated SKIPPED list) that only exists once every earlier stage has run.

## How it works

Synth-wire runs the synthesizer for the detected stack and AST-merges the emitted rules-as-tests rules into the consumer's root `eslint.config.mjs`. It is idempotent — on a fresh install the preset template already inlines these rules, so it is a fast no-op — and its declared value is architectural: the synthesizer is the source of truth, so future recipe additions wire in without template edits. In monorepo shapes it routes the live-research snippet per matching workspace config. R2's AST-wire is the L2 follow-up to `60-ci`'s L1 verdict: when the boundary check could not be expressed as config alone, the stage wires it in code. The otel WARN fires when `@opentelemetry/*` is detected but the strict-runtime flag is unset, telling the consumer the require-otel-span rule stays deferred. The stage also prints the presets-are-fallback notice when no live-research artefacts exist (the degrade arm of A18) and the #811 preset-staleness comparison when a preset meta is present.

Failure posture: every branch returns success — the install reports wirer failures but never aborts on them; dry-run writes nothing.

## Satellites & companions

DEPENDS ON `70-deps` (A17) for ts-morph and the deps globals, and `60-ci` (A16) for `_r2_verdict`. FEEDS the deliverable `eslint.config.mjs` that the pre-push gates and shipped CI then enforce. The staleness WARN reads the preset meta that G5 documents.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/99-finalize.sh:2` — «# setup.d/99-finalize.sh — synth-wire + R2 AST-wire + V2 otel WARN + ignore_shipped_configs + Done.»
- `setup.d/99-finalize.sh:7` — «# Depends on: 70-deps (ts-morph installed; DEPS_INSTALLED + DEVDEPS set),»
- `setup.d/99-finalize.sh:10` — «# O3: HIGHEST-RISK ordering item — must run AFTER 70-deps (ts-morph) and LAST (SKIPPED complete)»
- `setup.d/99-finalize.sh:13` — «# ─── synth-wire: deterministic synthesizer → root eslint.config.mjs ─────────────»
- `setup.d/99-finalize.sh:23` — «# rc=0 on every branch — install must not abort on wirer failure.»
- `setup.d/99-finalize.sh:232` — «echo "⚠  Detected @opentelemetry/* but AIF_STRICT_RUNTIME is unset — R8 (require-otel-span) will not fire."»
