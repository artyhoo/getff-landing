# ENCYCLOPEDIA-LEDGER-E4.md — stage ledger for the rules-corpus raw reference (census F)

Stage: beta-docs-encyclopedia E4 · Scope: census family F — 45 MISSING pages + 4 PARTIAL fills.
Working pin (every anchor below): framework `b069c59328aa8e08671d3a19fd25efa618dfc1c5` (staging `FETCH_HEAD`, 2026-09-11; census re-anchored from `a1337cb301`).
One row per capability sentence: `| page | sentence (short) | evidence anchor(s) at pin |`. Labels `experimental` / `planned` / `deferred-backend` where the page itself carries them.

## F1-F19, F21-F25, F27-F30 — rule pages (28)

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| rule-00-rule-index | The rule index is generated, forbidden to hand-edit, regen'd via render-rule-index, and drift-checked at pre-push | `.claude/rules/00-rule-index.md:1,3`; `scripts/render-rule-index.mjs:24,177`; `packages/core/hooks/pre-push.ts:1352` |
| rule-00-rule-index | The checker fails loudly on missing Class/Fires fields rather than rendering blanks | `scripts/render-rule-index.mjs:106` |
| rule-ai-laziness-digest | The digest is an always-on resident hot digest whose counters must be exact-prefix quotes of the catalogue | `.claude/rules/ai-laziness-digest.md:5,10,14`; `packages/core/principles/35-ai-laziness-digest-anti-drift.test.ts:5-9` |
| rule-ai-laziness-digest | ONE senior-seat digest-under-carried incident restores full residency (rollback trigger) | `.claude/rules/ai-laziness-digest.md:8` |
| rule-ai-laziness-traps | Kickoffs must cite + enumerate active T-numbers + add ≥1 domain trap; blanket reference is itself T7 | `.claude/rules/ai-laziness-traps.md:188,189,191,195`; companion test `packages/core/principles/12-ai-laziness-traps.test.ts` (`:15,207`) |
| rule-attention-is-not-a-mechanism | A load-bearing check must be a deterministic gate or a named cold-agent protocol; bare attention is never the detection layer | `.claude/rules/attention-is-not-a-mechanism.md:17-19,28,29` |
| rule-autonomous-loop-continuity | Under AIF_AUTONOMOUS=1 the Stop hook returns decision:block while dispatched work is in flight — a mechanism, not a reminder | `.claude/rules/autonomous-loop-continuity.md:7,24-28`; channel markers `:7,8` |
| rule-autonomous-loop-continuity | Every load-bearing wait emits a terminal verdict; monitor silence is not health | `.claude/rules/autonomous-loop-continuity.md:49,54-56` |
| rule-build-first-reuse-default | Every capability proposal resolves to one of seven verdicts; default ADOPT/REFERENCE; BUILD needs the §3 mechanism | `.claude/rules/build-first-reuse-default.md:32,41,44`; test `packages/core/principles/11-build-first-reuse-default.test.ts` (`:17,93`) |
| rule-ci-tool-pinning | Bare run: tool installs must pin versions; --prefix installs must be lockfile-aware (npm ci); escape hatch `# ci-tool-pin: allow` | `.claude/rules/ci-tool-pinning.md:29,31-32,40,69-76`; gate `unpinnedToolInstallSection` (`:18,104`) |
| rule-ci-tool-pinning | Bare root `npm install` is deliberately NOT gated (honest deferred gap, no prose-MUST the repo violates) | `.claude/rules/ci-tool-pinning.md:44` |
| rule-cold-seat-economy | A cold seat's verdict is re-earned by substance movement, not SHA movement; never self-issue a verdict | `.claude/rules/cold-seat-economy.md:25,48-51,105,111` |
| rule-cold-seat-economy | Fresh narrow seats with inlined watch-lists dominate resume (~85.9k/0 tools vs ~185k/19) | `.claude/rules/cold-seat-economy.md:76,79` |
| rule-companion-install-principle | Companions install via their own official installer, detect-first, no version pin, free-on-subscription default | `.claude/rules/companion-install-principle.md:23,42-44` |
| rule-companion-install-principle | No CI gate yet; promotion to a grep gate at ≥3 manifest rows or first pin incident | `.claude/rules/companion-install-principle.md:12,48` |
| rule-destination-environment-verification | Kickoffs declare host-verify command blocks (or an explicit ≥20-char opt-out); runner exits 0/1/2 fail-closed | `.claude/rules/destination-environment-verification.md:21-23,41,44,47,51-55` |
| rule-destination-environment-verification | §1b: a cannot-reach claim about the destination must quote a live probe — prose, deliberately not a gate | `.claude/rules/destination-environment-verification.md:75-80`; class rationale `:12` |
| rule-doc-authority-hierarchy | Every canonical doc carries Authoritative-for/NOT-authoritative-for; rule files add a Class field; principle 09 enforces dynamically | `.claude/rules/doc-authority-hierarchy.md:37,100-102,58`; test `packages/core/principles/09-doc-authority-hierarchy.test.ts` (`:15`) |
| rule-dual-implementation-discipline | Every CC hook carries @dual-pair or @cc-only-rationale; drift is checked by bash probes in CI or a named cold agent, never bare attention | `.claude/rules/dual-implementation-discipline.md:10,128-129,14` |
| rule-effort-worthiness | Burden of proof sits on MORE rigor; a four-test card runs at every effort fork; KPI is goal-shift | `.claude/rules/effort-worthiness.md:27-30,34-39,47-48` |
| rule-egress-no-api-bypass | Branches land via host git push (real pre-push gate); Git-Data-API land is break-glass with a mandatory local CI-sweep substitute | `.claude/rules/egress-no-api-bypass.md:14,22,24,26` |
| rule-evidence-regeneration | Evidence blocks are regenerated by re-firing the committed invalid fixture at the CI-resolved version and pasting the fresh diagnostic | `.claude/rules/evidence-regeneration.md:21,27-45,94`; gates named `:12` |
| rule-git-conflict-merge-forward | Fix a CONFLICTING PR by merging the base INTO the PR branch and plain-pushing the fast-forward; never rebase a published branch in an agent session | `.claude/rules/git-conflict-merge-forward.md:14,18-38,48-51` |
| rule-kickoff-staging-placement | Kickoffs are tracked files read from staging — merge to staging BEFORE dispatching | `.claude/rules/kickoff-staging-placement.md:21,26,28`; tests/gates `:12,45-46` |
| rule-kickoff-staging-placement | Kickoff names must resolve to the stage form or a named sidecar — anything else is a loud error | `.claude/rules/kickoff-staging-placement.md:79` |
| rule-language-discipline | Internal machinery is English-only (CI principle 22); human-facing output is AIF_HOOK_LANG-gated; match-data stays bilingual | `.claude/rules/language-discipline.md:22-28,34-37,45,51-53` |
| rule-memory-codification | Durable conventions are codified into the repo in the same step; memory entries reduce to pointers; CI is structurally unreachable (ceiling B) | `.claude/rules/memory-codification.md:18,37-43,73`; hook channel `:3,49` |
| rule-parallel-subwave-isolation | Parallel AI sessions always get git worktrees (portable helper); sequential fallback, never a shared dir | `.claude/rules/parallel-subwave-isolation.md:20,27,32,38,44-46` |
| rule-phase-research-coverage | Negative-existence claims require the coverage checklist; the backward-check must be a sweep, not a restatement | `.claude/rules/phase-research-coverage.md:27,32,33,37`; test `:12` |
| rule-phase-research-coverage | Deliberately no edit-time inject sibling (hook glob grammar cannot express the mid-path-star scope) | `.claude/rules/phase-research-coverage.md:21` |
| rule-recommendation-laziness-discipline | Inline verdicts carry ≥1 evidence-bearing tool call quoted in the same turn; genuine forks surface via AskUserQuestion | `.claude/rules/recommendation-laziness-discipline.md:18-23,31,35,55-56` |
| rule-recommendation-laziness-discipline | The narrow-B Stop-hook verdict-scan was dropped at 84.2% FP — measured, not shipped | `.claude/rules/recommendation-laziness-discipline.md:45-49` |
| rule-research-source-trust | Provenance is authorized via Tier 0/1/2; anything else fails closed; trust grants are data changes, never source edits | `.claude/rules/research-source-trust.md:29,41-42`; test `:14` |
| rule-research-source-trust | Path B (LLM code-gen) activation downgrades Tier-1 to Tier-2-ack — a binding trigger | `.claude/rules/research-source-trust.md:35,37` |
| rule-reviewer-discipline | A reviewer never picks project strategy — findings needing a strategy call surface as DECISION-NEEDED, then stop | `.claude/rules/reviewer-discipline.md:14,18,26-31` |
| rule-seat-lifecycle | The SLP owns the lifecycle SEQUENCE only; every mechanism is owned by a named ADR/spec; a grep test asserts all four skills link here | `.claude/rules/seat-lifecycle.md:12-16,18,22,39,112` |
| rule-skill-description-quality | SKILL.md descriptions must distinguish the skill from peers; when_to_use names ≥1 concrete trigger; deferred with an explicit promotion criterion | `.claude/rules/skill-description-quality.md:12,37-39,45` |
| rule-source-before-shape | The authoritative source is read first as an input to the shape — grep SSOT before writing a body, quote the spec before scoping | `.claude/rules/source-before-shape.md:26,28,29`; layers `:44,46` |
| rule-source-before-shape | Layer A's once-per-session token can be spent-before-creation — stated, not hidden (would not have fired on its own origin incident) | `.claude/rules/source-before-shape.md:48-51` |
| rule-zcode-parity-doctrine | Full ZCode parity is the goal; the 22-hook census classifies parity/zcode-gap/cc-only/plugin-gap and is the binding SSOT | `.claude/rules/zcode-parity-doctrine.md:27,37,39,66` |
| rule-zcode-parity-doctrine | Parity claims are probed against the runtime binary, not vendor docs — executable form = the runtime-probe gate | `.claude/rules/zcode-parity-doctrine.md:97,124,133` |

