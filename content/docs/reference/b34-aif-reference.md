---
title: aif-reference
description: "Create knowledge references from URLs, documents, or files and store them in the configured references directory (default: .ai-factory/references/) for reuse by other AI Factory skills; clone-only in the getff framework repo."
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-reference

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation — the frontmatter names no "Use when" trigger phrases and leaves model invocation on (`disable-model-invocation: false`, `.claude/skills/aif-reference/SKILL.md:9`)

## What it is

Reference-creation skill. Its frontmatter description is a block scalar: "description: >-" (`.claude/skills/aif-reference/SKILL.md:3`) whose text reads "Create knowledge references from URLs, documents, or files for use by AI agents." (`.claude/skills/aif-reference/SKILL.md:4`). The body adds the reuse angle: "Create structured knowledge references from external sources and store them in the configured references directory so other AI Factory skills can reuse them later." (`.claude/skills/aif-reference/SKILL.md:18`).

## How it works

A "## Argument Detection" section (`.claude/skills/aif-reference/SKILL.md:56`) routes `--update`/URLs/file paths/`list`/`show`/`delete`/empty args to modes ("Contains URLs (http/https) -> URL Mode: fetch and process web sources", `.claude/skills/aif-reference/SKILL.md:61`); synthesis is governed by quality rules — "**No hallucination** - include only what was actually found" (`.claude/skills/aif-reference/SKILL.md:168`). An "## Integration With Other Skills" section wires the output in: "- `/aif-plan` and `/aif-implement` can read them for domain context" (`.claude/skills/aif-reference/SKILL.md:228`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** `WebFetch`/`WebSearch` for URL sources ("1. Fetch the page using `WebFetch` and extract:", `.claude/skills/aif-reference/SKILL.md:94`) and the project skill-context override (`.claude/skills/aif-reference/SKILL.md:33`).
- **ADAPTS:** fetched page/document material into a fixed reference template ("## Step 2: Synthesize the Reference", `.claude/skills/aif-reference/SKILL.md:120`).
- **ADDS:** a durable, indexed artifact — "Check if `<resolved references dir>/INDEX.md` exists. Create or update it:" (`.claude/skills/aif-reference/SKILL.md:187`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-reference/SKILL.md:2` — `name: aif-reference`
- `.claude/skills/aif-reference/SKILL.md:3` — `description: >-`
- `.claude/skills/aif-reference/SKILL.md:4` — `` `  Create knowledge references from URLs, documents, or files for use by AI agents.` ``
- `.claude/skills/aif-reference/SKILL.md:5` — `` `  Fetch, process, and store structured references in the configured references directory` ``
- `.claude/skills/aif-reference/SKILL.md:6` — `` `  (default: .ai-factory/references/).` ``
- `.claude/skills/aif-reference/SKILL.md:18` — `Create structured knowledge references from external sources and store them in the configured references directory so other AI Factory skills can reuse them later.`
- `.claude/skills/aif-reference/SKILL.md:61` — `- Contains URLs (http/https) -> URL Mode: fetch and process web sources`
- `.claude/skills/aif-reference/SKILL.md:168` — `- **No hallucination** - include only what was actually found`
- `.claude/skills/aif-reference/SKILL.md:228` — `` `- `/aif-plan` and `/aif-implement` can read them for domain context` ``
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
