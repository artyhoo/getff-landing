---
title: "setup.d/companions.manifest — the companion manifest (A22)"
description: "A TAB-delimited table declaring every optional companion (plugins, MCP servers, CLIs, external services): how to detect it, its official install command, its routing kind, and which stacks it applies to."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# setup.d/companions.manifest — the companion manifest (A22)

**Status:** shipped-beta · **Ships to:** clone→consumer (read FROM the clone by the engine and the selection stage; runs inside every npm-lane install) · **Fires at:** install time — parsed by `engine.sh` (A3) for the post-install wrapper loop and by `15-companions-stack.sh` (A10) for stack filtering; `kind=mcp` rows are consumed earlier, inside `install.sh`'s `05-mcp` layer (A9)

## What it is

One TAB-delimited data file listing every optional companion the installer knows about. Each row carries five fields — `name`, `detect_cmd`, `install_cmd`, `kind`, `stacks` — and nothing else: no versions, no custom install logic. The manifest is declarative on purpose; all routing behavior lives in the `kind` column's contract.

## How it works

- The format is a strict parser contract: fields are separated by a SINGLE tab with no padding spaces, and the delimiter is tab rather than pipe because a `detect_cmd` may itself contain pipes (a `grep -q` inside a `claude plugin list` check does).
- Four `kind` values route rows to four different consumers: `cc-plugin` and `cli` rows install via their official command on consent in the post-install wrapper loop; `external-service` rows are handed to guided-detect with their install field ignored (informational only); `mcp` rows are consumed by the `05-mcp` layer inside install.sh, before deps, and explicitly NEVER by the post-install loop (ordering constraint).
- Every install command is the companion's OWN official installer, detect-first, with no version pin — the installer never forks a companion's install into its own logic.
- The `stacks` column makes selection static: `*` for universal companions, a comma-separated list (e.g. react-next,ts-server) for stack-specific ones.
- Lane honesty: this manifest is the npm lane's companion surface — the python, cargo and go lanes never read it; their stages (45/46/47) carry no companion rows. One row is profile-gated in-place: the `aif-handoff` row ships only when `--profile factory` (or the legacy `--with-aif-suite` escape) is selected.

## Satellites & companions

CONSUMED BY `engine.sh` (A3), whose `companion_step` turns each row into a detect-first decision; filtered by `15-companions-stack.sh` (A10); its `kind=mcp` contract is prose-bound in `LAYERS.md` (A21) and executed by `05-mcp.sh` (A9). The `aif-handoff` row's guided-install pointer targets `aif-handoff-guided-install.sh` (A23); the `runtime-bridge` row's health-check detect is the same `/health` probe `bridge-guided.sh` (A24) implements.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/companions.manifest:1` — «# Companion manifest — TAB-delimited: name<TAB>detect_cmd<TAB>install_cmd<TAB>kind<TAB>stacks»
- `setup.d/companions.manifest:3` — «# Tab (not pipe) delimiter: detect_cmd may contain inner pipes (per kickoff §4 T-OCI-A).»
- `setup.d/companions.manifest:4` — «# Companions install via THEIR official installer, detect-first, no version pin.»
- `setup.d/companions.manifest:8` — «# kind=mcp              → detect-first `claude mcp add`; processed by the 05-mcp layer INSIDE install.sh»
- `setup.d/companions.manifest:17` — «superpowers	claude plugin list 2>/dev/null | grep -q superpowers	claude plugin install superpowers@claude-plugins-official --scope user	cc-plugin	*»
- `setup.d/companions.manifest:22` — «# @profile: factory — the aif-handoff row ships only when --profile factory is selected»
- `setup.d/companions.manifest:33` — «aif-handoff	curl -sf "${RUNTIME_BRIDGE_AIF_URL:-http://localhost:3009}/health"	(guided-install: setup.d/aif-handoff-guided-install.sh under --profile factory)	external-service	*»
