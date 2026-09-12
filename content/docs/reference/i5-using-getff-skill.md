---
title: "plugin skill using-getff — session-start orientation (I5)"
description: "The plugin skill that loads at session start in a getff-plugin repo: it establishes the instruction-priority ladder (the project's own CLAUDE.md/AGENTS.md always win) and the invoke-the-relevant-skill-before-responding discipline."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# plugin skill using-getff — session-start orientation (I5)

**Status:** shipped-beta · **Ships to:** plugin (marketplace install of `getff@getff`) · **Fires at:** session start in any repo with the plugin installed — its trigger description names "before any first reply" and every code-quality/hooks/CI/architecture topic

## What it is

The plugin's orientation skill: a 53-line SKILL.md that tells an agent how to behave in a getff-equipped repo. It carries the in-plugin skill map and two disciplines: the instruction-priority ladder and the invoke-first rule. Its stated authority is deliberately narrow — the plugin's skill-activation protocol, not the consumer's conventions.

## How it works

- The ladder is explicit and rank-ordered: the project's own `CLAUDE.md` / `AGENTS.md` / direct user requests are HIGHEST (the file's own example: if the project says "don't use TDD" and a skill says "always TDD", the project wins); getff skills override default model behaviour; default system behaviour is lowest. The skill "changes default behaviour" but the host project's instructions always win — which is what keeps a plugin install non-invasive.
- The invoke-first discipline: before responding on a covered topic (code quality, linting, CI, pre-commit/pre-push hooks, architecture rules, mutation/contract testing), the agent should load the relevant skill rather than answer from default behaviour.
- It includes the map of the plugin's other skills, making it the entry point that routes into I4 (`getff`), I6 (`installing-enforcement`) and I7 (`tool-bootstrapping`).
- Lane honesty: plugin-path only. A consumer who installed via the npm/clone installer never receives this skill — their orientation surface is the delivered AGENTS.md (E4) and AI-USAGE-GUIDE (E5). The two paths document the same posture from different delivery channels.

## Satellites & companions

Sibling of the other three plugin skills: `getff` (I4, the product skill), `installing-enforcement` (I6, the wiring skill it routes to), `tool-bootstrapping` (I7). Its ladder complements the plugin agents (I8), which operate under the same host-wins rule. The soft-layer boundary it implies (advice, not enforcement) is I6's subject.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `plugin/skills/using-getff/SKILL.md:2` — «name: using-getff»
- `plugin/skills/using-getff/SKILL.md:3` — «description: Use when starting any conversation in a repo that has the getff plugin installed — establishes how to find and use the getff skills, the instruction-priority ladder (the project's own CLAUDE.md/AGENTS.md win)…»
- `plugin/skills/using-getff/SKILL.md:8` — «> **Authoritative for:** the getff plugin's skill-activation protocol — the instruction-priority ladder (the consumer's own instructions win), the "invoke the relevant skill before responding" discipline, and the in-plugin skill map.»
- `plugin/skills/using-getff/SKILL.md:13` — «## Instruction priority (read this first)»
- `plugin/skills/using-getff/SKILL.md:17` — «1. **The project's `CLAUDE.md` / `AGENTS.md` / direct user requests** — highest. If they say "don't use TDD" and a skill says "always TDD", follow the project.»
- `plugin/skills/using-getff/SKILL.md:51` — «## Skill priority when several could apply»
