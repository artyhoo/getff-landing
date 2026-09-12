---
title: "warn-subagent-report-zcode (hook)"
description: "Plugin hook that warns when a subagent's report is missing the REPORT section, on PostToolUse:Agent (real-time) and Stop (completeness) — WARN-only, never blocks."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# warn-subagent-report-zcode (hook)

**Status:** shipped-beta · **Ships to:** plugin · **Fires at:** PostToolUse with matcher `Agent|Task` (Arm A, real-time) AND Stop (Arm B, completeness). WARN-only — exits 0 always.

## What it is

The ZCode-functional twin of `.claude/hooks/warn-subagent-report.sh`: checks that subagent (Agent tool) reports carry the REPORT section the orchestrator-worker contract requires, and warns when they do not.

## How it works

Operator decision (zcode-parity Fork 2, "ADOPT 4D"): a two-arm hybrid — PostToolUse:Agent warns in real time as each subagent returns; Stop sweeps the session transcript for a completeness pass (ZCode Stop receives `transcript_path` pointing at rollout JSONL; Agent tool_use entries carry `toolCallId` enabling dedup; Stop fires after subagent results are flushed, so no race). The REPORT-section grammar is mirrored VERBATIM from the CC source (no shared include file — standalone-script convention; a comment block at the top of each arm cites the CC source by file:line as the grammar SSOT).

**Fail mode:** deliberately WARN-not-block — exit 0 always, no `decision:"block"` (`plugin/hooks/warn-subagent-report-zcode:47` explains why: blocking a Stop on report grammar would gate a judgment call — the maintainer's `#gate-where-judgment-needed` decision). The failing channel is the warning surfaced to the model/operator.

## Satellites & companions

ADAPTS `.claude/hooks/warn-subagent-report.sh` (the portable-spec pair owning the grammar SSOT); ADDS the two-arm ZCode hybrid (rejected: Stop-only latency penalty; Post-only completeness gap on >120 KB payloads; CC-only breaks parity). Evidence base: the 2026-07-18 zcode-parity S4 research patch (R1-R5).

## Anchors

- `plugin/hooks/warn-subagent-report-zcode:1` — «#!/usr/bin/env bash»
- `plugin/hooks/warn-subagent-report-zcode:2` — «# warn-subagent-report-zcode — ZCode-functional twin of .claude/hooks/warn-subagent-report.sh»
- `plugin/hooks/warn-subagent-report-zcode:4` — «# @dual-pair: warn-subagent-report»
- `plugin/hooks/warn-subagent-report-zcode:47` — «# WARN-not-block is preserved deliberately: exit 0, and NO `decision:"block"` — blocking a Stop»
- `plugin/hooks/hooks.json:57` — «"PostToolUse": [» (Arm A); `plugin/hooks/hooks.json:151` — «"Stop": [» (Arm B)
