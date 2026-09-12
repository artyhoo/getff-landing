---
title: "plugin skill tool-bootstrapping — extended trigger surface (I7)"
description: "The plugin twin of the shipped tool-bootstrapping discipline skill: the same 6-rule MCP/skill proposal protocol for consumer projects, with an extended trigger list including Russian-language triggers."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# plugin skill tool-bootstrapping — extended trigger surface (I7)

**Status:** shipped-beta · **Ships to:** plugin (marketplace install of `getff@getff`) · **Fires at:** when a project's stack is analysed for MCP or skill recommendations — stack analysis, MCP installation, `package.json` deps changed, `.ai-factory/tool-decisions.md` touched, tool-proposal confirmation, incremental tool re-evaluation

## What it is

The plugin-path version of the tool-bootstrapping discipline: a 62-line SKILL.md carrying the same 6-rule proposal protocol as the shipped skill — analyse the project stack, propose MCP servers/skills, get explicit confirmation, record the decision in `.ai-factory/tool-decisions.md`, remember rejected tools, and re-evaluate incrementally rather than re-proposing. Its header scopes it as the consumer-facing shipped version with project-internal cross-links omitted.

## How it works

- It is a TWIN, not a fork: the shipped `tool-bootstrapping` skill and this plugin skill carry the same discipline body, but the plugin variant's frontmatter extends the trigger list — most visibly with Russian-language triggers (инструменты, бутстраппинг, MCP серверы, скиллы, зависимости, онбординг, подбор инструментов…) so the skill fires for RU-language requests too.
- The decision ledger is `.ai-factory/tool-decisions.md` — the same file the installer seeds (A12-family), so plugin-path and installer-path consumers share one tool-decision record.
- Its trigger on "package.json deps changed" and "incremental tool re-evaluation" makes the skill a standing re-check, not a one-shot onboarding: the proposal set can change as the project's dependencies do.
- Lane honesty: plugin-path only. The clone/npm installer ships the discipline skill through `.claude/skills/` on the npm lane; the plugin ships this twin through the marketplace. Same rules, two delivery channels — neither page of the site may claim one implies the other.

## Satellites & companions

Twin of the shipped tool-bootstrapping skill (the B-family sibling the census rows beside B16). Its decisions land next to the MCP companion layer (A9), whose `claude mcp add` rows are the install-path counterpart of the proposals this skill manages. Orientation routing comes from the plugin skill map (I5).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `plugin/skills/tool-bootstrapping/SKILL.md:2` — «name: tool-bootstrapping»
- `plugin/skills/tool-bootstrapping/SKILL.md:3` — «description: 'Use when analysing project stack for MCP or skill recommendations. Triggers: tool bootstrapping, MCP installation, …» (extended list includes «инструменты, бутстраппинг, MCP серверы, скиллы, зависимости, онбординг, подбор инструментов, предложение инструментов, подтверждение установки, tool proposal confirmation, incremental tool re-evaluation, rejected tools memory, memory persistence for tools.')»
- `plugin/skills/tool-bootstrapping/SKILL.md:6` — «# Tool Bootstrapping — project-aware MCP/skill proposal discipline»
- `plugin/skills/tool-bootstrapping/SKILL.md:8` — «> **Authoritative for:** §13.25 tool-bootstrapping discipline (6 rules) for consumer projects that install this skill via `install.sh`. Consumer-facing shipped version; project-internal cross-links omitted.»
