---
title: "Quickstart: Rust"
description: "Honest frame first: getff is a TypeScript tool that generates clippy gates for your Rust project today — cargo-deny ships as a starter policy with no active bans yet — same install-break-watch cycle as the TS quickstart."
---

Honest frame first: getff itself is a TypeScript/Node tool. For a Rust project, it doesn't run a Rust binary of its own — it generates `clippy` lint config into your repo (plus a `cargo-deny` starter policy file with no active bans — cargo-deny enforcement is on the roadmap), then lets your normal cargo toolchain enforce them. Same cycle as the TypeScript quickstart, different native backend.

## 1. Install

The Rust lane runs from the framework checkout, not the Claude Code plugin (the plugin's enforcement bridge today wires the TypeScript stacks — `ts-server` / `react-next` — only):

```
git clone https://github.com/artyhoo/getff
bash /path/to/getff/install.sh cargo     # explicit lane — always wins over auto-detect
```

The install never silently mutates your git or CI: it delivers `clippy.toml`, a `deny.toml` starter policy, and a getff-namespaced CI workflow (`.github/workflows/getff-cargo.yml`) that runs the clippy bans as a failing gate.

## 2. Break a convention on purpose

Pick one:

- Call `std::env::var(...)` directly instead of going through your injected config accessor — the shipped `clippy.toml` bans exactly that method.
- Add one of your own conventions to `clippy.toml`'s `disallowed-methods`, then break it.

## 3. Watch the gate fire

`clippy` catches both cases as lint violations wired into your local toolchain — run `cargo clippy` locally, and the generated GitHub Actions workflow runs the same `-D clippy::disallowed_*` bans as a failing CI gate. Locally first, CI last.

## What fires first on your repo

| You wrote | What fires | Channel |
|---|---|---|
| `std::env::var(...)` direct access | `clippy.toml`-configured lint blocks it | `cargo clippy` / CI (`getff-cargo.yml`) |

The Rust lane ships no git hooks — no pre-commit or pre-push delivery — so the channels are your local `cargo clippy` and the CI gate. Local hook rungs exist on the npm and Python lanes today.

## Honest limits, Rust edition

- getff generates gate *configuration* for `clippy` (and a `cargo-deny` starter policy you extend yourself — no bans are active out of the box, and no shipped workflow runs `cargo deny`); it does not ship a custom Rust analyzer.
- Some conventions that are trivially expressible as an ESLint `no-restricted-syntax` rule on the TypeScript side don't have a 1:1 clippy equivalent — those get a named error code in the generated AGENTS.md instead of a silent gap. See the [walkthrough](/docs/executable-agents-md/) for a live example (`AGENTS.md:83`).

## Next

- [Executable AGENTS.md, defined](/docs/executable-agents-md/)
- [FAQ](/docs/faq/)
- [Honest limits](/docs/limits/)
