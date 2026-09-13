---
title: "runtime-bridge vendor copy (vendor/)"
description: "Census H21 — the S5 A7 vendored COPY (not a dependency): the minimum-for-dispatch subset of the bridge installed at --profile factory, with two deliberate omissions and an import-closed tree."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# runtime-bridge vendor copy (vendor/)

**Status:** shipped-beta · **Ships to:** factory consumers — the `factory` install profile copies it to `.claude/vendor/runtime-bridge/` via `setup.d/55-runtime-bridge-vendor.sh` (A15) · **Fires at:** whenever a CONSUMER project dispatches — the vendored CLIs (tsx-run) are the consumer's entire bridge surface.

## What it is

`packages/runtime-bridge/vendor/` — "S5 A7 vendored COPY (not a dep) of the runtime-bridge dispatch subset. See README.md." (`vendor/package.json:6`). The README is blunt about the mechanism: "This directory is a **one-way COPY** of the framework's `packages/runtime-bridge/src/` subset + the bash dispatch hook at `.claude/hooks/runtime-bridge-dispatch.sh` … so a consumer (non-framework) project can dispatch aif tasks **without depending on the framework npm package**" (`vendor/README.md:16-21`). "Spec A7 binds COPY (not symlink, not submodule, not npm dep). npm packaging of the bridge is **deferred to U9**" (`:23-24`).

## How it works

**Admission criterion — the transitive closure:** "The copy is the **complete transitive import closure of `cli/dispatch.ts`** — verified at copy time by tracing `import { … } from '…'` chains" (`:28-29`). The closure table admits `cli/dispatch.ts`, `kickoff.ts`, `idempotency.ts`, `resolver.ts`, `ManualBackend.ts`, `backend.ts`, `AifHandoffBackend.ts`, `aifWsStatus.ts` (`:30-40`), plus five CLIs admitted later on the same criterion — harvest, answer, questions (`:57-63`), claim (2026-08-18, with `backend.ts` + `AifHandoffBackend.ts` re-vendored in the same pass so the claim protocol can run, `:75-80`), and `cliEntry.ts` (2026-09-05, "closure, not a new promise", `:69-73`). "The copy stays import-closed — every relative import from every vendored `.ts` resolves inside this tree (verified at copy time)" (`:66-67`).

**Deliberate omissions** (`:82-90`): "Files NOT copied" — `src/AifFireBackend.ts`, `src/index.ts` ("referenced only outside the dispatch closure") and `src/cli/await.ts` ("the one agent-loop entrypoint **no shipped skill mentions** … Nothing promises it, so nothing obliges us to carry it … Its closure is already present … so admitting it later is a one-file copy").

**Package shell** (`vendor/package.json`): `"private": true`, `{"type": "module"}`, version `0.0.0-s5-a7-vendor-copy`, and a mandatory tsx peer-dep (`"peerDependencies": { "tsx": ">=4" }` with `optional: false`) — tsx is how every vendored CLI is invoked.

**Env-var contract** (README §«Env-var contract», `:92-107`): `RUNTIME_BRIDGE_MODE`, `RUNTIME_BRIDGE_AIF_URL`, `RUNTIME_BRIDGE_AIF_MCP_URL`, `RUNTIME_BRIDGE_AIF_PROJECT_ID`, `RUNTIME_BRIDGE_DEDUP_PATH`, `RUNTIME_BRIDGE_AIF_REPO_PATH`, `RUNTIME_BRIDGE_AIF_CONTAINER`, `RUNTIME_BRIDGE_HOST_REPO`, `AIF_HOOK_LANG`.

**Fail mode / which channel fails:** the copy is inert — nothing auto-runs it; CLIs fail with their own exit contracts (H2-H12), and the deliberate-omission rule means a consumer asking for `/fire` dispatch or `await` read-back gets neither (a documented absence, not an error). Refresh mechanics live in `setup.d/55-runtime-bridge-vendor.sh`; the update mechanism itself is parked (P4, `:93-95`).

## Satellites & companions

Carries the vendored forms of H2-H12, H14, H15, H17, H18, H19, H20; omits H10 and H16 by rule; delivered by the installer stage (A15); the vendored dispatch hook it rides with is D16's consumer twin.

## Anchors

- `packages/runtime-bridge/vendor/package.json:6` — «"description": "S5 A7 vendored COPY (not a dep) of the runtime-bridge dispatch subset. See README.md.",»
- `packages/runtime-bridge/vendor/README.md:16` — «## What this is — COPY, not a dependency»
- `packages/runtime-bridge/vendor/README.md:28` — «The copy is the **complete transitive import closure of `cli/dispatch.ts`** — verified at copy»
- `packages/runtime-bridge/vendor/README.md:84` — «- `src/AifFireBackend.ts`, `src/index.ts` — referenced only outside the dispatch closure.»
- `packages/runtime-bridge/vendor/README.md:99` — «| `RUNTIME_BRIDGE_MODE`           | `manual` / `aif-handoff` / `auto` (auto falls back to ManualBackend if aif-handoff unreachable)       | yes (or `--mode` flag)   |»
