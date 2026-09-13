---
title: ".prettierignore — managed block (E3)"
description: "The shipped prettier-ignore pattern set covering generated rules docs, framework-authored .ai-factory docs, generated configs and vendored framework source; merged non-destructively into an existing consumer .prettierignore."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# .prettierignore — managed block (E3)

**Status:** shipped-beta ·
**Ships to:** npm-lane, all tier arms (core / env+ / factory), every npm stack · **Fires at:** install time and every `--refresh` (both call `merge_prettierignore` on the project root's `.prettierignore`)

## What it is

The shared template `.prettierignore` — the pattern set that keeps prettier off files the framework generates or ships: the rendered `RULES.md` table region, the framework-authored `.ai-factory/` docs, install-generated configs (`.claude/settings.json`, `.mcp.json`, the eslint barrel), vendored framework source (`packages/core/hooks/**`, `eslint-rules-local/`, `.claude/vendor/runtime-bridge/**`) and lockfiles. The "managed block" is the delivery mechanism: on a consumer who already has a `.prettierignore`, missing patterns are merged inside `# >>> rules-as-tests-aif (managed) >>>` / `<<<` fence markers rather than the file being overwritten.

## How it works

- Greenfield (no `.prettierignore` on disk): the merge helper defers entirely to `copy_safe`, so the delivered file is byte-identical to the template.
- Brownfield: `merge_prettierignore` collects every shipped pattern not already present verbatim in the consumer file and inserts the missing ones immediately before the managed END marker — the block stays single (GH #890: marker presence no longer short-circuits delivery, so a NEW shipped pattern reaches already-installed consumers on repeat `--full` or `--refresh`).
- If the consumer already has every shipped pattern, the merge is a genuine idempotent no-op.
- A sibling `.prettierignore.override.md` marks the file consumer-owned: install and refresh skip it entirely (the refresh arm checks for it before calling the merge).
- `--force` collapses the merge to a wholesale `copy_safe` overwrite.
- Lane honesty: the python, cargo and go lanes never deliver `.prettierignore` — none of setup.d/45/46/47 calls `merge_prettierignore`.

## Satellites & companions

USES `copy_safe` (A3) for the greenfield path and the fence constants `PRETTIERIGNORE_BEGIN/END` from `setup.d/lib.sh`. Companions: the config files it protects — the rendered `RULES.md` (E5 family), `integration-rules.md` (E14), `tsconfig.json` (E19, conditionally via `ignore_shipped_configs`), and the vendor drop of `55-runtime-bridge-vendor.sh`. ADDS over a plain ignore file: per-pattern merge, so consumer-owned ignores outside the managed block survive every install.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/.prettierignore:1` — «# Generated rule docs — the `<!-- begin/end: rules-table-generated -->` region is rendered»
- `packages/core/templates/shared/.prettierignore:6` — «.ai-factory/RULES.md»
- `packages/core/templates/shared/.prettierignore:28` — «.ai-factory/rules/integration-rules.md»
- `setup.d/lib.sh:65` — «PRETTIERIGNORE_BEGIN='# >>> rules-as-tests-aif (managed) >>>'»
- `setup.d/40-configs.sh:132` — «merge_prettierignore "$PKG_ROOT/packages/core/templates/shared/.prettierignore" "$PROJECT_ROOT/.prettierignore"»
- `install.sh:1321` — «merge_prettierignore "$PKG_ROOT/packages/core/templates/shared/.prettierignore" "$PROJECT_ROOT/.prettierignore"»
- `setup.d/lib.sh:1385-1387` — «# No consumer file → greenfield: copy byte-identical (defer entirely to copy_safe).» … «copy_safe "$src" "$dst"»
