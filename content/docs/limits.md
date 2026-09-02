---
title: "Honest limits"
description: "What getff does not do yet: no generator for your own AGENTS.md, two supported stacks, and a source-available (not OSI open source) license. Said first, on purpose."
---

Three honest limits, stated plainly, with the detail the landing page doesn't have room for.

## 1. The executable AGENTS.md you can audit is this repo's own

Open [getff's AGENTS.md](https://github.com/artyhoo/getff/blob/main/AGENTS.md) and every enforceable claim in it resolves to a real test — see the [walkthrough](/docs/executable-agents-md/). What getff does **not** do yet is generate an equivalent executable AGENTS.md *from your project's own conventions*. That generator is the next milestone, not a shipped feature. Today, installing getff gets you the enforcement layer (the gates), not a generated doc describing your specific rules.

## 2. Two stacks today, others on the roadmap

- **TypeScript/JavaScript** — ESLint rules + husky hooks, generated from your conventions.
- **Rust** — clippy lint configuration + cargo-deny policy, generated the same way.

Other toolchains (Python, Go, Java, …) are not in the box. If your stack isn't TS/JS or Rust, getff has nothing to install for you today.

## 3. Source-available, not OSI open source

getff ships under **FSL-1.1-ALv2** (the Functional Source License). That means:

- Free for internal use, non-commercial education, and research.
- Not an OSI-approved open source license — there are field-of-use restrictions the OSI definition doesn't permit.
- Each release automatically converts to **Apache-2.0** two years after it ships.

We lead with this, not bury it, because "source-available" and "open source" mean different things and conflating them is the kind of drift this whole project exists to catch.

## Next

- [FAQ](/docs/faq/) — comparisons to other tools in this space.
- [Executable AGENTS.md, defined](/docs/executable-agents-md/)
