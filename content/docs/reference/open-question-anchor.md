---
title: "OPEN-QUESTION anchor (openQuestion.ts)"
description: "Census H5 — the single shared constant that lets park.ts (writer) and questions.ts (reader) agree on what a mid-flight park looks like, so the two sides can never drift."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# OPEN-QUESTION anchor (openQuestion.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/openQuestion.ts` is vendored) and clone · **Fires at:** never executes on its own — it is a pure constant imported by the park (writer) and questions (reader) CLIs.

## What it is

`packages/runtime-bridge/src/cli/openQuestion.ts` — "The single shared OPEN-QUESTION anchor" (`src/cli/openQuestion.ts:3`): the exported constant `OPEN_QUESTION_ANCHOR = '## ⏸ OPEN QUESTION'` (`:17`).

## How it works

"Written by park.ts (writer) as a heading appended to a parked task's plan, and read back by questions.ts (reader) to detect a mid-flight park whose ephemeral blockedReason was wiped by the implementing→review transition" (`:5-7`). The constant exists so "the wording cannot drift between writer and reader (per .claude/rules/dual-implementation-discipline.md #two-prompts-drift)" (`:7-9`). The match contract is prefix-based: "The writer may append a suffix (e.g. \" (awaiting operator)\"); the reader matches on this substring, so both sides agree on the stable prefix and nothing else" (`:10-12`).

The detection problem it solves: a parked task's `blockedReason` is ephemeral — aif's implementing→review transition clears it — but `paused:true` survives; questions.ts therefore counts a task as parked when it is paused AND its plan still contains this anchor (the fourth parked predicate, H7).

**Fail mode / which channel fails:** none — a constant has no failure channel. The failure it PREVENTS is writer/reader wording drift, which would silently un-park every mid-flight park (reader stops recognizing them).

## Satellites & companions

Written by park.ts (H4); read by questions.ts (H7); `@dual-pair: open-question-anchor`; the vendored copy carries it (closure of the questions/park CLIs, H21).

## Anchors

- `packages/runtime-bridge/src/cli/openQuestion.ts:3` — «* The single shared OPEN-QUESTION anchor.»
- `packages/runtime-bridge/src/cli/openQuestion.ts:5` — «* Written by park.ts (writer) as a heading appended to a parked task's plan, and»
- `packages/runtime-bridge/src/cli/openQuestion.ts:17` — «export const OPEN_QUESTION_ANCHOR = '## ⏸ OPEN QUESTION';»
