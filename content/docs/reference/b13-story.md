---
title: story
description: Factory-tier skill that recaps a finished session as a plain-language story told by acts — localized via AIF_HOOK_LANG and shared as one spec with the Stop-hook auto-emission branch.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# story

**Status:** shipped-beta · **Ships to:** `factory` tier arm (`GETFF_SKILLS_FACTORY`, `setup.d/lib.sh:63`) · **Fires at:** Claude Code skill auto-activation on recap triggers ("story", "recap", «расскажи что сделали», «по актам»), or via the Stop-hook auto-emission branch

## What it is

The session-recap skill: "# /story — session recap as a story" (`.claude/skills/story/SKILL.md:11`). It narrates the finished session "as an engaging, plain-language story for the human — the reader-facing companion to the dry per-turn self-diagnostic recap" (`.claude/skills/story/SKILL.md:16-18` area). Its header pins it as the "single SSOT for the story spec shared with the Stop-hook branch" (`.claude/skills/story/SKILL.md:8`).

## How it works

Two steps (`.claude/skills/story/SKILL.md:17` heading): first run the localized-instruction emitter `!bash ${CLAUDE_SKILL_DIR}/helpers/emit-story-prompt.sh` (`.claude/skills/story/SKILL.md:20`), which "prints the full story-spec in the operator's language (English by default; Russian when `AIF_HOOK_LANG=ru`)" (`.claude/skills/story/SKILL.md:21-22`); then tell the story following that instruction — "open in one sentence, then by acts (named files / PRs / decisions), … honest about what's thin / uncertain / left" (`.claude/skills/story/SKILL.md:25-27` area), beginning with the `## 🎬` marker line. The spec is shared with the Stop-hook `aif_msg_eot_branch_story` branch (`.claude/skills/story/SKILL.md:23`). Harness posture: `cc-native-with-fallback` — the `!shell` injection and Stop-hook auto-emission are CC-native; degradation is to run the helper manually (`.claude/skills/story/SKILL.md:6`).

## Satellites & companions

- **USES:** its own `helpers/emit-story-prompt.sh` (the localized spec emitter); the `AIF_HOOK_LANG` language convention.
- **ADAPTS:** the Stop-hook end-of-turn branch (`aif_msg_eot_branch_story`) — same spec, two delivery moments.
- **ADDS:** the reader-facing story format (by-acts narration) as distinct from the per-turn diagnostic recap.
- Census family satellites: none listed (`—`).

## Anchors

- `.claude/skills/story/SKILL.md:2` — `name: story`
- `.claude/skills/story/SKILL.md:3` — `description: Use when work is done / a PR was pushed, or when the user asks to recap what was done — «расскажи что сделали», «расскажи историю», story, recap, «по актам».`
- `.claude/skills/story/SKILL.md:6` — `<!-- @harness-posture: cc-native-with-fallback — !shell injection (SKILL.md:20) + Stop-hook auto-emission (SKILL.md:23) are CC-native; degradation: run helpers/emit-story-prompt.sh manually / tell the story on request -->`
- `.claude/skills/story/SKILL.md:8` — `> **Authoritative for:** /story skill — session recap narrated as a story by acts; localized to the operator's language via AIF_HOOK_LANG; single SSOT for the story spec shared with the Stop-hook branch.`
- `.claude/skills/story/SKILL.md:20` — `` `!bash ${CLAUDE_SKILL_DIR}/helpers/emit-story-prompt.sh` ``
- `.claude/skills/story/SKILL.md:22` — `Russian when `AIF_HOOK_LANG=ru`) — the single source of truth, shared with the`
- `setup.d/lib.sh:63` — `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
