---
title: "memory-codification — codify durable conventions"
description: "Class B rule: a durable behavioural convention written to agent memory is codified into the repo in the same step and the memory entry reduced to a pointer — CI is structurally unreachable, so the ceiling is B by construction."
---

> **Census id:** F19 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F19: MISSING → drafted E4; census satellite D15 — the plugin hook) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «writing a durable behavioural convention to agent memory.» (`.claude/rules/memory-codification.md:6`) — hook channel |

## What it bans

Durable conventions stranded in user-scope agent memory — «stage-0», enforced by nothing. `.claude/rules/memory-codification.md:1` «# Memory codification — discipline rule»; the problem: `:16` «But a convention recorded **only in user-scope agent memory** (`~/.claude/projects/<slug>/memory/*.md`) is invisible to that machinery: it is not in the repo, not in git history, not reachable by any CI gate, and not visible to a teammate or a fresh session without the same memory store. It is **stage-0** — the worst case, enforced by nothing but the recall of whichever session happens to load it.» The hard constraint that sets the ceiling: `:18` «**Hard constraint (load-bearing):** user-scope memory lives *outside the repo and outside CI by construction*. … **never** by a repo test or CI gate. This is why this rule's ceiling is Class B, not A.» Origin audit: `:10` «The audit swept all 51 memory files and found **15 stage-0** entries».

## Never (fires)

The anti-patterns: `.claude/rules/memory-codification.md:73` «- **`#convention-stranded-in-memory`** — a durable behavioural rule written to memory with no repo codification and no `TODO-codify:` marker. The stage-0 worst case.»; `:74` «- **`#test-the-memory`** — proposing a CI gate / principle test over the memory store. Category error (§1 hard constraint): memory is outside CI.»; `:75` «- **`#pointer-without-codification`** — memory entry reduced to a pointer, but the pointed-to repo artifact was never actually written (dangling pointer).»; `:76` «- **`#codify-everything`** — over-applying: codifying ephemeral state, identity, or reference facts that legitimately belong in memory (§2 left column).»

## Always (clean)

The write-time discipline, quoted: `.claude/rules/memory-codification.md:37` «When a session writes a durable convention to memory, **in the same step**:» `:39` «1. **Codify it in the repo** at its natural home — [CLAUDE.md] for AI-tooling conventions, a new or existing `.claude/rules/*.md` for discipline rules …, or the relevant doc under `docs/meta-factory/.`» and `:40` «2. **Reduce the memory entry to a one-line pointer**: `See <repo-path> — codified at <SHA>` … The memory note becomes a recall-time index entry, not the source of truth.» The mid-task exception: `:43` «record it in memory **with an explicit `TODO-codify:` marker** and a one-line rationale, then codify in a dedicated follow-up.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:27` «| `memory-codification.md` | B | writing a durable behavioural convention to agent memory. | hook |»
- **Hook channel (write-time, wired):** `.claude/rules/memory-codification.md:3` «<!-- channel: hook .claude/hooks/inject-memory-codification.sh -->» — a PostToolUse hook firing on `Write` to a `/memory/` path, injecting the §3 one-liner; registration live at `.claude/settings.json:168` (`:49`); self-tested at `packages/core/hooks/inject-memory-codification.test.ts`.
- **Local-audit grep** (`:55-63`): a push sweep flagging convention-shaped memory entries lacking a codification pointer — «It is a *push* sweep, not a gate» (`:65`).
- **AI-agnostic auditor agent:** `agents/memory-codification-auditor.md` (`:12`, `:67`) — session-read, no paid LLM.
- Census satellite D15 = `plugin/hooks/inject-memory-codification` (the plugin-lane twin; census row F19 satellites column).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: write-time hook + local grep + auditor agent, Class-B ceiling permanent per §1.
