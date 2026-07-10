---
title: "Quickstart: Rust"
description: "Honest frame first: getff is a TypeScript tool that generates clippy and cargo-deny gates for your Rust project — same install-break-watch cycle as the TS quickstart."
---

Honest frame first: getff itself is a TypeScript/Node tool. For a Rust project, it doesn't run a Rust binary of its own — it generates `clippy` lint config and `cargo-deny` policy into your repo, then lets your normal cargo toolchain enforce them. Same cycle as the TypeScript quickstart, different native backend.

## 1. Install

Inside Claude Code, in your project's directory:

```
/plugin marketplace add artyhoo/getff
/plugin install getff@getff
```

The plugin never silently mutates your git or CI. The hard layer (hooks + CI gates) is one explicit opt-in command.

## 2. Break a convention on purpose

Pick one:

- Call `std::env::var(...)` directly instead of going through your injected config accessor.
- Add a dependency your `cargo-deny` policy is configured to ban.

## 3. Watch the gate fire

`clippy` catches the first case as a lint violation wired into your local toolchain; `cargo-deny check` catches the second as a policy violation. Both run the same way they'd run in CI — locally first, CI last.

## What fires first on your repo

| You wrote | What fires | Channel |
|---|---|---|
| `std::env::var(...)` direct access | `clippy.toml`-configured lint blocks it | pre-commit / `cargo clippy` |
| A banned dependency | `cargo-deny check` fails the build | pre-push / CI |

## Honest limits, Rust edition

- getff generates gate *configuration* for `clippy`/`cargo-deny`; it does not ship a custom Rust analyzer.
- Some conventions that are trivially expressible as an ESLint `no-restricted-syntax` rule on the TypeScript side don't have a 1:1 clippy equivalent — those get a named error code in the generated AGENTS.md instead of a silent gap. See the [walkthrough](/docs/executable-agents-md/) for a live example (`AGENTS.md:76`).

## Next

- [Executable AGENTS.md, defined](/docs/executable-agents-md/)
- [FAQ](/docs/faq/)
- [Honest limits](/docs/limits/)
