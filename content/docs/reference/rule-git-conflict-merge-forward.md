---
title: "git-conflict-merge-forward — merge-forward conflict policy"
description: "Class B verified recipe: fix a CONFLICTING PR by merging the base INTO the PR branch and plain-pushing the fast-forward — never rebase a published PR branch in an agent session; generated conflicts are regenerated, semantic ones park."
---

> **Census id:** F16 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F16: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «a CONFLICTING PR, or any rebase/force-push urge.» (`.claude/rules/git-conflict-merge-forward.md:6`) — claude-md channel |

## What it bans

Rebasing a published PR branch from an agent session, and hand-merging generated conflicts. `.claude/rules/git-conflict-merge-forward.md:1` «# Git conflict merge-forward — discipline rule»; the rule: `:14` «To fix a CONFLICTING PR, **merge the base branch INTO the PR branch and plain-push** (the push is a fast-forward of the remote PR tip, so no force is needed). **Never `git rebase` a published PR branch in an agent session**: the follow-up force-push is classifier-blocked for agents in every form». Why rebase is a dead end: `:48-51` («`git push --force` / `-f` — blocked by `git-safety.sh`»; «`git push --force-with-lease` — silently denied by the harness permission classifier (verified 2026-07-21…)»; «Even if force worked: this repo squash-merges PRs, so the rebased «clean history» is collapsed into one commit anyway.»). Class header: `:5` «> **Class:** B — enforcement mechanism is the operator-global PreToolUse guard (`~/.claude/hooks/git-safety.sh` rebase/force-push arm …) + the always-on [CLAUDE.md `Harness gates`] pointer … Class A (CI principle test) is **structurally unreachable**: the violation is an agent-session *command choice*».

## Never (fires)

The anti-patterns: `.claude/rules/git-conflict-merge-forward.md:63` «- **`#rebase-reflex-on-conflicting-pr`** — reaching for `git rebase` because it is the muscle-memory fix for «branch behind base». For a published PR branch in an agent session it is a guaranteed dead end (§3).»; `:64` «- **`#force-with-lease-as-safe-force`** — treating `--force-with-lease` as the «allowed» force.»; `:65` «- **`#hand-merge-generated-conflicts`** — resolving fingerprint/twin conflict hunks by hand. The files are generated; hand-merged content is authoritative-looking garbage.»; `:66` «- **`#merge-forward-buries-the-audited-head`** — pushing the merge-forward commit as the head of a PR that carries a standing `FIDELITY: GO` … spending a cold seat on a merge that moved no deliverable.»

## Always (clean)

The 10-step recipe (`:18-36`), anchors quoted: `:22` «3.  git merge origin/staging --no-edit» and `:35` «10. git push origin HEAD:<pr-branch>                       # plain push, fast-forward, NO force» with the interlock at `:38` «Step 9 is the safety interlock: it proves the push is a fast-forward (remote tip is an ancestor of what you push), i.e. no history was rewritten and no force flag can be needed.» Conflict triage: `:57` «Generated conflicts are resolved by **regeneration** (§2 steps 5-6), never by hand-merging hunks.» and `:59` «Anything *else* in the `--diff-filter=U` list is a **semantic conflict**: … STOP, park the merge … surface to the operator».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:24` «| `git-conflict-merge-forward.md` | B | a CONFLICTING PR, or any rebase/force-push urge. | claude-md |»
- **claude-md channel:** `.claude/rules/git-conflict-merge-forward.md:3` «<!-- channel: claude-md CLAUDE.md#merge-forward -->» — the always-on CLAUDE.md `Harness gates` pointer (`:5`).
- **PreToolUse guard (operator-global):** `~/.claude/hooks/git-safety.sh` rebase/force-push arm (`:5`, `:48`) — outside the repo by design; the CI ceiling rationale is at `:5`.
- **PR-time gate for the §8 hazard:** the stale-base revert hazard «IS mechanically visible at PR time and therefore carries its own CI gate (`stale-revert-in-pr-diff`)» (`:5`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: operator-global hook + CLAUDE.md pointer + one PR-time CI gate.
