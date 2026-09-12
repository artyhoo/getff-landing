---
title: ai-doc
description: Core-tier skill that applies the AI-doc authoring standard when creating or fixing any AI-facing doc, rule, skill, or agent — a thin wrapper composing upstream authoring mechanics plus repo-specific residue.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# ai-doc

**Status:** shipped-beta · **Ships to:** `core` tier arm (`GETFF_SKILLS_CORE`, `setup.d/lib.sh:61`) · **Fires at:** Claude Code skill auto-activation on authoring triggers ("write a rule", "author a skill", "fix a doc", …)

## What it is

The AI-doc authoring standard skill: "Use when creating or fixing an AI-facing doc/rule/skill/agent in this repo (SKILL.md, .claude/rules/*, agents/*, CLAUDE.md, AGENTS.md) — to apply the project's context-hygiene + rule-as-test + AI-agnostic authoring standard" (`.claude/skills/ai-doc/SKILL.md:3`). It is explicitly a thin wrapper, not a new method: "Composes existing skills; does NOT reinvent" (`.claude/skills/ai-doc/SKILL.md:15`) — the authoring mechanics come from upstream `superpowers:writing-skills`, and this skill "adds only the residue upstream lacks" via an on-demand companion file (`.claude/skills/ai-doc/SKILL.md:15-17`).

## How it works

The `## The standard` section carries the judgment calls the wrapper actually owns (`.claude/skills/ai-doc/SKILL.md:23` heading): channel selection by detectability and relevance ("Reserve always-on for the 3–4 invariants"), "Rule = test = code at the earliest channel" (`.claude/skills/ai-doc/SKILL.md:26`), AI-agnostic authoring via a portable marker convention, and a doc-authority header on canonical docs. A "Without this skill" / "With this skill" pair closes the file (`.claude/skills/ai-doc/SKILL.md:30,34`). Harness posture: portable (`.claude/skills/ai-doc/SKILL.md:6`).

## Satellites & companions

- **USES:** upstream `superpowers:writing-skills` for authoring mechanics; `anthropic-and-aif-residue.md` loaded on demand for the residue (SKILL.md:15-17).
- **ADAPTS:** the doc-authority hierarchy and channel-selection rules the framework ships elsewhere; the wrapper binds them to trigger phrases.
- **ADDS:** the repo-specific residue standard (context-hygiene, rule-as-test, AI-agnostic markers) that upstream authoring skills do not carry.
- Census family satellites: **F** (rules corpus + generated-rule tooling) — the rules this skill helps author.

## Anchors

- `.claude/skills/ai-doc/SKILL.md:2` — `name: ai-doc`
- `.claude/skills/ai-doc/SKILL.md:3` — `description: Use when creating or fixing an AI-facing doc/rule/skill/agent in this repo (SKILL.md, .claude/rules/*, agents/*, CLAUDE.md, AGENTS.md) — to apply the project's context-hygiene + rule-as-test + AI-agnostic authoring standard. …`
- `.claude/skills/ai-doc/SKILL.md:6` — `<!-- @harness-posture: portable — prose-only authoring standard; no harness primitives; … -->`
- `.claude/skills/ai-doc/SKILL.md:15` — `Composes existing skills; does NOT reinvent. For the authoring mechanics invoke`
- `.claude/skills/ai-doc/SKILL.md:26` — `- **Rule = test = code at the earliest channel** (zero standing context); prose lives on-demand/path-scoped. …`
- `setup.d/lib.sh:61` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