## F31-F35 — eslint-rules barrel (5)

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| eslint-rules-index | The barrel assembles the four shipped rules into one ESLint plugin (`@rules-as-tests/core-eslint-rules` 0.1.0) | `packages/core/eslint-rules/index.ts:7-8,10-15` |
| eslint-rules-index | The npm-lane copy group ships all five files; without it the pre-push guard-liveness dies loudly | `setup.d/50-hooks.sh:38-48` |
| eslint-rule-no-unsafe-zod-parse | Zod `.parse()` is banned in HTTP boundaries; stdlib parses and static-literal args are not flagged; `audit:exempt` honored | `packages/core/eslint-rules/no-unsafe-zod-parse.ts:103,107,121,63-64`; manifest `packages/core/manifest/rules-manifest.json:28,31-32,37-38` |
| eslint-rule-no-direct-time-randomness | Date.now/new Date/Math.random and direct fs/http/https imports are banned outside infrastructure | `packages/core/eslint-rules/no-direct-time-randomness.ts:28,31-36,9-16`; manifest `:109,112-114,118` |
| eslint-rule-require-otel-span | Exported async functions must open an OTel span (startActiveSpan/withSpan); auto-skipped when @opentelemetry/api is absent | `packages/core/eslint-rules/require-otel-span.ts:68,72,22-37`; manifest `:123-125,129,132-133,140` |
| eslint-rule-restricted-syntax-audit-exempt | The exempt-aware no-restricted-syntax runs declarative {selector,message} pairs while honouring `// audit:exempt` | `packages/core/eslint-rules/restricted-syntax-audit-exempt.ts:4-10,30,37-38,64-70` |
| (FF-routing, all barrel pages) | The npm lane renders the syntax class live-fired; type-aware/dep-graph are FF7001-refused → deferred backend; FF7002 is the params refusal — no coverage is softened or invented | `packages/core/backends/npm/capability-matrix.json`; cargo syntax «no/FF7001» + ruff call-kind FF7001 in their matrices; `packages/core/diagnostics/registry.ts:321,329` — label: **deferred-backend** |

