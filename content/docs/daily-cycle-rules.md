---
title: "Daily cycle — rules"
description: "How you live with the rules layer day to day: five beats from before you edit to the PR, each with the exact command the shipped guide spells."
---

Once the gates are installed, the rules layer is not a thing you visit — it is a loop
you live in. The shipped AI Usage Guide spells the same loop for AI agents; this page is
the human-voiced version, with every command spelled exactly as the guide spells it.
Nothing here needs anything beyond a core install — with one lane caveat, stated once:
the `scripts/` commands below ship on **npm-lane installs only** (python/go/cargo
installs ship no `scripts/` by construction, per the guide's own qualifier).

## The five beats

### 1. Before you edit

Read `AGENTS.md`, then the `.ai-factory/` doc it points at for your task: `RULES.md`
for what is enforced, `ARCHITECTURE.md` for layer direction. Thirty seconds of reading
is cheaper than a rewrite the gates force later.

### 2. While you edit

The ESLint custom rules are the earliest channel: they fire in your editor and in
`npm run lint`. A rule firing is the design working, not an obstacle to route around —
it means the convention you wrote down is holding against the change you are making.

### 3. Before you commit

`bash scripts/audit-ai-docs.sh` — drift + code-vs-docs probes. When you touched layout
or added a package, also `bash scripts/check-rule-globs.sh` and
`bash scripts/check-lintstaged-resolves.sh`. The pre-commit hook runs lint-staged on
its own; these are the checks you run so the hook never surprises you.

### 4. On push

`.husky/pre-push` fires automatically: rule-glob liveness, lint-staged resolution
and generated-rule-material checks — the TS-core hook routes by what your machine
can run, with a bash critical-only fallback when Node ≥20 is absent. It is not
optional and not to be bypassed with `--no-verify` — a bypassed gate is just a
lie moved downstream. Typecheck, tests and the dependency-cruiser architecture
check run one channel later, as jobs in the delivered `ci.yml`.

### 5. On the PR

CI (`ci-success`) is the last-resort gate — the authority that does not depend on
anyone's local tooling, which is exactly why it must never be the FIRST place a problem
is caught. A CI that died without running a step is not a red gate: when a GitHub Free
account exhausts its private-repo Actions-minutes pool, every first-party check fails
in ~2 s with zero steps. `bash scripts/ci-available-probe.sh` (shipped on npm-lane
installs only) classifies that state as `CI UNAVAILABLE` instead of misreporting RED.
`bash scripts/pre-merge-local.sh` runs every detected lane's gates on the merge result
locally before you push — opt-in, and weaker evidence than CI: its verdict says so and
lists what it does NOT cover.

## When you add a convention

Add its executable check in the same change. A convention with no check is not a rule;
`/rule-research` and `/rule-tests` exist to make that cheap.
The framework holds itself to the same standard via its own channel-selection rule,
`.claude/rules/rule-enforcement-channel-selection.md` (Class A, with a companion principle
test at `packages/core/principles/31-rule-channel-declaration.test.ts`).

`/rule-tests` is the repair half of that pair: for an EXISTING generated rule whose firing
test material is missing, broken, or needs a bypass variant, it edits the test material only —
never the rule artifact — fires the rule under repair in single-rule isolation so the verdict
is unambiguous, and quotes the tool's own output verbatim
(`.claude/skills/rule-tests/SKILL.md:3,16`).

## Where a rule came from

`.ai-factory/RULES.md` is the rule list, and the enforcement channel per rule is named
there. If a rule seems wrong for this project, change it there with a rationale in the
PR — never silence it with an inline suppression you cannot explain.

## Next

What this loop looks like on the dispatch side: [Daily cycle — factory](/docs/daily-cycle-factory/)
(experimental). What the gates can and cannot catch today: [Honest limits](/docs/limits/).
