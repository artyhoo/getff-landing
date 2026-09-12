---
title: "00-rule-index — generated rule index"
description: "The generated one-line-per-rule digest of the .claude/rules corpus: what it is authoritative for, its regen command, and the pre-push drift check that gates hand-edits."
---

> **Census id:** F1 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F1: MISSING → drafted E4) |
| Ships-to | clone only — the rules corpus is framework-internal (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | every pre-push (drift check); manual regen via `npx tsx scripts/render-rule-index.mjs --write` |

## What it is

`.claude/rules/00-rule-index.md` is the **generated** index over the `.claude/rules/` discipline-rule corpus — one table row per rule. Its first line forbids hand edits: `.claude/rules/00-rule-index.md:1` «# Rule index — generated, do not hand-edit». It scopes its own authority: `.claude/rules/00-rule-index.md:3` «> **Authoritative for:** rendered rule digest. Regen: `npx tsx scripts/render-rule-index.mjs --write`.» and `.claude/rules/00-rule-index.md:4` «> **NOT authoritative for:** project goal — see [README.md](../../README.md#why-this-exists). Full rule text — read `.claude/rules/<name>.md`.»

## What it carries

One line per rule: `.claude/rules/00-rule-index.md:6` «One line per rule — full text: read `.claude/rules/<name>.md` (index: `.claude/rules/00-rule-index.md`).» The table columns are `.claude/rules/00-rule-index.md:8` «| Rule | Class | Fires | Channel(s) |» — i.e. per rule: the file name, its Class (A/B/C), the fires-when scope, and the enforcement channel list. 30 rules are indexed at this pin (`ls .claude/rules/ | wc -l` → 30; census family-F enumeration).

The renderer is `scripts/render-rule-index.mjs` (census row F36 documents the `--check` consumer behavior): `.claude/rules/00-rule-index.md:3` names the regen invocation, and the renderer's own header states both modes — `scripts/render-rule-index.mjs:24` « * Modes: `--write` (emit both) | `--check` (drift + validity, exit 1 on any failure).» With no mode, it refuses: `scripts/render-rule-index.mjs:177` «if (!mode) { console.error('usage: render-rule-index.mjs (--write | --check) [--root <dir>]'); return 2; }»

## Never (fires)

A hand edit to the index (or any rule-file drift) makes the pre-push gate fire. The pre-push hook runs the checker: `packages/core/hooks/pre-push.ts:1352` «const r = run('npx', ['tsx', 'scripts/render-rule-index.mjs', '--check']);» and the checker exits 1 on drift per its mode line (`scripts/render-rule-index.mjs:24` above). It also fails loudly on incomplete rule headers rather than rendering blanks: `scripts/render-rule-index.mjs:106` « missing required fields (Class / Fires) so --check fails loudly rather than rendering "undefined". »

## Always (clean)

Regenerating from the rule files on disk: `npx tsx scripts/render-rule-index.mjs --write` (the regen command quoted at `.claude/rules/00-rule-index.md:3`). A clean tree is one where the committed index is byte-equal to the render output, so the pre-push `--check` run passes without output.

## Enforcement channels

- **Pre-push drift check** — `packages/core/hooks/pre-push.ts:1352` runs `render-rule-index.mjs --check` on every push (wired only when the script exists: `packages/core/hooks/pre-push.ts:1351` guards on `existsSync(resolve(REPO_ROOT, 'scripts/render-rule-index.mjs'))`).
- **Generated-artifact discipline** — the «do not hand-edit» contract at `.claude/rules/00-rule-index.md:1`; there is no ESLint/hook channel that reads this file directly, so no FF diagnostic (FF7001/FF7002 are backend-render refusals, `packages/core/diagnostics/registry.ts:321`/`:329`) applies to it — the honest status is: renderer gate only.
