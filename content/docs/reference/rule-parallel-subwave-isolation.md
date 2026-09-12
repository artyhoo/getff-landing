---
title: "parallel-subwave-isolation — sub-wave worktree isolation"
description: "Class C rule: parallel AI sessions always get git worktrees (never a shared working directory); sequential execution is the fallback when worktree-add fails — the enforcement primitive is dogfooded from upstream, not built."
---

> **Census id:** F21 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F21: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «dispatching parallel sub-wave / batch AI sessions.» (`.claude/rules/parallel-subwave-isolation.md:12`) — paths:(1) + edit-time inject |

## What it bans

Parallel AI sessions in a shared working directory. `.claude/rules/parallel-subwave-isolation.md:6` «# Parallel sub-wave isolation — discipline rule»; the discipline: `:20` «For parallel sub-wave / batch execution under the orchestrator pattern, **always use git worktrees**. Never run parallel Sonnet (or any parallel AI) sessions in the shared working directory.» Origin incident: `:16` «Shared working directory across parallel Sonnet sessions caused branch contamination — Wave 8.1's commit ended up on `wave-8.1b/compliance-verifier-agent` branch because junior sessions raced on `git checkout -b`.» Class header: `:11` «> **Class:** C — prose-only; the preventive enforcement primitive is **dogfooded from upstream** (Superpowers `using-git-worktrees`, SSOT #65) rather than built — the own AST-detection ambition is **dropped** per §4 (N7, 2026-05-22).»

## Never (fires)

The anti-patterns: `.claude/rules/parallel-subwave-isolation.md:44` «- **`#shared-workdir-parallel`** — multiple parallel AI sessions opening `~/code/<repo>/` directly. Even if each starts on a different branch, `git checkout -b` mid-session races on the shared `.git/index`. The first to write wins; the second may silently commit to the wrong branch.»; `:45` «- **`#branch-race-on-checkout`** — variant; orchestrator dispatches «Session A: checkout branch X / Session B: checkout branch Y» without worktree isolation.»; `:46` «- **`#worktree-add-failure-ignored`** — Sonnet session encounters `git worktree add` failure, silently proceeds in shared dir. Counter: prompt MUST instruct «if worktree-add fails, STOP and report to orchestrator — do not proceed in shared dir».»

## Always (clean)

Worktree setup as the first step of every parallel batch, via the portable helper: `.claude/rules/parallel-subwave-isolation.md:27` «bash scripts/create-worktree.sh <name>» — «Portable: creates .claude/worktrees/<name>/ on branch worktree-<name>, base ref auto-detected» (`:25-26`). The Bug-1 footgun warning: `:32` «the older raw `git worktree add ../<repo>-wave-<N> main` hard-codes `main` as the base — a footgun since the 2026-05-22 staging-trunk migration». Fallback: `:38` «If worktree-add fails …, the orchestrator falls back to **sequential execution** — not concurrent shared-dir execution.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:29` «| `parallel-subwave-isolation.md` | C | dispatching parallel sub-wave / batch AI sessions. | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/parallel-subwave-isolation.md:8` «<!-- globs: .claude/orchestrator-prompts/** -->», inject text at `:9` («use git worktrees (scripts/create-worktree.sh). Never run parallel sessions in shared workdir.»).
- **Dual-channel create capability:** `scripts/create-worktree.sh` (BUILD half) + `.claude/hooks/worktree-setup.sh` (CC-native half, fires on `claude -w <name>), shared `worktree-create-setup` dual-pair anchor (`:30`).
- Enforcement primitive referenced, not rebuilt: Superpowers `using-git-worktrees` (SSOT #65; REFERENCE verdict, `:50`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: prose mandate + edit-time inject + upstream primitive.
