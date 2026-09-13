---
title: "inject-subagent-context (hook)"
description: "Plugin hook that injects the project digest into subagents on harnesses without a SubagentStart event (the ZCode backup path), via PreToolUse Agent/Task updatedInput."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-subagent-context (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PreToolUse with matcher `Agent|Task` — but only on ZCode (gated by `_is_zcode`; on CC it exits 0 immediately so the SubagentStart primary handles injection and nothing is double-injected). Non-blocking context injection.

## What it is

The backup digest-injection path for harnesses WITHOUT the SubagentStart hook event. On ZCode, SubagentStart does not exist, so this PreToolUse backup is the active path: it rewrites the Agent/Task dispatch prompt to carry the project digest via `updatedInput`.

## How it works

Three guards, in order: `_is_zcode || exit 0` (CC stays silent — the primary owns it, `plugin/hooks/inject-subagent-context:37`), no `jq` → exit 0, tool not `Agent|Task` → exit 0. The digest source and awk pipeline mirror the SubagentStart arm of inject-project-digest (the `<!-- digest:start -->…<!-- digest:end -->` block of `.claude/session-bootstrap.md`) — payload parity with the CC primary. Output contract: PreToolUse `updatedInput` is applied by the host before dispatch.

**Declared degradation (not hidden):** on ZCode the digest is one-shot — it becomes the subagent's FIRST user message via `updatedInput.prompt`, not a persistent-lifecycle context as on CC. This is the best-available mechanism; SubagentStart has no ZCode equivalent.

**Fail mode:** none as a gate — injection only. The channel that degrades is persistence (one-shot vs lifecycle), stated above.

## Satellites & companions

ADAPTS the SubagentStart arm of `.claude/hooks/inject-project-digest.sh` (same digest source, same awk pipeline, same no-op-on-empty semantics); ADDS the ZCode-gated `updatedInput` delivery. The one remaining CC-only hook with no backup: warn-subagent-report (SubagentStop has no updatedInput analogue).

## Anchors

- `plugin/hooks/inject-subagent-context:2` — «# Backup digest-injection for harnesses WITHOUT the SubagentStart hook event (zcode).»
- `plugin/hooks/inject-subagent-context:4` — «# @cc-only-rationale: SubagentDigest zcode-fallback backup — CC+ZCode dual-harness via inline»
- `plugin/hooks/inject-subagent-context:37` — «_is_zcode || exit 0   # CC: the SubagentStart primary handles digest injection; stay silent here»
- `plugin/hooks/inject-subagent-context:44` — «case "$TOOL_NAME" in Agent | Task) ;; *) exit 0 ;; esac»
- `plugin/hooks/hooks.json:37` — «"PreToolUse": [» (the `Agent|Task` matcher arm)
