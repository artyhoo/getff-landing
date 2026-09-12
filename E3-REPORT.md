# E3-REPORT — beta-docs-encyclopedia stage E3 (hooks + runtime-bridge, census D+H)

Date: 2026-09-12 (work started 2026-09-11) · Branch: `feature/beta-docs-encyclopedia-e3-raw-reference-9b26d0` · Base: landing `origin/main` = `107fa59`

**Working pin: `framework @ b069c593`** (FETCH_HEAD of `artyhoo/getff` `staging`, first fetched 2026-09-11; census pin `a1337cb301` verified ancestor — PIN-OK).

## §1 Rows — entry re-verification + this session's work, each with output

| # | Row | Command | Output |
|---|---|---|---|
| 1.1 | Census present on branch base | `ls ENCYCLOPEDIA-CENSUS.md` | present (252-row census file; D family at :212, H family at :452) |
| 1.2 | Pin continuity (re-run at resume) | `git -C /home/www/rules-as-tests-aif fetch https://github.com/artyhoo/getff.git staging; git rev-parse FETCH_HEAD` | `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650` — same as task-1's measurement; staging unmoved since resume; **stage pin stays `b069c593`** (delta `b069c593..aa87d0a4` = 3 orchestrator-prompts kickoffs + `.gitignore`, zero D/H intersection — task 1) |
| 1.3 | Census-pin ancestry | `git merge-base --is-ancestor a1337cb301 FETCH_HEAD && echo PIN-OK` | PIN-OK (task 1, re-confirmed this session) |
| 1.4 | Egress | `curl -m 6 -sS -o /dev/null -w '%{http_code}' https://github.com` | `200` (task 1) |
| 1.5 | Toolchain | `node -v; npm -v` | `v22.23.2` / `10.9.8` |
| 1.6 | 17 pre-existing pages re-verified | node sweep (`.ai-factory/tmp/anchor-sweep.mjs`), schema + anchors at `b069c593` | ALL-PASS after 2 genuine defects fixed (see Findings F1) |

**W2 delta list — D/H anchors that MOVED inside the census-staleness window (`a1337cb301..b069c593`), each re-probed at the working pin before its page/fill was drafted:**

| Census row | File that moved | What changed at the pin | Where handled |
|---|---|---|---|
| D1 (+ every D-row registration arm) | `plugin/hooks/hooks.json` | 19→**20 registrations**, 6→**7 event blocks** (zcode-parity added the `PostToolUseFailure` block and the warn-subagent-report-zcode PostToolUse(Agent\|Task) + Stop arms); census's «23 registrations» was a miscount at its own pin too (`grep -c '"command"'` = 38 there, 19 `"command":` lines) | D1 fill states 20/7/17 at pin; Finding F2 |
| D8 | `plugin/hooks/warn-subagent-report-zcode` | parity-twin arms added (PostToolUse Agent\|Task + Stop); sources `_zcode-emit` at `:35` | page drafted at pin (prior session) + D25 page |
| D25 | `plugin/hooks/_zcode-emit` (header) vs adopter | census «zero twins source it at this pin» false at the census's OWN pin — `warn-subagent-report-zcode:35` sources it byte-identically at `a1337cb301`, `b069c593`, `aa87d0a4`; the helper's `:5` comment is the stale text | D25 page states one adopter at pin; Finding F3 |
| D18 | `plugin/hooks/end-of-turn-reminder` | #1693 SDK guard + #1706 marker-guard hoist already cited by the pre-existing page | re-verified at pin (sweep PASS) |
| D23/D24/D24b | `packages/core/hooks/pre-push.ts` line drift | census's dynamic-import die cite «:406-407» is now `:517-526`/`:581-589`; D22's render-rule-index cite «:1350-1352» still holds (`:1350` = `function ruleIndexRenderSection(): void {`) | D24 page quotes the true sites; D22 fill verified at pin |
| — | `.claude/settings.json`, `plugin/hooks/lang/`, `plugin/hooks/lib/hook-emit.sh`, `plugin/hooks/run-hook.cmd` | unchanged `a1337cb301..b069c593` (verified via per-file `git diff` empty) | drafted straight at pin |

