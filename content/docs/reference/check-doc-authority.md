---
title: "check-doc-authority (hook)"
description: "Plugin hook that checks the doc-authority header on edits to authority documents (principle-09), delegating to the shared 09-doc-authority-hierarchy rule binary."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# check-doc-authority (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Edit|Write|MultiEdit` (path-only filter). Gate: exit 2 + stderr on violation (CC), JSON additionalContext (ZCode).

## What it is

The edit-time delivery of the principle-09 doc-authority check: when a document in the authority hierarchy is edited, this hook requires the authority header that says which file wins on conflict (the "Authoritative for / NOT authoritative for" convention this very site's pages descend from).

## How it works

It delegates to `09-doc-authority-hierarchy.bin.ts` (Batch A, sub-wave 7.1.c); the CLI filters to REQUIRED_HEADER_DOCS and exits 0 for other paths. The matcher is load-bearing and enforced: because this hook validates a FILE's content (path-only, no internal tool_name filter), its registration matcher MUST be `Edit|Write|MultiEdit` — else a MultiEdit that strips an authority header slips past silently (a `@file-content-gate`, enforced by check-hook-marker.sh). Channel semantics identical to validate-prompt: exit 2 + stderr is the only non-JSON channel the model receives on PostToolUse; exit-1 stderr reaches the operator transcript only. Off-switch: `AIF_DOC_AUTHORITY=0` (`plugin/hooks/check-doc-authority:95`).

**Fail mode:** exit 2 + stderr (CC) / JSON emit (ZCode) when an edited authority doc lacks its required header; silent exit 0 off-path.

## Satellites & companions

USES the generated rule binary `packages/core/principles/09-doc-authority-hierarchy.bin.ts` and the rule prose at `.claude/rules/doc-authority-hierarchy.md:13`; the portable enforcement of the same rule is the principle-09 CI test (a rule+test lifecycle). Shares the `plugin/hooks/lib/hook-emit.sh` prelude.

## Anchors

- `plugin/hooks/check-doc-authority:1` — «#!/usr/bin/env bash»
- `plugin/hooks/check-doc-authority:3` — «# Wave 7 7.2.c — PostToolUse: principle-09 authority header quick-check.»
- `plugin/hooks/check-doc-authority:4` — «# Delegates to 09-doc-authority-hierarchy.bin.ts (Batch A, sub-wave 7.1.c).»
- `plugin/hooks/check-doc-authority:95` — «[[ "${AIF_DOC_AUTHORITY:-1}" == "0" ]] && exit 0»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (the check-doc-authority arm, matcher `Edit|Write|MultiEdit`)
