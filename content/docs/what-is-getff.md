---
title: "What is getff"
description: "getff is two layers around one idea: conventions your AI agents can't silently bypass, plus an AI-run layer that works inside them. What each layer is, and what each one honestly is today."
---

getff is two layers around one idea: **conventions your AI agents can't silently
bypass**. The tagline on our landing page says it in one line: «AI DX for your codebase:
conventions AI agents can't silently bypass — and an AI-run dev environment around
them.» Each half of that sentence is one layer, and each layer is at a different
maturity — labeled honestly below.

## Rules from live docs — beta

The first layer compiles your conventions into the toolchain gates your project already
runs: ESLint rules and husky hooks for npm projects, gate generation for Rust. A
convention that lives as a rule file fails loudly at edit time, pre-commit, pre-push or
CI — not politely in prose the agent parsed and ignored. Today this layer covers
TypeScript/JS, Rust, Python and Go stacks, with more toolchains on the roadmap. And the
flagship
honest limit: an *executable* AGENTS.md today means **getff's own repo** — generating
yours from your conventions is the next milestone, not a shipped feature.

The rules layer ships as a **beta**.

## The AI factory — experimental

The second layer is the AI-run half: a multi-model dispatch pipeline where a kickoff
goes in and a harvested branch comes out. Tasks are tiered by a fixed rubric — who
plans, who implements, who reviews — so cheap mechanical work runs on a cheaper model
and design-heavy work plans on a stronger one. The factory installs on top of the rules
layer: the factory profile ships the same rule-proving steps, so dispatched work happens
in a repo where those gates are installed and proven.

The factory layer is **experimental**: it expects a specific operator runtime and its
capability surface degrades in named ways when pieces are missing — see
[Degradations](/docs/degradations/).

## Start where you like

- Living with the beta layer day to day: [Daily cycle — rules](/docs/daily-cycle-rules/).
- What the experimental factory actually is: [Overview — multi-model pipeline](/docs/factory-overview/).
