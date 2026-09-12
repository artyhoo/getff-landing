---
title: "ARCHITECTURE.md + RULES.md (python) — lane doc templates (E36)"
description: "The python lane's two .ai-factory/ docs: an architecture starter that tells agents this is NOT a TypeScript project, and a RULES.md RENDERED at install time from the rules actually delivered — so the table names the consumer's real rule set."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# ARCHITECTURE.md + RULES.md (python) — lane doc templates (E36)

**Status:** shipped-beta · **Ships to:** python-lane only (setup.d/45-python.sh doc block) · **Fires at:** install time — ARCHITECTURE.md as a copy, RULES.md as a RENDER whose table is assembled from the delivered rule artifacts on every pass

## What it is

Two templates under `packages/core/templates/python/` that become the consumer's `.ai-factory/ARCHITECTURE.python.md` and `.ai-factory/RULES.md`. Both open by disclaiming the TypeScript world — no dependency-cruiser, no ESLint, no tsconfig, no Zod — and telling the agent that if it is reaching for one of those, it read the wrong doc. RULES.md's summary table is the lane's rule inventory; ARCHITECTURE.md is the layout/enforcement-map starter.

## How it works

- ARCHITECTURE.md lands as a `copy_safe` static template at `.ai-factory/ARCHITECTURE.python.md` — consumer-owned from first landing (never refresh-overwritten), the same classification its ts-server sibling (E6) carries.
- RULES.md is RENDERED, not copied: `_py_render_rules_md` substitutes the content between generated-table markers in the template with a table built from the rules actually delivered into `.getff/astgrep-rules/` and `.getff/ruff-bans.toml` (including consumer-researched rules joined on every pass), so the table is true by construction rather than by maintenance.
- The render is defensive about its own mechanics: marker integrity is a precondition — if either marker is missing, the stage falls back to a verbatim copy and says so; the substitution uses POSIX sed ranges because an awk `-v` assignment cannot carry literal newlines on BSD awk and would leave a 0-byte RULES.md.
- This render exists as a fix for a documented wrong-doc defect: the lane previously copied the Next.js-15 preset's RULES.md, which told a Python repo's agents to satisfy a TypeScript/React rule set while the delivered ast-grep/ruff bans went undocumented.
- RULES.md keeps `copy_safe` ownership semantics (skip-if-exists; `--refresh` does NOT overwrite) because install.sh classifies RULES.md as consumer-authored — the lane cannot clobber a consumer's edited rule list.
- Lane honesty: python-lane only; the npm lane's RULES.md comes from the preset packages (G5's RULES.md family), never from these files.

## Satellites & companions

ARCHITECTURE.md is the python sibling of `ARCHITECTURE.ts-server.md` (E6); RULES.md's marker grammar is shared with the npm-lane preset RULES.md render. Both are pointed at by the delivered AGENTS.md (E4 family). The rules they describe live as bytes in the ast-grep rules (E28-E31) and the ruff bans config (E32); the CI gate (E35) enforces them as backstop.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/python/ARCHITECTURE.md:1` — «# Architecture — Python project»
- `packages/core/templates/python/ARCHITECTURE.md:10-12` — «**This is a Python project.** There is no TypeScript layer here — no `dependency-cruiser` run, no» «ESLint, no `tsconfig.json`, no Zod. If an agent is about to reach for one of those because "the» «architecture doc said so", the doc it read was not this one.»
- `packages/core/templates/python/RULES.md:1` — «# Rules — the getff Python lane»
- `packages/core/templates/python/RULES.md:3` — «> **Authoritative for:** the rule list this project's AI agents must follow, and the enforcement channel of each rule. The Summary table below is RENDERED AT INSTALL TIME from the rules actually delivered into `.getff/`, so it names your rule set, not a generic one.»
- `setup.d/45-python.sh:1332` — «copy_safe "${PY_TEMPLATE_DIR:-$PKG_ROOT/packages/core/templates/python}/ARCHITECTURE.md" "$PROJECT_ROOT/.ai-factory/ARCHITECTURE.python.md"»
- `setup.d/45-python.sh:1336-1337` — «_py_render_rules_md "${PY_TEMPLATE_DIR:-$PKG_ROOT/packages/core/templates/python}/RULES.md" \» «"$PROJECT_ROOT/.ai-factory/RULES.md"»
- `setup.d/45-python.sh:1076-1079` — «# Rendered, not static, because the delivered rule set is NOT fixed: _py_join_researched_rules folds» «# consumer-researched rules from .getff/rules-research/ into .getff/astgrep-rules/ on EVERY pass, so» «# a hand-written list would start lying the first time a consumer researched a rule (principle 07,»
