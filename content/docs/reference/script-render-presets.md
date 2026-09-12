---
title: "render-presets.mjs — pipeline preset renderer"
description: "Deterministic renderer for the launch-preset section of AI-USAGE-GUIDE.md: reads the shipped preset JSON quartet as SSOT, --write emits, --check exits 1 on drift, no mode exits 2."
---

> **Census id:** F37 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F37: MISSING → drafted E4; census satellite B8) |
| Ships-to | clone only — framework tooling, not part of a consumer install |
| Fires-at | manual regen / CI drift check over the preset section of `AI-USAGE-GUIDE.md` |

## Invocation

`node scripts/render-presets.mjs (--write | --check) [--root <dir>]` — modes parsed at `scripts/render-presets.mjs:67` «const mode = argv.includes('--check') ? 'check' : argv.includes('--write') ? 'write' : null;» and no mode is a usage error: `:68` «if (!mode) { console.error('usage: render-presets.mjs (--write | --check) [--root <dir>]'); return 2; }»

## Exit codes

- **0** — write emitted, or check found no drift.
- **1** — check found drift: `scripts/render-presets.mjs:19` « * Modes: `--write` (emit) | `--check` (drift, exit 1 on any failure).» with the fix hint at `:102` «  Fix: npx tsx scripts/render-presets.mjs --write»;» and `:103` «    return 1;».
- **2** — usage error (no mode).

## What it probes

That the launch-preset section in `AI-USAGE-GUIDE.md` is byte-derived from the shipped preset data — not hand-written. Header: `scripts/render-presets.mjs:2` « * render-presets — deterministic launch-preset section for AI-USAGE-GUIDE.md»; the SSOT discipline: `:8-10` « * SOURCE OF TRUTH (read, never re-stated from memory): / *   `.claude/skills/pipeline/references/presets/*.json` — the same directory / *   `.claude/skills/pipeline/helpers/list-presets.sh` scans;» — the same quartet the site's daily-cycle-factory page vendors (census row G8). Drift detection: `:95` «    if (!present.has(id)) drift.push(`${TARGET}: region \`${id}\` missing (run --write)`);»

## Where it lives

Clone-only tooling at `scripts/render-presets.mjs`; the rendered artifact is the framework's own `AI-USAGE-GUIDE.md` (not shipped to consumers); the site names the preset DATA (G8), not this renderer — which is exactly why this census row existed.
