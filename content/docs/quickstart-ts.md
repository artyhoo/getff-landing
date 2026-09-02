---
title: "Quickstart: TypeScript"
description: "From zero to a failing gate in 5 minutes — install getff into a TypeScript/npm project, break a convention on purpose, and watch it get caught before CI does."
---

You'll go from install to a failing gate in about 5 minutes: install the plugin, break a convention on purpose, and watch it get caught before CI even runs.

## 1. Install

Inside Claude Code, in your project's directory:

```
/plugin marketplace add artyhoo/getff
/plugin install getff@getff
```

The plugin never silently mutates your git or CI. The hard layer (hooks + CI gates) is one explicit opt-in command — nothing fires until you turn it on.

## 2. Break a convention on purpose

Pick one on-purpose violation and commit it:

- Add `as any` somewhere you know it shouldn't be.
- Read `process.env.SOMETHING` directly instead of going through your config accessor.
- Write a test that asserts `true === true` — a tautology that can't fail.

## 3. Watch the gate fire

Run your normal git flow (`git add`, `git commit`, or push, depending on which hook is wired in). The enforcement layer runs the same generated ESLint rules and husky hooks that guard this repo's own conventions — locally, before a human or CI ever sees the diff.

## What fires first on your repo

| You wrote | What fires | Channel |
|---|---|---|
| `as any` | ESLint `no-explicit-any`-class rule blocks the commit | pre-commit |
| `process.env.X` direct access | Generated `no-restricted-syntax` rule blocks it, naming the accessor to use instead | pre-commit / pre-push |
| A tautological test (asserts nothing meaningful) | Flagged for review — tautology detection is heuristic, not a hard gate | review-time flag, not a block |

Two of these three are hard, deterministic blocks. The third is honestly weaker: catching a test that provably tests nothing is a harder, fuzzier problem, so today it's a flag, not a gate. See [Honest limits](/docs/limits/) for the full list of what's shipped versus what's still roadmap.

## Next

- [Executable AGENTS.md, defined](/docs/executable-agents-md/) — what makes a claim in your AGENTS.md actually mean something.
- [FAQ](/docs/faq/) — comparisons to Packmind, agnix, CodeRabbit/Qodo, and whether you need Claude Code at all.
