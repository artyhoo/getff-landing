---
title: "CLAUDE.md.template — harness pointer doc (E7)"
description: "A pointer-only template telling Claude Code to read AGENTS.md and .ai-factory/ for real context — authored and header-verified in the template tree, but never copied into a consumer project by any install stage."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# CLAUDE.md.template — harness pointer doc (E7)

**Status:** shipped-beta · **Ships to:** clone (template tree + release-time doc copy; NOT delivered to a consumer project — no numbered stage copies it) · **Fires at:** never at install time; it exists so Claude Code sessions in the FRAMEWORK repo (and release-time doc consumers) get the same pointer-doc posture the delivered AGENTS.md gives consumers

## What it is

The Claude-Code counterpart of `AGENTS.md.template` (E4): a 36-line pointer file whose entire job is to say "real context lives elsewhere." It carries no rules by design — only pointers to `AGENTS.md`, `.ai-factory/DESCRIPTION.md`, `ARCHITECTURE.md` and `RULES.md`, plus the workflow gates (audit script, pre-push, CI) and an explicit "What NOT to put here" list.

## How it works

- The file states its own contract in one line: Claude Code reads both this file and AGENTS.md at session start, so to avoid drift this file contains no rules — only pointers.
- It closes on the enforcement posture the whole framework leans on: "`CLAUDE.md` is a pointer. Real rules are enforced, not described."
- It is a member of `SHIPPED_DOCS` (install.sh), the single source of truth for the header-verify loop and the release-time doc copy — so its header is machine-verified and it ships in the repo's doc surface.
- Lane honesty: a consumer install ships AGENTS.md, NEVER CLAUDE.md — the installer's own link-hygiene notes record this measured fact and rewrite refs to CLAUDE.md into upstream blob URLs because the file will not exist in the consumer tree. A consumer who wants the pointer-doc posture for Claude Code must author the file themselves (the template is the intended seed).

## Satellites & companions

Sibling of `AGENTS.md.template` (E4) — same managed-doc family, complementary audiences. LISTED in `install.sh`'s `SHIPPED_DOCS` array alongside E4, E8, E14 and the tier-home doc. Referenced by the internal-ref rewriter (`transform_internal_refs` in `setup.d/lib.sh`), which maps `../CLAUDE.md` links to the upstream blob URL precisely because consumers don't have the file.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/CLAUDE.md.template:1` — «# Project context for Claude Code»
- `packages/core/templates/shared/CLAUDE.md.template:3` — «> Pointer file. Real context lives in `AGENTS.md` and `.ai-factory/`.»
- `packages/core/templates/shared/CLAUDE.md.template:8` — «This project follows the AGENTS.md standard. Claude Code reads BOTH this file AND `AGENTS.md` at session start. To avoid drift between them, this file contains no rules — only pointers.»
- `packages/core/templates/shared/CLAUDE.md.template:36` — «`CLAUDE.md` is a pointer. Real rules are enforced, not described.»
- `install.sh:202` — «"packages/core/templates/shared/CLAUDE.md.template"» (member of the `SHIPPED_DOCS` array)
- `setup.d/lib.sh:118` — «as absent from a consumer (install ships AGENTS.md, never CLAUDE.md — verified on the»
