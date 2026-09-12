---
title: "getff.pre-commit-config.yaml.fragment — idempotent pre-commit append (E34)"
description: "The python lane's pre-commit-framework integration: a local-hook fragment that registers the getff pre-push rung as a pre-push-stage hook, appended to an existing .pre-commit-config.yaml idempotently via a marker grep — never appended twice."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# getff.pre-commit-config.yaml.fragment — idempotent pre-commit append (E34)

**Status:** shipped-beta · **Ships to:** python-lane, delivered only when the consumer already has a `.pre-commit-config.yaml` (integration Case 2) · **Fires at:** install time (the append); afterwards at every `git push`, when pre-commit's pre-push stage invokes the getff rung

## What it is

A 14-line YAML fragment defining one pre-commit hook — `id: getff-python-pre-push`, `entry: .getff/hooks/pre-push`, `language: system`, `stages: [pre-push]`, `pass_filenames: false`. It is not a delivered file in the consumer tree; it is the payload the python stage APPENDS into an existing `.pre-commit-config.yaml` so consumers who already run the pre-commit framework get the getff rung through it.

## How it works

- The fragment's entry points at the delivered local rung (E33's `.getff/hooks/pre-push`), so pre-commit executes the same ast-grep + ruff checks the direct-git-hook path runs — one hook body, two delivery integrations.
- The append is idempotent by marker grep: the stage looks for a fragment marker line in the consumer's config and re-appends only when absent, so `--refresh` cannot duplicate the entry.
- The stage deliberately does NOT set `core.hooksPath` in this case — pre-commit manages the hooks path itself; fighting it would break the consumer's other hooks.
- Opt-out is documented inside the fragment itself: remove the entry, or run with `SKIP=getff-python-pre-push`; after appending, `pre-commit install --hook-type pre-push` registers the stage with git.
- Lane honesty: this integration only exists when the consumer's `.pre-commit-config.yaml` is already on disk (a plain-file check — it does not require git). A fresh python project with no pre-commit config gets the direct git-hook rung instead; the fragment is never delivered as a standalone file either way.

## Satellites & companions

The append half of the python lane's hook delivery (A6): Case 2 in the stage's collision matrix, next to the direct `core.hooksPath` rung (E33). Its `entry` target is the rung body delivered from `packages/core/templates/python/hooks/pre-push.sh`. The CI gate (E35) is the same checks as a backstop for deliberate local bypass.

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/python/hooks/getff.pre-commit-config.yaml.fragment:1-2` — «# getff pre-push entry — append into your .pre-commit-config.yaml to run the getff python» «# pre-push rung via the pre-commit framework's pre-push stage.»
- `packages/core/templates/python/hooks/getff.pre-commit-config.yaml.fragment:9` — «    - id: getff-python-pre-push»
- `packages/core/templates/python/hooks/getff.pre-commit-config.yaml.fragment:13` — «      stages: [pre-push]»
- `setup.d/45-python.sh:885` — «# The .pre-commit-config.yaml append is idempotent via a marker grep; --refresh re-appends only»
- `setup.d/45-python.sh:988` — «# Append the getff entry as a local-hook fragment into their .pre-commit-config.yaml (idempotent —»
- `setup.d/45-python.sh:995` — «  local frag_src="$tpl/hooks/getff.pre-commit-config.yaml.fragment"»
