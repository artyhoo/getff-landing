---
title: "inject-matching-rule (hook)"
description: "Plugin hook that injects the consumer's path-scoped rules (.claude/rules/*.md with globs markers) just-in-time on the edit that touches a matching file."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-matching-rule (hook)

**Status:** shipped-beta · **Ships to:** plugin (relocated T-PLUG-A: lives in the plugin payload, touches only PROJECT data) · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit`. Non-blocking (exit 0 + JSON); never a gate.

## What it is

Path-scoped just-in-time rule delivery: on each edit, for each consumer `.claude/rules/*.md` carrying a `<!-- globs: ... -->` marker whose pattern matches the edited path, inject that rule's `<!-- inject: ... -->` summary (fallback: title) as PostToolUse `additionalContext` — once per session per rule.

## How it works

Relocation mechanics: the in-repo source resolves the repo via `$(dirname "$0")/../..` (true only when copied INTO a consumer repo); as a plugin hook `$0` is in the plugin dir, so it resolves the project via `$CLAUDE_PROJECT_DIR` with self-resolution kept as fallback — one file serves both channels. Output contract: PostToolUse plain stdout is IGNORED; context must be JSON `additionalContext`. Honest no-op: when the CONSUMER has no rules corpus (`RULES_DIR` missing or zero `.md` files), the hook reports once per session loudly, then stays quiet for the session (the exact behaviour observed live in the getff-landing container, which has no `.claude/rules` corpus).

**Fail mode:** none as a gate — injection only. The channel that "fails" is rule delivery itself: no corpus → no injections (reported once).

## Satellites & companions

USES the consumer's `.claude/rules/` corpus and its generated rule index; ADAPTS `.claude/hooks/inject-matching-rule.sh` (in-repo dogfood SSOT) into the plugin payload; spec: the plugin-hook-triage path-class audit.

## Anchors

- `plugin/hooks/inject-matching-rule:2` — «# Plugin-relocated PostToolUse rule-injector — path-scoped just-in-time delivery of»
- `plugin/hooks/inject-matching-rule:4` — «# @dual-pair: rule-path-scoping»
- `plugin/hooks/inject-matching-rule:33` — «command -v jq >/dev/null 2>&1 || exit 0   # graceful no-op without jq»
- `plugin/hooks/inject-matching-rule:40` — «case "$TOOL" in Edit|Write|MultiEdit) ;; *) exit 0 ;; esac»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the inject-matching-rule arm)
