---
title: "render-zcode-parity-rollup.mjs — parity rollup renderer (PROPOSAL)"
description: "PROPOSAL-state renderer (maintainer sign-off pending): would render the zcode-parity census rollup into a doctrine fence; --check refuses with exit 2 until the maintainer-landed target fence exists — never silently green."
---

> **Census id:** F39 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F39: MISSING → drafted E4; census satellite F30) |
| Ships-to | clone only — framework tooling, **not wired into CI** |
| Fires-at | manual `--emit` today; CI wiring pre-declared and blocked until the fence lands |

## Invocation

`node scripts/render-zcode-parity-rollup.mjs (--emit | --check) [--root <dir>]` — note the emit flag differs from siblings: `scripts/render-zcode-parity-rollup.mjs:80` «const mode = argv.includes('--emit') ? 'emit' : argv.includes('--check') ? 'check' : null;» and `:81` «if (!mode) { console.error('usage: render-zcode-parity-rollup.mjs (--emit | --check) [--root <dir>]'); return 2; }»

## Exit codes

- **0** — check passed (only possible once the fence exists) / emit printed.
- **2** — usage error, OR the deliberate refuse-until-wired states: `:84` «if (!existsSync(join(root, CENSUS))) { console.error(`census SSOT missing: ${CENSUS}`); return 2; }» and the missing-fence refusal `:89-95` («// --check: refuse until the maintainer-landed fence exists (fail loud, never silently green).» … `:95` «    return 2;»).

## What it probes

The would-be drift between the zcode-parity census SSOT and the doctrine's rollup section. Header (honest status): `scripts/render-zcode-parity-rollup.mjs:2` « * render-zcode-parity-rollup — PROPOSAL renderer (maintainer sign-off pending; S3 D3, P1).»; why not wired: `:4-8` « * NOT WIRED: the render target — a `getff:begin section=zcode-parity-rollup` fence inside / * `.claude/rules/zcode-parity-doctrine.md` §2 — does not exist yet, because `.claude/rules/*` / * are maintainer-owned»; the CI path: `:10` « * fence). `--check` refuses until the target fence exists (exit 2), so wiring it into CI» — with the explicit do-not-wire warning `:94` « * Until it lands, use --emit to print the body. Do not wire --check into CI before the fence exists.»

## Where it lives

Clone-only at `scripts/render-zcode-parity-rollup.mjs`; consumes the zcode census/decision SSOTs (the same family the doctrine page, census F30, points to); its CI future mirrors render-rule-index/render-install-roster (`:10-11`).
