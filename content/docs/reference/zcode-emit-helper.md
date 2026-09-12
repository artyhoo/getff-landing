---
title: "_zcode-emit (emit-adapter helper)"
description: "Census D25 — the sourced (never executed, never registered) universal emit-wrapper that adapts a plugin twin's output between plain-stdout CC semantics and strict-JSON ZCode semantics; adoption is per-twin and optional, with exactly one adopter at this pin."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# _zcode-emit (emit-adapter helper)

**Status:** shipped · experimental adoption — **sourced by exactly one twin at this pin** (the zcode-parity twin `warn-subagent-report-zcode`, D8); its own header comment claiming "zero existing twins source this today" is stale at this pin. NOT registered in hooks.json and NOT executed — it only ever runs inside a sourcing twin. · **Ships to:** plugin (rides the `plugin/hooks/` directory whole; the framework twin lives at `.claude/hooks/_zcode-emit`) · **Fires at:** never on its own — it classifies whatever the sourcing twin pipes into `_ze_emit`, inside that twin's own hook event.

## What it is

A sourced bash helper ("universal emit-wrapper helper (Mechanism 1, plan-v3)", `plugin/hooks/_zcode-emit:1`) that gives an adopting hook twin one consistent adapter between the two harness output contracts: plain stdout on Claude Code (auto-injected as context) vs the strict-JSON single-object channel ZCode parses. "Adoption is per-twin and OPTIONAL" (`:5`).

## How it works

The sourcing twin must define `_is_zcode` BEFORE sourcing ("the adopter MUST define `_is_zcode` BEFORE sourcing this file", `:11-12` — canonical form `_is_zcode() { [ -n "${ZCODE_PROJECT_DIR:-}" ]; }`, `:13`). Two functions do the work:

**`_ze_classify`** reads stdin and picks the output shape (`:17-22`, code `:47-82`): empty stdin → silent (avoids "emitting a stray `{"additionalContext":""}`", `:50-52`); jq absent → raw pass-through ("a ZCode env without jq is already broken … this branch is defenseless-by-design", `:55-56`); valid JSON whose FIRST top-level key is one of the ten allowed keys (`additionalContext`, `hookSpecificOutput`, `decision`, `reason`, `systemMessage`, `continue`, `stopReason`, `suppressOutput`, …, `:27-29`, `:40-45`) → byte-identical pass-through; any other payload → wrapped as `{additionalContext:<text>}` with the ORIGINAL bytes preserved, not jq-reserialized (`:72-75`). Key detection uses `jq -r 'keys[0]'` because "jq preserves object key insertion order per the JSON spec" (`:36-39`).

**`_ze_emit`** is the `_is_zcode` gate: ZCode → classify (JSON-shape output), non-ZCode → plain `cat` ("no-op for CC dogfood", `:23-25`, code `:84-89`).

**Fail mode / which channel fails:** the helper cannot block anything — it is output shaping, not a gate. Its failure modes are graceful: no jq → raw emit (`:57-59`); empty payload → silence. The channel it serves is the sourcing twin's: on ZCode the payload reaches the model only as strict JSON on fd 1; on CC, plain stdout. (The adopting twin, warn-subagent-report-zcode, documents at its source line that on CC the wrapper is "a plain `cat` (preserves stderr semantics)" — `plugin/hooks/warn-subagent-report-zcode:33-35`.)

**Why it is NOT inert at this pin:** the census row was authored against the claim "zero twins source it at this pin". Re-anchored at this working pin, the sourcing line exists and the file is byte-identical back to the census pin itself — the stale fact is the helper's own header comment (`:5-6`), which the parity adoption (warn-subagent-report-zcode, the D8 twin) did not update.

## Satellites & companions

Its single adopter is warn-subagent-report-zcode (D8); the PostToolUse-specific counterpart is `lib/hook-emit.sh` (D19), which the edit-time gates share; the skip-list note: the file "intentionally does NOT carry @dual-pair / @cc-only-rationale (it is in tests/plugin/hook-paths.test.sh skip-list for exactly that reason — T-ZP-C)" (`:7-9`).

## Anchors

- `plugin/hooks/_zcode-emit:1` — «# _zcode-emit — universal emit-wrapper helper (Mechanism 1, plan-v3 §"Mechanism 1").»
- `plugin/hooks/_zcode-emit:5` — «# Adoption is per-twin and OPTIONAL; zero existing twins source this today»
- `plugin/hooks/_zcode-emit:11` — «# Sourcing contract: the adopter MUST define `_is_zcode` BEFORE sourcing this»
- `plugin/hooks/_zcode-emit:47` — «_ze_classify() {»
- `plugin/hooks/_zcode-emit:84` — «_ze_emit() {»
- `plugin/hooks/warn-subagent-report-zcode:35` — «. "$(dirname "$0")/_zcode-emit"»
- `plugin/hooks/hooks.json` — (no registration arm; grep for `_zcode-emit` returns nothing in this file)
