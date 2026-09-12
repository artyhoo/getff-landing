---
title: "zcode-parity-doctrine — non-CC-harness parity doctrine"
description: "Class A SSOT pointer-aggregator for ZCode parity: the 22-hook census table (parity / zcode-gap / cc-only / plugin-gap), per-degradation rationale, the agnosticism tier table, and the runtime-probe gate that asserts binary claims before docs are trusted."
---

> **Census id:** F30 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`; this file changed in the census→pin drift window and was re-probed fresh before drafting). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F30: MISSING → drafted E4; census satellite D8) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «editing hook twins, the harness-config renderer, or zcode-parity decision docs.» (`.claude/rules/zcode-parity-doctrine.md:18`) — paths:(10) + edit-time inject |

## What it bans

Silent divergence between the Claude Code harness and ZCode (the first non-CC harness), and doc-ahead-of-runtime parity claims. `.claude/rules/zcode-parity-doctrine.md:15` «# ZCode parity doctrine — discipline rule»; the goal: `:27` «The framework's goal is **full ZCode parity**: any hook, any skill, any consumer-facing artefact that ships on Claude Code ships equivalently on ZCode, with documented fallbacks or accepted-degradation rationale for any CC-native primitive ZCode cannot express.» Current stance: `:33` «CC-first today (full features) + analogous for others (ZCode today; Cursor/Codex/Windsurf on roadmap; Aider out-of-scope — no hook system).» The census SSOT is §2: `:37` «**Row identifier = hook basename.** … this table is the compact form»; `ZCODE_EVENTS` quoted from `:39` «`ZCODE_EVENTS` = `{SessionStart, UserPromptSubmit, PreToolUse, PermissionRequest, PostToolUse, PostToolUseFailure, Stop}` ([`scripts/render-harness-config.mjs:46-54`]). `SubagentStart`, `SubagentStop`, `WorktreeCreate` are NOT expressible on ZCode.» Class header: `:17` «> **Class:** A — companion principle test shipped at [packages/core/principles/09-doc-authority-hierarchy.test.ts] (doctrine registered in `REQUIRED_HEADER_DOCS`; the doctrine itself is a SSOT pointer-aggregator, the enforcement lives in existing gates per §6).»

## Never (fires)

Editing a hook twin or the renderer without checking the census classification — the inject text: `.claude/rules/zcode-parity-doctrine.md:23` «<!-- inject: ZCode parity doctrine — full parity is the goal (CC-first + AI-agnostic by design). Before editing hooks or render-harness-config, check §2 census for whether the hook has ZCode parity / plugin twin / CC-only rationale, and §3 for whether a Wave B stage changes its classification. -->» The classification rollup at `:66`: «`parity` (strict) = 10 rows …; `zcode-gap` = 4 (7, 9, 13, 17 …); `cc-only` = 4 (16, 20, 21, 22).» And the load-bearing honesty rule: `:124` «The Cursor caveat (docs-verified, not live-tested) is the load-bearing honest disclosure. The doctrine does NOT claim runtime-verified Cursor support — only that the CC overlap makes it structurally supported.»

## Always (clean)

A parity claim probed against the runtime binary, not the vendor doc — §4 row 21: `.claude/rules/zcode-parity-doctrine.md:97` «**Status:** accepted-degradation; revisit when a PreCompact-class event appears in the runtime enum — probe the binary (`grep -ac PreCompact zcode.cjs`), not the vendor doc (S-verify 2026-09-10 §6).» The executable form is the runtime-probe gate (§6, `:133`): «**Runtime-probe gate (Fork B, 2026-09-11):** [`scripts/probe-zcode-runtime.sh`] + `packages/core/hooks/zcode-runtime-probe.test.ts` — the parity SSOT's binary claims … asserted against the INSTALLED bundle; skips loudly where the app is absent. Drift fails here before any doc is trusted — the executable form of §4 Row 21's «probe the binary, not the doc».»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:38` «| `zcode-parity-doctrine.md` | A | editing hook twins, the harness-config renderer, or zcode-parity decision docs. | paths:(10), edit-time inject |»
- **Edit-time inject**, 10 globs: `.claude/rules/zcode-parity-doctrine.md:22` «<!-- globs: .claude/hooks/**, scripts/render-harness-config.mjs, plugin/hooks/**, docs/meta-factory/zcode-parity-mega.decisions.md, … -->».
- **Companion principle test (CI):** principle 09 registration (`:17`) — header presence; the doctrine's own statement: «the doctrine itself is a SSOT pointer-aggregator, the enforcement lives in existing gates per §6».
- **Renderer SSOT:** `scripts/render-harness-config.mjs` — `ZCODE_EVENTS` (`:46-54`), `ZCODE_UNSUPPORTED_TOOLS` (`:63`), backup-path loud-declarations (`:256-268`) (§6 cross-reference, `:132`).
- **Runtime-probe gate:** `scripts/probe-zcode-runtime.sh` + `packages/core/hooks/zcode-runtime-probe.test.ts` (`:133`).
- Not backend-rendered — no FF7001/FF7002 diagnostic applies to this rule (those are backend render refusals, `packages/core/diagnostics/registry.ts:321`/`:329`; this rule's honest status is markdown SSOT + edit-time inject + the existing principle-09 and runtime-probe gates).
