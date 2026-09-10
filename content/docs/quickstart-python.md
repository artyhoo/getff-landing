---
title: "Quickstart — Python"
description: "Install getff into a Python project with no Node and no package.json: the bash lane delivers ast-grep rules plus a ruff fast-path, proves both fire, and hands you a CI gate."
---

You'll go from install to a red gate in one command: the Python lane is a pure-bash
delivery — no `package.json`, no npm, no Node on the consumer machine — that ships
ast-grep structural rules plus a ruff fast-path into your repo, then proves on a planted
violation that they fire. The consumer-matrix cell for exactly this shape (a scripted
fresh Python project, install under a Node-stripped PATH) runs end to end — install,
agent surface, generated-rule join, red/green/reject arms — as a merge-blocking job in
the framework's CI; everything in present tense below is what that cell demonstrates.

## 1. Install

From your Python project's root — it has a `pyproject.toml`, no `package.json`:

```
bash /path/to/getff/install.sh python     # explicit lane — always wins over auto-detect
# or: bash /path/to/getff/setup python
# auto-detect: pyproject.toml present + no package.json → the installer OFFERS this lane
# re-sync framework-owned artefacts after an upgrade: add --refresh
```

The install ends with a firing self-check: it plants a violating `.py` file **in an OS
temp dir only** (never your tracked tree), runs the delivered ast-grep rules and ruff
config against it, asserts **both fire RED**, then removes it. A tool that is absent
degrades loudly — it prints the exact manual command — never silently green.

## 2. What lands

```text
project/
├── sgconfig.yml                          ← ast-grep project config (resolves .getff/astgrep-rules)
├── ruff.toml                             ← ruff fast-path (TID251/TID253 import bans + DTZ005 naive datetime)
├── .getff/
│   ├── astgrep-rules/*.yml               ← getff structural rules (no-eval, no-os-system,
│   │                                       no-datetime[.datetime].now) — framework-owned
│   ├── ruff-bans.toml                    ← stable getff-bans config the CI gate points --config at
│   └── hooks/pre-push                    ← local git pre-push rung (skip: GETFF_SKIP_HOOKS=1)
├── .github/workflows/getff-python.yml    ← pinned CI gate (getff-namespaced — never your ci.yml)
└── .getff-python-install.log             ← delivery audit trail (every action + degrade path)
```

Collisions are augment-first, never a silent clobber: a pre-existing `sgconfig.yml`
gets the getff `ruleDirs` entry structurally merged; a pre-existing `ruff.toml` or
`pyproject.toml [tool.ruff]` is never overwritten — getff ships a reference copy plus
printed merge instructions and always writes the isolated `.getff/ruff-bans.toml`, so
the bans still enforce. A re-run is byte-idempotent.

## 3. Watch the gate fire

Locally, the delivered rules are plain files — run them the way the self-check does:

```
ast-grep scan app/          # structural rules from .getff/astgrep-rules
ruff check .                # your discovered config
ruff check --config .getff/ruff-bans.toml .   # the getff bans, regardless of your ruff config
```

On push and PR, `.github/workflows/getff-python.yml` runs `ast-grep scan` and
`ruff check` as failing gates. Tool installs are version-pinned
(`@ast-grep/cli@0.44.1`, `ruff==0.15.21`), and the workflow is namespaced
`getff-python.yml` so it never touches your own `ci.yml`; the trigger branch is
substituted to your repo's default branch at install time.

## What fires first on your repo

| You wrote | What fires | Channel |
|---|---|---|
| `eval(...)` | getff `no-eval` ast-grep rule goes RED | local `ast-grep scan` / CI gate |
| `os.system(...)` | getff `no-os-system` rule goes RED | local `ast-grep scan` / CI gate |
| `datetime.datetime.now()` | `no-datetime[.datetime].now` rule, plus ruff `DTZ005` | both channels |
| A banned import | ruff `TID251`/`TID253` fast-path ban | `ruff check` / CI gate |

The matrix cell proves the discriminating pair on this lane: a planted violation fires
non-zero, conforming code stays silent.

## 4. Research a rule for your stack

The delivered set is a curated starter set — the research loop is how it grows past
that. Author a practice record (provenance-cited, from your framework's real docs) and
run the bootstrap CLI with `--from-practice`: a valid record renders to
`.getff/rules-research/<entryId>.yml`, and the next install or `--refresh` joins it
into `.getff/astgrep-rules/`, where `sgconfig.yml` already points. The same matrix cell
exercises this end to end on a Python project: a rule generated from a cited practice
lands, joins, and fires RED on a planted call while staying silent on the conforming
shape — and a practice record citing a package that is not a direct dependency is
rejected to research-only, with no rule written. See
[Daily cycle — rules](/docs/daily-cycle-rules/) for where research sits in the loop.

One honest scope note: **generating** a researched rule needs Node (the framework
checkout you cloned has it) — the install itself, and everything above, stays
Node-free.

## Planned, not in this lane

- `mypy` and `import-linter` backends are out of scope for the Python lane today.
- The one-command public install path (`npx getff@latest init`) is not published yet —
  for now you clone the framework and run the installer from it.

## Next

- [What is getff](/docs/what-is-getff/) — the two layers this lane belongs to.
- [Quickstart: TypeScript](/docs/quickstart-ts/) — the npm lane, with husky hooks.
- [Join the beta](/docs/beta/) — where to send feedback.
