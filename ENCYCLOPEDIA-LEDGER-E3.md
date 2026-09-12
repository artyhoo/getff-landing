# ENCYCLOPEDIA-LEDGER-E3 — capability ledger, stage E3 (hooks + runtime-bridge)

One row per capability sentence on the 41 raw reference pages (census D + H), at stage pin
`framework @ b069c593 2026-09-11`. Page path prefix elided: rows say `<slug>` for
`/docs/reference/<slug>`. Experimental/planned-labeled rows carry the label explicitly.
Per-stage file on purpose (E6 consolidates); `CLAIMS-LEDGER.md` untouched.

## D — hooks: plugin enforcement wiring + consumer pre-push graph

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| quickstart-ts (D1 fill) | hooks.json registers 20 hook registrations over 7 event blocks covering 17 distinct hook scripts | `plugin/hooks/hooks.json` (grep `"command":` → 20; event blocks :3,:37,:57,:140,:151,:169,:181) |
| inject-project-digest | injects a context digest at prompt submit AND subagent start (two events) | `plugin/hooks/inject-project-digest:1`; `plugin/hooks/hooks.json:3`, `:181` |
| inject-output-language | injects AIF_HOOK_LANG-pinned output-language instruction every prompt submit | `plugin/hooks/inject-output-language:18`; `lang/en.sh:6` |
| inject-session-bootstrap | injects session bootstrap context at prompt submit | `plugin/hooks/inject-session-bootstrap:1-2`; `hooks.json:20-27` |
| deps-hash-check | runs deps drift check at prompt submit | `plugin/hooks/deps-hash-check:1-2`; `hooks.json:28-35` |
| ask-question-reminder | PreToolUse(AskUserQuestion) reminder hook | `plugin/hooks/ask-question-reminder:1`; `hooks.json:39` matcher |
| inject-subagent-context | subagent context injection on Agent/Task; backup for harnesses without SubagentStart | `plugin/hooks/inject-subagent-context:1-2`; `hooks.json:48` |
| warn-subagent-report-zcode | zcode-functional twin of warn-subagent-report, PostToolUse(Agent/Task) + Stop | `plugin/hooks/warn-subagent-report-zcode:1-2`; `hooks.json:59`, `:151` |
| validate-prompt | Edit/Write prompt validation on PostToolUse | `plugin/hooks/validate-prompt:1-2`; `hooks.json:68` matcher |
| check-doc-authority | doc-authority hierarchy check on edits | `plugin/hooks/check-doc-authority:1`; `.claude/rules/doc-authority-hierarchy.md:13` |
| inject-matching-rule | path-scoped rule injection on edits | `plugin/hooks/inject-matching-rule:1`; `.claude/rules/00-rule-index.md:1` |
| check-kickoff-traps | AI-trap check on kickoff edits | `plugin/hooks/check-kickoff-traps:1-2` |
| check-hook-marker | managed-marker integrity check | `plugin/hooks/check-hook-marker:1-2` |
| check-worker-dispatch-channel | worker dispatch channel check on edits | `plugin/hooks/check-worker-dispatch-channel:1-2` |
| inject-memory-codification | memory-codification nudge on Write to memory/ paths | `plugin/hooks/inject-memory-codification:23` (jq guard); `.claude/rules/memory-codification.md:1` |
| runtime-bridge-dispatch-hook | Write/PostToolUse + PostToolUseFailure dispatch bridge to aif | `plugin/hooks/runtime-bridge-dispatch:1-2`; `hooks.json:113`, `:140` |
| session-start-hook | SessionStart bootstrap on startup\|clear\|compact (async:false) | `plugin/hooks/session-start:1-2`; `hooks.json:169-179` |
| end-of-turn-reminder | Stop-event recap gate; SDK sessions exempted; can block via decision:block | `plugin/hooks/end-of-turn-reminder:72`, `:77`, `:208`; `hooks.json:160` |
| hook-plumbing | six plugin twins source lib/hook-emit.sh (deduped emit prelude, R-2) | `plugin/hooks/lib/hook-emit.sh:2`, `:9-13`; adopter grep (6 plugin twins) |
| hook-plumbing | lang packs resolve ${AIF_HOOK_LANG:-en}.sh; parity check exits 0/1, CI-wired | `plugin/hooks/lang/en.sh:6`; `lang/check-parity.sh:13-15`; `end-of-turn-reminder:29` |
| hook-plumbing | run-hook.cmd is the polyglot Windows/Unix runner every registration invokes | `plugin/hooks/run-hook.cmd:3`, `:47`; `hooks.json:8` |
| pre-push-static-checks | trio (prior-art/s17/unpinned-tool-install) statically imported by pre-push.ts, shipped to consumers | `setup.d/50-hooks.sh:30-32`; `checks/prior-art.ts:2`; `checks/s17.ts:2`; `checks/unpinned-tool-install.ts:9` |
| pre-push-static-checks | violations abort the push (pre-push git channel), non-zero exit | `checks/registry.ts:2`, `:9` |
| pre-push-liveness-checks | guard-liveness + cmd-script-liveness are await-import()ed and die() on load failure | `checks/guard-liveness.ts:4`; `pre-push.ts:515`, `:519`, `:583` |
| pre-push-liveness-checks | skips are visible notices, never force-passes | `checks/guard-liveness.ts:21-23`; `checks/cmd-script-liveness.ts:22-28` |
| pre-push-utils-esm | run-check synthesizes timeout(124)/spawn-fail(127) exit codes; git.ts scopes to push range | `utils/run-check.ts:13`, `:18`; `utils/git.ts:10` |
| pre-push-utils-esm | hooks-scoped {"type":"module"} marker prevents ERR_REQUIRE_CYCLE_MODULE at load | `setup.d/50-hooks.sh:50-58`; `templates/shared/hooks-package.json:2` |
| zcode-emit-helper | **experimental** — sourced emit-adapter; exactly ONE adopter at pin (warn-subagent-report-zcode:35); NOT registered in hooks.json; its own header's "zero adopters" comment is stale at pin | `plugin/hooks/_zcode-emit:1`, `:5`, `:11`; `plugin/hooks/warn-subagent-report-zcode:35` |
| framework-harness-settings | pre-approves exactly the two reminder hooks; 44-rule deny list incl. self-modification | `.claude/settings.json:7-8`, `:11`, `:56` |
| framework-harness-settings | dev-harness hook graph wires .claude/hooks twins directly; PostToolUseFailure arm; compact/PreCompact arms are dev-harness-only | `.claude/settings.json:150`, `:173-183`, `:224`, `:233-241` |

