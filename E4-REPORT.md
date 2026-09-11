# E4-REPORT.md — beta-docs-encyclopedia E4 (rules corpus + rule tooling raw reference)

Stage: census family F — 45 MISSING raw reference pages + 4 PARTIAL fills, on branch `feature/beta-docs-encyclopedia-e4-raw-reference-47bc65` of `artyhoo/getff-landing`.

## §1 Entry re-verification (kickoff §1) — re-run at implement start, with outputs

| # | Fact | Re-verification (command → output) |
|---|---|---|
| 1 | Census present on branch | `ls ENCYCLOPEDIA-CENSUS.md && head -5 …` → file present; header: «**Census pin (the framework commit this census reads): `a1337cb301`** … read 2026-09-11» |
| 2 | Working pin re-established | `git -C /home/www/rules-as-tests-aif fetch https://github.com/artyhoo/getff.git staging` → `FETCH_HEAD=b069c59328aa8e08671d3a19fd25efa618dfc1c5`; `git merge-base --is-ancestor a1337cb301 FETCH_HEAD && echo PIN-OK` → `PIN-OK`. Same pin as the planning session; clone `origin` untouched (read-only) |
| 3 | W2 delta re-check | `git diff --name-only a1337cb301..FETCH_HEAD` → 81 files; ∩ F anchors = `.claude/rules/zcode-parity-doctrine.md` (F30) + `scripts/render-harness-config.mjs` (F40) — both re-probed fresh before their pages were drafted (see Findings 3-4). `scripts/probe-zcode-runtime.sh` also in the delta but NOT in the census → Finding 4 |
| 4 | Registries read | `cat content/docs/meta.json` → `---Reference---` section exists (held `faq`); `ls app/docs/` → per-page `.md/route.ts` twins; `app/docs/faq.md/route.ts` read end-to-end (static-export twin pattern, `source.getPage(['faq'])`, `getLLMText`); `lib/source.ts` = fumadocs loader over `.source/server`; `app/llms.txt/route.ts` = `llms(source).index()` tree-generated |
| 5 | Egress | `curl -m 6 -sS -o /dev/null -w '%{http_code}' https://github.com` → `200` |
| 6 | Toolchain + build | `node -v` → `v22.23.2`; `npm -v` → `10.9.8`; `npm ci --include=dev` (with `npm_config_cache=/tmp/npm-cache-e4`, the container cache fix) → exit 0; build run twice (after drafting, after anchor fixes) — both green (§3 row 8) |
| 7 | Production live | host-side fact; no public-site probe performed from the container (per kickoff) |

## §3 The gate — 10 rows, commands + outputs (T2/T3)

