---
title: "evidence-regeneration — verified recipe"
description: "Class B verified recipe: when a backend's toolchain-freshness gate goes RED, re-fire the committed invalid fixture at the CI-resolved version and paste the fresh diagnostic — never hand-write toolchain strings or carry diagnostics over."
---

> **Census id:** F15 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F15: MISSING → drafted E4) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «a freshness gate RED, or a first live-fired matrix cell.» (`.claude/rules/evidence-regeneration.md:13`) — paths:(1) + edit-time inject |

## What it bans

Regenerating backend capability-matrix evidence without actually re-firing it. `.claude/rules/evidence-regeneration.md:7` «# Evidence regeneration — discipline rule (verified recipe)»; the rule: `:21` «When a backend's toolchain-freshness gate goes RED … regenerate that backend's evidence block by **re-firing the committed invalid fixture with the tool at the version CI will resolve, and pasting the resulting diagnostic verbatim** — then verify green **before** the single commit … Never hand-write a `toolchain` string, never carry a `capturedDiagnostic` over from the prior block, and never commit an evidence block you did not re-fire this session.» Origin incident: `:17` «#1033 regenerated a matrix evidence block against a **stale host-local eslint** … and changed only `date`+`toolchain` while the `capturedDiagnostic` stayed byte-identical … every deterministic gate stayed green, the regen was semantically wrong, and #1041 had to revert it.» Class header: `:12` «> **Class:** B — the DETECTION layer already exists as deterministic RED gates (`checkToolchainFreshness` per backend, run by `test:backends`; the FF8004 coherence gate, run by `test:composition`); this rule is the verified *procedure* for satisfying them».

## Never (fires)

The anti-patterns, quoted: `.claude/rules/evidence-regeneration.md:102` «- **`#evidence-theatre`** — bumping `date`+`toolchain` while `capturedDiagnostic` is carried over byte-identical (the #1033 shape). Passes every gate; is not a regeneration.»; `:103` «- **`#regen-against-host-local-tool`** — re-firing with whatever version is on local `PATH` instead of the version CI resolves.»; `:104` «- **`#hand-written-toolchain`** — typing the `toolchain` string from memory instead of copying the live `--version` output.»; `:105` «- **`#split-regen-commit`** — landing the pin-site edit and the matrix edit in separate commits, leaving CI RED in the window between them.»

## Always (clean)

The five-step recipe (`:27-45`), two anchors quoted: `:29` «1.  Install the version CI WILL RESOLVE — CI is the authoritative resolver (§2a).» and `:39` «4.  Verify green, quoting the verdicts:» with `:40-41` (`npm --prefix packages/core run test:backends` / `npm --prefix packages/core run test:composition`, «MUST be green BEFORE step 5 — this is the safety interlock (§2d)»). The paste rule — the load-bearing one: `:94` «`capturedDiagnostic` MUST be pasted from **this session's** fresh step-2 firing stdout, and that stdout MUST be quoted in the PR body. This is the one step no gate can enforce».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:23` «| `evidence-regeneration.md` | B | a freshness gate RED, or a first live-fired matrix cell. | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/evidence-regeneration.md:9` «<!-- globs: packages/core/backends/** -->» («a live 102-file glob», `:129`), inject text at `:10`.
- **Detection gates (pre-existing, the rule serves them):** `checkToolchainFreshness` per backend (run by `test:backends`) and the FF8004 coherence gate (run by `test:composition`) — named at `:12`; the fired-vs-rendered boundary is the `hasFiringEvidence(node, matrix)` predicate (`:88`, `packages/core/composition/enforcement-line.ts:34-39`).
- Backend scope (§2b, `:51-56`): `<b>` ∈ `{ npm, astgrep, ruff, cargo }` — each with a firing command and expected match (e.g. `cargo` «`$.message.code.code` == `clippy::disallowed_methods`»).
- Not backend-rendered itself — no FF7001/FF7002 on this rule (those are render refusals, `packages/core/diagnostics/registry.ts:321`/`:329`; FF8004 quoted here is the composition coherence gate this recipe satisfies). Honest status: edit-time inject + existing RED gates.
