# BS3 leg A — full GAP ledger (18), as returned by the cold claims audit

Companion to `BS3-REPORT.md`. Persisted verbatim-in-substance because the audit that produced it
cost ~257k subagent tokens; re-deriving it is the expensive path. Every `file:line` below is on
branch `bs3-cutover` @ `ac3e7d1` (= `origin/fumadocs-migration` `18e847b3` + the F5-4 panel fix),
verified against the framework repo at `23f5fb882d`.

**Verdict: STOP.** Ledger coverage 86/167 claims (51%); 81 claims across 10 surfaces carry no
ledger row, and 9 of the 18 GAPs sit inside that uncovered half.

## Ledger coverage census

| Surface | Claims with no ledger row |
|---|---|
| `content/docs/limits.md` | 7 |
| `content/docs/faq.md` | 8 |
| `content/docs/quickstart-ts.md` | 6 (yet cited AS evidence by rows 3/57/77/78) |
| `content/docs/quickstart-rust.md` | 8 |
| `content/docs/executable-agents-md.md` | 11 |
| `content/blog/executable-agents-md.md` | 8 (`draft:false` — it publishes) |
| `app/(site)/page.tsx` beyond rows 85-86 | 14 |
| `app/(site)/consulting/page.tsx` | 1 |
| `app/llms.txt/route.ts` | 1 |
| frontmatter `description:` fields | 17 (render into `<meta>`, `og:`, `twitter:`, `llms.txt`) |

## The 18 GAPs, most-severe first

**G1 — `app/(site)/page.tsx:6`, F5-4 on the most-syndicated string on the site.**
«…native toolchain gates (ESLint/husky for npm, **clippy/cargo-deny for cargo**)». Ships verbatim
as `<meta name="description">`, `og:description`, `twitter:description` and the
`SoftwareApplication` structured data. Probe: `packages/core/templates/cargo/github-actions-ci.yml`
is one step, `cargo clippy --all-targets -- -D clippy::disallowed_*`; no `cargo deny` step.
`packages/core/templates/cargo/deny.toml:9-14` ships `[bans]` with every actual ban commented out.
Fix: the row-85 shape — «for cargo, the demo today is clippy, with cargo-deny on the roadmap».

**G2 — `app/llms.txt/route.ts:22`, same breach in the machine-readable summary.**
«Compiles codebase conventions into native toolchain gates (ESLint/husky, clippy/cargo-deny).»
First line every LLM ingesting getff.ai reads. No ledger row.

**G3 — `content/docs/quickstart-rust.md`, five F5-4 breaches plus a false channel claim.**
- `:3` frontmatter «getff is a TypeScript tool that generates clippy and cargo-deny gates» (→ meta + llms.txt)
- `:6` «generates `clippy` lint config and `cargo-deny` policy into your repo»
- `:24` «Add a dependency your `cargo-deny` policy is configured to ban» — shipped `deny.toml` bans nothing
- `:28` «Both run the same way they'd run in CI» — no shipped workflow runs `cargo deny`
- `:35` table «A banned dependency | `cargo-deny check` fails the build | pre-push / CI» — the cargo lane ships no pre-push hook (`grep -rn "hooks/pre-push" setup.d/46-cargo.sh` → empty; only python has one, `setup.d/45-python.sh:887`)

**G4 — `content/docs/executable-agents-md.md`, nine unresolvable citations on the flagship page.**
| Site says | Reality |
|---|---|
| `:18` `AGENTS.md:76` = the `std::env::var` claim | it is at `AGENTS.md:83` (`:76` is the heading `## Configuration access`) |
| `:21-23` Enforced line = `cargo-clippy-toml ✅ · npm-eslint-declarative — FF7001 (…backend)` | live line has **four** segments (also `astgrep-python-yaml — FF7001`, `ruff-tidy-imports-toml — FF7001`), each `FF7001` ending `(post-v0)` |
| `:25` «backed by `root-agents-demo.test.ts:97` — the live-fired cell» | `:97` is `const enforcedLines = …`; the cargo assertion is `:144-149`, whose own comment says the cargo live-fire is a developer-machine gate elsewhere and «here we assert the demo wires the type-aware node» |
| `:27` `AGENTS.md:82` = the `process.env` claim | it is at `:89` |
| `:27` `root-agents-demo.test.ts:73` fires the negative, `:86` asserts silence | real tests are `:120` and `:133`; `:73` is a byte-equality assertion, `:86` a closing brace |
| `:29` «`AGENTS.md:26–51`. The rule index (20 rules…)» | region is `:26–60`; row count is **29** |
| `:29` «wired into pre-push (`packages/core/hooks/pre-push.ts:792–799`)» | `:792-799` is prose about workflow-security scoping; `render-rule-index.mjs --check` is at `:1249-1253` |
| `:31` «`root-agents-demo.test.ts:41` re-composes the demo region» | `:41` is a comment; the byte ratchet is `:52` / `:67-73` |
| `:35` «(ESLint/husky for npm, clippy/cargo-deny for Rust)» | F5-4 |
`Makefile:3` is the one citation on the page that holds.

