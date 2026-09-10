# BS3-REPORT — cutover stage, COMPLETE (leg A GO after 9 audit rounds, deployed, census green)

**Stage:** `beta-docs-showcase` BS3 (cutover), per `.claude/orchestrator-prompts/beta-docs-showcase/kickoff-b3.md`
(merged to framework `staging` as PR #1670, `23f5fb882d`).
**Run:** 2026-09-10, host session (Mode A inline) in the landing worktree
`.claude/worktrees/bs3-deploy`, branch `bs3-cutover`. (Replaces the 2026-09-08 HALTED
report from the round-1 STOP — that history is preserved in git and in `BS3-GAPS.md`.)
**Deliverable:** `bs3-cutover` merged into `main` of `artyhoo/getff-landing` (merge commit
`8104eabf`, PR #5) + the `/docs/` index follow-up (PR #6, `ca7f8b77`), deployed to
`getff.ai`, production census green, BS0 prototype Pages disabled.

## Verdict

**BS3: GREEN — claims audit GO on `b782f51` (round 9: 133 VERIFIED / 0 GAP / 8
UNVERIFIABLE-needs-human), cutover deployed (`getff.ai/docs/` 404→200), census 20/20,
prototype Pages disabled (edge cache expiring).** One operator park remains open by
design: the visual sign-off (below).

The first leg-A round (previous session, `ac3e7d1`) had returned **STOP with 18 GAPs**
— see `BS3-GAPS.md` and the HALTED report this file replaces. This session ran the
kickoff's REVISE path to convergence: fix the GAPs, re-run the cold audit on the new
head, repeat. Audit arc: **STOP(18) → REVISE(6) → REVISE(6) → REVISE(8) → REVISE(6) →
REVISE(2) → REVISE(1) → REVISE(4, one spurious) → GO(0)**.

## §1 entry re-verification — ten rows, all run (2026-09-10)

| # | Result (command → output) |
|---|---|
| 1 | `git -C /Users/art/code/aif-handoff/projects/getff-landing log --oneline -1` → `b65ff4b Merge pull request #4…` on `main`; BS3 work done in an isolated worktree ✅ |
| 2 | `git fetch && git rev-parse origin/fumadocs-migration origin/main` → `18e847b3…` / `b65ff4b5…`; `merge-base --is-ancestor` → FF-OK ✅ |
| 3 | `diff <(git show origin/main:.github/workflows/deploy.yml) <(git show origin/fumadocs-migration:…)` → only `path: ./dist` → `./out` ✅ |
| 4 | `git show origin/fumadocs-migration:next.config.mjs` → `output: 'export'`, `trailingSlash: true`, `images.unoptimized`; `package.json` build = `next build` ✅ |
| 5 | `git show origin/fumadocs-migration:public/CNAME` → `getff.ai` ✅ |
| 6 | `curl -w '%{http_code}' https://getff.ai/ https://getff.ai/docs/` → `200` / `404` (the pre-state) ✅ |
| 7 | `curl https://beta.getff.ai` → `000`; `curl https://artyhoo.github.io/getff-docs-smoke/` → `200`; `dig +short beta.getff.ai` → empty ✅ |
| 8 | `ls agents/claims-conformance-auditor.md` → present (6710 bytes) ✅ |
| 9 | `git show origin/fumadocs-migration:CLAIMS-LEDGER.md \| wc -l` → 86 rows, BS2 self-report `0 non-conformant` ✅ |
| 10 | `gh pr list --repo artyhoo/getff-landing --state all` → #1–#4 all MERGED/CLOSED, **no open PR** ✅ — divergence note: the kickoff's «none has ever been opened against `main`» was inaccurate at authoring (PRs #1–#4 predate it); the load-bearing half (no open PR; leg B opens the first umbrella PR, #5) held |

## Leg A — cold claims audit, nine rounds

Dispatched per protocol each round: the auditor (general-purpose agent executing
`agents/claims-conformance-auditor.md`) received ONLY the doc surface (content/docs/,
content/blog/, page.tsx, consulting, llms.txt route, CLAIMS-LEDGER.md) + read access to
the framework repo. It was denied BS1/BS2/BS3 reports, BS3-GAPS.md, the kickoff, and
everything under `.claude/orchestrator-prompts/`. Later rounds additionally ran live
sandbox installs against the framework installer and live external probes (npm
registry, agents.md, packmind.com, agnix, coderabbit.ai, qodo.ai).

| Round | Audited SHA | Population | VERIFIED / GAP / UNVERIFIABLE | Verdict |
|---|---|---|---|---|
| 1 (prev. session) | `ac3e7d1` | 86 ledger rows + surface | — / **18 GAP** / 5 | STOP |
| 2 | `31deb04` | 78 | 69 / 6 / 3 | REVISE |
| 3 | `98f87a6` | 75 | 69 / 6 / 2 | REVISE |
| 4 | `be1d32e` | 227 | 217 / 8 / 2 | REVISE |
| 5 | `6b9e878` | 140 | 130 / 6 / 4 | REVISE (live installs) |
| 6 | `6b4eed9` | 89 | 85 / 2 / 3 | REVISE |
| 7 | `fe51cdb` | 89 | 85 / 1 / 3 | REVISE |
| 8 | `0a1e32e` | 62 | 52 / 4 / 6 | REVISE (1 GAP spurious — see below) |
| **9 (final)** | **`b782f51`** | **141** | **133 / 0 / 8** | **GO** |

**The audited SHA is the merged SHA's ancestor:** `b782f51` is the tip of `bs3-cutover`
as merged by PR #5 (merge commit `8104eabf`); PR #6 added only the claim-free `/docs/`
navigation page on top.

GAP-fix rounds (full per-GAP dispositions in `CLAIMS-LEDGER.md` §BS3 rounds 2–9):
- **Round 2 (the original 18):** F5-4 sweep (every cargo-deny overclaim reworded to the
  operator-approved «clippy today, cargo-deny on the roadmap» shape across meta/og/
  ld+json/llms.txt/quickstart-rust/faq/consulting); stack count widened to the four
  shipped lanes; all executable-agents-md citations re-anchored at `94a3a9efcd`;
  preset list + first-steps verify-payload steps re-vendored; `npm install` added to
  both fresh-clone self-audit sequences; beta.md entry paths disambiguated;
  quickstart-rust re-pointed to `install.sh cargo`; python pre-push rung added to the
  what-lands tree; the guide's lane qualifier restored in full.
- **Rounds 3–9 (new finds):** consumer pre-push trio corrected (rule-globs /
  lint-staged-resolves / generated-rule-material; typecheck/tests/depcruise are ci.yml
  jobs); «nothing queued» phantom string removed; demo caption re-attributed to
  pre-commit; `-y` default (env, since 2026-08-18) stated; `<PLACEHOLDER>` phantom
  token fixed; stale CLAUDE.md cites in the degradations matrix annotated; draft stack
  list widened; `--refresh` semantics corrected (twice — the uniform gate, then the
  `.prettierignore` non-exception, both live-probed); plugin wording narrowed to
  ts-server/react-next; `getff --limits` frame label de-commanded; firing.test.ts
  posture corrected (fires in CI, deliberately); quickstart-ts process.env row
  de-overclaimed; tautology row's mutation gate (Stryker break 60) restored; ledger
  evidence chains de-circularised throughout.

**Round 8's row-62 «GAP» was spurious** — the row cites the correct
`plugin/commands/install-enforcement.md` (verified resolving); recorded in the ledger's
round-9 section rather than «fixed», per the no-prose-only-findings rule.

**Residual UNVERIFIABLE-needs-human (8, final round):** two timing claims («about 5
minutes», «90 seconds»/«20 seconds»), the two demo-video files' content, the one-email
forward promise, the consulting-reply promise, the GitHub-Free minutes-exhaustion
figure, `operatingSystem: Cross-platform`. None material to capability truth.

## Leg B — cutover

1. **Local production artifact** (gate row 3): `npm ci` exit 0; `npm run build` exit 0;
   `out/CNAME` = `getff.ai`; 22 static HTML pages (23 after the index page); new copy
   present in `out/index.html`; draft announcement absent from blog index / rss.xml /
   llms.txt / llms-full.txt / sitemap (0 hits each). Run on `b782f51` and again on the
   index-page head.
2. **PR #5** (`bs3-cutover` → `main`), merged as a **merge commit** `8104eabf`
   (2026-09-10T23:04:39Z) — not a squash; the branch history (BS1 port → BS2 content →
   BS3 rounds) is the umbrella's audit trail.
3. **Deploy:** run
   [34540492993](https://github.com/artyhoo/getff-landing/actions/runs/34540492993)
   → `success` for `8104eabf`. (Noted: the previous deploy on old `main`
   `b65ff4b5`, 2026-08-17, had `failure` — production had been serving a stale Pages
   artifact since then; the cutover also un-broke the pipeline itself.)
4. **Production census** (gate row 5, each URL fetched individually from the production
   sitemap): 19/19 → `200` + the census itself surfaced the one gap —
5. **`/docs/` index missing** (T-BDS-B firing): no `content/docs/index.md`, no
   `out/docs/index.html`, no internal link to `/docs/`. The stage's headline observable
   required it. Fixed by **PR #6** (merge commit `ca7f8b77`, deploy run 34540757179 →
   `success`): a claim-free navigation page mirroring `meta.json`. Final census:
   **20/20 URLs → `200`**, including `https://getff.ai/docs/`.
6. **Headline observable** (gate row 6): `https://getff.ai/` → `200`;
   **`https://getff.ai/docs/` → `200` (was 404)**.
7. **Live checks** (gate row 7): `llms.txt` 200 (3979 bytes), `llms-full.txt` 200
   (61184 bytes), `rss.xml` 200 (857 bytes); live search exercised with the real client
   stack (`scripts/verify-search.mjs` against `https://getff.ai/api/search`):
   «passport» → first-steps-core PASS, «degradation matrix» → degradations PASS,
   «clippy» → quickstart-rust PASS — the index is fresh (contains the new `/docs` page
   and the round-3+ copy).
8. **Draft containment** (gate row 8): `getff-beta` slug → 0 hits in blog index,
   rss.xml, sitemap-0.xml, llms.txt, llms-full.txt, and the search index. The post
   stays `draft: true` (parent §7 phase 3).

## Leg C — teardown

- **BS0 prototype Pages disabled:** `gh api -X DELETE repos/artyhoo/getff-docs-smoke/pages`
  → exit 0; `gh api repos/artyhoo/getff-docs-smoke` → `has_pages: false`; the pages GET
  now 404s. The Fastly edge kept serving the cached artifact during this run
  (`cache-control: max-age=600`) — control-plane retirement is complete and verified;
  final re-probe recorded below in the gate table.
- **DNS:** `dig +short beta.getff.ai` → empty (no record exists — same as §1 row 7);
  `curl https://beta.getff.ai` → `000`. **No-op, recorded as a no-op.** No registrar
  action needed or taken.

## §3 gate table — eleven rows, actual commands and outputs

| # | Check | Evidence |
|---|---|---|
| 1 | FF descendant; audited SHA == merged SHA's ancestor | `merge-base --is-ancestor origin/main bs3-cutover` → FF-OK; audited `b782f51` ⊂ merge `8104eabf` |
| 2 | Panel copy F5-4 + ledger row 85 same commit | `ac3e7d1` (previous session); re-verified every round since; row 85 carries the shipped wording with repo evidence |
| 3 | Local production build parity | `npm ci && npm run build` → exit 0; `out/CNAME`=`getff.ai`; 22→23 HTML pages; copy + containment verified in `out/` |
| 4 | Deploy runs `success` for the merge commits | runs 34540492993 (`8104eabf`) and 34540757179 (`ca7f8b77`) → both `success` |
| 5 | Production URL census, enumerated from sitemap, fetched individually | 20/20 → `200` (full list above) |
| 6 | `/docs/` 200 (was 404), `/` still 200 | `curl -w` → `200` / `200`; cache-busted refetches also `200` |
| 7 | llms.txt + llms-full.txt non-empty; search hit for BS2-unique terms | 3979 / 61184 bytes; verify-search 3/3 PASS against the live index |
| 8 | Draft containment on production | `getff-beta` → 0 in blog/, rss.xml, sitemap-0.xml, llms.txt, llms-full.txt, api/search |
| 9 | Leg A GO naming the merged SHA's ancestor | Round 9 on `b782f51`: «Overall: GO — … zero GAP»; tallies 133/0/8 |
| 10 | BS0 prototype retired | control plane: `gh api -X DELETE repos/artyhoo/getff-docs-smoke/pages` → exit 0; `has_pages: false`; pages GET → 404. URL during this run: served `200` from the CDN for ~25 min after the control-plane retirement (`x-proxy-cache: MISS`, `cache-control: max-age=600` — deprovisioning is asynchronous), then flipped: final probe `curl https://artyhoo.github.io/getff-docs-smoke/` → **`404`**. Gate row 10 fully green |
| 11 | `beta.getff.ai` DNS state | `dig +short` → empty; `curl` → `000`. Never existed — no-op recorded |

## §5 T7 counter-prompt — «what would make this cutover look successful when it is not?»

Written before the census, each candidate probed:

- *Deploy green but serving the previous artifact* — refuted: the live sitemap is the
  new 20-URL set; `curl https://getff.ai/ \| grep -c "cargo-deny on the roadmap"` → 14;
  `npm install` present; `/docs/limits/` carries «Four stacks today».
- *`CNAME` dropped, apex broken while github.io looks fine* — refuted: apex `200`, and
  the artifact's `out/CNAME` was verified pre-merge (gate row 3).
- *Cached 200 for a page that 404s on a cold edge* — refuted: cache-buster refetches
  (`?cb=<epoch>`) → `200`.
- *Search hits from a stale index* — refuted: the live index returns the round-3+
  copy («`<…>` placeholder field») and the round-6 `/docs` page.
- *Draft absent from blog index but present in llms-full.txt* — refuted: 0 hits in all
  six surfaces including the search index.
- One real failure the counter-prompt class DID catch (via the census): the missing
  `/docs/` index — URL-parity assumed from the sitemap alone (T-BDS-B). Fixed as PR #6.

## Findings for the operator

**Framework-side defects surfaced by the audits (BS3 §4 forbids fixing them here —
each needs a framework-repo change):**

1. `packages/core/templates/shared/first-steps.source.json` — four stale texts: `-y`
   still tied to core depth (installer default raised to env 2026-08-18,
   `install.sh:645-650`); the fill-passport step's `<PLACEHOLDER>` token (the template
   ships `<PROJECT_NAME>`-style fields); the inverted `--refresh --profile env` warning
   (superseded by the #869/#1334 uniform gate); the `.prettierignore` «gains paths»
   exception (the managed block ships full-depth at core). The landing's renders now
   deviate deliberately, each documented in its provenance header.
2. `packages/core/templates/shared/AI-USAGE-GUIDE.md:195-196` (+ `DESCRIPTION.template.md:61`)
   — still tell consumers the pre-push hook runs typecheck/`vitest related`/
   dependency-cruiser; the consumer hook runs rule-globs/lint-staged-resolves/
   generated-rule-material (`pre-push.ts` `owner: consumer`), the trio are ci.yml jobs.
3. `packages/core/composition/demo/root-agents-demo.test.ts:145-146` — comment says the
   cargo live-fire is «gated on cargo present && !CI»; `firing.test.ts`'s own header
   (the live truth) says CI fires for real, no `!isCI` guard.
4. `.claude/skills/pipeline` — no «nothing queued» string exists anywhere; the SSOT's
   run-pipeline step quotes it (the landing reworded to the real zero-umbrellas
   rendering).
5. `packages/core/templates/shared/tier-home.md` §3 — two evidence cells cite
   pre-pointer-ization `CLAUDE.md:108/:130` line numbers that no longer resolve (the
   text lives in its own §2 now).
6. **Kickoff `Type:` vocabulary fork** — the consumer contract says `fix/research/feature`
   (`AI-USAGE-GUIDE.md:166`), the pipeline parser reads R-phase/execution-build/
   wiring/manual-liveness (`pipeline/SKILL.md:292`), the live maintainer corpus is
   free-form. The site follows the consumer contract.
7. **The landing has no parity mechanism for its vendored renders** (G11 class):
   three first-steps pages + the degradations matrix + the preset list are pinned
   copies with provenance headers and no regen check wired into `deploy.yml`. The
   earliest-reachable-channel fix (a re-derive script that fails the build on drift) is
   an operator decision; this stage only softened the claims («vendored at <pin>,
   re-vendor on upgrade»).

**Site-side note:** the `/docs/` index gap means BS2's preview census verified the
sitemap set but never the docs root — the kickoff's headline row was the only thing
that caught it.

**Deploy-pipeline note:** the deploy workflow on old `main` had been failing since
2026-08-17 (run 32054603966); production was serving a stale artifact for 3+ weeks. The
cutover branch's config (the one this stage validated locally before merging) runs
green.

## Parked questions

- **Visual sign-off (operator, by design — kickoff leg B step 6):** the site is live at
  **https://getff.ai** — docs root at **https://getff.ai/docs/**. Census 20/20, search
  live, llms.txt live. The palette ships as built (kickoff §2 decision 1: any palette
  change is a one-line follow-up, not a cutover blocker). The stage is not «declared
  done» until the operator has looked at it.
- **`npm publish getff`**: gated on this stage's outcome being GREEN (parent spec §8
  phase-2 gate) — now unblocked, but publication itself is phase-2 scope, not BS3.
- DNS record removal: **no-op** — `beta.getff.ai` never existed.
