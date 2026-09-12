---
title: "inject-output-language (hook)"
description: "Plugin hook that tells the model the operator's pinned human-facing language (AIF_HOOK_LANG) at every prompt submit; English default injects nothing."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# inject-output-language (hook)

**Status:** shipped-beta · **Ships to:** plugin (the `.claude/hooks/inject-output-language.sh` original ships to consumer CC projects via install.sh) · **Fires at:** UserPromptSubmit (stdout auto-injection). Non-blocking context injection, never a gate.

## What it is

The language-discipline delivery hook: when the operator pins a non-English human-facing language via `AIF_HOOK_LANG`, this hook injects an instruction telling the model to follow that language in chat, recaps and narration — every turn, across all skills — while all repo artefacts and machinery stay English.

## How it works

It reads only the `AIF_HOOK_LANG` environment variable — no repo-file reads at all. Consumer setup is `export AIF_HOOK_LANG=ru` in the shell or an `env` block in `.claude/settings.json` (`{ "env": { "AIF_HOOK_LANG": "ru" } }`). Unset or `"en"` → the hook exits 0 with no stdout (English is the zero-setup default; `plugin/hooks/inject-output-language:49` «# Empty OUT (en/default) → exit 0 with no stdout»). Output goes through the inline `_emit_ctx` ZCode adapter (strict-JSON `{additionalContext}` on ZCode, plain stdout on CC).

**Fail mode:** none — an unset/English value is a designed silent no-op; the hook cannot block a prompt. The "failing channel" is only the missing injection when the env var is not configured.

## Satellites & companions

USES the `AIF_HOOK_LANG` convention shared with the lang packs (`plugin/hooks/lang/`); ADAPTS `.claude/hooks/inject-output-language.sh` into the plugin twin; ADDS the harness-portable emit. Spec prose: `.claude/rules/language-discipline.md` §2 (category 2, human-facing).

## Anchors

- `plugin/hooks/inject-output-language:1` — «#!/usr/bin/env bash»
- `plugin/hooks/inject-output-language:2` — «# Plugin twin of .claude/hooks/inject-output-language.sh.»
- `plugin/hooks/inject-output-language:18` — «# Purpose: when the operator pins a non-English human-facing language via AIF_HOOK_LANG, tell the»
- `plugin/hooks/hooks.json:3` — «"UserPromptSubmit": [» (the inject-output-language arm is the second registration in this block)
