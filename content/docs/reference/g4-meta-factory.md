---
title: "@rules-as-tests/meta-factory — the research→rule factory umbrella package (G4)"
description: "Workspace-private umbrella package whose four src layers re-export @rules-as-tests/core implementations; its meta-factory bin is a Phase-3 placeholder, and the deterministic factory that runs at install is core's rule-bootstrap CLI."
---
<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/meta-factory — the research→rule factory umbrella package (G4)

**Status:** experimental (umbrella + placeholder bin; the working factory path lives in `@rules-as-tests/core`) · **Ships to:** clone only — workspace-private, never published, not in the dist payload · **Fires at:** nothing today via its own bin; the pipeline it fronts runs at install time on `--full` npm-lane installs (stage 80)

## What it is

A minimal package — `bin/meta-factory.mjs`, four one-file `src/` layers, `package.json`, `tsconfig.json` — declared `private: true` with a peer dependency on the core package: «"@rules-as-tests/core": "*"» (`packages/meta-factory/package.json:14`). It declares the deterministic research→rule factory as an umbrella: a `meta-factory` bin («"meta-factory": "./bin/meta-factory.mjs"», `packages/meta-factory/package.json:8`) plus four src layers — `detector/`, `research/`, `synthesizer/`, `installer/` — each of which is a re-export shim, not an implementation: «// Keeps meta-factory the umbrella package; core owns the implementation.» (the header comment of all four layer files; e.g. the synthesizer layer re-exports `synthesize` from `@rules-as-tests/core/synthesizer`, the installer layer `install` from `@rules-as-tests/core/installer`).

The bin itself is a skeleton, stated in its own second line: «// meta-factory CLI — placeholder skeleton (Phase 3)» — running it prints «console.error('meta-factory: not yet implemented (Phase 4+)');» and exits 1 (`packages/meta-factory/bin/meta-factory.mjs:4-5`).

## How it works

The deterministic factory that actually fires on a consumer install is NOT this package's bin. Stage 80 (`setup.d/80-rule-bootstrap.sh`, A18) executes the core CLI: the pipeline is «#   FileResearchClient + FileGenerateClient → generate.ts factory → install() → rules-lock.json» with the payload named one line later: «# Payload: packages/core/install/rule-bootstrap-cli.ts (the shared entry).» The umbrella's role on that path is indirect: the stage first heals workspace package resolution with `ensure_workspace_pkg_links` (`setup.d/80-rule-bootstrap.sh:65`), because the factory's `@rules-as-tests/*` imports must resolve from `PKG_ROOT` (`setup.d/lib.sh:2122-2136` — the self-heal links the worktree's own workspace packages into a worktree-local `node_modules/@rules-as-tests/`).

Gating and degrade behavior belong to stage 80, not to this package: the stage runs only on the `--full` carrier (`setup.d/80-rule-bootstrap.sh:25-27` — `if [ -z "${FULL:-}" ]; then return 0`), degrades silently when the payload or node is absent, and never aborts the install (rc=0).

**Asymmetry:** nothing in the framework imports `@rules-as-tests/meta-factory` today — the only references to the package name outside its own directory are its own `package.json` and the lockfile (repo-wide grep at the pin). It is a structural placeholder for the Phase-4+ factory front-end; consumers interact with the factory through the rule-research protocol (B3) plus stage 80, never through this bin.

## Satellites & companions

ADDS nothing executable over core — each layer is a type-level re-export surface over `@rules-as-tests/core/{detector,research,synthesizer,installer}`. DEPENDS on core as a peer dependency (`*`). The consumer path it fronts is A18 (rule-bootstrapping stage) + B3 (rule-research skill authoring the two committed JSONs) + F42 (the core rule-bootstrap CLI the census rows as the factory entry). Not to be confused with the shipped research→rule flow: the CLI the stage runs, the JSONs it reads (`.ai-factory/rules-research/<stack>.{research,selection}.json`), and the `rules-lock.json` it writes are all core/stage-80 artifacts.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/meta-factory/package.json:4` — «"private": true,»
- `packages/meta-factory/package.json:8` — «"meta-factory": "./bin/meta-factory.mjs"»
- `packages/meta-factory/package.json:14` — «"@rules-as-tests/core": "*"»
- `packages/meta-factory/bin/meta-factory.mjs:2` — «// meta-factory CLI — placeholder skeleton (Phase 3)»
- `packages/meta-factory/bin/meta-factory.mjs:4` — «console.error('meta-factory: not yet implemented (Phase 4+)');»
- `packages/meta-factory/src/synthesizer/index.ts:2` — «// Keeps meta-factory the umbrella package; core owns the implementation.»
- `packages/meta-factory/src/installer/index.ts:1` — «// Installer Layer — re-export from @rules-as-tests/core/installer (Phase 7).»
- `setup.d/80-rule-bootstrap.sh:7` — «#   FileResearchClient + FileGenerateClient → generate.ts factory → install() → rules-lock.json»
- `setup.d/80-rule-bootstrap.sh:8` — «# Payload: packages/core/install/rule-bootstrap-cli.ts (the shared entry).»
