# ENCYCLOPEDIA-CENSUS.md — what getff actually ships, per family, vs what the site documents

**Census pin (the framework commit this census reads): `a1337cb301`** — HEAD of `/home/www/rules-as-tests-aif`
(«docs(wave-plan): §0 reconcile 2026-09-10 — beta-floor frontier, #810→#1697 closure batch (#1698)»), read 2026-09-11.
Every `file:line` anchor below is at that pin unless a row says otherwise. The site surface is the landing repo at
`origin/main` = `f34fdd2` (PR #9 merge). **Method (T-ENC-B):** families and items are derived from the
implementation by enumeration commands quoted in each family preamble — never from the site, never from memory.
Coverage is sentence-checked against the named page (T-ENC-A): a row is `documented` only when a page SENTENCE
documents the behavior, `PARTIAL` when the page names it but omits load-bearing detail, `MISSING` otherwise.

**Family boundaries (derived — the umbrella kickoff `beta-docs-encyclopedia/kickoff.md` is NOT present in the
container clone at this pin, so §2's letter assignments could not be read; letters below are this census's own
assignment over the same nine-family union, and no shipped surface is excluded):**
A installer engine + stages + lanes · B skills suite · C sub-agents + skill-context · D hooks (plugin wiring +
consumer pre-push graph) · E templates + vendored renders · F rules corpus + generated-rule tooling + shipped
audit scripts · G npm packages + presets · H runtime-bridge (aif dispatch) · I plugin marketplace surface.
`ships-to` values: **core / env+ / factory** (installer tier arms), **npm-lane / python-lane / cargo-lane /
go-lane**, **plugin** (marketplace install), **clone** (present only in the framework repo itself — not
delivered to a consumer install).

**Row-id format (for E2+ tooling):** ids are `<letter><number>` with exactly ONE exception — `D24b`, the
suffix-qualified second half of the D24 dynamic-check pair (utils pair + ESM marker). A strict
`<letter><number>` parse undercounts family D by one (D = 27 rows: 23 MISSING / 2 PARTIAL / 2 documented);
accept a trailing `[a-z]` suffix or match `D24b` literally — the MISSING roll-up lists it explicitly.

**Revision note (same day, same pin):** families A and D were amended after a T7 enumeration-gap sweep —
four `setup.d/` entries the A-preamble `ls` shows but the first pass did not row (A21-A24), and the
`_zcode-emit` hook the D-preamble `ls` shows but the first pass did not row (D25). Families G-I were authored
at the same pin in the same pass. A second T7 delivery-arm sweep over `.claude/` added D26 (the dev-harness
settings.json) and H24 (the orchestrator-prompts staging homes), and corrected E39 to cover BOTH
session-bootstrap files (the inject hook consumes the top-level digest, not the template). No row was
dropped or re-scoped; counts only grew. `.claude/worktrees/` (runtime git state) and `node_modules/` are
deliberately not rowed — runtime artifacts, not capabilities.

**Revision note 2 (same day, same pin, post-review round 1):** the MISSING-roll-up **prose id lists** were
reconciled with their own tally tables — H24 moved from the H MISSING prose list into the PARTIAL prose list,
where its row and the tally table already had it (no tally number changed: Σ stays 252 = 183 MISSING +
28 PARTIAL + 41 documented). Also added here: the row-id-format note for `D24b` above, and F42's coverage-quote
elision is now marked `[…]` with the elided text named in its row. The prose lists are now machine-cross-checked
against the census rows (gate row 8, rework round 1).

---

## A — Installer engine, tiers & lanes

Enumeration:
```
$ ls setup.d/
05-mcp.sh  10-skills.sh  15-companions-stack.sh  20-agents.sh  30-templates.sh  40-configs.sh
45-python.sh  46-cargo.sh  47-go.sh  50-hooks.sh  55-runtime-bridge-vendor.sh  60-ci.sh  70-deps.sh
80-rule-bootstrap.sh  85-worktree-scripts.sh  99-finalize.sh  LAYERS.md  aif-handoff-guided-install.sh
bridge-guided.sh  companions.manifest  engine.sh  lib.sh
$ wc -l install.sh setup setup.d/engine.sh
  1450 install.sh / 112 setup / 87 setup.d/engine.sh
```
Derived count: **24 items** — the same `ls` output above accounts for every entry: 16 numbered stages (05-99)
+ 4 engine files (`setup`, `install.sh`, `engine.sh`+`lib.sh` rowed as A1-A3) + the 4 unnumbered non-stage
entries (`LAYERS.md`, `companions.manifest`, `aif-handoff-guided-install.sh`, `bridge-guided.sh` → A21-A24).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| A1 | clone→consumer (runs FROM the clone) | `setup` — one-click orchestrator: framework install + companions + runtime-bridge; stack auto-detect; `-y` full install | `setup:2` «# setup — one-click orchestrator: framework (install.sh) + companions (manifest) + runtime-bridge.»; `setup:6` «./setup -y # non-interactive full install» | A2, A10 | documented /docs/quickstart-python/ — «# or: bash /path/to/getff/setup python» |
| A2 | clone→consumer | `install.sh` (1450 LOC) — installer core: arg parse, `--profile`, four toolchain lanes, refresh, dry-run | `install.sh:132` «# --profile <name> — install depth (kickoff §0 + design spec §4 A1, beta-delivery-ux S1).»; `install.sh:15` «./install.sh ts-server --profile core  # rules + tests + guards + killer payload only» | A3–A20 | documented /docs/beta/ — «clone the framework repo and run the installer against your project» |
| A3 | clone | `setup.d/engine.sh` + `lib.sh` — stage dispatcher; `copy_safe` (skip-if-exists), tier skill lists, managed-block writers | `setup.d/engine.sh:2` «# Companion manifest engine. Sourceable in lib-only mode (ENGINE_LIB_ONLY=1).»; `setup.d/lib.sh:61` «GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"» | A2 | MISSING |
| A4 | npm-lane (all tiers) | Tier system `core`/`env`/`factory` — depth profiles resolving per install; `--with-aif-suite` legacy escape | `install.sh:648-650` «PROFILE="env" / echo "[profile] env (non-interactive default; --profile core for rules-only, --profile factory for the AIF suite)"»; `install.sh:156` «# Under --profile semantics (S1): --all additionally implies --profile factory» | A2, B | documented /docs/first-steps-core/ — «Note the interactive default depth is `env` (raised from `core` on 2026-08-18)» |
| A5 | npm+python+cargo+go lanes | Lane auto-detect + explicit positionals; LANE_TABLE detection precedence python→cargo→go; fresh-install OFFER; decline unmasks later lanes | `install.sh:281-283` «LANE_TABLE='python\|Python\|pyproject.toml\| cargo\|Rust/cargo\|Cargo.toml\|pyproject.toml go\|Go\|go.mod\|pyproject.toml Cargo.toml'»; `install.sh:274` «# Lane ORDER is the DETECTION PRECEDENCE, made explicit: python → cargo → go.» | A2 | documented /docs/quickstart-python/ — «# auto-detect: pyproject.toml present + no package.json → the installer OFFERS this lane» |
| A6 | python-lane | Python delivery stage (`setup.d/45-python.sh`, 1393 LOC): ast-grep+ruff bundle, local pre-push rung, pinned CI, firing self-check, `.getff-python-install.log` audit trail | `setup.d/45-python.sh:887` «_py_deliver_local_hook_rung() {»; `setup.d/45-python.sh:1` «#!/usr/bin/env bash» (stage header) | E24–E34, F | documented /docs/quickstart-python/ — «the Python lane is a pure-bash delivery — no `package.json`, no npm, no Node on the consumer machine» |
| A7 | cargo-lane | Cargo delivery stage (`setup.d/46-cargo.sh`, 303 LOC): clippy.toml bans + deny.toml starter, augment-first with REFUSE-LOUDLY on pre-existing configs | `setup.d/46-cargo.sh:4` «# Ships the pre-rendered cargo lint bundle (clippy.toml bans + the [lints.clippy] deny projection»; `setup.d/46-cargo.sh:13` «(ii) pre-existing clippy.toml → REFUSE-LOUDLY.» | E18–E21 | documented /docs/quickstart-rust/ — «it delivers `clippy.toml`, a `deny.toml` starter policy, and a getff-namespaced CI workflow» |
| A8 | go-lane | Go delivery stage (`setup.d/47-go.sh`, 298 LOC): golangci-lint bundle, go analog of the cargo lane | `setup.d/47-go.sh:4` «# Ships the pre-rendered golangci-lint bundle (.golangci.yml authored at»; `setup.d/47-go.sh:7` «# go analog of the cargo lane (setup.d/46-cargo.sh)» | E22–E23 | PARTIAL /docs/limits/ — «**Go** — golangci-lint ban configuration plus a pinned CI gate, delivered by the installer's go lane.» (no Go quickstart page; no per-file detail anywhere) |
| A9 | npm-lane | MCP companion install layer | `setup.d/05-mcp.sh:2` «# setup.d/05-mcp.sh — MCP companion install layer (S2).»; `setup.d/05-mcp.sh:4` «# Ported from orphaned setup.sh:289-303 (T3/M2 — setup.sh is dead code; do NOT revive it).»| A10 | MISSING |
| A10 | npm-lane | Companions manifest + stack-aware selection (react-next/react-spa/react-native signals) | `setup.d/15-companions-stack.sh:2` «# setup.d/15-companions-stack.sh — Stack-specific companion selection layer (S3).»; `setup.d/15-companions-stack.sh:10` «#   react-next   → next package present» | A1 | MISSING |
| A11 | npm-lane (agents: all tiers; 2 discipline agents factory-only) | Sub-agents delivery + skill-context overrides; 7 authoring-only agents excluded; cross-ref transform on fresh copies | `setup.d/20-agents.sh:24` «for f in "$PKG_ROOT"/agents/*.md; do»; `setup.d/20-agents.sh:26` «manual-rule-liveness-prober.md) continue ;;  # authoring-only tool (#552)» | C, I | MISSING |
| A12 | npm-lane (tier-home: env+/factory) | Templates stage: AGENTS.md/.ai-factory dirs, tier-home gate, AI-USAGE-GUIDE, first-steps renders source | `setup.d/30-templates.sh:108` «if [ "${PROFILE:-core}" = "env" ] \|\| [ "${PROFILE:-core}" = "factory" ]; then»; `setup.d/30-templates.sh:109` «copy_safe "$PKG_ROOT/packages/core/templates/shared/tier-home.md" "$PROJECT_ROOT/.ai-factory/tier-home.md"» | E | documented /docs/first-steps-env/ — «plus `.ai-factory/tier-home.md` and the five skills `env` adds over `core`» |
| A13 | npm-lane | Configs + shipped `scripts/` payload (audit-ai-docs.sh, check-rule-globs.sh, …) + eslint/tsconfig/prettier/CI workflow seeding | `setup.d/40-configs.sh:14` «copy_safe "$PKG_ROOT/packages/core/audit-self/audit-ai-docs.sh" "$PROJECT_ROOT/scripts/audit-ai-docs.sh"»; `setup.d/40-configs.sh:46` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-lintstaged-resolves.sh" "$PROJECT_ROOT/scripts/check-lintstaged-resolves.sh"» | F28–F41, E | documented /docs/daily-cycle-rules/ — «`bash scripts/audit-ai-docs.sh` — drift + code-vs-docs probes» |
| A14 | npm-lane | `.husky/` hooks cluster + core.hooksPath activation + TS-core pre-push graph + eslint-rules barrel + ESM marker | `setup.d/50-hooks.sh:2` «# setup.d/50-hooks.sh — §5c .husky/ hooks cluster + core.hooksPath activation.»; `setup.d/50-hooks.sh:11` «copy_safe "$PKG_ROOT/packages/core/templates/shared/husky-pre-commit.sh" "$PROJECT_ROOT/.husky/pre-commit"» | D17–D24 | documented /docs/daily-cycle-rules/ — «`.husky/pre-push` fires automatically: rule-glob liveness, lint-staged resolution and generated-rule-material checks» |
| A15 | factory | Vendored runtime-bridge subset (file-copy install-time) | `setup.d/55-runtime-bridge-vendor.sh:2` «# setup.d/55-runtime-bridge-vendor.sh — §5d vendored runtime-bridge subset (factory-only).»; `setup.d/55-runtime-bridge-vendor.sh:11` «#   1. Copies the vendored runtime-bridge subset from» | H | MISSING |
| A16 | npm-lane | CI reconciliation stage: CI-orphan warn, kept-workflow gate scan, shipped-ci.yml adoption check | `setup.d/60-ci.sh:8` «# Depends on: 40-configs (eslint.config.mjs + .nvmrc + .github/workflows/ already written)»; `setup.d/60-ci.sh:246` «echo "⚠ CI-orphan: some rule-enforcement gates run in 'npm run validate' but are NOT in any kept workflow under .github/workflows/."» | A13 | PARTIAL /docs/daily-cycle-rules/ — «CI (`ci-success`) is the last-resort gate» (names the gate, not the reconciliation stage or its orphan warning) |
| A17 | npm-lane | Dev-deps stage (installs hooks runtime deps) | `setup.d/70-deps.sh:1` «#!/usr/bin/env bash» (stage header; enumerated by `ls setup.d/`); `setup.d/70-deps.sh:2` «# setup.d/70-deps.sh — §7 package.json scripts merge + §8 dev-dep install + §8b tsx-at-root.»| A2 | MISSING |
| A18 | npm-lane (--full) | Rule-bootstrapping install-time step: runs the deterministic factory on the consumer's authored research+selection JSONs → rules-lock.json | `setup.d/80-rule-bootstrap.sh:2` «# setup.d/80-rule-bootstrap.sh — rule-bootstrapping install-time step (LIVE-or-degrade).»; `setup.d/80-rule-bootstrap.sh:7` «#   FileResearchClient + FileGenerateClient → generate.ts factory → install() → rules-lock.json» | F42, B(rule-research) | MISSING |
| A19 | env+ | Worktree scripts cluster (create-worktree.sh et al.) | `setup.d/85-worktree-scripts.sh:2` «# setup.d/85-worktree-scripts.sh — §5e worktree scripts cluster (env+ profile).»; `setup.d/85-worktree-scripts.sh:4` «# Sources: lib.sh (already in dispatcher scope)»| — | MISSING |
| A20 | npm-lane | Finalize: synth-wire + R2 AST-wire + otel WARN + ignore_shipped_configs | `setup.d/99-finalize.sh:2` «# setup.d/99-finalize.sh — synth-wire + R2 AST-wire + V2 otel WARN + ignore_shipped_configs + Done.»; `setup.d/99-finalize.sh:4` «# Sources: lib.sh (already in dispatcher scope)»| F | MISSING |
| A21 | clone (setup.d doc) | `setup.d/LAYERS.md` — the layer registry: S1 stage list (number · file · purpose · depends-on), `lib.sh` public API surface, stub-layer map | `setup.d/LAYERS.md:1` «# `setup.d/` Layer Registry»; `setup.d/LAYERS.md:3` «> **Authoritative for:** S1 layer list (number · file · purpose · depends-on), `lib.sh` public API surface, stub layers awaiting S2/S3.» | A3 | MISSING |
| A22 | npm-lane | `setup.d/companions.manifest` — TAB-delimited companion manifest; the S3 parser contract (single-tab fields, no padding; detect_cmd may contain inner pipes; official-installer, detect-first, no version pin) | `setup.d/companions.manifest:1` «# Companion manifest — TAB-delimited: name<TAB>detect_cmd<TAB>install_cmd<TAB>kind<TAB>stacks»; `setup.d/companions.manifest:3` «# Tab (not pipe) delimiter: detect_cmd may contain inner pipes (per kickoff §4 T-OCI-A).» | A10, F9 | MISSING |
| A23 | npm-lane (companion path) | `setup.d/aif-handoff-guided-install.sh` — consented guided INSTALL of the aif-handoff companion: official repo, docker compose, detect-first; decline → graceful env-level degradation | `setup.d/aif-handoff-guided-install.sh:2` «# aif-handoff-guided-install.sh — consented guided INSTALL for the aif-handoff companion»; `setup.d/aif-handoff-guided-install.sh:4` «# consented guided INSTALL: official repo, docker compose, detect-first; decline → graceful» | A15, H1 | MISSING |
| A24 | npm-lane (companion path) | `setup.d/bridge-guided.sh` — runtime-bridge guided-detect, lib-only sourceable; detection keys on /health so it works for docker OR native aif-handoff | `setup.d/bridge-guided.sh:2` «# Runtime-bridge guided-detect. Sourceable in lib-only mode (BRIDGE_LIB_ONLY=1).»; `setup.d/bridge-guided.sh:3` «# Detection keys on /health (works for docker OR native aif-handoff) — never assumes docker.» | A23 | MISSING |

---

## B — Skills suite

Enumeration:
```
$ ls .claude/skills/ | wc -l; ls .claude/skills/
41 / [ai-doc aif aif-architecture aif-best-practices aif-build-automation aif-ci aif-commit aif-dockerize
aif-docs aif-doctor aif-evolve aif-explore aif-fix aif-grounded aif-implement aif-improve aif-loop aif-plan
aif-qa aif-reference aif-review aif-roadmap aif-rules aif-rules-check aif-security-checklist
aif-skill-generator aif-verify arch claude-glm-executor-handoff dispatcher harvest night-mode orchestrator
pipeline reviewer rule-research rule-tests self-reflection story template-audit tool-bootstrapping]
$ grep -n 'GETFF_SKILLS' setup.d/lib.sh
61:GETFF_SKILLS_CORE="template-audit ai-doc rule-research rule-tests"
62:GETFF_SKILLS_ENV="arch night-mode orchestrator pipeline reviewer"
63:GETFF_SKILLS_FACTORY="dispatcher aif-doctor harvest story claude-glm-executor-handoff"
$ sed -n '20,27p' setup.d/10-skills.sh   # getff + tool-bootstrapping ship ALWAYS, from repo-root skills/
  echo "  [dry-run] would copy: $PKG_ROOT/skills/getff → $PROJECT_ROOT/.claude/skills/getff"
  _copy_tree_with_transform "$PKG_ROOT/skills/getff" "$PROJECT_ROOT/.claude/skills/getff"
  echo "  ✓ .claude/skills/getff/ (cross-refs rewritten to ${UPSTREAM_BLOB_URL})"
```
Derived count: **41 items** (41 `ls` entries; tier arms cover 14, getff+tool-bootstrapping always ship, the
remaining 25 are the framework's own aif-operator suite + self-reflection and are NOT in any consumer arm —
`ships-to: clone`). All anchors below are the skill's `description:` line in its SKILL.md (frontmatter line 3).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| B1 | core | template-audit — audit rendered templates via local advisory review | `.claude/skills/template-audit/SKILL.md:3` «description: Use when auditing rendered templates via local advisory review.»; `setup.d/lib.sh:61` (core arm) | E | MISSING |
| B2 | core | ai-doc — create/fix AI-facing docs with enforcement | `.claude/skills/ai-doc/SKILL.md:3` «description: Use when creating or fixing an AI-facing doc/rule/skill/agent in this repo»; `setup.d/lib.sh:61` | F | MISSING |
| B3 | core | rule-research — bootstrap stack-aware ESLint rules from LIVE docs | `.claude/skills/rule-research/SKILL.md:3` «description: Use when a consumer wants to bootstrap stack-aware ESLint rules from LIVE documentation»; `setup.d/lib.sh:61` | F42, C18 | documented /docs/first-steps-core/ — «7. **Continue into rule research in the same session** — invoke `/rule-research`» |
| B4 | core | rule-tests — author/repair firing test material for an existing generated rule | `.claude/skills/rule-tests/SKILL.md:3` «description: Use when a consumer has an EXISTING generated rule whose firing test material is missing»; `setup.d/lib.sh:61` | B3 | PARTIAL /docs/daily-cycle-rules/ — «`/rule-research` and `/rule-tests` exist to make that cheap» (named; behavior not described) |
| B5 | env+ | arch — external design contour: idea → reviewed design + routed handoff | `.claude/skills/arch/SKILL.md:3` «description: Use when starting the EXTERNAL design contour — turning a raw idea or prep-doc into a reviewed design and a routed handoff.»; `setup.d/lib.sh:62` | A4 | documented /docs/daily-cycle-factory/ — «Invoke `/arch <topic>`: the external design contour turns a raw idea into a reviewed design plus a routed handoff» |
| B6 | env+ | night-mode — fully autonomous unattended orchestrator posture | `.claude/skills/night-mode/SKILL.md:3` «description: Use when running a task FULLY AUTONOMOUSLY (overnight / unattended) as an orchestrator.»; `setup.d/lib.sh:62` | A4 | PARTIAL /docs/degradations/ — «Per night-mode «window slides», tiers slide to the next-cheaper available model» (posture named in vendored rows; the skill itself never introduced) |
| B7 | env+ | orchestrator — in-repo orchestration contour | `.claude/skills/orchestrator/SKILL.md:3` «description: \|» (frontmatter block scalar — body carries it); `setup.d/lib.sh:62` | A4 | MISSING |
| B8 | env+ | pipeline — umbrella launch table + ranking + presets | `.claude/skills/pipeline/SKILL.md:3` «description: Use when you have ≥2 in-flight wave umbrellas with cross-stage dependencies…»; `setup.d/lib.sh:62` | G8 presets | documented /docs/daily-cycle-factory/ — «Invoke `/pipeline` with no task: it reads your kickoffs plus `.ai-factory/orchestrator-prompts/plan.md` (created on first run), ranks them, and emits a launch table» |
| B9 | env+ | reviewer — interactive review with verdict | `.claude/skills/reviewer/SKILL.md:3` «description: Use when the operator or an orchestrator asks for an interactive review with a verdict»; `setup.d/lib.sh:62` | C19 | MISSING |
| B10 | factory | dispatcher — execute a chosen umbrella's stages through the aif-control loop | `.claude/skills/dispatcher/SKILL.md:3` «description: Use when you need to EXECUTE a chosen umbrella's stages through the aif-control loop.»; `setup.d/lib.sh:63` | H | MISSING |
| B11 | factory | aif-doctor — diagnose a misbehaving aif-handoff runtime (+ heal helpers delivered executable) | `.claude/skills/aif-doctor/SKILL.md:3` «description: Use when the aif-handoff runtime is misbehaving — a task is stuck or crash-looping»; `setup.d/10-skills.sh:184` «echo "  ✓ aif-doctor heal helpers → .claude/skills/aif-doctor/helpers/ (executable)"» | H | PARTIAL /docs/daily-cycle-factory/ — «If a task stalls or the runtime misbehaves, `/aif-doctor` is the diagnostic entry point» (entry point named; scope not described) |
| B12 | factory | harvest — bring a finished aif-agent branch back as a PR | `.claude/skills/harvest/SKILL.md:3` «description: Use when harvesting a finished aif-agent branch into a PR after acceptance.»; `setup.d/lib.sh:63` | H | documented /docs/daily-cycle-factory/ — «Dispatch the launch table's top row, then bring the finished branch back with `/harvest`» |
| B13 | factory | story — recap of finished work | `.claude/skills/story/SKILL.md:3` «description: Use when work is done / a PR was pushed, or when the user asks to recap what was done»; `setup.d/lib.sh:63` | — | MISSING |
| B14 | factory | claude-glm-executor-handoff — coordinator→GLM worker dispatch contract | `.claude/skills/claude-glm-executor-handoff/SKILL.md:3` «description: Use when an in-aif Claude coordinator is about to dispatch an executable task to a GLM-5.2 worker»; `setup.d/lib.sh:63` | H | MISSING |
| B15 | always (all tiers) | getff — the product skill (cross-refs rewritten to upstream blob URLs at copy) | `setup.d/10-skills.sh:26` «_copy_tree_with_transform "$PKG_ROOT/skills/getff" "$PROJECT_ROOT/.claude/skills/getff"»; `skills/getff/SKILL.md:3` (repo-root source; see §I) | I | PARTIAL /docs/factory-overview/ — «Skills (`/rule-research`, `/arch`, `/pipeline`, …) auto-activate on Claude Code» (the getff skill itself is not named on the site) |
| B16 | always (all tiers) | tool-bootstrapping — stack analysis for MCP/skill recommendations | `.claude/skills/tool-bootstrapping/SKILL.md:3` «description: Use when analysing project stack for MCP or skill recommendations.»; `setup.d/10-skills.sh:41` «_copy_tree_with_transform "$PKG_ROOT/skills/tool-bootstrapping" "$PROJECT_ROOT/.claude/skills/tool-bootstrapping"» | A9 | MISSING |
| B17 | clone | aif — set up agent context for a project (AI Factory installer entry) | `.claude/skills/aif/SKILL.md:3` «description: Set up agent context for a project. Analyzes tech stack, installs relevant skills from skills.sh»; `.claude/skills/aif/SKILL.md:2` «name: aif»| — | MISSING |
| B18 | clone | aif-architecture — generate architecture guidelines | `.claude/skills/aif-architecture/SKILL.md:3` «description: Generate architecture guidelines for the project.»; `.claude/skills/aif-architecture/SKILL.md:2` «name: aif-architecture»| — | MISSING |
| B19 | clone | aif-best-practices — code-quality guidelines | `.claude/skills/aif-best-practices/SKILL.md:3` «description: Code quality guidelines and best practices for writing clean, maintainable code.»; `.claude/skills/aif-best-practices/SKILL.md:2` «name: aif-best-practices»| — | MISSING |
| B20 | clone | aif-build-automation — build tooling guidance | `.claude/skills/aif-build-automation/SKILL.md:3` «description: >-» (block scalar; body carries description); `.claude/skills/aif-build-automation/SKILL.md:2` «name: aif-build-automation»| — | MISSING |
| B21 | clone | aif-ci — generate CI/CD pipeline | `.claude/skills/aif-ci/SKILL.md:3` «description: Generate CI/CD pipeline (GitHub Actions / GitLab CI) with linting, static analysis, tests»; `.claude/skills/aif-ci/SKILL.md:2` «name: aif-ci»| — | MISSING |
| B22 | clone | aif-commit — conventional commit messages from staged changes | `.claude/skills/aif-commit/SKILL.md:3` «description: Create conventional commit messages by analyzing staged changes.»; `.claude/skills/aif-commit/SKILL.md:2` «name: aif-commit»| — | MISSING |
| B23 | clone | aif-dockerize — dockerize the project | `.claude/skills/aif-dockerize/SKILL.md:3` «description: >-» (block scalar); `.claude/skills/aif-dockerize/SKILL.md:2` «name: aif-dockerize»| — | MISSING |
| B24 | clone | aif-docs — generate/maintain project documentation | `.claude/skills/aif-docs/SKILL.md:3` «description: Generate and maintain project documentation.»; `.claude/skills/aif-docs/SKILL.md:2` «name: aif-docs»| — | MISSING |
| B25 | clone | aif-evolve — self-improve skills from patches/context | `.claude/skills/aif-evolve/SKILL.md:3` «description: Self-improve AI Factory skills based on project context, accumulated patches»; `.claude/skills/aif-evolve/SKILL.md:2` «name: aif-evolve»| — | MISSING |
| B26 | clone | aif-explore — thinking-partner explore mode | `.claude/skills/aif-explore/SKILL.md:3` «description: Enter explore mode - a thinking partner for exploring ideas»; `.claude/skills/aif-explore/SKILL.md:2` «name: aif-explore»| — | MISSING |
| B27 | clone | aif-fix — fix a bug (immediate or plan-first) | `.claude/skills/aif-fix/SKILL.md:3` «description: Fix a specific bug or problem in the codebase.»; `.claude/skills/aif-fix/SKILL.md:2` «name: aif-fix»| — | MISSING |
| B28 | clone | aif-grounded — evidence-based answer gate | `.claude/skills/aif-grounded/SKILL.md:3` «description: Reliability gate for answers. Forces evidence-based reasoning, explicit uncertainty»; `.claude/skills/aif-grounded/SKILL.md:2` «name: aif-grounded»| — | MISSING |
| B29 | clone | aif-implement — execute plan tasks sequentially | `.claude/skills/aif-implement/SKILL.md:3` «description: Execute implementation tasks from the current plan.»; `.claude/skills/aif-implement/SKILL.md:2` «name: aif-implement»| — | MISSING |
| B30 | clone | aif-improve — refine an existing plan | `.claude/skills/aif-improve/SKILL.md:3` «description: Refine and enhance an existing implementation plan with a second iteration.»; `.claude/skills/aif-improve/SKILL.md:2` «name: aif-improve»| — | MISSING |
| B31 | clone | aif-loop — multi-iteration reflex loop (PLAN/PRODUCE/EVALUATE/CRITIQUE) | `.claude/skills/aif-loop/SKILL.md:3` «description: Run a strict multi-iteration Reflex Loop with phases (PLAN, PRODUCE\|\|PREPARE, EVALUATE, CRITIQUE»; `.claude/skills/aif-loop/SKILL.md:2` «name: aif-loop»| — | MISSING |
| B32 | clone | aif-plan — plan implementation (fast/full) | `.claude/skills/aif-plan/SKILL.md:3` «description: Plan implementation for a feature or task. Two modes — fast (single quick plan) or full»; `.claude/skills/aif-plan/SKILL.md:2` «name: aif-plan»| — | MISSING |
| B33 | clone | aif-qa — QA workflow for a feature implementation | `.claude/skills/aif-qa/SKILL.md:3` «description: QA workflow for testing a feature or task implementation.»; `.claude/skills/aif-qa/SKILL.md:2` «name: aif-qa»| — | MISSING |
| B34 | clone | aif-reference — reference lookup | `.claude/skills/aif-reference/SKILL.md:3` «description: >-» (block scalar); `.claude/skills/aif-reference/SKILL.md:2` «name: aif-reference»| — | MISSING |
| B35 | clone | aif-review — code review on staged changes/PR | `.claude/skills/aif-review/SKILL.md:3` «description: Perform code review on staged changes or a pull request.»; `.claude/skills/aif-review/SKILL.md:2` «name: aif-review»| C19 skill-context | MISSING |
| B36 | clone | aif-roadmap — create/update project roadmap | `.claude/skills/aif-roadmap/SKILL.md:3` «description: Create or update a project roadmap with major milestones.»; `.claude/skills/aif-roadmap/SKILL.md:2` «name: aif-roadmap»| — | MISSING |
| B37 | clone | aif-rules — add project rules to RULES.md | `.claude/skills/aif-rules/SKILL.md:3` «description: Add project-specific rules and conventions to the configured RULES.md artifact.»; `.claude/skills/aif-rules/SKILL.md:2` «name: aif-rules»| — | MISSING |
| B38 | clone | aif-rules-check — read-only rules compliance gate | `.claude/skills/aif-rules-check/SKILL.md:3` «description: Run a standalone read-only rules compliance gate against changed files or a git ref.»; `.claude/skills/aif-rules-check/SKILL.md:2` «name: aif-rules-check»| C21 skill-context | MISSING |
| B39 | clone | aif-security-checklist — OWASP-based security audit | `.claude/skills/aif-security-checklist/SKILL.md:3` «description: Security audit checklist based on OWASP Top 10 and best practices.»; `.claude/skills/aif-security-checklist/SKILL.md:2` «name: aif-security-checklist»| — | MISSING |
| B40 | clone | aif-skill-generator — generate agent skill packages | `.claude/skills/aif-skill-generator/SKILL.md:3` «description: Generate professional Agent Skills for AI agents.»; `.claude/skills/aif-skill-generator/SKILL.md:2` «name: aif-skill-generator»| — | MISSING |
| B41 | clone | self-reflection — introduce/extend rules & principles | `.claude/skills/self-reflection/SKILL.md:3` «description: Use when introducing or extending a rule, principle, pattern, methodology, discipline»; `.claude/skills/self-reflection/SKILL.md:2` «name: self-reflection»| F | MISSING |

---

## C — Sub-agents + skill-context overrides

Enumeration:
```
$ ls agents/ | wc -l; ls agents/
20 / [adapter-jig-reviewer aif-init backward-sweep-auditor capability-reuse-auditor claims-conformance-auditor
compliance-verifier dispatch-input-checker docplan-auditor dual-channel-drift-auditor fidelity-auditor
getff-cold-run-prober living-docs-auditor manual-rule-liveness-prober memory-codification-auditor
orchestrator-worker-discipline review-sidecar reviewer-discipline rule-researcher rule-test-author
shipped-agent-liveness-prober]
$ sed -n '24,32p' setup.d/20-agents.sh     # the delivery loop + exclusions/forks (verbatim)
    manual-rule-liveness-prober.md) continue ;;  # authoring-only tool (#552)
    shipped-agent-liveness-prober.md) continue ;;  # authoring-only tool (M2 probe, #552 sibling)
    backward-sweep-auditor.md) continue ;;  # authoring-only tool (§1.7 backward-check cold-sweep, T21)
    dual-channel-drift-auditor.md) continue ;;  # authoring-only tool (dual-implementation-discipline §8 semantic half — @dual-pair group drift/copy audit)
    adapter-jig-reviewer.md) continue ;;  # authoring-only tool (framework-side adapter-wiring conformance review, adapter-jig J1)
    dispatch-input-checker.md) continue ;;  # authoring-only station (arch-v2 S-B contract v2, dispatch-input reality-check)
    getff-cold-run-prober.md) continue ;;  # framework-only (S4 one-beat cold-run protocol — run BY framework against consumer, not shipped; spec §9.3)
$ ls packages/core/templates/shared/skill-context/
aif-orchestrator-discipline/SKILL.md  aif-review/SKILL.md  aif-rules-check/SKILL.md
```
Derived count: **23 items** (20 agent sources + 3 skill-context overrides). 13 of 20 agents deliver at
`--profile factory`+presence rules (11 at core/env+, +2 factory-gated); plugin twins of 3 exist under
`plugin/agents/` (generated, byte-identical, by `scripts/generate-plugin-twins.sh:2` «(2) plugin/agents/<name>.md
← agents/<name>.md — byte-identical copy, no header»). Anchor 1 per agent = its `name:` line (line 2).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| C1 | npm-lane (factory only) | orchestrator-worker-discipline — worker/orchestrator REPORT + park-vs-proceed discipline | `agents/orchestrator-worker-discipline.md:2` «name: orchestrator-worker-discipline»; `setup.d/20-agents.sh:39` «if [ "${PROFILE:-core}" != "factory" ] && [ -z "${WITH_AIF_SUITE:-}" ] \» | B10 | MISSING |
| C2 | npm-lane (factory only) | reviewer-discipline — reviewer/orchestrator role separation, DECISION-NEEDED protocol | `agents/reviewer-discipline.md:2` «name: reviewer-discipline»; `setup.d/20-agents.sh:33` «orchestrator-worker-discipline.md\|reviewer-discipline.md)» (shared gate case) | B9 | MISSING |
| C3 | npm-lane | aif-init — draft DESCRIPTION/ARCHITECTURE for a consumer repo | `agents/aif-init.md:2` «name: aif-init»; `setup.d/20-agents.sh:26` (delivery loop) | B17 | MISSING |
| C4 | npm-lane | capability-reuse-auditor — overlap audit for a new capability | `agents/capability-reuse-auditor.md:2` «name: capability-reuse-auditor»; `setup.d/20-agents.sh:26` | — | MISSING |
| C5 | npm-lane | claims-conformance-auditor — claims audit | `agents/claims-conformance-auditor.md:2` «name: claims-conformance-auditor»; `setup.d/20-agents.sh:26` | — | MISSING |
| C6 | npm-lane + plugin twin | compliance-verifier — PR §1.7 forward/backward-check evidence review | `agents/compliance-verifier.md:2` «name: compliance-verifier»; `plugin/agents/compliance-verifier.md:2` (twin) | I | MISSING |
| C7 | npm-lane | docplan-auditor — cold semantic-grouping judgment for a DocPlan | `agents/docplan-auditor.md:2` «name: docplan-auditor»; `setup.d/20-agents.sh:26` | — | MISSING |
| C8 | npm-lane | fidelity-auditor — cold WHAT-conformance audit at stage-PR boundary | `agents/fidelity-auditor.md:2` «name: fidelity-auditor»; `setup.d/20-agents.sh:26` | — | MISSING |
| C9 | npm-lane | living-docs-auditor — runs audit-ai-docs.sh, reports drift (de-collided rename) | `agents/living-docs-auditor.md:2` «name: living-docs-auditor»; `setup.d/20-agents.sh:14` «#   - docs-auditor — RENAMED to living-docs-auditor (de-collides with AIF's same-named agent).» | F28 | MISSING |
| C10 | npm-lane + plugin twin | review-sidecar — external no-memory diff review (anti-tautology) | `agents/review-sidecar.md:2` «name: review-sidecar»; `setup.d/20-agents.sh:15` «#   - review-sidecar — still collides with AIF's. copy_safe DEFAULT (no --force) intentionally» | C20 | MISSING |
| C11 | npm-lane | memory-codification-auditor — user-scope memory vs repo codification audit | `agents/memory-codification-auditor.md:2` «name: memory-codification-auditor»; `setup.d/20-agents.sh:26` | — | MISSING |
| C12 | npm-lane | rule-researcher — researches stack practices → ResearchPlan+GenerateSelection JSONs | `agents/rule-researcher.md:2` «name: rule-researcher»; `setup.d/80-rule-bootstrap.sh:5` «# the human's interactive agent session authored (agents/rule-researcher.md → two committed» | B3, F42 | PARTIAL /docs/first-steps-core/ — «(or read `.claude/agents/rule-researcher.md` on a harness without skills)» (named as fallback path; role not described) |
| C13 | npm-lane | rule-test-author — writes/repairs firing test material for a generated rule | `agents/rule-test-author.md:2` «name: rule-test-author»; `setup.d/20-agents.sh:26` | B4 | MISSING |
| C14 | clone (authoring-only) | adapter-jig-reviewer — framework-side adapter-wiring conformance review | `agents/adapter-jig-reviewer.md:2` «name: adapter-jig-reviewer»; `setup.d/20-agents.sh:30` «adapter-jig-reviewer.md) continue ;;  # authoring-only tool» | — | MISSING |
| C15 | clone (authoring-only) | backward-sweep-auditor — §1.7 backward-check cold sweep | `agents/backward-sweep-auditor.md:2` «name: backward-sweep-auditor»; `setup.d/20-agents.sh:28` «backward-sweep-auditor.md) continue ;;» | — | MISSING |
| C16 | clone (authoring-only) | dispatch-input-checker — dispatch-input reality-check station | `agents/dispatch-input-checker.md:2` «name: dispatch-input-checker»; `setup.d/20-agents.sh:31` «dispatch-input-checker.md) continue ;;» | — | MISSING |
| C17 | clone (authoring-only) | dual-channel-drift-auditor — dual-implementation semantic drift audit | `agents/dual-channel-drift-auditor.md:2` «name: dual-channel-drift-auditor»; `setup.d/20-agents.sh:29` «dual-channel-drift-auditor.md) continue ;;» | — | MISSING |
| C18 | clone (authoring-only) | manual-rule-liveness-prober — manual rule liveness probe | `agents/manual-rule-liveness-prober.md:2` «name: manual-rule-liveness-prober»; `setup.d/20-agents.sh:26` «manual-rule-liveness-prober.md) continue ;;» | B3 | MISSING |
| C19 | clone (authoring-only) | shipped-agent-liveness-prober — shipped-agent liveness probe | `agents/shipped-agent-liveness-prober.md:2` «name: shipped-agent-liveness-prober»; `setup.d/20-agents.sh:27` (comment «authoring-only tool (M2 probe, #552 sibling)») | — | MISSING |
| C20 | clone (framework-only) | getff-cold-run-prober — one-beat cold-run protocol run BY the framework | `agents/getff-cold-run-prober.md:2` «name: getff-cold-run-prober»; `setup.d/20-agents.sh:32` (comment «run BY framework against consumer, not shipped») | — | MISSING |
| C21 | npm-lane (skill-context) | aif-orchestrator-discipline override — orchestrator discipline content | `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:1` (delivered by A11's §3c loop; enumerated by `ls …/skill-context/`) ; `setup.d/20-agents.sh:56` «# AIF's own background sidecars MANDATORY-read .ai-factory/skill-context/<skill>/SKILL.md» | B7 | MISSING |
| C22 | npm-lane (skill-context) | aif-review override — anti-tautology test-review content | `packages/core/templates/shared/skill-context/aif-review/SKILL.md:1`; `setup.d/20-agents.sh:58` «# instead of shipping colliding agents: aif-review gets our anti-tautology test-review content;» | B35, C10 | MISSING |
| C23 | npm-lane (skill-context) | aif-rules-check override — R10-naming + test-existence residue | `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:1`; `setup.d/20-agents.sh:59` «# aif-rules-check gets the R10-naming + test-existence residue of the removed best-practices-sidecar.» | B38 | MISSING |

---

## D — Hooks: plugin enforcement wiring + consumer pre-push graph

Enumeration:
```
$ ls plugin/hooks/
_zcode-emit  ask-question-reminder  check-doc-authority  check-hook-marker  check-kickoff-traps
check-worker-dispatch-channel  deps-hash-check  end-of-turn-reminder  hooks.json
inject-matching-rule  inject-memory-codification  inject-output-language  inject-project-digest
inject-session-bootstrap  inject-subagent-context  lang  lib  run-hook.cmd  runtime-bridge-dispatch
session-start  validate-prompt  warn-subagent-report-zcode
$ grep -c '"command"' plugin/hooks/hooks.json   → 23 registrations
$ sed -n '27,36p' setup.d/50-hooks.sh            # consumer TS-core graph
for ts_hook in pre-push.ts utils/run-check.ts utils/git.ts checks/prior-art.ts checks/s17.ts
  checks/unpinned-tool-install.ts checks/guard-liveness.ts checks/cmd-script-liveness.ts; do
  copy_safe "$PKG_ROOT/packages/core/hooks/$ts_hook" "$PROJECT_ROOT/packages/core/hooks/$ts_hook"
done
$ sed -n '41,48p' setup.d/50-hooks.sh            # eslint-rules barrel
for esl_hook in index.ts no-unsafe-zod-parse.ts no-direct-time-randomness.ts require-otel-span.ts
  restricted-syntax-audit-exempt.ts; do copy_safe …; done
```
Derived count: **27 items** — 18 plugin hook commands (the 17 rowed D2-D18 PLUS the sourced `_zcode-emit`
helper, rowed D25) + hooks.json wiring + lang/lib/run-hook.cmd plumbing + the dev-harness settings.json
(D26), plus the consumer pre-push unit: dispatcher pair, bash fallback, TS hook, static check trio, dynamic
check pair, utils pair + ESM marker. Plugin hooks are twins of `.claude/hooks/<name>.sh`
(generate-plugin-twins population 1).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| D1 | plugin | hooks.json — the enforcement wiring: 23 registrations over UserPromptSubmit/PreToolUse/PostToolUse/Stop/SessionStart/SubagentStart | `plugin/hooks/hooks.json:3` «"UserPromptSubmit": [»; `plugin/hooks/hooks.json:140` «"Stop": [» (event blocks; count via grep -c) | D2–D19 | PARTIAL /docs/quickstart-ts/ — «The plugin never silently mutates your git or CI. The hard layer (hooks + CI gates) is one explicit opt-in command» (opt-in framing documented; the 23 hook registrations are not enumerated anywhere) |
| D2 | plugin | inject-project-digest — context digest at prompt submit + subagent start | `plugin/hooks/inject-project-digest:1` «#!/usr/bin/env bash» (twin of `.claude/hooks/inject-project-digest.sh`); `plugin/hooks/hooks.json` UserPromptSubmit arm; `plugin/hooks/inject-project-digest:2` «# Plugin twin of .claude/hooks/inject-project-digest.sh.»| — | MISSING |
| D3 | plugin | inject-output-language — AIF_HOOK_LANG output-language injection | `plugin/hooks/inject-output-language:1` «#!/usr/bin/env bash»; `plugin/hooks/lang/en.sh:1` (lang arm) | — | MISSING |
| D4 | plugin | inject-session-bootstrap — session-bootstrap injection at startup | `plugin/hooks/inject-session-bootstrap:1` «#!/usr/bin/env bash»; `plugin/hooks/hooks.json` UserPromptSubmit arm; `plugin/hooks/inject-session-bootstrap:2` «# AUTO-GENERATED from .claude/hooks/inject-session-bootstrap.sh — do not edit (header injected by scripts/ge…»| E17 | MISSING |
| D5 | plugin | deps-hash-check — deps drift check at prompt submit | `plugin/hooks/deps-hash-check:1` «#!/usr/bin/env bash»; twin source `packages/core/hooks/deps-hash-check.sh`; `plugin/hooks/deps-hash-check:2` «# AUTO-GENERATED from .claude/hooks/deps-hash-check.sh — do not edit (header injected by scripts/generate-pl…»| — | MISSING |
| D6 | plugin | ask-question-reminder — AskUserQuestion PreToolUse reminder | `plugin/hooks/ask-question-reminder:1` «#!/usr/bin/env bash»; `plugin/hooks/hooks.json` PreToolUse matcher «AskUserQuestion»; `plugin/hooks/ask-question-reminder:2` «# AUTO-GENERATED from .claude/hooks/ask-question-reminder.sh — do not edit (header injected by scripts/gener…»| — | MISSING |
| D7 | plugin | inject-subagent-context — subagent context injection on Agent/Task | `plugin/hooks/inject-subagent-context:1` «#!/usr/bin/env bash»; `plugin/hooks/hooks.json` PreToolUse matcher «Agent\|Task»; `plugin/hooks/inject-subagent-context:2` «# Backup digest-injection for harnesses WITHOUT the SubagentStart hook event (zcode).»| D2 | MISSING |
| D8 | plugin | warn-subagent-report-zcode — subagent report warn (PostToolUse + Stop) | `plugin/hooks/warn-subagent-report-zcode:1` «#!/usr/bin/env bash»; source `packages/core/hooks/warn-subagent-report.test.ts` (twin family); `plugin/hooks/warn-subagent-report-zcode:2` «# warn-subagent-report-zcode — ZCode-functional twin of .claude/hooks/warn-subagent-report.sh»| — | MISSING |
| D9 | plugin | validate-prompt — Edit/Write prompt validation | `plugin/hooks/validate-prompt:1` «#!/usr/bin/env bash»; source `packages/core/hooks/validate-prompt.test.ts`; `plugin/hooks/validate-prompt:2` «# Wave 7 sub-wave 7.2.b — PostToolUse hook: validate batch-spec on orchestrator-prompts.»| — | MISSING |
| D10 | plugin | check-doc-authority — doc-authority hierarchy check on edits | `plugin/hooks/check-doc-authority:1` «#!/usr/bin/env bash»; `.claude/rules/doc-authority-hierarchy.md:13` (enforced rule) | F12 | MISSING |
| D11 | plugin | inject-matching-rule — path-scoped rule injection on edits | `plugin/hooks/inject-matching-rule:1`; `.claude/rules/00-rule-index.md:1` «# Rule index — generated, do not hand-edit» | F | MISSING |
| D12 | plugin | check-kickoff-traps — AI-trap check on kickoff edits | `plugin/hooks/check-kickoff-traps:1` «#!/usr/bin/env bash»; twin `.claude/hooks/check-kickoff-traps.sh`; `plugin/hooks/check-kickoff-traps:2` «# AUTO-GENERATED from .claude/hooks/check-kickoff-traps.sh — do not edit (header injected by scripts/generat…»| — | MISSING |
| D13 | plugin | check-hook-marker — managed-marker integrity check | `plugin/hooks/check-hook-marker:1` «#!/usr/bin/env bash»; twin `.claude/hooks/check-hook-marker.sh`; `plugin/hooks/check-hook-marker:2` «# AUTO-GENERATED from .claude/hooks/check-hook-marker.sh — do not edit (header injected by scripts/generate-…»| — | MISSING |
| D14 | plugin | check-worker-dispatch-channel — worker dispatch channel check | `plugin/hooks/check-worker-dispatch-channel:1` «#!/usr/bin/env bash»; twin `.claude/hooks/check-worker-dispatch-channel.sh`; `plugin/hooks/check-worker-dispatch-channel:2` «# AUTO-GENERATED from .claude/hooks/check-worker-dispatch-channel.sh — do not edit (header injected by scrip…»| C1 | MISSING |
| D15 | plugin | inject-memory-codification — memory-codification nudge on Write | `plugin/hooks/inject-memory-codification:1`; `.claude/rules/memory-codification.md:1` «# Memory codification — discipline rule» | F19 | MISSING |
| D16 | plugin | runtime-bridge-dispatch — Write/PostToolUse dispatch bridge to aif | `plugin/hooks/runtime-bridge-dispatch:1` «#!/usr/bin/env bash»; twin `.claude/hooks/runtime-bridge-dispatch.sh`; `plugin/hooks/runtime-bridge-dispatch:2` «# AUTO-GENERATED from .claude/hooks/runtime-bridge-dispatch.sh — do not edit (header injected by scripts/gen…»| H | MISSING |
| D17 | plugin | session-start — SessionStart bootstrap (startup\|clear\|compact) | `plugin/hooks/session-start:1` «#!/usr/bin/env bash»; `plugin/hooks/hooks.json` SessionStart arm; `plugin/hooks/session-start:2` «# Plugin SessionStart bootstrap — injects the getff entry-point context so the»| E17 | MISSING |
| D18 | plugin | end-of-turn-reminder — Stop-event end-of-turn recap gate (SDK-session guard) | `plugin/hooks/end-of-turn-reminder:1` «#!/usr/bin/env bash»; window commit `efd32faad5` «fix(hooks): end-of-turn recap must not block SDK-driven sessions (aif review-sidecar contract) (#1693)»; `plugin/hooks/end-of-turn-reminder:2` «# AUTO-GENERATED from .claude/hooks/end-of-turn-reminder.sh — do not edit (header injected by scripts/genera…»| — | MISSING |
| D19 | plugin | lang/ + lib/hook-emit.sh + run-hook.cmd — hook plumbing (emit protocol, lang packs, Windows runner) | `plugin/hooks/lib/hook-emit.sh:1` «#!/usr/bin/env bash»; `plugin/hooks/lang/check-parity.sh:1`; `plugin/hooks/run-hook.cmd:1` | D3 | MISSING |
| D20 | npm-lane | `.husky/` dispatcher pair — husky-pre-commit.sh + husky-pre-push.sh (TS-core if Node ≥20, bash fallback otherwise) | `setup.d/50-hooks.sh:11` «copy_safe …husky-pre-commit.sh" "$PROJECT_ROOT/.husky/pre-commit"»; `setup.d/50-hooks.sh:14` «# The runtime dispatcher (husky-pre-push.sh) selects between TS-core and fallback at each push.» | D21, D22 | documented /docs/daily-cycle-rules/ — «the TS-core hook routes by what your machine can run, with a bash critical-only fallback when Node ≥20 is absent» |
| D21 | npm-lane | pre-push.fallback.sh — presence-only bash critical-checks fallback | `setup.d/50-hooks.sh:15` «copy_safe "$PKG_ROOT/packages/core/hooks/pre-push.fallback.sh" …»; `packages/core/hooks/pre-push.fallback.sh:1` (shipped file) | D20 | documented /docs/daily-cycle-rules/ (same sentence as D20 — the fallback is named) |
| D22 | npm-lane | pre-push.ts — TS-core pre-push gate (owner-scoped sections; render-rule-index --check at :1351-1352) | `packages/core/hooks/pre-push.ts:1350` «function ruleIndexRenderSection(): void {»; `packages/core/hooks/pre-push.ts:934` «// Shipped consumer gate (install.sh → scripts/check-rule-globs.sh): FAILS if an» | D23–D24, F29 | PARTIAL /docs/executable-agents-md/ — «wired into the pre-push hook (`packages/core/hooks/pre-push.ts:1351-1352`)» (the render-rule-index wiring is sentence-documented; the hook's full owner section map is not) |
| D23 | npm-lane | static check trio — checks/prior-art.ts, checks/s17.ts, checks/unpinned-tool-install.ts (pre-push import graph) | `setup.d/50-hooks.sh:30` «checks/prior-art.ts \» (one per continuation line :30-32); `packages/core/hooks/checks/registry.ts:1` (check registry) | D22 | MISSING |
| D24 | npm-lane | dynamic check pair — checks/guard-liveness.ts + checks/cmd-script-liveness.ts (die() on absence, not graceful) | `setup.d/50-hooks.sh:33` «checks/guard-liveness.ts \» (pair at :33-34); `setup.d/50-hooks.sh:38` «# ../../eslint-rules/index.ts). Without this group, guard-liveness.ts die()/push-blocks» | D22, F43 | MISSING |
| D24b | npm-lane | utils pair + ESM marker — utils/run-check.ts, utils/git.ts, hooks-package.json {"type":"module"} | `setup.d/50-hooks.sh:28-30` (continuation list: pre-push.ts, utils/run-check.ts, utils/git.ts); `setup.d/50-hooks.sh:58` «copy_safe "$PKG_ROOT/packages/core/templates/shared/hooks-package.json" "$PROJECT_ROOT/packages/core/hooks/package.json"» | D22 | MISSING |
| D25 | plugin | `_zcode-emit` — sourced (NOT executed, NOT registered in hooks.json) emit-adapter helper between plain-stdout CC semantics and strict-JSON ZCode semantics; adoption is per-twin and OPTIONAL — zero twins source it at this pin | `plugin/hooks/_zcode-emit:1` «# _zcode-emit — universal emit-wrapper helper (Mechanism 1, plan-v3 §"Mechanism 1").»; `plugin/hooks/_zcode-emit:5` «# Adoption is per-twin and OPTIONAL; zero existing twins source this today» | D8, F30 | MISSING |
| D26 | clone (dev harness) | `.claude/settings.json` — the framework's own harness settings: permission allow-list for the hook helpers (end-of-turn-reminder, ask-question-reminder) + egress denies (force-push) | `.claude/settings.json:7` «"Bash(bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/end-of-turn-reminder.sh\")",»; `.claude/settings.json:11` «"Bash(git push --force*)",» | D18, D6, F14 | MISSING |

---

## E — Templates + vendored renders (per-lane template trees)

Enumeration:
```
$ find packages/core/templates -type f | sort | sed 's|packages/core/templates/||'
cargo: Cargo.lints.toml clippy.toml deny.toml github-actions-ci.yml            (4)
go: .golangci.yml github-actions-ci.yml                                        (2)
python: .getff/astgrep-rules/getff-no-datetime-datetime-now.yml getff-no-datetime-now.yml
        getff-no-eval.yml getff-no-os-system.yml ARCHITECTURE.md RULES.md github-actions-ci.yml
        hooks/getff.pre-commit-config.yaml.fragment hooks/pre-push.sh ruff.toml sgconfig.yml   (11)
react-next: .storybook/main.ts .storybook/preview.ts                           (2)
shared: .lintstagedrc.json .nvmrc .prettierignore AGENTS.md.template AI-USAGE-GUIDE.md
        ARCHITECTURE.ts-server.md CLAUDE.md.template DESCRIPTION.template.md first-steps.source.json
        gitignore hooks-package.json husky-pre-commit.sh husky-pre-push.sh integration-rules.md
        skill-context/aif-orchestrator-discipline/SKILL.md skill-context/aif-review/SKILL.md
        skill-context/aif-rules-check/SKILL.md tier-home.md tsconfig.json     (19)
$ ls .claude/templates/ → session-bootstrap.md                                  (1)
```
Derived count: **39 items** (19 shared incl. the 3 skill-context files → C21-C23; 4 cargo; 2 go; 11 python;
2 react-next; +1 the framework harness session-bootstrap template).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| E1 | npm-lane | `.lintstagedrc.json` — lint-staged config the pre-commit hook runs | `packages/core/templates/shared/.lintstagedrc.json:1`; `setup.d/40-configs.sh:109` «copy_safe "$PKG_ROOT/packages/core/templates/shared/.lintstagedrc.json" "$PROJECT_ROOT/.lintstagedrc.json"» | D20 | PARTIAL /docs/daily-cycle-rules/ — «The pre-commit hook runs lint-staged on its own» (the hook behavior is documented; the delivered config file is not named) |
| E2 | npm-lane | `.nvmrc` — pinned node version seed | `packages/core/templates/shared/.nvmrc:1`; `setup.d/40-configs.sh:98` «copy_safe "$PKG_ROOT/packages/core/templates/shared/.nvmrc" "$PROJECT_ROOT/.nvmrc"» | A16 | MISSING |
| E3 | npm-lane | `.prettierignore` — managed block (ships full-depth at core) | `packages/core/templates/shared/.prettierignore:1`; `setup.d/lib.sh:65` «PRETTIERIGNORE_BEGIN='# >>> rules-as-tests-aif (managed) >>>'» | A4 | MISSING |
| E4 | npm-lane | `AGENTS.md.template` — the session-entry doc template | `packages/core/templates/shared/AGENTS.md.template:1` «# AGENTS.md — context for AI coding agents»; `setup.d/30-templates.sh` (delivery; tier-home sibling block); `packages/core/templates/shared/AGENTS.md.template:3` «> Read this file at the start of every session. It points to the source of truth for project rules and workf…»| E5 | PARTIAL /docs/daily-cycle-rules/ — «Read `AGENTS.md`, then the `.ai-factory/` doc it points at for your task» (AGENTS.md's role documented; the template artifact not named) |
| E5 | npm-lane | `AI-USAGE-GUIDE.md` — the AI-facing daily-cycle guide | `packages/core/templates/shared/AI-USAGE-GUIDE.md:1`; `packages/core/templates/shared/AI-USAGE-GUIDE.md:195` «4. **On push** — `.husky/pre-push` fires automatically: typecheck, `vitest related`,» (defect-2 site) | D20 | documented /docs/daily-cycle-rules/ — «The shipped AI Usage Guide spells the same loop for AI agents; this page is the human-voiced version» |
| E6 | npm-lane (ts-server stack) | `ARCHITECTURE.ts-server.md` — stack architecture template | `packages/core/templates/shared/ARCHITECTURE.ts-server.md:1` «# Architecture — server-side TypeScript»; `setup.d/40-configs.sh` (delivery family); `packages/core/templates/shared/ARCHITECTURE.ts-server.md:3` «> Layer rules and dependency direction. Enforced by `dependency-cruiser`.»| — | MISSING |
| E7 | npm-lane | `CLAUDE.md.template` — harness pointer doc | `packages/core/templates/shared/CLAUDE.md.template:1` «# Project context for Claude Code»; `setup.d/30-templates.sh` (delivery family); `packages/core/templates/shared/CLAUDE.md.template:3` «> Pointer file. Real context lives in `AGENTS.md` and `.ai-factory/`.»| E4 | MISSING |
| E8 | npm-lane (all tiers) | `DESCRIPTION.template.md` — the project passport | `packages/core/templates/shared/DESCRIPTION.template.md:61` «- the pre-push hook (`.husky/pre-push`) fires on `git push` (typecheck, `vitest related`, dependency-cruiser).» (defect-2 site); `packages/core/templates/shared/DESCRIPTION.template.md:1` (frontmatter) | A12 | documented /docs/first-steps-core/ — «3. **Fill the project passport** — replace every `<…>` placeholder field in `.ai-factory/DESCRIPTION.md`» |
| E9 | npm-lane (all tiers) | `first-steps.source.json` — SSOT for the three First-Steps sequences (JSON, parity-comparable) | `packages/core/templates/shared/first-steps.source.json:30` «"profileFlag": "-y (default; equivalently --profile core)",» (defect-1 site); `packages/core/templates/shared/first-steps.source.json` `_note` «SINGLE SOURCE OF TRUTH for the First-Steps sequences. Two renders read from it and NEITHER is the source»; `packages/core/templates/shared/first-steps.source.json:33` «          "id": "install",»| E5 | PARTIAL /docs/first-steps-core/ — the page's VENDORED RENDER header names it: «Source: packages/core/templates/shared/first-steps.source.json (schema getff.first-steps/v1, sequence "core")» (named as source; its SSOT role not explained on-page prose) |
| E10 | npm-lane | `gitignore` — seed .gitignore | `packages/core/templates/shared/gitignore:1`; `setup.d/40-configs.sh:105` «copy_safe "$PKG_ROOT/packages/core/templates/shared/gitignore" "$PROJECT_ROOT/.gitignore"» | — | MISSING |
| E11 | npm-lane | `hooks-package.json` — the {"type":"module"} marker making shipped pre-push.ts load as ESM | `packages/core/templates/shared/hooks-package.json:1`; `setup.d/50-hooks.sh:58` «copy_safe … "$PROJECT_ROOT/packages/core/hooks/package.json"» | D22 | MISSING |
| E12 | npm-lane | `husky-pre-commit.sh` — pre-commit rung | `packages/core/templates/shared/husky-pre-commit.sh:1` «#!/usr/bin/env sh»; `setup.d/50-hooks.sh:11` (copy) | D20 | documented /docs/quickstart-ts/ — «ESLint `no-explicit-any`-class rule blocks the commit \| pre-commit» |
| E13 | npm-lane | `husky-pre-push.sh` — pre-push dispatcher rung | `packages/core/templates/shared/husky-pre-push.sh:1` «#!/usr/bin/env bash»; `setup.d/50-hooks.sh:12` (copy) | D20-D22 | documented /docs/daily-cycle-rules/ — «`.husky/pre-push` fires automatically: rule-glob liveness, lint-staged resolution and generated-rule-material checks» |
| E14 | npm-lane | `integration-rules.md` — integration rules template | `packages/core/templates/shared/integration-rules.md:1` «---»; `setup.d/30-templates.sh` (delivery family); `packages/core/templates/shared/integration-rules.md:2` «description: Integration rules across microservices — API contracts, CDC, event schemas, mTLS, observability…»| — | MISSING |
| E15 | npm-lane (skill-context) | skill-context aif-orchestrator-discipline → C21 | `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:1` «---»; `packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md:2` «name: aif-orchestrator-discipline»| C21 | MISSING |
| E16 | npm-lane (skill-context) | skill-context aif-review → C22 | `packages/core/templates/shared/skill-context/aif-review/SKILL.md:1` «---»; `packages/core/templates/shared/skill-context/aif-review/SKILL.md:2` «name: aif-review-project-context»| C22 | MISSING |
| E17 | npm-lane (skill-context) | skill-context aif-rules-check → C23 | `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:1` «---»; `packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md:2` «name: aif-rules-check-project-context»| C23 | MISSING |
| E18 | npm-lane (env+/factory) | `tier-home.md` — tier-routing criteria (§2) + degradation matrix (§3) SSOT | `packages/core/templates/shared/tier-home.md:81` «\| no aif runtime (no `runtime-bridge` / no aif-handoff dispatcher) …»; `packages/core/templates/shared/tier-home.md:82` «\| no GLM subscription … `CLAUDE.md:108` …» (defect-5 site) | A12 | documented /docs/degradations/ — «rendered from its single owner, .ai-factory/tier-home.md §3» (whole-page render) |
| E19 | npm-lane | `tsconfig.json` — delivered tsconfig | `packages/core/templates/shared/tsconfig.json:1`; `setup.d/40-configs.sh:138` «copy_safe "$PKG_ROOT/packages/core/templates/shared/tsconfig.json" "$PROJECT_ROOT/tsconfig.json"» | — | MISSING |
| E20 | cargo-lane | `clippy.toml` — the clippy bans (incl. std::env::var disallowed-method) | `packages/core/templates/cargo/clippy.toml:1`; `setup.d/46-cargo.sh:12` «(i) fresh dir (no config) → copy whole template files (clippy.toml, deny.toml).» | A7 | documented /docs/quickstart-rust/ — «the shipped `clippy.toml` bans exactly that method» |
| E21 | cargo-lane | `deny.toml` — cargo-deny STARTER policy, all bans commented out | `packages/core/templates/cargo/deny.toml:1`; `packages/core/templates/cargo/deny.toml:9` «[bans]» (BS3-GAPS G1 probe) | A7 | documented /docs/quickstart-rust/ — «a `cargo-deny` starter policy file with no active bans — cargo-deny enforcement is on the roadmap» |
| E22 | cargo-lane | `Cargo.lints.toml` — the [lints.clippy] deny projection | `packages/core/templates/cargo/Cargo.lints.toml:1`; `setup.d/46-cargo.sh:4` «…clippy.toml bans + the [lints.clippy] deny projection» | A7 | MISSING |
| E23 | cargo-lane | `github-actions-ci.yml` (cargo) — the `-D clippy::disallowed_*` CI gate | `packages/core/templates/cargo/github-actions-ci.yml:1` «# generated by getff — do not edit by hand»; BS3-GAPS G1 probe «one step, `cargo clippy --all-targets -- -D clippy::disallowed_*`; no `cargo deny` step»; `packages/core/templates/cargo/github-actions-ci.yml:2` «# getff Rust enforcement workflow (ecosystem-wiring W4). Runs the getff clippy bans as a FAILING»| A7 | documented /docs/quickstart-rust/ — «the generated GitHub Actions workflow runs the same `-D clippy::disallowed_*` bans as a failing CI gate» |
| E24 | go-lane | `.golangci.yml` — the golangci-lint ban surface | `packages/core/templates/go/.golangci.yml:1`; `setup.d/47-go.sh:4` «# Ships the pre-rendered golangci-lint bundle (.golangci.yml authored at» | A8 | PARTIAL /docs/limits/ — «**Go** — golangci-lint ban configuration plus a pinned CI gate» (behavior sentence exists; file not named) |
| E25 | go-lane | `github-actions-ci.yml` (go) — pinned go CI gate | `packages/core/templates/go/github-actions-ci.yml:1`; `setup.d/47-go.sh:7` «# …it delivers the golangci-lint ban surface» | A8 | PARTIAL /docs/limits/ (same sentence as E24 — "pinned CI gate") |
| E26 | python-lane | `sgconfig.yml` — ast-grep project config | `packages/core/templates/python/sgconfig.yml:1` «# generated by getff — do not edit by hand»; /docs/quickstart-python/ «What lands» tree line «sgconfig.yml ← ast-grep project config (resolves .getff/astgrep-rules)»; `packages/core/templates/python/sgconfig.yml:2` «# ast-grep project config. `ruleDirs` is resolved RELATIVE TO THIS FILE (the consumer»| A6 | documented /docs/quickstart-python/ — tree entry «sgconfig.yml ← ast-grep project config (resolves .getff/astgrep-rules)» |
| E27 | python-lane | `ruff.toml` — ruff fast-path (TID251/TID253 + DTZ005) | `packages/core/templates/python/ruff.toml:1` «# generated by getff ruff backend v0 — do not edit by hand»; /docs/quickstart-python/ tree «ruff.toml ← ruff fast-path (TID251/TID253 import bans + DTZ005 naive datetime)»; `packages/core/templates/python/ruff.toml:3` «select = ["DTZ005", "TID251", "TID253"]»| A6 | documented /docs/quickstart-python/ (same tree sentence) |
| E28 | python-lane | ast-grep rule getff-no-eval | `packages/core/templates/python/.getff/astgrep-rules/getff-no-eval.yml:1` «# generated by getff astgrep backend v0 — do not edit by hand»; /docs/quickstart-python/ firing table «`eval(...)` \| getff `no-eval` ast-grep rule goes RED»; `packages/core/templates/python/.getff/astgrep-rules/getff-no-eval.yml:2` «id: "getff-no-eval"»| A6 | documented /docs/quickstart-python/ (table sentence) |
| E29 | python-lane | ast-grep rule getff-no-os-system | `packages/core/templates/python/.getff/astgrep-rules/getff-no-os-system.yml:1` «# generated by getff astgrep backend v0 — do not edit by hand»; /docs/quickstart-python/ firing table «`os.system(...)` \| getff `no-os-system` rule goes RED»; `packages/core/templates/python/.getff/astgrep-rules/getff-no-os-system.yml:2` «id: "getff-no-os-system"»| A6 | documented /docs/quickstart-python/ (table sentence) |
| E30 | python-lane | ast-grep rule getff-no-datetime-now | `packages/core/templates/python/.getff/astgrep-rules/getff-no-datetime-now.yml:1` «# generated by getff astgrep backend v0 — do not edit by hand»; /docs/quickstart-python/ firing table «`datetime.datetime.now()` \| `no-datetime[.datetime].now` rule, plus ruff `DTZ005`»; `packages/core/templates/python/.getff/astgrep-rules/getff-no-datetime-now.yml:2` «id: "getff-no-datetime-now"»| A6 | documented /docs/quickstart-python/ (table sentence) |
| E31 | python-lane | ast-grep rule getff-no-datetime-datetime-now (attribute form) | `packages/core/templates/python/.getff/astgrep-rules/getff-no-datetime-datetime-now.yml:1` «# generated by getff astgrep backend v0 — do not edit by hand»; /docs/quickstart-python/ (same table sentence covers both datetime forms); `packages/core/templates/python/.getff/astgrep-rules/getff-no-datetime-datetime-now.yml:2` «id: "getff-no-datetime-datetime-now"»| E30 | documented /docs/quickstart-python/ (table sentence names the pair) |
| E32 | python-lane | `.getff/ruff-bans.toml` — isolated bans config the CI gate points --config at; not a template file — WRITTEN by the python stage on fresh and every run | `setup.d/45-python.sh:27` «#   (bans) getff ruff bans                → ALWAYS written to .getff/ruff-bans.toml (fresh + every»; `setup.d/45-python.sh:367` «# \`ruff check . --config .getff/ruff-bans.toml --no-cache\` gate at, so the getff TID bans fire in EVERY» | A6 | documented /docs/quickstart-python/ — tree entry «ruff-bans.toml ← stable getff-bans config the CI gate points --config at» |
| E33 | python-lane | `hooks/pre-push.sh` (python) — the local pre-push rung (GETFF_SKIP_HOOKS=1 opt-out) | `packages/core/templates/python/hooks/pre-push.sh:1`; `setup.d/45-python.sh:887` «_py_deliver_local_hook_rung() {» | A6 | documented /docs/quickstart-python/ — tree «hooks/pre-push ← local git pre-push rung (skip: GETFF_SKIP_HOOKS=1)» |
| E34 | python-lane | `hooks/getff.pre-commit-config.yaml.fragment` — idempotent pre-commit append | `packages/core/templates/python/hooks/getff.pre-commit-config.yaml.fragment:1`; `setup.d/45-python.sh:885` «# The .pre-commit-config.yaml append is idempotent via a marker grep» | A6 | MISSING |
| E35 | python-lane | `github-actions-ci.yml` (python) — pinned `getff-python.yml` CI gate | `packages/core/templates/python/github-actions-ci.yml:1` «# generated by getff — do not edit by hand»; /docs/quickstart-python/ «`.github/workflows/getff-python.yml` runs `ast-grep scan` and `ruff check` as failing gates»; `packages/core/templates/python/github-actions-ci.yml:2` «# getff Python enforcement workflow (python-delivery-v0). Runs the getff ast-grep structural»| A6 | documented /docs/quickstart-python/ (that sentence) |
| E36 | python-lane | `ARCHITECTURE.md` + `RULES.md` (python) — lane doc templates | `packages/core/templates/python/ARCHITECTURE.md:1` «# Architecture — Python project»; `packages/core/templates/python/RULES.md:1` | E4 | MISSING |
| E37 | react-stack preset lane | `.storybook/main.ts` — storybook config seed | `packages/core/templates/react-next/.storybook/main.ts:1`; `setup.d/40-configs.sh:84` «copy_safe "$PKG_ROOT/packages/core/templates/react-next/.storybook/main.ts" "$PROJECT_ROOT/.storybook/main.ts"» | G6 | MISSING |
| E38 | react-stack preset lane | `.storybook/preview.ts` — storybook preview seed | `packages/core/templates/react-next/.storybook/preview.ts:1` «import type { Preview } from '@storybook/react';»; `setup.d/40-configs.sh:85` (copy) | G6 | MISSING |
| E39 | clone/plugin (harness) | session-bootstrap pair — `.claude/templates/session-bootstrap.md` (the render template) + `.claude/session-bootstrap.md` (the distinct, larger Step-0 read-first digest the inject hook actually consumes) | `.claude/hooks/inject-session-bootstrap.sh:4` «# Full bootstrap: .claude/session-bootstrap.md (Step 0 read-first file).»; `.claude/templates/session-bootstrap.md:1` (template member; enumerated by `ls .claude/templates/`) | D17, D4 | MISSING |

---

## F — Rules corpus + generated-rule tooling + shipped audit scripts

Enumeration:
```
$ ls .claude/rules/ | wc -l → 30 ; listing quoted in full in the anchors column (one row per file)
$ ls packages/core/eslint-rules/ | grep -E '\.ts$' | grep -v test → index.ts no-unsafe-zod-parse.ts
  no-direct-time-randomness.ts require-otel-span.ts restricted-syntax-audit-exempt.ts   (5)
$ ls scripts/render-*.mjs → render-harness-config.mjs render-install-roster.mjs render-presets.mjs
  render-rule-channels.mjs render-rule-index.mjs render-zcode-parity-rollup.mjs          (6)
$ grep -c 'copy_safe' setup.d/40-configs.sh (scripts/ payload arms) → 14 shipped scripts
```
Derived count: **56 items** (30 rules + 5 shipped eslint-rules + 6 render scripts + 1 bootstrap CLI + 14
shipped `scripts/` audit payload). The rules corpus is framework-internal discipline (`ships-to: clone` —
`setup.d/20-agents.sh:46` «(rules/ is not shipped)»); it anchors the enforcement the site DOES document.

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| F1 | clone | 00-rule-index — generated rule index | `.claude/rules/00-rule-index.md:1` «# Rule index — generated, do not hand-edit»; `scripts/render-rule-index.mjs` (generator, F51); `.claude/rules/00-rule-index.md:3` «> **Authoritative for:** rendered rule digest. Regen: `npx tsx scripts/render-rule-index.mjs --write`.»| F51 | MISSING |
| F2 | clone | ai-laziness-digest — resident hot digest of the traps | `.claude/rules/ai-laziness-digest.md:1` «# AI laziness traps — resident hot digest»; `inject-matching-rule` family (D11); `.claude/rules/ai-laziness-digest.md:3` «> **Class:** A — companion digest rule; full catalogue lives at [ai-laziness-traps.md §2](ai-laziness-traps.…»| F3 | MISSING |
| F3 | clone | ai-laziness-traps — T1-T19 trap catalogue | `.claude/rules/ai-laziness-traps.md:10` «# AI laziness traps — discipline rule»; E1-REPORT stage kickoffs cite §2; `.claude/rules/ai-laziness-traps.md:12` «<!-- globs: .claude/rules/**, .claude/skills/**, agents/**, .claude/orchestrator-prompts/**, docs/meta-facto…»| F2 | MISSING |
| F4 | clone | attention-is-not-a-mechanism — hope-as-gate prohibition | `.claude/rules/attention-is-not-a-mechanism.md:1` «# Attention is not a mechanism — discipline rule»; `.claude/rules/attention-is-not-a-mechanism.md:3` «> **Class:** C — prose-only; promotion criterion in §3.»| F3 | MISSING |
| F5 | clone | autonomous-loop-continuity — loop continuity discipline | `.claude/rules/autonomous-loop-continuity.md:5` «# Autonomous-loop continuity — discipline rule»; `.claude/rules/autonomous-loop-continuity.md:7` «<!-- channel: hook .claude/hooks/end-of-turn-reminder.sh#F10 -->»| — | MISSING |
| F6 | clone | build-first-reuse-default — build-first operating philosophy | `.claude/rules/build-first-reuse-default.md:15` «# Build-first, reuse-default — operating philosophy»; `.claude/rules/build-first-reuse-default.md:17` «> **Class:** A — companion principle test shipped at [packages/core/principles/11-build-first-reuse-default.…»| — | MISSING |
| F7 | clone | ci-tool-pinning — pin CI tools | `.claude/rules/ci-tool-pinning.md:16` «# CI tool pinning — discipline rule»; `.claude/rules/ci-tool-pinning.md:18` «> **Class:** A — companion principle test (paired-negative) shipped at `packages/core/hooks/unpinned-tool-in…»| — | MISSING |
| F8 | clone | cold-seat-economy — re-audit on substance | `.claude/rules/cold-seat-economy.md:1` «# Cold-seat economy — re-audit on substance, follow up with a fresh narrow seat»; `.claude/rules/cold-seat-economy.md:3` «<!-- channel: skill-embed .claude/skills/harvest/SKILL.md#seat-economy -->»| — | MISSING |
| F9 | clone | companion-install-principle — detect-first official-command installs | `.claude/rules/companion-install-principle.md:7` «# Companion / external-service install principle — discipline rule»; `.claude/rules/companion-install-principle.md:9` «<!-- globs: setup.d/** -->»| A10 | MISSING |
| F10 | clone | destination-environment-verification — verify the destination env | `.claude/rules/destination-environment-verification.md:7` «# Destination-environment verification — discipline rule»; `.claude/rules/destination-environment-verification.md:9` «<!-- globs: .claude/orchestrator-prompts/** -->»| — | MISSING |
| F11 | clone | doc-authority-hierarchy — doc authority order (enforced by D10) | `.claude/rules/doc-authority-hierarchy.md:13` «# Doc authority hierarchy — discipline rule»; `plugin/hooks/check-doc-authority` (D10); `.claude/rules/doc-authority-hierarchy.md:15` «> **Class:** A — companion principle test shipped at [packages/core/principles/09-doc-authority-hierarchy.te…»| D10 | MISSING |
| F12 | clone | dual-implementation-discipline — dual-channel implementation | `.claude/rules/dual-implementation-discipline.md:12` «# Dual-implementation discipline — discipline rule»; `.claude/rules/dual-implementation-discipline.md:14` «> **Class:** A — the §5 drift-check + §6 marker-presence sketches ship as an executable check: [tests/agnost…»| — | MISSING |
| F13 | clone | effort-worthiness — rigor must buy goal progress | `.claude/rules/effort-worthiness.md:1` «# Effort worthiness — rigor must buy goal progress»; `.claude/rules/effort-worthiness.md:3` «<!-- channel: skill-embed .claude/skills/dispatcher/SKILL.md#effort-worthiness -->»| — | MISSING |
| F14 | clone | egress-no-api-bypass — host-push-default egress | `.claude/rules/egress-no-api-bypass.md:1` «# Egress no-API-bypass — host-push-default discipline rule»; `.claude/rules/egress-no-api-bypass.md:3` «<!-- channel: skill-embed .claude/skills/harvest/SKILL.md#egress -->»| — | MISSING |
| F15 | clone | evidence-regeneration — verified recipes over re-derivation | `.claude/rules/evidence-regeneration.md:7` «# Evidence regeneration — discipline rule (verified recipe)»; `.claude/rules/evidence-regeneration.md:9` «<!-- globs: packages/core/backends/** -->»| — | MISSING |
| F16 | clone | git-conflict-merge-forward — merge-forward conflict policy | `.claude/rules/git-conflict-merge-forward.md:1` «# Git conflict merge-forward — discipline rule»; `.claude/rules/git-conflict-merge-forward.md:3` «<!-- channel: claude-md CLAUDE.md#merge-forward -->»| — | MISSING |
| F17 | clone | kickoff-staging-placement — dispatch-input placement discipline | `.claude/rules/kickoff-staging-placement.md:7` «# Kickoff staging-placement — dispatch-input discipline»; `.claude/rules/kickoff-staging-placement.md:9` «<!-- globs: .claude/orchestrator-prompts/** -->»| — | MISSING |
| F18 | clone | language-discipline — internal English, human-facing AIF_HOOK_LANG-gated | `.claude/rules/language-discipline.md:8` «# Language discipline — internal English, human-facing AIF_HOOK_LANG-gated»; `.claude/rules/language-discipline.md:10` «<!-- globs: .claude/hooks/**, .claude/skills/**, scripts/** -->»| D3 | MISSING |
| F19 | clone | memory-codification — codify durable conventions into the repo | `.claude/rules/memory-codification.md:1` «# Memory codification — discipline rule»; `plugin/hooks/inject-memory-codification` (D15); `.claude/rules/memory-codification.md:3` «<!-- channel: hook .claude/hooks/inject-memory-codification.sh -->»| D15 | MISSING |
| F20 | clone | no-paid-llm-in-ci — $0 LLM in CI | `.claude/rules/no-paid-llm-in-ci.md:7` «# No paid LLM in CI — discipline rule»; `.claude/rules/no-paid-llm-in-ci.md:9` «<!-- globs: .github/workflows/**, .github/actions/** -->»| — | PARTIAL /docs/faq/ — «$0 LLM calls in CI is enforced by a test in getff's own repo, not a marketing claim» (the existence is claimed; the rule file not named — correct per site scope) |
| F21 | clone | parallel-subwave-isolation — sub-wave worktree isolation | `.claude/rules/parallel-subwave-isolation.md:6` «# Parallel sub-wave isolation — discipline rule»; `.claude/rules/parallel-subwave-isolation.md:8` «<!-- globs: .claude/orchestrator-prompts/** -->»| — | MISSING |
| F22 | clone | phase-research-coverage — searching discipline | `.claude/rules/phase-research-coverage.md:10` «# Phase research coverage — searching discipline»; `.claude/rules/phase-research-coverage.md:12` «> **Class:** A — companion principle test shipped at [packages/core/principles/13-phase-research-coverage-s1…»| — | MISSING |
| F23 | clone | recommendation-laziness-discipline — mechanism layer | `.claude/rules/recommendation-laziness-discipline.md:1` «# Recommendation-laziness discipline — mechanism layer»; `.claude/rules/recommendation-laziness-discipline.md:3` «<!-- channel: digest .claude/hooks/inject-session-bootstrap.sh#H1 -->»| — | MISSING |
| F24 | clone | research-source-trust — source trust tiers | `.claude/rules/research-source-trust.md:12` «# Research-source trust tiers — discipline rule»; `.claude/rules/research-source-trust.md:14` «> **Class:** A — companion principle test shipped at [packages/core/principles/30-research-source-trust.test…»| B3 | MISSING |
| F25 | clone | reviewer-discipline (rules copy) — review-session protocol | `.claude/rules/reviewer-discipline.md:1` «# Reviewer discipline — discipline rule»; `.claude/rules/reviewer-discipline.md:3` «<!-- channel: agent agents/reviewer-discipline.md#reviewer-discipline -->»| C2 | MISSING |
| F26 | clone | rule-enforcement-channel-selection — channel selection | `.claude/rules/rule-enforcement-channel-selection.md:8` «# Rule-enforcement channel selection — discipline rule»; `.claude/rules/rule-enforcement-channel-selection.md:10` «> **Class:** A — companion principle test shipped at [packages/core/principles/31-rule-channel-declaration.t…»| — | PARTIAL /docs/daily-cycle-rules/ — «A convention with no check is not a rule» (the principle documented; the rule file not named) |
| F27 | clone | seat-lifecycle — SLP: one SSOT, four pointers | `.claude/rules/seat-lifecycle.md:10` «# Seat lifecycle protocol (SLP) — one SSOT, four pointers»; `.claude/rules/seat-lifecycle.md:12` «> **Class:** B — the compensating mechanism ships in the same PR: the all-four-carry-the-pointer»| — | MISSING |
| F28 | clone | skill-description-quality — SKILL.md description quality | `.claude/rules/skill-description-quality.md:10` «# SKILL.md description quality — discipline rule»; `.claude/rules/skill-description-quality.md:12` «> **Class:** C — prose-only; no current executable artifact. Promotion criterion in §3. Deferred per the R4b…»| B | MISSING |
| F29 | clone | source-before-shape — read the source before committing to a shape | `.claude/rules/source-before-shape.md:8` «# Source-before-shape — read the authoritative source before committing to a shape»; `.claude/rules/source-before-shape.md:10` «<!-- globs: .claude/skills/**, agents/**, .claude/orchestrator-prompts/** -->»| — | MISSING |
| F30 | clone | zcode-parity-doctrine — non-CC-harness parity doctrine | `.claude/rules/zcode-parity-doctrine.md:15` «# ZCode parity doctrine — discipline rule»; window commit `0d9fb65f2f` «docs(doctrine): rows 21/22 — ZCode compaction shipped, but no hook lifecycle to ride (#1696)»; `.claude/rules/zcode-parity-doctrine.md:17` «> **Class:** A — companion principle test shipped at [packages/core/principles/09-doc-authority-hierarchy.te…»| D8 | MISSING |
| F31 | npm-lane (pre-push barrel) | eslint-rules/index.ts — the barrel guard-liveness depends on | `packages/core/eslint-rules/index.ts:1`; `setup.d/50-hooks.sh:41` «echo "▶ Core ESLint rules → packages/core/eslint-rules/"» | D22, F32-F35 | MISSING |
| F32 | npm-lane (pre-push barrel) | no-unsafe-zod-parse — generated eslint rule | `packages/core/eslint-rules/no-unsafe-zod-parse.ts:1` «import { ESLintUtils } from '@typescript-eslint/utils';»; `setup.d/50-hooks.sh:44` (barrel loop arm) | F31 | MISSING |
| F33 | npm-lane (pre-push barrel) | no-direct-time-randomness — generated eslint rule | `packages/core/eslint-rules/no-direct-time-randomness.ts:1` «import { ESLintUtils } from '@typescript-eslint/utils';»; `setup.d/50-hooks.sh:45` (barrel loop arm) | F31 | MISSING |
| F34 | npm-lane (pre-push barrel) | require-otel-span — generated eslint rule | `packages/core/eslint-rules/require-otel-span.ts:1` «import { ESLintUtils } from '@typescript-eslint/utils';»; `setup.d/50-hooks.sh:46` (barrel loop arm) | F31 | MISSING |
| F35 | npm-lane (pre-push barrel) | restricted-syntax-audit-exempt — generated eslint rule | `packages/core/eslint-rules/restricted-syntax-audit-exempt.ts:1` «import { ESLintUtils } from '@typescript-eslint/utils';»; `setup.d/50-hooks.sh:47` (barrel loop arm) | F31 | MISSING |
| F36 | npm-lane (clone) | render-rule-index.mjs — re-render + --check the AGENTS.md rule index (pre-push wired) | `packages/core/hooks/pre-push.ts:1352` «const r = run('npx', ['tsx', 'scripts/render-rule-index.mjs', '--check']);»; `scripts/render-rule-index.mjs:1` | D22 | documented /docs/executable-agents-md/ — «`scripts/render-rule-index.mjs --check` re-renders it from the actual rule files on disk and exits 1 on any drift» |
| F37 | clone | render-presets.mjs — renders pipeline preset data | `scripts/render-presets.mjs:1` «#!/usr/bin/env node»; `content/docs/daily-cycle-factory.md` preset block «vendored from the shipped preset data (`.claude/skills/pipeline/references/presets/*.json`…)» (site names the DATA, not this renderer); `scripts/render-presets.mjs:3` « * render-presets — deterministic launch-preset section for AI-USAGE-GUIDE.md»| B8 | MISSING |
| F38 | clone | render-rule-channels.mjs — renders rule channel table | `scripts/render-rule-channels.mjs:1` «#!/usr/bin/env node»; `scripts/render-rule-channels.mjs:3` « * render-rule-channels — CTX Stage 3, "channel-as-data" lite (design §4 Тезис B).»| F1 | MISSING |
| F39 | clone | render-zcode-parity-rollup.mjs — zcode parity rollup | `scripts/render-zcode-parity-rollup.mjs:1` «#!/usr/bin/env node»; `scripts/render-zcode-parity-rollup.mjs:3` « * render-zcode-parity-rollup — PROPOSAL renderer (maintainer sign-off pending; S3 D3, P1).»| F30 | MISSING |
| F40 | clone | render-harness-config.mjs — harness config renderer | `scripts/render-harness-config.mjs:1` «#!/usr/bin/env node» (touched in drift window); `scripts/render-harness-config.mjs:3` « * render-harness-config — derive per-harness runtime config from ONE neutral SSOT.»| — | MISSING |
| F41 | clone | render-install-roster.mjs — install roster renderer | `scripts/render-install-roster.mjs:1` «#!/usr/bin/env node»; `scripts/render-install-roster.mjs:3` « * render-install-roster — deterministic consumer install roster for INSTALL-FOR-AI.md»| A | MISSING |
| F42 | npm-lane (--full) | `packages/core/install/rule-bootstrap-cli.ts` — the deterministic research→rule factory entry | `setup.d/80-rule-bootstrap.sh:7` «#   FileResearchClient + FileGenerateClient → generate.ts factory → install() → rules-lock.json»; `setup.d/80-rule-bootstrap.sh:8` «# Payload: packages/core/install/rule-bootstrap-cli.ts (the shared entry).» | A18, B3, C12 | PARTIAL /docs/quickstart-python/ — «Author a practice record […] and run the bootstrap CLI with `--from-practice`: a valid record renders to `.getff/rules-research/<entryId>.yml`» ([…] marks an editorial elision: the page's parenthetical «(provenance-cited, from your framework's real docs)» at content/docs/quickstart-python.md:82-83; python-lane flow documented; the shared CLI itself not named) |
| F43 | npm-lane | scripts/audit-ai-docs.sh — the daily drift + code-vs-docs gate | `setup.d/40-configs.sh:14` «copy_safe "$PKG_ROOT/packages/core/audit-self/audit-ai-docs.sh" "$PROJECT_ROOT/scripts/audit-ai-docs.sh"» (copy); `packages/core/audit-self/audit-ai-docs.sh:1` (source) | A13 | documented /docs/daily-cycle-rules/ — «`bash scripts/audit-ai-docs.sh` — drift + code-vs-docs probes» |
| F44 | npm-lane | scripts/audit-r4.ts — R4 audit probe | `setup.d/40-configs.sh:17` «copy_safe "$PKG_ROOT/packages/core/probes/audit-r4.ts" "$PROJECT_ROOT/scripts/audit-r4.ts"»; `setup.d/40-configs.sh:18` «# cih-s3 F3 "+V": glob-liveness gate — fails if a custom rule matches zero source files»| F43 | MISSING |
| F45 | npm-lane | scripts/check-rule-globs.sh — fails when a shipped rule matches zero files | `setup.d/40-configs.sh:20` (copy); `packages/core/hooks/pre-push.ts:940` «if (existsSync(resolve(REPO_ROOT, 'scripts/check-rule-globs.sh'))) {» (pre-push consumer gate) | D22 | documented /docs/first-steps-core/ — «4. **Prove the rules are not inert on your layout** — `bash scripts/check-rule-globs.sh`» |
| F46 | npm-lane | scripts/check-rule-enforced.sh | `setup.d/40-configs.sh:27` «copy_safe … check-rule-enforced.sh»; `setup.d/40-configs.sh:28` «chmod_safe +x "$PROJECT_ROOT/scripts/check-rule-enforced.sh" 2>/dev/null \|\| true»| F45 | MISSING |
| F47 | npm-lane | scripts/detect-r2-boundary.sh + r2-na-marker.sh | `setup.d/40-configs.sh:33` «copy_safe "$PKG_ROOT/packages/core/audit-self/detect-r2-boundary.sh" "$PROJECT_ROOT/scripts/detect-r2-bounda…» (copy); `setup.d/40-configs.sh:35` (copy) | F43 | MISSING |
| F48 | npm-lane | scripts/check-arch-boundaries.sh | `setup.d/40-configs.sh:42` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-arch-boundaries.sh" "$PROJECT_ROOT/scripts/check-arch-bo…» (copy); `setup.d/40-configs.sh:43` «chmod_safe +x "$PROJECT_ROOT/scripts/check-arch-boundaries.sh" 2>/dev/null \|\| true»| — | MISSING |
| F49 | npm-lane | scripts/check-lintstaged-resolves.sh | `setup.d/40-configs.sh:46` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-lintstaged-resolves.sh" "$PROJECT_ROOT/scripts/check-lin…» (copy); /docs/daily-cycle-rules/ «also `bash scripts/check-lintstaged-resolves.sh`»; `setup.d/40-configs.sh:47` «chmod_safe +x "$PROJECT_ROOT/scripts/check-lintstaged-resolves.sh" 2>/dev/null \|\| true»| E1 | documented /docs/daily-cycle-rules/ — «When you touched layout or added a package, also `bash scripts/check-rule-globs.sh` and `bash scripts/check-lintstaged-resolves.sh`» |
| F50 | npm-lane | scripts/check-fences-fire.sh (+fixtures) — plants bad input, asserts rules go RED | `setup.d/40-configs.sh:51` (copy); `setup.d/40-configs.sh:54` «copy_safe "$PKG_ROOT/packages/core/audit-self/fixtures/fences-fire" "$PROJECT_ROOT/scripts/fences-fire-fixtures"» | D24 | documented /docs/first-steps-core/ — «5. **Watch a rule actually fire** — `bash scripts/check-fences-fire.sh`» |
| F51 | npm-lane | scripts/check-shields-up.sh | `setup.d/40-configs.sh:57` «copy_safe "$PKG_ROOT/packages/core/audit-self/check-shields-up.sh" "$PROJECT_ROOT/scripts/check-shields-up.sh"» (copy); `setup.d/40-configs.sh:58` «chmod_safe +x "$PROJECT_ROOT/scripts/check-shields-up.sh" 2>/dev/null \|\| true»| — | MISSING |
| F52 | npm-lane | scripts/run-generated-rule-mutation.sh — stryker mutation gate for generated rules | `setup.d/40-configs.sh:61` «copy_safe "$PKG_ROOT/packages/core/synthesizer/run-generated-rule-mutation.sh" "$PROJECT_ROOT/scripts/run-ge…» (copy); `setup.d/40-configs.sh:62` «chmod_safe +x "$PROJECT_ROOT/scripts/run-generated-rule-mutation.sh" 2>/dev/null \|\| true»| — | PARTIAL /docs/quickstart-ts/ — «the shipped incremental mutation gate in CI (`stryker`, score break 60) fails the build when changed lines are guarded by tests that kill nothing» (gate behavior claimed; script not named) |
| F53 | npm-lane | scripts/run-rule-tests-firing.sh — firing-test runner | `setup.d/40-configs.sh:66` «copy_safe "$PKG_ROOT/packages/core/synthesizer/run-rule-tests-firing.sh" "$PROJECT_ROOT/scripts/run-rule-tes…» (copy); `setup.d/40-configs.sh:67` «chmod_safe +x "$PROJECT_ROOT/scripts/run-rule-tests-firing.sh" 2>/dev/null \|\| true»| B4 | MISSING |
| F54 | npm-lane | scripts/pre-merge-local.sh — opt-in local all-lane pre-merge | `setup.d/40-configs.sh:72` «copy_safe "$PKG_ROOT/packages/core/audit-self/pre-merge-local.sh" "$PROJECT_ROOT/scripts/pre-merge-local.sh"» (copy); /docs/daily-cycle-rules/ «`bash scripts/pre-merge-local.sh` runs every detected lane's gates on the merge result locally before you push — opt-in»; `setup.d/40-configs.sh:73` «chmod_safe +x "$PROJECT_ROOT/scripts/pre-merge-local.sh" 2>/dev/null \|\| true»| A5 | documented /docs/daily-cycle-rules/ (that sentence) |
| F55 | npm-lane | scripts/ci-available-probe.sh — classifies Actions-minutes exhaustion as CI UNAVAILABLE | `setup.d/40-configs.sh:74` «copy_safe "$PKG_ROOT/packages/core/audit-self/ci-available-probe.sh" "$PROJECT_ROOT/scripts/ci-available-pro…» (copy); /docs/daily-cycle-rules/ «`bash scripts/ci-available-probe.sh` (shipped on npm-lane installs only) classifies that state as `CI UNAVAILABLE`»; `setup.d/40-configs.sh:75` «chmod_safe +x "$PROJECT_ROOT/scripts/ci-available-probe.sh" 2>/dev/null \|\| true»| A16 | documented /docs/daily-cycle-rules/ (that sentence) |
| F56 | react preset lanes | preset audit scripts — audit-ai-docs.react-next.sh / .react-spa.sh / .react-native.sh | `setup.d/40-configs.sh:77` «copy_safe "$PKG_ROOT/packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh" …»; `setup.d/40-configs.sh:88,92` (spa, native arms); `setup.d/40-configs.sh:78` «  chmod_safe +x "$PROJECT_ROOT/scripts/audit-ai-docs.react-next.sh" 2>/dev/null \|\| true»| G5-G7 | MISSING |

---

## G — npm packages + preset data + dist packaging

Enumeration:
```
$ ls packages/
core
getff
lint-config
meta-factory
preset-next-15-canonical
preset-react-native
preset-react-spa
runtime-bridge
$ for p in packages/*/package.json; do grep -m1 '"name"' "$p"; done
  "name": "@rules-as-tests/core", / "name": "getff", / "name": "@rules-as-tests/lint-config",
  "name": "@rules-as-tests/meta-factory", / "name": "@rules-as-tests/preset-next-15-canonical",
  "name": "@rules-as-tests/preset-react-native", / "name": "@rules-as-tests/preset-react-spa",
  "name": "@rules-as-tests-aif/runtime-bridge",
$ ls .claude/skills/pipeline/references/presets/
aif.json  economy.json  night.json  sdd.json
```
Derived count: **9 items** — 7 of the 8 workspace packages (the 8th, `runtime-bridge`, is enumerated here and
rowed as H1 per the family boundary) + the pipeline preset data quartet + the dist-packaging machinery.
`private: false` on exactly one package (`getff`) — everything else is workspace-only; its CONTENTS reach
consumers as files through the A-stages, never as npm artifacts. Workspace root: `package.json:2` «"name":
"rules-as-tests-aif-workspace",» + `package.json:6` «"packages/*"» (workspaces glob).

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| G1 | npm (published) | `getff` — the ONLY registry-published package; `bin/getff` hands `init` args to the shipped `setup` orchestrator; tarball lays out exactly as the repo root (PKG_ROOT-relative reads unchanged; no runtime clone fetch) | `packages/getff/package.json:4` «"private": false,»; `packages/getff/package.json:5` «"description": "getff — AI DX for your codebase: conventions AI agents can't silently bypass. \`npx getff init\` installs the enforcement layer (ESLint rules generated from live docs, husky gates, CI) into a TypeScript, Python, Rust or Go project.",»; `packages/getff/bin/getff:4` «#   npx getff init [<stack>] [-y] [--profile core\|env\|factory] [--dry-run] ...» | A1, A2, G9 | PARTIAL /docs/beta/ — «The one-command install path (`npx getff@latest init`) is **not published yet** — the install command will be announced with the beta» (path + unpublished status documented; the package payload layout not described anywhere) |
| G2 | clone (payload source) | `@rules-as-tests/core` — workspace-private core payload: rule manifest main, ESLint rules, toolchain, templates, skills, install wiring; contents delivered file-wise by A11-A13/A17/A20 | `packages/core/package.json:5` «"description": "Framework core for rules-as-tests — discipline-bearing code as the project's contract artifact. Ships the rule manifest, ESLint rules, detector/research/synthesizer/installer toolchain, templates, skills, and install wiring.",»; `packages/core/package.json:8` «"main": "./manifest/rules-manifest.json",» | A13, F31-F35, G9 | MISSING (the package ARTIFACT; its contents are documented per-item in A/E/F) |
| G3 | clone | `@rules-as-tests/lint-config` — shared markdownlint structural config for the workspace | `packages/lint-config/package.json:6` «"description": "Shared markdownlint structural config for rules-as-tests-aif workspace",»; `packages/lint-config/package.json:4` «"private": true,» | — | MISSING |
| G4 | clone (consumed by A18) | `@rules-as-tests/meta-factory` — the deterministic research→rule factory CLI (`meta-factory` bin) | `packages/meta-factory/package.json:8` «"meta-factory": "./bin/meta-factory.mjs"»; `packages/meta-factory/package.json:4` «"private": true,» | A18, B3, F42 | MISSING |
| G5 | react-stack preset lane | `@rules-as-tests/preset-next-15-canonical` — frozen Next-15 snapshot: eslint-rules entry, RULES.react-next.md, audit-self, templates; pins anchor the #811 deps-free staleness WARN; FALLBACK baseline (prefer live-research) | `packages/preset-next-15-canonical/preset.meta.json:5` «"note": "Frozen Next-15 canonical preset snapshot. The pinned tool majors below anchor the #811 staleness guard: a deps-free install-time WARN fires when the consumer's installed major differs (setup.d/99-finalize.sh → warn_preset_staleness in setup.d/lib.sh). Presets are the FALLBACK baseline — prefer live-research delivery for rules matching your current versions.",»; `packages/preset-next-15-canonical/package.json:7` «"main": "./eslint-rules/index.ts",» | A20 (staleness WARN), F56, E37-E38 | MISSING (the /docs/beta/ lane sentence names the react-next lane via the plugin, never the preset package) |
| G6 | react-stack preset lane | `@rules-as-tests/preset-react-spa` — react-spa preset package (no preset.meta.json — no staleness pins, unlike G5) | `packages/preset-react-spa/package.json:2` «"name": "@rules-as-tests/preset-react-spa",»; `packages/preset-react-spa/package.json:4` «"private": true,» | F56 | MISSING |
| G7 | react-stack preset lane | `@rules-as-tests/preset-react-native` — react-native preset package (no preset.meta.json) | `packages/preset-react-native/package.json:2` «"name": "@rules-as-tests/preset-react-native",»; `packages/preset-react-native/package.json:4` «"private": true,» | F56 | MISSING |
| G8 | env+ (via B8) | Pipeline preset data quartet — aif/economy/night/sdd run configurations the pipeline resolves to KEY=VALUE | `.claude/skills/pipeline/references/presets/aif.json:2` «"mode": "autonomous",»; `.claude/skills/pipeline/helpers/resolve-preset.sh:2` «# resolve-preset.sh — resolve a pipeline launch preset to shell-evaluable KEY=VALUE lines.» | B8, F37 | documented /docs/daily-cycle-factory/ — «The list below is vendored from the shipped preset data (`.claude/skills/pipeline/references/presets/*.json`, read at framework `staging` `94a3a9efcd`; the landing carries no mechanical regen check — re-vendor on upgrade)» + the four named rows |
| G9 | npm (release engineering) | Dist packaging: build-getff-dist.sh assembles `packages/getff` from repo root, rewrites MANIFEST.sha256, prepack check-gates publication; payload gitignored, manifest committed | `scripts/build-getff-dist.sh:2` «# build-getff-dist.sh — assemble the `getff` distribution package (packages/getff) from the repo root.»; `scripts/build-getff-dist.sh:97` «[ -f "$MANIFEST" ] \|\| fail "DRIFT: $MANIFEST missing — run: scripts/build-getff-dist.sh"»; `packages/getff/package.json:39` «"prepack": "bash ../../scripts/build-getff-dist.sh --check && bash ../../scripts/build-getff-dist.sh"» | G1 | MISSING |

---

## H — runtime-bridge (aif dispatch)

Enumeration:
```
$ ls packages/runtime-bridge/
DESIGN.md  README.md  node_modules  package.json  scripts  src  test  tsconfig.json  vendor  vitest.config.ts
$ find packages/runtime-bridge -type f \( -name '*.ts' -o -name '*.json' -o -name '*.md' \) ! -name '*.test.ts' ! -path '*node_modules*' | sort
  (24 src-tree files: 11 src/*.ts incl. index.ts + 11 src/cli/*.ts + DESIGN.md + README.md + package.json + tsconfig.json + vitest.config.ts;
   21 vendor files: vendor/package.json + vendor/README.md + 19 vendor/src/*.ts — the vendor copy has NO
   AifFireBackend.ts, NO src/index.ts, NO cli/await.ts)
$ ls packages/runtime-bridge/scripts/  → bridge-cleanup.sh bridge-health.sh setup-runtime-bridge.sh verify-bridge.sh
$ ls packages/runtime-bridge/test/ | wc -l  → 23
```
Derived count: **24 items** — 22 src files grouped into 20 items (H1 packs the package shell: package.json +
index.ts + README + DESIGN + tsconfig + vitest.config; H8 packs src/harvest.ts + cli/harvest.ts; H13 packs
backend.ts + types.ts) + the vendored subset (H21) + the operator scripts quartet (H22) + the 23-file test
suite (H23) + the orchestrator-prompts staging homes (H24, accounted here because dispatch/kickoff consume
them). ships-to: the vendor subset installs at `--profile factory` via A15; the full package, Fire
backend, await CLI, and tests are clone-only.

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| H1 | factory (vendor) / clone (full) | The runtime-bridge package shell + public API — adapter for `/pipeline` cross-session dispatch; README is the CLI reference, DESIGN the §1.7-checked sketch | `packages/runtime-bridge/src/index.ts:2` «* @rules-as-tests-aif/runtime-bridge — public API»; `packages/runtime-bridge/src/index.ts:4` «* Runtime-bridge adapter for /pipeline cross-session dispatch.»; `packages/runtime-bridge/package.json:2` «"name": "@rules-as-tests-aif/runtime-bridge",» | B10, H21 | PARTIAL /docs/degradations/ — «Tier 1 (bridge-profile marker mechanic) and Tier 2 dispatch defaults both become unreachable — the `packages/runtime-bridge` header-region parse and the aif runtime profile config do not exist on the consumer's machine.» (the package is named as the dispatch mechanic; its CLI surface is not) |
| H2 | factory (vendor) | `dispatch.ts` — CLI dispatch entrypoint, invoked by the PostToolUse hook or manually; takes a kickoff path | `packages/runtime-bridge/src/cli/dispatch.ts:2` «* CLI dispatch entrypoint — invoked by the PostToolUse hook, or manually on demand.»; `packages/runtime-bridge/src/cli/dispatch.ts:4` «* Usage: tsx packages/runtime-bridge/src/cli/dispatch.ts <kickoff-path> [--force]» | H1, H18, H19 | PARTIAL /docs/daily-cycle-factory/ — «Dispatch the launch table's top row, then bring the finished branch back with `/harvest`.» (the dispatch BEAT is documented as operator workflow; the CLI/hook invocation path is not) |
| H3 | factory (vendor) | `claim.ts` — the operator/skill-facing half of two-phase dispatch (`claim create <kickoff-path>` …) | `packages/runtime-bridge/src/cli/claim.ts:2` «* CLI claim entrypoint — the operator/skill-facing half of two-phase dispatch.»; `packages/runtime-bridge/src/cli/claim.ts:5` «*   tsx packages/runtime-bridge/src/cli/claim.ts create <kickoff-path>» | H2 | MISSING |
| H4 | factory (vendor) | `park.ts` — the agent-side «I hit a hard fork, stop and ask» half | `packages/runtime-bridge/src/cli/park.ts:3` «* CLI park entrypoint — the agent-side "I hit a hard fork, stop and ask" half.»; `packages/runtime-bridge/src/cli/park.ts:5` «* Usage (the autonomous agent runs this on a genuine BLOCKING fork it cannot default):» | H5, H7 | MISSING |
| H5 | factory (vendor) | `openQuestion.ts` — the single shared OPEN-QUESTION anchor; written by park.ts into the parked task's plan | `packages/runtime-bridge/src/cli/openQuestion.ts:3` «* The single shared OPEN-QUESTION anchor.»; `packages/runtime-bridge/src/cli/openQuestion.ts:5` «* Written by park.ts (writer) as a heading appended to a parked task's plan, and» | H4, H6 | MISSING |
| H6 | factory (vendor) | `answer.ts` — pushes the resolved answer back and resumes (`--task <id> --answer <text> [--decision request_changes]`) | `packages/runtime-bridge/src/cli/answer.ts:2` «* CLI answer entrypoint — the "push the resolved answer back + resume" half of the bridge.»; `packages/runtime-bridge/src/cli/answer.ts:5` «*   tsx packages/runtime-bridge/src/cli/answer.ts --task <id> --answer "<text>" [--decision request_changes] [--json]» | H4 | MISSING |
| H7 | factory (vendor) | `questions.ts` — the parked-questions collector (`[--project <id>] [--json]`) | `packages/runtime-bridge/src/cli/questions.ts:2` «* CLI questions entrypoint — the "parked questions" collector half of the bridge.»; `packages/runtime-bridge/src/cli/questions.ts:5` «*   tsx packages/runtime-bridge/src/cli/questions.ts [--project <id>] [--json]» | H4 | MISSING |
| H8 | factory (vendor) / clone | `harvest.ts` (lib + CLI) — the deterministic egress leg: brings a finished worker branch back as a PR; two invocation layouts (framework tree vs consumer `.claude/vendor/runtime-bridge/`) | `packages/runtime-bridge/src/cli/harvest.ts:2` «* CLI harvest entrypoint — the deterministic egress leg of the bridge.»; `packages/runtime-bridge/src/cli/harvest.ts:5` «* `.claude/vendor/runtime-bridge/src/cli/harvest.ts` — see setup.d/55-runtime-bridge-vendor.sh):» | H1, A15, B12 | documented /docs/daily-cycle-factory/ — «then bring the finished branch back with `/harvest`» |
| H9 | factory (vendor) | `ensure-parallel.ts` — the self-heal half of Finding A (dirty_worktree) | `packages/runtime-bridge/src/cli/ensure-parallel.ts:3` «* CLI ensure-parallel entrypoint — the self-heal half of Finding A (dirty_worktree).»; `packages/runtime-bridge/src/cli/ensure-parallel.ts:5` «* Usage (operator, smoke, or auto pre-dispatch):» | H2 | MISSING |
| H10 | clone | `await.ts` — the result read-back half (`await <taskId> [--timeout-ms N]`); NOT in the vendor copy | `packages/runtime-bridge/src/cli/await.ts:2` «* CLI await/status entrypoint — the result read-back half of the bridge.»; `packages/runtime-bridge/src/cli/await.ts:5` «*   tsx packages/runtime-bridge/src/cli/await.ts <taskId> [--timeout-ms N]» | H1, H21 | MISSING |
| H11 | factory (vendor) | `aifHttp.ts` — shared REST helpers: the SINGLE request implementation for every CLI and the ws status snapshot; one BackendError mapping (connection → unavailable, 429 → quota_exceeded, other → dispatch_failed) | `packages/runtime-bridge/src/cli/aifHttp.ts:3` «* Shared aif-handoff REST helpers — the SINGLE request implementation for every CLI in»; `packages/runtime-bridge/src/cli/aifHttp.ts:5` «* mapping (connection → unavailable, 429 → quota_exceeded, other → dispatch_failed) and» | H15 | MISSING |
| H12 | factory (vendor) | `cliEntry.ts` — shared entrypoint plumbing for every CLI: realpath'd isMain guard + strict parseArgs wrapper (A6-1/A6-4/A6-7/R-6 fixes) | `packages/runtime-bridge/src/cli/cliEntry.ts:3` «* Shared entrypoint plumbing for every runtime-bridge CLI: the main-module guard»; `packages/runtime-bridge/src/cli/cliEntry.ts:4` «* and argv parsing. Both used to be copy-pasted per CLI, and both had defects the» | H2, H3 | MISSING |
| H13 | factory (vendor) | `backend.ts` + `types.ts` — the RuntimeBackend contract every backend implements, and the shared MVP shapes | `packages/runtime-bridge/src/backend.ts:2` «* RuntimeBackend interface — the common contract for all runtime bridge backends.»; `packages/runtime-bridge/src/types.ts:2` «* Core type definitions for the runtime-bridge adapter.» | H14-H17 | MISSING |
| H14 | clone / factory (vendor) | `resolver.ts` — selects the active RuntimeBackend at session start; resolution order keys on `RUNTIME_BRIDGE_MODE` (manual / aif-handoff / auto) | `packages/runtime-bridge/src/resolver.ts:2` «* Preference resolver — selects the active RuntimeBackend at session start.»; `packages/runtime-bridge/src/resolver.ts:5` «*   1. RUNTIME_BRIDGE_MODE env var override (manual / aif-handoff / auto)» | H13 | PARTIAL /docs/degradations/ — «**C3 probe class: model-tier availability enumerator** over `runtime-bridge/runtime-profiles` resolution + `AifHandoffBackend.ts` two-step resolver behaviour when the named executor profile is absent.» (resolver behaviour named in a TO-BE-VALIDATED probe cell; the env-var override is not documented) |
| H15 | factory (vendor) | `AifHandoffBackend.ts` — the default adapter for the lee-to/aif-handoff runtime; DISPATCH = REST :3009; bridge-profile marker → runtime-profile id via GET /runtime-profiles | `packages/runtime-bridge/src/AifHandoffBackend.ts:2` «* AifHandoffBackend — adapter for the lee-to/aif-handoff runtime.»; `packages/runtime-bridge/src/AifHandoffBackend.ts:4` «* DISPATCH = REST (:3009). Verdict from research-patch»; `packages/runtime-bridge/src/AifHandoffBackend.ts:180` «* marker) to a concrete runtime-profile id via GET /runtime-profiles.» | H11, H14 | PARTIAL /docs/degradations/ — «**C3 probe class: model-tier availability enumerator** over `runtime-bridge/runtime-profiles` resolution + `AifHandoffBackend.ts` two-step resolver behaviour …» (the backend is named; the REST :3009 dispatch mechanics are not) |
| H16 | clone (operator opt-in) | `AifFireBackend.ts` — honest dispatch-only adapter for CC Routines `/fire` API (bearer token + anthropic-beta header); NEVER the default | `packages/runtime-bridge/src/AifFireBackend.ts:2` «* AifFireBackend — honest dispatch-only adapter for CC Routines `/fire` API.»; `packages/runtime-bridge/src/AifFireBackend.ts:5` «* This backend is **operator opt-in** — it is NEVER the default; REST» | H13 | MISSING |
| H17 | factory (vendor) | `ManualBackend.ts` — the always-available fallback backend (copies kickoff to /tmp and prints instructions) | `packages/runtime-bridge/src/ManualBackend.ts:2` «* ManualBackend — always-available fallback backend.»; `packages/runtime-bridge/src/ManualBackend.ts:5` «*   dispatch: copies kickoff to /tmp/runtime-bridge-<task-id>.md, prints» | H13 | MISSING |
| H18 | factory (vendor) | `idempotency.ts` — content-hash dispatch dedup; state at `$RUNTIME_BRIDGE_DEDUP_PATH` (default /tmp/runtime-bridge-dedup.jsonl) | `packages/runtime-bridge/src/idempotency.ts:2` «* Content-hash idempotency for dispatch deduplication.»; `packages/runtime-bridge/src/idempotency.ts:4` «* State path: $RUNTIME_BRIDGE_DEDUP_PATH, default /tmp/runtime-bridge-dedup.jsonl» | H2 | MISSING |
| H19 | factory (vendor) | `kickoff.ts` — KickoffSpec builder: reads kickoff.md, computes SHA-256 of content, derives umbrellaName from the parent directory | `packages/runtime-bridge/src/kickoff.ts:2` «* KickoffSpec builder — constructs a KickoffSpec from a file path.»; `packages/runtime-bridge/src/kickoff.ts:4` «* Reads kickoff.md from disk, computes SHA-256 hash of content,» | H2 | MISSING |
| H20 | clone | `aifWsStatus.ts` — WebSocket-based status consumer for aif-handoff tasks (SW-C schema discovery) | `packages/runtime-bridge/src/aifWsStatus.ts:2` «* aifWsStatus — WebSocket-based status consumer for aif-handoff tasks.»; `packages/runtime-bridge/src/aifWsStatus.ts:5` «* SW-C SCHEMA DISCOVERY (kickoff §SCHEMA DISCOVERY FIRST requirement)» | H1 | MISSING |
| H21 | factory | `vendor/` — the S5 A7 vendored COPY (not a dependency): minimum-for-dispatch subset, `{"type":"module"}`, tsx peer-dep; deliberately drops AifFireBackend, index.ts, cli/await.ts vs the dev tree | `packages/runtime-bridge/vendor/package.json:6` «"description": "S5 A7 vendored COPY (not a dep) of the runtime-bridge dispatch subset. See README.md.",»; `packages/runtime-bridge/vendor/README.md:16` «## What this is — COPY, not a dependency» | A15, H1, H10, H16 | MISSING |
| H22 | clone (operator tooling) | `scripts/` quartet — setup-runtime-bridge.sh, bridge-health.sh, verify-bridge.sh, bridge-cleanup.sh | `packages/runtime-bridge/scripts/setup-runtime-bridge.sh:1` «#!/usr/bin/env bash» (member file, enumerated by `ls packages/runtime-bridge/scripts/`); `packages/runtime-bridge/scripts/verify-bridge.sh:1` (member file) | H1 | MISSING |
| H23 | clone | vitest suite — 23 test files covering dispatch/claim/park/answer/harvest/idempotency/cli-entry (incl. symlink-entry and no-sideeffect import guards) | `packages/runtime-bridge/test/aif-park.test.ts:1` «// packages/runtime-bridge/test/aif-park.test.ts» (member file, enumerated by `ls packages/runtime-bridge/test/ \| wc -l` → 23); `packages/runtime-bridge/test/cli-symlink-entry.test.ts:1` (member file) | H12 | MISSING |
| H24 | clone (staging) + npm-lane (consumer dir) | orchestrator-prompts staging homes — the framework's own in-flight umbrella kickoff dirs + `_master-backlog-delta.json`/`_plan-cache.md` state; consumers get the empty `.ai-factory/orchestrator-prompts/` dir created by the templates stage (the `plan.md` home B8 reads) | `setup.d/30-templates.sh:17` «mkdir_safe "$PROJECT_ROOT/.ai-factory/orchestrator-prompts"»; `setup.d/LAYERS.md:121` «[`.claude/orchestrator-prompts/modular-install-fullpack/kickoff-s0.md`](../.claude/orchestrator-prompts/modular-install-fullpack/kickoff-s0.md) — authoritative step→layer cut mapping (S0 boundary table).» | B8, H19, A12 | PARTIAL /docs/daily-cycle-factory/ — «it reads your kickoffs plus `.ai-factory/orchestrator-prompts/plan.md` (created on first run), ranks them, and emits a launch table.» (the CONSUMER staging path is documented; the framework's own staging home is not) |

---

## I — Plugin marketplace surface

Enumeration:
```
$ ls .claude-plugin/ plugin/ plugin/agents/ plugin/commands/ plugin/skills/ plugin/install/
.claude-plugin/: marketplace.json
plugin/: README.md  agents  commands  hooks  install  skills  .claude-plugin/plugin.json (via ls plugin/.claude-plugin/)
plugin/agents/: compliance-verifier.md  living-docs-auditor.md  review-sidecar.md
plugin/commands/: install-enforcement.md
plugin/skills/: getff  installing-enforcement  tool-bootstrapping  using-getff
plugin/install/: fetch-and-wire.sh
```
Derived count: **9 items** — the two manifests + the opt-in command + 4 plugin skills + the agent-twin trio +
the fetch-and-wire bridge script. `plugin/hooks/` is family D's territory (boundary: D owns the hook wiring;
I owns the marketplace/plugin SURFACE). `plugin/README.md:3` «This subtree is the **Claude-Code plugin
payload** consumed via the in-repo marketplace» anchors I1. Agent twins are generated byte-identical by
`scripts/generate-plugin-twins.sh:4` «(2) plugin/agents/<name>.md ← agents/<name>.md — byte-identical copy,
no header».

| id | ships-to | what | anchors | satellites | site coverage |
|---|---|---|---|---|---|
| I1 | plugin (marketplace) | `.claude-plugin/marketplace.json` — the in-repo marketplace manifest: one plugin (`getff`), source `./plugin`, strict:true, v0.2.0 | `.claude-plugin/marketplace.json:11` «"source": "./plugin",»; `.claude-plugin/marketplace.json:14` «"strict": true» | I2 | PARTIAL /docs/quickstart-ts/ — «/plugin marketplace add artyhoo/getff» + «/plugin install getff@getff» (the two install commands are documented; the manifest's strict flag and plugin description are not) |
| I2 | plugin | `plugin/.claude-plugin/plugin.json` — the plugin manifest: name/description/version, FSL-1.1-ALv2 license, homepage/repo | `plugin/.claude-plugin/plugin.json:3` «"description": "Rules-as-Tests: turn any codebase convention into an executable test that fails at the earliest reachable channel. Skills, sub-agents, session hooks + an opt-in command to wire git-hook/CI enforcement into your repo.",»; `plugin/.claude-plugin/plugin.json:8` «"license": "FSL-1.1-ALv2",» | I1 | PARTIAL /docs/quickstart-ts/ — «The plugin never silently mutates your git or CI.» (the honest-boundary posture is documented; the manifest and its license are not) |
| I3 | plugin | `/getff:install-enforcement` command — opt-in HARD-layer wiring: fetches the project's OWN official installer (Option C), dry-run default, consent-gated | `plugin/commands/install-enforcement.md:2` «description: Opt-in — wire the HARD enforcement layer (git hooks + CI) into THIS repo by fetching and running the project's official installer. Dry-run first, consent-gated. …»; `plugin/commands/install-enforcement.md:13` «it fetches the project's **own official `install.sh`** (Option C — no bundled copy) and runs it» | A2, I9 | PARTIAL /docs/quickstart-ts/ — «The hard layer (hooks + CI gates) is one explicit opt-in command — nothing fires until you turn it on.» (existence + posture documented; the command NAME `/getff:install-enforcement` appears nowhere on the site) |
| I4 | plugin | plugin skill `getff` — the product skill for plugin installs: rules-as-tests framing, trigger surface (ArchUnit, Stryker, Pact, dependency-cruiser, Husky…) | `plugin/skills/getff/SKILL.md:3` «description: Use when treating any codebase rule (architectural, naming, dependency, test-quality, contract, SLO) as an executable test that fails the build when violated…»; `plugin/skills/getff/SKILL.md:2` «name: getff»| B15 | PARTIAL /docs/factory-overview/ — «Skills (`/rule-research`, `/arch`, `/pipeline`, …) auto-activate on Claude Code» (skill auto-activation documented; this skill unnamed — same gap as B15) |
| I5 | plugin | plugin skill `using-getff` — session-start orientation: instruction-priority ladder (project's own CLAUDE.md/AGENTS.md win), invoke-the-relevant-skill discipline | `plugin/skills/using-getff/SKILL.md:3` «description: Use when starting any conversation in a repo that has the getff plugin installed — establishes how to find and use the getff skills, the instruction-priority ladder (the project's own CLAUDE.md/AGENTS.md win)…»; `plugin/skills/using-getff/SKILL.md:2` «name: using-getff»| I4 | MISSING |
| I6 | plugin | plugin skill `installing-enforcement` — the soft-vs-hard boundary explainer; points at `/getff:install-enforcement` | `plugin/skills/installing-enforcement/SKILL.md:3` «description: Use when the user wants to actually WIRE the hard enforcement layer (git pre-commit/pre-push hooks + CI) into their repo… Explains the soft-vs-hard boundary and points at the /getff:install-enforcement command.»; `plugin/skills/installing-enforcement/SKILL.md:2` «name: installing-enforcement»| I3 | MISSING (the boundary prose is on the site, but T-ENC-A forbids crediting it: the SKILL is never named on any page) |
| I7 | plugin | plugin skill `tool-bootstrapping` — twin of B16 with an extended trigger list (incl. RU triggers) | `plugin/skills/tool-bootstrapping/SKILL.md:3` «description: 'Use when analysing project stack for MCP or skill recommendations. Triggers: tool bootstrapping, MCP installation, …»; `plugin/skills/tool-bootstrapping/SKILL.md:2` «name: tool-bootstrapping»| B16, A9 | MISSING |
| I8 | plugin | agent twins trio — compliance-verifier, living-docs-auditor, review-sidecar (byte-identical copies of C6/C9/C10 sources) | `plugin/agents/compliance-verifier.md:2` «name: compliance-verifier»; `plugin/agents/review-sidecar.md:2` «name: review-sidecar»; `plugin/agents/living-docs-auditor.md:2` «name: living-docs-auditor» | C6, C9, C10 | MISSING |
| I9 | plugin | `fetch-and-wire.sh` — the hybrid seam behind I3: fetches the official installer rather than bundling ~2MB; NEVER wires on its own (dry-run default, `--apply` real run) | `plugin/install/fetch-and-wire.sh:2` «# fetch-and-wire.sh — the rules-as-tests "hybrid seam": reach the HARD enforcement layer»; `plugin/install/fetch-and-wire.sh:11` «# wires anything on its own: dry-run is the default; --apply does the real run; consent is» | I3, F9, A2 | MISSING |

---

## MISSING roll-up — the E2-E5 dispatch scope

Tally per family (`MISSING` / `PARTIAL` / `documented`; total 252 items across 9 families):

| Family | items | MISSING | PARTIAL | documented |
|---|---|---|---|---|
| A installer engine + stages + lanes | 24 | 13 | 2 | 9 |
| B skills suite | 41 | 33 | 4 | 4 |
| C sub-agents + skill-context | 23 | 22 | 1 | 0 |
| D hooks (plugin + consumer pre-push) | 27 | 23 | 2 | 2 |
| E templates + vendored renders | 39 | 17 | 5 | 17 |
| F rules corpus + rule tooling + shipped scripts | 56 | 45 | 4 | 7 |
| G npm packages + presets + packaging | 9 | 7 | 1 | 1 |
| H runtime-bridge | 24 | 18 | 5 | 1 |
| I plugin marketplace surface | 9 | 5 | 4 | 0 |
| **Σ** | **252** | **183** | **28** | **41** |

**MISSING (183) — every id below is a raw-reference page to draft in E2-E5:**

- **A (13):** A3 (engine.sh+lib.sh), A9 (MCP companion layer), A10 (companions manifest selection), A11
  (sub-agents delivery), A15 (vendored runtime-bridge subset), A17 (dev-deps stage), A18 (rule-bootstrap
  install step), A19 (worktree scripts), A20 (finalize), A21 (LAYERS.md), A22 (companions.manifest format),
  A23 (aif-handoff guided install), A24 (bridge guided-detect)
- **B (33):** B1 (template-audit), B2 (ai-doc), B7 (orchestrator), B9 (reviewer), B10 (dispatcher), B13
  (story), B14 (claude-glm-executor-handoff), B16 (tool-bootstrapping), B17-B41 (the 25 clone-only
  aif-operator skills + self-reflection)
- **C (22):** C1-C11, C13-C23 (all but C12, which is PARTIAL)
- **D (23):** D2-D19 (all plugin hooks + plumbing), D23 (static check trio), D24 (dynamic check pair), D24b
  (utils pair + ESM marker), D25 (_zcode-emit), D26 (dev-harness settings.json)
- **E (17):** E2 (.nvmrc), E3 (.prettierignore), E6 (ARCHITECTURE.ts-server), E7 (CLAUDE.md.template), E10
  (gitignore), E11 (hooks-package.json), E14 (integration-rules), E15-E17 (skill-context trio → shared with
  C21-C23), E19 (tsconfig), E22 (Cargo.lints.toml), E34 (pre-commit fragment), E36 (python ARCHITECTURE+RULES),
  E37-E38 (storybook pair), E39 (session-bootstrap template)
- **F (45):** F1-F19, F21-F25, F27-F30 (26 rules), F31-F35 (eslint-rules barrel), F37-F41 (render scripts),
  F44, F46-F48, F51, F53, F56 (shipped scripts) — the rules corpus itself is clone-only, so its "coverage"
  target is the mechanism pages that anchor it (D10/D11/D15 hooks, pre-push sections)
- **G (7):** G2 (@rules-as-tests/core), G3 (lint-config), G4 (meta-factory), G5-G7 (the three react-stack
  presets), G9 (dist packaging)
- **H (18):** H3 (claim), H4 (park), H5 (openQuestion), H6 (answer), H7 (questions), H9 (ensure-parallel),
  H10 (await), H11 (aifHttp), H12 (cliEntry), H13 (backend+types), H16 (AifFireBackend), H17 (ManualBackend),
  H18 (idempotency), H19 (kickoff), H20 (aifWsStatus), H21 (vendor subset), H22 (operator scripts), H23
  (test suite)
- **I (5):** I5 (using-getff), I6 (installing-enforcement), I7 (tool-bootstrapping twin), I8 (agent twins),
  I9 (fetch-and-wire)

**PARTIAL (28) — the named page needs its missing detail added (secondary E2-E5 scope):**
A8 (no Go quickstart; no per-file detail), A16 (gate named, reconciliation stage + orphan warning not), B4
(named, behavior not), B6 (posture only via vendored rows), B11 (entry point named, scope not), B15 (getff
skill itself unnamed), C12 (fallback path named, role not), D1 (23 hook registrations unenumerated), D22
(full owner-section map missing), E1 (config file unnamed), E4 (template artifact unnamed), E9 (SSOT role
unexplained), E24/E25 (files unnamed), F20 (rule file unnamed), F26 (rule file unnamed), F42 (shared CLI
unnamed), F52 (script unnamed), G1 (package payload layout), H1 (CLI surface), H2 (invocation path), H14
(env-var override), H15 (REST mechanics), H24 (consumer staging path documented; the framework's own
staging home not), I1 (strict flag + description), I2 (manifest + license), I3
(command name absent site-wide), I4 (skill unnamed).
