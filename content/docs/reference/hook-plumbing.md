---
title: "hook plumbing — lang packs, emit prelude, Windows runner"
description: "Census D19 — the plugin/hooks support plumbing the 17 registered hooks stand on: shared PostToolUse emit prelude (lib/hook-emit.sh), en/ru language packs with a parity checker, and the polyglot run-hook.cmd Windows runner."
---
<!-- provenance: framework @ b069c593 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# hook plumbing — lang packs, emit prelude, Windows runner

**Status:** shipped-beta · **Ships to:** plugin (`plugin/hooks/` ships the directory whole, so `lib/` and `run-hook.cmd` ride every plugin install); the lang packs also reach npm-lane consumers via the installer (`setup.d/10-skills.sh:245`, `install.sh:947`) · **Fires at:** never on its own — this is sourced/executed plumbing underneath the registered hooks (D2-D18).

## What it is

The support layer of `plugin/hooks/` that the enforcement hooks stand on, three pieces at this pin: `lib/hook-emit.sh` — the shared PostToolUse emit prelude (deduped from five diverging private copies, #1597 review ledger R-2); `lang/{en,ru}.sh` + `lang/check-parity.sh` — the payload-prose language packs and their deterministic drift guard; `run-hook.cmd` — the polyglot batch/bash wrapper that lets every hooks.json registration run unchanged on Windows.

## How it works

**`lib/hook-emit.sh` (sourced, not executed).** Six plugin twins source it today (check-doc-authority, check-worker-dispatch-channel, runtime-bridge-dispatch, validate-prompt, check-kickoff-traps, check-hook-marker) plus their `.claude/hooks/` twins. It exists because five PostToolUse gates each carried a private 13-line copy of `_is_zcode`/`_json_escape`/`_emit_skip` and the copies had already diverged — one variant "lost its `_is_zcode` branch and so emitted the CC envelope to ZCode, and every sed-based escaper produced INVALID JSON for a message containing a tab or a CR" (`plugin/hooks/lib/hook-emit.sh:9-13`). It contributes four helpers: `_is_zcode` (env-keyed detection, `:45`), `_json_escape` (no-jq escaper — newline/CR/TAB collapse to space, remaining C0 bytes dropped, `:53`), `_emit_skip`/`_emit_skip_once` (skip notices on the JSON `additionalContext` channel the model actually receives on exit-0, `:65`/`:85` — "On an exit-0 PostToolUse the model receives ONLY JSON hookSpecificOutput — plain stdout/stderr reaches nobody", `:61-63`), and `_emit_ctx` (ZCode violation context, `:96`). It also repairs the Homebrew-stripped PATH CC gives launched hooks (`:31-40`).

**`lang/{en,ru}.sh` + `check-parity.sh`.** Each `aif_msg_*` function in a pack emits one reminder body; `en.sh` is the canonical default "used when AIF_HOOK_LANG is unset or names a missing pack" (`plugin/hooks/lang/en.sh:6`); the hooks resolve `_lang_file="${_lang_dir}/${AIF_HOOK_LANG:-en}.sh"` (`plugin/hooks/end-of-turn-reminder:29`). `check-parity.sh` asserts both packs expose the same key set — functions plus `AIF_RECAP_MARKER`/`AIF_STORY_MARKER`/`AIF_EOT_*` vars — "Exit 0 = parity, 1 = drift" (`plugin/hooks/lang/check-parity.sh:13`), wired into CI through `packages/core/hooks/lang-parity.test.ts`, which "runs this script over the real packs and carries a seeded-drift paired negative" (`:14-15`).

**`run-hook.cmd` (the only executed file).** Every hooks.json registration invokes `run-hook.cmd <script-name>`, never the hook directly. On Unix the file is plain bash (`exec bash "${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"`, `plugin/hooks/run-hook.cmd:47`); on Windows the batch half probes Git-for-Windows bash locations then PATH (`:22-36`), and if no bash exists it "exit[s] silently rather than error … (plugin still works, just without SessionStart context injection)" (`:38-39`). Extensionless hook names are deliberate: they defeat Claude Code's Windows auto-detection that "prepends `bash` to any command containing `.sh`" (`:7-9`). Adopted from obra/superpowers, MIT (`:12`).

**Fail mode (per piece):** `hook-emit.sh` has no fail mode of its own — it inherits the sourcing hook's PostToolUse channel by construction (`:4-7`); a missing jq degrades `_emit_ctx` to plain text and `_json_escape` never needs jq. `check-parity.sh` fails the CI lane (exit 1) with a per-side `comm` diff of the drifted keys; its own probes are `|| true`-guarded so an absent key class reports instead of aborting the reporter (`:20-25`). `run-hook.cmd` fails soft on Windows-without-bash (silent exit 0); on Unix a bad script name fails the individual hook invocation.

## Satellites & companions

Serves every registered hook (D2-D18); the lang packs are consumed by end-of-turn-reminder (D18) and ask-question-reminder (D6) — `@dual-pair: hook-lang-i18n`; `_zcode-emit` (D25) is the parallel universal wrapper for the plugin twin family, while `hook-emit.sh` is the PostToolUse-specific prelude; `.claude/hooks/lib/` is the framework-repo sibling copy.

## Anchors

- `plugin/hooks/lib/hook-emit.sh:2` — «# Shared PostToolUse emit prelude for the framework's edit-time gates.»
- `plugin/hooks/lib/hook-emit.sh:11` — «# started to diverge — runtime-bridge-dispatch's variant lost its _is_zcode branch and so»
- `plugin/hooks/lib/hook-emit.sh:45` — «_is_zcode() { [ -n "${ZCODE_PROJECT_DIR:-}" ]; }»
- `plugin/hooks/lib/hook-emit.sh:61` — «# On an exit-0 PostToolUse the model receives ONLY JSON hookSpecificOutput — plain»
- `plugin/hooks/lib/hook-emit.sh:85` — «_emit_skip_once() {»
- `plugin/hooks/lang/en.sh:6` — «# Canonical default — used when AIF_HOOK_LANG is unset or names a missing pack.»
- `plugin/hooks/lang/check-parity.sh:13` — «# Exit 0 = parity, 1 = drift. Wired into CI via packages/core/hooks/lang-parity.test.ts, which»
- `plugin/hooks/run-hook.cmd:3` — «REM Cross-platform polyglot wrapper for hook scripts.»
- `plugin/hooks/run-hook.cmd:47` — «exec bash "${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"»
- `plugin/hooks/hooks.json:8` — «            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" inject-project-digest"»
