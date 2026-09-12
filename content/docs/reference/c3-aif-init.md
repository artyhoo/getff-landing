---
title: aif-init
description: Generate a draft .ai-factory/DESCRIPTION.md and .ai-factory/ARCHITECTURE.md for a consumer repo. Reads package.json(s) and directory layout, detects the tech stack, and writes a filled draft with a DRAFT review banner.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# aif-init

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent (frontmatter `name:`; the session's agent list carries its one-line description)

## What it is

The project-passport generator: "> **Authoritative for:** `aif-init` sub-agent prompt — passport generation for consumer projects (DESCRIPTION.md + ARCHITECTURE.md) from deterministic repo signals; …" (`agents/aif-init.md:9`, which also records delivery "shipped to consumer `.claude/agents/aif-init.md` via `install.sh`"). Input is repo observation only: "Reads the consumer repo's `package.json`(s), directory layout, and config files to detect the tech stack, then writes:" (line 18). Output is two draft files, never authoritative on write (line 23: "Both files are written as DRAFT. The human must review, edit, and remove the DRAFT banner before the files are authoritative.").

## How it works

- "## What this does" (line 16) names the two targets, including "- `.ai-factory/DESCRIPTION.md` — project description with detected stack values (zero `<PLACEHOLDER>` fields)" (line 20).
- Step 1 detection: "### Detection table" (line 64) — "Apply this table to the aggregated dep set. First match wins per field." (line 66); undetected fields are marked, per line 100: "**Handling null detections:** If a field is not detected, write `[GUESSED — verify]` as a placeholder comment next to a reasonable default. …"
- Step 2 grounds every claim: "Using the detected values, write `.ai-factory/DESCRIPTION.md`. Ground every claim in the detected evidence from Step 1. …" (line 106).
- Step 3 picks the architecture template by framework — "- `next` detected → start from `ARCHITECTURE.react-next.md` template (Next.js App Router / React patterns)" (line 157), "- anything else → start from `ARCHITECTURE.ts-server.md` template (hexagonal / clean arch)" (line 158).
- Step 4 never clobbers human work: "**Do NOT overwrite** if the target file already exists AND does not contain `<PLACEHOLDER>` tokens — …" (line 191).
- Degradation path exists: "The installer already copies these templates. Never error; always provide a fallback path." (line 214).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** deterministic repo signals only — package.json(s), config globs, directory layout (line 18); no paid API ("Never call a paid API to generate this output — use only what you observe in the repo.", line 12).
- **ADAPTS:** the two shipped architecture templates (`ARCHITECTURE.react-next.md` / `ARCHITECTURE.ts-server.md`, lines 157-158) into a filled passport for the detected stack.
- **ADDS:** the DRAFT review gate (line 197: "Both files are written as DRAFT. The `⚠️ DRAFT — PLEASE REVIEW` banner must remain in the output. …") and the zero-placeholder rule (line 149: "**Zero-placeholder rule:** Before writing, verify that your output contains no `<…>` angular-bracket placeholder tokens. …").
- Census family satellites: **B17** (aif — the setup skill whose `.ai-factory/` suite this passport configures).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/aif-init.md:2` — `name: aif-init`
- `agents/aif-init.md:3` — `description: Generate a draft .ai-factory/DESCRIPTION.md and .ai-factory/ARCHITECTURE.md for a consumer repo. Reads package.json(s) and directory layout, …`
- `agents/aif-init.md:9` — `> **Authoritative for:** `aif-init` sub-agent prompt — passport generation for consumer projects (DESCRIPTION.md + ARCHITECTURE.md) from deterministic repo signals; …`
- `agents/aif-init.md:20` — `- `.ai-factory/DESCRIPTION.md` — project description with detected stack values (zero `<PLACEHOLDER>` fields)`
- `agents/aif-init.md:64` — `### Detection table`
- `agents/aif-init.md:66` — `Apply this table to the aggregated dep set. First match wins per field.`
- `agents/aif-init.md:149` — `**Zero-placeholder rule:** Before writing, verify that your output contains no `<…>` angular-bracket placeholder tokens. …`
- `agents/aif-init.md:191` — `**Do NOT overwrite** if the target file already exists AND does not contain `<PLACEHOLDER>` tokens — …`
- `agents/aif-init.md:214` — `The installer already copies these templates. Never error; always provide a fallback path.`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
