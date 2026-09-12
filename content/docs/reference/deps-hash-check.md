---
title: "deps-hash-check (hook)"
description: "Plugin hook that hashes the consumer's declared dependencies (JS/python/rust) at prompt submit and warns on drift against the tool-decisions baselines."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# deps-hash-check (hook)

**Status:** shipped-beta · **Ships to:** plugin; the packages/core copy is the SOURCE shipped by install.sh, the `.claude/` copy is the framework's dogfood instance, the plugin twin is the consumer arm — all three kept byte-identical by a 3-way drift guard · **Fires at:** UserPromptSubmit (WARN injection). Non-blocking; always exits 0.

## What it is

A dependency-staleness detector over three stacks: JS (`package.json`), python (`pyproject.toml`), and rust (`Cargo.toml` — detection only; no rust delivery lane is built). At each session start it sha256-hashes the consumer's DECLARED deps per present stack and compares against per-stack baselines in `.ai-factory/tool-decisions.md`.

## How it works

On any mismatch it prints a one-line WARN into session context (auto-injected stdout) telling the agent to re-run tool-bootstrapping — never blocks. No `tool-decisions.md` → exit 0 (nothing to compare against, `plugin/hooks/deps-hash-check:83` «[ -f "$DECISIONS" ] || exit 0»). Extraction is a two-tier ladder: Tier-1 (default, zero deps) is a bash/awk table-boundary hash of the relevant TOML tables; Tier-2 (only if the toolchain is present) enriches via python `tomllib` (≥3.11, `tomli` back-port on 3.7-3.10) or `cargo metadata --no-deps --offline` — any toolchain failure leaves Tier-1 standing.

**Fail mode:** none — designed WARN-only (`always exits 0`). The channel that "fails" on drift is the operator's attention: the WARN line in session context.

## Satellites & companions

USES `.ai-factory/tool-decisions.md` as the baseline store; ADAPTS the Aider-style declared-deps hash into a three-copy discipline (`@dual-pair: deps-hash-check-dogfood`, 3-way byte-identity guard in deps-hash-check.test.ts); ADDS the multistack TOML table-hash ladder. Companion: the tool-bootstrapping skill the WARN points at.

## Anchors

- `plugin/hooks/deps-hash-check:1` — «#!/usr/bin/env bash»
- `plugin/hooks/deps-hash-check:2` — «# AUTO-GENERATED from .claude/hooks/deps-hash-check.sh — do not edit (header injected by scripts/generate-plugin-twins.sh)»
- `plugin/hooks/deps-hash-check:3` — «# @dual-pair: deps-hash-check-dogfood»
- `plugin/hooks/deps-hash-check:13` — «# present stack and compares against per-stack baselines in .ai-factory/tool-decisions.md;»
- `plugin/hooks/deps-hash-check:83` — «[ -f "$DECISIONS" ] || exit 0»
