---
title: "inject-session-bootstrap (hook)"
description: "Plugin hook that injects the session-bootstrap digest (orientation + autonomy contract) into the prompt at every UserPromptSubmit."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-session-bootstrap (hook)

**Status:** shipped-beta · **Ships to:** plugin (consumers receive it through the plugin twin) · **Fires at:** UserPromptSubmit (stdout auto-injection). Non-blocking context injection.

## What it is

The UserPromptSubmit arm of the session-bootstrap machinery: injects a digest of `.claude/session-bootstrap.md` (the Step 0 read-first file) into prompt context, so every session starts oriented — including the standing operator-authorization text for unattended runs (the `[autonomy]` block, `plugin/hooks/inject-session-bootstrap:161`).

## How it works

The digest is rendered with consumer-aware path resolution: under the plugin twin `$0` points into the plugin directory, not the consumer root, so the tree root resolves env-first (`CLAUDE_PROJECT_DIR`, then `ZCODE_PROJECT_DIR`, then `$0`-relative) — the R4 consumer-refresh-integrity fix (issue 1484). Every path-shaped citation in the digest is existence-checked against the live tree at render time; an absent target degrades to the rule/target NAME without the dead path, never a silent drop of the invariant text. The hook is fail-open by design: an unreachable tree degrades all citations and still exits 0 (a failed hook run would mark the ZCode run failed).

**Fail mode:** none as a gate — fail-open, injection-only. The channel that degrades is the digest's citations (names without live paths), not the prompt.

## Satellites & companions

USES `.claude/session-bootstrap.md` as the digest source; ADAPTS `.claude/hooks/inject-session-bootstrap.sh` (auto-generated twin, header injected by scripts/generate-plugin-twins.sh); ADDS the env-first root resolution and existence-checked citations the consumer-twin context requires.

## Anchors

- `plugin/hooks/inject-session-bootstrap:1` — «#!/usr/bin/env bash»
- `plugin/hooks/inject-session-bootstrap:3` — «# Wave 7 sub-wave 7.2.a — UserPromptSubmit hook: inject session-bootstrap digest.»
- `plugin/hooks/inject-session-bootstrap:4` — «# stdout is injected into Claude Code's prompt context by the harness automatically.»
- `plugin/hooks/inject-session-bootstrap:161` — «  DIGEST="$DIGEST"$'\n[autonomy] Standing operator authorization for this unattended run — do NOT re-ask for it, and do NOT infer a narrower constraint than is written here:…» (truncated)
- `plugin/hooks/hooks.json:3` — «"UserPromptSubmit": [» (the inject-session-bootstrap arm)
