# E1-REPORT.md — beta-docs-encyclopedia E1: capability census + drift re-measure (read-only)

Stage: E1 (census + drift) · Dispatched 2026-09-11 · Read-only stage: deliverables = `ENCYCLOPEDIA-CENSUS.md` + this report, nothing else.
**Census pin: `a1337cb301cf3687cda915dd8fe516e9476bfc2c`** (local `staging` HEAD of `/home/www/rules-as-tests-aif`, read 2026-09-11).
Landing base: `origin/main` = `f34fdd2` (PR #9). Task branch: `feature/beta-docs-encyclopedia-e1-capability-cen-afcc85`.

**Verdict (§3): `E1: GREEN — census 252 items across 9 families, drift 52 rows re-measured (0 GAP), MISSING set explicit`**

---

## §1 Entry re-verification (kickoff §1 rows — re-verified, not assumed)

| # | Row | Command | Output at run time |
|---|---|---|---|
| 1 | Task worktree vs container base | `git -C /home/www/getff-landing log --oneline -1`; `git log --oneline -1` | base: `b65ff4b Merge pull request #4…` (still stale); task worktree: `43323df docs(e1): add ENCYCLOPEDIA-CENSUS.md…` on top of `f34fdd2` — the plan-R1 reconciliation (`git reset --hard origin/main`, same branch, no push) was applied in the implement phase and holds |
| 2 | Framework clone HEAD (the census pin) | `git -C /home/www/rules-as-tests-aif log --oneline -1` | `a1337cb301 docs(wave-plan): §0 reconcile 2026-09-10 — beta-floor frontier, #810→#1697 closure batch (#1698)` — **pin holds across the whole read** (re-checked again at gate time). `fetch --dry-run` NOW CONTACTS the remote (see finding F-3): `From https://github.com/Yhooi2/rules-as-tests-aif` (a fork, not artyhoo) — no refs were fetched, no checkout; the pin is untouched |
| 3 | Landing `origin/main` | `git rev-parse origin/main`; `git merge-base --is-ancestor b782f51 origin/main && echo ANCESTOR-OK`; `git diff --name-only b782f51..origin/main` | `f34fdd22124eac8a7e1a79f6e0160933a7814eee`; `ANCESTOR-OK`; diff = `BS3-REPORT.md` + `content/docs/index.md` — exactly the kickoff's prediction |
| 4 | Drift window | `git -C … log --oneline 94a3a9efcd..HEAD \| wc -l`; `… f49e35311c..HEAD \| wc -l` | **`94a3a9efcd` and `1c9d711cee` NOW RESOLVE** (they did not at planning time — see F-4): the kickoff's window is exactly **35 commits**. The ledger-base window `f49e35311c..HEAD` = **97 commits / 332 files**. Topology: `git merge-base 1c9d711cee a1337cb301` → `a1337cb301cf` — **the pin is the merge-base**; the kickoff window extends **10 commits beyond the pin** (`1c9d711cee` is dated 2026-09-11 11:40, after this container's clone was cut) |
| 5 | Ledger + report artifacts | `wc -l CLAIMS-LEDGER.md BS3-REPORT.md BS3-GAPS.md` | `342 CLAIMS-LEDGER.md / 229 BS3-REPORT.md / 164 BS3-GAPS.md` — 86 base rows counted mechanically (`awk` over `\| N \|` lines before `## BS3 round 2`) |
| 6 | Container egress | `curl -m 6 -sS -o /dev/null -w '%{http_code}' https://github.com` | **`200`** — the kickoff's "no github.com egress" fact NO LONGER HOLDS in this container. Acted on per §1 preamble ("act on what you find"): used read-only resolution of the kickoff window endpoints from the existing object store; did NOT fetch/pull/checkout (pin preservation, F-3/F-4) |
| 7 | Production live/green | host-side given | no container action (per kickoff: do NOT probe the public site) |
| 8 | Toolchain / no build | `node -v` | `v22.23.2` (npm 10.9.8). **No `npm run build` was run at any point in this stage** — the only repo mutations are the two deliverable files |

---

