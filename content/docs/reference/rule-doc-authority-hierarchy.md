---
title: "doc-authority-hierarchy — doc authority order"
description: "Class A rule: every canonical doc carries an Authoritative-for / NOT-authoritative-for header; rule files add a Class field; the CI principle test (09) enforces it over a git-aware dynamic doc population."
---

> **Census id:** F11 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F11: MISSING → drafted E4; census satellite D10 — the plugin hook) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «creating/editing any canonical or shipped consumer-facing doc.» (`.claude/rules/doc-authority-hierarchy.md:16`) — paths:(4) + edit-time inject |

## What it bans

Authority drift: operational docs quietly redefining project-wide claims. `.claude/rules/doc-authority-hierarchy.md:13` «# Doc authority hierarchy — discipline rule»; the origin incident: `:20` «`EXECUTION-PLAN.md §1` silently re-defined the project's goal as «recursive self-application is the north star», overriding `README.md#why-this-exists». The drift went uncaught for months because the project had code-level discipline … but no doc-authority discipline.» The fix: `:37` «The fix is **explicit per-doc authority scope**, declared at the top of every canonical doc:» — *what this doc owns* (Authoritative-for) and *what falls outside its scope*. Class header: `:15` «> **Class:** A — companion principle test shipped at [packages/core/principles/09-doc-authority-hierarchy.test.ts].»

## Never (fires)

The four anti-patterns: `.claude/rules/doc-authority-hierarchy.md:106` «- **`#operational-doc-redefines-goal`** — operational doc (EXECUTION-PLAN, ROADMAP, phase prompt) introduces «north star» / «central thesis» / «main goal» language.»; `:107` «- **`#missing-authority-header`** — canonical doc has no Authoritative-for declaration.»; `:108` «- **`#contradicting-authority-claims`** — two docs claim authority for the same scope without subordination marker.»; `:109` «- **`#frozen-doc-still-edited`** — doc marked FROZEN (e.g. PROPOSAL.md) receives substantive content edits beyond its scope.»

## Always (clean)

A canonical doc whose header follows §3 — the format block at `:75-83` («`> **Authoritative for:** <one-sentence scope statement>.` / `> **NOT authoritative for:** <when ambiguity exists — what falls outside>; see [<canonical doc>](path).»), plus the rule-file Class field: `:100` «**Rule-files Class field (`.claude/rules/*.md`):**» `:102` «…carry a `> **Class:**` line declaring their executable-artifact status — `A` (principle test shipped or actively designed) / `B` (compensating mechanism without test) / `C` (prose-only, mechanism deferred with explicit promotion criterion).» Folder-level authority is the economy path (`:52`): one header in the folder README, individual files inherit.

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:19` «| `doc-authority-hierarchy.md` | A | creating/editing any canonical or shipped consumer-facing doc. | paths:(4), edit-time inject |»
- **Edit-time inject**, 4 globs: `.claude/rules/doc-authority-hierarchy.md:10` «<!-- globs: .claude/rules/**, agents/**, .claude/skills/**, packages/core/templates/** -->», inject text at `:11` («every canonical doc must carry an Authoritative-for header. Rule files also need a Class: field.»).
- **Companion principle test (CI, shipped):** `packages/core/principles/09-doc-authority-hierarchy.test.ts` over the shared module `packages/core/principles/09-doc-authority-hierarchy.ts` (`REQUIRED_HEADER_DOCS` + dynamic enumerators `enumerateSkillPrimaryDocs` / `enumerateFlatRequiredDocs`, `:133-134`); dynamic coverage means «a new rule or agent is covered the moment it lands, with no static-list edit» (`:58`).
- **Plugin hook relation:** the census row's satellite D10 (`plugin/hooks/check-doc-authority`) is the plugin-lane arm of the same discipline (census row F11 satellites column).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: edit-time inject + CI principle test + promotion-to-gate trigger pre-declared at `:127`.
