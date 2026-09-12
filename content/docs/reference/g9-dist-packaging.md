---
title: "build-getff-dist.sh — dist packaging (G9)"
description: "The release assembler behind npx getff: copies the payload into packages/getff laid out exactly like the repo root, tracks every file in a committed MANIFEST.sha256, and gates publication through --check drift detection on npm prepack."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# build-getff-dist.sh — dist packaging (G9)

**Status:** shipped-beta (release engineering; runs at pack time, not install time) · **Ships to:** npm release channel — produces the tarball layout the published `getff` package (G1) ships · **Fires at:** `npm publish` (via the package's `prepack`) or when run by hand; `--check` also gates CI/release drift

## What it is

A 123-line assembler script that builds `packages/getff` — the distribution package — from the repository root. Its core insight is the "WHY A COPY, NOT A MOVE" header: the installer reads everything PKG_ROOT-relative, and a tarball laid out exactly like the repo root makes PKG_ROOT land where the script already looks, so not one of those reads changes. The payload copy is gitignored; what is COMMITTED is `MANIFEST.sha256`, one `<sha256>  <path>` line per assembled file (1078 lines at the working pin).

## How it works

- The file list's source of truth is `git ls-files` (tracked files only) — deliberately NOT a directory walk, which would ship whatever lies in the working tree: node_modules, a scratch file, a secret. The script's header names this hazard explicitly.
- The payload roots are a fixed allowlist mirroring package.json's `files` array (install.sh, setup, setup.d/, agents/, skills/, templates/, .claude/, packages/, scripts/ subset, .prettierrc.json, bin/); `scripts/` carries only the SHIPPED SUBSET the installer actually reads — factory-only scripts and the assembler itself stay out.
- `--check` is the drift gate: it re-assembles into a temp dir, hashes, and diffs the fresh manifest against the committed one — a payload file edited without re-running the assembler is DRIFT, exit 1, with the differing paths listed. A missing manifest is drift too.
- Publication is gate-ordered: the getff package's `prepack` runs `--check` FIRST and the assemble second, so an npm publish cannot proceed over a stale manifest.
- The three-surface consistency rule is stated in the script: adding a payload root requires the same root in package.json `files`, in packages/getff/.gitignore, and in this script's list — `files` cannot reach above a package's own directory, which is why the copy exists at all.

## Satellites & companions

Produces the payload that `bin/getff` (G1) hands `init` args into, and the install.sh (A2) + setup (A1) pair consumers actually run. The committed manifest is what the host-side release verification hashes against; the six-file `scripts/` subset includes the worktree cluster (A19) the installer reads from PKG_ROOT.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `scripts/build-getff-dist.sh:2` — «# build-getff-dist.sh — assemble the `getff` distribution package (packages/getff) from the repo root.»
- `scripts/build-getff-dist.sh:9-11` — «# its contents out exactly like the repository root makes PKG_ROOT land where the script already» «# looks, and not one of those reads changes. `files` cannot reach above a package's own directory,» «# so the payload is COPIED into packages/getff/ at pack time (npm `prepack`, and this script).»
- `scripts/build-getff-dist.sh:14-16` — «# WHAT IS COMMITTED. Not the payload (gitignored in packages/getff/.gitignore) — MANIFEST.sha256,» «# one `<sha256>  <path>` line per assembled file. `--check` re-assembles into a temp dir and diffs» «# the manifests: a shipped file edited without re-running this script is DRIFT, exit 1, the paths»
- `scripts/build-getff-dist.sh:19-21` — «# SOURCE OF TRUTH FOR THE FILE LIST: `git ls-files` (tracked files only). A directory walk would» «# ship whatever is lying in the working tree — node_modules, a scratch file, a secret»
- `scripts/build-getff-dist.sh:97` — «[ -f "$MANIFEST" ] || fail "DRIFT: $MANIFEST missing — run: scripts/build-getff-dist.sh"»
- `packages/getff/package.json:39` — «"prepack": "bash ../../scripts/build-getff-dist.sh --check && bash ../../scripts/build-getff-dist.sh"»
- `packages/getff/MANIFEST.sha256:1` — «fb86ebab759216770b3d618fa0c67e0d7b3e3bd0430bcbbaf60561c7e63fa7e9  .claude/hooks/adopt-orchestrator-prompts.sh» (1078 manifest lines at this pin)
