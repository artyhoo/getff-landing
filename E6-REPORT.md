# E6-REPORT.md — cold claims audit + ledger consolidation + closure

Stage: beta-docs-encyclopedia E6 · solo cold-audit · landing branch `feature/beta-docs-encyclopedia-e6-cold-claims-au-c9ea0d` (base `a8d762e` = origin/main with E5 in via PR #14).

## §1 Entry re-verification (kickoff §1, T3 discipline: command + output per row)

| # | Fact at authoring | Re-verified at execution | Output |
| --- | --- | --- | --- |
| 1 | Branch carries census + 4 stage ledgers + E2–E5 reports; recount at entry | `ls` + `grep -c '^|'` per file | All present. Pipe-lines: E2 718, E3 68, E4 75, E5 105, census 282. True claim rows (minus table headers/separators): **E2 716, E3 64, E4 65, E5 93 = 938**. Two kickoff tallies were stale: E3's own tally line says 66 but the file carries 64 data rows (its grep counted the 2 `\| page \|` header lines — Finding F1); E5's recorded 78 was capability rows only (93 = 78 + 3 covered-by-E2 records E15–E17 + 12 PARTIAL fill rows). The recount IS the audit universe (kickoff §1). |
| 2 | Re-pin before auditing: `FETCH_HEAD` is the audit pin; `b069c59328` its ancestor | `git -C /home/www/rules-as-tests-aif fetch https://github.com/artyhoo/getff.git staging` then `rev-parse FETCH_HEAD`; `merge-base --is-ancestor b069c59328 FETCH_HEAD && echo PIN-OK` | `FETCH_HEAD = cdd0e771d8fee311dd6329b006b7c4258af9e034` (2026-09-12, re-confirmed unchanged at gate time: `git log --oneline -1 FETCH_HEAD` → `cdd0e771d8 docs(kickoff): zcode-plugin-firstclass §7 … (#1726)`); `PIN-OK`. Clone `origin` untouched (fork, read-only). |
| 3 | Drift zone 44 files; priority surface named | `git -C /home/www/rules-as-tests-aif diff --name-only b069c59328..FETCH_HEAD` | **47 files now** (surface kept moving after the host's 44 — new entrants are the zcode-plugin-firstclass kickoffs/patch notes, this stage's own `kickoff-e6.md`, `packages/getff/MANIFEST.sha256`, `packages/core/principles/24-plugin-manifest-integrity.test.ts`, install-sh baselines). Every kickoff-named priority file is still in the zone: `plugin/skills/{ai-doc,rule-research,rule-tests,template-audit}/SKILL.md`, `plugin/skills/ai-doc/anthropic-and-aif-residue.md`, `plugin/install/fetch-and-wire.sh`, `plugin/.claude-plugin/plugin.json`, `plugin/README.md`, `scripts/generate-plugin-skills.sh`, `tests/plugin/skills-generation.test.sh`. Intersection against ledger anchor paths: **6 drift-zone paths are cited by 18 ledger rows** — E2-006..013 (template-audit SKILL), E2-105..109 (ai-doc SKILL), E2-634 (prior-art-evaluations.md), E5-076/077/078 (fetch-and-wire.sh), E5-090 (marketplace.json), E5-091 (plugin.json). All 18 re-verified line-by-line at FETCH_HEAD with verbatim quotes (see §3 row 3). Version sweep: `plugin/.claude-plugin/plugin.json` at pin = `"version": "0.3.0"`; `.claude-plugin/marketplace.json` = 0.3.0; the only `0.2.0` occurrence in `content/` is the verbatim quote of fetch-and-wire.sh:28-30's own release-tag comment (`content/docs/reference/i9-fetch-and-wire.md:37`) — re-confirmed byte-identical at the pin (`sed -n '28,30p'` → «# deliberately DECOUPLED from RAT_INSTALL_REF below: the framework's own release tags (v0.2.0,» …). Not stale residue. |
| 4 | Audit surface: 180 reference pages + PARTIAL fills | `ls content/docs/reference/*.md \| wc -l` | `180`. Fill targets carried inside the ledgers (E4 4 fills → rows E4-062..065; E5 12 fills → E5-082..093 range; E2/E3 fills as rowed). |
| 5 | Auditor protocol read first; grammar binding | `git -C /home/www/rules-as-tests-aif show FETCH_HEAD:agents/claims-conformance-auditor.md` | Output grammar quoted (lines 75–78): «`VERIFIED` — evidence quoted (`file:line` + command output agree with the claim)», «`GAP` — drift: the doc asserts X, the source measures Y. Quote BOTH», «`UNVERIFIABLE-needs-human` — the claim cannot be checked mechanically»; per-claim output form (lines 95–97). Verdict rule (line 88–89): «`GAP` → REVISE; … complete population + zero GAP → GO.» |
| 6 | Egress works; never push | `curl -m 6 -sS -o /dev/null -w '%{http_code}' https://github.com` | `200`. No push performed (host harvests). |
| 7 | node v22 / npm 10 | `node -v; npm -v` | `v22.23.2`, `10.9.8`. |
| 8 | Prod at 180 pages — do not probe | host-side fact | No prod probing performed. |

## §2 Audit method + tallies

**Method.** Every one of the 938 stage-ledger rows was re-resolved **cold at `FETCH_HEAD` = `cdd0e771d8`**: the row's evidence anchor was re-opened in the framework clone at the pin (`git show FETCH_HEAD:<path>` + line read) — or, for landing-tree anchors (E5 fill rows, E4 fill rows), against this branch's `content/` — and the row's quoted fragment compared to what the pin carries. Count-claims re-ran the count command. VERIFIED requires anchor-resolves **and** quote-matches (both re-quoted into the consolidated ledger's last column); GAP = anchor unresolvable as cited or quote mismatch → sentence-level fix or finding; UNVERIFIABLE = mechanically uncheckable. The authoring pin `b069c59328` was never used as evidence (fresh-pin discipline, T12).

