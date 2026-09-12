---
title: "plugin/install/fetch-and-wire.sh — the hybrid seam (I9)"
description: "The bridge behind /getff:install-enforcement: fetches the project's OWN official installer instead of bundling ~2MB into the plugin, runs it dry-run by default, and never wires anything on its own — --apply plus the command's consent does the real run."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# plugin/install/fetch-and-wire.sh — the hybrid seam (I9)

**Status:** shipped-beta · **Ships to:** plugin (marketplace install of `getff@getff`; the plugin payload's `install/` directory) · **Fires at:** only when the `/getff:install-enforcement` command invokes it — it is never on any automatic path

## What it is

An 81-line script implementing the packaging decision the plugin made in June 2026 ("Option C"): rather than bundle a ~2MB copy of the installer into the plugin, the plugin FETCHES the project's own official `install.sh` at wiring time and runs it against the consumer repo. It is the mechanical half of the hard-layer opt-in; the consent half lives in the command (I3).

## How it works

- The safety posture is stated in the header and enforced by flags: the script NEVER wires anything on its own — dry-run is the default and writes nothing to the consumer; `--apply` does the real run; consent is orchestrated by the command, not assumed here.
- Source resolution is env-driven and auditable: `RAT_INSTALL_SOURCE` may be a local directory containing install.sh (forks/tests — used in place) or a git URL to clone (default: the official repo); `RAT_INSTALL_REF` is the ref to clone.
- The fetch REF is deliberately DECOUPLED from the plugin's own version: framework release tags lag staging by weeks, so pinning the fetch to `v<plugin-version>` would ship a stale install.sh missing hardening fixes — the script tracks `main` by default, with the override documented for pinning a reproducible release tag once one is cut for the plugin.
- The stack argument passes straight through to install.sh (default `ts-server`), so the consumer gets the same lane/profile choices a direct install offers.
- Lane honesty: plugin-path only, opt-in only. Everything the plugin does WITHOUT this script is soft-layer; this file is the single seam where the hard layer becomes reachable, and its default state is inert.

## Satellites & companions

Invoked by the `/getff:install-enforcement` command (I3); explained by the `installing-enforcement` skill (I6); fetches and runs the official `install.sh` (A2) — the same installer the clone/npm path runs directly. Implements the companion-install principle the framework states for companions: install via the official top-level installer.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `plugin/install/fetch-and-wire.sh:2-4` — «# fetch-and-wire.sh — the rules-as-tests "hybrid seam": reach the HARD enforcement layer» «# (git hooks + CI) by fetching the project's OWN official installer and running it against» «# the consumer repo. Option C (maintainer decision 2026-06-22) — fetch-the-official-installer»
- `plugin/install/fetch-and-wire.sh:9-12` — «# The plugin already delivers the SOFT layer (skills/agents/session hooks). This script is the» «# opt-in bridge to the HARD layer, invoked by /getff:install-enforcement. It NEVER» «# wires anything on its own: dry-run is the default; --apply does the real run; consent is» «# orchestrated by the command (plugin/commands/install-enforcement.md), not assumed here.»
- `plugin/install/fetch-and-wire.sh:14-16` — «# Usage:  fetch-and-wire.sh [stack] [--apply]» «#   stack    install.sh stack arg (default: ts-server)» «#   --apply  run the real install (default: --dry-run, writes nothing to the consumer)»
- `plugin/install/fetch-and-wire.sh:22-24` — «#   RAT_INSTALL_REF      git ref to clone when SOURCE is a URL (default: the stable `main` branch,» «#                        which carries the current hardened install.sh). Override to pin a»
- `plugin/install/fetch-and-wire.sh:28-30` — «# deliberately DECOUPLED from RAT_INSTALL_REF below: the framework's own release tags (v0.2.0,» «# v0.3.0) lag staging by weeks, so pinning the fetch to `v<plugin-version>` would ship a stale» «# install.sh missing the hardening fixes (#531/#551/#635/#636). We track `main` instead; a»