| # | Check | Result | Evidence (command → output) |
|---|---|---|---|
| 1 | Diff shape | **PASS** | `git status --porcelain`: new = `content/docs/reference/**` (45 pages + `reference/meta.json`), `app/docs/reference/*/route.ts` (45 twins), `ENCYCLOPEDIA-LEDGER-E4.md`, `E4-REPORT.md`; modified = the 4 named PARTIAL pages + `content/docs/meta.json` (nav registry — required by kickoff §1 row 4). `git diff --stat origin/main` on tracked pages → «5 files changed, 12 insertions(+), 3 deletions(-)» (4 fills additive + meta.json one-line). Untracked `.ai-factory/`, `AGENTS.md` = aif scaffolding, not deliverables, not committed |
| 2 | Census coverage | **PASS** | `grep '^\| F[0-9]' ENCYCLOPEDIA-CENSUS.md \| grep 'MISSING \|$'` → exactly the 45 ids F1-F19, F21-F25, F27-F30 (28 rules), F31-F35 (5 barrel), F37-F41 (5 render), F44, F46-F48, F51, F53, F56 (7 shipped) — each has a page (45/45 files + wiring sweep below). PARTIAL extraction → F20, F26, F42, F52 — each filled (diff quoted in §T19/additivity check). Documented-out rows: F36, F43, F45, F49, F50, F54, F55 (not touched) |
| 3 | Page schema conformance | **PASS 45/45** | Mechanical sweep per page: frontmatter `---` present; provenance pin `b069c59328aa8e08671d3a19fd25efa618dfc1c5` present; `Status`/`Ships-to`/`Fires-at` field table (≥3 rows); ≥4 `## ` sections → `SCHEMA PASS: 45/45` |
| 4 | Anchors | **PASS 45/45** | Same sweep, corrected regex: per page ≥2 `file:line` anchors (min found: 2) and ≥1 «quoted» excerpt → `ANCHOR PASS: 45/45 (min file:line anchors on any page: 2)`. Resolution: 12-anchor spot-check → 11 exact + 1 fixed (Finding: `detect-r2-boundary.sh` invariant line is `:20`, cited-line corrected). Deeper sweep over 10 pages (54 anchor+quote pairs) → 43 exact; every non-exact adjudicated individually: 2 real drift fixes (Findings 2 and 5), rest were sweep-script artifacts (leading-`-` grep flags; quote/anchor mispairing on lines whose true anchor is cited later in the same line) — re-verified exact by direct `sed -n` reads |
| 5 | Rule/barrel/script content shape | **PASS** | Read-back exemplars quoted below (one rule, one barrel, one script). Rule pages: Never/Always pairs quoted from rule files, channels + honest FF status. Barrel pages: rule meta/messages quoted + FF-routing row. Script pages: invocation + exit codes + probe target + install arm |
| 6 | Ledger | **PASS** | `ENCYCLOPEDIA-LEDGER-E4.md`: 54 rows over 45 pages + 4 fills (1-3 rows per page by claim load); labels: `planned` ×1 (render-zcode-parity-rollup — the script's own header says PROPOSAL/NOT WIRED), `deferred-backend` ×1 (the shared FF-routing row — FF7001 refusals quoted from the matrices + `registry.ts:321,329`). Every page's central sentence(s) rowed; anchors at pin |
| 7 | Wiring | **PASS** | Nav: `content/docs/meta.json` gains `"reference"` under `---Reference---`; folder carries `content/docs/reference/meta.json` (45 slugs, census order). Twins: 45 × `app/docs/reference/<slug>.md/route.ts` calling `source.getPage(['reference','<slug>'])`. Build artifacts: `grep -c 'docs/reference/' out/llms.txt` → `45`; same for `out/llms-full.txt` → `45`; `ls out/docs/reference/*.md \| wc -l` → `45`; HTML dirs → `45`; search: `grep -o 'reference/rule-zcode-parity-doctrine' out/api/search` → hits. End-to-end one slug: `rule-zcode-parity-doctrine` in `out/llms.txt` line 55 («[zcode-parity-doctrine — non-CC-harness parity doctrine](https://getff.ai/docs/reference/rule-zcode-parity-doctrine) …»), twin `out/docs/reference/rule-zcode-parity-doctrine.md`, HTML dir present, in search index |
| 8 | Build green | **PASS** | `npm ci --include=dev` → `CI_EXIT=0`; `rm -rf .next && npm run build` → `BUILD_EXIT=0` (run 1), and re-run after anchor fixes → `BUILD2_EXIT=0`; tail: «○ (Static) prerendered as static content / ● (SSG) prerendered as static HTML» with all 45 `/docs/reference/*.md` twin routes listed as static prerenders |
| 9 | No styling/restyle/announce touch | **PASS** | `git diff --name-only origin/main \| grep -E '\.(css\|tsx)\|announcement'` → empty; untracked-tree check → no `.css`, no `announcement`, no non-twin `tsx` (twins are `route.ts` under literal `.md` folders — the expected twin shape) |
| 10 | T7 + T19 ran and reported | **PASS** | Sections below |

## §3 row 5 — read-back exemplars (quoted)

- **Rule page** (`rule-ci-tool-pinning.md`): Never — `.claude/rules/ci-tool-pinning.md:76` «A bare comment not containing this token does NOT trigger the escape hatch — the gate will still flag the line.»; Always — the §3 escape-hatch example quoted verbatim (`run: pip install some-tool  # ci-tool-pin: allow no stable release; main branch only`); channels — rule-index row + 6 globs + `unpinnedToolInstallSection` pre-push gate + paired-negative test + zizmor for Rule B; FF status — honest «not backend-rendered; no FF diagnostic applies».
- **Barrel page** (`eslint-rule-restricted-syntax-audit-exempt.md`): Never — `:68-70` «// Mirror the handwritten rules: suppress when the violation's line is exempt. / … / if (line.includes(EXEMPT_TOKEN)) return;»; channels — synthesizer's `check.type:"declarative"` / `eslint-restricted` engine + barrel install arm `setup.d/50-hooks.sh:48`; FF-routing — npm `syntax` class live-fired, `type-aware`/`dep-graph` «"status": "no", "refusedCode": "FF7001"» — the framework's own not-expressible → deferred-backend vocabulary, unsoftened.
- **Script page** (`script-check-shields-up.md`): Invocation `bash scripts/check-shields-up.sh`; exits — `:48` «echo ""; echo "PASS=$PASS FAIL=$FAIL SKIP=$SKIP"; exit 0» tally arms; probes — the three assertions quoted (`core.hooksPath` resolves, pre-commit references lint-staged, pre-push references the dispatcher); where it lives — source `packages/core/audit-self/`, consumer copy via `setup.d/40-configs.sh:57-58`.

## T7 — adversarial counter-prompt pass

Counter-prompt: **«what would make this corpus look documented when it is not?»** What was actually checked:

1. **Invented Never/Always pairs** — every pair traces to a quoted line: mechanical sweep over 10 pages paired 54 quote+anchor instances and resolved them against the clone at the pin (`sed -n` + fixed-string grep); 43 exact, remainder adjudicated (2 real drift fixes, rest script artifacts re-verified exact). No pair is paraphrased-in.
2. **Softened FF statuses** — `grep -rn 'FF7001' content/docs/reference/` minus the framework-vocabulary contexts → empty. FF7001 appears on 33 pages always as the framework prints it (refusal code + registry quote); discipline-rule pages state «not backend-rendered — no FF diagnostic applies» instead of inventing backend coverage. The `deferred-backend` label is carried in the ledger and on the pages' FF-routing rows.
3. **Generic template drift** — every rule page names its artifact ≥3 times and quotes its own rule-index row (`.claude/rules/00-rule-index.md:<row>`); every barrel/script page names its artifact ≥3 times → both sweeps zero failures.
4. **Wired-but-unreachable slugs** — none: 45/45 in llms.txt, llms-full.txt, twin routes, HTML export, search index (gate row 7 outputs).

## T19 — cold self-pass

Mechanical layer over all 45 pages (schema, pin-provenance, field table, section count, anchor count, quote presence, artifact naming) — all quoted above. Cold read layer: the two pages edited after drafting (F32 anchors, F46/F47 anchors, F27 `:16`) were re-read end-to-end post-fix; the four PARTIAL fills were diff-verified additive (`-` lines reappear as `+` with only appended sentences — no rewording; quoted in the artifact-scan step). One residual honesty note: the cold pass was performed in the authoring session, not by a separate reviewer seat — the adversarial T7 checks above are the compensating mechanical layer; a maintainer cold review remains the operator's LATER pass (T-ENC-C owns polish, not verification).

## Findings

1. **(carried from planning) F-1 kickoff arithmetic:** «26 rules F1-F19/F21-F25/F27-F30» is 28 rules by set arithmetic; id set authoritative; page total stays 45 (28+5+5+7). Already recorded in the plan; restated for the record.
2. **Census anchor drift (T12 catch):** the census row anchors quote `setup.d/20-agents.sh:46` «(rules/ is not shipped)»; at the working pin `b069c593` the comment sits at **`:44`** (2-line drift in the census→pin window). All 28 rule pages cite `:44` (verified at the pin by `sed -n '44,48p'`). The census itself is untouched (out of scope).
3. **F40 re-probe:** `scripts/render-harness-config.mjs` changed in the window (fresh probe before drafting). The census's quoted anchors (`:1` shebang, `:3` title comment) still resolve; new pin line numbers captured in the page (`ZCODE_EVENTS` at `:46-54`, `ZCODE_UNSUPPORTED_TOOLS` at `:63`, `emitPlugin` at `:436`).
4. **Un-censused artifact (out of scope → FINDING, no page):** `scripts/probe-zcode-runtime.sh` + `packages/core/hooks/zcode-runtime-probe.test.ts` exist at the pin, are cited by the zcode doctrine §6 (`:133`, «Runtime-probe gate (Fork B, 2026-09-11)»), and appear in the W2 delta — but appear nowhere in `ENCYCLOPEDIA-CENSUS.md`. Per kickoff §4, recorded as a finding, not a page.
5. **Anchor fix while drafting:** `detect-r2-boundary.sh` load-bearing invariant comment is at `:20` (initially cited `:22` from a miscounted range) — corrected in page + ledger; `check-rule-enforced.sh` title is `:2` and the blind-spot block `:6-9` (initially cited `:3`/`:5-7`/`:12-13`) — corrected in page + ledger.
6. **Census internal inconsistency (recorded, not re-litigated):** census row F1's anchor text names the index generator «`scripts/render-rule-index.mjs` (generator, F51)» and lists satellite F51, but the generator is row **F36** (its own census row) and F51 is `scripts/check-shields-up.sh`. The F1 page cites the generator by name and path (unambiguous), not by the mislabeled id.

## Parked questions

- **P1:** should `scripts/probe-zcode-runtime.sh` + `packages/core/hooks/zcode-runtime-probe.test.ts` (Finding 4) be added to the census in a census-amendment pass (E1 T19-amendment precedent), and if so which family (F script row vs a hooks-family row)? Operator/census-owner decision — not made here.
- **P2:** census row F1's generator mislabel (Finding 6) — fix belongs to the census owner; flagged only.

## Verdict

**E4: GREEN — 45/45 pages drafted (F MISSING), 4/4 PARTIAL filled, 54 ledger rows, build green, wiring proven**
