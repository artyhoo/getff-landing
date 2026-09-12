---
title: "language-discipline — internal English, human-facing AIF_HOOK_LANG-gated"
description: "Class A rule with a 3-category model: internal machinery is English-only (CI principle test 22), operator-facing output follows AIF_HOOK_LANG, and match-data stays bilingual — translating it away silently breaks Russian-input recognition."
---

> **Census id:** F18 · **Family:** F — rules corpus + generated-rule tooling + shipped audit scripts · **Provenance:** framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, read 2026-09-11; re-anchored from census pin `a1337cb301`). Every `file:line` below is at that pin. Raw reference drafted by stage E4 — factual, unpolished by design.

| Field | Value |
|---|---|
| Status | raw reference (census row F18: MISSING → drafted E4; census satellite D3) |
| Ships-to | clone only (`setup.d/20-agents.sh:44` «(rules/ is not shipped)») |
| Fires-at | «writing any internal machinery or human-facing output.» (`.claude/rules/language-discipline.md:14`) — paths:(3) + edit-time inject |

## What it bans

Mixed-language internal machinery, and match-data translation. `.claude/rules/language-discipline.md:8` «# Language discipline — internal English, human-facing AIF_HOOK_LANG-gated»; the 3-category model (`:22-26`): category 1 «Internal machinery — comments, logic, AI-facing SKILL instructions, tool args, code, repo artifacts» → «**English, always**»; category 2 «Human-facing output» → «**`AIF_HOOK_LANG`-gated**: `ru` → Russian, else English»; category 3 «Activation / match metadata» → «**bilingual / language-specific kept**». The category-3 trap: `:28` «Category 3 is the trap: removing those Russian tokens silently breaks recognition of Russian operator input/output, with no upside.» Class header: `:13` «> **Class:** A — companion principle test shipped at [packages/core/principles/22-internal-english.test.ts] (2026-06-16).»

## Never (fires)

The anti-patterns: `.claude/rules/language-discipline.md:51` «- **`#russian-in-machinery`** — Cyrillic comment/prose in a hook/script/skill body. Counter: translate to English; principle 22 Surface 1/2 catches it.»; `:52` «- **`#headers-localized-prose-not`** — localizing shell tokens but writing prose in the wrong language (the 2026-06-16 pipeline bug).» (the origin incident: `:18` «`/pipeline` localized table headers but wrote English prose even under `AIF_HOOK_LANG=ru`»); `:53` «- **`#match-data-translated-away`** — "making it English" by deleting category-3 Russian tokens, breaking Russian-input recognition.»

## Always (clean)

The two human-facing sub-channels: `:34` «- **2a shell-emitted** (hooks/helpers `echo`, no LLM in the loop): via `lang/{en,ru}.sh` packs, selected by `${AIF_HOOK_LANG:-en}` with a hard EN fallback.» and `:35` «- **2b LLM-authored** (the model writes prose): the model learns the active language from (i) the always-on line injected by [`inject-session-bootstrap.sh`] … and (ii) the pipeline `AIF_OUTPUT_LANG` render-time signal, and MUST write ALL operator-facing prose in it». Precedence: `:37` «`AIF_HOOK_LANG` overrides the prompt-language default when set; unset → English.»

## Enforcement channels

- Rule-index row: `.claude/rules/00-rule-index.md:26` «| `language-discipline.md` | A | writing any internal machinery or human-facing output. | paths:(3), edit-time inject |»
- **Edit-time inject**, 3 globs: `.claude/rules/language-discipline.md:10` «<!-- globs: .claude/hooks/**, .claude/skills/**, scripts/** -->», inject text at `:11`.
- **CI principle test:** `packages/core/principles/22-internal-english.test.ts` — «Surface 1 (machinery shell, zero-tolerance) + Surface 2 (SKILL.md bodies after frontmatter, allowlisted)» (`:45`); a deterministic Cyrillic grep, zero API calls (`:62`).
- **Always-on injection (not a gate):** the B1 output-language line in `inject-session-bootstrap.sh` — «judgment-shaped prose-following, so injection, not a gate» (`:46`).
- **Parity checks:** `.claude/hooks/lang/check-parity.sh` + `.claude/skills/pipeline/lang/check-parity.sh` (en/ru key parity, `:47`).
- Not backend-rendered — no FF diagnostic applies (FF7001/FF7002, `packages/core/diagnostics/registry.ts:321`/`:329`); honest status: CI grep + injection + parity scripts.
