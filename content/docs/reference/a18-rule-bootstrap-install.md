---
title: "80-rule-bootstrap — rule-bootstrapping install-time step (A18)"
description: "The --full-gated stage that runs the deterministic research-to-rule factory on the consumer's authored research+selection JSONs, delivering real rules and rules-lock.json — degrading silently when inputs are absent."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 80-rule-bootstrap — rule-bootstrapping install-time step (A18)

**Status:** shipped-beta · **Ships to:** npm lane, `--full` pass only (the non-full and snapshot paths no-op it) · **Fires at:** install time, stage 80 — after the dev-dep install it depends on

## What it is

`setup.d/80-rule-bootstrap.sh` — the install-time placement of the rule-bootstrapping pipeline. When a human's interactive agent session has authored the two committed JSON artefacts (a research plan and a selection) under `.ai-factory/rules-research/`, this stage runs them through the deterministic factory — `FileResearchClient` + `FileGenerateClient` → the generate factory → `install()` → `rules-lock.json` — turning live-researched project rules into installed ESLint rules at install time, with no LLM in the loop.

## How it works

The stage is LIVE-or-degrade. Its payload is the shared `rule-bootstrap-cli.ts` entry in the core package. Degrade paths are explicit and all end with `rc=0` — an install is never aborted: node absent → skip with a notice; the CLI payload missing → skip; the research directory absent → degrade with guidance (the stage prints the presets-are-fallback notice pointing at the rule-research protocol and a `./setup --full` re-run). Decision B in its header is the integrity rule: research artefacts absent means NO rule ships — never the stub rule on the consumer path; the stub remains a CI/test default injection only.

Opt-outs: don't pass `--full` and the stage no-ops (the `FULL` gate keeps non-full installs byte-identical); CI self-install paths never set `FULL`, so the consume path stays a pure file-read.

## Satellites & companions

Consumes the `@rules-as-tests/meta-factory` toolchain (G4) — its bin is the deterministic factory this stage invokes. The authored inputs come from the rule-researcher agent / rule-research skill protocol (B family). Output lands in the root `eslint.config.mjs` wired by `99-finalize` (A20), whose presets-are-fallback notice (the #811 staleness companion) covers the degrade path this stage prints.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/80-rule-bootstrap.sh:2` — «# setup.d/80-rule-bootstrap.sh — rule-bootstrapping install-time step (LIVE-or-degrade).»
- `setup.d/80-rule-bootstrap.sh:7` — «#   FileResearchClient + FileGenerateClient → generate.ts factory → install() → rules-lock.json»
- `setup.d/80-rule-bootstrap.sh:15` — «# path never sets FULL. Degrades on absence (no node / missing CLI / no research files) and»
- `setup.d/80-rule-bootstrap.sh:18` — «# Decision B: research artefacts ABSENT → degrade + guidance, ship no rule (NEVER the stub on the»
- `setup.d/80-rule-bootstrap.sh:24` — «# Gate: rule-bootstrapping only runs on the --full / yes pass.»
- `setup.d/80-rule-bootstrap.sh:36` — «  printf '  [80-rule-bootstrap] node not found — skipping (degrade-on-absent)\n'»
