---
title: aif-security-checklist
description: OWASP Top 10 (2021) security audit checklist with category subcommands, SECURITY.md ignore-list support, and a machine-readable aif-gate-result JSON block; clone-only in the getff framework repo.
---
<!-- provenance: framework @ b069c59328aa8e08671d3a19fd25efa618dfc1c5 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose.
     Source file exists on disk in the framework clone only (gitignored via .gitignore:120-121) —
     anchors are disk reads at authoring time, not git objects at the pin. -->

# aif-security-checklist

**Status:** shipped-beta (AIF suite, vendored into the clone) · **Ships to:** `clone` — not in any getff consumer tier arm (`setup.d/lib.sh:61-63` names only the core/env+/factory skills) · **Fires at:** Claude Code skill auto-activation ("is this secure", "security check", "vulnerability") or explicit `/aif-security-checklist [auth|injection|xss|csrf|secrets|api|infra|prompt-injection|race-condition|ignore <item>]` (argument-hint, `.claude/skills/aif-security-checklist/SKILL.md:4`) — `disable-model-invocation: false` (`.claude/skills/aif-security-checklist/SKILL.md:6`)

## What it is

Security-audit skill. Its self-description: "Security audit checklist based on OWASP Top 10 and best practices. Covers authentication, injection, XSS, CSRF, secrets management, and more." (`.claude/skills/aif-security-checklist/SKILL.md:3`). The body titles it "Security Checklist" (`.claude/skills/aif-security-checklist/SKILL.md:9`): "Comprehensive security checklist based on OWASP Top 10 (2021) and industry best practices." (`.claude/skills/aif-security-checklist/SKILL.md:11`).

## How it works

A `## Quick Reference` section (`.claude/skills/aif-security-checklist/SKILL.md:13`) enumerates the category subcommands, one per OWASP area — e.g. "- `/aif-security-checklist prompt-injection` — LLM prompt injection" (`.claude/skills/aif-security-checklist/SKILL.md:23`). Before any audit it honors an ignore list: "## Ignored Items (SECURITY.md)" (`.claude/skills/aif-security-checklist/SKILL.md:37`) — "Before running any audit, **always read** the resolved SECURITY.md path (default: `.ai-factory/SECURITY.md`). If it exists, it contains a list of security checks the team has decided to ignore." (`.claude/skills/aif-security-checklist/SKILL.md:39`). "## Quick Automated Audit" (`.claude/skills/aif-security-checklist/SKILL.md:127`) runs the automated script, and "## Machine-Readable Gate Result" (`.claude/skills/aif-security-checklist/SKILL.md:145`) appends one fenced `aif-gate-result` JSON block whose `fail` maps to "an unignored critical/high security issue or other explicitly production-blocking finding remains." (`.claude/skills/aif-security-checklist/SKILL.md:152`).

## Satellites & companions

<!-- what upstream/peer capability it USES, what it ADAPTS, what it ADDS over them -->

- **USES:** the project's SECURITY.md as its ignore-list contract (resolved path, default `.ai-factory/SECURITY.md`, `.claude/skills/aif-security-checklist/SKILL.md:39`).
- **ADAPTS:** the OWASP Top 10 (2021) checklist into category-scoped subcommands over the current repo.
- **ADDS:** the machine-readable `aif-gate-result` JSON block (`.claude/skills/aif-security-checklist/SKILL.md:145`) that turns a prose audit into a gate-verdict artifact.

## Anchors

<!-- the file:line list, each anchor with its line's content quoted at authoring time -->

- `.claude/skills/aif-security-checklist/SKILL.md:2` — `name: aif-security-checklist`
- `.claude/skills/aif-security-checklist/SKILL.md:3` — `description: Security audit checklist based on OWASP Top 10 and best practices. Covers authentication, injection, XSS, CSRF, secrets management, and more. Use when reviewing security, before deploy, asking "is this secure", "security check", "vulnerability".`
- `.claude/skills/aif-security-checklist/SKILL.md:4` — `argument-hint: "[auth|injection|xss|csrf|secrets|api|infra|prompt-injection|race-condition|ignore <item>]"`
- `.claude/skills/aif-security-checklist/SKILL.md:9` — `# Security Checklist`
- `.claude/skills/aif-security-checklist/SKILL.md:11` — `Comprehensive security checklist based on OWASP Top 10 (2021) and industry best practices.`
- `.claude/skills/aif-security-checklist/SKILL.md:13` — `## Quick Reference`
- `.claude/skills/aif-security-checklist/SKILL.md:23` — `` `- `/aif-security-checklist prompt-injection` — LLM prompt injection` ``
- `.claude/skills/aif-security-checklist/SKILL.md:37` — `## Ignored Items (SECURITY.md)`
- `.claude/skills/aif-security-checklist/SKILL.md:39` — `` `Before running any audit, **always read** the resolved SECURITY.md path (default: `.ai-factory/SECURITY.md`). If it exists, it contains a list of security checks the team has decided to ignore.` ``
- `.claude/skills/aif-security-checklist/SKILL.md:127` — `## Quick Automated Audit`
- `.claude/skills/aif-security-checklist/SKILL.md:145` — `## Machine-Readable Gate Result`
- `.claude/skills/aif-security-checklist/SKILL.md:152` — `` `- `fail`: an unignored critical/high security issue or other explicitly production-blocking finding remains.` ``
- `setup.d/lib.sh:61-63` — `GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"` · `GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"` · `GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"`

All anchors at framework pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (2026-09-12 disk read; ancestry of census pin `a1337cb301` verified); the SKILL.md itself is an on-disk gitignored file in the clone, not a git object at that pin.
