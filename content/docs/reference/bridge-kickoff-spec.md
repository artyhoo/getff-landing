---
title: "bridge KickoffSpec builder (kickoff.ts)"
description: "Census H19 — turns a kickoff.md path into a KickoffSpec: SHA-256 of content, umbrellaName from the parent directory, and two orthogonal first-line marker channels (bridge: auto/skip, bridge-profile hint)."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# bridge KickoffSpec builder (kickoff.ts)

**Status:** shipped-beta · **Ships to:** factory (vendor — in the dispatch closure) and clone · **Fires at:** the first step of every dispatch — `buildKickoffSpec(path)` is what decides whether a dispatch may proceed at all.

## What it is

`packages/runtime-bridge/src/kickoff.ts` — "KickoffSpec builder — constructs a KickoffSpec from a file path" (`src/kickoff.ts:2`). "Reads kickoff.md from disk, computes SHA-256 hash of content, and derives umbrellaName from the parent directory name" (`:4-5`) — the hash feeds the dedup log (H18), the umbrella name names the task.

## How it works

**Marker contract** (kickoff §7, "maintainer decision 2026-05-31 — opt-IN", `:7-15`):
- "`<!-- bridge: skip -->` first line → null on EVERY path; nothing overrides it" (`:8`).
- "Default (`requireAutoMarker: true`): only a `<!-- bridge: auto -->` first line yields a spec — the safe default for any future programmatic caller, because auto-dispatch is real, metered autonomous work" (`:9-12`).
- "`requireAutoMarker: false`: explicit manual paths (cli/dispatch.ts on demand) — the invocation itself is the operator's consent" (`:13-15`); dispatch.ts is "the ONE caller that opts out" (H2).

**Profile-hint marker** ("multi-model-profile-marker, 2026-07-21", `:17-25`): `<!-- bridge-profile: <name> -->` anywhere in the HEADER REGION ("everything before the first `##` heading") sets `KickoffSpec.profileHint`. "Deliberately NOT first-line-bound (auto/skip already own that line) and deliberately NOT a whole-file scan — a kickoff that merely documents this convention in its body prose (§2/§3 sections, past the first `##`) must not false-positive." Since 2026-09-02 "a HEADER-region mention is safe too: naming the token in a scope comment in order to say no marker is attached yields no hint".

**The regex discipline** (`:27-33`): the hint body is `[^\s>][^>]*?` — NOT `(.+?)`. "**No `>` in the body**, so the capture can never cross a `-->`. A lazy `(.+?)` requires at least one character and therefore cannot close on a `-->` that sits immediately after the token: it ran on to the NEXT `-->` and returned the prose".

**Fail mode / which channel fails:** a `bridge: skip` marker or a missing `bridge: auto` (under the default) yields a null spec — dispatch exits 0 on null (skipped, H2 behaviour 1); an unreadable kickoff path reaches dispatch as an exit-1 call defect (A6-2). A `bridge-profile` naming no known profile is dispatch.ts's exit-2 `spec_invalid` (H2).

## Satellites & companions

Builds the KickoffSpec type (H13); its hash is the dedup key (H18); the profileHint is what dispatch validates against runtime profiles (H2, and the degradations-doc probe class); vendored in the dispatch closure (H21).

## Anchors

- `packages/runtime-bridge/src/kickoff.ts:2` — «* KickoffSpec builder — constructs a KickoffSpec from a file path.»
- `packages/runtime-bridge/src/kickoff.ts:4` — «* Reads kickoff.md from disk, computes SHA-256 hash of content,»
- `packages/runtime-bridge/src/kickoff.ts:8` — «* - `<!-- bridge: skip -->` first line → null on EVERY path; nothing overrides it.»
- `packages/runtime-bridge/src/kickoff.ts:9` — «* - Default (`requireAutoMarker: true`): only a `<!-- bridge: auto -->` first»
- `packages/runtime-bridge/src/kickoff.ts:17` — «* - `<!-- bridge-profile: <name> -->` anywhere in the HEADER REGION (everything»