## F37-F41 — render scripts (5)

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| script-render-presets | Renders the launch-preset section of AI-USAGE-GUIDE.md from the shipped preset JSON SSOT; --check exits 1 on drift, no mode exits 2 | `scripts/render-presets.mjs:2,8-10,19,67-68,95,102-103` |
| script-render-rule-channels | Computes what each rule's declared channel MEANS per harness (channel-as-data); refusals are loud (--check exit 1) | `scripts/render-rule-channels.mjs:2,4-12,21,33-35,254,268,279` |
| script-render-zcode-parity-rollup | PROPOSAL-state renderer, NOT WIRED: --check refuses (exit 2) until the maintainer-landed fence exists — label: **planned** | `scripts/render-zcode-parity-rollup.mjs:2,4-8,10,84,89-95` |
| script-render-harness-config | Derives per-harness configs from ONE neutral SSOT with a drift gate; ZCODE_EVENTS/unsupported tools are declared loudly, not dropped | `scripts/render-harness-config.mjs:3,10-13,19,44-54,63,436,445,463` |
| script-render-install-roster | Renders the INSTALL-FOR-AI.md roster from the SAME manifest the installer executes — doc and installer cannot disagree silently | `scripts/render-install-roster.mjs:2,6-12,28,108-109,139,146` |