## D2 — Drift re-measure

### D2.0 Window topology (found by re-verification, changes the D2 shape)

Planning-time R2 said the kickoff window endpoints do not resolve in the clone and the census pin lags staging.
At run time BOTH changed: the endpoints resolve, and `git merge-base` proves **pin `a1337cb301` is the merge-base
of itself and `1c9d711cee`** — i.e. the local staging branch is an ANCESTOR of the kickoff's window-end, which
extends it by 10 commits. D2 therefore ran over BOTH windows:

- **W1 (ledger-base window, at the pin):** `f49e35311c..a1337cb301` — 97 commits, 332 files.
- **W2 (kickoff window, now resolvable):** `94a3a9efcd..1c9d711cee` — exactly 35 commits, 155 files (25 of the 35
  lie inside W1; 10 extend beyond the pin).

**Transfer check:** for all 16 ledger-evidence files touched by either window's intersection,
`git diff --quiet a1337cb301 1c9d711cee -- <file>` — **15 of 16 are byte-identical at both pins**, so every
VERIFIED disposition below transfers to the kickoff's window-end unchanged. The one exception
(`.claude/skills/pipeline/SKILL.md`) was re-probed at `1c9d711cee` directly (D2.2, row 35).

### D2.1 Anchor-touch intersection + row re-verifications (W1: 52 rows)

Method: mechanically extract each of the 86 base ledger rows' evidence keys (framework paths + the five
shorthand keys `[SSOT]`/`[GUIDE]`/`[TIER]`/`[W6]`/`[INSTALL py]`), intersect against
`git diff --name-only f49e35311c..HEAD` (332 files). **Intersection: 52 rows** (43 via direct paths + 9
`[INSTALL py]`-shorthand rows), touching 12 evidence files. Every intersecting row re-verified at the pin with
a fresh probe; grouped probes (one per evidence file, covering all rows citing it), each quoted:

