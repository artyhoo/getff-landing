---
title: "setup.d/LAYERS.md — the layer registry (A21)"
description: "The maintainer-facing registry of the installer's stages: the S1 layer list (number · file · purpose · depends-on), the lib.sh public API surface, and the byte-identical invariant every layer must preserve."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# setup.d/LAYERS.md — the layer registry (A21)

**Status:** shipped-beta · **Ships to:** clone only (a maintainer doc inside `setup.d/`; never delivered to a consumer project — no stage copies it) · **Fires at:** never executes; it is the authoritative registry stages' authors read and the byte-identical test suite enforces

## What it is

A Markdown registry at `setup.d/LAYERS.md` that documents the installer's own anatomy: which numbered stage does what, what each depends on, which globals the dispatcher seeds before sourcing layers, and the public `lib.sh` function surface. It is the reason the stage numbering (05→99) is stable contract rather than convention.

## How it works

- It scopes itself explicitly: authoritative for the S1 layer list, the `lib.sh` public API surface and the stub-layer map; NOT authoritative for layer content (S2/S3 own that) or profile semantics (the binding per-profile payload inventory lives elsewhere).
- It pins the execution order as lexicographic sourcing: install.sh sources the numbered stages in a filename glob loop, so the stage numbers ARE the run order.
- It states the invariant that disciplines every layer: the layered tree must produce a filesystem result byte-identical to the monolithic installer for all four npm stacks, greenfield and brownfield, proven by the golden-baseline test suite.
- It documents the profile model the layers gate on: three monotonic depths (core → env → factory), with the legacy `--with-aif-suite` flag routed to factory for compatibility.
- Lane honesty: this file ships to NO lane and NO tier — it is the one setup.d entry a consumer install never sees a copy of, because it is documentation of the installer, not payload.

## Satellites & companions

Describes what A3 (`engine.sh` + `lib.sh`) provides and what A2 (`install.sh`) sources; its `kind=mcp` manifest contract section is the binding prose behind the A9 stage and A22 manifest row semantics. The stage-by-stage "Depends on" column is the dependency graph the encyclopedia's A-family pages hang from (A9, A11, A15, A17, A20).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/LAYERS.md:1` — «# `setup.d/` Layer Registry»
- `setup.d/LAYERS.md:3` — «> **Authoritative for:** S1 layer list (number · file · purpose · depends-on), `lib.sh` public API surface, stub layers awaiting S2/S3.»
- `setup.d/LAYERS.md:16` — «Layers execute in lexicographic order — `install.sh` sources them via `for f in "$PKG_ROOT"/setup.d/[0-9]*.sh; do source "$f"; done`.»
- `setup.d/LAYERS.md:8` — «**Byte-identical invariant:** all layers collectively produce a filesystem tree byte-identical to the monolithic `install.sh` for all 4 stacks» (greenfield **and** brownfield; proven by `tests/install-sh/byte-identical.test.sh`)
- `setup.d/LAYERS.md:10` — «Three monotonic depths: `core` (today's default, no AIF runtime) → `env` (core + multi-model contour surface as placeholders, no AIF runtime) → `factory` (env + the AIF operator suite + runtime-bridge wiring + GLM one-button placeholder).»
- `setup.d/LAYERS.md:71` — «## `lib.sh` Public API»
