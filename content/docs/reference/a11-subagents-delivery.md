---
title: "20-agents — sub-agents delivery + skill-context overrides (A11)"
description: "The stage that ships .claude/agents/*.md (seven authoring-only agents excluded, two discipline agents factory-only) and the .ai-factory/skill-context/ overrides."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# 20-agents — sub-agents delivery + skill-context overrides (A11)

**Status:** shipped-beta · **Ships to:** npm lane — agents at all tiers; two discipline agents (and their paired skill-context) only at `factory` or via the legacy `--with-aif-suite` escape · **Fires at:** install time, stage 20

## What it is

`setup.d/20-agents.sh` — the stage that copies the sub-agent payloads into the consumer's `.claude/agents/` and the skill-context overrides into `.ai-factory/skill-context/`. It encodes the agent-collision resolution: where a getff agent would collide with an AI-factory agent already on the consumer tree, getff keeps out of the way and delivers its content through the skill-context override channel instead.

## How it works

The stage loops over `agents/*.md` in the framework payload. Seven authoring-only agents are excluded from shipping entirely (`manual-rule-liveness-prober`, `shipped-agent-liveness-prober`, `backward-sweep-auditor`, `dual-channel-drift-auditor`, `adapter-jig-reviewer`, `dispatch-input-checker`, `getff-cold-run-prober` — framework-side tools, not consumer payload). Two discipline agents (`orchestrator-worker-discipline`, `reviewer-discipline`) presuppose the aif-handoff operator runtime, so they ship only under `--profile factory` or the legacy escape — with one parity carve-out: if a copy is already on disk, it keeps being refreshed (presence counts as prior opt-in).

Delivery is via `copy_safe` (skip-if-exists, A3). Freshly-written copies get one post-copy transform: internal `../docs/…` and `../.claude/rules/…` links are rewritten because `rules/` is not shipped — and the transform touches only fresh copies, never a skipped consumer-owned file.

The §3c half derives the skill-context copy set from `SHIPPED_DOCS` (one source, so the agent list and the skill-context list cannot drift) and copies each `packages/core/templates/shared/skill-context/*/SKILL.md` into `.ai-factory/skill-context/<skill>/SKILL.md`. The `aif-orchestrator-discipline` override carries the same factory-only gate as its paired agent.

Opt-out: decline the factory profile (or the legacy flag) and the operator-runtime agents + their paired override simply don't land; every shipped file is skip-if-exists.

## Satellites & companions

ADDS the collision-resolution channel over AI-factory's native wiring: instead of shipping colliding agents, getff rides AIF's mandatory skill-context reads. The three skill-context template files are censused as E15-E17 (the same files, template-tree view). The plugin's agent twins (I8) are a separate, plugin-side payload generated from the same agent sources.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `setup.d/20-agents.sh:2` — «# setup.d/20-agents.sh — §2 Sub-agents + §3c skill-context overrides.»
- `setup.d/20-agents.sh:24` — «for f in "$PKG_ROOT"/agents/*.md; do»
- `setup.d/20-agents.sh:26` — «    manual-rule-liveness-prober.md) continue ;;  # authoring-only tool (#552)»
- `setup.d/20-agents.sh:33` — «    orchestrator-worker-discipline.md|reviewer-discipline.md)»
- `setup.d/20-agents.sh:43` — «  # Agents carry ](../docs/…) + ](../.claude/rules/…) refs that dangle on a consumer tree»
- `setup.d/20-agents.sh:50` — «    transform_internal_refs "$_dst"»
- `setup.d/20-agents.sh:55` — «# skill-context overrides — AIF-native "extend a vendored sub-agent" mechanism (C-1, SSOT #50).»
