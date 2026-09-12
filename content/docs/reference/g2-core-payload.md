---
title: "@rules-as-tests/core — the workspace-private core payload (G2)"
description: "Workspace-private package holding the rule manifest, ESLint rules, detector/research/synthesizer/installer toolchain, templates, skills tests and install wiring, delivered file-wise by the installer stages."
---
<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/core — the workspace-private core payload (G2)

**Status:** shipped-beta · **Ships to:** clone (payload source) — contents reach consumers as files through the installer stages, never as an npm artifact · **Fires at:** install time (stages 10/30/40/45/46/47/50/60/80/99 + install.sh), then from inside the consumer repo once delivered

## What it is

The framework's payload store: a `private: true` npm workspace package that is never published and never installed as a package. Its reason to exist is the directory of files under `packages/core/` that the installer copies into consumer repos. The package's own metadata says exactly this: «"description": "Framework core for rules-as-tests — discipline-bearing code as the project's contract artifact. Ships the rule manifest, ESLint rules, detector/research/synthesizer/installer toolchain, templates, skills, and install wiring.",» — and its `main` is not code but data: «"main": "./manifest/rules-manifest.json",».

The payload groups:

- **Rule manifest** — `manifest/rules-manifest.json`, 20 top-level rule entries R1–R20 (title, stack applicability, check, bad/good examples, policy, fixture per rule; `manifest/rules-manifest.schema.json` sits beside it).
- **ESLint rules** — `eslint-rules/` (20 files: rule `.ts` sources plus pre-compiled `.mjs`/`.d.ts` twins, tests, an index barrel). Install performs no compilation: the `.mjs`/`.d.ts` are pre-built at framework build time by `scripts/build-shipped-eslint-rules.sh` (stated in the delivery comment at `setup.d/40-configs.sh:229-232`).
- **Toolchain** — `detector/`, `research/`, `synthesizer/`, `installer/`, `validator/`, plus `ir/`, `backends/`, `diagnostics/`, `composition/`, `render/`, `scenario-generator/`, `spec-validation/`, `python-starter/`, `principles/`, `probes/`, `diff/`.
- **Templates** — `templates/` with `cargo/`, `go/`, `python/`, `react-next/`, `shared/` subtrees (tier-home.md, AI-USAGE-GUIDE.md, AGENTS.md.template, husky pre-commit template, ts-server/react-next/python/cargo/go stacks).
- **Skills tests** — `skills/` holds the vitest suite for the shipped skills (dispatcher/, pipeline/ tests) — not the skills themselves, which live at the repo root `.claude/skills/` and are delivered by stage 10.
- **Audit/probe scripts** — `audit-self/` (audit-ai-docs.sh, check-rule-globs.sh, pre-merge-local.sh, …) and `probes/`, the source of the consumer `scripts/` payload.
- **Install wiring** — `install/` (rule-bootstrap-cli.ts, synth-and-wire, wire-eslint-r2), the entry the rule-bootstrapping stage executes.

## How it works

Nothing imports this package over npm. Every consumer touch is a file copy from `$PKG_ROOT/packages/core/...` by a numbered stage. Measured at the working pin, `PKG_ROOT/packages/core` is referenced 72 times across `install.sh` (13) and the stages `10-skills` (1), `30-templates` (7), `40-configs` (22), `45-python` (11), `46-cargo` (1), `47-go` (1), `50-hooks` (6), `60-ci` (1), `80-rule-bootstrap` (1), `99-finalize` (7), `lib.sh` (1). Examples of the three delivery shapes:

- **copy_safe file delivery** — audit scripts: «copy_safe "$PKG_ROOT/packages/core/audit-self/audit-ai-docs.sh" "$PROJECT_ROOT/scripts/audit-ai-docs.sh"» (stage 40); templates: «copy_safe "$PKG_ROOT/packages/core/templates/shared/tier-home.md" "$PROJECT_ROOT/.ai-factory/tier-home.md"» (stage 30, env+ gate on the preceding line).
- **rule-file loops** — stage 40 copies `packages/core/eslint-rules/*.ts` (skipping tests, `.d.ts`, index barrels) into the consumer's `eslint-rules-local/` for every stack; the refresh arm iterates the same source dir (`install.sh:1205` comment: "Iterate the SAME source dirs (core + per-stack presets)").
- **execution in place** — the rule-bootstrapping stage runs the factory from the framework checkout: «_rb_cli="$PKG_ROOT/packages/core/install/rule-bootstrap-cli.ts"» (`setup.d/80-rule-bootstrap.sh:29`), with `--consumer-root` pointing at the consumer.

The package's own README states the publish posture: «This package is currently `private: true`.» and names the planned public shape — a future `@getff/core` 0.1.0 after the repo-wide rename (`packages/core/README.md:11`). It also documents the six bin entrypoints (detect, research, synth, validate, install, verify-provenance — all `.ts` run via the `tsx` dependency): «The package exposes six `bin:` entrypoints (all .ts, executed via the `tsx` runtime dependency):»

## Satellites & companions

USES nothing upstream — it IS the upstream. The A-stages ADAPT its files into consumer-facing capability: stage 40 (A13) delivers `audit-self/` as the consumer `scripts/` gate cluster (F31–F56 source), stage 30 (A12) delivers `templates/shared/` as `.ai-factory/` content, stage 80 (A18) executes `install/rule-bootstrap-cli.ts` as the deterministic factory (F42), stage 50 (A14) delivers the husky templates and the ESM marker. G9 ADDS distribution over it: `packages/core` is a root in the dist assembler's PAYLOAD list, so the tarball carries the same tree. The rule manifest is the render input for the shipped RULES.md docs (the ts-server/react-next base RULES.md is manifest-rendered per `setup.d/30-templates.sh:20-23`).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/package.json:4` — «"private": true,»
- `packages/core/package.json:5` — «"description": "Framework core for rules-as-tests — discipline-bearing code as the project's contract artifact. Ships the rule manifest, ESLint rules, detector/research/synthesizer/installer toolchain, templates, skills, and install wiring.",»
- `packages/core/package.json:8` — «"main": "./manifest/rules-manifest.json",»
- `packages/core/manifest/rules-manifest.json:2` — «"R1": {» (R1–R20, 20 entries)
- `packages/core/README.md:11` — «This package is currently `private: true`.»
- `packages/core/README.md:15` — «The package exposes six `bin:` entrypoints (all .ts, executed via the `tsx` runtime dependency):»
- `setup.d/40-configs.sh:14` — «copy_safe "$PKG_ROOT/packages/core/audit-self/audit-ai-docs.sh" "$PROJECT_ROOT/scripts/audit-ai-docs.sh"»
- `setup.d/30-templates.sh:109` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/tier-home.md" "$PROJECT_ROOT/.ai-factory/tier-home.md"»
- `setup.d/80-rule-bootstrap.sh:29` — «_rb_cli="$PKG_ROOT/packages/core/install/rule-bootstrap-cli.ts"»
- `install.sh:201` — «"packages/core/templates/shared/AGENTS.md.template"» (first entry of the SHIPPED_DOCS refresh list)
