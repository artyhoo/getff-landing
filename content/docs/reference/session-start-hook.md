---
title: "session-start (plugin hook)"
description: "Plugin SessionStart hook that injects the getff entry-point context so the using-getff skill orientation happens without a manual skill invocation."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# session-start (plugin hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** SessionStart with matcher `startup|clear|compact` (registered `async: false`). Non-blocking context injection.

## What it is

The plugin's session bootstrap: injects the getff entry-point context at session start (and after `/clear` and compaction) so the `using-getff` orientation skill auto-triggers without a manual Skill invocation.

## How it works

Deliberately short — progressive disclosure: the directive lives in the hook, the full protocol in the `using-getff` skill. Output is harness-portable via an inline `_emit_bootstrap` that branches on `ZCODE_PROJECT_DIR`: under CC, plain SessionStart stdout is auto-injected into session context; under ZCode, stdout must be strict-JSON `{additionalContext}` (plain is discarded and the run marked failed). Self-resolution prefers the plugin root CC provides (`CLAUDE_PLUGIN_ROOT`), falling back to `$0`-relative.

**Fail mode:** none as a gate — injection only. Declared degradation: off-CC/off-ZCode harnesses (OpenCode et al.) get no session-start injection; there the `using-getff` skill is read on demand (the accepted degradation documented in S7 / dual-implementation-discipline §3).

## Satellites & companions

ADAPTS the using-getff skill's trigger into a session-start directive (CC plugin packaging design §3, #4); the `@dual-pair` marker does not apply — one file serves both harnesses via inline branching. Sibling of inject-session-bootstrap (digest depth) — this hook carries only the entry-point directive.

## Anchors

- `plugin/hooks/session-start:1` — «#!/usr/bin/env bash»
- `plugin/hooks/session-start:2` — «# Plugin SessionStart bootstrap — injects the getff entry-point context so the»
- `plugin/hooks/session-start:4` — «# Invoked via run-hook.cmd from plugin/hooks/hooks.json (matcher: startup|clear|compact).»
- `plugin/hooks/hooks.json:169` — «"SessionStart": [»
