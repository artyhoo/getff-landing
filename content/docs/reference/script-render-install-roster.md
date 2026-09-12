---
title: "render-install-roster.mjs — install roster renderer"
description: "Renders the consumer install roster for INSTALL-FOR-AI.md from the SAME manifest the installer executes — the doc and the installer cannot disagree silently; --write emits, --check exits 1 on drift."
---

> **Census id:** F41 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F41: MISSING → drafted E4; census satellite A — installer engine family) |
| Ships-to | clone only — framework tooling |
| Fires-at | manual regen / CI drift check over the INSTALL-FOR-AI.md roster |

## Invocation

`node scripts/render-install-roster.mjs (--write | --check) [--root <dir>]` — `scripts/render-install-roster.mjs:108` «const mode = argv.includes('--check') ? 'check' : argv.includes('--write') ? 'write' : null;» and `:109` «if (!mode) { console.error('usage: render-install-roster.mjs (--write | --check) [--root <dir>]'); return 2; }»

## Exit codes

- **0** — write emitted / check clean.
- **1** — drift on check: `scripts/render-install-roster.mjs:28` « * Modes: `--write` (emit) | `--check` (drift, exit 1 on any failure).» with region-missing drift at `:139` «    if (!present.has(id)) drift.push(`${TARGET}: region \`${id}\` missing (run --write)`);» and the fix hint `:146` «  Fix: npx tsx scripts/render-install-roster.mjs --write»;».
- **2** — usage error.

## What it probes

That the documented install roster equals what the installer actually ships. Header: `scripts/render-install-roster.mjs:2` « * render-install-roster — deterministic consumer install roster for INSTALL-FOR-AI.md»; the lying-doc origin: `:6-8` « * WHY: the "This installs" roster in INSTALL-FOR-AI.md restated the installer's shipped / * agent/skill sets by hand and drifted (the same lying-doc class the D1 inventory records). / * This renderer extracts the roster from the SAME manifest the installer executes, so the / * doc and the installer cannot disagree silently.»; the SSOT: `:10-12` « * SOURCES OF TRUTH (read, never re-stated from memory): / *   - agents shipped by default: every `agents/*.md` MINUS the authoring-only skip-list». Lineage note: `:30` « * Precedent: scripts/render-rule-index.mjs --write/--check; scripts/render-harness-config.mjs.»

## Where it lives

Clone-only at `scripts/render-install-roster.mjs`; renders the framework's own `INSTALL-FOR-AI.md` (the installer-engine family's consumer-facing doc, census satellites A1/A2); the CI `--check` arm follows the same pattern as the rule-index renderer.
