---
title: "05-mcp — MCP companion install layer (A9)"
description: "The installer stage that adds MCP servers (context7 today) to the consumer's .mcp.json, gated on the --full install pass."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 05-mcp — MCP companion install layer (A9)

**Status:** shipped-beta · **Ships to:** npm lane, `--full` pass only · **Fires at:** install time, stage 05 (before `70-deps`)

## What it is

`setup.d/05-mcp.sh` — the stage that provisions MCP companions. Today it installs exactly one: the context7 MCP server, written into the consumer's `.mcp.json`. It is a port of a block from the dead monolithic `setup.sh` (which the repo marks as dead code not to be revived), re-homed as the first numbered layer.

## How it works

The stage is gated on the `FULL` carrier: without `--full` (the interactive "yes" pass) the layer returns immediately, which keeps the non-full and snapshot paths byte-identical to an install without it. The context7 write is an additive `jq` merge — it sets only the `context7` key and preserves every other `.mcpServers` entry a brownfield consumer already has. Three opt-outs are built in: a `.mcp.json` that already mentions `context7` is skipped (unless `--force`), dry-run prints the intended mutation without writing, and a failed `jq` rewrite is reported as a failure rather than an unconditional success (an earlier version reported success over a failed rewrite, leaving a stale `.mcp.json.tmp` behind — the stage now checks the merge result explicitly).

Lane applicability: this is an npm-lane stage — it runs from the cloned framework against the consumer's tree, inside `install.sh`'s dispatcher scope. It is not part of the python/cargo/go lanes, which never touch npm-side MCP config.

## Satellites & companions

Consumes `companions.manifest` (A22) rows of `kind=mcp` through `engine.sh` (A3) — the manifest declares the parser contract; this stage is the `mcp`-kind consumer named in the engine's kind table. Its placement before `70-deps` (A17) is an ordering constraint recorded in both files.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/05-mcp.sh:2` — «# setup.d/05-mcp.sh — MCP companion install layer (S2).»
- `setup.d/05-mcp.sh:4` — «# Ported from orphaned setup.sh:289-303 (T3/M2 — setup.sh is dead code; do NOT revive it).»
- `setup.d/05-mcp.sh:12` — «# Gate: MCP provisioning only runs on the --full / yes pass.»
- `setup.d/05-mcp.sh:27` — «printf '  [05-mcp] context7 already in .mcp.json — skipping (use --force to refresh)\n'»
- `setup.d/05-mcp.sh:38` — «if jq '.mcpServers["context7"] = {"command": "npx", "args": ["-y", "@upstash/context7-mcp@latest"]}' \»
