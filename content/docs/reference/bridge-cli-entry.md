---
title: "bridge cliEntry (cliEntry.ts)"
description: "Census H12 — shared entrypoint plumbing for every runtime-bridge CLI: the realpath'd main-module guard (symlink invocations used to exit 0 silently) and a strict parseArgs wrapper that rejects the arg shapes a hand-rolled lookup accepted."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge cliEntry (cliEntry.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — `src/cli/cliEntry.ts` vendored 2026-09-05 as "closure, not a new promise: the copies it replaces were already in this tree, one per CLI") and clone · **Fires at:** import-time of every runtime-bridge CLI entrypoint — the `isMain` guard decides whether the module runs as a CLI at all.

## What it is

`packages/runtime-bridge/src/cli/cliEntry.ts` — "Shared entrypoint plumbing for every runtime-bridge CLI: the main-module guard and argv parsing. Both used to be copy-pasted per CLI, and both had defects the copies did not share (#1597 review ledger A6-1 / A6-4 / A6-7 / R-6)" (`src/cli/cliEntry.ts:3-5`).

## How it works

**`isMain` — realpath BOTH sides** (`:7-13`, export at `:40`): the naive `fileURLToPath(import.meta.url) === process.argv[1]` "compares a RESOLVED path against a possibly-symlinked one, so invoking a CLI through a symlink (`node_modules/.bin`, a `bin/` shim, an absolute path under macOS /tmp → /private/tmp) made the guard false and the CLI exited 0 having done nothing, silently (A6-1)". dispatch.ts + claim.ts already carried the realpath form (#968); "this is that fix, applied once for all of them."

**`parseCliArgs` — strict wrapper over node:util `parseArgs`** (Node ≥18.3 built-in; "no new dependency", `:15-16`). The hand-rolled `argv.indexOf(flag) + 1` lookup accepted three shapes it should have rejected (`:17-21`):
- `--task --json` → taskId `'--json'` (A6-7: the next FLAG became the value);
- `--base staging <id>` → taskId `'staging'` (A6-4: "first non-`--` token" picked up a flag's value when the flag came first);
- `--taks t1` → silently ignored (typo'd flag = missing required arg).

"`parseArgs` rejects all three natively (ERR_PARSE_ARGS_*); the two rules it does NOT have — an empty `--flag=` value, and positional junk beyond what the CLI accepts — are added here" (`:21-24`).

**Fail mode / which channel fails:** bad argv → `CliArgError` → the calling CLI exits 1 with the message on stderr (each CLI's documented exit contract); a mis-invoked CLI through a symlink now RUNS instead of exiting 0 silently. Exported pieces: `isMain`, `parseCliArgs`, `CliArgError` (imported by the CLIs, e.g. `park.ts:27`).

## Satellites & companions

Underlies every CLI in `src/cli/` (H2-H10); the symlink case has a dedicated regression test (`test/cli-symlink-entry.test.ts`, H23); vendored as closure of the per-CLI copies it replaced (`vendor/README.md:70-74`, H21).

## Anchors

- `packages/runtime-bridge/src/cli/cliEntry.ts:3` — «* Shared entrypoint plumbing for every runtime-bridge CLI: the main-module guard»
- `packages/runtime-bridge/src/cli/cliEntry.ts:7` — «* `isMain` — realpath BOTH sides. `fileURLToPath(import.meta.url) === process.argv[1]`»
- `packages/runtime-bridge/src/cli/cliEntry.ts:21` — «* `parseArgs` rejects all three natively (ERR_PARSE_ARGS_*); the two rules it does NOT»
- `packages/runtime-bridge/src/cli/cliEntry.ts:40` — «export function isMain(importMetaUrl: string, argv1: string | undefined = process.argv[1]): boolean {»
- `packages/runtime-bridge/test/cli-symlink-entry.test.ts:1` — «// packages/runtime-bridge/test/cli-symlink-entry.test.ts»
