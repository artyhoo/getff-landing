---
title: "AGENTS.md is advisory. Here's what it takes to make it executable"
description: "Three mechanical properties that make an AGENTS.md executable instead of advisory — a walkthrough of three real, live-fired claims from getff's own AGENTS.md."
pubDate: 2026-07-10
draft: true
---

## The pain: your agent file is a polite suggestion

AGENTS.md is a great convention: one predictable place where a coding agent learns your build commands, style, and boundaries. Over 60k open-source projects ship one.

But look at what the format actually promises. From the official FAQ at [agents.md](https://agents.md/): "AGENTS.md is just standard Markdown. Use any headings you like; the agent simply parses the text you provide." And: "Treat AGENTS.md as living documentation."

*Parses the text.* Nothing checks whether the text is true, and nothing fails when the agent ignores it. Every claim in your AGENTS.md — "we never read `process.env` directly", "these rules auto-load", "run make self-audit" — is prose. Prose drifts. Agents skip prose under context pressure, and nobody notices, because a document that lies looks exactly like a document that doesn't.

Docs lie; tests don't. So what does it take to make an AGENTS.md that *can't* lie?

## What "executable" means

Three properties, each mechanical:

1. **Every enforceable claim carries an enforcement line** — which gate enforces it, in which toolchain, with an explicit status (✅ live-fired, or a named error code for "not expressible here").
2. **The claims are live-fired, not asserted.** A test actually runs the negative example against the real rule and demands it fires; runs the positive example and demands silence.
3. **The document body is generated and byte-gated.** The committed region is re-composed from the source of truth on every push; a byte of drift fails the gate.

## Walkthrough: three real claims from our own AGENTS.md

This is not a mock-up — it's the root [`AGENTS.md`](https://github.com/artyhoo/getff/blob/main/AGENTS.md) of the getff repo.

**Claim 1 — `AGENTS.md:76`:** "Read configuration through the injected config accessor, never `std::env::var` directly" carries the line:

```
> Enforced: cargo-clippy-toml ✅ · npm-eslint-declarative — FF7001 (typed rules are not
> expressible in the no-restricted-syntax declarative class; route to a type-aware backend)
```

The ✅ isn't decoration. `packages/core/composition/demo/root-agents-demo.test.ts:97` backs it with the live-fired cell of the cargo capability matrix. And note the second half: where the npm backend *can't* enforce it, the doc says so with an error code (FF7001) instead of pretending.

**Claim 2 — `AGENTS.md:82`:** the mirror convention for TypeScript ("never `process.env` directly") is enforced by the ESLint backend. The test at `root-agents-demo.test.ts:73` feeds the "Never (fires)" example (`const url = process.env.DATABASE_URL;`) to the real generated `no-restricted-syntax` rule and asserts it fires; `:86` asserts the "Always (clean)" accessor form stays silent. If someone edits the example into something the rule no longer catches, the suite goes red.

**Claim 3 — `AGENTS.md:26–51`:** the rule index (20 rules, each with class and enforcement channel) sits inside a generated region. `scripts/render-rule-index.mjs --check` re-renders it from the actual rule files and exits 1 on any drift — wired into the pre-push hook (`packages/core/hooks/pre-push.ts:792–799`). You physically can't push an AGENTS.md whose rule table disagrees with the rules on disk.

On top of all three sits a ratchet: `root-agents-demo.test.ts:41` re-composes the whole demo region and requires the committed bytes to be equal. One `make self-audit` (`Makefile:3`) runs the lot.

## What it looks like when the doc drifts

Comment out the rule a claim references, run `make self-audit`, and the gate fails naming the specific claim — not "docs may be stale", but "this enforcement line no longer matches reality".

The point isn't the tooling; it's the inversion. In a normal repo, the doc describes the checks and rots independently of them. Here the doc is *downstream* of the checks: enforcement status is derived from live outcomes, so the earliest reachable channel — pre-push, not a human reader six weeks later — catches the lie.

## The honest caveat

This works today on our own repository — the executable AGENTS.md you can open and audit is ours. Generating *your* executable AGENTS.md from *your* conventions is the next milestone, not a shipped feature.

## If this itch is yours

- Repo: [github.com/artyhoo/getff](https://github.com/artyhoo/getff) — open AGENTS.md, follow any enforcement line to its test.
- Newsletter: [getff.ai](https://getff.ai) — one email when the generator milestone ships.
- I also set this discipline up for teams — if your agents keep breaking conventions you thought were documented, [write me](/consulting/).