**Work delivered this session (resuming at 17/41 pages pre-drafted):** 6 remaining D pages (hook-plumbing, pre-push-static-checks, pre-push-liveness-checks, pre-push-utils-esm, zcode-emit-helper, framework-harness-settings) · 18 H pages (bridge-claim, bridge-park, open-question-anchor, bridge-answer, bridge-questions, bridge-ensure-parallel, bridge-await, bridge-aif-http, bridge-cli-entry, bridge-backend-contract, bridge-fire-backend, bridge-manual-backend, bridge-idempotency, bridge-kickoff-spec, bridge-ws-status, runtime-bridge-vendor, bridge-operator-scripts, runtime-bridge-tests) · 7 PARTIAL fills · wiring (nav entry + reference/meta.json + 41 twin routes) · ledger (66 rows) · frontmatter quoting fix across all 41 pages (build gate surfaced it) · T19 fixes (2 anchor line-refs).

## §3 Gate — all 10 rows run, each with output

| # | Check | Command | Output | Verdict |
|---|---|---|---|---|
| 1 | Diff shape | `git status --porcelain` | `M content/docs/{daily-cycle-factory,degradations,executable-agents-md,quickstart-ts,meta.json}.md` + `?? app/docs/reference/` + `?? content/docs/reference/` (+ pre-existing untracked `.ai-factory/`, `AGENTS.md` dispatch artifacts). The two wiring registries beyond the literal row-1 list are the kickoff's own §1-row-4 requirement (nav meta.json + twin routes) | PASS |
| 2 | Census coverage | id-by-id read-back vs family TABLES | D MISSING D2-D19,D23,D24,D24b,D25,D26 → 23 pages present; H MISSING H3-H7,H9-H13,H16-H23 → 18 pages present; PARTIAL D1,D22,H1,H2,H14,H15,H24 → 7 fills applied; `ls content/docs/reference/*.md \| wc -l` → **41** | PASS |
| 3 | Schema conformance | node sweep: frontmatter + provenance@b069c593 + Status/Ships-to/Fires-at + 4 sections | **41/41 PASS** (sweep line per page quoted in run log) | PASS |
| 4 | Anchors ≥2 file:line, ≥1 quoted, resolve at pin | node sweep vs `git show b069c593:<path>` | SWEEP **ALL-PASS** over 41 pages; every anchor's quoted content matches the pin's bytes (range-tolerant: ellipsis, whitespace-collapse, JSON-escape) | PASS |
| 5 | Firing channels / invocations | T7-a: every page carries «Fail mode»; T7-c: 6 CLI pages carry Invocation+exit | T7-a silence (all pass); T7-c `inv=1` ×6, exits 2-4 mentions each | PASS |
| 6 | Ledger | `grep -c '^| [a-zA-Z]' ENCYCLOPEDIA-LEDGER-E3.md` per family | D 31 + H 35 = **66 rows**; capability sentences rowed page×claim; 1 explicit **experimental** label (D25); 0 planned | PASS |
| 7 | Wiring end-to-end | `grep -c docs/reference out/llms.txt` → **41**; `find out/docs/reference -maxdepth 1 -name '*.md' \| wc -l` → **41**; `ls app/docs/reference/*.md/route.ts \| wc -l` → **41**; search: `python3 -m http.server 8099` in `out/` + `node scripts/verify-search.mjs http://localhost:8099/api/search "two-phase dispatch claim create release" reference/bridge-claim` → **exit=0**, top hit `type=page url=/docs/reference/bridge-claim`; llms-full.txt: 42 `docs/reference` hits | PASS |
| 8 | Build green | `export npm_config_cache=/tmp/npm-cache-9b26d0 && npm install --include=dev && rm -rf .next && npm run build` | first run FAILED (YAML frontmatter colon in 8 unquoted descriptions — fixed by quoting all 41, Finding F4); re-run tail (verbatim): `├ ○ /docs/reference/zcode-emit-helper.md` / `├ ○ /docs/what-is-getff.md` / `├ ○ /llms-full.txt` / `├ ○ /llms.txt` / `├ ○ /rss.xml` / `├ ○ /sitemap-0.xml` / `└ ○ /sitemap-index.xml` / `○  (Static)  prerendered as static content` / `●  (SSG)     prerendered as static HTML (uses generateStaticParams)` — all 41 `/docs/reference/*` routes + llms + sitemap prerendered | PASS (after F4 fix, pre-gate) |
| 9 | No styling/restyle/announce-touch | `git status --porcelain \| grep -E '\.(css)\.\|announcement'` | no css/announcement touches; `.tsx` confined to `app/docs/reference/` twin routes | PASS |
| 10 | T7 + T19 reported | this report §T7/§T19 | below | PASS |

## T7 — adversarial counter-prompt («what would make these machinery pages look documented when they are not?»)

Ran before green, mechanically where possible:

