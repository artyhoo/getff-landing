---
title: "render-rule-channels.mjs — rule channel table renderer"
description: "CTX Stage 3 channel-as-data: computes what every rule's declared delivery channel MEANS per harness (CC vs zcode), emitting a per-(rule × harness) matrix; refusals are loud (--check exit 1) or explicitly declared."
---

> **Census id:** F38 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F38: MISSING → drafted E4; census satellite F1) |
| Ships-to | clone only — framework tooling |
| Fires-at | manual regen / CI drift check over the rule-channel matrix |

## Invocation

`node scripts/render-rule-channels.mjs (--write | --check | --json) [--root <dir>]` — three modes: `scripts/render-rule-channels.mjs:247-249` («const mode = argv.includes('--check')» … `:254`) and no mode is a usage error: `scripts/render-rule-channels.mjs:254` «if (!mode) { console.error('usage: render-rule-channels.mjs (--write | --check | --json) [--root <dir>]'); return 2; }»

## Exit codes

- **0** — check clean / write emitted.
- **1** — refusal or drift, loud by design: `scripts/render-rule-channels.mjs:21` « * cross-harness delivery — a refusal must be loud (`--check` exit 1) or explicitly» and the `return 1;` arms at `:268` / `:279`.
- **2** — usage error.

## What it probes

That each rule's declared channel is real per harness — not just declared. Header: `scripts/render-rule-channels.mjs:2` « * render-rule-channels — CTX Stage 3, "channel-as-data" lite (design §4 Тезис B).»; the why: `:4-8` « * WHY: CTX Stage 2 (principle 31) gates that every `.claude/rules/*.md` DECLARES a / * delivery channel … It does NOT compute what / * that declaration actually MEANS on a harness other than CC — e.g. `paths:` / * frontmatter is a CC-native read-time primitive; zcode has no such primitive»; the computation: `:9-12` « * per-(rule × harness) reality DATA: for every Tier-0 core rule and every / * `paths:`-declaring rule, and for every harness marked `"support":"supported"` in / * the capability matrix, compute one of:». The `--write` mode is deliberately narrow: `:33-35` « * Modes: `--write` (emit the degradation manifest scaffold if absent — does NOT» / « * array if missing so `--check` has something to diff against) | `--check` (compute».

## Where it lives

Clone-only at `scripts/render-rule-channels.mjs`; consumes the channel declarations of `.claude/rules/*.md` (census F1's corpus) plus the harness capability matrix; its output feeds the same channel-honesty surface the rule pages above describe.
