---
title: "render-harness-config.mjs — harness config renderer"
description: "Derives per-harness runtime config (CC + zcode) from ONE neutral SSOT (.ai-factory/harness-model.json) — every harness config a thin, drift-gated derivation; off-set hook events are declared loudly, never dropped silently."
---

> **Census id:** F40 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`; **this file changed in the census→pin drift window and was re-probed fresh before drafting**). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F40: MISSING → drafted E4) |
| Ships-to | clone only — framework tooling (operator-axis; a consumer-facing emitter is a parked fork) |
| Fires-at | manual regen / drift test over the derived harness configs |

## Invocation

`node scripts/render-harness-config.mjs (--write | --check) [--root <dir>]` — modes at the header: `scripts/render-harness-config.mjs:19` « * Modes: `--write` (emit) | `--check` (drift, exit 1 on mismatch). `--root <dir>`» / `:20` « * overrides the SSOT search root (default: walk up from cwd). Node, zero deps.»

## Exit codes

- **0** — write emitted / check clean.
- **1** — drift on check (`:19` «(drift, exit 1 on mismatch)»); enforced by the drift gate `packages/core/hooks/harness-config-drift.test.ts` (named at `:12-13`).
- **2** — usage error (mode parse, same pattern as sibling renderers).

## What it probes

That the per-harness configs are thin derivations of one neutral model — and that ZCode's inexpressible surface is declared, not dropped. Header: `scripts/render-harness-config.mjs:3` « * render-harness-config — derive per-harness runtime config from ONE neutral SSOT.»; the why: `:4-7` « * WHY (#894): non-CC harnesses that don't read `.claude/` (zcode, a CC fork the / * framework is developed inside) install to /dev/null — hooks never fire, no MCP, / * no skills. This renderer makes the framework's edit-time machinery visible to / * such a harness WITHOUT hand-copying config (which would be #sync-by-copy-paste,»; the SSOT + drift gate: `:10-13` « * SSOT = `.ai-factory/harness-model.json`; / * every harness config is a THIN derivation of it, drift-gated / * (packages/core/hooks/harness-config-drift.test.ts, channel test:hooks).» The expressibility SSOT quoted fresh at this pin: `:46-54` `const ZCODE_EVENTS = new Set([` `'SessionStart', 'UserPromptSubmit', 'PreToolUse', 'PermissionRequest', 'PostToolUse', 'PostToolUseFailure', 'Stop',` `]);` with the loud-declaration rule `:44-45` «// set cannot be expressed on zcode and MUST be declared LOUDLY, not dropped / // silently (attention-is-not-a-mechanism.md §1).» and the inert-matcher declaration `:63` «const ZCODE_UNSUPPORTED_TOOLS = new Set(['MultiEdit']);»

## Where it lives

Clone-only at `scripts/render-harness-config.mjs`; operator-axis only — `:22-23` « * Operator-axis only: zcode.json + .zcode/ are gitignored maintainer-env shims. / * A per-harness emitter shipped to consumers via install.sh is a PARKED fork (#894 §7).» The plugin emission half (`emitPlugin`, `:436`) is the single source for `plugin/hooks/hooks.json` (`:190`, `:286`), filtering to `ZCODE_EVENTS` and the `PLUGIN_INCOMPATIBLE` map (`:445`, `:463`) — the same SSOT the zcode-parity doctrine (census F30) cites.
