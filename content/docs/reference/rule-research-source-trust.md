---
title: "research-source-trust — source trust tiers"
description: "Class A rule over the rule-research provenance allowlist: Tier 0 builtin / Tier 1 derived from direct-dependency metadata scope-locked / Tier 2 consumer-acked data file; trust grants are data changes, never source edits; anything else fails closed."
---

> **Census id:** F24 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F24: MISSING → drafted E4; census satellite B3 — the rule-research skill) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «authoring a rule-research provenance entry / resolving allowed sources.» (`.claude/rules/research-source-trust.md:15`) — paths:(2) + edit-time inject + skill-embed |

## What it bans

Trust granted by name instead of scope, and allowlist growth by source edit. `.claude/rules/research-source-trust.md:12` «# Research-source trust tiers — discipline rule»; the tier shape: `:29` «One-line summary for readers who only need the shape: a provenance URL is authorized if its host matches a builtin key (Tier 0), OR derives from a direct dependency's own metadata scope-locked to that package and not a shared apex (Tier 1), OR is explicitly acked by a human in a committed, PR-reviewed file (Tier 2). Anything else fails closed.» SSOT pointer discipline: `:23` «The full tier architecture, threat model, and cross-tier invariants are specified in the umbrella kickoff — **this rule points to that spec, it does not copy it**». Class header: `:14` «> **Class:** A — companion principle test shipped at [packages/core/principles/30-research-source-trust.test.ts].»

## Never (fires)

The anti-patterns: `.claude/rules/research-source-trust.md:41` «- **`#trust-by-name-not-scope`** — authorizing a research host because it belongs to a familiar-sounding package, without the accompanying same-package scope-lock.»; `:42` «- **`#allowlist-as-code-not-data`** — extending research-source trust by editing framework TypeScript source … instead of the appropriate **data** surface … a PR that adds a host to `ALLOWED_SOURCES` or hand-writes a `multi-tenant-hosts.json` exception for a single request is the violation this names.» The binding re-tightening trigger (`:35`): «> The moment Path B (LLM code-gen) activates, Tier-1 auto-trust is downgraded to Tier-2-ack for any code-generating flow.» — «Implementing Path B without also downgrading Tier 1 for its code-generating flows is a rule violation, not an oversight to catch later.» (`:37`)

## Always (clean)

Trust extended only as data: `.claude/rules/research-source-trust.md:42` «Counter: a new trust grant is always a **data change** (an installed dependency's own metadata, or an acked JSON entry)». Ecosystem prefixes parse fail-closed (`:46`): «An unrecognized prefix (e.g. a hypothetical `pip:requests` before a pip adapter exists) parses to `ecosystem:"unknown"` — fail-closed, never silently retried as a bare npm name.» Path guards (R-1 posture, `:59`): «both guard families now have ONE definition each, in [`packages/core/research/research-path-guards.ts`]».

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:32` «| `research-source-trust.md` | A | authoring a rule-research provenance entry / resolving allowed sources. | paths:(2), edit-time inject, skill-embed |»
- **Edit-time inject**, 2 globs: `.claude/rules/research-source-trust.md:8` «<!-- globs: packages/core/research/**, .ai-factory/research-allowlist.json -->», inject text at `:9`.
- **Skill-embed:** `.claude/rules/research-source-trust.md:10` «<!-- channel: skill-embed .claude/skills/rule-research/SKILL.md#research-run -->».
- **Companion principle test (CI):** `packages/core/principles/30-research-source-trust.test.ts` (`:14`, `:77`) — «store-wide discipline invariants, distinct from the resolver's own behavior suites».
- **Resolver (the enforcement code, not edited by trust grants):** `packages/core/research/allowlist-resolver.ts` — `resolveAllowedSources` + `validateProvenance` (`:27`); tripwires: `ecosystem-adapter-precondition.test.ts`, `ackfilepath-plan-containment.test.ts` (`:55-:61`).
- Not backend-rendered — no FF7001/FF7002 (those are backend render refusals, `packages/core/diagnostics/registry.ts:321`/`:329`; the FF2016/FF2009 codes quoted at `:46` are research-resolver diagnostics, quoted where they belong). Honest status: edit-time inject + skill-embed + CI principle tests + fail-closed resolver.
