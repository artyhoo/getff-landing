---
title: "attention-is-not-a-mechanism — hope-as-gate prohibition"
description: "Class C prose rule: a load-bearing check must be a deterministic gate or a named cold-agent protocol — bare human/AI attention may hold merge authority but is never the detection layer."
---

> **Census id:** F4 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F4: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «designing any load-bearing check (gate vs. bare human/AI attention).» (`.claude/rules/attention-is-not-a-mechanism.md:4`) — always-on core |

## What it bans

Checks whose detection layer is someone's attention. `.claude/rules/attention-is-not-a-mechanism.md:1` «# Attention is not a mechanism — discipline rule»; the rule itself: `.claude/rules/attention-is-not-a-mechanism.md:17` «A load-bearing check MUST be one of: (a) a deterministic gate at the earliest reachable» / `:18` «channel, or (b) a NAMED cold-agent protocol with structured output» — and the prohibition: `:19` « Bare human attention — «a reviewer will read» / «the diff» — and unstructured AI attention — «the model will notice» — are NOT mechanisms; they» / «may serve only as decision/merge authority on top of (a)/(b).» Class header: `.claude/rules/attention-is-not-a-mechanism.md:3` «> **Class:** C — prose-only; promotion criterion in §3.»

## Never (fires)

The two named anti-patterns: `.claude/rules/attention-is-not-a-mechanism.md:28` «- `#hope-as-gate` — a check whose failure mode is «nobody looked». Counter: (a)/(b) above.» and `:29` «- `#warning-nobody-reads` — load-bearing warnings. Counter: error+escape or agent-audited.» The warning corollary makes the firing shape concrete: `.claude/rules/attention-is-not-a-mechanism.md:21` «error-with-escape-token» — in context: `:20-24` «Corollary: a WARNING whose only» / «consumer is «someone reads the log» is attention-dependent detection — either promote to» / «error-with-escape-token (rationale ≥20 chars; precedent [ci-tool-pinning.md §3](ci-tool-pinning.md)) or route to a» / «named agent audit.» Origin evidence (a flipped claim caught by nothing): `:11` «> Evidence base: P3 (a flipped «Enforces» claim in AGENTS.md caught by NOTHING — zero readers);»

## Always (clean)

A check that is either a deterministic gate at the earliest reachable channel or a named cold-agent protocol with structured output (compliance-verifier / backward-sweep-auditor / docplan-auditor class — `:17-19` above). First consumers quoted: `.claude/rules/attention-is-not-a-mechanism.md:39` «First consumers ship with MT S4: composition gate FF8002 as error+excluded-escape (not» / `:40` «warning), and `agents/docplan-auditor.md` replacing «human reads the plan diff». This rule»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:12` «| `attention-is-not-a-mechanism.md` | C | designing any load-bearing check (gate vs. bare human/AI attention). | always-on core |» — **always-on core**, no executable artifact today.
- Promotion path (`.claude/rules/attention-is-not-a-mechanism.md:33`): «Promote to audit-checklist dimension (Phase -1 / reviewer protocols) after 3 documented» / «incidents in 6 months where a bare-attention check missed a real defect.»
- Not backend-rendered — no FF diagnostic applies to this rule itself (FF7001/FF7002 are backend render refusals, `packages/core/diagnostics/registry.ts:321`/`:329`; the FF8002 mention at `:39` is a downstream consumer's composition gate, quoted where it appears, not this rule's channel). Honest status: always-on prose + named-agent audits at consumption sites.
