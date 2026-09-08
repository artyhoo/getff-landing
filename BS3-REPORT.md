# BS3-REPORT — cutover stage, HALTED at leg A

**Stage:** `beta-docs-showcase` BS3 (cutover), per `.claude/orchestrator-prompts/beta-docs-showcase/kickoff-b3.md`
(merged to framework `staging` as PR #1670, `23f5fb882d`).
**Run:** 2026-09-08, host session, landing worktree at `bs3-cutover` (`ac3e7d1`, branched from
`origin/fumadocs-migration` @ `18e847b3`).

## Verdict

**BS3: HALTED — leg A returned STOP. The cutover did not happen and must not happen on this
branch state.** Per the kickoff's leg-A gate: `STOP → halt, report to the operator, do not merge.`

`main` of `artyhoo/getff-landing` is untouched at `b65ff4b5`. `getff.ai` still serves the old
Astro site. Nothing was deployed. The BS0 prototype was not torn down (leg C never opened).

## §1 entry re-verification — ten rows, all run

| # | Result |
|---|---|
| 1 | Landing clone `/Users/art/code/aif-handoff/projects/getff-landing` on `main` = `b65ff4b` ✅ (left on `main`; BS3 work done in an isolated worktree so the aif mount was never moved) |
| 2 | `origin/fumadocs-migration` = `18e847b3`, `origin/main` = `b65ff4b5`; `merge-base --is-ancestor` → FF-OK ✅ |
| 3 | `deploy.yml` delta confirmed: the branch's copy differs from `main`'s only in `path: ./dist` → `./out` ✅ |
| 4 | `next.config.mjs` carries `output: 'export'`, `trailingSlash: true`, `images.unoptimized`; build script `next build` ✅ |
| 5 | `public/CNAME` = `getff.ai` ✅ |
| 6 | `https://getff.ai/` → 200, `https://getff.ai/docs/` → 404 ✅ (unchanged — no cutover) |
| 7 | `https://beta.getff.ai` → 000 (does not resolve), `https://artyhoo.github.io/getff-docs-smoke/` → 200 ✅ |
| 8 | `agents/claims-conformance-auditor.md` present — the real agent was used, no substitute ✅ |
| 9 | `CLAIMS-LEDGER.md` = 86 rows, BS2 self-reported `0 non-conformant` ✅ (that self-report is what leg A falsified) |
| 10 | No PR has ever been opened against landing `main` ✅ (none opened by this stage either) |

## §2 deliverables — one landed, the rest blocked

**Landed (commit `ac3e7d1`):** the F5-4 panel copy fix the kickoff mandated before the audit.
`app/(site)/page.tsx:83` now reads «for cargo, the demo today is clippy, with cargo-deny on the
roadmap», matching the shape ledger row 79 already used for the blog. Ledger row 85 updated to
the shipped wording, `planned` label dropped, FINDING-L1 marked RESOLVED.

Production build verified locally (gate row 3): `npm ci` exit 0, `npm run build` exit 0,
`out/CNAME` = `getff.ai`, 22 static HTML pages, new copy present in `out/index.html`, and the
draft announcement (`getff-beta`) absent from `out/blog/index.html`, `out/rss.xml`,
`out/llms-full.txt` and `out/sitemap-0.xml` — 0 hits each.

**Blocked:** legs B and C. No merge, no deploy, no census, no teardown.

## Leg A — cold claims audit

Dispatched per protocol: the auditor received the doc surface only. It was explicitly denied
`BS1-REPORT.md`, `BS2-REPORT.md`, the kickoff, and everything under
`.claude/orchestrator-prompts/`. It had read access to the framework repo to verify claims.

**Verdict: STOP. 18 GAPs. Ledger coverage 86/167 claims = 51%; 81 claims across 10 surfaces have
no ledger row, and 9 of the 18 GAPs sit inside that uncovered half.**

Three failures each block publication on their own:

1. **The site states three different stack counts.** `content/docs/limits.md:12` — the page
   titled "Honest limits" — says «Two stacks today» and «Python, Go … are not in the box … getff
   has nothing to install for you today». `content/docs/what-is-getff.md:18` says three. Four
   lanes actually ship. The site also carries a full `quickstart-python.md`, so it contradicts
   itself on its own surface.
2. **`executable-agents-md` — the page whose entire purpose is «follow any enforcement line to
   its test» — has nine citations that do not resolve**, including a rule count off by nine and a
   «live-fired» claim the cited test explicitly disclaims.
3. **F5-4 is breached in the `<meta description>`, `og:`/`twitter:` tags, the structured data and
   `llms.txt`** — the four places a wrong claim propagates furthest and is hardest to retract.

Plus: three "vendored render" pages have drifted from their framework source and the site repo
has no mechanism that would catch that; the hero's copy-paste block promises green from two
commands that cannot produce it on a fresh clone.

## Independent re-verification of the audit (this session, not delegated)

A subagent verdict is not evidence on its own. Three of the heaviest findings were re-run here:

- **G6 (stack count):** `ls setup.d/4*.sh` → `45-python.sh`, `46-cargo.sh`, `47-go.sh`;
  `install.sh:163-169` accepts `python | cargo | go` as positional lanes. Four lanes ship.
  `limits.md:17` says Python and Go are «not in the box». **CONFIRMED.**
- **G4 (broken citations):** the site cites `AGENTS.md:76` for the `std::env::var` claim;
  `sed -n '76p' AGENTS.md` → `## Configuration access` (a heading). The claim is at `:83`,
  exactly where the auditor placed it. Site says the rule index holds «20 rules»;
  `awk '/getff:begin section=rule-index/,/getff:end/' AGENTS.md | grep -c '^| \`'` → **29**.
  **CONFIRMED.**
- **G8 (stale preset render):** the site renders `aif — … marker=Claude Opus (plan+review)` and
  `economy — … marker=Z.AI GLM-5.2 SDK`. The live preset enumeration in this session's own
  `/pipeline` run emits `aif — … (mode=autonomous)` with **no** marker and `economy — …
  marker=Z.AI GLM-5.3 SDK`; the markers were repointed by #1608 (`164cfed919`) after the ledger's
  pin. **CONFIRMED.**

## Calibration — sealed prediction vs. blind audit

Before dispatching, this session sealed a written prediction (scratchpad `bs3-prediction.md`)
that the audit would surface an F5-4 class the ledger does not cover, naming seven specific
`file:line` sites, and flagged three of them as genuinely uncertain judgment calls.

The audit found that class independently (G1, G2, G3, G6, G7, G18 and the consulting-page
instance) — and went considerably further, into a defect class this session had not predicted at
all: unresolvable evidence citations and drifted vendored renders. The mechanism works, and it
outperformed the host session that dispatched it. That is the argument for the cold gate existing.

## Findings for the operator

**DECISION-NEEDED (raised by the auditor, not resolved by it or by this session): the stack-count
fork.** G6/G7 close either by widening the limits copy to the four shipped lanes, or by narrowing
the site's Python/Rust claims to two. Both make the site self-consistent; they imply different
beta scopes. `limits.md` and `page.tsx` are BS1-kept copy the ledger deliberately left unowned.

**Structural finding (`attention-is-not-a-mechanism.md §1`):** G8/G9/G10 are one shape — a
vendored copy of a framework file carrying a provenance header and no regen check. The provenance
header is honest about its pin but does not make a stale install instruction correct for a
consumer installing from HEAD. If the vendored-render pattern is kept, the earliest reachable
channel is a script in the site repo that re-derives each render from a pinned framework checkout
and fails the build on drift, wired into `deploy.yml` before `next build`. A one-shot manual
parity run at authoring time is `#hope-as-gate`.

**Ledger scope finding:** BS2's ledger covered the pages BS2 authored, not the shipped surface.
BS1-era landing copy and BS1-ported docs pages were never claim-ledgered, and that is where 9 of
the 18 GAPs live. Whatever closes the GAPs should also decide whether the ledger's scope becomes
the whole surface — otherwise the next cutover attempt inherits the same blind spot.

## Parked questions

- **Cutover GO / visual sign-off / DNS** — never reached. Leg A stopped the stage before leg B.
- The two questions BS2 carried forward were resolved in the kickoff (palette ships as built;
  panel copy reworded to F5-4 — done, `ac3e7d1`).

## State left behind

- Landing `main`: untouched, `b65ff4b5`. No PR opened. Nothing deployed.
- Branch `bs3-cutover` @ `ac3e7d1` in an isolated worktree: carries the panel fix + ledger
  update + this report. **Not pushed** — pushing is a decision for whoever picks up the GAP work.
- `origin/fumadocs-migration` unchanged at `18e847b3`.
- BS0 prototype still live at `artyhoo.github.io/getff-docs-smoke` (teardown is leg C).
- The umbrella has no `done.md` and must not get one: `done.md` lands at BS3 merge, and BS3 did
  not merge.