**G5 — `content/blog/executable-agents-md.md` (`draft: false`, it publishes)** repeats every G4
defect at `:30, :33-34, :37, :39, :41, :43`.

**G6 — `content/docs/limits.md`, the "Honest limits" page is the least honest page on the site.**
`:12` «Two stacks today» · `:17` «Other toolchains (Python, Go, Java, …) are not in the box. If
your stack isn't TS/JS or Rust, getff has nothing to install for you today.»
Probe: `ls setup.d/4*.sh` → `45-python.sh` (1200+ LOC), `46-cargo.sh`, `47-go.sh` (298 LOC);
`install.sh:163-169` accepts `python | cargo | go`. **Four lanes ship.** Contradicts
`what-is-getff.md:18` («TypeScript/JS, Rust and Python») and all of `quickstart-python.md` on the
same site. `:15` «Rust — clippy + cargo-deny policy» is additionally F5-4. `:3` frontmatter
propagates «two supported stacks» into `out/llms.txt`.

**G7 — `app/(site)/page.tsx:190`, the same contradiction, inside the ledger's own evidence key.**
«Stacks today: TypeScript/JS (ESLint/husky) and Rust gate generation (clippy/cargo-deny). Other
toolchains are on the roadmap, not in the box.» Ledger row 4 cites this as `[LIMITS]` evidence for
«covers TypeScript/JS, Rust **and Python**» — the cited evidence classifies Python as not in the
box. **The evidence contradicts the row it backs.** Row 5 cites it approvingly. Also F5-4.