**Tallies (recounted at gate time, by row-id prefix — the authoritative count):**

| Stage | rows | VERIFIED | GAP→fixed | UNVERIFIABLE |
| --- | --- | --- | --- | --- |
| E2 (families B skills + C sub-agents) | 716 | 713 | 3 | 0 |
| E3 (families D hooks + H bridge) | 64 | 46 | 18 | 0 |
| E4 (family F rules) | 65 | 64 | 1 | 0 |
| E5 (families A/E/G/I installer/templates/packages/plugin) | 93 | 84 | 9 | 0 |
| **total** | **938** | **907** | **31** | **0** |

GAP rows: E2-015, E2-026, E2-105 · E3-007, -009, -011, -012, -013, -014, -015, -026, -027, -033, -035, -036, -038, -040, -044, -054, -058, -060 · E4-065 · E5-004, -005, -008, -009, -011, -033, -040, -065, -093.

**Fix split.** 28 of the 31 GAP rows are page-side → **36 minimal line-pairs across 26 pages** (17 pages × 1 pair, 8 pages × 2, validate-prompt × 3; numstat `26 files changed, 36 insertions(+), 36 deletions(-)` — pure replacement, zero net additions). 3 rows are ledger-side only (E4-065, E5-004, E5-093 — fill-position/over-extraction rows whose pages carry no correctable sentence; see Findings F3). Every GAP row carries a row-specific action note in `CLAIMS-LEDGER.md`.

**Drift shape.** The dominant GAP class is off-by-N line drift from the authoring pin to the audit pin (plugin hooks grew a line; vendor README tables shifted; setup.d scripts moved quoted comments by 1–2 lines) — content otherwise stable. One quote-regeneration class (E2-015/E2-105): the SKILL `description:` frontmatter scalars are regenerated artifacts whose punctuation changed; quotes corrected to the pin's verbatim form.

