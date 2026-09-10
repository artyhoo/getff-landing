# CLAIMS-LEDGER.md — BS2 per-claim F5 ledger

**Framework clone read at commit `f49e35311c` (HEAD of `/home/www/rules-as-tests-aif` at authoring), 2026-09-05.**
Landing base: `87d1a99` (BS1); every `page:line` below is this branch's head (`2b407f3`).
Auditor note (BS3 pre-merge): this ledger was written by the BS2 worker; per design §2 the
author never self-certifies — check each row claim-by-claim against shipped reality before cutover.

**The five F5 formulas** (spec §0.3, binding every capability sentence):
(1) present tense ONLY for what a matrix cell / probe demonstrates today; (2) «your AGENTS.md
becomes executable» stays a milestone promise — our own repo is the demo; (3) mutation-testing
claims follow actual matrix-cell status; (4) no cargo-deny present tense — «clippy demo, deny
roadmap»; (5) everything environment-layer (public name: «The AI factory») is labelled
**experimental**.

**Evidence keys** (all framework paths at `f49e35311c` unless noted):
`[SSOT seq.<x>.step.<id>]` = `packages/core/templates/shared/first-steps.source.json` ·
`[GUIDE §N @L<line>]` = `packages/core/templates/shared/AI-USAGE-GUIDE.md` ·
`[TIER §N @L<line>]` = `packages/core/templates/shared/tier-home.md` ·
`[INSTALL py]` = `INSTALL-FOR-AI.md` «Python toolchain lane» ·
`[W6]` = `tests/consumer-matrix/python-unfamiliar-stack-cell.sh` (assertion numbers refer to its header list) ·
`[LEDE]` = deployed landing lede, `app/(site)/page.tsx:44-46` at `87d1a99` (`:43-45` at this branch's head — the BS1 copy text is unchanged; only two hrefs + two comments differ) ·
`[LIMITS]` = deployed landing «Honest limits» section, `app/(site)/page.tsx:190-194` at `87d1a99` (`:188-192` at head). All other `page.tsx:line` cites are head numbers.

**Scope note:** rows are *capability claims* — sentences that say what getff does, supports, or
will do. Normative rhetoric («a bypassed gate is just a lie moved downstream»), structural
matter (headings, links, next-page pointers) and commands quoted from evidence are not claims
and carry no row. First-Steps pages: the step blocks are VENDORED SSOT renders (provenance
header in each page names the commit; the landing repo has NO mechanical parity check —
re-vendor from the source on upgrade, see BS3 round below), so the rows
below cover each page's own connective prose; the step content's evidence is the SSOT itself.

| # | page:line | claim (verbatim) | F5 | evidence / label |
|---|---|---|---|---|
| 1 | content/docs/what-is-getff.md:6-7 | «getff is two layers around one idea: **conventions your AI agents can't silently bypass**» | 1 | [W6] RED arm (a rule-as-gate fires non-zero on a planted violation) + npm-tarball cell `tests/consumer-matrix/npm-tarball-cell.sh` (repo evidence, re-cited at BS3 — site-page circulars removed) |
| 2 | content/docs/what-is-getff.md:7-9 | «AI DX for your codebase: conventions AI agents can't silently bypass — and an AI-run dev environment around them.» (quoted lede) | 1 | [LEDE] — quoted verbatim per design B-D2; its factory half is separately labelled experimental (row 10; panel badge page.tsx:86) |
| 3 | content/docs/what-is-getff.md:14-16 | «The first layer compiles your conventions into the toolchain gates your project already runs: ESLint rules and husky hooks for npm projects, gate generation for Rust.» | 1 | npm arm: `.husky/` delivery (`setup.d/50-hooks.sh`) + npm-tarball cell; Rust arm: [SSOT seq.core.step.install] (`install.sh cargo` lane; `setup.d/46-cargo.sh` delivers `clippy.toml` + `.github/workflows/getff-cargo.yml`) |
| 4 | content/docs/what-is-getff.md:18 | «Today this layer covers TypeScript/JS, Rust, Python and Go stacks» (widened at BS3 round 2 — see BS3 section) | 1 | install.sh:163-171 accepts `python \| cargo \| go` positionals; `setup.d/45-python.sh` / `46-cargo.sh` / `47-go.sh`; [W6] (python lane e2e); npm-tarball cell (npm) |
| 5 | content/docs/what-is-getff.md:18 | «with more toolchains on the roadmap» | 1 | no lane beyond npm/python/cargo/go in `install.sh` case arms — label: planned |
| 6 | content/docs/what-is-getff.md:19-20 | «an *executable* AGENTS.md today means **getff's own repo** — generating yours from your conventions is the next milestone, not a shipped feature.» | 2 | our repo's AGENTS.md + `make self-audit` demo (app/(site)/page.tsx:63-69 at head, kept BS1 hero) — label: milestone (F5-2 exactly) |
| 7 | content/docs/what-is-getff.md:22 | «The rules layer ships as a **beta**.» | 5 | label: beta (public-beta label, parent §7 maturity set; design B-D1) |
| 8 | content/docs/what-is-getff.md:27-28 | «Tasks are tiered by a fixed rubric — who plans, who implements, who reviews — so cheap mechanical work runs on a cheaper model and design-heavy work plans on a stronger one.» | 1 | [TIER §2 @L43-59] (two questions, three tiers, criteria table) |
| 9 | content/docs/what-is-getff.md:29-31 | «The factory installs on top of the rules layer: the factory profile ships the same rule-proving steps, so dispatched work happens in a repo where those gates are installed and proven.» | 1 | [SSOT seq.factory.step.prove-rules-not-inert] (the proving steps are IN the factory sequence) |
| 10 | content/docs/what-is-getff.md:33-35 | «it expects a specific operator runtime and its capability surface degrades in named ways when pieces are missing» | 1 | [SSOT seq.factory.step.install] («the factory payload dead-ends without it») + [TIER §3 @L77-84] (named degradation rows) — label: experimental (same sentence) |
| 11 | content/docs/daily-cycle-rules.md:9-12 | «Nothing here needs anything beyond a core install — with one lane caveat, stated once: the `scripts/` commands below ship on **npm-lane installs only** (python/go/cargo installs ship no `scripts/` by construction, per the guide's own qualifier).» | 1 | [GUIDE §3 @L201-202] (the source's qualifier, restored in full at the BS3 round — the render had narrowed it to one command) |
| 12 | content/docs/daily-cycle-rules.md:15-18 | beat 1 — read `AGENTS.md`, then `RULES.md` / `ARCHITECTURE.md` | 1 | [GUIDE §3 @L187-188] |
| 13 | content/docs/daily-cycle-rules.md:22-23 | «The ESLint custom rules are the earliest channel: they fire in your editor and in `npm run lint`.» | 1 | [GUIDE §3 @L189-190] |
| 14 | content/docs/daily-cycle-rules.md:28-32 | beat 3 — `bash scripts/audit-ai-docs.sh`, plus `check-rule-globs.sh` / `check-lintstaged-resolves.sh` when layout/deps changed; pre-commit runs lint-staged | 1 | [GUIDE §3 @L191-193] |
| 15 | content/docs/daily-cycle-rules.md:35-42 | beat 4 — `.husky/pre-push` fires rule-glob liveness, lint-staged resolution, generated-rule-material (Node≥20 routes to the TS-core hook, bash critical-only fallback otherwise); typecheck/tests/depcruise run as `ci.yml` jobs; not bypassed with `--no-verify` | 1 | `packages/core/hooks/pre-push.ts` SECTIONS `owner: consumer` = `rule-globs`/`lint-staged-resolves`/`generated-rule-material` — typecheck/vitest/depcruise appear in the hook only inside maintainer-owner sections and comments, never in the consumer registry (precision fixed at BS3 round 4); trio in `templates/ts-server/github-actions-ci.yml:54-104` delivered as `ci.yml` (`40-configs.sh:448`). NB: the shipped `AI-USAGE-GUIDE.md:195-196` still names the trio at pre-push — framework defect, operator finding |
| 16 | content/docs/daily-cycle-rules.md:41-43 | beat 5 — CI (`ci-success`) is the last-resort gate | 1 | [GUIDE §3 @L196-197] |
| 17 | content/docs/daily-cycle-rules.md:43-46 | «when a GitHub Free account exhausts its private-repo Actions-minutes pool, every first-party check fails in ~2 s with zero steps» + `ci-available-probe.sh` classifies `CI UNAVAILABLE` (npm-lane installs only) | 1 | [GUIDE §3 @L197-202] |
| 18 | content/docs/daily-cycle-rules.md:47-49 | `pre-merge-local.sh` runs every detected lane's gates locally — opt-in, weaker evidence than CI, its verdict says so | 1 | [GUIDE §3 @L203-204] |
| 19 | content/docs/daily-cycle-rules.md:53-54 | «A convention with no check is not a rule; `/rule-research` and `/rule-tests` exist to make that cheap.» | 1 | [GUIDE §3 @L205-206] |
| 20 | content/docs/daily-cycle-rules.md:58-60 | «`.ai-factory/RULES.md` is the rule list … change it there with a rationale in the PR — never silence it with an inline suppression you cannot explain.» | 1 | [GUIDE §3 @L208-210] |
| 21 | content/docs/factory-overview.md:6 | «**Experimental.**» (first paragraph) | 5 | label: experimental (F5-5) |
| 22 | content/docs/factory-overview.md:8-11 | «It builds on the rules layer — every dispatched worker works inside the same compiled gates — and it expects a specific operator runtime; where a piece is missing, it degrades in named ways rather than pretending otherwise.» | 1 | [SSOT seq.factory.step.prove-rules-not-inert] + [SSOT seq.factory.step.install] + [TIER §3 @L77-84] |
| 23 | content/docs/factory-overview.md:26-27 | Tier 0 — tiny: ≤~5 lines, 1 file, no dispatch, senior does the edit | 1 | [TIER §2 @L43-44, L53] |
| 24 | content/docs/factory-overview.md:29-32 | Tier 1 — bulky-simple: «how» is one determinable sentence; whole pipeline on the executor tier | 1 | [TIER §2 @L46, L54] |
| 25 | content/docs/factory-overview.md:33-35 | Tier 2 — bulky-complex: top tier plans, executor implements and reviews; `/arch` plan-complete exception noted | 1 | [TIER §2 @L47, L55] (the page defers the exception's conditions to the rubric, which owns them) |
| 26 | content/docs/factory-overview.md:42-45 | tie-breaker (default Tier 2) + discriminator («state the how in one sentence → Tier 1; forced to choose → Tier 2») | 1 | [TIER §2 @L57-59] |
| 27 | content/docs/factory-overview.md:48-50 | «Tiers are **relative capability tiers, not hard-coded models**: the window slides to whatever the active harness offers.» | 1 | [TIER §2 @L39] |
| 28 | content/docs/factory-overview.md:54 | «`/harvest` is what brings the finished branch back» + `/aif-doctor` diagnostic | 1 | [GUIDE §2.3 @L176-178] ([SSOT seq.factory.step.dispatch-one]) |
| 29 | content/docs/factory-overview.md:61-65 | portability: gates + AGENTS.md work on other harnesses; skills do not auto-activate there — read the `SKILL.md` by hand | 1 | [GUIDE §5 @L262-267] (portability table) |
| 30 | content/docs/daily-cycle-factory.md:6 | «**Experimental.**» (first paragraph) | 5 | label: experimental |
| 31 | content/docs/daily-cycle-factory.md:14-15 | «Invoke `/arch <topic>`: the external design contour turns a raw idea into a reviewed design plus a routed handoff.» | 1 | [SSOT seq.env.step.arch-one-idea] |
| 32 | content/docs/daily-cycle-factory.md:17-19 | plan-complete `/arch` kickoff is the case the tier rubric routes whole-pipeline to the executor tier; «the rubric owns the conditions» | 1 | [TIER §2 @L47] (Tier-2 exception incl. its precondition — deferred to the rubric, not restated) |
| 33 | content/docs/daily-cycle-factory.md:23-27 | presets are named run configurations `/pipeline <task> --preset <name>`, vendored from shipped preset data (read at `94a3a9efcd`; landing carries no mechanical regen check — re-vendor on upgrade) | 1 | [GUIDE §6a] + `.claude/skills/pipeline/references/presets/*.json` @ `94a3a9efcd` |
| 34 | content/docs/daily-cycle-factory.md:28-31 | preset list (aif mode=autonomous no marker / economy mode=whole-line-executor marker=Z.AI GLM-5.3 SDK / night mode=mode-a-inline / sdd mode=in-session) | 1 | `presets/{aif,economy,night,sdd}.json` @ `94a3a9efcd` (re-vendored at the BS3 round after #1608 repointed the markers) |
| 35 | content/docs/daily-cycle-factory.md:37-40 | `/pipeline` reads kickoffs + `plan.md`, ranks, emits a launch table; empty backlog renders the overview with zero open umbrellas — normal | 1 | `.claude/skills/pipeline/SKILL.md` (backlog-plan handling) + `references/output-format.md` §1A («Total open umbrellas: <K>»; no «nothing queued» string exists in the skill — re-probed at BS3 round 3) |
| 36 | content/docs/daily-cycle-factory.md:40-41 | ranking = tier rubric meeting the backlog: design-heavy rows plan on the top tier; mechanical rows run whole-line on the executor tier | 1 | [TIER §2 @L54-55] |
| 37 | content/docs/daily-cycle-factory.md:45-48 | dispatch the top row, bring the branch back with `/harvest`; `/aif-doctor` when stalled | 1 | [GUIDE §2.3 @L176-178] ([SSOT seq.factory.step.dispatch-one]) |
| 38 | content/docs/quickstart-python.md:6-8 | «the Python lane is a pure-bash delivery — no `package.json`, no npm, no Node on the consumer machine» | 1 | [INSTALL py] intro + [W6] assertion (3) (Node-stripped PATH install) |
| 39 | content/docs/quickstart-python.md:9-12 | W6 cell «runs end to end — install, agent surface, generated-rule join, red/green/reject arms — as a merge-blocking job in the framework's CI» | 1 | [W6] header (asserts (1)–(10)) + its CI wiring note (`consumer-matrix-python-unfamiliar-stack-cell` job, audit-self.yml) |
| 40 | content/docs/quickstart-python.md:19-21 | install commands: `install.sh python` explicit lane wins over auto-detect; auto-detect OFFER on pyproject.toml + no package.json; `--refresh` re-sync | 1 | [INSTALL py] «How an AI agent (or consumer) runs it» |
| 41 | content/docs/quickstart-python.md:25-28 | firing self-check: plants violating `.py` in an OS temp dir only, asserts ast-grep AND ruff both fire RED, removes it; absent tool degrades loudly, never silently green | 1 | [INSTALL py] «Firing proof» |
| 42 | content/docs/quickstart-python.md:30-43 | what-lands tree (sgconfig.yml, ruff.toml, .getff/astgrep-rules starter rules, .getff/ruff-bans.toml, .getff/hooks/pre-push local rung, getff-python.yml, install log) | 1 | [INSTALL py] «What lands (fresh consumer)» + `setup.d/45-python.sh:887-899` `_py_deliver_local_hook_rung()` (the pre-push rung row added at the BS3 round — shipped since #1233, the tree had omitted it) |
| 43 | content/docs/quickstart-python.md:44-49 | collision policy: augment-first; sgconfig structurally merged; ruff.toml / pyproject [tool.ruff] never overwritten; isolated ruff-bans.toml; re-run byte-idempotent | 1 | [INSTALL py] «Collision policy» |
| 44 | content/docs/quickstart-python.md:51-57 | local commands: `ast-grep scan app/`, `ruff check .`, `ruff check --config .getff/ruff-bans.toml .` | 1 | [INSTALL py] CI-gate section (the two ruff passes) + [W6] arms (the scan invocation shape) |
| 45 | content/docs/quickstart-python.md:60-64 | CI gate: getff-python.yml runs `ast-grep scan` + `ruff check` as failing gates; version-pinned `@ast-grep/cli@0.44.1` + `ruff==0.15.21`; namespaced (never your ci.yml); trigger branch substituted to your default branch | 1 | [INSTALL py] «CI gate» + [W6] assertions (2),(10) (substitution proven) |
| 46 | content/docs/quickstart-python.md:66-73 | what-fires table: no-eval / no-os-system / no-datetime[.datetime].now ast-grep rules; ruff TID251/TID253 + DTZ005; channels local scan / CI gate | 1 | [INSTALL py] what-lands tree (rule names) + [W6] RED arm (fires non-zero on planted violation) |
| 47 | content/docs/quickstart-python.md:74 | «The matrix cell proves the discriminating pair on this lane: a planted violation fires non-zero, conforming code stays silent.» | 1 | [W6] RED arm (7) + GREEN arm (8) |
| 48 | content/docs/quickstart-python.md:80-88 | research loop: practice record → `--from-practice` renders to `.getff/rules-research/<entryId>.yml`; next install/`--refresh` joins into `.getff/astgrep-rules/`; generated rule fires RED on planted call, silent on conforming shape; non-direct-dep practice rejected to research-only, no rule written | 1 | [W6] assertions (5),(6),(7),(8),(9) |
| 49 | content/docs/quickstart-python.md:91-92 | «**generating** a researched rule needs Node … the install itself, and everything above, stays Node-free.» | 1 | [INSTALL py] scope note + [W6] assertion (3) |
| 50 | content/docs/quickstart-python.md:97 | «`mypy` and `import-linter` backends are out of scope for the Python lane today.» | 1 | [INSTALL py] scope note — label: planned (future backends) |
| 51 | content/docs/quickstart-python.md:98-99 | «The one-command public install path (`npx getff@latest init`) is not published yet» | — | label: planned (U10 open; kickoff §4 forbids inventing an entry command) |
| 52 | content/docs/degradations.md:14 | «**Experimental.**» (first paragraph) | 5 | label: experimental |
| 53 | content/docs/degradations.md:16-21 + reading note :23-27 | matrix «is copied verbatim — row text unchanged — from the one file that owns it; this page is a pointer, never a second source. Read the rows as evidenced claims, not probe-verified facts» + the reading note resolving the pre-pointer-ization `CLAUDE.md:108/:130` cites to the owner's §2 | 1 | byte-diff of the table vs `packages/core/templates/shared/tier-home.md` §3 performed at the BS3 round-3 audit (all rows byte-identical); NO mechanical gate on the landing — the note is prose, re-checked by hand on re-vendor |
| 54 | content/docs/degradations.md:23-30 | the 4 matrix rows (no aif runtime / no GLM subscription / no Fable / non-CC harness) | 1 | [TIER §3 @L77-84] — verbatim render, single owner A3 |
| 55 | content/docs/degradations.md:32-35 | «The authoritative rows live in your install at `.ai-factory/tier-home.md` §3. That file installs at `env` and `factory` depth only — on a `core` install it is absent by design» | 1 | [GUIDE §4 @L249-250] + [SSOT seq.env.step.read-tier-home] |
| 56 | content/docs/beta.md:7-8 | «the rules layer is the **beta**, the factory layer is **experimental**» | 5 | label: beta + experimental (parent §7 maturity set, design B-D1) |
| 57 | content/docs/beta.md:15-17 | «The gates run today, on your repo — locally where the lane ships hooks (npm; the Python lane ships a local pre-push rung too), and as failing CI gates on every lane.» | 1 | npm hooks: `setup.d/50-hooks.sh` (`.husky/` delivery); python rung: `setup.d/45-python.sh:887-899`; CI-gate lanes: `setup.d/46-cargo.sh` (getff-cargo.yml) + [INSTALL py] (getff-python.yml) |
| 58 | content/docs/beta.md:18-20 | «today the executable AGENTS.md you can inspect is getff's own repo … making yours is the next milestone» + «Other toolchains are on the roadmap, not in the box» | 2 | our repo's AGENTS.md + `make self-audit` — labels: milestone (F5-2) + planned |
| 59 | content/docs/beta.md:23-24 | «It runs today on a specific operator runtime» | 1 | [SSOT seq.factory.step.install] |
| 60 | content/docs/beta.md:26-27 | «where a capability is missing it degrades in named ways — the matrix is public on the Degradations page» | 1 | [TIER §3 @L77-84] rendered at content/docs/degradations.md |
| 61 | content/docs/beta.md:31-33 | «`npx getff@latest init` is **not published yet** — the install command will be announced with the beta» | — | label: planned (U10) |
| 62 | content/docs/beta.md:30-40 | entry paths (BS3 round: both named) — plugin `/plugin marketplace add artyhoo/getff` wires the TS lanes; clone + installer for every lane incl. Rust and Python; First Steps — core «ends with a rule that has gone red on input planted on purpose» | 1 | plugin/commands/install-enforcement.md step 1 (`ts-server` / `react-next` only) + `install.sh:163-171` (python/cargo/go positionals) + [SSOT seq.core.step.watch-a-rule-fire] |
| 63 | content/docs/beta.md:42-45 | feedback via issue templates (bug report / beta feedback) at artyhoo/getff `/issues/new/choose` | 1 | `.github/ISSUE_TEMPLATE/bug-report.yml` + `.github/ISSUE_TEMPLATE/beta-feedback.yml` (paths exist; re-evidenced at BS3 round 3 — task-doc citations removed) |
| 64 | content/docs/first-steps-core.md:16-17 | «The sequence ends with a rule that has gone red on input planted on purpose» | 1 | [SSOT seq.core.step.watch-a-rule-fire] (plants deliberately-bad input, asserts RED) |
| 65 | content/docs/first-steps-core.md:18 | «The rules layer ships as a **beta**.» | 5 | label: beta |
| 66 | content/docs/first-steps-core.md:steps 1-7 | all step content (commands, ordering, titles) | 1 | [SSOT seq.core steps install→research-your-stack] @ `94a3a9efcd` — vendored render, re-pinned at BS3 round 4 with TWO documented deviations (install step: the SSOT still ties `-y` to core, the real default is env since 2026-08-18, install.sh:645-650; fill-passport: the SSOT's `<PLACEHOLDER>` token does not exist in the template — fields are `<…>`); NO mechanical parity gate on the landing; provenance header names the deviations |
| 67 | content/docs/first-steps-core.md:64 | «an installed rule that has never been seen to fire is an unproven claim» | 1 | [SSOT seq.core.step.watch-a-rule-fire] (same sentence, source) |
| 68 | content/docs/first-steps-env.md:17 | «**Experimental.**» | 5 | label: experimental |
| 69 | content/docs/first-steps-env.md:steps 1-6 | all step content | 1 | [SSOT seq.env steps install→arch-one-idea] @ `94a3a9efcd` — vendored render, re-vendored at the BS3 round (verify-payload step had drifted); NO mechanical parity gate on the landing (operator finding); provenance header :9-15 |
| 70 | content/docs/first-steps-env.md:27-29 | deepening core→env keeps «every core artefact … byte-identical except `.prettierignore`»; `--refresh` warning (exits 0 while tier-home/arch stay absent) | 1 | [SSOT seq.env.step.install] (action + evidence incl. the 2026-08-09 measurement) |
| 71 | content/docs/first-steps-env.md:57-60 | tier-home owns Tier 0/1/2 criteria + degradation matrix; AGENTS.md only points there | 1 | [SSOT seq.env.step.read-tier-home] + [TIER §2/§3] |
| 72 | content/docs/first-steps-factory.md:16 | «**Experimental.**» | 5 | label: experimental |
| 73 | content/docs/first-steps-factory.md:21 | «pick this only if this machine runs the aif-handoff operator runtime — the factory payload dead-ends without it.» | 1 | [SSOT seq.factory.step.install] |
| 74 | content/docs/first-steps-factory.md:steps 1-8 | all step content | 1 | [SSOT seq.factory steps install→dispatch-one] @ `94a3a9efcd` — vendored render, re-vendored at the BS3 round (verify-payload step had drifted); NO mechanical parity gate on the landing (operator finding); provenance header :9-15 |
| 75 | content/docs/first-steps-factory.md:71-73 | «An empty backlog just renders the overview with zero open umbrellas — that is normal, not an error» (BS3 round 3: the SSOT's own action text still quotes a «nothing queued» string the shipped skill never emits — framework defect, operator finding; this render deviates from the SSOT body deliberately, marker+title contract intact) | 1 | `references/output-format.md` §1A (re-probed: `grep -rn 'nothing queued' .claude/skills/pipeline/` → no matches) |
| 76 | content/blog/getff-beta.md:10-11 | «an AI agent reads them as text. It parses your rules the same way it parses everything else — as context, not as constraints.» | 1 | https://agents.md/ FAQ («the agent simply parses the text you provide» — fetched live at the BS3 round 3 audit; same-site-quote citations removed) |
| 77 | content/blog/getff-beta.md:20-23 | layer-1 lanes: ESLint/husky (npm), gate generation (Rust), pure-bash python lane with no Node | 1 | [W6] + `install.sh:163-171` lanes + [INSTALL py] (repo evidence re-cited at BS3) |
| 78 | content/blog/getff-beta.md:23-25 | «Install, and you end inside a gate that has gone red on a planted violation — every quickstart ends with exactly that moment» | 1 | [SSOT seq.core.step.watch-a-rule-fire] + [W6] RED arm |
| 79 | content/blog/getff-beta.md:29 | «for cargo, the demo today is clippy, with cargo-deny on the roadmap» | 4 | F5-4's exact required shape — label: planned (deny arm) |
| 80 | content/blog/getff-beta.md:31-33 | executable AGENTS.md «**still a milestone for your repo**»: the inspectable one is our own, live-fired claims + `make self-audit` | 2 | our repo's AGENTS.md + hero demo (page.tsx:63-69 at head) — label: milestone (F5-2) |
| 81 | content/blog/getff-beta.md:40-42 | factory: kickoff in, fixed tier rubric (who plans / implements / reviews), branches inside compiled gates, harvest back | 1 | [TIER §2] + [SSOT seq.factory] + [GUIDE §2.3] |
| 82 | content/blog/getff-beta.md:44-45 | «where a capability is absent it degrades in named ways — the degradation matrix is public» | 1 | [TIER §3 @L77-84] rendered at content/docs/degradations.md |
| 83 | content/blog/getff-beta.md:55-56 | no signup/waitlist; «`npx getff@latest init` is not published» | — | label: planned (U10); entry = clone + installer ([INSTALL]) |
| 84 | content/blog/getff-beta.md:61-63 | feedback via issue templates on artyhoo/getff | 1 | `.github/ISSUE_TEMPLATE/{bug-report,beta-feedback}.yml` (re-evidenced at BS3 round 3) |
| 85 | app/(site)/page.tsx:83 | «Conventions compiled into native toolchain gates — ESLint/husky for npm; for cargo, the demo today is clippy, with cargo-deny on the roadmap.» (left panel card, reworded at BS3 — see FINDING-L1 resolution) | 1, 4 | npm arm: `setup.d/50-hooks.sh` (`.husky/` delivery) + `templates/ts-server/eslint.config.mjs`; cargo arm: `templates/cargo/clippy.toml` (shipped ban surface) vs `templates/cargo/deny.toml` (starter, no active bans) + no `cargo deny` step in `templates/cargo/github-actions-ci.yml` — **F5-4-conformant**, states its own tense, no `planned` label needed |
| 86 | app/(site)/page.tsx:88 | «Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.» (right panel card, BS1 copy) | 2 | our own repo as the demo: getff AGENTS.md + `make self-audit` (page.tsx:63-69 at head) — F5-2's exact sanctioned form («its own») |

**Wiring record (not claims — no rows):** the two panel `href` re-points demanded by B-D2 are
`app/(site)/page.tsx:80` → `/docs/daily-cycle-rules/` (killer card links killer-layer docs) and
`:85` → `/docs/factory-overview/` (environment card links factory docs). They carry no formula
and no label because they assert nothing; they are listed here only so the auditor can see the
landing diff accounted for in full.

## Label density

Rows carrying a pure or partial **planned / milestone** label: 5, 6, 50, 51, 58, 61, 79, 80, 83 → 9 rows (86 numbered rows total; row 85 dropped from this list at BS3 round 4 — its F5-4-conformant wording states its own tense; the two href re-points are recorded as wiring below the table, not as rows).
Rows carrying **experimental / beta** labels: 7, 10, 21, 30, 52, 56, 65, 68, 72 → 9 rows.

## Findings raised while writing this ledger

- **FINDING-L1 (row 85) — RESOLVED at BS3.** The landing's left panel card carried the BS1
  copy «clippy/cargo-deny for cargo» inside a present-tense gate list, which F5-4 forbids
  («clippy demo, deny roadmap»). BS2 could not edit it (its permitted edits to
  `app/(site)/page.tsx` were the two hrefs) and correctly flagged it rather than reworking it
  silently. BS3 owns the file and reworded it to «for cargo, the demo today is clippy, with
  cargo-deny on the roadmap» — the same shape row 79 already uses in the blog. Row 85 above is
  updated to the shipped wording; the claim is now F5-4-conformant rather than `planned`.
- **FINDING-L2 (rows 39, 47):** the W6 cell's *pass status* in the framework's CI is not
  observable from this container (no github.com egress); the page claims what the cell
  *demonstrates and asserts* (its arms, its merge-blocking wiring), never a green badge.
- **FINDING-L3 — RESOLVED at BS3 round 2.** Row 11's blanket «every command below is
  shipped at every depth» was NOT the source's own wording pair: the render had narrowed
  the guide's qualifier (`python/go/cargo installs ship no scripts/ by construction`,
  GUIDE §3) from all five commands to one. The BS3 cold audit caught it (G17); the render
  now carries the source's qualifier in full, stated once up front.

## BS3 round 2 — GAP-fix re-audit prep (2026-09-10)

The BS3 leg-A cold audit (see `BS3-GAPS.md`, branch `bs3-cutover` @ `ac3e7d1`) returned
STOP with 18 GAPs. This round fixes them on the branch so leg A can re-run on the new
head. Framework evidence re-pinned to `staging` @ **`94a3a9efcd`** (the BS2-era pin
`23f5fb882d` had drifted: #1608 repointed the preset markers, the first-steps source
gained two verify-payload rewrites, `pre-push.ts` moved the `render-rule-index --check`
wiring to :1351-1352).

**Operator decision exercised (documented, reversible): the stack-count fork was resolved
by WIDENING to the four shipped lanes** (npm + python + cargo + go). Rationale: `install.sh:163-171`
accepts `python|cargo|go` positionals and `setup.d/45-python.sh`/`46-cargo.sh`/`47-go.sh`
ship today; the site already carried a full Python quickstart, so «Two stacks today …
Python, Go … not in the box» was false against the repo, not conservative. Narrowing
instead would delete true, already-authored content. Wrong if the operator intended the
beta to advertise fewer lanes than the installer ships — a one-line copy follow-up on the
live site if so.

Per-GAP disposition (G-numbers from `BS3-GAPS.md`):

| G | Fix on the surface |
|---|---|
| G1 | `page.tsx:5-6` meta/og/twitter/structured-data description → row-85 shape (clippy today, cargo-deny roadmap) |
| G2 | `llms.txt/route.ts:22` project summary → same shape |
| G3 | `quickstart-rust.md` — frontmatter + body de-overclaim; banned-dependency bullet replaced (extend `clippy.toml` `disallowed-methods`, the shipped surface); «same way in CI» reworded to the real clippy gate; table's cargo-deny row removed, channels corrected (`cargo clippy` / `getff-cargo.yml`, no pre-push hook on this lane) |
| G4 | `docs/executable-agents-md.md` — all citations re-anchored at `94a3a9efcd`: AGENTS.md:83/:89/:26-60, 29 rules, enforced line quoted in full (4 segments), npm live-fire at root-agents-demo.test.ts:120-131/:133-143, ratchet :51-64, cargo ✅ provenance corrected (`packages/core/backends/cargo/firing.test.ts` dev-machine gate + :144-150 wiring assertion), pre-push.ts:1351-1352 |
| G5 | `blog/executable-agents-md.md` — same nine corrections mirrored |
| G6 | `limits.md` — §2 rewritten: four stacks (Rust bullet now honest about the starter deny.toml and the absent `cargo deny` workflow); frontmatter «two supported stacks» → four |
| G7 | `page.tsx:190` limits list — four lanes, cargo-deny scoped to roadmap |
| G8 | `daily-cycle-factory.md` — preset list re-vendored from `94a3a9efcd` (aif no marker; economy GLM-5.3 SDK), «not hand-maintained» replaced by an honest vendored+pin statement |
| G9 | `first-steps-factory.md` — verify-payload step re-vendored (five factory additions; pipeline/night-mode correctly attributed to env+); pin bumped |
| G10 | `first-steps-env.md` — verify-payload step re-vendored (tier-home + five env skills); pin bumped |
| G11 | the «parity-gated» claims removed everywhere they were asserted (ledger intro, rows 69/74) — the landing ships no parity mechanism; recorded as an operator finding, not a claim |
| G12 | `page.tsx` hero + copy block — `npm install` added to both fresh-clone sequences (README:133: `./setup`/clone ships no node_modules; `make self-audit` needs them) |
| G13 | `beta.md` — two entry paths named honestly (plugin = TS lanes; clone+installer = every lane) |
| G14 | `quickstart-rust.md` §1 — install re-pointed to `install.sh cargo`; the plugin bridge's TS-only stack surface stated |
| G15 | `quickstart-python.md` — `.getff/hooks/pre-push` added to the what-lands tree |
| G16 | `beta.md:15-17` — local-hook statement widened to «npm; the Python lane ships a local pre-push rung too» |
| G17 | `daily-cycle-rules.md` — the guide's lane qualifier restored in full (all `scripts/` commands are npm-lane-only) |
| G18 | `faq.md` ×3 + `consulting/page.tsx` ×1 — F5-4 shape applied |

Residual UNVERIFIABLE (unchanged, needs a human, listed in `BS3-GAPS.md`): the two timing
claims, the three competitor-capability comparisons, the one-email forward promise, the
two demo-video captions. The draft announcement (`getff-beta.md`, `draft: true`) was left
untouched per kickoff §4.

## BS3 round 3 — re-audit GAP fixes (2026-09-10)

Leg A round 2 (cold audit of `31deb04`, 78 claims: 69 VERIFIED / 6 GAP / 3 UNVERIFIABLE)
returned REVISE. All six fixed:

- pre-push trio (daily-cycle-rules beat 4 + ledger row 15): the consumer pre-push runs
  rule-glob liveness / lint-staged resolution / generated-rule-material
  (`pre-push.ts` `owner: consumer` sections); typecheck/tests/depcruise are `ci.yml` jobs
  (`templates/ts-server/github-actions-ci.yml:54-104` → `40-configs.sh:448`). Framework
  defect handed to the operator: the shipped `AI-USAGE-GUIDE.md:195-196` and
  `DESCRIPTION.template.md:61` still name the trio at pre-push — every consumer install
  inherits that drift (BS3 §4 forbids framework-repo changes here).
- «nothing queued» (daily-cycle-factory + first-steps-factory + ledger rows 35/75): the
  string does not exist in the shipped pipeline skill; both pages now describe the real
  empty-backlog rendering (overview, zero open umbrellas). Framework defect handed to the
  operator: `first-steps.source.json` seq.factory.run-pipeline action text carries the
  unanchored phrase; the first-steps-factory render deviates from the SSOT body
  deliberately (step marker + bold-title contract intact) until the SSOT is fixed.
- demo caption (page.tsx): `as any` is killed by the pre-commit hook (lint-staged →
  `no-explicit-any: error`), not pre-push — title, label and caption corrected.
- ledger method defects (rows 63/76/84 same-site & task-doc citations; rows 15/35/75
  doc-against-doc verdicts) — all re-evidenced against the repository or the primary
  source.

## BS3 round 4 — third-audit GAP fixes (2026-09-10)

Leg A round 3 (cold audit of `98f87a6`, 75 claims: 69 VERIFIED / 6 GAP / 2 UNVERIFIABLE)
returned REVISE. Dispositions:

- **#33 `-y`/core-depth** (first-steps-core step 1): the installer's non-interactive
  default was raised core→env on 2026-08-18 (`install.sh:645-650`, commit `1cff911468`);
  the render now commands `--profile core` explicitly and states the real default.
  Framework defect → operator: `first-steps.source.json` seq.core.step.install still
  says «`-y` (default; equivalently `--profile core`)».
- **#36 `<PLACEHOLDER>` token** (all three first-steps fill-passport steps): the shipped
  `DESCRIPTION.template.md` carries `<PROJECT_NAME>`-style fields, no literal
  `<PLACEHOLDER>`; wording changed to «`<…>` placeholder field». Framework defect →
  operator: the SSOT fill-passport action uses the same phantom token.
- **#46 stale CLAUDE.md cites in the vendored degradation matrix**: rows are
  verbatim-locked to `tier-home.md` §3 (row 53's byte-parity property), so the fix is a
  page-side reading note resolving `CLAUDE.md:108/:130` to the owner's §2. Framework
  defect → operator: `tier-home.md` §3 itself carries the stale cites.
- **#69 draft stack list** (blog/getff-beta.md:27): «TypeScript/JS, Rust and Python» →
  «…, Python and Go» — body-only edit, `draft: true` frontmatter untouched (containment
  re-checked post-edit).
- **#76/#77 ledger method defects**: rows 53/66/85 re-evidenced against the framework
  repo; the phantom «gate row 4/8» references deleted; row 15's «zero occurrences»
  precision fixed (maintainer sections/comments only); row 85 dropped from the
  planned-label density list (9 rows).
