# ENCYCLOPEDIA-LEDGER-E5.md — stage ledger for beta-docs-encyclopedia E5

Per-capability-sentence rows for the 39 raw reference pages drafted on this stage
(census families A, E, G, I). Format: `| page | sentence (short) | evidence anchor(s) at pin |`.
Working pin (all anchors): framework `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650` (2026-09-12 probes).
Labels: `experimental` / `planned` / `lane-partial` where a page carries one; lane-partial rows
mark claims that hold for SOME lanes only (the census `ships-to` discipline).

## A — installer engine, stages & lanes

| page | sentence (short) | anchor(s) at pin |
|---|---|---|
| a3-engine-dispatcher | engine.sh routes companions by `kind`; lib-only mode via ENGINE_LIB_ONLY=1 | `setup.d/engine.sh:2`, `setup.d/engine.sh:8-12` |
| a3-engine-dispatcher | lib.sh carries the tier skill lists, copy_safe, managed-block writers | `setup.d/lib.sh:61`, `setup.d/lib.sh:474` |
| a9-mcp-companion-layer | 05-mcp consumes kind=mcp rows inside install.sh, before 70-deps, never in the wrapper loop | `setup.d/05-mcp.sh:2`, `setup.d/LAYERS.md:36` |
| a9-mcp-companion-layer | missing `claude` CLI → graceful skip notice, not install failure | `setup.d/05-mcp.sh:4` |
| a10-companions-stack-selection | stack-aware companion selection reads the manifest `stacks` column (react-next/react-spa/react-native signals) | `setup.d/15-companions-stack.sh:2`, `setup.d/15-companions-stack.sh:10` |
| a11-subagents-delivery | agents/*.md delivered to `.claude/agents/` with cross-ref transform on fresh copies | `setup.d/20-agents.sh:24` |
| a11-subagents-delivery | 7 authoring-only agents excluded; 2 discipline agents factory-only `lane-partial` | `setup.d/20-agents.sh:26` |
| a15-runtime-bridge-vendor | vendored runtime-bridge subset is a file-copy install-time delivery, factory-only | `setup.d/55-runtime-bridge-vendor.sh:2`, `setup.d/55-runtime-bridge-vendor.sh:11` |
| a17-dev-deps-stage | 70-deps merges package.json scripts + installs dev-deps + tsx-at-root | `setup.d/70-deps.sh:2` |
| a17-dev-deps-stage | pinned tool array treats the shipped .nvmrc as reference environment | `setup.d/70-deps.sh:180` |
| a18-rule-bootstrap-install | 80-rule-bootstrap runs the deterministic factory on authored JSONs → rules-lock.json, LIVE-or-degrade | `setup.d/80-rule-bootstrap.sh:2`, `setup.d/80-rule-bootstrap.sh:7` |
| a19-worktree-scripts | worktree scripts cluster delivered at env+ `lane-partial` | `setup.d/85-worktree-scripts.sh:2` |
| a20-finalize | 99-finalize: synth-wire + R2 AST-wire + otel WARN + ignore_shipped_configs | `setup.d/99-finalize.sh:2` |
| a21-layers | LAYERS.md is authoritative for the S1 layer list, lib.sh API surface, stub map | `setup.d/LAYERS.md:3` |
| a21-layers | stages execute in lexicographic sourcing order — the numbers ARE the run order | `setup.d/LAYERS.md:16` |
| a21-layers | byte-identical invariant: layered tree == monolithic installer for 4 stacks, proven by golden baselines | `setup.d/LAYERS.md:8` |
| a21-layers | profile model: core → env → factory monotonic depths; legacy --with-aif-suite routes to factory | `setup.d/LAYERS.md:10` |
| a22-companions-manifest | TAB-delimited five-field manifest; single tab, no padding — the S3 parser contract | `setup.d/companions.manifest:1-2` |
| a22-companions-manifest | tab delimiter because detect_cmd may contain inner pipes | `setup.d/companions.manifest:3` |
| a22-companions-manifest | companions install via their own official installer, detect-first, no version pin | `setup.d/companions.manifest:4` |
| a22-companions-manifest | kind=mcp rows processed inside install.sh before 70-deps, never by the wrapper loop | `setup.d/companions.manifest:8` |
| a22-companions-manifest | aif-handoff row ships only at --profile factory `lane-partial` | `setup.d/companions.manifest:22`, `setup.d/companions.manifest:33` |
| a23-aif-handoff-guided | factory-profile guided INSTALL: official repo + docker compose, detect-first | `setup.d/aif-handoff-guided-install.sh:2-5` |
| a23-aif-handoff-guided | helper invoked from install.sh, NOT engine.sh; manifest row stays kind=external-service | `setup.d/aif-handoff-guided-install.sh:12-13`, `install.sh:1440` |
| a23-aif-handoff-guided | non-interactive runs auto-decline rather than block (never-prompt contract) | `setup.d/aif-handoff-guided-install.sh:80` |
| a23-aif-handoff-guided | decline/failure → designed degrade to env-level, exit 0 `lane-partial` | `setup.d/aif-handoff-guided-install.sh:207` |
| a24-bridge-guided | five-state diagnose (up/docker/docker-down/native/absent) keyed on /health, never assumes docker | `setup.d/bridge-guided.sh:3`, `setup.d/bridge-guided.sh:10` |
| a24-bridge-guided | docker-down is its own state; native outranks docker-down | `setup.d/bridge-guided.sh:12` |
| a24-bridge-guided | cross-layer WARN when AIF suite installed but runtime unreachable | `setup.d/bridge-guided.sh:45` |

## E — templates + vendored renders

| page | sentence (short) | anchor(s) at pin |
|---|---|---|
| e2-nvmrc | one-line Node seed (22.23.1) delivered copy_safe to project root | `packages/core/templates/shared/.nvmrc:1`, `setup.d/40-configs.sh:98` |
| e2-nvmrc | delivered CI workflow reads node-version-file: '.nvmrc'; drift WARN vs hardcoded majors | `templates/ts-server/github-actions-ci.yml:31`, `setup.d/60-ci.sh:32` |
| e2-nvmrc | python/cargo/go lanes never deliver .nvmrc `lane-partial` | `setup.d/40-configs.sh:98` (npm-lane block only) |
| e3-prettierignore | managed-block .prettierignore shipped full-depth at core | `packages/core/templates/shared/.prettierignore:1`, `setup.d/lib.sh:65` |
| e6-architecture-ts-server | ts-server stack architecture template; layer rules enforced by dependency-cruiser | `packages/core/templates/shared/ARCHITECTURE.ts-server.md:1`, `:3` |
| e7-claude-md-template | pointer-only doc; no rules to avoid drift with AGENTS.md | `packages/core/templates/shared/CLAUDE.md.template:3`, `:8` |
| e7-claude-md-template | consumer install ships AGENTS.md, NEVER CLAUDE.md — template is clone/release-surface only `lane-partial` | `setup.d/lib.sh:118`, `install.sh:202` |
| e10-gitignore | five-line seed; undotted because npm tarball drops dotted files | `packages/core/templates/shared/gitignore:1`, `setup.d/40-configs.sh:100-104` |
| e10-gitignore | consumer .gitignore always wins — kept, warned, never edited | `setup.d/40-configs.sh:107` |
| e11-hooks-package-json | {"type":"module"} marker prevents ERR_REQUIRE_CYCLE_MODULE hook death at push | `setup.d/50-hooks.sh:53-55`, `setup.d/50-hooks.sh:58` |
| e11-hooks-package-json | scoped to packages/core/hooks/ so it can't collide with consumer workspaces | `setup.d/50-hooks.sh:56` |
| e14-integration-rules | six IR families template, shared across services via symlink/submodule | `packages/core/templates/shared/integration-rules.md:14`, `:17-19` |
| e14-integration-rules | delivered to .ai-factory/rules/ by both the npm templates stage and the python lane | `setup.d/30-templates.sh:31`, `setup.d/45-python.sh:1338` |
| e19-tsconfig | strict-family tsconfig (ES2022/NodeNext + noUncheckedIndexedAccess et al.) | `packages/core/templates/shared/tsconfig.json:3`, `:9` |
| e19-tsconfig | FC3 tests-coverage check reads include-set; unreadable/JSONC fails OPEN | `setup.d/40-configs.sh:146-148` |
| e22-cargo-lints-toml | [lints.clippy] deny projection — clippy.toml alone is warning-only | `packages/core/templates/cargo/Cargo.lints.toml:2-3`, `:11` |
| e22-cargo-lints-toml | getff never edits consumer Cargo.toml; reference + merge note instead `lane-partial` | `packages/core/templates/cargo/Cargo.lints.toml:7-8`, `setup.d/46-cargo.sh:129` |
| e34-python-precommit-fragment | pre-commit-framework integration appends the getff pre-push rung, idempotent by marker grep | `packages/core/templates/python/hooks/getff.pre-commit-config.yaml.fragment:9`, `setup.d/45-python.sh:885` |
| e34-python-precommit-fragment | only when consumer already has .pre-commit-config.yaml; stage does NOT set core.hooksPath `lane-partial` | `setup.d/45-python.sh:988`, `setup.d/45-python.sh:995` |
| e36-python-lane-doc-templates | python ARCHITECTURE.md disclaims the TypeScript world | `packages/core/templates/python/ARCHITECTURE.md:10-12` |
| e36-python-lane-doc-templates | python RULES.md RENDERED at install time from rules actually delivered — true by construction | `packages/core/templates/python/RULES.md:3`, `setup.d/45-python.sh:1076-1079` |
| e36-python-lane-doc-templates | replaced a wrong-doc defect: preset-next RULES.md previously shipped to Python repos | `setup.d/45-python.sh:1070-1074` |
| e37-storybook-main | static SB10 config seed so the react-next CI test-storybook job can build | `packages/core/templates/react-next/.storybook/main.ts:1`, `setup.d/40-configs.sh:79-82` |
| e37-storybook-main | react-next stack arm only — replaces retired `npx storybook init` `lane-partial` | `setup.d/40-configs.sh:76`, `setup.d/40-configs.sh:84` |
| e38-storybook-preview | preview seed with control matchers; sibling of main.ts in the same two-copy block | `packages/core/templates/react-next/.storybook/preview.ts:1`, `setup.d/40-configs.sh:85` |
| e39-session-bootstrap-pair | template ships EMPTY digest (zero-setup default); digest block injects every turn | `.claude/templates/session-bootstrap.md:5-6`, `:13` |
| e39-session-bootstrap-pair | the inject hook consumes the TOP-LEVEL .claude/session-bootstrap.md, not the template | `.claude/hooks/inject-session-bootstrap.sh:4`, `.claude/hooks/inject-project-digest.sh:29` |
| e39-session-bootstrap-pair | hook degrades: Step-0 reading order assembled only from files that exist | `.claude/hooks/inject-session-bootstrap.sh:72`, `:91-94` |

## G — npm packages + presets + dist packaging

| page | sentence (short) | anchor(s) at pin |
|---|---|---|
| g2-core-payload | @rules-as-tests/core is the workspace-private payload; contents delivered file-wise by A-stages | `packages/core/package.json:5`, `packages/core/package.json:8` |
| g3-lint-config | @rules-as-tests/lint-config is the shared markdownlint structural config, workspace-only | `packages/lint-config/package.json:6`, `packages/lint-config/package.json:4` |
| g4-meta-factory | @rules-as-tests/meta-factory is the deterministic research→rule factory CLI | `packages/meta-factory/package.json:8` |
| g5-preset-next-15-canonical | frozen Next-15 snapshot pins anchor the #811 deps-free staleness WARN; FALLBACK baseline | `packages/preset-next-15-canonical/preset.meta.json:5` |
| g6-preset-react-spa | react-spa preset: shipped require-error-boundary rule + config templates, delivered file-wise on the stack arm | `packages/preset-react-spa/package.json:7`, `setup.d/30-templates.sh:25` |
| g6-preset-react-spa | NO preset.meta.json — no staleness pins (asymmetry vs G5) `lane-partial` | `packages/preset-react-spa/package.json:4` (no meta.json in tree) |
| g7-preset-react-native | react-native preset: bare-RN/Expo eslint trio + rn-common shared module, always co-delivered | `setup.d/40-configs.sh:367-368`, `setup.d/40-configs.sh:497` |
| g7-preset-react-native | no preset.meta.json and no main entry — pure delivery payload `lane-partial` | `packages/preset-react-native/package.json:4` |
| g9-dist-packaging | tarball laid out exactly like the repo root so PKG_ROOT-relative reads are unchanged | `scripts/build-getff-dist.sh:9-11` |
| g9-dist-packaging | committed MANIFEST.sha256 + --check drift gate; prepack runs check-then-build | `scripts/build-getff-dist.sh:14-16`, `packages/getff/package.json:39` |
| g9-dist-packaging | file list from `git ls-files` only — directory walk would ship working-tree debris/secret risk | `scripts/build-getff-dist.sh:19-21` |

## I — plugin marketplace surface

| page | sentence (short) | anchor(s) at pin |
|---|---|---|
| i5-using-getff-skill | instruction-priority ladder: project's own CLAUDE.md/AGENTS.md win over getff skills | `plugin/skills/using-getff/SKILL.md:13`, `:17` |
| i5-using-getff-skill | invoke-the-relevant-skill discipline + in-plugin skill map | `plugin/skills/using-getff/SKILL.md:8` |
| i6-installing-enforcement-skill | the soft-vs-hard boundary prose is authored in the SKILL artifact (census T-ENC-A credit) | `plugin/skills/installing-enforcement/SKILL.md:8`, `:21` |
| i6-installing-enforcement-skill | honest-boundary instruction: never claim the plugin installed the hooks | `plugin/skills/installing-enforcement/SKILL.md:48-51` |
| i7-tool-bootstrapping-skill | plugin twin of the shipped discipline with an extended trigger list incl. RU triggers | `plugin/skills/tool-bootstrapping/SKILL.md:3`, `:8` |
| i8-plugin-agent-twins | three agent twins byte-identical to sources — no marker, no header, by principle 24(d) | `scripts/generate-plugin-twins.sh:4-5`, `:15-16` |
| i8-plugin-agent-twins | twin-depth consequence documented at the generator; byte-identity forbids link rewriting | `scripts/generate-plugin-twins.sh:21-23` |
| i9-fetch-and-wire | hybrid seam: fetch the official installer rather than bundle ~2MB (Option C) | `plugin/install/fetch-and-wire.sh:2-4` |
| i9-fetch-and-wire | dry-run default; --apply real run; consent lives in the command, not the script | `plugin/install/fetch-and-wire.sh:9-12`, `:14-16` |
| i9-fetch-and-wire | fetch ref tracks `main`, deliberately decoupled from plugin version tags | `plugin/install/fetch-and-wire.sh:28-30` |

## Coverage records — the E2-owned trio (NOT drafted here by design)

| id | record | why |
|---|---|---|
| E15 | covered-by-E2 | skill-context aif-orchestrator-discipline == C21's same file; sibling stage E2 drafts it |
| E16 | covered-by-E2 | skill-context aif-review == C22's same file; sibling stage E2 drafts it |
| E17 | covered-by-E2 | skill-context aif-rules-check == C23's same file; sibling stage E2 drafts it |

## PARTIAL fills (D2) — capability sentences added to EXISTING pages

One row per filled census id, anchored at the landing-tree line numbers on this branch. Anchors cite
the POST-FIX positions: rework round 3 re-homed the five spliced fill sentences as pure appends
(original paragraph-final lines restored byte-identical to `origin/main`, added sentences kept as
new soft-wrapped lines in the same paragraph), so whole-branch numstat shows 0 deletions and
rendered output is unchanged (whitespace-collapsed text equality, checked per file).

| id | page | sentence (short) | anchor(s) (landing tree, this branch) |
|---|---|---|---|
| A8 | limits.md | go-lane per-file detail: `.golangci.yml` (forbidigo ban on os.Getenv) + pinned `getff-go.yml`; REFUSE-LOUDLY → `getff-golangci.yml`; "no Go quickstart page yet; the files are the detail" | `content/docs/limits.md:18` |
| E24 | limits.md | names `.golangci.yml` explicitly | `content/docs/limits.md:18` |
| E25 | limits.md | names the pinned `.github/workflows/getff-go.yml` gate | `content/docs/limits.md:18` |
| A16 | daily-cycle-rules.md | `setup.d/60-ci.sh` reconciles CI hygiene at install: .nvmrc↔workflow Node-major WARN + `CI-orphan` warning | `content/docs/daily-cycle-rules.md:61-64` |
| E1 | daily-cycle-rules.md | delivered `.lintstagedrc.json` is a copy_safe seed; a consumer config authored before installing is kept | `content/docs/daily-cycle-rules.md:37-39` |
| E4 | daily-cycle-rules.md | delivered AGENTS.md is rendered from `packages/core/templates/shared/AGENTS.md.template`; refresh never overwrites | `content/docs/daily-cycle-rules.md:20-23` |
| E9 | first-steps-core.md | `first-steps.source.json` is the SSOT — two renders read it, neither render is the source | `content/docs/first-steps-core.md:29-33` |
| G1 | beta.md | `getff` package payload: only registry-published artifact; `bin/getff` → same installer; tarball == repo-root layout; `MANIFEST.sha256` prepack drift-check | `content/docs/beta.md:39-43` |
| I1 | quickstart-ts.md | `.claude-plugin/marketplace.json`: one plugin `getff`, source `./plugin`, `strict: true` | `content/docs/quickstart-ts.md:19-21` |
| I2 | quickstart-ts.md | `plugin/.claude-plugin/plugin.json` carries name/description/version + FSL-1.1-ALv2 license | `content/docs/quickstart-ts.md:22-23` |
| I3 | quickstart-ts.md | `/getff:install-enforcement` fetches the official installer, dry-run first, explicit `[y/N]` consent | `content/docs/quickstart-ts.md:23-25` |
| I4 | factory-overview.md | plugin sibling set (`using-getff`, `installing-enforcement`, `tool-bootstrapping`) mirrors the auto-activate-or-read-by-hand split | `content/docs/factory-overview.md:68-72` |

These 12 rows sit OUTSIDE the 78 reference-page rows tallied below: the header-excluding grep pattern
(`^\| [a-z]+[0-9]+...`) matches only the lowercase page-slug rows, so the 78 count is unaffected.

Tally: 39/39 pages rowed above — A 13 pages (a3, a9–a11, a15, a17–a24), E 14 pages (e2, e3, e6, e7, e10, e11,
e14, e19, e22, e34, e36–e39), G 7 pages (g2–g7, g9), I 5 pages (i5–i9) = **78 capability-sentence rows**
(A 29, E 28, G 11, I 10 — header-excluding count: `grep -cE '^\| [a-z]+[0-9]+[a-z0-9-]* \|'` → 78) +
**3 covered-by-E2 records** (E15–E17) + **12 PARTIAL fill rows** (D2 fills, section above, anchored at
post-fix landing-tree line numbers). Every row carries its pin anchor or an explicit
`lane-partial`/`experimental`/`planned` label. (Rework round 3: the fill rows were added when the five
spliced fill sentences were re-homed as pure appends — 0 deletions branch-wide; the fill rows' uppercase
census ids do not match the header-excluding grep, so the 78 reference-page count above is unchanged.)
