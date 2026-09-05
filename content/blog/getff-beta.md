---
title: "getff is in beta: conventions your AI agents can't silently bypass"
description: "The getff beta opens in two labeled layers — rules compiled into toolchain gates, and an experimental AI-run factory around them. What works today, what is experimental, and what is deliberately still a milestone."
pubDate: 2026-09-05
draft: true
---

Your repository already has conventions. Some are written down in an AGENTS.md or a
CONTRIBUTING file; most live in reviewers' heads. The written ones have a known
problem: an AI agent reads them as text. It parses your rules the same way it parses
everything else — as context, not as constraints. A convention that is only prose
fails the way prose fails: politely, and after the fact.

getff starts from a different premise: **a convention that matters should be a gate,
not a paragraph**. Today the beta opens, in two layers with two different labels —
because the honest version of this announcement has both.

## Rules from live docs — beta

The first layer compiles conventions into the toolchain gates your project already
runs. For npm projects that means ESLint rules and husky hooks; for Rust, gate
generation; for Python, a pure-bash lane that ships ast-grep rules and a ruff
fast-path with no Node on your machine. Install, and a planted violation goes red
locally before CI wakes up — the quickstarts each end with exactly that moment, on
purpose, because a gate nobody has seen fire is an unproven claim.

This layer is the **beta**: it works today on TypeScript/JS, Rust and Python stacks.
Two honest limits travel with it. Gate generation for other toolchains is on the
roadmap, not in the box — for cargo, the demo today is clippy, with cargo-deny on the
roadmap. And the flagship idea — an AGENTS.md whose every claim is executable — is
**still a milestone for your repo**: the executable AGENTS.md you can inspect today is
[our own](https://github.com/artyhoo/getff/blob/main/AGENTS.md), where every claim
carries a live-fired enforcement status and `make self-audit` re-checks them. Your
repo's turn is what we are building toward, and we would rather say that than imply it
shipped.

## The AI factory — experimental

The second layer is the AI-run half of the tagline: a dispatch pipeline where work is
written up as a kickoff, routed by a fixed tier rubric — who plans, who implements,
who reviews — executed on branches inside your compiled gates, and brought back with a
harvest command. Cheap mechanical work runs whole-pipeline on an executor-tier model;
design-heavy work plans on a stronger one. This layer is **experimental**: it expects a
specific operator runtime, and where a capability is absent it degrades in named ways —
the degradation matrix is public, not folklore.

## What a first hour looks like

1. Pick your lane: [TypeScript](/docs/quickstart-ts/), [Python](/docs/quickstart-python/),
   or [Rust](/docs/quickstart-rust/). Install is one command from a clone.
2. Break a convention on purpose. Watch the gate name it before CI does.
3. Read [What is getff](/docs/what-is-getff/) for the two-layer map, or
   [Honest limits](/docs/limits/) for exactly where the shipped stops.

There is no signup and no waitlist. What there is not, yet: the one-command install
path — `npx getff@latest init` is not published, and we will announce it here when it
is.

## Tell us what breaks

Feedback goes through issue templates on
[artyhoo/getff](https://github.com/artyhoo/getff/issues/new/choose) — bug report for
breakage, beta feedback for everything else. If a page on the site claims something
your install does not do, that is the report we want most. The docs are part of the
product, and a claim the product can't back is the failure this whole project exists
to prevent.
