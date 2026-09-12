---
title: "framework dev-harness settings (.claude/settings.json)"
description: "Census D26 — the framework repo's own Claude Code harness settings: the permission allow-list that pre-approves its two reminder hooks, a 40-line deny list of destructive git/egress/filesystem commands, and the dev-harness hook graph that mirrors the plugin wiring."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# framework dev-harness settings (.claude/settings.json)

**Status:** shipped-beta · **Ships to:** nothing consumer-facing — this is the FRAMEWORK repo's own harness configuration (clone-only; the census ships-to column says "clone (dev harness)") · **Fires at:** continuously, three ways — as a permission evaluator on every Bash/Read/Edit/Write tool call, as a hook registrar at session start, and as a `claudeMdExcludes` filter at context assembly.

## What it is

`.claude/settings.json` — the dogfooding twin of what the plugin's `hooks.json` (D1) and the npm-lane installer (D20-D24b) deliver to consumers: the framework's own Claude Code sessions run the `.claude/hooks/*.sh` twins of the same enforcement hooks, pre-approve exactly the two hooks that fire per-turn, and deny the destructive commands the framework's own agents must never run.

## How it works

**Permission allow-list (the two reminder hooks).** Exactly two Bash permissions are pre-approved, so the highest-frequency hooks run without a permission prompt every turn: `Bash(bash "$CLAUDE_PROJECT_DIR/.claude/hooks/end-of-turn-reminder.sh")` (`.claude/settings.json:7`) and the ask-question-reminder twin (`:8`) — the Stop and PreToolUse(AskUserQuestion) hooks respectively (D18, D6).

**Deny list (egress + destruction + self-modification).** 44 deny rules across five classes: git-history rewrites and push escapes — "Bash(git push --force*)", "Bash(git push -f*)", "Bash(git push --no-verify*)", "Bash(git push --mirror*)", plus main/master push and `--no-verify` commit denies (`:11-24`); filesystem destruction — `rm -rf *`, `shred *`, `dd if=*`, `mkfs*`, `sudo *` (`:25-29`); remote-code-execution egress — "Bash(curl * | bash*)", "Bash(wget * | sh*)" (`:30-33`); credential/secret reach — `nc`/`netcat`/`socat`, `gh secret set/delete`, `gh auth logout`, `Read(~/.ssh/**)`, `Read(~/.aws/**)`, `Read(.env)`/`Read(.env.*)` (`:34-45`); and enforcement-layer self-modification — `Edit(.git/hooks/**)`, `Edit(.husky/**)`, and `Edit(.claude/settings.json)`/`Write(.claude/settings.json)` (`:52-57`): a session cannot un-wire the hooks or rewrite its own permission config.

**Dev-harness hook graph.** The `hooks` block (`:60-243`) wires the `.claude/hooks/*.sh` twins directly (no `${CLAUDE_PLUGIN_ROOT}` indirection): UserPromptSubmit (inject-session-bootstrap, deps-hash-check), PreToolUse (AskUserQuestion → ask-question-reminder; Agent|Task → inject-subagent-context), PostToolUse on Edit|Write|MultiEdit (validate-prompt, check-doc-authority, inject-matching-rule, check-kickoff-traps, check-hook-marker, runtime-bridge-dispatch, check-worker-dispatch-channel) plus Write (inject-memory-codification), PostToolUseFailure (runtime-bridge-dispatch), Stop (end-of-turn-reminder), SubagentStart (inject-subagent-digest), SubagentStop (warn-subagent-report), SessionStart (link-coordination + a `compact`-matcher arm for inject-handoff-on-compact), and PreCompact (precompact-residue). Two arms are dev-harness-only (no plugin twin registration): `inject-subagent-digest` on SubagentStart (the plugin uses inject-project-digest there instead) and the compact/PreCompact pair.

**claudeMdExcludes.** Seven rules are kept OUT of assembled context (`:244-252`, e.g. `**/egress-no-api-bypass.md`, `**/cold-seat-economy.md`) — a load-shedding list for rules whose full text the harness should not carry in every session.

**Fail mode / which channel fails:** denied tool calls fail at the permission channel BEFORE execution — the model receives a permission denial, not a hook block. The hook arms fail per-hook (each hook's own fail mode); `inject-handoff-on-compact` rides the `compact` matcher so it only fires on compaction, and `link-coordination` is `|| true`-guarded (`:219`) so coordination-link failure can never fail a session start.

## Satellites & companions

The dogfood mirror of the plugin wiring (D1) and the consumer installer graph (D20-D24b); pre-approves the twins of D18 (end-of-turn-reminder) and D6 (ask-question-reminder); its deny list is what lets the framework's own dispatched workers run dangerous-looking verification commands under a policy rather than judgment; `runtime-bridge-dispatch` arms here mirror the plugin's PostToolUse + PostToolUseFailure pair (D16, H2).

## Anchors

- `.claude/settings.json:7` — «      "Bash(bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/end-of-turn-reminder.sh\")",»
- `.claude/settings.json:11` — «      "Bash(git push --force*)",»
- `.claude/settings.json:30` — «      "Bash(curl * | bash*)",»
- `.claude/settings.json:56` — «      "Edit(.claude/settings.json)",»
- `.claude/settings.json:66` — «            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/inject-session-bootstrap.sh\""»
- `.claude/settings.json:150` — «            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/runtime-bridge-dispatch.sh\""»
- `.claude/settings.json:224` — «        "matcher": "compact",»
- `.claude/settings.json:245` — «    "**/egress-no-api-bypass.md",»
