---
title: aif-grounded
description: AIF-suite reliability gate that forces evidence-based answers, explicit uncertainty, and "insufficient information" instead of guesses, with a strict output format and confidence gate; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-11 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-grounded

**Status:** shipped-beta (AIF suite) · **Ships to:** `clone` — not in any getff consumer tier arm · **Fires at:** explicit invocation only — `disable-model-invocation: true` (`.claude/skills/aif-grounded/SKILL.md:6`)

## What it is

An answer-reliability gate. Its description: "Reliability gate for answers. Forces evidence-based reasoning, explicit uncertainty, and “insufficient information” instead of guesses. Use when user says “be 100% sure”, “no hallucinations”, “only if verified”, “grounded answer”, or when stakes are high." (`.claude/skills/aif-grounded/SKILL.md:3`). It is small by suite standards — 117 lines total.

## How it works

A five-step workflow: "### Step 1: Classify the request" (`.claude/skills/aif-grounded/SKILL.md:49`), "### Step 2: Define evidence and unknowns" (`.claude/skills/aif-grounded/SKILL.md:56`), "### Step 3: Mandatory verification for changeable facts" (`.claude/skills/aif-grounded/SKILL.md:65`), "### Step 4: Confidence gate" (`.claude/skills/aif-grounded/SKILL.md:71`), and "### Step 5: Output format (strict)" (`.claude/skills/aif-grounded/SKILL.md:77`), closed by an implementation guardrail (`.claude/skills/aif-grounded/SKILL.md:112`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** skill-context loading at Step 0 (`.claude/skills/aif-grounded/SKILL.md:27`).
- **ADAPTS:** —
- **ADDS:** the strict output-format + confidence-gate contract for high-stakes answers.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-grounded/SKILL.md:2` — `name: aif-grounded`
- `.claude/skills/aif-grounded/SKILL.md:3` — `description: Reliability gate for answers. Forces evidence-based reasoning, explicit uncertainty, and “insufficient information” instead of guesses. Use when user says “be 100% sure”, “no hallucinations”, “only if verified”, “grounded answer”, or when stakes are high.`
- `.claude/skills/aif-grounded/SKILL.md:6` — `disable-model-invocation: true`
- `.claude/skills/aif-grounded/SKILL.md:71` — `### Step 4: Confidence gate`
- `.claude/skills/aif-grounded/SKILL.md:77` — `### Step 5: Output format (strict)`
- `.gitignore:121` — `/.claude/skills/aif-*/`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-11); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
