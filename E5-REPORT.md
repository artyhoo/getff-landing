# E5-REPORT.md — beta-docs-encyclopedia E5 (raw reference drafts: installer, templates, packages, plugin)

Stage: E5 · census families A + E + G + I · landing repo branch `feature/beta-docs-encyclopedia-e5-raw-reference-cf5a1b`.
This is the rework round: the first review pass found the tree mid-implementation (16/39 pages, no fills/ledger/
report/wiring). This round completes D1–D4 and the §3 gate.

## §1 Entry re-verification — rows with outputs

| # | Kickoff fact | Re-verified command | Output at re-run (2026-09-12) |
|---|---|---|---|
| 1 | Census present at root | `ls ENCYCLOPEDIA-CENSUS.md; head -5 ENCYCLOPEDIA-CENSUS.md` | `-rw-r--r-- ... 118590 Sep 11 14:08 ENCYCLOPEDIA-CENSUS.md`; header: «# ENCYCLOPEDIA-CENSUS.md — what getff actually ships, per family, vs what the site documents» / «**Census pin (the framework commit this census reads): `a1337cb301`**» — present, 588 lines |
| 2 | Re-pin before drafting | `git -C /home/www/rules-as-tests-aif log --oneline -1`; `git merge-base --is-ancestor a1337cb301 aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 && echo PIN-CHAIN-OK` | `aa87d0a47a docs(kickoff): zcode-plugin-firstclass — ZCode consumer-path umbrella (research-first, ZCode-first) (#1721)`; `PIN-CHAIN-OK (census a1337cb is ancestor of aa87d0a4)`. **Working pin: `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`** — the clone's `origin` untouched (fork, read-only) |
| 3 | W2 delta re-check (census pin → working pin) | `git -C /home/www/rules-as-tests-aif diff --name-only a1337cb301..aa87d0a4…` ∩ my anchors | Intersection: `.claude/session-bootstrap.md`, `packages/getff/MANIFEST.sha256`, `setup.d/10-skills.sh`, `plugin/hooks/*`, `packages/core/hooks/*.test.ts`, `packages/runtime-bridge/vendor/hooks/runtime-bridge-dispatch.sh`. Per-row re-probes at the pin: E39 read `.claude/session-bootstrap.md` live (68 lines, digest markers) + both inject hooks; G9 read `MANIFEST.sha256` live (1078 lines, line 1 quoted on-page); A3/A21 re-read `setup.d/10-skills.sh` header (tier lists still live in lib.sh — `10-skills.sh:132`); `plugin/hooks/*` is D-family territory — I-pages quote only marketplace-surface files, all re-read at the pin. **Every fact on every new page was read at the working pin, so the delta is absorbed by construction** |
| 4 | Registries a new page joins | `grep -n '"reference"' content/docs/meta.json`; `ls app/docs/what-is-getff.md/`; read twin end-to-end | `21:    "reference",` (under `---Reference---`, landed in round 1); twin convention confirmed at `app/docs/what-is-getff.md/route.ts` (`source.getPage(['what-is-getff'])` → `getLLMText`) |
| 5 | Egress works | github fetch (row 2) succeeded | OK; no push performed (host harvests) |
| 6 | node/npm + build part of stage | `node -v; npm -v` | `v22.23.2` / `10.9.8`; `npm ci --include=dev` OK («found 0 vulnerabilities») |
| 7 | Production live/green | host-side fact — no probe | not probed, per kickoff |

## §2 Deliverables read-back

### D1 — 39/39 raw reference pages under `content/docs/reference/`

This round added the 23 missing pages (16 existed from round 1, quality bar kept: same schema, same pin stamp):

