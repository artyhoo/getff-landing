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
header in each page names the commit; parity mechanically checked at gate row 8), so the rows
below cover each page's own connective prose; the step content's evidence is the SSOT itself.

| # | page:line | claim (verbatim) | F5 | evidence / label |
|---|---|---|---|---|
| 1 | content/docs/what-is-getff.md:6-7 | «getff is two layers around one idea: **conventions your AI agents can't silently bypass**» | 1 | [W6] RED arm (a rule-as-gate fires non-zero on a planted violation) + [LIMITS] shipped-stack statement |
| 2 | content/docs/what-is-getff.md:7-9 | «AI DX for your codebase: conventions AI agents can't silently bypass — and an AI-run dev environment around them.» (quoted lede) | 1 | [LEDE] — quoted verbatim per design B-D2; its factory half is separately labelled experimental (row 10; panel badge page.tsx:86) |
| 3 | content/docs/what-is-getff.md:14-16 | «The first layer compiles your conventions into the toolchain gates your project already runs: ESLint rules and husky hooks for npm projects, gate generation for Rust.» | 1 | npm arm: kept quickstart page content/docs/quickstart-ts.md:29 + [LIMITS]; Rust arm: [LIMITS] «Rust gate generation» + [SSOT seq.core.step.install] (`install.sh cargo` lane exists) |
| 4 | content/docs/what-is-getff.md:18 | «Today this layer covers TypeScript/JS, Rust and Python stacks» | 1 | [W6] (python lane e2e); npm-tarball cell `tests/consumer-matrix/npm-tarball-cell.sh` (npm); [LIMITS] + [SSOT seq.core.step.install] (cargo lane) |
| 5 | content/docs/what-is-getff.md:18 | «with more toolchains on the roadmap» | 1 | [LIMITS] «Other toolchains are on the roadmap, not in the box» — label: planned |
| 6 | content/docs/what-is-getff.md:19-20 | «an *executable* AGENTS.md today means **getff's own repo** — generating yours from your conventions is the next milestone, not a shipped feature.» | 2 | our repo's AGENTS.md + `make self-audit` demo (app/(site)/page.tsx:63-69 at head, kept BS1 hero) — label: milestone (F5-2 exactly) |
| 7 | content/docs/what-is-getff.md:22 | «The rules layer ships as a **beta**.» | 5 | label: beta (public-beta label, parent §7 maturity set; design B-D1) |
| 8 | content/docs/what-is-getff.md:27-28 | «Tasks are tiered by a fixed rubric — who plans, who implements, who reviews — so cheap mechanical work runs on a cheaper model and design-heavy work plans on a stronger one.» | 1 | [TIER §2 @L43-59] (two questions, three tiers, criteria table) |
| 9 | content/docs/what-is-getff.md:29-31 | «The factory installs on top of the rules layer: the factory profile ships the same rule-proving steps, so dispatched work happens in a repo where those gates are installed and proven.» | 1 | [SSOT seq.factory.step.prove-rules-not-inert] (the proving steps are IN the factory sequence) |
| 10 | content/docs/what-is-getff.md:33-35 | «it expects a specific operator runtime and its capability surface degrades in named ways when pieces are missing» | 1 | [SSOT seq.factory.step.install] («the factory payload dead-ends without it») + [TIER §3 @L77-84] (named degradation rows) — label: experimental (same sentence) |
| 11 | content/docs/daily-cycle-rules.md:9-10 | «Nothing here needs anything beyond a core install: every command below is shipped by the installer at **every** depth.» | 1 | [GUIDE §3 @L184-185] (same sentence, source) — the npm-lane-only qualifier for `ci-available-probe.sh` is carried inline at :45-46 as the guide does |
| 12 | content/docs/daily-cycle-rules.md:15-18 | beat 1 — read `AGENTS.md`, then `RULES.md` / `ARCHITECTURE.md` | 1 | [GUIDE §3 @L187-188] |
| 13 | content/docs/daily-cycle-rules.md:22-23 | «The ESLint custom rules are the earliest channel: they fire in your editor and in `npm run lint`.» | 1 | [GUIDE §3 @L189-190] |
| 14 | content/docs/daily-cycle-rules.md:28-32 | beat 3 — `bash scripts/audit-ai-docs.sh`, plus `check-rule-globs.sh` / `check-lintstaged-resolves.sh` when layout/deps changed; pre-commit runs lint-staged | 1 | [GUIDE §3 @L191-193] |
| 15 | content/docs/daily-cycle-rules.md:35-37 | beat 4 — `.husky/pre-push` fires typecheck, `vitest related`, dependency-cruiser; not bypassed with `--no-verify` | 1 | [GUIDE §3 @L194-195] |
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
| 33 | content/docs/daily-cycle-factory.md:23-26 | presets are named run configurations `/pipeline <task> --preset <name>`, rendered from shipped preset data, not hand-maintained | 1 | [GUIDE §6a @L284-290] |
| 34 | content/docs/daily-cycle-factory.md:27-30 | preset list (aif / economy / night / sdd with modes + markers) | 1 | [GUIDE §6a @L292-295] (rendered block, copied verbatim) |
| 35 | content/docs/daily-cycle-factory.md:37-39 | `/pipeline` reads kickoffs + `plan.md`, ranks, emits a launch table; empty backlog reports «nothing queued» — normal | 1 | [GUIDE §2.3 @L170-172] ([SSOT seq.factory.step.run-pipeline]) |
| 36 | content/docs/daily-cycle-factory.md:40-41 | ranking = tier rubric meeting the backlog: design-heavy rows plan on the top tier; mechanical rows run whole-line on the executor tier | 1 | [TIER §2 @L54-55] |
| 37 | content/docs/daily-cycle-factory.md:45-48 | dispatch the top row, bring the branch back with `/harvest`; `/aif-doctor` when stalled | 1 | [GUIDE §2.3 @L176-178] ([SSOT seq.factory.step.dispatch-one]) |
| 38 | content/docs/quickstart-python.md:6-8 | «the Python lane is a pure-bash delivery — no `package.json`, no npm, no Node on the consumer machine» | 1 | [INSTALL py] intro + [W6] assertion (3) (Node-stripped PATH install) |
| 39 | content/docs/quickstart-python.md:9-12 | W6 cell «runs end to end — install, agent surface, generated-rule join, red/green/reject arms — as a merge-blocking job in the framework's CI» | 1 | [W6] header (asserts (1)–(10)) + its CI wiring note (`consumer-matrix-python-unfamiliar-stack-cell` job, audit-self.yml) |
| 40 | content/docs/quickstart-python.md:19-21 | install commands: `install.sh python` explicit lane wins over auto-detect; auto-detect OFFER on pyproject.toml + no package.json; `--refresh` re-sync | 1 | [INSTALL py] «How an AI agent (or consumer) runs it» |
| 41 | content/docs/quickstart-python.md:25-28 | firing self-check: plants violating `.py` in an OS temp dir only, asserts ast-grep AND ruff both fire RED, removes it; absent tool degrades loudly, never silently green | 1 | [INSTALL py] «Firing proof» |
| 42 | content/docs/quickstart-python.md:30-42 | what-lands tree (sgconfig.yml, ruff.toml, .getff/astgrep-rules starter rules, .getff/ruff-bans.toml, getff-python.yml, install log) | 1 | [INSTALL py] «What lands (fresh consumer)» (tree copied) |
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
| 53 | content/docs/degradations.md:16-21 | matrix «is copied verbatim — row text unchanged — from the one file that owns it; this page is a pointer, never a second source. Read the rows as evidenced claims, not probe-verified facts» | 1 | [TIER §3 @L69-75] (sequencing-honesty note) + [GUIDE §4 @L251-253]; byte-exact copy verified at gate (row 4 checks) |
| 54 | content/docs/degradations.md:23-30 | the 4 matrix rows (no aif runtime / no GLM subscription / no Fable / non-CC harness) | 1 | [TIER §3 @L77-84] — verbatim render, single owner A3 |
| 55 | content/docs/degradations.md:32-35 | «The authoritative rows live in your install at `.ai-factory/tier-home.md` §3. That file installs at `env` and `factory` depth only — on a `core` install it is absent by design» | 1 | [GUIDE §4 @L249-250] + [SSOT seq.env.step.read-tier-home] |
| 56 | content/docs/beta.md:7-8 | «the rules layer is the **beta**, the factory layer is **experimental**» | 5 | label: beta + experimental (parent §7 maturity set, design B-D1) |
| 57 | content/docs/beta.md:15-16 | «The gates run today, on your repo — locally where the lane ships hooks (npm), and as failing CI gates on every lane.» | 1 | npm hooks: content/docs/quickstart-ts.md:29 (kept); CI-gate lanes: [INSTALL py] + [LIMITS] (cargo) |
| 58 | content/docs/beta.md:18-20 | «today the executable AGENTS.md you can inspect is getff's own repo … making yours is the next milestone» + «Other toolchains are on the roadmap, not in the box» | 2 | our repo's AGENTS.md + `make self-audit` — labels: milestone (F5-2) + planned |
| 59 | content/docs/beta.md:23-24 | «It runs today on a specific operator runtime» | 1 | [SSOT seq.factory.step.install] |
| 60 | content/docs/beta.md:26-27 | «where a capability is missing it degrades in named ways — the matrix is public on the Degradations page» | 1 | [TIER §3 @L77-84] rendered at content/docs/degradations.md |
| 61 | content/docs/beta.md:31-33 | «`npx getff@latest init` is **not published yet** — the install command will be announced with the beta» | — | label: planned (U10) |
| 62 | content/docs/beta.md:30-38 | entry path: clone the framework repo, run the installer; First Steps — core «ends with a rule that has gone red on input planted on purpose» | 1 | [INSTALL] entry path + [SSOT seq.core.step.watch-a-rule-fire] |
| 63 | content/docs/beta.md:42-45 | feedback via issue templates (bug report / beta feedback) at artyhoo/getff `/issues/new/choose` | 1 | kickoff D6 (leg B ships the templates; link resolves either way) + design B-D6 |
| 64 | content/docs/first-steps-core.md:16-17 | «The sequence ends with a rule that has gone red on input planted on purpose» | 1 | [SSOT seq.core.step.watch-a-rule-fire] (plants deliberately-bad input, asserts RED) |
| 65 | content/docs/first-steps-core.md:18 | «The rules layer ships as a **beta**.» | 5 | label: beta |
| 66 | content/docs/first-steps-core.md:steps 1-7 | all step content (commands, ordering, titles) | 1 | [SSOT seq.core steps install→research-your-stack] — vendored render, parity-gated (gate row 8); provenance header :9-15 names f49e35311c |
| 67 | content/docs/first-steps-core.md:64 | «an installed rule that has never been seen to fire is an unproven claim» | 1 | [SSOT seq.core.step.watch-a-rule-fire] (same sentence, source) |
| 68 | content/docs/first-steps-env.md:17 | «**Experimental.**» | 5 | label: experimental |
| 69 | content/docs/first-steps-env.md:steps 1-6 | all step content | 1 | [SSOT seq.env steps install→arch-one-idea] — vendored render, parity-gated; provenance header :9-15 |
| 70 | content/docs/first-steps-env.md:27-29 | deepening core→env keeps «every core artefact … byte-identical except `.prettierignore`»; `--refresh` warning (exits 0 while tier-home/arch stay absent) | 1 | [SSOT seq.env.step.install] (action + evidence incl. the 2026-08-09 measurement) |
| 71 | content/docs/first-steps-env.md:57-60 | tier-home owns Tier 0/1/2 criteria + degradation matrix; AGENTS.md only points there | 1 | [SSOT seq.env.step.read-tier-home] + [TIER §2/§3] |
| 72 | content/docs/first-steps-factory.md:16 | «**Experimental.**» | 5 | label: experimental |
| 73 | content/docs/first-steps-factory.md:21 | «pick this only if this machine runs the aif-handoff operator runtime — the factory payload dead-ends without it.» | 1 | [SSOT seq.factory.step.install] |
| 74 | content/docs/first-steps-factory.md:steps 1-8 | all step content | 1 | [SSOT seq.factory steps install→dispatch-one] — vendored render, parity-gated; provenance header :9-15 |
| 75 | content/docs/first-steps-factory.md:71-72 | «An empty backlog reports «nothing queued» — that is normal, not an error» | 1 | [SSOT seq.factory.step.run-pipeline] |
| 76 | content/blog/getff-beta.md:10-11 | «an AI agent reads them as text. It parses your rules the same way it parses everything else — as context, not as constraints.» | 1 | agents.md official FAQ as quoted in the kept post content/blog/executable-agents-md.md:9-10 («the agent simply parses the text you provide») |
| 77 | content/blog/getff-beta.md:20-23 | layer-1 lanes: ESLint/husky (npm), gate generation (Rust), pure-bash python lane with no Node | 1 | quickstart-ts (kept) + [LIMITS] + [INSTALL py] + [W6] |
| 78 | content/blog/getff-beta.md:23-25 | «Install, and you end inside a gate that has gone red on a planted violation — every quickstart ends with exactly that moment» | 1 | [SSOT seq.core.step.watch-a-rule-fire] + [W6] RED arm + kept quickstart-ts §3 |
| 79 | content/blog/getff-beta.md:29 | «for cargo, the demo today is clippy, with cargo-deny on the roadmap» | 4 | F5-4's exact required shape — label: planned (deny arm) |
| 80 | content/blog/getff-beta.md:31-33 | executable AGENTS.md «**still a milestone for your repo**»: the inspectable one is our own, live-fired claims + `make self-audit` | 2 | our repo's AGENTS.md + hero demo (page.tsx:63-69 at head) — label: milestone (F5-2) |
| 81 | content/blog/getff-beta.md:40-42 | factory: kickoff in, fixed tier rubric (who plans / implements / reviews), branches inside compiled gates, harvest back | 1 | [TIER §2] + [SSOT seq.factory] + [GUIDE §2.3] |
| 82 | content/blog/getff-beta.md:44-45 | «where a capability is absent it degrades in named ways — the degradation matrix is public» | 1 | [TIER §3 @L77-84] rendered at content/docs/degradations.md |
| 83 | content/blog/getff-beta.md:55-56 | no signup/waitlist; «`npx getff@latest init` is not published» | — | label: planned (U10); entry = clone + installer ([INSTALL]) |
| 84 | content/blog/getff-beta.md:61-63 | feedback via issue templates on artyhoo/getff | 1 | kickoff D6 + design B-D6 |
| 85 | app/(site)/page.tsx:83 | «Conventions compiled into native toolchain gates — ESLint/husky for npm; for cargo, the demo today is clippy, with cargo-deny on the roadmap.» (left panel card, reworded at BS3 — see FINDING-L1 resolution) | 1, 4 | npm arm: quickstart-ts (kept) [F5-1]. cargo arm: **F5-4-conformant** — clippy present tense, cargo-deny explicitly roadmap; same shape as row 79's blog sentence. No `planned` label needed: the sentence now states its own tense |
| 86 | app/(site)/page.tsx:88 | «Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.» (right panel card, BS1 copy) | 2 | our own repo as the demo: getff AGENTS.md + `make self-audit` (page.tsx:63-69 at head) — F5-2's exact sanctioned form («its own») |

**Wiring record (not claims — no rows):** the two panel `href` re-points demanded by B-D2 are
`app/(site)/page.tsx:80` → `/docs/daily-cycle-rules/` (killer card links killer-layer docs) and
`:85` → `/docs/factory-overview/` (environment card links factory docs). They carry no formula
and no label because they assert nothing; they are listed here only so the auditor can see the
landing diff accounted for in full.

## Label density

Rows carrying a pure or partial **planned / milestone** label: 5, 6, 50, 51, 58, 61, 79, 80, 83, 85 → 10 rows (86 numbered rows total; the two href re-points are recorded as wiring below the table, not as rows).
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
- **FINDING-L3:** row 17's blanket «every command below is shipped at every depth» vs the
  npm-lane-only `ci-available-probe.sh` mirrors the source guide's own wording pair (GUIDE §3
  blanket sentence + inline qualifier); both halves are quoted so the auditor sees the source's
  tension, not a new one introduced by the render.
