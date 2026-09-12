---
title: rule-test-author
description: Writes or repairs the firing test material for an existing generated rule (npm-lane negative-test, astgrep/ruff bad-good sidecar samples), verifies it in single-rule isolation, and quotes the tool verdict verbatim.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11, re-read 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# rule-test-author

**Status:** shipped-beta · **Ships to:** npm lane — delivered into the consumer's `.claude/agents/` by the setup delivery loop (`setup.d/20-agents.sh:24`) · **Fires at:** dispatched as a Claude Code sub-agent

## What it is

Sub-agent that writes or repairs the **firing test material** for a rule the framework already generated, verifies it with the lane's own deterministic check, and quotes the tool's verdict — "what you author is the evidence that it still fires" (`agents/rule-test-author.md:22`). Frontmatter scope: material for an EXISTING rule, verified "without re-running the full research pass"; NOT for creating new rules — that is /rule-research (`agents/rule-test-author.md:9`).

## How it works

- **Edit surface.** npm lane: the `negative-test` entry of a rule in `.ai-factory/synthesizer-output/rules-manifest-additions.json`; astgrep/ruff lanes: the enrichment sidecar `.ai-factory/rule-tests/<backend>.json` (`agents/rule-test-author.md:28`).
- **Never the rule.** "You NEVER edit the emitted rule artifact" — it is drift/hash-gated; a step that touches the rule «to make the test pass» has inverted the discipline (T-RTS-B) (`agents/rule-test-author.md:29`).
- **Protocol.** Read the delivered rule artifact → write/repair the material → run the lane's deterministic check in single-rule isolation → paste the tool's own stdout into the report; no «verified» claim is valid without the isolation run and the quoted verdict (T-RTS-C) (`agents/rule-test-author.md:44`).
- **Single-rule isolation is binding.** Reported diagnostic codes alias across rules on two lanes — ruff emits `TID251`/`TID253` for every banned-import/banned-API rule, cargo emits `clippy::disallowed_methods` for every method ban; only astgrep reports a per-rule id, so a green run against a many-rule config is meaningless (`agents/rule-test-author.md:50`).
- **Also carries** the per-lane honesty map v0 (what each lane's verification actually proves today) and the D3 staleness-consent script (detect → explain → offer → run-on-consent over the two staleness ledgers) (`agents/rule-test-author.md:74`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** each lane's deterministic verifier (npm validator gates, `ast-grep scan --json`, `ruff check --output-format=json`, `cargo clippy`) — verification is tool verdicts, zero LLM adjudication.
- **ADAPTS:** the write/repair half of the rule-tests protocol; it composes with /rule-research, the stage «create» half (`agents/rule-test-author.md:24`).
- **ADDS:** the hash-exemption argument — `canonicalRuleHash` covers only a rule's identity fields, so a `negative-test` repair does not trip the anti-hand-edit gate (`agents/rule-test-author.md:31`).
- Census satellite: **B4**. Carries `@dual-pair: rule-tests-protocol` (`agents/rule-test-author.md:15`).

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `agents/rule-test-author.md:2` — `name: rule-test-author`
- `agents/rule-test-author.md:3` — `description: >-`
- `agents/rule-test-author.md:4` — `Writes or repairs the firing TEST MATERIAL for an EXISTING generated rule — the negative-test …`
- `agents/rule-test-author.md:6` — `lane's deterministic verification in single-rule isolation and quotes the tool verdict verbatim.`
- `setup.d/20-agents.sh:24` — `for f in "$PKG_ROOT"/agents/*.md; do`
- `agents/rule-test-author.md:19` — `> **Authoritative for:** the AI-agnostic rule-tests write/repair protocol — read a delivered rule artifact → write/repair its firing TEST MATERIAL …`
- `agents/rule-test-author.md:28` — ``- **You edit TEST MATERIAL only.** npm lane: the `negative-test` entry of a rule in `.ai-factory/synthesizer-output/rules-manifest-additions.json` …``
- `agents/rule-test-author.md:29` — ``- **You NEVER edit the emitted rule artifact** (the `check`/`selector`/`title` of a generated rule). That artifact is drift/hash-gated. …``
- `agents/rule-test-author.md:44` — `### 3. Verify in single-rule isolation, then quote the verdict verbatim`
- `agents/rule-test-author.md:48` — `## Single-rule isolation (binding)`
- `agents/rule-test-author.md:50` — ``Reported diagnostic codes **alias across rules** on two lanes: ruff emits `TID251`/`TID253` for _every_ banned-import / banned-API rule, and cargo emits `clippy…``

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (fetched 2026-09-11 from `artyhoo/getff` staging; ancestry of census pin `a1337cb301` verified).
