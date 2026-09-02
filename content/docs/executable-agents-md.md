---
title: "Executable AGENTS.md, defined"
description: "What 'executable' means for an AGENTS.md: three mechanical properties, walked through with three real, live-fired claims from getff's own root AGENTS.md."
---

An AGENTS.md is "executable" when every enforceable claim in it is backed by a real, running check — not when it merely reads like a checklist. This page defines the term precisely and walks through three real claims from getff's own AGENTS.md that meet it.

## The three properties

1. **Every enforceable claim carries an enforcement line** — which gate enforces it, in which toolchain, with an explicit status: ✅ live-fired, or a named error code for "not expressible here" (an honest gap, not a silent one).
2. **The claims are live-fired, not asserted.** A test actually runs the negative example against the real rule and demands it fires; runs the positive example and demands silence. A claim nobody runs is just prose with better formatting.
3. **The document body is generated and byte-gated.** The committed region is re-composed from the source of truth on every push; a single byte of drift fails the gate.

## Walkthrough: three real claims

This is not a mock-up — it's the root [`AGENTS.md`](https://github.com/artyhoo/getff/blob/main/AGENTS.md) of the getff repo, today.

**Claim 1 — `AGENTS.md:76`.** "Read configuration through the injected config accessor, never `std::env::var` directly" carries the line:

```
Enforced: cargo-clippy-toml ✅ · npm-eslint-declarative — FF7001 (typed rules are not
expressible in the no-restricted-syntax declarative class; route to a type-aware backend)
```

The ✅ is backed by `packages/core/composition/demo/root-agents-demo.test.ts:97` — the live-fired cell of the cargo capability matrix. Where the npm backend *can't* enforce the same convention, the doc says so with an error code (FF7001) instead of pretending it's covered.

**Claim 2 — `AGENTS.md:82`.** The mirror convention for TypeScript ("never `process.env` directly") is enforced by the ESLint backend. `root-agents-demo.test.ts:73` feeds the doc's own "Never (fires)" example (`const url = process.env.DATABASE_URL;`) to the real generated `no-restricted-syntax` rule and asserts it fires; `:86` asserts the "Always (clean)" accessor form stays silent. Edit the example into something the rule no longer catches, and the suite goes red.

**Claim 3 — `AGENTS.md:26–51`.** The rule index (20 rules, each with a class and enforcement channel) sits inside a generated region. `scripts/render-rule-index.mjs --check` re-renders it from the actual rule files on disk and exits 1 on any drift — wired into the pre-push hook (`packages/core/hooks/pre-push.ts:792–799`). You physically cannot push an AGENTS.md whose rule table disagrees with the rules on disk.

On top of all three sits a ratchet: `root-agents-demo.test.ts:41` re-composes the whole demo region and requires the committed bytes to be equal. One `make self-audit` runs the lot.

## Honest framing

Today, the executable AGENTS.md you can open and audit above is **this repo's own**. Generating *your* executable AGENTS.md from *your* conventions is the next milestone getff is building toward — not a shipped feature yet. What ships today is the enforcement layer itself (ESLint/husky for npm, clippy/cargo-deny for Rust) that this AGENTS.md documents.

## Next

- [Quickstart — TypeScript](/docs/quickstart-ts/)
- [Quickstart — Rust](/docs/quickstart-rust/)
- [FAQ](/docs/faq/)
