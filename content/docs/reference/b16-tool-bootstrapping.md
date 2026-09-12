---
title: tool-bootstrapping
description: Always-shipped skill codifying the six-rule project-aware MCP/skill proposal discipline — stack analysis, capped proposals, bulk confirmation, token-economy gate, incrementality, persistence.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# tool-bootstrapping

**Status:** shipped-beta · **Ships to:** every tier — copied by `setup.d/10-skills.sh:41` outside the tier-arm variables · **Fires at:** Claude Code skill auto-activation on tool-bootstrap triggers ("MCP installation", "tool detection", "package.json deps changed", "tool proposal confirmation", …)

## What it is

"Tool Bootstrapping — project-aware MCP/skill proposal discipline" (`.claude/skills/tool-bootstrapping/SKILL.md:8` heading): the six-rule loop that stops agents from "(a) load[ing] every possible tool (token waste), (b) load[ing] none (capability gap), or (c) propos[ing] tools ad-hoc without persistence (re-proposal every session)" (`.claude/skills/tool-bootstrapping/SKILL.md:15` area). Description: "Use when analysing project stack for MCP or skill recommendations." (`.claude/skills/tool-bootstrapping/SKILL.md:3`).

## How it works

Six rules, one section each: Rule 1 Analyse stack (read `package.json`, `.mcp.json`, framework configs), Rule 2 Propose tool set (cap "proposals at ≤5 per block; each must carry a load-bearing rationale"), Rule 3 Confirm bulk — "**Hard rule (D6=a): never install any MCP or skill without explicit user confirmation. No env/config bypass.**" (`.claude/skills/tool-bootstrapping/SKILL.md:27-29`), Rule 4 Token-economy gate, Rule 5 Incrementality (`.claude/skills/tool-bootstrapping/SKILL.md:35`), Rule 6 Persistence. The install pipeline it references is the AIF `skills.sh` flow: `npx skills search` → `install --agent claude` → security-scan → generate-if-missing → learn-from-docs (`.claude/skills/tool-bootstrapping/SKILL.md:23` area). Harness posture: portable — "prose + npx skills CLI; the deps-hash UserPromptSubmit hook is companion infrastructure, not this skill's runtime dependency" (`.claude/skills/tool-bootstrapping/SKILL.md:6`). The copy that ships to consumers is the repo-root `skills/tool-bootstrapping` tree, copied with the cross-ref transform "for install/refresh parity" (`.claude/skills/tool-bootstrapping/SKILL.md:11` names the shipped twin; `setup.d/10-skills.sh:40-41`).

## Satellites & companions

- **USES:** the AIF `/aif` stack-detection flow (SSOT #31 ADOPT, named in the skill body) and the `npx skills` CLI.
- **ADAPTS:** the closed-questions §13.25 discipline into a triggerable skill; the shipped twin under repo-root `skills/` keeps the consumer copy in sync.
- **ADDS:** the six-rule loop with its hard no-install-without-confirmation rule and the persistence rule (`.ai-factory/tool-decisions.md` trigger).
- Census family satellites: **A9** (MCP companion layer). Plugin/marketplace twin: census **I7**.

## Anchors

- `.claude/skills/tool-bootstrapping/SKILL.md:2` — `name: tool-bootstrapping`
- `.claude/skills/tool-bootstrapping/SKILL.md:3` — `description: Use when analysing project stack for MCP or skill recommendations. Triggers: tool bootstrapping, MCP installation, …`
- `.claude/skills/tool-bootstrapping/SKILL.md:6` — `<!-- @harness-posture: portable — prose + npx skills CLI; … -->`
- `.claude/skills/tool-bootstrapping/SKILL.md:29` — `Show the full proposed list in one block with per-item rationale, single Y/n confirmation … **Hard rule (D6=a): never install any MCP or skill without explicit user confirmation. No env/config bypass.**`
- `setup.d/10-skills.sh:41` — `_copy_tree_with_transform "$PKG_ROOT/skills/tool-bootstrapping" "$PROJECT_ROOT/.claude/skills/tool-bootstrapping"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11).
