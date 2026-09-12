---
title: "dual-implementation-discipline — dual-channel implementation"
description: "Class A rule: every CC-native hook declares @dual-pair or @cc-only-rationale; delivery channels are triaged by audience; drift between channel twins is checked deterministically or by a named cold agent — never bare attention."
---

> **Census id:** F12 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F12: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «shipping a new CC-native hook + choosing its delivery channel(s).» (`.claude/rules/dual-implementation-discipline.md:15`) — paths:(3) + edit-time inject |

## What it bans

Silent Claude-Code vendor lock-in, two-prompt drift, and brand-string capability checks. `.claude/rules/dual-implementation-discipline.md:12` «# Dual-implementation discipline — discipline rule»; the three failure modes (`:27-33`): «**(a) Two-prompt drift.** … By month 3 they describe subtly different behaviour … No mechanical check notices.», «**(b) Silent CC vendor lock-in.** … the composed result is that the consumer-facing product works only inside Claude Code.», «**(c) Capability-check brittleness.** Code or scripts detect the CC harness by brand-name string rather than capability presence.» The inject contract: `:10` «<!-- inject: Rule: every CC hook must carry @dual-pair or @cc-only-rationale; agents/skills with a CC hook counterpart declare the same anchor. See dual-implementation-discipline.md §6. -->» Class header: `:14` «> **Class:** A — the §5 drift-check + §6 marker-presence sketches ship as an executable check: [tests/agnosticism/probes/channel-coverage.sh] (Surface 8, CI-run by [packages/core/principles/21-agnosticism-conformance.test.ts] …) + the edit-time gate [.claude/hooks/check-hook-marker.sh] (§6, PostToolUse).»

## Never (fires)

The §8 anti-patterns: `.claude/rules/dual-implementation-discipline.md:191` «**`#two-prompts-drift`** — two artefacts for the «same» capability diverge by ≥3 substantive lines … «a reviewer will diff them» is not a mechanism»; `:193` «**`#brand-name-detection`** — code branches on a brand string (`"claude"`, `"cc"`, `ANTHROPIC`) in runtime logic. **Gated** … The shipped detector matches a brand literal only in *comparison* position»; `:195` «**`#cc-only-without-rationale`** — a CC-native hook ships without `@cc-only-rationale` or `@dual-pair` marker.»; `:199` «**`#sync-by-copy-paste`** — two channel artefacts share semantic text via manual copy rather than a SSOT pointer.»

## Always (clean)

A shipped hook with its channel marker — the §5 grammar: `.claude/rules/dual-implementation-discipline.md:128` «- **Bash scripts** (CC hooks under `.claude/hooks/`): `# @dual-pair: <anchor>` (shell comment).» / `:129` «- **Markdown agents/skills** (under `agents/`, `.claude/skills/`): `<!-- @dual-pair: <anchor> -->` (HTML comment — markdown has no `#` comment syntax; `#` is a heading).» Single-source-of-truth pairing: `:183` «- **CC hook + portable agent pair:** the portable agent's markdown is the authoritative human-readable spec. The CC hook is a mechanical implementation of the same check. The hook header carries `# spec: agents/<name>.md`.» Documented deviations carry the marker: `:101` «Examples: `# @deviation-rationale: Consumer-facing default dual — consumer base provably CC-only per <metric or doc reference>`».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:20` «| `dual-implementation-discipline.md` | A | shipping a new CC-native hook + choosing its delivery channel(s). | paths:(3), edit-time inject |»
- **Edit-time inject**, 3 globs: `.claude/rules/dual-implementation-discipline.md:9` «<!-- globs: .claude/hooks/**, agents/**, .claude/skills/** -->», inject text at `:10`.
- **Edit-time gate:** `.claude/hooks/check-hook-marker.sh` (§6, PostToolUse; named at `:14`).
- **CI principle test:** `packages/core/principles/21-agnosticism-conformance.test.ts` running `tests/agnosticism/probes/channel-coverage.sh` (Surface 8) + `tests/agnosticism/probes/brand-detection.sh` (Surface 10), with paired-negatives in `tests/agnosticism/harness-self.test.sh` (`:14`).
- **Named cold agent** for the semantic half: `agents/dual-channel-drift-auditor.md` carries `#two-prompts-drift` + `#sync-by-copy-paste` — «measured-un-gateable, not merely un-attempted» (`:14`, measurement table at `:219-221`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: bash probes in CI + PostToolUse gate + named cold agent.