## F44, F46-F48, F51, F53, F56 — shipped audit scripts (7)

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| script-audit-r4 | ts-morph probe: every named src/domain export needs a co-located unit test mentioning it; exits 1 on violation | `packages/core/probes/audit-r4.ts:3-9,16-22`; copy `setup.d/40-configs.sh:16-17`; manifest R4 check |
| script-check-rule-enforced | Resolves the actually-applied ESLint config per boundary file and proves R2 binds (the +E deep gate); SKIPs exit 0 when eslint absent | `packages/core/audit-self/check-rule-enforced.sh:2,6-9,11,19,45,70,81-82`; copy `setup.d/40-configs.sh:27-28` |
| script-detect-r2-boundary | Pure-bash R2 boundary classifier: boundary-present / no-boundary-confident / ambiguous — ambiguous stays red, no auto-green on doubt | `packages/core/audit-self/detect-r2-boundary.sh:4,9-20`; copies `setup.d/40-configs.sh:33,35` |
| script-detect-r2-boundary | r2-na-marker.sh is the shared N/A-marker reader sourced by both inertness gates so they can never diverge | `packages/core/audit-self/r2-na-marker.sh:3,5-7,9-15` |
| script-check-arch-boundaries | Fails when the path-keyed dependency-cruiser boundary rules are silently inert on apps/+packages monorepos (R3's alarm) | `packages/core/audit-self/check-arch-boundaries.sh:2,4-7,9-11,23,37,47,54`; copy `setup.d/40-configs.sh:42-43` |
| script-check-shields-up | Proves the husky shields are wired and active (hooksPath resolves, pre-commit runs lint-staged, pre-push references the dispatcher) | `packages/core/audit-self/check-shields-up.sh:2-7,48,53`; copy `setup.d/40-configs.sh:57-58` |
| script-run-rule-tests-firing | Standing firing check for the enrichment-sidecar rule-test material: bad[] fires, good[] stays clean; RED exit 1 on broken material | `packages/core/synthesizer/run-rule-tests-firing.sh:2,4-9,23-25,39-41,48,84`; copy `setup.d/40-configs.sh:66-67` |
| script-preset-audit-ai-docs | The react-lane audit trio maps each probe explicitly to a RULES.react-*.md rule, delegating to ESLint/dependency-cruiser where possible | `packages/preset-next-15-canonical/audit-self/audit-ai-docs.react-next.sh:4-5,7-17,19,116,118`; arms `setup.d/40-configs.sh:77-78` (+ `:88`, `:92`) |

## D2 — PARTIAL fills (4)

| page (existing) | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| /docs/faq/ (F20) | Added: the enforcing rule lives at `.claude/rules/no-paid-llm-in-ci.md` (Class A, workflows/actions scope, companion principle test) | fill at `content/docs/faq.md:14`; rule file `.claude/rules/no-paid-llm-in-ci.md` |
| /docs/daily-cycle-rules/ (F26) | Added: the framework holds itself to the same standard via `.claude/rules/rule-enforcement-channel-selection.md` + principle 31 test | fill at `content/docs/daily-cycle-rules.md:57-60`; `packages/core/principles/31-rule-channel-declaration.test.ts` |
| /docs/quickstart-python/ (F42) | Added: the shared CLI entry behind `--from-practice` is `packages/core/install/rule-bootstrap-cli.ts`, installed by `setup.d/80-rule-bootstrap.sh` | fill at `content/docs/quickstart-python.md:84-87`; `setup.d/80-rule-bootstrap.sh:7-8` |
| /docs/quickstart-ts/ (F52) | Added: the mutation gate is the shipped script `scripts/run-generated-rule-mutation.sh` (source `packages/core/synthesizer/`) | fill at `content/docs/quickstart-ts.md:41-43`; source file present at pin |

## Ledger tally

- Pages drafted: 45 (28 rule + 5 barrel + 5 render + 7 shipped). Ledger rows: 54 capability-sentence rows above (one-to-three per page by claim load).
- Labels: `planned` ×1 (render-zcode-parity-rollup — renderer pre-CI state, quoted from the script's own header); `deferred-backend` ×1 (the FF-routing row shared by the barrel pages — FF7001 refusals quoted from the capability matrices and registry).
- Every row's anchors were quoted or mechanically checked at the working pin during drafting (T12 discipline); the gate's §3 sweep re-resolves them (gate row 4).
