---
title: "setup.d/bridge-guided.sh — runtime-bridge guided-detect (A24)"
description: "Lib-only-sourceable diagnostics for the aif runtime: one /health probe and a five-state diagnose function (up | docker | docker-down | native | absent) that drives matching bring-up guidance for docker AND native installs."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# setup.d/bridge-guided.sh — runtime-bridge guided-detect (A24)

**Status:** shipped-beta · **Ships to:** clone→consumer (runs FROM the clone; sourced by the `setup` wrapper and by the factory companion helper) · **Fires at:** install time — guided-detect runs from the `setup` wrapper's companion flow and whenever the aif-handoff guided install needs a diagnosis

## What it is

The shared diagnostics library for the aif-handoff runtime. Three functions: a one-line health probe, a classifier that maps the machine into one of five states, and the interactive flow that prints state-appropriate bring-up guidance. It deliberately knows nothing about how the runtime was installed — the `/health` endpoint is the only oracle, which is what lets docker and native aif-handoff installs share one code path.

## How it works

- `bridge_health_ok` is a single `curl -sf <url>/health` — the whole detection primitive.
- `bridge_diagnose` classifies in a fixed order: up (health answers) → docker (CLI present AND daemon answering) → native (`aif-handoff` CLI present) → docker-down (CLI present, daemon not) → absent. The ordering is load-bearing: `docker-down` is its own state, not a flavour of `absent`, because the two need opposite guidance ("start docker" vs "install docker") and a caller cannot recover the difference afterwards; and `native` outranks `docker-down` so a machine with the CLI and a stopped daemon keeps the native guidance.
- `bridge_guided_run` prints the matching bring-up hint per state (start compose, start the CLI, start docker, or see the setup doc) and then fires one cross-layer warning: if the AIF operator suite was installed but the runtime is not reachable, the suite's skills will dead-end until it comes up.
- Lib-only sourceable (`BRIDGE_LIB_ONLY=1`): other scripts source it for the functions without arming the interactive flow.
- Lane honesty: the wrapper invokes this for every lane's install (it is the companion flow's diagnostics), but its warning only arms when the AIF suite flag is in scope — a plain npm-lane install gets the diagnose line only if the companions flow reaches it.

## Satellites & companions

SOURCED BY `setup` (A1), which calls `bridge_guided_run` on the runtime-bridge companion; SOURCED BY `aif-handoff-guided-install.sh` (A23), which reuses `bridge_diagnose` as the SSOT for state classification; implements the detect half of the `runtime-bridge` row in `companions.manifest` (A22); complements the factory-side vendor stage (A15) which ships the file-copy subset rather than diagnosing a runtime.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/bridge-guided.sh:2` — «# Runtime-bridge guided-detect. Sourceable in lib-only mode (BRIDGE_LIB_ONLY=1).»
- `setup.d/bridge-guided.sh:3` — «# Detection keys on /health (works for docker OR native aif-handoff) — never assumes docker.»
- `setup.d/bridge-guided.sh:10` — «# Returns: up | docker | docker-down | native | absent»
- `setup.d/bridge-guided.sh:12` — «# `docker-down` (binary installed, daemon not answering) is its own state, not a flavour of»
- `setup.d/bridge-guided.sh:23` — «if [ -n "$has_docker" ] && docker info >/dev/null 2>&1; then echo "docker"; return 0; fi»
- `setup.d/bridge-guided.sh:45` — «printf '  ⚠ AIF operator suite installed (--with-aif-suite/--all) but the aif-handoff runtime is not reachable — suite skills (pipeline/dispatcher/harvest/…) will dead-end until it is up.\n'»
- `setup:104` — «source "$HERE/setup.d/bridge-guided.sh"; bridge_guided_run»
