---
title: "bridge answer (answer.ts)"
description: "Census H6 — the \"push the resolved answer back + resume\" half of the question loop — comments the answer onto the parked task and drives aif's event-only state machine to resume it."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge answer (answer.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/answer.ts` is vendored; promised by the `dispatcher`, `night-mode`, `pipeline` skills) and clone · **Fires at:** run by the operator after resolving a parked question surfaced by questions.ts — the human half of the loop.

## What it is

`packages/runtime-bridge/src/cli/answer.ts` — "the \"push the resolved answer back + resume\" half of the bridge" (`src/cli/answer.ts:2`). It removes "the \"re-open the task in the UI and paste the answer\" step" (`:11-12`) — the sibling chain is dispatch.ts → await.ts → questions.ts → answer.ts.

## How it works

**Invocation:** `tsx packages/runtime-bridge/src/cli/answer.ts --task <id> --answer "<text>" [--decision request_changes] [--json]` (`:5`); decision-only forms exist for `approve`, `retry`, `complete_review`, `request_review_changes` (`:6-9`).

**Two load-bearing aif facts it rests on** (`:15-22`, S1-verified): (1) "aif status is EVENT-only — `POST /tasks/:id/events { event }` drives transitions; a `PUT { status }` is silently ignored"; (2) "the answer TEXT rides as a comment whose field is `message` (1..20000 chars); `request_changes` consumes the LATEST human comment as rework feedback (planner.ts `comments.slice(-1)`), exactly as the aif web UI does it".

**Decision → sequence** (`:24-27`): `request_changes` (default) = POST the comment, then POST the `request_changes` event → done → implementing with reworkRequested:true (aif redoes with the feedback).

**Env:** `RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? http://localhost:3009` (same convention as the sibling CLIs). Vendored availability: promised by the shipped `dispatcher`, `night-mode`, `pipeline` skills — "none new (`backend.ts` already here)" closure cost (`vendor/README.md:58-59`).

**Fail mode / which channel fails:** "Exit codes: 0 — answer pushed + task resumed. 1 — missing/invalid args, or a REST error (message on stderr)" (`:53-55`). REST failures map through aifHttp's single BackendError mapping (H11).

## Satellites & companions

Resolves what park.ts (H4) created; the parks it consumes are surfaced by questions.ts (H7) via the shared OPEN-QUESTION anchor (H5); REST helpers H11; argv/main-guard plumbing H12.

## Anchors

- `packages/runtime-bridge/src/cli/answer.ts:2` — «* CLI answer entrypoint — the "push the resolved answer back + resume" half of the bridge.»
- `packages/runtime-bridge/src/cli/answer.ts:5` — «*   tsx packages/runtime-bridge/src/cli/answer.ts --task <id> --answer "<text>" [--decision request_changes] [--json]»
- `packages/runtime-bridge/src/cli/answer.ts:20` — «*   1. aif status is EVENT-only — `POST /tasks/:id/events { event }` drives transitions;»
- `packages/runtime-bridge/src/cli/answer.ts:53` — «* Exit codes:»
- `packages/runtime-bridge/vendor/README.md:58` — «| `src/cli/answer.ts`    | `dispatcher`, `night-mode`, `pipeline` | none new (`backend.ts` already here) |»