1. **«A hook page that never says which channel fails»** — sweep for `Fail mode` across all 41: every page has one. Spot-quote: `end-of-turn-reminder.md` — blocking rides `{decision:"block"}` JSON (`:208`), missing jq → silent exit 0; `pre-push-liveness-checks.md` — two channels named (die() at import → push blocked; caught violation → push blocked; skips never block); `bridge-park.md` — «Exit codes: 0 parked; 1 bad args or REST error».
2. **«Anchors quoting the census instead of the implementation at YOUR pin»** — `grep -l ENCYCLOPEDIA-CENSUS content/docs/reference/*.md` → empty. Every anchor quotes a framework file at `b069c593` via `git show`. The likeliest failure per the kickoff (parity-commit drift) is exactly what the W2 table above re-probed: hooks.json counts, the D25 adopter, and the pre-push die sites were all re-measured at the pin, not copied from the census.
3. **«H-CLIs described from their names, not their parseArgs contracts»** — all 6 CLI pages carry the verbatim usage line + exit-code contract quoted from the source headers; `bridge-cli-entry.md` documents the actual `parseArgs` rejection rules (ERR_PARSE_ARGS_* + the two added rules).
4. **«A slug in nav but missing from twin/llms/search»** — mechanical 41 = 41 = 41 = 41 (nav meta.json / twin routes / llms.txt / out/ .md twins) + search exit=0 on a reference slug through the repo's own harness.
5. **Cold-read spot pass (T19 judgment half)** — re-read 5 pages cold against their sources (bridge-claim, hook-plumbing, zcode-emit-helper, framework-harness-settings, bridge-await): claims track the quoted lines; no page asserts a fact its anchors don't carry. Two defects found earlier in the pre-existing 17 (F1) were the same class T19 exists for.

## T19 — cold self-pass

Mechanical half: the anchor/schema sweep (4 runs total; final: **SWEEP ALL-PASS over 41 pages at pin b069c593**). Judgment half: the §T7 item-5 cold reads. Defects the pass caught and fixed: F1 (2 stale line refs), F4 (frontmatter quoting), plus ledger tally corrected to the mechanical count (66).

## Findings

- **F1 (pre-existing pages, fixed):** `inject-memory-codification.md` cited `:33` for a line that lives at `:23`; `inject-output-language.md` cited `:21` for «# Purpose:…» at `:18`. Both re-pointed; sweep ALL-PASS after.
- **F2 (census defect, framework-side — parked for the operator):** census D1's «23 registrations» matches no measurement at any pin: at the census's own pin `a1337cb301` the raw grep returns 38 (both `"type":"command"` and `"command"` lines) and true registrations = 19; at the working pin, 20 over 7 event blocks. The D1 fill states the pin-truth; the census row needs a re-measure note.
- **F3 (census defect + stale source comment, parked):** D25's «zero twins source it» is false at every pin measured — `plugin/hooks/warn-subagent-report-zcode:35` sources `_zcode-emit`, byte-identically at `a1337cb301`/`b069c593`/`aa87d0a4`. The helper's own header (`_zcode-emit:5-6`) still claims zero adopters. The page documents the one adopter and labels the claim stale; a framework-side comment fix is operator-owned.
- **F4 (this stage's own build defect, fixed pre-gate):** 8 pages (incl. one of the 17 pre-existing) had unquoted YAML `description` values containing `: `, which fumadocs-mdx rejects (`YAMLParseError: Nested mappings are not allowed in compact mappings`). All 41 pages' frontmatter scalars are now quoted per the site convention.
- **F5 (census ships-to nuance, documented not fought):** H20's ships-to «clone» is half-true: the vendor copy CARRIES `src/aifWsStatus.ts` (closure of AifHandoffBackend, `vendor/README.md:40`) — what's clone-only is its entrypoint consumer `cli/await.ts`. The page states both halves with anchors.
- **F6 (sibling observation, read-only):** at resume, sibling worktrees e2/e5 were still cut from the pre-ff base `b65ff4b` while e4 was ff-fixed — unchanged from task 1's observation; noted for the host's harvest sequencing (their file sets are disjoint from E3's).

## Parked questions

- P1: Should the census's D1/D25 rows be amended upstream (E6 consolidation stage) or annotated in place? (F2/F3 owners.)
- P2: `_zcode-emit` header comment vs its one real adopter — framework-repo fix (out of E3 scope: no framework writes).

## Verdict

`E3: GREEN — 41/41 pages drafted (D+H MISSING), 7/7 PARTIAL filled, 66 ledger rows, build green, wiring proven`
