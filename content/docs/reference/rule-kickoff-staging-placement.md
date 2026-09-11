---
title: "kickoff-staging-placement — dispatch-input placement"
description: "Class A rule: dispatch kickoffs are tracked files read from the staging branch — merge the kickoff to staging BEFORE dispatching; plus the two render-as-success traps (CANON-symlink swallow, kickoff-name near-miss) with their shipped gates."
---

> **Census id:** F17 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F17: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «editing/creating any file under `.claude/orchestrator-prompts/<umbrella>/`.» (`.claude/rules/kickoff-staging-placement.md:13`) — paths:(1) + edit-time inject |

## What it bans

Dispatching against a kickoff that only exists on a feature branch, and authoring mistakes on this surface that «render as success». `.claude/rules/kickoff-staging-placement.md:7` «# Kickoff staging-placement — dispatch-input discipline»; the rule: `:21` «Kickoffs under `.claude/orchestrator-prompts/<umbrella>/kickoff.md` are **tracked** files, read from the **`staging`** branch by every dispatch consumer:» and `:26` «A kickoff that exists **only on a feature worktree branch is invisible** to them.» The binding sequence: `:28` «**Sequence (binding):** author the kickoff → **merge it to `staging`** (PR, squash) → **only then** hand out `/pipeline <umbrella>` or initiate an aif dispatch.» Origin: `:17` «The first time, a `/pipeline pipeline-i18n-fix` run on staging resolved to a stale same-named plan and fixed the wrong thing (PR #578 ≠ the intended output-directive).» Class header: `:12` «> **Class:** A — companion principle test shipped at [packages/core/principles/44-kickoff-authoring-traps.test.ts] (2026-09-02), plus two earlier-channel gates … **§1 itself stays ungated** — merge *timing* … is not assertable at any branch-scoped channel».

## Never (fires)

The three anti-patterns («all three share one shape: **an authoring mistake on this surface that renders as success**», `:53`): `.claude/rules/kickoff-staging-placement.md:55` «### §5.1 `#dispatch-before-staging»` — «The dispatch session (on `staging`) silently can't find it and either no-ops or resolves to a stale same-named artifact.»; `:59` «### §5.2 `#canon-symlink-swallows-commit»` — «…the commit takes a **symlink** instead of the content» (`:61`), measured: `:65` «commit `9e046c6d55` carried `120000 blob 2d02…` while the 232-line kickoff existed only in `$CANON`»; `:71` «### §5.3 `#kickoff-name-near-miss»` — «Naming a stage kickoff so that it **just misses** the stage-kickoff family, making every gate treat it as a deliberate sidecar and report green having examined nothing.»

## Always (clean)

Write + add in one step, and a resolvable name: `:67` «**Counter:** write the file and `git add` it in **one step**.» and `:79` «**Counter:** a `kickoff-*` name must resolve to one of exactly two things — the stage form `kickoff-<letter><digit>[alnum].md`, or a named sidecar (`kickoff[-<stage>].<kind>.md`, or the exact-name allowlist). Anything else is a loud error naming both alternatives, never a silent reclassification.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:25` «| `kickoff-staging-placement.md` | A | editing/creating any file under `.claude/orchestrator-prompts/<umbrella>/`. | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/kickoff-staging-placement.md:9` «<!-- globs: .claude/orchestrator-prompts/** -->», inject text at `:10` («Author → MERGE the kickoff to staging → only THEN hand out»).
- **Companion principle test (CI):** `packages/core/principles/44-kickoff-authoring-traps.test.ts` — arm A (symlink mode `120000` via `git ls-files -s`) + arm B (on-disk population) (`:45-46`).
- **Earlier-channel gates:** `.husky/pre-commit` CANON-symlink section (error) + `check-kickoff-traps.sh` arm 3 (`:12`, `:45-46`); SSOT for names is `classifyKickoffName` in `packages/core/principles/kickoff-population.ts` (`:79`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: §1 merge-timing is prose + inject by design (`:36` — «there is no pre-push/CI gate for «is this kickoff on staging yet?», because at author time the answer is legitimately «not yet»»).
