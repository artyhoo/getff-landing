---
title: "inject-project-digest (hook)"
description: "Plugin hook that injects the project's context digest into the prompt at UserPromptSubmit and into each subagent at SubagentStart."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-project-digest (hook)

**Status:** shipped-beta · **Ships to:** plugin (marketplace payload; the `.claude/hooks/inject-project-digest.sh` original ships to consumer CC projects via install.sh) · **Fires at:** UserPromptSubmit (stdout auto-injection) + SubagentStart (additionalContext). Non-blocking — it only injects context, never gates.

## What it is

A bash hook that reads the project's context digest and injects it into the model's context: once per submitted prompt (UserPromptSubmit), and once per spawned subagent (SubagentStart). It is the plugin twin of `.claude/hooks/inject-project-digest.sh` — the `.claude/` original stays the source of truth; both channels are one logic (dual-implementation-discipline §7).

## How it works

On fire it looks for the digest file; if no anchor was authored it exits 0 with no output (zero-setup default — `plugin/hooks/inject-project-digest:43` «[ -f "$DIGEST_FILE" ] || exit 0   # no anchor authored — nothing to inject (zero-setup default)»). An empty digest block is likewise a silent no-op (`:51`). Output is harness-portable via an inline `_emit_ctx` adapter: on Claude Code plain stdout is auto-injected; on ZCode stdout must be strict-JSON `{additionalContext:<text>}` or the run is marked failed. The SubagentStart branch keeps its JSON `hookSpecificOutput` shape on both harnesses.

**Fail mode:** none as a gate — a missing digest or empty block is a silent exit 0. The channel that "fails" when the digest is absent is simply the injection itself (nothing is injected); the hook never blocks a prompt or a subagent launch.

## Satellites & companions

USES the digest authored in the session-bootstrap machinery; ADAPTS `.claude/hooks/inject-project-digest.sh` (repo channel) into the extensionless plugin convention; ADDS the inline ZCode `_emit_ctx` adapter the `.claude/` original does not carry. Sibling: `inject-subagent-context` (the PreToolUse backup for harnesses without SubagentStart).

## Anchors

- `plugin/hooks/inject-project-digest:1` — «#!/usr/bin/env bash»
- `plugin/hooks/inject-project-digest:2` — «# Plugin twin of .claude/hooks/inject-project-digest.sh.»
- `plugin/hooks/inject-project-digest:3` — «# @cc-only-rationale: CC-specific context-injection hook — its output is consumed by CC-native»
- `plugin/hooks/hooks.json:3` — «"UserPromptSubmit": [» (the inject-project-digest arm; the same command is registered again under SubagentStart at `plugin/hooks/hooks.json:181`)
