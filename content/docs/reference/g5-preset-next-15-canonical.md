---
title: "@rules-as-tests/preset-next-15-canonical — the frozen Next-15 snapshot preset (G5)"
description: "Workspace-private preset package freezing a Next-15 snapshot (one handwritten ESLint rule, RULES docs, audit script, six templates) with staleness pins that drive the #811 install-time WARN; the fallback baseline behind live-research delivery."
---
<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# @rules-as-tests/preset-next-15-canonical — the frozen Next-15 snapshot preset (G5)

**Status:** shipped-beta · **Ships to:** react-stack preset lane (react-next; its RULES.md is also the base rule doc for ts-server installs) · **Fires at:** install time (stages 30 + 40) and the finalize staleness WARN (stage 99, react-next only)

## What it is

The only preset package that carries a `preset.meta.json`, because it is the only one that claims a versioned snapshot. The meta records `schemaVersion` 1, «"snapshotDate": "2026-06-29",», `framework: react-next`, and four tool majors («"next": 15,» with eslint 9, prettier 3, typescript-eslint 8 alongside, `packages/preset-next-15-canonical/preset.meta.json:6-11`). Its own note states the doctrine: «Frozen Next-15 canonical preset snapshot.» (the note continues: the pinned majors anchor the #811 staleness guard, and «Presets are the FALLBACK baseline — prefer live-research delivery for rules matching your current versions.»).

Payload at the pin:

- `eslint-rules/` — ONE handwritten rule left: `no-server-imports-in-client` (`.ts` source + pre-compiled `.mjs`/`.d.ts` + test). The barrel names the plugin `'@rules-as-tests/preset-next-15-canonical-eslint-rules'` and registers only that rule; the other two former rules were migrated to declarative recipes — «// R14 (require-form-safe-parse) and R20 (require-use-server-directive) were migrated to» declarative recipes (next-r14 / next-r20) enforced by core's exempt-aware `restricted-syntax-audit-exempt` wrapper, with the handwritten rules deleted after the `*.parity.test.ts` harnesses proved fixture parity (`packages/preset-next-15-canonical/eslint-rules/index.ts:3-7`).
- `RULES.md` + `RULES.react-next.md` — the manifest-rendered multi-stack base rule doc (Stack column carries per-stack applicability) and the R12–R20 React/Next extension doc.
- `audit-self/audit-ai-docs.react-next.sh` — the stack's audit gate script.
- `templates/` — six files: `eslint.config.react.mjs`, `vitest.config.ts`, `tests-setup.ts`, `playwright.config.ts`, `github-actions-ci-ui.yml`, `ARCHITECTURE.react-next.md`.
- `package.json` — `private: true`; `"main": "./eslint-rules/index.ts",`; peer deps on core and `@next/eslint-plugin-next`.

## How it works

Delivery arms (all `copy_safe` file delivery from `$PKG_ROOT/packages/preset-next-15-canonical/`):

- **Base RULES.md** — for ts-server AND react-next, the `else` arm of stage 30 lands this package's RULES.md as the consumer's `.ai-factory/RULES.md` (`setup.d/30-templates.sh:20-29`; the comment explains ts-server/react-next share the manifest-rendered multi-stack doc while react-spa/react-native ship standalone tails).
- **Stack extension** — react-next also gets `RULES.react-next.md` and `ARCHITECTURE.react-next.md` into `.ai-factory/` («copy_safe "$PKG_ROOT/packages/preset-next-15-canonical/RULES.react-next.md" "$PROJECT_ROOT/.ai-factory/RULES.react-next.md"», `setup.d/30-templates.sh:55`).
- **ESLint rules** — stage 40 copies the package's `eslint-rules/*.ts` (tests, `.d.ts`, barrels skipped) into the consumer's `eslint-rules-local/` on react-next: «for f in "$PKG_ROOT"/packages/preset-next-15-canonical/eslint-rules/*.ts; do» (`setup.d/40-configs.sh:208`).
- **Configs + CI** — the `eslint.config.react.mjs` template lands as the consumer's eslint config (workspace arm `setup.d/40-configs.sh:355`, mono-root arm `:456`), with `vitest.config.ts`, `tests-setup.ts`, `playwright.config.ts` and the CI workflow around it (`:457-467`); the audit script is delivered at `:77` and refreshed by `install.sh:1106-1108`.
- **Refresh parity** — the refresh arm re-iterates this package's eslint-rules dir for react-next so refresh covers delivery (`install.sh:1207`).

**The staleness WARN (A20 / #811):** at finalize, react-next installs compare installed tool majors against the meta pins — «_preset_meta="$PKG_ROOT/packages/preset-next-15-canonical/preset.meta.json"» (`setup.d/99-finalize.sh:117`), guarded to react-next and dry-run-aware (`:119-121`). The compare is deps-free: `warn_preset_staleness` «warn_preset_staleness() {» in `setup.d/lib.sh:2078` reads the package.json TEXT (no module resolution — deps may be uninstalled at install time), prints a WARN block per drifted major plus the snapshot date, steers to the rule-research protocol, and always returns 0. This is the only preset that can trigger it — the guard is scoped to react-next and reads only this package's meta.

## Satellites & companions

USES `@rules-as-tests/core` (peer dep) — notably the `restricted-syntax-audit-exempt` wrapper that now enforces the migrated R14/R20 recipes — and `@next/eslint-plugin-next` as the runtime peer for the Next-15 rule. CONSUMED BY stage 30 (A12), stage 40 (A13), stage 99 (A20), the refresh arm (A2), and G9 (the package is a dist PAYLOAD root, so the tarball carries it). ADAPTS the core manifest into a frozen snapshot: RULES.md is the manifest render with a Stack column. SIBLINGS G6/G7 are the same shape minus `preset.meta.json` — no pins, no staleness WARN. The audit script here is one of the three preset audit scripts family F56 rows.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/preset-next-15-canonical/preset.meta.json:3` — «"snapshotDate": "2026-06-29",»
- `packages/preset-next-15-canonical/preset.meta.json:5` — «Frozen Next-15 canonical preset snapshot. The pinned tool majors below anchor the #811 staleness guard: a deps-free install-time WARN fires when the consumer's installed major differs (setup.d/99-finalize.sh → warn_preset_staleness in setup.d/lib.sh). Presets are the FALLBACK baseline — prefer live-research delivery for rules matching your current versions.»
- `packages/preset-next-15-canonical/preset.meta.json:7` — «"next": 15,»
- `packages/preset-next-15-canonical/package.json:7` — «"main": "./eslint-rules/index.ts",»
- `packages/preset-next-15-canonical/eslint-rules/index.ts:14` — «'no-server-imports-in-client': noServerImportsInClient,»
- `setup.d/99-finalize.sh:117` — «_preset_meta="$PKG_ROOT/packages/preset-next-15-canonical/preset.meta.json"»
- `setup.d/lib.sh:2078` — «warn_preset_staleness() {»
- `setup.d/40-configs.sh:208` — «for f in "$PKG_ROOT"/packages/preset-next-15-canonical/eslint-rules/*.ts; do»
- `setup.d/30-templates.sh:55` — «copy_safe "$PKG_ROOT/packages/preset-next-15-canonical/RULES.react-next.md" "$PROJECT_ROOT/.ai-factory/RULES.react-next.md"»
- `install.sh:208` — «"packages/preset-next-15-canonical/RULES.md"» (SHIPPED_DOCS refresh list)
