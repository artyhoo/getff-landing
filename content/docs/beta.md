---
title: "Join the beta"
description: "What the getff beta covers, what each layer's maturity label means, how to enter today, and where to send feedback so it reaches the people who can act on it."
---

getff is in beta, and this page is the honest label sheet for what that means. The
beta covers both layers of the product at different maturities: the rules layer is the
**beta**, the factory layer is **experimental**. Neither label is decoration — each one
names what you can hold us to.

## What each label means

**Beta — Rules from live docs.** Conventions compiled into native toolchain gates:
ESLint rules and husky hooks for npm projects, gate generation for Rust, and the
Node-free bash lane for Python. The gates fire today, on your repo, before CI does.
What is *not* here yet: generating an executable AGENTS.md from *your* conventions —
today the executable AGENTS.md you can inspect is [getff's own repo](https://github.com/artyhoo/getff/blob/main/AGENTS.md),
and making yours is the next milestone. Other toolchains are on the roadmap, not in
the box.

**Experimental — The AI factory.** The multi-model dispatch pipeline: kickoffs in,
tiered routing, harvested branches out. It runs today on a specific operator runtime,
and where a capability is missing it degrades in named ways — the matrix is public on
the [Degradations](/docs/degradations/) page. Expect the surface to change as the
label comes off.

## How to enter today

There is no signup. The entry path is the [quickstart](/docs/quickstart-ts/): clone the
framework repo and run the installer against your project — TypeScript/npm, Rust, or
the Node-free Python lane. The one-command install path (`npx getff@latest init`) is
**not published yet** — the install command will be announced with the beta, and this
page is where it will appear first.

From install, the shortest path to the point of the product is
[First Steps — core](/docs/first-steps-core/): it ends with a rule that has gone red on
input planted on purpose, in your repo.

## How to give feedback

Feedback goes to [artyhoo/getff on GitHub](https://github.com/artyhoo/getff/issues/new/choose)
through issue templates: **bug report** for something that broke, and **beta feedback**
for everything else — what you tried, what surprised you, what the docs failed to tell
you. Doc gaps are bugs as far as we are concerned; if a page on this site claims
something your install does not do, that report is the highest-value one you can file.

## What you will not find here

No dates. No tester-count goals. No entry command that does not exist yet. The labels
above are the current, checkable state — and when one of them goes stale, the docs are
supposed to be the first thing that says so.