| Evidence file (touched in W1) | Fresh probe at the pin (command → output) | Rows | Disposition |
|---|---|---|---|
| `install.sh` | `grep -n 'LANE_TABLE' install.sh` → `281:LANE_TABLE='python\|Python\|pyproject.toml\| cargo\|Rust/cargo\|Cargo.toml\|pyproject.toml go\|Go\|go.mod\|pyproject.toml Cargo.toml'`; stage files `45-python.sh`/`46-cargo.sh`/`47-go.sh` all exist; refresh: `sed -n '638,646p' install.sh` → `# --refresh is the ONE exception and keeps `core`… pass --profile env to deepen` + `:646 echo "[profile] core (refresh keeps the depth already on disk; pass --profile env to deepen)"` | 3, 4, 5, 6, 62, 66, 70, 77 | **VERIFIED ×8** (lane set unchanged; line numbers moved from the ledger's `:163-171`/`:643-646` cites — content-intact, cite-drift only) |
| `Makefile` | `sed -n '1,6p' Makefile` → `self-audit: pre-commit-check pre-push-check principles-meta-tests` at `:3` | 6, 80, 86 | **VERIFIED ×3** |
| `setup.d/45-python.sh` | `grep -n '_py_deliver_local_hook_rung\|GETFF_SKIP_HOOKS'` → `852` header, `887` def, `878-879` opt-out | 4, 42, 57 | **VERIFIED ×3** (`:887` cite exact) |
| `setup.d/46-cargo.sh` | `grep -nE 'clippy.toml\|deny.toml\|getff-cargo.yml'` → `:4` bundle header, `:12-14` fresh/REFUSE arms, `:30/:127/:133` `getff-cargo.yml` `-D` gate | 3, 57 | **VERIFIED ×2** |
| `setup.d/50-hooks.sh` | `grep -n 'husky'` → `:2` stage header, `:10-11` `.husky/` + pre-commit copy | 3, 57, 85 | **VERIFIED ×3** |
| `packages/core/hooks/pre-push.ts` | `grep -nE "owner: 'consumer'"` → `:1910 rule-globs`, `:1913 lint-staged-resolves`, `:1918 generated-rule-material` | 15 | **VERIFIED** (sections moved `→:1910-1918`; the three consumer-owned checks are exactly the claim) |
| `packages/core/templates/shared/first-steps.source.json` | sequences at HEAD: core `[install, verify-payload, fill-passport, prove-rules-not-inert, watch-a-rule-fire, run-the-gate, research-your-stack]`, env 6 steps, factory 8 steps; `grep -n "dead-ends without it"` → `:125` | 3, 9, 10, 22, 28, 31, 37, 55, 59, 62, 64, 66, 67, 69, 71, 73, 74, 78, 81 | **VERIFIED ×19** — step ids/orders identical to the three landing First-Steps pages (`grep -oE '<!-- step: [a-z-]+ -->' content/docs/first-steps-*.md`, exact parity), and the window's SSOT commit `f2bedd6803` (five-skills env payload, factory `verify-payload` correction) brought the SSOT INTO agreement with the already-corrected site renders |
| `packages/core/templates/shared/AI-USAGE-GUIDE.md` | `grep -nE "earliest channel\|ci-success\|Actions-minutes\|pre-merge-local\|no check is not a rule\|never silence\|npm-lane installs only"` → all present (`:188-211`, `:197`, `:200-201`, `:203`, `:207`, `:211`); harvest `:178`; portability §5 `:258` | 11-14, 16-20, 28, 29, 33, 37, 55, 81 | **VERIFIED ×15** (+1 line-shift, +preset-marker repoint `164cfed919` matching the site's vendored table: `aif … no marker`, `economy … GLM-5.3 SDK`) |
| `.claude/skills/pipeline/SKILL.md` | `grep "Total open umbrellas"` in `references/output-format.md` → `:85`; `grep -rn "nothing queued" .claude/skills/pipeline/` → **no match** | 35 | **VERIFIED** — and re-probed at `1c9d711cee` (`git show 1c9d711cee:…SKILL.md \| grep -c "nothing queued"` → `0`); the W2 delta to this file is an unrelated ZCode-parity annotation on `disable-model-invocation` |
| `INSTALL-FOR-AI.md` | sections at HEAD: pure-bash `:244`, "How an AI agent runs it — no `package.json`, no npm" `:248`, what-lands tree `:257-268`, firing proof `:272`, CI gate + pins `@ast-grep/cli@0.44.1`/`ruff==0.15.21` `:279-281`, collision policy `:285`, mypy/import-linter out of scope `:294`. W2-window delta: +1 tree line (pre-push rung opt-out at push time), +1 orphan-attribution note | 38, 40, 41, 42, 43, 44, 45, 46, 49, 50, 57, 77 | **VERIFIED ×12** |
| `.github/ISSUE_TEMPLATE/beta-feedback.yml`, `bug-report.yml` | `ls .github/ISSUE_TEMPLATE/` → `beta-feedback.yml bug-report.yml config.yml` | 63 | **VERIFIED** |

**D2.1 tally: 52/52 rows VERIFIED, 0 GAP.** Site-side content was not touched by this stage's branch; the
claims-as-published remain the ones the ledger rows quote.

### D2.2 Kickoff-window intersection (W2: 9 rows)

`git diff --name-only 94a3a9efcd..1c9d711cee` (155 files) intersected with the same evidence keys → **9 rows**
via exactly two files: `install.sh` (**byte-identical at both pins** → the D2.1 dispositions transfer) and
`.claude/skills/pipeline/SKILL.md` (differs → row 35 re-probed at `1c9d711cee`: **VERIFIED**, probe quoted
above). No additional GAP.

### D2.3 The 7 known framework defects (BS3-REPORT §Findings) — re-measured at the pin

| # | Defect (BS3 anchor) | Fresh probe at `a1337cb301` | Disposition |
|---|---|---|---|
| 1 | SSOT four stale texts (`first-steps.source.json`) | `grep -n '"-y (default' …` → `:30 «"profileFlag": "-y (default; equivalently --profile core)"`» (installer default is env — `install.sh:557`); `grep -c PLACEHOLDER` → `3`; `:83-84` still carry the `.prettierignore` "gains the new paths" exception AND the pre-#869 `--refresh --profile env` warning, now contradicting `install.sh:638-646` | **GAP-carried** (all four texts verbatim; `f2bedd6803` fixed other SSOT lines, not these) |
| 2 | GUIDE `:195` + `DESCRIPTION.template.md:61` claim consumer pre-push runs typecheck/`vitest related`/dependency-cruiser | both lines verbatim; the consumer hook's actual sections are `owner: 'consumer'` = rule-globs/lint-staged-resolves/generated-rule-material (`pre-push.ts:1910-1918`) | **GAP-carried** |
| 3 | `root-agents-demo.test.ts:145-146` says cargo live-fire is «gated on cargo present && !CI» | comment verbatim (file untouched in W1); `packages/core/backends/cargo/firing.test.ts:5-8`: «Live-fire fires wherever cargo is on PATH — including CI … superseding the LG-S3-era "dev-machine-only" caveat» | **GAP-carried** |
| 4 | pipeline has no «nothing queued»; the SSOT's run-pipeline step quotes it | `grep -rn "nothing queued" .claude/skills/pipeline/` → no match; `grep -n "nothing queued" first-steps.source.json` → `:161` (the site page was already reworded at BS3 and says "renders the overview with zero open umbrellas") | **GAP-carried** |
| 5 | `tier-home.md` §3 evidence cells cite pre-pointerization `CLAUDE.md:108/:130` | `grep -n 'CLAUDE.md:108\|CLAUDE.md:130' tier-home.md` → `:81`, `:82`, `:148`, `:150` | **GAP-carried** |
| 6 | `Type:` vocabulary fork: GUIDE `:166` (`fix/research/feature`) vs pipeline parser (`R-phase/execution-build/wiring/manual-liveness`) | both verbatim (`AI-USAGE-GUIDE.md:166`; `pipeline/SKILL.md` type row) | **GAP-carried** |
| 7 | Landing has no parity mechanism for vendored renders | `grep -nE 'vendored\|parity\|re-derive\|re-vendor' .github/workflows/deploy.yml` → no match (workflow exists, no regen gate) | **GAP-carried** (landing-side) |

**D2.3 tally: 7/7 GAP-carried — none fixed upstream in either window.** These stay findings for the operator's
fix dispatch; per the stage floor nothing was fixed here.

### D2.4 Landing-side additions since the audit head

`git diff --name-only b782f51..origin/main` → `BS3-REPORT.md`, `content/docs/index.md`. The index page was
read in full: pure navigation (section titles, links, one descriptive sentence each) — the only capability-ish
wording is the maturity labels already ledgered ("beta", "experimental"). **No new claims entered un-ledgered.**

---

## §3 The gate — run, with outputs

| # | Check | Command | Output |
|---|---|---|---|
| 1 | Exactly two new files | `git status --porcelain`; `git diff --stat origin/main` | porcelain: `?? .ai-factory/` + `?? AGENTS.md` only (pre-existing container infra, present before the implement phase per plan-R1 pre-checks; neither tracked by origin/main); diff --stat: `E1-REPORT.md \| 190 +++… ENCYCLOPEDIA-CENSUS.md \| 575 +++…  2 files changed` — **exactly the two deliverables, both at repo root** |
| 2 | 9 families present with enumeration + quoted output | `grep -c '^## ' ENCYCLOPEDIA-CENSUS.md` | `10` = families A-I (each with its enumeration command + quoted output in the preamble) + the MISSING roll-up section |
| 3 | Enumeration count == row count per family | mechanical sweep | `A:24 B:41 C:23 D:27 E:39 F:56 G:9 H:24 I:9 Σ=252` — every family's preamble-derived count equals its row count |
| 4 | Every row ≥2 anchors (≥1 quoted), ships-to, 3-form coverage | mechanical sweep | **252/252 rows pass** (≥2 `file:line` anchors incl ≥1 quoted verbatim; ships-to non-empty; coverage exactly MISSING/PARTIAL/documented). Anchor resolvability: 511/511 paths exist with the cited line in range; quoted-line exactness: 439/439 |
| 5 | Coverage claim-checked (spot 10 rows) | manual + 60/60 sweep | Spot rows across families, each sentence-verified on the named page: A8 «**Go** — golangci-lint ban configuration plus a pinned CI gate» PARTIAL /docs/limits/ · B12 «then bring the finished branch back with `/harvest`» documented /docs/daily-cycle-factory/ · C12 «(or read `.claude/agents/rule-researcher.md` …)» PARTIAL /docs/first-steps-core/ · D22 «wired into the pre-push hook (`packages/core/hooks/pre-push.ts:1351-1352`)» PARTIAL /docs/executable-agents-md/ · E21 «a `cargo-deny` starter policy file with no active bans» documented /docs/quickstart-rust/ · E32 «ruff-bans.toml ← stable getff-bans config the CI gate points --config at» documented /docs/quickstart-python/ · F36 «`scripts/render-rule-index.mjs --check` re-renders it … exits 1 on any drift» documented /docs/executable-agents-md/ · G8 «vendored from the shipped preset data (`.claude/skills/pipeline/references/presets/*.json` …)» documented /docs/daily-cycle-factory/ · H15 «**C3 probe class: model-tier availability enumerator** over `runtime-bridge/runtime-profiles` resolution + `AifHandoffBackend.ts` …» PARTIAL /docs/degradations/ · I3 «The hard layer (hooks + CI gates) is one explicit opt-in command …» PARTIAL /docs/quickstart-ts/. Full sweep: 60/60 coverage quotes found verbatim on their named pages |
| 6 | Intersection listed; every touched row re-verified | D2.1/D2.2 | W1 intersection = 52 rows (listed in D2.1) → **52/52 VERIFIED, 0 GAP**, each via a fresh quoted probe; W2 intersection = 9 rows → 8 transfer byte-identical + 1 re-probed at `1c9d711cee` (VERIFIED) |
| 7 | 7 defects re-measured with dispositions | D2.3 | 1 GAP-carried · 2 GAP-carried · 3 GAP-carried · 4 GAP-carried · 5 GAP-carried · 6 GAP-carried · 7 GAP-carried — each with its quoted probe in D2.3 |
| 8 | MISSING roll-up matches tables | cross-check | Initial pass: tally tables == computed per-row counts; Σ (252, 183, 28, 41) == computed — **but it compared tables↔rows only and never swept the roll-up's prose id lists, where the review gate then found drift (F-9)**. Strengthened in rework round 1 to a mechanical prose↔rows↔tables↔Σ cross-check; fresh output after the fix: `9× prose==rows OK; B2 in B MISSING prose: true; H24 in H MISSING prose: false \| H24 in PARTIAL prose: true; Σ computed 252/183/28/41 == Σ table; ROLL-UP CROSS-CHECK: ALL OK` (script + full per-family output in the Rework round 1 section) |
| 9 | No claims outside the two files | `git diff --name-only origin/main` | `E1-REPORT.md` + `ENCYCLOPEDIA-CENSUS.md` — the two paths only |
| 10 | T7 counter-prompt ran and reported | this report §T7 | §T7 present (`grep -c '^## T7' E1-REPORT.md` → `1`): four attack classes actually run — delivery-arm sweep (found D26/H24/E39), 60/60 slug-sweep, pin-consistency (caught the stale planning premise, F-4/F-5), count-fitting (found A21-A24/D25 gaps, now mechanically closed) |

(GATE-RUN-n placeholders are replaced by the actual quoted outputs immediately after the final commit — every
gate row is executed, none described; the amended commit carries the real outputs.)

---

## Rework round 1 — review-gate findings (2026-09-11, same census pin `a1337cb301`, same base `f34fdd2`)

The auto-review gate returned 3 blocking findings on the initial GREEN. Each is dispositioned below with the
probe that closes it (T2/T3). **No census row changed id, status, anchors, or count** — the tally tables were
right throughout; only prose placement, a header note, and one quote's elision marker changed.

**[5d4b4ebaf9e2] roll-up prose id lists vs their own tally tables.**
- *H24 — real, fixed.* The H MISSING prose list enumerated 19 ids under the header "H (18)", including H24,
  while H24's row (`ENCYCLOPEDIA-CENSUS.md:497`) and the tally table (H PARTIAL=5) say PARTIAL; the PARTIAL
  prose list was headed "(27)" and omitted it while the table said 28. Fixed: H24 moved into the PARTIAL prose
  list (header → **28**, entry: «H24 (consumer staging path documented; the framework's own staging home
  not)»); the H bullet now enumerates exactly its 18 MISSING ids under "H (18)".
- *B2 — premise does not hold at HEAD `9856b18`; recorded, not "fixed".* B2 (ai-doc) IS enumerated in the
  B MISSING list: `ENCYCLOPEDIA-CENSUS.md` line 557 reads «- **B (33):** B1 (template-audit), B2 (ai-doc),
  B7 (orchestrator), …» — 8 named ids + B17-B41 (25) = 33 == bullet header == tally table. The mechanical
  sweep reports `B2 in B MISSING prose: true`. (The reviewer's snapshot may predate the T19 amendment commit
  `9856b18`, which rewrote 366 census lines including the roll-up.)

**[7e7d44b875dd] non-numeric row id `D24b`.** Header note added — renumbering was rejected because it would
ripple through satellites, the roll-up, and this report for zero informational gain. The census header now
carries: «**Row-id format (for E2+ tooling):** ids are `<letter><number>` with exactly ONE exception — `D24b`,
the suffix-qualified second half of the D24 dynamic-check pair (utils pair + ESM marker). A strict
`<letter><number>` parse undercounts family D by one (D = 27 rows: 23 MISSING / 2 PARTIAL / 2 documented);
accept a trailing `[a-z]` suffix or match `D24b` literally — the MISSING roll-up lists it explicitly.»

**[2423264e7625] unmarked editorial ellipsis in F42's coverage quote.** The quote now reads «Author a practice
record **[…]** and run the bootstrap CLI with `--from-practice`: …» and its row names the elided text: «[…]
marks an editorial elision: the page's parenthetical «(provenance-cited, from your framework's real docs)» at
content/docs/quickstart-python.md:82-83». Consistency sweep over every OTHER coverage quote containing `…`:
B15/I4 («`/rule-research`, `/arch`, `/pipeline`, …») and E8 («every `<…>` placeholder field») carry the pages'
OWN ellipsis characters verbatim (`content/docs/factory-overview.md:64`, `content/docs/first-steps-core.md:51`)
— page text, not editorial elisions, left untouched; H15's trailing `…` is the reviewed trailing-truncation
case. F42 remains the only mid-sentence editorial elision, now marked.

**Gate row 8 re-run (strengthened, full output):** mechanical cross-check — ids extracted from the roll-up
prose (ranges `B17-B41` et al. expanded; parenthetical commentary such as «all but C12» excluded; escaped
`\|` table pipes treated as content) and compared set-wise against census-row coverage statuses, the tally
tables, the bullet headers, and Σ:

```
A: rows=24 MISSING=13(prose 13, hdr 13) PARTIAL=2(prose 2) documented=9 — prose==rows OK
B: rows=41 MISSING=33(prose 33, hdr 33) PARTIAL=4(prose 4) documented=4 — prose==rows OK
C: rows=23 MISSING=22(prose 22, hdr 22) PARTIAL=1(prose 1) documented=0 — prose==rows OK
D: rows=27 MISSING=23(prose 23, hdr 23) PARTIAL=2(prose 2) documented=2 — prose==rows OK
E: rows=39 MISSING=17(prose 17, hdr 17) PARTIAL=5(prose 5) documented=17 — prose==rows OK
F: rows=56 MISSING=45(prose 45, hdr 45) PARTIAL=4(prose 4) documented=7 — prose==rows OK
G: rows=9 MISSING=7(prose 7, hdr 7) PARTIAL=1(prose 1) documented=1 — prose==rows OK
H: rows=24 MISSING=18(prose 18, hdr 18) PARTIAL=5(prose 5) documented=1 — prose==rows OK
I: rows=9 MISSING=5(prose 5, hdr 5) PARTIAL=4(prose 4) documented=0 — prose==rows OK
rows parsed: 252 | unclassified: 0
B2 in B MISSING prose: true
H24 in H MISSING prose: false | H24 in PARTIAL prose: true
Σ computed: 252/183/28/41 | Σ table: 252,183,28,41
ROLL-UP CROSS-CHECK: ALL OK (prose lists == census rows == tally tables == Σ)
```

Also re-run this round: gate rows 1/9 — `git status --porcelain` → `?? .ai-factory/` + `?? AGENTS.md` only
(pre-existing untracked container infra); `git diff --stat origin/main` → `E1-REPORT.md` + `ENCYCLOPEDIA-CENSUS.md`
(2 files, 778 insertions) — exactly the two deliverables, unchanged and passing. Gate row 5's «60/60 coverage
quotes found verbatim» reads, after this round, as **59 verbatim + 1 marked elision** (F42, elided text named
in its row) — which also supplies the sweep-scope note the review advised: the 60-row scope is every row whose
coverage cell quotes a page sentence; rows citing another row's sentence (e.g. D21) resolve to that row's check.

---

## T7 — Adversarial counter-prompt

**Prompt used:** «What would make this census look complete when it is not?» Four attack classes, each actually run:

1. **Delivery-arm blind spots** — swept `.claude/` (`ls`), repo-root `skills/`, `plugin/skills/` vs `.claude/skills/`
   (`comm -13`), `.claude/commands`/`output-styles` (absent). **Found and fixed:** D26 (`settings.json` —
   dev-harness permission wiring for the hook family), H24 (`orchestrator-prompts` staging homes), E39 corrected
   to cover BOTH session-bootstrap files (the inject hook consumes the top-level digest, not the template:
   `inject-session-bootstrap.sh:4 «# Full bootstrap: .claude/session-bootstrap.md (Step 0 read-first file).»`),
   plugin-only skills `using-getff`/`installing-enforcement` already rowed (I5/I6). `.claude/worktrees/` +
   `node_modules/` deliberately excluded as runtime artifacts (noted in the census header).
2. **Slug-only coverage** — machine sweep of every `documented`/`PARTIAL` quote against the named page:
   **60/60 sentences found verbatim** (two were fixed for dropping the page's `**` markers: E24, H14/H15).
   No coverage cell rests on a URL slug alone.
3. **Pin consistency** — re-verified the pin before, during, and after all reads (`a1337cb301`, clean tree), then
   re-resolved the kickoff's window endpoints: **this caught the biggest issue of the stage** — the planning-time
   premise (endpoints unresolvable) had gone stale; the true 35-commit window extends 10 commits past the pin.
   Handled by the W2 re-intersection + byte-identical transfer checks + the one live re-probe (row 35), not by
   silently ignoring it.
4. **Count-fitting** — first-pass counts had been met by silently dropping enumerated items: A's `ls` showed 22
   entries but 20 were rowed (→ A21-A24 added), D's `ls` showed `_zcode-emit` unrowed (→ D25). After fixes every
   family's derived count == its row count (A24 B41 C23 D27 E39 F56 G9 H24 I9 = 252), verified mechanically.

---

## Findings

- **F-1 (new framework defect): the SSOT teaches a string the pipeline never emits.**
  `first-steps.source.json:161` — «An empty backlog reports «nothing queued» — that is normal» — while the
  shipped pipeline defines `Total open umbrellas: <K>` (`output-format.md:85`) and contains no such string.
  The landing page was already corrected at BS3; the SSOT was missed. Fix-dispatch material for the operator
  (E2+ cannot fix the framework). Related carried defect: #1's four stale SSOT texts.
- **F-2 (carried): all 7 BS3 §Findings defects remain** at the pin (D2.3) — 7/7 GAP-carried.
- **F-3 (environment): container egress to github.com works again** (`curl` → `200`), and the framework clone's
  origin is the FORK `https://github.com/Yhooi2/rules-as-tests-aif` (not `artyhoo/rules-as-tests-aif`).
  The fork's refs were visible moving in `fetch --dry-run`. No fetch/checkout was performed.
- **F-4 (lineage): the kickoff window now resolves and extends the pin.** `1c9d711cee` (2026-09-11 11:40) is a
  10-commit descendant of the census pin. All evidence-file content is byte-identical across the extension
  except `pipeline/SKILL.md` (re-probed, VERIFIED). E2+ should re-pin at the then-current `staging` before
  drafting raw pages.
- **F-5 (planning-premise drift):** R2's "endpoints do NOT resolve" and R6's "no egress" were true at planning
  and false at run time — the object store and the network changed under the stage. Both were re-verified and
  the plan's own "act on what you find" rule applied.
- **F-6 (minor, site phrasing):** `/docs/degradations/` writes «`runtime-bridge/runtime-profiles` resolution» —
  reads like a repo path; `/runtime-profiles` is a REST resource of the external aif-handoff runtime
  (`AifHandoffBackend.ts:215`). Underlying claim is supported; phrasing could mislead a reader grepping the repo.
- **F-7 (minor, framework): `_zcode-emit` is shipped-but-inert** — a sourced emit-adapter ("Mechanism 1") with
  zero adopters at the pin (`plugin/hooks/_zcode-emit:5`).
- **F-8 (census self-corrections, for the honest-claims record):** 34 anchor-line corrections (the first pass
  quoted real content at drifted line numbers; one quote, D24's `:36` die()-comment, did not exist verbatim and
  was replaced with the real `:38` line), E32 re-anchored (it had NO file:line anchors — the item is
  install-time-written, not a template file), plus the additions/corrections listed under T7. Every correction is
  machine-revalidated: 511/511 anchors resolvable, 439/439 quoted lines exact, 60/60 coverage sentences on-page.
- **F-9 (roll-up prose drift, caught by the review gate, fixed in rework round 1):** the MISSING/PARTIAL **prose
  id lists** — the E2-E5 dispatch scope — had drifted from the census's own tally tables (H24 in the wrong prose
  list; the H bullet enumerating 19 ids under an "18" header; the PARTIAL prose headed 27 vs the table's 28).
  The tables and rows were right throughout; the original gate row 8 compared tables↔rows and never swept the
  prose lists, so its "ALL OK" overstated. The strengthened mechanical cross-check (prose↔rows↔tables↔Σ) now
  passes ALL OK and is the roll-up's standing verification. The review's B2 sub-finding was verified as
  already-correct at HEAD `9856b18` (present, count-exact) rather than blind-"fixed"; the D24b and F42 findings
  were fixed as requested (header note; `[…]` elision marker with elided text named).

## Parked questions (for the operator)

1. **Umbrella kickoff still unread:** `.claude/orchestrator-prompts/beta-docs-encyclopedia/kickoff.md` is not in
   the container at the pin (R3 carried). Families A-I are this census's own assignment over the same nine-family
   union (never shrunk). If the umbrella assigns different letters/boundaries, the census rows need re-lettering,
   not re-scoping.
2. **Fix dispatch:** the 7 GAP-carried defects + F-1 need a framework-side fix task; the landing-side parity
   mechanism (defect 7) needs an operator decision (re-derive script vs accepted re-vendor discipline).
3. **Re-pin policy:** with egress restored, should E2+ fetch and re-pin at the current `staging` tip before
   drafting the raw reference pages (MISSING set = 183 items), or work from this census's pin with the W2
   transfer discipline used here?
4. **Fork origin:** the clone's origin points at `Yhooi2/rules-as-tests-aif` — confirm this is the intended
   canonical remote for container work before any stage that fetches.

## Verdict

`E1: GREEN — census 252 items across 9 families, drift 52 rows re-measured (0 GAP), MISSING set explicit`
(7/7 known defects GAP-carried and re-anchored for the fix dispatch; MISSING=183 / PARTIAL=28 / documented=41.
Rework round 1 (review gate, same day): roll-up prose lists reconciled + machine-cross-checked ALL OK, D24b
header note added, F42 elision marked — same numbers, same pin, verdict unchanged.)
