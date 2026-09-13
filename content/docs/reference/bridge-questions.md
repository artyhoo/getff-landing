---
title: "bridge questions (questions.ts)"
description: "Census H7 — the parked-questions collector — pulls every parked/awaiting-human task from aif-handoff in one pass so the human resolves them without scanning a UI."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge questions (questions.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/questions.ts` is vendored; promised by `dispatcher` and `pipeline`) and clone · **Fires at:** run manually by the operator (or an orchestrating skill) to collect what the agents are waiting on.

## What it is

`packages/runtime-bridge/src/cli/questions.ts` — "the \"parked questions\" collector half of the bridge" (`src/cli/questions.ts:2`). When an aif agent hits a genuine fork it parks the task (H4) "rather than guessing. This command pulls every such parked task from the aif-handoff REST API and prints them in one place so a human can resolve them in a single pass — removing the \"scan the UI for stuck tasks\" step" (`:6-10`).

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/questions.ts [--project <id>] [--json]` (`:5`); `--project` overrides `RUNTIME_BRIDGE_AIF_PROJECT_ID`, `--json` prints "the selected tasks as a JSON array (for piping into a chat)" (`:21-22`).

**The four parked predicates** — a task is "parked / awaiting human" when ANY of (`:16-21`):
- `manualReviewRequired === true`, or
- `status === 'blocked_external'`, or
- `blockedReason` is a non-empty string, or
- `paused === true` AND the plan contains the OPEN-QUESTION anchor (H5) — "mid-flight park whose blockedReason was cleared by implementing→review".

**Env:** `RUNTIME_BRIDGE_AIF_URL` (default `http://localhost:3009`), `RUNTIME_BRIDGE_AIF_PROJECT_ID` (optional project filter) (`:13-14`).

**Fail mode / which channel fails:** "Exit codes: 0 — success, even when zero tasks are parked. 1 — fetch/parse error (message on stderr)" (`:29-31`) — an empty queue is a normal outcome, not a failure; only the fetch/parse channel fails.

## Satellites & companions

Reader side of the park loop: consumes parks written by park.ts (H4) and the anchor constant (H5); answers go back through answer.ts (H6); REST plumbing H11.

## Anchors

- `packages/runtime-bridge/src/cli/questions.ts:2` — «* CLI questions entrypoint — the "parked questions" collector half of the bridge.»
- `packages/runtime-bridge/src/cli/questions.ts:5` — «*   tsx packages/runtime-bridge/src/cli/questions.ts [--project <id>] [--json]»
- `packages/runtime-bridge/src/cli/questions.ts:20` — «*   - status === 'blocked_external', OR»
- `packages/runtime-bridge/src/cli/questions.ts:30` — «*   0 — success, even when zero tasks are parked.»
- `packages/runtime-bridge/vendor/README.md:61` — «| `src/cli/questions.ts` | `dispatcher`, `pipeline` | none new (no sibling imports)        |»
