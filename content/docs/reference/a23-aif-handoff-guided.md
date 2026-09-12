---
title: "setup.d/aif-handoff-guided-install.sh — consented guided install of the aif-handoff companion (A23)"
description: "Factory-profile helper that offers — on explicit consent, never blocking — to clone the official aif-handoff repo and bring it up with docker compose; declining is a designed-success path that degrades the factory tier to env-level."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# setup.d/aif-handoff-guided-install.sh — consented guided install of the aif-handoff companion (A23)

**Status:** shipped-beta · **Ships to:** npm-lane, companion path — runs ONLY under `--profile factory` (invoked from `install.sh` after the setup.d layer loop) · **Fires at:** install time, as a separate `bash` process spawned by `install.sh`

## What it is

The script behind the factory tier's one runtime dependency: when a consumer selects `--profile factory` and the aif-handoff runtime is not reachable, this helper diagnoses the machine, offers to clone the official aif-handoff repository and run `docker compose up -d`, and — if the consumer declines or anything fails — degrades the install to env-level with a printed explanation instead of failing.

## How it works

- It is invoked from install.sh, not from the engine's companion loop: the `aif-handoff` row in `companions.manifest` stays `kind=external-service` (which the engine treats as a print-and-return), while the real handling routes through this helper — the same pattern as the runtime-bridge row.
- Detection reuses `bridge_diagnose` from `bridge-guided.sh` as the single source of truth, so the state taxonomy (up / docker / docker-down / native / absent) cannot drift between the two helpers.
- Consent is resolved through one function with three exits: explicit opt-in (`AIF_GUIDED_INSTALL=1`), explicit opt-out (`AIF_GUIDED_INSTALL=0`), or the interactive `[y/N]` prompt — where a non-interactive run (`-y` / `--full`) auto-declines rather than blocking, per the never-prompt contract.
- The repo is the official one by default, env-overridable for consumers who mirror it (`AIF_HANDOFF_REPO_URL`); the checkout path and the audit log path are env-overridable the same way. The install appends every decision to `~/.getff-factory-install.log`, mirroring the python/cargo lane audit-trail pattern.
- Decline is a first-class outcome: `_aif_handoff_degrade` prints that the factory profile degrades to env-level (contour placeholders only, no aif runtime) and tells the consumer to re-run with `--profile factory` once the runtime is up — and still exits 0. A compose failure, a clone failure and a consent refusal all route through this same degrade path.
- Lane honesty: no other lane ever runs this helper — `install.sh` gates the spawn on the factory profile; core and env installs never see the prompt.

## Satellites & companions

SOURCES `bridge-guided.sh` (A24) for its diagnostics; is the handling behind the `aif-handoff` row of `companions.manifest` (A22); is spawned by `install.sh` (A2) under the factory gate. Its runtime target, aif-handoff, is the vendored-subset companion documented from the consumer side by the runtime-bridge vendor stage (A15).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/aif-handoff-guided-install.sh:2-5` — «# aif-handoff-guided-install.sh — consented guided INSTALL for the aif-handoff companion» … «# consented guided INSTALL: official repo, docker compose, detect-first; decline → graceful»
- `setup.d/aif-handoff-guided-install.sh:12-13` — «# The helper IS invoked from install.sh, NOT from engine.sh. The companions.manifest row stays» «# kind=external-service (engine.sh prints + returns 0 at :18-21); the actual handling routes»
- `setup.d/aif-handoff-guided-install.sh:28` — «AIF_HANDOFF_REPO_URL="${AIF_HANDOFF_REPO_URL:-https://github.com/lee-to/aif-handoff.git}"»
- `setup.d/aif-handoff-guided-install.sh:80` — «_log "consent=auto-decline (GETFF_NONINTERACTIVE=1 — the never-prompt contract in ./setup)"»
- `setup.d/aif-handoff-guided-install.sh:83` — «printf '  Clone aif-handoff + docker compose up -d? [y/N]: '»
- `setup.d/aif-handoff-guided-install.sh:207` — «printf '  aif-handoff not installed — factory profile degrades to env-level\n'»
- `install.sh:1440` — «bash "$PKG_ROOT/setup.d/aif-handoff-guided-install.sh" || true»
