---
title: "session-bootstrap pair — template + Step-0 digest (E39)"
description: "Two distinct files behind one name: .claude/templates/session-bootstrap.md is the fill-in render template (digest ships EMPTY, zero-setup default) and .claude/session-bootstrap.md is the larger Step-0 read-first digest whose marker block the inject hook actually consumes."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# session-bootstrap pair — template + Step-0 digest (E39)

**Status:** shipped-beta (framework harness surface; not part of a consumer install's npm payload) · **Ships to:** clone/plugin harness — consumed by the Claude Code + ZCode hook wiring in `.claude/settings.json` and delivered to plugin consumers through the plugin twin chain · **Fires at:** every session start / prompt submit, when the UserPromptSubmit hook injects the digest

## What it is

Two files that are easy to conflate and must not be:

- `.claude/templates/session-bootstrap.md` — the 18-line RENDER TEMPLATE a project copies and fills in. Its digest block between the `digest:start` / `digest:end` markers ships EMPTY on purpose: nothing is injected until the project fills it, and leaving it empty (or deleting the file) injects nothing. Its guidance: keep it short (it costs tokens every turn); put the one-line goal, 2-4 load-bearing conventions, and where to look first.
- `.claude/session-bootstrap.md` — the framework's OWN, larger (68-line) Step-0 read-first digest: goal-restatement, methodology boundaries, reading order, reviewer drift-prevention. This is a different document with different content — not a rendered instance of the template.

## How it works

- The inject hook (`inject-session-bootstrap.sh`, wired as a UserPromptSubmit hook in `.claude/settings.json`) consumes the TOP-LEVEL `.claude/session-bootstrap.md` — its marker block is the digest source (the harness-side correction E1 recorded: the hook reads the top-level digest, not the template's).
- The same top-level file is the shared digest source for the second injector, `inject-project-digest.sh` (consumer-safe, reads only the consumer's own file) — the template's comment points at that hook, which is how the template's filled-in digest reaches every turn in a project that adopted the template.
- Under the hood the hook is dual-harness: plain stdout auto-injects under Claude Code; under ZCode stdout must be strict-JSON `additionalContext`, so the emitter branches on the ZCode env variable with no separate artifact.
- The hook degrades gracefully and honestly: the Step-0 reading-order line is assembled only from files that exist (README, the bootstrap digest, CLAUDE.md are probed), and the footer names the full bootstrap file when present, or says the digest is all there is when absent.
- Lane honesty: this pair is harness surface — a consumer npm install does not receive `.claude/session-bootstrap.md`; plugin-path consumers receive the hook through the plugin twin, where `$0`-relative paths resolve inside the plugin directory.

## Satellites & companions

Wired by `.claude/settings.json`'s hooks block; part of the plugin surface through the twin chain (I-family). Companion of the AGENTS.md.template (E4) family in spirit — both exist to survive context loss — but mechanically independent: the digest injects automatically every turn, AGENTS.md is read at session start by convention. Enumeration fact: `.claude/templates/` contains exactly one file, this template.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `.claude/templates/session-bootstrap.md:1` — «# Session bootstrap — your project's per-turn anchor»
- `.claude/templates/session-bootstrap.md:5-6` — «  `digest` markers is injected into the AI's context EVERY turn — in the main session AND» «  into every dispatched subagent — via `.claude/hooks/inject-project-digest.sh`.»
- `.claude/templates/session-bootstrap.md:13` — «  Zero-setup default: the block below ships EMPTY, so nothing is injected until you fill it.»
- `.claude/session-bootstrap.md:1` — «# Session bootstrap — read first»
- `.claude/hooks/inject-session-bootstrap.sh:4` — «# Full bootstrap: .claude/session-bootstrap.md (Step 0 read-first file).»
- `.claude/hooks/inject-project-digest.sh:14` — «# The shared digest source is the block between the markers in .claude/session-bootstrap.md, so the»
- `.claude/hooks/inject-project-digest.sh:29` — «DIGEST_FILE="$REPO_ROOT/.claude/session-bootstrap.md"»
- `.claude/settings.json:66` — «"command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/inject-session-bootstrap.sh\""»