## §3 The gate — all ten rows run (T2), command + output quoted

| # | Check | Result | Output |
| --- | --- | --- | --- |
| 1 | Diff shape | **PASS** | `git diff --name-only origin/main` → exactly `CLAIMS-LEDGER.md` + 26 `content/docs/reference/*.md` (untracked: `.ai-factory/` plan artifact + rendered `AGENTS.md` — session artifacts, excluded from the harvest commit). Stage ledgers + census: `git diff --stat origin/main -- ENCYCLOPEDIA-LEDGER-E*.md ENCYCLOPEDIA-CENSUS.md` → **empty** (byte-untouched). Note: `CLAIMS-LEDGER.md` pre-existed (BS2 per-claim F5 ledger at main); kickoff's "(new)" is wrong at this pin — E6 content became the file's primary section with the BS2 content preserved verbatim under an archive banner (zero-deletion, reversible by truncating at the banner). Parked question PQ-1. |
| 2 | Claim coverage, zero dropped | **PASS** | Recount both sides: stage rows 716+64+65+93 = 938; consolidated verdicted rows = 938 (946 `\|`-lines in the E6 section − 8 header/separator lines = 938; `grep -cE '\| (VERIFIED\|GAP\|UNVERIFIABLE) @ '` → 938). Id-sequence gap check per stage: `E2: count=716 max=716 gaps=[NONE] · E3: 64/64 NONE · E4: 65/65 NONE · E5: 93/93 NONE`. |
| 3 | Fresh-pin discipline | **PASS** | All 938 verdicts carry `@ cdd0e771d8`. Cold spot-read re-run **this session** over 10 rows across families — E5-070 (`plugin/skills/using-getff/SKILL.md:8`), E5-073 (`tool-bootstrapping/SKILL.md:3,8` incl. RU triggers), E5-074 (`generate-plugin-twins.sh:4-5,15-16`), E5-076/077 (`fetch-and-wire.sh:2-4,9-12,14-16`), E2-001 (`template-audit/SKILL.md:38` = «## Promotion trigger»), E2-102 (ai-doc SKILL:1-3), E3-011 (inject-matching-rule :2/:4), E4-005 (`ai-laziness-traps.md:188-195` + test `:15,207`), E5-058 (`packages/core/package.json:5,8`) — **all 10 resolve verbatim** (≥3 I-family: E5-070/073/074/076/077). Drift-zone 18-row line-by-line pass: E2-006 (:13), E2-010 (:25,29), E2-106 (:15-17), E2-109 (:6 harness-posture), E2-634 (:55), E5-078 (:28-30), E5-090 (marketplace.json: one plugin `getff`, source `./plugin`, `strict: true`, v0.3.0), E5-091 (plugin.json v0.3.0) — all verbatim at FETCH_HEAD. |
| 4 | Fix shape | **PASS** | Full diff read back: 36 deleted lines ↔ 36 inserted lines, each pair a single anchor/quote repair inside one `## Anchors` (or prose-sentence) bullet; map page→row is 1:1 with the ledger action notes (b10's fix is the single trailing anchor token `:6 area` → `:19` inside its prose line — verified at pin: `:19` = `<!-- @harness-posture: cc-native-with-fallback … -->`, old `:6` = unrelated frontmatter). No deletions outside fixed sentences; no insertions in non-fixed files; no page touched that has no GAP row. |
| 5 | Post-fix anchor sweep | **PASS** | Mechanical sweep over the 26 touched pages only: every page ≥2 `path:line` anchors (min 4) and ≥1 quoted fragment (guillemet «…» or backtick-quoted scalar) — `26/26 OK, 0 failures`. |
| 6 | Un-censused artifacts stay findings/tails | **PASS** | `git status --porcelain` → no new `content/docs/reference/` pages. Named in Findings/tails below (generate-plugin-skills.sh, skills-generation.test.sh, E4 Finding 4 artifacts, E4 P1/P2). |
| 7 | Wiring intact | **PASS** | Build artifacts: `grep -o 'docs/reference/[a-z0-9-]*' out/llms.txt \| sort -u \| wc -l` → **180**; same → **180** in `llms-full.txt`; sitemap-0.xml → **180**. Fixed-page slugs present: a10-companions-stack-selection / bridge-claim / validate-prompt each hit in `llms.txt`; built `out/docs/reference/<slug>/index.html` + `.md` twins carry the corrected anchors (spot: `15-companions-stack.sh:32-33` present in built HTML, old `:34` absent); search route built (`out/api/search`). 360 entries under `out/docs/reference/` = 180 pages × (html dir + md twin). |
| 8 | Build green | **PASS** | `npm install --include=dev` (NODE_ENV=production container — devDeps must be forced; `npm ci` fallback path not needed, tree already consistent): clean, `found 0 vulnerabilities`. `npm run build` → static prerender of all pages + `llms.txt`/`llms-full.txt`/sitemaps, **EXIT:0** (tail quoted in build log: «○ (Static) prerendered as static content»). |
| 9 | No styling/restyle/announce | **PASS** | `git diff --name-only origin/main \| grep -E '\.(css\|tsx)\|announcement'` → **empty**. |
| 10 | T7 + T19 reported | **PASS** | Both sections below. |

## §T7 — adversarial counter-prompt self-pass

«What would make this audit look performed when it was not?» Checked each named trap:

- **Batch-fill from stage ledgers without re-resolution** — countered structurally: every consolidated row carries a fresh re-quote in its last column, and this session re-ran a cold 10-row spot sweep (§3 row 3) plus the 18-row drift-zone pass, resolving every probe at FETCH_HEAD, not at `b069c59328`. All verbatim.
- **Drift zone waved through as "new pages"** — the zone was re-diffed (44→47 files), intersected mechanically against ledger anchor paths (6 paths / 18 rows), and every intersecting row re-read line-by-line with quotes; the version-string sweep found only the legitimate verbatim comment quote.
- **Silently dropped rows in consolidation** — four-way reconciliation: physical `\|`-line counts, verdict-grammar counts, per-stage row-id sequence gap checks, and stage-sum vs total (938 = 938). The E4/E5 section-boundary bleed (E4-065 sits at the boundary) was caught and the count recomputed by row-id prefix — the ledger itself is correct.
- **GAP "fix" rewriting beyond the false sentence** — full diff read-back: every pair touches one citation line; the largest edit (b10) changes one anchor token inside a prose sentence. No prose rewording anywhere (T-ENC-C).
- **Self-pass catch actually found and fixed:** the ledger preamble originally claimed «Every GAP row above maps 1:1 to a diff line-pair in this branch's page edits» — false for the 3 ledger-side rows. Corrected in `CLAIMS-LEDGER.md` to the accurate 28/31 + 3 split. The audit's own deliverable was held to the same standard.

## §T19 — cold self-pass over the consolidated ledger and touched pages

Mechanical half: recount (938/938, gap check NONE ×4) · anchor sweep 26/26 · numstat balance 36/36 · llms/sitemap 180 ×3 · styling grep empty · stage-ledger byte-diff empty. Judgment half: re-read the 31 GAP rows and their action notes against the diff map (consistent, including the 3 ledger-side rows) · re-read the preamble claims against measured outputs (one inaccuracy found → fixed, see §T7) · spot-read 18 rows' quoted evidence at the pin (all verbatim). No further discrepancies.

## Findings

- **F1 (stage-ledger tally artifact, frozen):** `ENCYCLOPEDIA-LEDGER-E3.md`'s tally line claims 66 rows (31 D + 35 H); the file physically carries 64 data rows — the stage's mechanical grep counted the 2 header lines. The recount (64) is the audit universe; the stage ledger stays frozen per D1.
- **F2 (surface mobility):** the drift zone grew 44 → 47 files between kickoff authoring and this audit (adjacent umbrellas landing on staging). No row was invalidated by the growth — the 18 citing rows all re-verified — but the pattern confirms the E-stage re-pin discipline is load-bearing.
- **F3 (over-extraction, ledger-side fix):** E5-004's claim («missing `claude` CLI → graceful skip notice, not install failure») has no matching sentence on `a9-mcp-companion-layer` — the page never asserts it. Evidence re-homed ledger-side to `setup.d/engine.sh:23-25`; a page-side fix would require new-prose insertion, which D2 forbids. Operator may re-home the sentence into the page in a later stage if wanted.

## Tails (recorded, not built — census closed)

- Un-censused artifacts: `scripts/generate-plugin-skills.sh` + `tests/plugin/skills-generation.test.sh` (plugin-skills-generator umbrella, closed 2026-09-12 in `ef00241c`); carried E4 Finding 4: `scripts/probe-zcode-runtime.sh` + `packages/core/hooks/zcode-runtime-probe.test.ts`.
- E4 P1/P2 census amendments (probe-script family placement; census F1 generator mislabel) — census-owner decisions.
- The 7 framework defects (E1-REPORT §D2.3, 7/7 GAP-carried at E1) stay operator-parked.
- E5 Q-E5-1: the vendored-render parity mechanism stays an operator decision.

## Parked questions

- **PQ-1 (operator, harvest-time):** `CLAIMS-LEDGER.md` pre-E6 content is preserved verbatim under the archive banner inside the file (zero-deletion). Keep this shape, or split the BS2 ledger back out to its own archive file when harvesting? Either is reversible; the current shape changes no BS2 bytes.
- **PQ-2 (carried E4 P1/P2), PQ-3 (carried E5 Q-E5-1):** as listed in Tails.

## §D4 — done.md proposal (host transplants to framework staging after GO)

**beta-docs-encyclopedia umbrella — closure summary.**
E1 censused the framework's consumer-shippable surface (183 MISSING / 28 PARTIAL / 41 documented; 7 framework defects GAP-carried, operator-parked). E2–E5 drafted the full 180-page `content/docs/reference/` encyclopedia across five family groups (A installer, B/C skills+sub-agents, D/H hooks+runtime-bridge, E templates, F rules, G packages, I plugin), each stage shipping with a per-stage claims ledger and a green gate. E6 — this stage — re-verified all **938** ledgered claims cold at a fresh pin (`cdd0e771d8`): **907 VERIFIED · 31 GAP→fixed (36 minimal sentence/anchor repairs across 26 pages) · 0 UNVERIFIABLE**, consolidated the four stage ledgers into one verdicted `CLAIMS-LEDGER.md` (zero rows dropped; stage ledgers frozen as authoring history), and closed with build green and 180-page wiring intact (llms.txt / llms-full.txt / sitemap / twins / search).

**Tails for the operator (not built here):** un-censused artifacts `scripts/generate-plugin-skills.sh`, `tests/plugin/skills-generation.test.sh`, `scripts/probe-zcode-runtime.sh`, `packages/core/hooks/zcode-runtime-probe.test.ts` → census-amendment candidates (E4 P1/P2). The 7 framework defects stay operator-parked. Vendored-render parity mechanism stays an operator decision.

**FUTURE rule (recorded, not built — umbrella §3, verbatim intent):** «change something → immediately update the docs». Proposed as the operator's next step AFTER this umbrella: a standing discipline (and eventually a mechanical check) that any framework change landing on staging updates the affected encyclopedia page + `CLAIMS-LEDGER.md` row in the same change, so the surface never drifts through a pin un-audited again. Explicitly NOT built, gated, or prototyped by this stage.

## Verdict

**E6: GREEN — 938/938 claims audited (907 VERIFIED, 31 GAP→fixed, 0 UNVERIFIABLE→findings), ledger consolidated 938 rows, build green, wiring intact**