- **A family 13/13** — added `a21-layers`, `a22-companions-manifest`, `a23-aif-handoff-guided`, `a24-bridge-guided`.
- **E family 14/14 (drafted)** — added `e7-claude-md-template`, `e10-gitignore`, `e11-hooks-package-json`, `e14-integration-rules`, `e19-tsconfig`, `e22-cargo-lints-toml`, `e34-python-precommit-fragment`, `e36-python-lane-doc-templates`, `e37-storybook-main`, `e38-storybook-preview`, `e39-session-bootstrap-pair`. E39 covers BOTH session-bootstrap files; the page states the E1 correction verbatim (the inject hook consumes the top-level digest, not the template's markers — quoted from `inject-project-digest.sh:29`).
- **G family 7/7** — added `g6-preset-react-spa`, `g7-preset-react-native`, `g9-dist-packaging`.
- **I family 5/5** — added `i5-using-getff-skill`, `i6-installing-enforcement-skill`, `i7-tool-bootstrapping-skill`, `i8-plugin-agent-twins`, `i9-fetch-and-wire`. I6 credits the soft-vs-hard boundary prose to the SKILL artifact per the census T-ENC-A note (quoted: `SKILL.md:8` + `:21`).
- **E15–E17: covered-by-E2** — recorded in `ENCYCLOPEDIA-LEDGER-E5.md` §Coverage records and in the table below; NOT drafted here, per kickoff.

| id | record |
|---|---|
| E15 | covered-by-E2 (skill-context aif-orchestrator-discipline == C21's same file) |
| E16 | covered-by-E2 (skill-context aif-review == C22's same file) |
| E17 | covered-by-E2 (skill-context aif-rules-check == C23's same file) |

### D2 — 12/12 PARTIAL fills, additive-only

| id | page | fill (sentence-level, appended) |
|---|---|---|
| A8 | limits.md | per-file go-lane detail: `.golangci.yml` (forbidigo ban on os.Getenv) + `getff-go.yml` from `setup.d/47-go.sh`; REFUSE-LOUDLY → `getff-golangci.yml`; "no Go quickstart page yet; the files are the detail" |
| E24 | limits.md | names `.golangci.yml` explicitly |
| E25 | limits.md | names the pinned `.github/workflows/getff-go.yml` gate |
| A16 | daily-cycle-rules.md | names `setup.d/60-ci.sh` reconciliation: .nvmrs↔CI drift WARN + `CI-orphan` warning text |
| E1 | daily-cycle-rules.md | names the delivered `.lintstagedrc.json` (copy_safe seed; consumer config kept) |
| E4 | daily-cycle-rules.md | names `AGENTS.md.template` as the rendered source of the delivered AGENTS.md; refresh never overwrites |
| E9 | first-steps-core.md | explains the SSOT role: two renders (site page + AI-USAGE-GUIDE) read from `first-steps.source.json`, neither render is the source |
| G1 | beta.md | describes the package payload layout: only published artifact; `bin/getff` → same installer; tarball == repo-root layout; `MANIFEST.sha256` prepack drift-check |
| I1 | quickstart-ts.md | names `.claude-plugin/marketplace.json`: one plugin `getff`, source `./plugin`, `strict: true` |
| I2 | quickstart-ts.md | names `plugin/.claude-plugin/plugin.json` + FSL-1.1-ALv2 license |
| I3 | quickstart-ts.md | names the command `/getff:install-enforcement` + its dry-run/consent flow |
| I4 | factory-overview.md | names plugin skill `getff` + the sibling set (using-getff, installing-enforcement, tool-bootstrapping) |

Diff shape of the fills: `git diff --numstat origin/main` over the six pages shows additions only — the
few `-` lines are paragraph-final lines extended in place (each `-` line reappears identically at the head of
its `+` replacement; no original wording removed or reworded). Checked line-by-line for all six files.

### D3 — `ENCYCLOPEDIA-LEDGER-E5.md`

Written at branch root: **78 capability-sentence rows** (A 29, E 28, G 11, I 10 — grep-verified count) +
3 covered-by-E2 records. Row shape: `| page | sentence (short) | evidence anchor(s) at pin |`, with
`lane-partial` labels where the claim is lane-scoped.

### D4 — this report

## §3 The gate — command + output per row

| # | Check | Command | Output |
|---|---|---|---|
| 1 | Diff shape | `git status --porcelain`; `git diff --stat origin/main` | Tracked modifications: exactly the 6 PARTIAL pages + `content/docs/meta.json` (the pre-existing 1-line nav entry) = `7 files changed, 37 insertions(+), 5 deletions(-)` (the 5 are extended paragraph-final lines, see D2). New trees: `content/docs/reference/` (40 files = 39 pages + meta.json) and `app/docs/reference/` (39 twin routes). Untracked and **deliberately left out of every commit**: `AGENTS.md`, `.ai-factory/` (aif install artifacts, not E5 deliverables) |
| 2 | Census coverage | id-by-id read-back vs the census family tables (A 24-row, E 39-row, G 9-row, I 9-row tables) | A: 13 MISSING all drafted (A3–A20 in round 1 + A21–A24 this round); 2 PARTIAL (A8, A16) filled. E: 14 MISSING drafted + E15–E17 covered-by-E2; 5 PARTIAL (E1, E4, E9, E24, E25) filled. G: 7 MISSING all drafted; 1 PARTIAL (G1) filled. I: 5 MISSING all drafted; 4 PARTIAL (I1–I4) filled. **39 + 3 + 12 accounted** |
| 3 | Page schema | sweep: frontmatter + provenance pin + Status/Ships-to/Fires-at + the four sections, over all 39 | `SCHEMA PASS: 39/39` — «(no failures)». Provenance pin identical on all 39: `provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650` (stamp dates differ honestly by authoring day: 2026-09-11 on 16 round-1 pages, 2026-09-12 on 23 rework pages) |
| 4 | Anchors | sweep: unique `path:line` refs ≥2 AND ≥1 «quoted» per page | `ANCHOR PASS (generic path:line regex): 39/39` — «(all ≥2 anchors, ≥1 quoted)». Spot-quote: `e22-cargo-lints-toml.md` anchors `packages/core/templates/cargo/Cargo.lints.toml:11` — «disallowed_methods = "deny"» — matches the file at the pin byte-for-byte |
| 5 | Lane honesty | read-back sweep; three exemplars | Exemplar 1 (e7): «consumer install ships AGENTS.md, NEVER CLAUDE.md» anchored to `setup.d/lib.sh:118`. Exemplar 2 (e37): storybook scaffold gated `if [ "$STACK" = "react-next" ]` — react-spa/react-native/python/cargo/go get none, quoted with the `fi` line. Exemplar 3 (a22): manifest is npm-lane surface; python/cargo/go lanes never read it; aif-handoff row factory-only. Template pages name the consumer-visible render path (e36 rendered RULES.md, e34 append target, e39 top-level digest) |
| 6 | Ledger | count vs rows | header-excluding count `grep -cE '^\| [a-z]+[0-9]+[a-z0-9-]* \|' ENCYCLOPEDIA-LEDGER-E5.md` → `78`; per-family `awk` over the section ranges → `E=28 A=29 I=10 G=11 total=78` — 78 data rows + 3 covered-by-E2 records; every capability sentence rowed or labeled; tally quoted in the ledger tail. (Rework round 2: round 1 quoted `grep -c '^| [a-z]'` → 82, but that pattern also matches the section-header rows (`| page |` ×4, `| id | record | why |` ×1) — one header per family inflated each count by exactly 1 → 30/29/12/11. Recount with a header-excluding pattern corrects to 78 = 29/28/11/10; no data rows changed) |
| 7 | Wiring | grep registries + built artifacts; one slug end-to-end | End-to-end for `a21-layers`: root `content/docs/meta.json:21` `"reference",` → `content/docs/reference/meta.json:15` `"a21-layers",` → `app/docs/reference/a21-layers.md/route.ts:16` `source.getPage(['reference', 'a21-layers'])` → built twin `out/docs/reference/a21-layers.md` (header quoted in §7 of the build output) → `out/llms.txt` entry `[setup.d/LAYERS.md — the layer registry (A21)](https://getff.ai/docs/reference/a21-layers)` → `out/llms-full.txt:1272` → search index `out/api/search` contains `reference/a21-layers`. Totals: 39/39 twin routes registered in the build route table; `grep -c "docs/reference" out/llms.txt` → 39; unique reference slugs in llms.txt → 39 |
| 8 | Build green | `npm ci --include=dev` then `npm run build` | «✓ Compiled successfully in 474ms» → «Generating static pages (121/121)» → route table lists all 39 `/docs/reference/<slug>.md` routes + `/llms.txt` + `/llms-full.txt`. Build FAILED on the first attempt with `NODE_ENV=production` exported (container baseline; TypeError `useContext` during prerender) — re-run with `unset NODE_ENV` → green, twice. Recorded as a container-env finding below |
| 9 | No styling/restyle/announce-touch | `git diff --name-only origin/main \| grep -E '\.(css\|tsx)$\|announcement'` | empty — no `.css`/`.tsx`/announcement files modified at all (twin routes are NEW `route.ts` files, not modifications) |
| 10 | T7 + T19 reported | this report | §T7 and §T19 below |

## T7 — adversarial counter-prompt (run before GREEN)

«What would make this installer map look documented when it is not?»

1. **A lane page claiming parity the census `ships-to` column denies** — hunted on every new page. Each
   carries its restriction explicitly with a stage-line anchor: e7 (never delivered to consumers), e22
   (cargo-only), e34 (python-only, and only in the pre-commit-present cell), e37/e38 (react-next only,
   gated line quoted), a23 (factory-only), i5–i9 (plugin-path only, and the page says the npm/clone path
   reaches the same capability by a different channel). No page claims cross-lane delivery without the
   census row backing it.
2. **Template pages anchored to the template tree without naming the consumer-visible render** — checked on
   every E page: e36 names `.ai-factory/RULES.md` as a RENDER (and quotes the marker-fallback), e39 names the
   top-level digest as the consumed file, e34 names the append target `.pre-commit-config.yaml`, e37/e38 name
   `.storybook/`, e22 names `.getff/Cargo.lints.toml`. All eight template deliveries quote the copy line.
3. **#1715's post-census install-docs changes silently missed** — W2 delta enumerated (§1 row 3): the
   intersecting files (`session-bootstrap.md`, `MANIFEST.sha256`, `10-skills.sh`, `plugin/hooks/*`) were each
   re-probed at the working pin before their page's claims were fixed; all quotes on-page were read at
   `aa87d0a4`, which is a descendant of the census pin — the delta is absorbed, and §1 row 3 records what the
   delta touched.
4. **A slug in nav but missing from twin/llms/search** — the end-to-end trace in §3 row 7 covers all five
   surfaces for `a21-layers`; the aggregate counts (39 registered routes, 39 llms.txt entries, 39 unique
   slugs, search index hit) close the same trap for the other 38.

## T19 — cold self-pass

Re-read pass over the drafted pages after a cool-off, checking: does every Status/Ships-to/Fires-at line match
the anchors below it; is every «quoted» string byte-matched against the pin; does any page promise a
mechanism its anchors don't show? Result: 39/39 pass the mechanical sweeps quoted in §3 rows 3–4; spot
cold-reads: `a23-aif-handoff-guided.md` (consent auto-decline line and degrade line re-grepped at the pin —
both byte-match), `e39-session-bootstrap-pair.md` (the "hook consumes the top-level digest" claim re-derived
from `inject-project-digest.sh:29` rather than the census sentence), `g9-dist-packaging.md` (prepack line and
manifest line 1 re-grepped — byte-match). One prose correction made during the pass: the ledger tally line
first mis-stated the per-family page counts; re-counted (13+14+7+5=39) and fixed.

## Findings

- **F-E5-1 (container env, non-blocking):** `NODE_ENV=production` is exported in this container's baseline.
  With it set, `next build` fails during prerender (`TypeError: Cannot read properties of null (reading
  'useContext')` on docs pages + `/_global-error`). `unset NODE_ENV` before `npm run build` → green. The
  kickoff's §1 row 6 fact ("npm ci + npm run build") holds only with this unset. Matches the known BS0
  container-quirk family.
- **F-E5-2 (docs surface, factual):** `CLAUDE.md.template` is header-verified and release-copied as a
  SHIPPED_DOCS member, but no install stage delivers `CLAUDE.md` to a consumer — the framework's own
  link-hygiene comment states it («install ships AGENTS.md, never CLAUDE.md — verified on the fixture»,
  `setup.d/lib.sh:118`). The e7 page documents the artifact WITH this asymmetry rather than implying
  delivery. No defect filed: the framework comment shows this is known.
- **F-E5-3 (sweep tooling note):** an extension-sensitive anchor regex under-counts anchors on pages whose
  targets are extensionless (`companions.manifest:1`); the generic `path:line` sweep is the authoritative one
  (39/39). Recorded so E6's consolidation sweep uses the generic form.

## Parked questions

- **Q-E5-1 (operator):** the vendored-render parity mechanism (census E1 defect 7 context) stays parked with
  E1's findings — not this stage's to fix; e36's render-vs-copy split is documented as shipped behavior.
- **Q-E5-2 (operator):** E15–E17 verification is E6's, per kickoff; this stage only records covered-by-E2.

## Verdict

`E5: GREEN — 39/39 pages drafted + 3 covered-by-E2 recorded, 12/12 PARTIAL filled, 78 ledger rows, build green, wiring proven`
