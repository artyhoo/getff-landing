---
title: "companion-install-principle — detect-first official installs"
description: "Class B rule: companions and external services install via their own official top-level installer, detect-first, with no version pin, defaulted to the free-on-subscription path — declared in the companions.manifest data file."
---

> **Census id:** F9 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F9: MISSING → drafted E4; census satellite A10) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «editing `setup.d/**` (companion install manifest/engine).» (`.claude/rules/companion-install-principle.md:13`) — paths:(1) + edit-time inject |

## What it bans

Reimplementing a companion's install steps, pinning companion versions, or defaulting consumers onto paid APIs. `.claude/rules/companion-install-principle.md:7` «# Companion / external-service install principle — discipline rule»; the principle: `:23` «> Our installer installs only our own artefacts. Companions and external services are installed via **their own official top-level installer**, after a **detect-first** check, **without pinning a version**, and **configured to the free-on-subscription path by default** (never silently a paid API). We never reimplement a companion's install steps.» Class header: `:12` «> **Class:** B — compensating mechanism without CI test: an edit-time reminder injected by [`inject-matching-rule.sh`](../hooks/inject-matching-rule.sh) via the `<!-- globs: -->` marker above, paired with the CC-native `paths:` frontmatter sibling (read-time, whole-rule)».

## Never (fires)

A manifest row carrying a version pin, or an install command that is not the companion's own. The mechanism states the negatives: `.claude/rules/companion-install-principle.md:42` «- **No version pin:** no `install_cmd` carries an `@x.y.z` pin; the upstream registry serves latest.» and `:43` «- **Official installer only:** `install_cmd` is the companion's own top-level command (e.g. `claude plugin install superpowers@claude-plugins-official --scope user`); we never reimplement its steps.» The paid-API default is banned for external-service rows: `:44` «- **Free-on-subscription default:** … which offers the `transport:"cli"` switch off the metered SDK default — never silently a paid API.»

## Always (clean)

A declarative manifest row run by the generic engine: `.claude/rules/companion-install-principle.md:40` «Declarative [`setup.d/companions.manifest`](../../setup.d/companions.manifest) — TAB-delimited rows `name / detect_cmd / install_cmd / kind` — plus the generic engine [`setup.d/engine.sh`](../../setup.d/engine.sh) (`companion_step`): for each row, run `detect_cmd`; present → skip; absent → offer `[y/N]` → run `install_cmd` verbatim.» The update story that proves the design: `:29` «| Satellite ships a new **version** | **Never** — we call `claude plugin install <x>@<marketplace>` with no version pin; the registry serves latest. Updates flow through their installer. |»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:17` «| `companion-install-principle.md` | B | editing `setup.d/**` (companion install manifest/engine). | paths:(1), edit-time inject |»
- **Edit-time inject**, 1 glob: `.claude/rules/companion-install-principle.md:9` «<!-- globs: setup.d/** -->», inject text at `:10` («detect-first, official installer only, NO version pin, free-on-subscription default»).
- No CI gate yet — the rule says so itself (`:12` «No CI gate yet — the no-version-pin principle is mechanically detectable but not yet enough manifest rows to warrant a gate (§4)»); promotion trigger: «≥3 rows OR the first version-pin incident» (`:48`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`). Honest status: edit-time inject only, promotion to a grep gate pre-declared.