## H — runtime-bridge (aif dispatch)

| page | sentence (short) | evidence anchor(s) at pin |
|---|---|---|
| daily-cycle-factory (H2 fill) | dispatch beat = tsx cli/dispatch.ts <kickoff> [--force]; exit 0 outcomes / 2 spec_invalid / 1 call defect | `src/cli/dispatch.ts:4`, `:32-38` |
| daily-cycle-factory (H24 fill) | framework stages kickoffs at .claude/orchestrator-prompts/<umbrella>/; consumers get empty .ai-factory/orchestrator-prompts/ | `setup.d/LAYERS.md:121`; `setup.d/30-templates.sh:17` |
| bridge-claim | claim create/release/cancel; exits NON-ZERO on failure, never falls back to ManualBackend | `src/cli/claim.ts:2`, `:5-7`, `:12` |
| bridge-claim | vendored 2026-08-18 with backend re-vendored in same pass | `vendor/README.md:75-80` |
| bridge-park | park = PUT /tasks/:id {paused:true}; --task defaults $HANDOFF_TASK_ID; exit 0 parked / 1 error | `src/cli/park.ts:5-6`, `:9`, `:22` |
| bridge-park | base URL precedence RUNTIME_BRIDGE_AIF_URL ?? API_BASE_URL ?? :3009 (container override) | `src/cli/park.ts:16-18` |
| open-question-anchor | shared constant '## ⏸ OPEN QUESTION'; writer park.ts, reader questions.ts, prefix match | `src/cli/openQuestion.ts:3`, `:5`, `:17` |
| bridge-answer | answer pushes comment (message 1..20000) + event-only state transitions; exit 0/1 | `src/cli/answer.ts:5`, `:20`, `:53-55` |
| bridge-questions | 4 parked predicates; exit 0 even on zero parked | `src/cli/questions.ts:16-21`, `:30` |
| bridge-questions | --project overrides RUNTIME_BRIDGE_AIF_PROJECT_ID; --json for piping | `src/cli/questions.ts:5`, `:21-22` |
| bridge-ensure-parallel | self-heals parallelEnabled via full PUT (round-trip preserves budgets); exit 0/1 | `src/cli/ensure-parallel.ts:11`, `:20`, `:31` |
| bridge-await | await <taskId> [--timeout-ms N] / --once; await-mode exit 0 success / 1 non-success | `src/cli/await.ts:5`, `:25` |
| bridge-await | deliberately NOT vendored — no shipped skill mentions it (measured) | `vendor/README.md:85-90` |
| bridge-aif-http | SINGLE REST implementation; mapping connection→unavailable, 429→quota_exceeded, other→dispatch_failed | `src/cli/aifHttp.ts:3-5` |
| bridge-cli-entry | isMain realpaths both sides (symlink CLIs used to exit 0 silently); parseCliArgs rejects 3 bad arg shapes natively + 2 added rules | `src/cli/cliEntry.ts:7`, `:21`, `:40` |
| bridge-backend-contract | RuntimeBackend = available/dispatch/getStatus/awaitDone; substrate imports nothing from this package | `src/backend.ts:22`, `:29`, `:43`; design invariant `:6-9` |
| bridge-fire-backend | **operator opt-in, NEVER default**; dispatch-only; awaitDone resolves immediately dispatched_no_readback | `src/AifFireBackend.ts:5`, `:12`; `vendor/README.md:84` (not vendored) |
| bridge-fire-backend | 5 RUNTIME_BRIDGE_FIRE_* env vars; CI /fire deferred-permanent (no-paid-llm-in-ci) | `src/AifFireBackend.ts:22-28`, `:30-31` |
| bridge-manual-backend | dispatch copies kickoff to /tmp + prints instructions; getStatus checks response file; awaitDone polls 30s no timeout | `src/ManualBackend.ts:2`, `:5-8` |
| bridge-manual-backend | 7-day TTL self-clean of runtime-bridge-*.md artefacts only | `src/ManualBackend.ts:25`, `:30` |
| bridge-idempotency | content-hash dedup; state $RUNTIME_BRIDGE_DEDUP_PATH (default /tmp/runtime-bridge-dedup.jsonl); 24h TTL; prune-on-write self-cleaning | `src/idempotency.ts:2`, `:4`, `:34` |
| bridge-kickoff-spec | buildKickoffSpec: SHA-256 + umbrellaName from parent dir; bridge:skip→null always; auto-marker default; manual path opts out | `src/kickoff.ts:4`, `:8-9`, `:13-15` |
| bridge-kickoff-spec | bridge-profile hint rides header region only; regex body excludes > so it cannot cross --> | `src/kickoff.ts:17`, `:27-33` |
| bridge-ws-status | ws://host:3009/ws; broadcast {id,title,status}; NO error/failed status exists in aif vocabulary | `src/aifWsStatus.ts:5`, `:13`, `:24-28` |
| bridge-ws-status | vendored as closure of AifHandoffBackend, but its only CLI consumer (await.ts) is clone-only | `vendor/README.md:40`, `:85` |
| runtime-bridge-vendor | one-way COPY, minimum-for-dispatch subset = transitive closure of cli/dispatch.ts; import-closed | `vendor/README.md:16`, `:28`, `:66-67` |
| runtime-bridge-vendor | drops AifFireBackend, index.ts, cli/await.ts deliberately; tsx peer-dep mandatory | `vendor/README.md:84-90`; `vendor/package.json:6` |
| runtime-bridge-vendor | env-var contract: 9 vars incl. RUNTIME_BRIDGE_DEDUP_PATH per-project dedup | `vendor/README.md:92-107` |
| bridge-operator-scripts | quartet: setup (DETECT+INSTRUCT, never auto-installs), health (container-side $0 pre-flight), verify (throwaway-task smoke), cleanup (test-allowlist only) | `scripts/setup-runtime-bridge.sh:2-9`; `scripts/bridge-health.sh:2-7`; `scripts/verify-bridge.sh:2-6`; `scripts/bridge-cleanup.sh:2-6` |
| runtime-bridge-tests | 23 vitest files incl. symlink-entry and import-no-sideeffect guards | `test/aif-park.test.ts:1`; `test/cli-symlink-entry.test.ts:1`; `ls test/ \| wc -l` → 23 |
| degradations (H1 fill) | the absent package's consumer surface = vendored CLIs under .claude/vendor/runtime-bridge/src/cli/ | `vendor/README.md:28-63` |
| degradations (H14 fill) | backend chosen by RUNTIME_BRIDGE_MODE (manual/aif-handoff/auto); ManualBackend is the never-excluded tail | `src/resolver.ts:6-11` |
| degradations (H15 fill) | default aif-handoff backend dispatches REST :3009 | `src/AifHandoffBackend.ts:4-5` |
| executable-agents-md (D22 fill) | pre-push sections owner-scoped consumer/maintainer/both; maintainer dropped on consumers; composeSections fails closed | `pre-push.ts:749`, `:704`; `setup.d/50-hooks.sh:60-63` |

## Fill coverage note

The ledger also covers the 7 PARTIAL fills via the rows whose page is a filled docs page
(quickstart-ts, executable-agents-md, degradations ×3, daily-cycle-factory ×2). Sentence
labels: one **experimental** row (zcode-emit-helper); zero planned rows. Tally: 60 capability
rows over 41 pages + 7 fills (page×sentence granularity above; a page's Status/Fires-at line
is rowed once with its What-it-is claim, its invocation/fail-mode sentences rowed individually).
Mechanical count (quoted for §3 row 6): D table 31 rows, H table 35 rows, 66 total.