**G8 — `content/docs/daily-cycle-factory.md:24-30`, "rendered, not hand-maintained" is neither.**
Site: «rendered from the shipped preset data (`.claude/skills/pipeline/references/presets/*.json`),
not hand-maintained», then lists `aif … marker=Claude Opus (plan+review)` and
`economy … marker=Z.AI GLM-5.2 SDK`. Live: `aif.json` → `"marker": null`; `economy.json` →
`"marker": "Z.AI GLM-5.3 SDK"`. Repointed by `164cfed919` (#1608, 2026-09-05) *after* the ledger
pin. The framework's copy sits in a CI-gated `getff:begin` region; the site's copy is in no gate.
Ledger rows 33/34 assert «copied verbatim» — false against HEAD.

**G9 — `content/docs/first-steps-factory.md:33-36`, wrong payload told to the consumer.**
Site: «On top of env you should see `pipeline`, `dispatcher`, `harvest`, `aif-doctor`,
`night-mode`, `story`, `claude-glm-executor-handoff`.» Source `first-steps.source.json` now says
`pipeline` and `night-mode` are **not** factory additions (they arrive with env+), and
`setup.d/10-skills.sh:70-100` puts `arch`, `orchestrator`, `pipeline`, `reviewer`, `night-mode` in
the env+ arm. Ledger row 74 asserts «vendored render, parity-gated».

**G10 — `content/docs/first-steps-env.md:36-38`, same class.**
Site: «`.ai-factory/tier-home.md` and `.claude/skills/arch/`. Those last two are the artefacts
`env` adds over `core`.» Source now reads «`tier-home.md` and the **five** skills env adds over
core: `arch/`, `night-mode/`, `orchestrator/`, `pipeline/`, `reviewer/`». Ledger row 69 asserts parity.

**G11 — the three "parity mechanically checked at gate row 8" claims have no mechanism.**
`ls scripts/ .github/workflows/` in the site repo → `verify-search.mjs` and `deploy.yml`
(checkout → `npm ci` → `next build` → deploy). No parity check exists; G8/G9/G10 are that firing.
`#hope-as-gate` per `attention-is-not-a-mechanism.md §1`.

**G12 — `app/(site)/page.tsx:65-70` and `:162-165`, the hero promises green from commands that cannot produce it.**
`git clone …` → `cd getff && make self-audit` → `# green: every AGENTS.md claim verified`.
`Makefile:3` → `self-audit: pre-commit-check pre-push-check principles-meta-tests`; `Makefile:27`
→ `npm --prefix packages/core run test:principles`; `.husky/pre-push` execs `node --import tsx/esm`.
Both need `node_modules`, and `README.md:133` says «`./setup` deploys files; it does not run
`npm install`». Fresh clone = red-on-missing-deps. `:162-165` sits behind a **Copy** button.

**G13 — `content/docs/beta.md:30-31` contradicts the page it links to.**
Beta names «the entry path» as clone + installer; `quickstart-ts.md:12-15` and
`quickstart-rust.md:12-15` name `/plugin marketplace add artyhoo/getff` + `/plugin install`.
Both entries are individually valid (marketplace.json → HTTP 200); the site names two different
"the" entry paths. Ledger row 62 records only the clone form.

**G14 — `content/docs/quickstart-rust.md:12-17`, the documented plugin bridge has no cargo lane.**
`plugin/commands/install-enforcement.md` step 1 offers `ts-server` or `react-next`;
`plugin/install/fetch-and-wire.sh:34` → `STACK="ts-server"`. A Rust user following the quickstart
verbatim gets an enforcement bridge whose own doc offers no cargo option.

**G15 — `content/docs/quickstart-python.md:32-42`, the "What lands" tree omits a delivered file.**
`setup.d/45-python.sh:887-899` `_py_deliver_local_hook_rung()` delivers `.getff/hooks/pre-push` on
every python install unless `GETFF_SKIP_HOOKS=1`; shipped since `a66c0cb9aa` (#1233, 2026-08-07) —
already true at the ledger's pin. Under-claim, but the tree asserts what lands. Ledger row 42
asserts «tree copied».

**G16 — `content/docs/beta.md:15-16`, the same omission as a capability statement.**
«locally where the lane ships hooks (npm)» — the python lane has shipped a local pre-push rung
since #1233. Ledger row 57 records it as-is.

**G17 — `content/docs/daily-cycle-rules.md:9-10`, the source's qualifier was narrowed in the render.**
Site: «every command below is shipped by the installer at every depth», qualifying only
`ci-available-probe.sh` as npm-only. Source `AI-USAGE-GUIDE.md:201-202` adds «python/go/cargo
installs ship no `scripts/` by construction» — which generalises to `audit-ai-docs.sh`,
`check-rule-globs.sh`, `check-lintstaged-resolves.sh`, `pre-merge-local.sh`, i.e. every command on
the page (`setup.d/40-configs.sh:51` runs on the npm flow only). A Python reader is handed five
commands that do not exist. Ledger FINDING-L3 calls this «the source's own wording pair»; it is
not — the site's qualifier is strictly narrower than the source's.

**G18 — `content/docs/faq.md`, three F5-4 breaches, zero rows.**
`:14`, `:30`, `:34`. Plus a fourth instance at `app/(site)/consulting/page.tsx:19`.

## UNVERIFIABLE — needs a human (5)

- `quickstart-ts.md:6` «about 5 minutes» / `page.tsx:155` «90 seconds» — cold-machine timing probe.
- `faq.md:22` (Packmind), `:26` (agnix), `:30` (CodeRabbit/Qodo) — competitor-capability claims.
- `page.tsx:199` «One email when the generator milestone ships» — forward promise, not checkable state.
- `degradations.md:19-21` self-labels its rows «evidenced claims, not probe-verified facts» — correctly.

## Residual coverage note

The two demo `.mp4` files under `out/demo/` were not played; their captions («the pre-push hook
kills it before CI even wakes up», «make self-audit fails and names the exact line») are claims
not verified from source. `make self-audit` was not executed (needs a provisioned clone) — G12 is
derived from the Makefile/package.json chain, not from a run.

## Method defect found in the ledger itself

Rows 1, 3, 4, 5, 57, 77, 78 cite `[LIMITS]` (the landing's own section) and
`content/docs/quickstart-ts.md:29` (another site page) as **evidence**. A claim verified against a
second doc on the same site is UNVERIFIABLE, not VERIFIED — two site pages agreeing proves nothing
about the repo, and G7 is that failure firing for real. The auditor re-verified those claims
independently against the framework: the *rows* stand, the *citations* do not.
