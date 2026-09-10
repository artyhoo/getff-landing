# BS2-REPORT.md — beta-docs-showcase stage 2 (content)

**Stage:** BS2 (content — the pages the BS1 skeleton was built to carry) · **Date:** 2026-09-05
**Branch:** `feature/beta-docs-showcase-5893d3` (ff-forwarded onto BS1's `87d1a99`; no push, no PR, `main` untouched)
**Framework clone read at:** `/home/www/rules-as-tests-aif` HEAD **`f49e35311c`** (re-verified at entry and again during T7 — see §1 row 3, §4 T7-3)
**Verdict:** `BS2: GREEN — fifteen docs pages build, census + new URLs resolve individually, ledger complete, draft stays a draft`
(the kickoff's verdict template said «sixteen»; the real enumerated set is **15 = 5 kept + 10 new** — kickoff arithmetic slip, recorded per T10 and the getff#1586 lesson, see Findings F5.)

---

## 1. §1 entry re-verification (T3 — command + output per row)

| # | Fact | Command | Output |
|---|---|---|---|
| 1 | Base clone at `main`=`b65ff4b`; this task in a per-task worktree | `git -C /home/www/getff-landing log --oneline -1` / `git branch --show-current` (×2) | `b65ff4b Merge pull request #4 …` · base branch `main` · worktree branch `feature/beta-docs-showcase-5893d3` |
| 2 | BS1 reachable at `feature/beta-docs-showcase-9bd88c`=`87d1a99`; ff-only merge | `git rev-parse --short feature/beta-docs-showcase-9bd88c` → `87d1a99`; then `git merge --ff-only feature/beta-docs-showcase-9bd88c` | `Updating b65ff4b..87d1a99` `Fast-forward` (58 files) — fast-forward succeeded; first commit-affecting action as ordered |
| 3 | Framework clone + C1 SSOT + renders present | `git -C /home/www/rules-as-tests-aif log --oneline -1`; `ls` of the three files | `f49e35311c docs(promote-gate-fixes): kickoff for the two CI defects the promote PR surfaced (#1598)` · `packages/core/templates/shared/first-steps.source.json` (12164 bytes) · **the two renders are NOT at repo root**: found at `packages/core/templates/shared/AI-USAGE-GUIDE.md` and `packages/core/templates/shared/tier-home.md`; `INSTALL-FOR-AI.md` at repo root (kickoff's `ls` glob used the shared/ prefix only for the JSON — path nuance recorded, files present) |
| 4 | No github egress; npm registry reachable | `curl -m 6 -sS -o /dev/null -w '%{http_code}' https://github.com`; `npm view fumadocs-core version` | `000` (no egress, as expected) · `16.15.7` (registry latest; lockfile pin 16.15.4 kept — no version move) |
| 5 | Toolchain | `node -v`; `npm -v`; `npm ci --include=dev && npm ls --depth=0` | `v22.23.1` · `10.9.8` · ci exit 0; pinned tree confirmed: `fumadocs-core@16.15.4, fumadocs-mdx@15.4.0, fumadocs-ui@16.15.4, next@16.3.4, react@19.2.8, tailwindcss (dev) 4.3.3, typescript 5.9.3` |
| 6 | BS1 tree shape | `ls content/docs content/blog app/docs`; `grep -n 'BS2 target' 'app/(site)/page.tsx'`; `grep -rn draft app/` | 5 docs pages + flat `meta.json`; 1 blog post; 5 twins; `page.tsx:80,86` carry the two `BS2 target:` comments; draft filters present at `app/rss.xml/route.ts:22`, `app/sitemap-0.xml/route.ts:19`, `app/(site)/blog/page.tsx:15`, `app/(site)/blog/[slug]/page.tsx:11` |
| 7 | Production census unchanged | host-side snapshot (given); inside container only row 1 re-verifiable | row 1 re-verified (above); no other in-container probe possible (no egress) |
| 8 | BS1 parked question 1 open for BS3 | `sed -n '/## 6. Parked/,/## 7/p' BS1-REPORT.md` | read — parked Q1 (neutral docs theme at cutover) confirmed present and carried forward (§7 below) |

## 2. Deliverables

**Docs pages (10 new; slugs fixed by the kickoff):** `what-is-getff`, `first-steps-core`, `first-steps-env`,
`first-steps-factory`, `quickstart-python`, `daily-cycle-rules`, `factory-overview`, `daily-cycle-factory`,
`degradations`, `beta` — all under `content/docs/*.md`, each with a twin `app/docs/<slug>.md/route.ts`
generated from BS1's pattern (`sed`-substituted from the kept `quickstart-ts` twin; content composed by
`getLLMText` from the same source — nothing hand-typed).
**Announcement:** `content/blog/getff-beta.md`, **`draft: true` set explicitly** (schema default is false).
**Ledger:** `CLAIMS-LEDGER.md` at branch root — 86 numbered rows + wiring record.
**Sidebar:** `content/docs/meta.json` — B-D1 tree verbatim shape.

**Badge decision (D1).** Fallback form used: a `(beta)` / `(experimental)` **label suffix on the group
names** — `---Rules from live docs (beta)---`, `---The AI factory (experimental)---`. Basis, both quoted:
- **Live doc page** (fumadocs.dev/docs/ui/page-conventions, «Page Slugs & Page Tree», read 2026-09-05):
  the `meta.json` `pages` item syntax is Path / **Separator `---Label---`** / Link / Rest / Reversed
  Rest / Extract / Except; folder `meta.json` fields are `title`, `icon`, `pages`, `defaultOpen`,
  `description`, `root`. **No `badge` property exists in the documented schema.**
- **Pinned package** (node_modules, fumadocs-core **16.15.4**): `dist/source/plugins/status-badges.d.ts`
  — «Status badge to display in the sidebar (e.g., "new", "beta", "deprecated", "experimental")» — an
  **undocumented** plugin that reads `status` from page **frontmatter** and requires wiring
  `statusBadgesPlugin` into the `loader()` plus a `renderBadge` render option in the docs layout. Adopting
  it would have meant editing BS1-owned `lib/source.ts` and `app/docs/layout.tsx` — outside D8's
  permitted edit set — for an undocumented API. Label suffix chosen; decision recorded here per D1.

**Tree shape note:** the B-D1 tree is realized as a **flat `meta.json` with separators** (BS1's existing
shape). Fumadocs real folders would either change new-page slugs (breaking the kickoff's fixed URLs) or
require physically moving BS1's five kept pages into group folders — forbidden (§4: nothing BS1 ported
moves). Parenthesized `(group)` folders keep slugs but still move the kept files. Flat separators keep
every URL flat and the group labels rendering as sidebar section headings (gate row 6 proves they render).

**SSOT sequences vendored (D2):**
- `first-steps-core.md` ← `sequences.core` (profileFlag `-y (default; equivalently --profile core)`), steps
  `install > verify-payload > fill-passport > prove-rules-not-inert > watch-a-rule-fire > run-the-gate > research-your-stack` (7)
- `first-steps-env.md` ← `sequences.env` (`--profile env`), steps
  `install > verify-payload > fill-passport > prove-rules-not-inert > read-tier-home > arch-one-idea` (6)
- `first-steps-factory.md` ← `sequences.factory` (`--profile factory (legacy equivalents: --with-aif-suite, --all)`), steps
  `install > verify-payload > fill-passport > prove-rules-not-inert > read-tier-home > write-a-kickoff > run-pipeline > dispatch-one` (8)

Each page opens with the provenance header (source path, schema, sequence, commit `f49e35311c`, regen
instruction «re-vendor from the source at the current staging HEAD; do not edit by hand»). Step titles and
every SSOT command are verbatim; the render-contract shape (`<!-- step: <id> -->` + next non-blank line
`<digits>. **<Title>**`) mirrors the framework's own parity fixture regex
(`packages/core/audit-self/first-steps-parity.test.ts` `renderedSteps()`). `env`/`factory` pages carry
**experimental** in their intro; `core` carries the beta label.

**Commit order note (plan deviation, recorded):** the ledger (plan task 7) was written **after** the
wiring (plan task 8) so its `page:line` anchors cite final line numbers; the plan's two tasks share the
same dependency set (3–6), and both commit slots landed in the planned order by content (wiring commit
`0a68b65` precedes ledger commits). The honesty-pass commit `2b407f3` sits between them.

## 3. Gate table — §3, thirteen rows, run not described

Serve discipline (BS1's lesson): the gate ran twice. First build was at wiring commit `0a68b65`; the
honesty pass (`2b407f3`) changed page body text afterwards, so per T14 the build-dependent rows (1–4, 6,
7, 10, 11) were **re-run against a fresh `rm -rf out .next && npm run build` at the branch head**, served
from a fresh copy `/tmp/gate-serve2` on port 8643, then the server was killed (port verified closed).
Source-level rows (5, 8, 9, 12, 13) read the working tree and were unaffected.

| # | Check | Command (abridged where marked) | Output | Verdict |
|---|---|---|---|---|
| 1 | Clean build | `rm -rf out .next && npm run build` (×2; final run at head `2dd3073`+ledger-only edit, which is outside the site build) | `BUILD EXIT: 0`; route table: `/`, `/api/search`, `/blog*`, `/consulting`, `/docs/[[...slug]]` SSG (15 pages), 15 `/docs/*.md` twins, `/llms.txt`, `/llms-full.txt`, `/rss.xml`, `/sitemap-*.xml` | **PASS** |
| 2 | Route inventory BEFORE route claims | `ls -R out` (full listing captured to `/tmp/gate-lsR.txt`; key subtree quoted) | 181 files; `out/docs/` = 15 page dirs + 15 `.md` twins + `global.css`; top level carries `index.html`, `llms*.txt`, `rss.xml`, `sitemap-0.xml`, `api/`, `blog/`, `consulting/`, `demo/`, CNAME, robots | **PASS** |
| 3 | 31 URLs fetched individually | `curl -sSL -o /dev/null -w '%{http_code} %{url_effective}'` per URL (census 11 + new pages 10 + twins 10) | census 11/11 → `200`; new pages 10/10 → `200`; twins 10/10 → `200` (re-run at head: `ALL 31 URLS: 200`) | **PASS** |
| 4 | Per new page: `<title>` + body-unique phrase | per page: `grep -o '<title>…'` + normalized phrase grep on own HTML + the same grep over the other 14 docs pages' HTML | 10/10 titles correct; 10/10 phrases `own:YES other:0`. Method note: frontmatter **descriptions** are not unique anchors (they ride every page's RSC tree payload — e.g. what-is-getff's description matched 63 files); body phrases are | **PASS** |
| 5 | Ported prose untouched | `git diff 87d1a99 -- content/docs/<5 kept>.md content/blog/executable-agents-md.md` (each) → `diff lines = 0` ×6; `git diff 87d1a99 -- 'app/(site)/page.tsx'` pasted in the transcript and below | 6× empty; page.tsx diff = exactly two `href` values + two removed `BS2 target:` comment lines, nothing else | **PASS** |
| 6 | Sidebar groups + labels; jargon | `grep -c '<group>' out/docs/what-is-getff/index.html` ×6; `grep -rl killer out/`; `grep -rli environment out/` + per-file context | all six group labels present (×2 each = sidebar + RSC payload), including «Rules from live docs (beta)» and «The AI factory (experimental)»; **killer → 0 files**; environment hits fully itemized: (a) the BS1 lede string on the landing (`index.html`, `__next._full.txt`, `index.txt`, `__next.!KHNpdGUp.__PAGE__.txt`) — «…an AI-run dev environment around them.»; (b) the **same lede string quoted verbatim** on `what-is-getff` (page + twin + `llms-full.txt` + search index) — mandated by D3 «quote it, do not paraphrase it»; (c) `_next` React chunks carrying React's own «non-minified dev environment» error text (framework-internal, not our copy). No other hits | **PASS** (contexts listed as the row requires) |
| 7 | Panel targets | `grep -o 'href="/docs/[a-z-]*/"' out/index.html`; `ls -d` both targets | `href="/docs/daily-cycle-rules/"` ×1, `href="/docs/factory-overview/"` ×1 (plus kept `/docs/quickstart-ts/` ×3 from the hero CTA etc.); both resolve to real dirs in `out/` | **PASS** |
| 8 | First-Steps parity, mechanical | `grep -oE '<!-- step: [a-z0-9-]+ -->'` per page vs `node -e '…sequences[seq].steps[].id'`, `diff`; title-verbatim re-check with the fixture's own regex; `grep -l f49e35311c` provenance headers | `parity core: EMPTY DIFF (7 steps)` · `env: EMPTY DIFF (6)` · `factory: EMPTY DIFF (8)`; titles verbatim = YES ×3; 4/4 vendored pages (3 First-Steps + degradations) name `f49e35311c` | **PASS** |
| 9 | F5 wording sweep | `grep -rniE 'cargo-deny\|any AI agent\|guarantee\|never fails\|100%\|production-ready' <10 new pages> content/blog/getff-beta.md` | 1 hit: `content/blog/getff-beta.md:29` «for cargo, the demo today is clippy, with cargo-deny on the roadmap» — the exact F5-4 sanctioned shape, ledger **row 79**, labelled `planned` for the deny arm. No other hits | **PASS** (hit is a ledgered label, not a claim) |
| 10 | Draft stays a draft | `grep -rl getff-beta out/blog out/rss.xml out/sitemap-0.xml`; `grep -c '<item>' out/rss.xml` | files: **0**; rss items: **1** (only the 2026-07-10 post); blog listing + sitemap carry only `executable-agents-md` | **PASS** |
| 11 | llms + search | `grep -oE '/docs/[a-z-]+' out/llms.txt \| sort -u \| wc -l`; same pattern over `llms-full.txt` page headers; `node scripts/verify-search.mjs <origin>/api/search "firing self-check" quickstart-python`; nonsense token | llms.txt: **15** unique docs slugs; llms-full.txt: **15** page headers (`beta daily-cycle-factory daily-cycle-rules degradations executable-agents-md factory-overview faq first-steps-core first-steps-env first-steps-factory limits quickstart-python quickstart-rust quickstart-ts what-is-getff`); search: `PASS: /docs/quickstart-python returned by static search` (exit 0, top page hit); `zzquuxplorkfnord` → `results (0)` / exit 1 | **PASS** |
| 12 | Ledger completeness | per-page row counts via grep; `grep -cE '^\| [0-9]+ \|'`; conformance re-grep; `grep -c 'experimental\|planned'` | 86 numbered rows; per-page (min ≥1 required): what-is-getff 10, daily-cycle-rules 10, factory-overview 9, daily-cycle-factory 8, first-steps-core/env/factory 4/4/4, quickstart-python 14, degradations 6, beta 8, announcement 9, panel cards 2 (+2 wiring rows recorded below the table, explicitly not claims); **0 rows lacking formula+evidence/label** after moving the two wiring hrefs out of the numbered table; label density lines: **20** | **PASS** |
| 13 | SSOT evidence paths exist | `test -e` loop over the 14 distinct evidence paths of the three sequences | 11 OK; **3 literal misses**: `scripts/check-rule-globs.sh`, `scripts/check-fences-fire.sh`, `scripts/audit-ai-docs.sh` — all three exist in the clone at `packages/core/audit-self/` and are shipped to the consumer's `scripts/` by `setup.d/40-configs.sh:14-21,51-52` (`copy_safe` lines quoted in the transcript). The SSOT's evidence paths are **consumer-relative** (correct for the consumer context the steps address) but do not resolve inside the framework clone as written | **PASS with FINDING F1** (recorded, not patched — umbrella C owns the SSOT) |

**Verdict line:** `BS2: GREEN — fifteen docs pages build, census + new URLs resolve individually, ledger complete, draft stays a draft`
(«fifteen» replaces the template's «sixteen» — the kickoff's own §2 D1 tree enumerates 15; the «16 = 5+11»
in gate row 11 is an internal arithmetic slip. State kept as corrected; see Findings F5.)

**Gate row 5 paste (page.tsx diff, abridged to the hunk):**

```diff
@@ -77,14 +77,12 @@ export default function HomePage() {
       <section id="ai-dx" aria-labelledby="ai-dx-title">
         <h2 id="ai-dx-title">AI DX on both sides of the keyboard</h2>
         <div className="panel-grid">
-          {/* BS2 target: the two-layer showcase page for the rules layer. */}
-          <a className="panel-card" href="/docs/quickstart-ts/">
+          <a className="panel-card" href="/docs/daily-cycle-rules/">
             <span className="badge">beta</span>
             <h3>Rules from live docs</h3>
             <p>Conventions compiled into native toolchain gates — ESLint/husky for npm, clippy/cargo-deny for cargo.</p>
           </a>
-          {/* BS2 target: the AI-factory overview page. */}
-          <a className="panel-card" href="https://github.com/artyhoo/getff">
+          <a className="panel-card" href="/docs/factory-overview/">
             <span className="badge badge-exp">experimental</span>
             <h3>The AI factory</h3>
             <p>Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.</p>
```

## 4. T7 adversarial counter-prompt (§5) — what would make this pass look real when it is not?

Written before the final re-verification; each check run with output:

| # | Suspicion | Check run | Surfaced |
|---|---|---|---|
| T7-1 | A claim reworded just enough to dodge row 9's regex | `grep -rniE 'always works\|zero (failures\|false)\|never breaks\|bulletproof\|rock.?solid\|risk.?free\|assures\|silently bypasses\|unconditionally'` over all 10 pages + announcement | clean (exit 1, no hits) |
| T7-2 | Jargon hidden by case or spacing | `grep -ril killer out/` | 0 files |
| T7-3 | Provenance header naming a commit not actually read | `git -C /home/www/rules-as-tests-aif rev-parse --short HEAD` re-run during T7; compared to the headers | `f49e35311c` == the HEAD every session read; 4/4 vendored pages name exactly it |
| T7-4 | Twin serving the HTML shell | `head -1` + shell-marker grep on each `out/docs/<slug>.md` | 10/10 start `# <Title> (/docs/<slug>)`; 0/10 contain `<!DOCTYPE`/`<html` |
| T7-5 | Draft leaking through `llms-full.txt` | `grep -c getff-beta out/llms.txt out/llms-full.txt` | `0` and `0` |
| T7-6 | Step comments matching but bold titles "improved" | re-ran the SSOT parity including **titles** (the fixture's own regex incl. `\*\*(.+?)\*\*` capture) + every SSOT command string must appear verbatim in its page | `PARITY … EMPTY DIFF` ×3; `TITLES: all verbatim`; `ALL SSOT COMMANDS PRESENT VERBATIM IN THEIR PAGES` |
| T7-7 | meta.json diverging from B-D1 (order swapped, group renamed) | mechanical compare of the `pages` array vs the B-D1 page order | `ORDER MATCHES B-D1 (15 pages)`; separators exactly the 6 groups with the two label suffixes |
| T7-8 (self-caught) | The gate judging a stale artefact | noticed the first build predated the honesty-pass commit `2b407f3` | full rebuild at head + re-run of rows 3/4/6/7/10/11 on the fresh serve (§3 preamble) — this is the pass that counts |

Additional honesty pass **during authoring** (before any gate row ran) — seven sentences across six pages
were cut or re-scoped because their evidence did not support them: lane-specific gate-fire channels
(beta page), the unsourceable «worker never merges by itself» (factory-overview, daily-cycle-factory),
the `/arch` exception restated without the rubric's precondition (daily-cycle-factory — now deferred to
the rubric, which owns it), «runs green in CI» for a cell whose CI status is not observable from this
container (quickstart-python), the python stack missing from the layer-coverage sentence
(what-is-getff), and the announcement's «goes red locally before CI wakes up» (reworded to the
evidenced planted-violation moment). All are invisible in the final text because they were fixed before
commit; they are recorded here because T19 asks what the cold pass caught.

## 5. Findings

- **F1 (gate row 13 / D2) — SSOT evidence paths are consumer-relative.** Three evidence paths
  (`scripts/check-rule-globs.sh`, `scripts/check-fences-fire.sh`, `scripts/audit-ai-docs.sh`) do not
  exist at those paths in the framework clone; each exists at `packages/core/audit-self/` and is
  delivered to the consumer's `scripts/` by `setup.d/40-configs.sh:14-21,51-52`. The steps are runnable
  for a consumer; the literal `test -e` check the kickoff mandated still misses. Routed to **umbrella C**
  (C1 owns the SSOT): either qualify the evidence paths as consumer-relative or cite both locations. The
  vendored pages mirror the source as-is (B-D5 AMENDED: no patching around it).
- **F2 — Fumadocs sidebar badges: documented schema has none.** The pinned package carries an
  *undocumented* `statusBadgesPlugin` (frontmatter `status` + loader wiring + `renderBadge`), which would
  have required editing BS1-owned `lib/source.ts` / `app/docs/layout.tsx`. Label-suffix fallback used
  (§2, quoted sources). If badges are wanted at BS3, the plugin is the path and it is a small, testable
  wiring change.
- **F3 — ledger FINDING-L1: the landing's left panel card copy predates F5-4.** «ESLint/husky for npm,
  clippy/cargo-deny for cargo» reads cargo-deny inside a present-tense gate list; F5-4 requires «clippy
  demo, deny roadmap». This stage's only permitted edits to `page.tsx` are the two hrefs, so the sentence
  is ledger row 85, labelled `planned` for the deny arm, and flagged for the operator/BS3 rather than
  silently reworded. (The framework README's own line 8 already carries the correct shape — only the
  landing copy is stale.)
- **F4 — ledger FINDING-L2: W6 cell CI status is not observable from this container** (no github.com
  egress). The python quickstart claims what the cell *demonstrates and asserts* (its arms; its
  merge-blocking wiring), never a green badge.
- **F5 — kickoff arithmetic slip (T10, getff#1586 lesson).** Gate row 11 said «sixteen docs pages
  (5 kept + 11 new)»; the D1 tree the same kickoff fixes enumerates **5 + 10 = 15**. All checks ran
  against the enumerated real set (15 pages; 15 twins; 31 URLs = 11 census + 10 new pages + 10 twins).
- **F6 — ledger FINDING-L3: the source guide's own tension carried, not introduced.** AI-USAGE-GUIDE §3
  says every daily-cycle command ships «at every depth», while the same section scopes
  `ci-available-probe.sh` to npm-lane installs. The page quotes both halves exactly as the guide does;
  the ledger row 17 cites both lines so the auditor sees the source's wording pair.
- **F7 — descriptions are not page-unique in the export.** Fumadocs ships every page's frontmatter
  description in every docs page's RSC tree payload, so a description phrase matches dozens of files
  (measured: 63). Anything that must be page-unique (gate row 4 class checks) must anchor to body text.

## 6. D9 — README honest-claims PROPOSAL (maintainer-owned; relayed, never edited)

Checked: the full README at `f49e35311c` (378 lines) against the F5 formulas and the shipped matrix
state. Line 8 already carries the F5-4 shape («clippy for cargo — cargo-deny dependency bans are on the
roadmap») and line 10 already carries the milestone framing — no change proposed there. Four deltas
proposed, each tied to evidence:

```diff
--- a/README.md
+++ b/README.md   (proposal against f49e35311c — NOT applied)
@@ -197,1 +197,1 @@
-Paste this into Claude Code, Cursor, or any AI agent with file access in your project's directory:
+Paste this into Claude Code, Cursor, or an AI agent with file access in your project's directory:
@@ rationale
- F5-1 / design B-D2: harness agnosticism is CC+Zode proven, Cursor docs-verified; «any» is
  matrix-unproven until C3 probes cover it. (Ledger: what-is-getff portability row 29 / GUIDE §5.)

@@ -256,1 +256,1 @@
-The stacks above are all inside the npm toolchain. … **Rust/cargo is the first non-npm backend.**
+The stacks above are all inside the npm toolchain. … **Python is the first non-npm lane
+(shipped: `install.sh python`, consumer-matrix-proven end to end); Rust/cargo is the next.**
@@ rationale
- F5-1: the python lane ships and the W6 cell (tests/consumer-matrix/python-unfamiliar-stack-cell.sh,
  assertions (1)-(10)) demonstrates it end to end; INSTALL-FOR-AI.md documents it. The README nowhere
  mentions the lane, and «first non-npm backend» is stale against it. Under-claiming is still drift.
  (Ledger rows 38-51.)

@@ -258,1 +258,2 @@
 This is a **roadmap, not shipped** — no Rust rule-pack exists yet. …
+  The Python lane is the shipped counter-example: a pure-bash delivery (ast-grep + ruff fast-path),
+  Node-free on the consumer machine, with a firing self-check and a namespaced CI gate.
@@ rationale
- F5-1 present tense for what is demonstrated today (W6 RED/GREEN/REJECT arms); keeps the roadmap
  paragraph honest about what IS shipped vs not. (Ledger rows 41-47.)

@@ -265,1 +265,1 @@
-- **`install.sh`** — guaranteed fallback that does not depend on AIF extension support
+- **`install.sh`** — the fallback that works today and does not depend on AIF extension support
@@ rationale
- F5-1 vocabulary: «guaranteed» is a promise-form word; the supportable present-tense form is
  «works today» (the lane is what the consumer-matrix cells exercise). (Ledger row 39's wording
  discipline, applied here.)
```

If the maintainer prefers, deltas 2+3 can land as one sentence in the toolchain section; the load-bearing
part is that the shipped python lane appears in the README at all.

## 7. Parked questions

1. **Carried forward (BS1 §1 row 8, operator fork at BS3):** may getff.ai's docs section ship a neutral
   theme at cutover? (`--color-fd-primary` neutral vs the ported brand greens.) Not resolvable inside
   this stage's floors; unchanged by BS2 (no palette touched).
2. **Carried forward (F3, operator fork at BS3):** may the left panel card copy be reworded to the
   F5-4 shape («clippy demo, deny roadmap»)? One-line change, blocked here by D8's two-href limit.
3. **New, for umbrella C via the host:** F1 (SSOT evidence-path context) and F4 (W6 CI-status
   observability) — the ledger rows cite what is checkable; C owns the fix.

Nothing else was parked: every operator-only question the stage hit (badges, tree shape, commit order)
was resolvable inside the kickoff's own rules and is recorded in §2/§5 instead.

---

## REPORT

```text
STATUS: DONE
DELIVERABLE: 10 docs pages + announcement draft (draft:true) + CLAIMS-LEDGER.md (86 rows)
  + BS2-REPORT.md + meta.json B-D1 tree + panel re-point (2 hrefs) + 10 twin routes
  + verify-search.mjs slug arg — 8 commits on feature/beta-docs-showcase-5893d3
  (61ee994, 8334da5, d5eb641, 0a68b65, 2b407f3, 2dd3073, 2df803b, report commit),
  ff-based on BS1 87d1a99; nothing pushed, no PR, main untouched
EVIDENCE: gate table §3 (13/13 rows run, outputs quoted; GREEN), T7 counter-prompt §4
  (8 checks incl. rebuild-at-head), parity EMPTY DIFF ×3 (7/6/8 steps, titles verbatim),
  31/31 URLs 200 individually, draft containment 0 files, llms 15/15, ledger 86 rows
  0 non-conformant, framework read at f49e35311c (provenance headers ×4 name it)
BLOCKER: none
MINOR:
  - F1 SSOT evidence paths consumer-relative (3 literal test -e misses; artefacts exist at
    packages/core/audit-self/ + shipped by setup.d/40-configs.sh) → umbrella C
  - F2 Fumadocs: no documented sidebar badge; undocumented statusBadgesPlugin would need
    BS1-file edits → label-suffix fallback used
  - F3 landing panel copy predates F5-4 (ledger row 85, labelled planned) → operator/BS3
  - F4 W6 CI status unobservable from container → pages claim only what cells demonstrate
  - F5 kickoff «sixteen docs pages (5+11)» vs real 15 (5+10) — checks ran on the real set
  - F6 guide's own every-depth vs npm-lane tension carried verbatim (ledger row 17)
  - F7 frontmatter descriptions not page-unique in export (RSC tree payload) — row-4-class
    checks must anchor to body text
  - D9 README proposal: 4-sentence unified diff in §6, maintainer-owned, relayed not applied
```
