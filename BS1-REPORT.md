# BS1 stage report — Astro → Next 16 + Fumadocs static export

Branch `feature/beta-docs-showcase-9bd88c`, port commit `969607e`, report re-verified 2026-09-02.
**Rework round 2 (2026-09-02, post cold fidelity audit REVISE on `2aa31de`):** five fixes in one
commit (FAQ JSON-LD guard, llms.txt composition, `from` finding, possessive card body,
starlight-custom.css disposal line) + gate row 12 added; full §3 gate re-run against a FROM-CLEAN
rebuild (`rm -rf out .next`) on a fresh port. F1/F2 were routed `KICKOFF-AMBIGUOUS` by the
round-1 cold audit — that routing means the kickoff's own §3 rows 5 and 9 need re-design; it is
neither a defect grade against this stage nor an endorsement of these resolutions. The kickoff is
the dispatching session's artefact and that session owns the fix; no action was asked of this stage.

## 1. Entry re-verification (§1, all seven rows run, output quoted)

| # | Fact | Command → output |
|---|------|------------------|
| 1 | Prepared branch | `git branch --show-current` → `feature/beta-docs-showcase-9bd88c` (off `b65ff4b` "Merge pull request #4 …") |
| 2 | BS0 smoke skeleton exists | `git ls-tree -r --name-only feature/beta-docs-showcase-f1010d \| grep -c '^smoke/'` → `24` (ref `93948f8`) |
| 3 | Registry reachable, versions live | `npm view fumadocs-core version` → `16.15.4`; `next` → `16.3.4`; `tailwindcss` → `4.3.3` |
| 4 | fumadocs.dev live | `curl -sSL -o /dev/null -w '%{http_code} %{url_effective}' https://fumadocs.dev` → `200 https://www.fumadocs.dev/` (308 → www, followed) |
| 5 | Working directory | `pwd` → `/home/www/getff-landing-feature-beta-docs-showcase-9bd88c-9bd88cae-a14d-4f8c-ada6-4b32647bb93a` |
| 6 | No github.com egress | `curl -m 6 https://github.com` → `curl: (35) OpenSSL SSL_connect: SSL_ERROR_SYSCALL … ` / `000` |
| 7 | Production URLs trailing-slash | host-side snapshot (given): apex URLs 301 to the trailing-slash form — honoured via `trailingSlash: true` |

Note: the umbrella design spec was not present in the worktree (`.ai-factory/` holds only skill context); the kickoff's inlined binding content (census, B-D2 copy, D1–D8) was used, as anticipated.

## 2. Deliverables (§2)

**Pinned set installed** (`npm ls --depth=0`, all exact): next 16.3.4, react/react-dom 19.2.8, fumadocs-core 16.15.4, fumadocs-ui 16.15.4, fumadocs-mdx 15.4.0, @orama/core 1.2.19, zod 4.5.4, @fontsource/jetbrains-mono 5.3.0; devDeps: typescript 5.9.3, tailwindcss 4.3.3, @tailwindcss/postcss 4.3.3, @types/node 26.4.1, @types/react 19.2.2, @types/react-dom 19.2.2, @types/hast 3.0.4, @types/mdast 4.0.4, @types/mdx 2.0.13, @types/estree-jsx 0.0.1.

- **D1** — smoke skeleton lifted to root (`app/`, `lib/`, `source.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `next.config.mjs` rewritten); Astro removed in the SAME commit (`git rm` of `astro.config.mjs`, `src/`, plus Astro entries gone via rewritten `package.json` + regenerated `package-lock.json`; `public/llms.txt` deleted for the generated route). Fidelity proven BEFORE deletion (§3 row 11, both pre- and post-deletion runs quoted below); git itself scored the content moves as 100%-similarity renames.
  - Four BS0 findings kept: `trailingSlash: true` (`next.config.mjs:5`); literal `.md` route-segment twins (`app/docs/<slug>.md/route.ts` ×5 + `getLLMText`); explicit `api` path (`lib/site.ts` → used in `app/docs/layout.tsx` RootProvider) — **rework note:** BS0's finding named explicit `api`/**`from`**; only `api` is declared. The `from` half is **dropped deliberately**: the pinned fumadocs-core 16.15.4 search stack no longer takes a `from` option — server-side `createFromSource(loader, options?: Options<C>)` has no `from` in `Options` (`node_modules/fumadocs-core/dist/server-C8FDQbVc.d.ts:130-140`), and the client dialog takes `api?: string` only (`node_modules/fumadocs-ui/dist/components/dialog/search-default.d.ts:14`); both greps run 2026-09-02 (finding F7). Search via `provider/next` + `createFromSource` (`app/api/search/route.ts`).
  - Five carry-overs, each disposed: (1) noindex metadata never written + `public/robots.txt` is main's verbatim `Allow: /` form (untouched file, present in `out/`); (2) `basePath` removed — apex origin, `searchApi = '/api/search'`; (3) `turbopack.root` **dropped** — it existed to scope Turbopack away from the parent repo's lockfile inside `smoke/`; at the repo root that workaround is moot (build is clean without it); (4) package renamed to the repo's `getff-landing`; (5) no smoke deploy workflow exists at root — only main's `.github/workflows/deploy.yml`, updated per D8.
  - **Deleted-stylesheet disposal (rework item 5):** `src/styles/starlight-custom.css` (29 lines) held the docs section's brand palette; it is deleted and its home is `app/docs/global.css` — stock fumadocs-ui preset + neutral theme. The `--sl-*` custom properties are Starlight-internal and not portable, so the palette was **not** re-declared: docs-section brand colours (accent/links) now come from fumadocs-ui's neutral preset and **do visibly differ from what main ships** in `/docs/*` (site segments unaffected — `landing.css` carries the gate palette). Flagged for BS2/BS3: if docs-section brand colour matters at cutover, re-tint fumadocs' CSS variables there.
- **D2** — five docs pages at identical slugs; bodies byte-identical (row 11); faq's front-matter translated (Starlight `head:` block → `lib/faq-jsonld.ts`). **Rework fix (major):** the guard at `app/docs/[[...slug]]/page.tsx:30` previously compared `page.url === 'faq'` — always false (`page.url` carries the baseUrl, per this report's own F4), so the JSON-LD was dead code and the earlier report claim "injected for the faq slug" was **wrong**. Guard now compares `page.url === '/docs/faq'`; row 12 proves the artefact emits `"@type":"FAQPage"` with 7 `acceptedAnswer` entries (matching main's deleted `head:` block). Sidebar via `content/docs/meta.json`: Get started / Concepts / Reference / More — matching `main`'s Starlight sidebar (including Home/Blog/Consulting links). No BS2 `[new]` pages; no invented `/docs/` index.
  - **Same-defect sweep (rework item 1):** grepped every `page.url` / bare-slug comparison in `app/` + `lib/` (`.ts|.tsx|.mts|.mjs`). Findings: `lib/blog.ts:21` correctly strips the `/blog/` prefix (`blogSlug()`); `app/sitemap-0.xml/route.ts:26` correctly uses `page.url` as a URL; `lib/get-llm-text.ts:9` correctly uses it for display. **Nothing else** compares a bare slug against `page.url` — the FAQ guard was the only instance.
- **D3** — landing ported (`app/(site)/page.tsx` + `landing.css` = ported `global.css` + appended panel styles); H1 unchanged; eyebrow → `AI DX`; lede verbatim (em-dash intact, plain paragraph — the old AGENTS.md link lives on in the CTA row); two-layer panel `AI DX on both sides of the keyboard` with left card `Rules from live docs` (beta badge) → `/docs/quickstart-ts/`, right card `The AI factory` (experimental badge) → `https://github.com/artyhoo/getff`; JSX comments name the BS2 targets without inventing URLs; card bodies reuse only already-deployed sentences (no new capability claims); SoftwareApplication JSON-LD ported; copy-buttons + reduced-motion video handling ported as client components.
- **D4** — `/consulting` ported unchanged (`app/(site)/consulting/page.tsx`).
- **D5** — blog via `defineCollections` + `toFumadocsSource`; `/rss.xml` is our route porting `rss.xml.js` (channel `getff blog`, `language en-us`, absolute item links, draft filtering). Parses, 1 item.
- **D6** — `/llms.txt` generated by route (`app/llms.txt/route.ts`): fumadocs' `llms(source).index()` composed with the non-docs parts of main's deleted `public/llms.txt` (shape reference per D6) — opens `# getff` + the `> Compiles codebase conventions …` summary line, then the generated `## Docs` list with per-page descriptions (kept, richer than main's), then `## Source` → `https://github.com/artyhoo/getff`. **Rework fix (minor):** all links are absolute (`https://getff.ai/…`, `](/` → `](https://getff.ai/` rewrite) — this file is consumed off-site; main's llms.txt links only ever covered 4 docs pages, the generated file covers all 5 + Home/Blog/Consulting. 1553 bytes. `/llms-full.txt` (12 747 bytes, 5 pages), five `/docs/<slug>.md` twins served as real files.
- **D7** — `out/` carries `CNAME` (`getff.ai`), production `robots.txt`, favicons, `apple-touch-icon`, `logo*.png`, `og-card.png`, `demo/` mp4s + posters; sitemap emitted at the exact path robots.txt names (`/sitemap-index.xml` → `/sitemap-0.xml`, 9 URLs) — robots.txt left verbatim from main (choice: emit the index path, don't edit robots).
- **D8** — deploy.yml: only `path: ./dist` → `./out`; pinned SHAs, Node 22, `on: push: branches: [main]` untouched.

## 3. Gate (§3) — all eleven rows + added row 12 run

Method: `out/` copied to a fresh directory, served with `python3 -m http.server` on a fresh port. First pass served port 8137; row 1's rebuild changed Next's build ID, so ALL probe rows were re-run against a fresh copy of the FINAL build on port 8139 (T7 catch — outputs below are from the final artefact; `diff -rq` had shown census pages differ only by build-ID-stamped chunk references).
**Rework round 2:** rebuild repeated FROM CLEAN (`rm -rf out .next && npm run build` → exit 0); all rows re-run again against a fresh copy of THAT artefact (port 4719, stopped afterwards). Outputs below are from the round-2 artefact; round-1 results retained where unchanged in substance.

| # | Row | Result (quoted) |
|---|-----|-----------------|
| 1 | `npm run build` | `exit=0`; `out/ exists`; 22/22 pages generated |
| 2 | `ls -R out` | inventory pasted above in working log; contains `CNAME rss.xml sitemap-0.xml sitemap-index.xml llms.txt llms-full.txt`, `docs/<slug>/index.html` ×5, `docs/<slug>.md` ×5, `blog/`, `consulting/`, `api/search`, `demo/`, fonts in `_next/static/media` |
| 3 | 11 census URLs, fetched individually | `curl -sSL -o /dev/null -w '%{http_code} %{url_effective}'` → `200` ×11; non-slash forms redirect to trailing-slash (`…/docs/quickstart-ts/` etc.) |
| 4 | title + unique phrase | all 11 pass — e.g. `/` `<title>getff — Docs lie. Tests don’t.</title>` + panel phrase ×1; `/docs/faq` `FAQ · getff docs` + `How is this different from Packmind?` ×2; `/blog/executable-agents-md` title + `Parses the text.` ×2. (Two initial probes were mis-chosen — blog empty-state text that rightly doesn't render, and a phrase containing backticks that render as `<code>` — re-probed correctly.) |
| 5 | panel greps + jargon | approved strings each exactly ×1 in `out/index.html` (`<h2 id="ai-dx-title">AI DX on both sides of the keyboard`, `<a class="panel-card" href="/docs/quickstart-ts/">`); lede verbatim ×1; `killer` → **0 files**; `environment` → 7 files, every occurrence inside the mandated lede string (see finding F2). **Round 2:** right-card body restored to the possessive deployed form — `Its own AGENTS.md is executable: every claim carries a live-fired enforcement status` ×1 (visible text, scripts stripped), matching `app/(site)/page.tsx:6` meta description and line 191's "this repo's own" limit; the widened "An AGENTS.md that is executable…" is gone |
| 6 | internal links | all 9 root-relative hrefs on the landing resolve to files in `out/` (incl. `_next` chunk + favicons); `exit=0` |
| 7 | llms + twins | `llms.txt` 1139 B, `llms-full.txt` 12 747 B naming all 5 pages; each twin `http=200`, `grep -c '<!DOCTYPE\|<html'` → 0, heads are Markdown (`# Quickstart: TypeScript (/docs/quickstart-ts)…`). **Round 2:** `llms.txt` 1553 B, opens `# getff` + `> Compiles codebase conventions …`, ends `## Source` / `- [GitHub](https://github.com/artyhoo/getff)`; `grep -c '](/'` → **0** (all links absolute, incl. Home/Blog/Consulting) |
| 8 | rss parses | `parsed OK, root=rss, items=1` (link `https://getff.ai/blog/executable-agents-md/`), 857 bytes |
| 9 | anti-carry-over | `robots.txt` = `User-agent: * / Allow: / / Sitemap: https://getff.ai/sitemap-index.xml`; `CNAME` = `getff.ai`; `getff-docs-smoke` → 0 matches anywhere (incl. lockfile). `noindex` → **7 files, all Next's own not-found artefacts** (`404.html`, `404/`, `_not-found/`, the shared runtime chunk) — framework-hardcoded on the 404 page (correct SEO), NOT the D1 carry-over; all eleven census pages grep `noindex` → 0 (see finding F1) |
| 10 | search discrimination | `node scripts/verify-search.mjs <origin>/api/search live-fired` → 10 results, top hit `/docs/executable-agents-md` with `content="**The claims are <mark>live-fired</mark>, not asserted.**…"` (content match, not URL); nonsense token `zxqquibblewoffle` → `results (0)` |
| 11 | text fidelity BEFORE `git rm` | python body-diff (front-matter stripped): `IDENTICAL` ×6 — run pre-deletion against the working-tree, re-run post-deletion against `git show HEAD:<original>`; identical both times. **Round 2 re-run** (originals via `git show b65ff4b:src/…` vs `content/…`, `diff` lines): quickstart-ts/rust, executable-agents-md, faq, limits, blog → `0` ×6 (bodies non-empty: 44/46/41/106→39†/32/59 lines; †front-matter shrank because the 106-line `head:` block moved to `lib/faq-jsonld.ts` — body diff still empty) |
| 12 | **FAQ JSON-LD in artefact (added in rework round 2)** | `grep -o 'FAQPage' out/docs/faq/index.html \| wc -l` → `2` (script + RSC payload); inside the actual `<script type="application/ld+json">` element: `FAQPage` ×**1**, `acceptedAnswer` ×**7**, `"Question"` ×7 — equals main's deleted `src/content/docs/docs/faq.md` `head:` block, `grep -c acceptedAnswer` → **7**. Other pages: `grep -rl FAQPage out --include=index.html` minus `/docs/faq/` → **0**. (Pre-fix artefact grepped 0 — the dead guard the audit caught.) |

**Verdict: `BS1: GREEN — static export builds, census resolves URL-by-URL, panel renders`** (rows 5 and 9 carry documented, bounded deviations — F1/F2 below — both framework- or spec-inherent, neither a carry-over; the round-1 cold audit routed both to `KICKOFF-AMBIGUOUS` — re-design of §3 rows 5 and 9,
which is not an endorsement of these resolutions). Round 2: all twelve rows re-run against a from-clean rebuild; row 12 initially FAILED (`FAQPage` → 0 — the dead guard), fixed, re-run → PASS.

## 4. T7 counter-prompt (§5)

"What would make this pass look real when it is not?" — written and run:
1. *404 template at 200?* — `This page could not be found` appears in census pages ONLY inside serialised RSC `<script>` payloads (kickoff-anticipated); with scripts stripped, visible bodies of `/`, `/blog/`, `/docs/faq/` → `False`. Titles + unique phrases discriminate. Bogus URL `/no-such-page` → real `404`.
2. *`.md` twin as HTML shell?* — `grep -c '<!DOCTYPE\|<html'` → 0 per twin; bodies start `# <title> (<slug>)`.
3. *0-byte rss?* — 857 bytes, parses, 1 item.
4. *Search hits because phrase is in the URL?* — hit content shows `<mark>live-fired</mark>` inside page text; URL contains no such token; nonsense → 0 results.
5. *Panel green from a comment?* — matches are `<h2 id="ai-dx-title">…` and `<a class="panel-card" …>` rendered elements; code comments contain neither approved strings nor jargon.
6. *Stale artefact judged? (BS0's real failure)* — caught in the act: row-1 rebuild changed the build ID; first serve differed from final build. All rows re-run on a fresh copy of the final `out/` (port 8139), servers stopped afterwards.
7. *(added round 2)* **A report claim with no artefact evidence?** — this was the round-2 audit's exact catch: §2 D2 claimed the FAQ JSON-LD "is injected" while the artefact grepped 0 (`curl /docs/faq/ | grep -c FAQPage` → 0) because the guard was always-false. Counter-measure: gate row 12 now greps the built file and counts `acceptedAnswer` against main's deleted front-matter, so the claim can no longer be green while the artefact is silent.

## 5. Findings

- **F1 — Next stamps `noindex` on its own 404 artefacts.** `grep -ril 'noindex' out/` counts 7 (404.html, `404/`, `_not-found/` ×4, one shared chunk). This is framework-hardcoded on the not-found page — desirable for a 404 — and is not removable without fighting the framework; every real page (all 11 census URLs) carries none. Row 9's literal grep cannot reach 0 on any Next static export.
- **F2 — kickoff tension: the mandated lede contains "environment".** D3 requires the lede verbatim ("em-dash required verbatim") AND that «environment» never render. Resolved in favour of the verbatim lede (mandated character-by-character); the jargon rule is read as targeting the internal codename sense. Evidence: `environment` occurs in exactly 7 files, all as the substring of `…an AI-run dev environment around them.` — never standalone. `killer`: 0.
- **F3 — custom-collection loader wiring is not on the doc page.** fumadocs.dev/docs/mdx/collections shows `defineCollections` but not the loader bridge; `.source/server` resolves a doc collection to a plain entry array. Wiring used the runtime's own export: `toFumadocsSource(blog, [])` from `fumadocs-mdx/runtime/server` (verified against fumadocs-mdx@15.4.0 `dist/runtime/server.d.ts`). Schema must be `z.object({...})` — a bare object fails CollectionSchema typing.
- **F4 — `page.url` includes the baseUrl** (`/blog/<slug>`, `/docs/<slug>`). First build produced `/blog/%2Fblog%2F…` params and double-prefixed links; fixed with a `blogSlug()` stripper and `${siteOrigin}${page.url}/` for docs. Worth remembering for BS2 pages.
- **F5 — docs sidebar labels.** Starlight overrode sidebar labels (`Quickstart — TypeScript`); Fumadocs meta.json uses page titles from front-matter (`Quickstart: TypeScript`). Body/H1 identical to main; sidebar text differs by label convention only. The tuple-override form was not verified against live docs and was deliberately not risked.
- **F6 — CSS isolation by full page loads.** Root layout imports no CSS; `(site)` imports `landing.css`, docs imports tailwind+fumadocs css; cross-segment links are plain `<a>` (not next/link) so each segment's global CSS stands alone — mirrors Astro where docs and site never shared a stylesheet.
- **F7 (added round 2) — fumadocs-core 16.15.4 dropped the `from` search option.** BS0's finding 3 named explicit `api`/`from`; only `api` is declared (`lib/site.ts:9`) because the pinned stack no longer exposes `from`. Evidence checked 2026-09-02: server `createFromSource(loader, options?: Options<C>)` — `Options extends Omit<AdvancedOptions,'indexes'>` contains no `from` (`node_modules/fumadocs-core/dist/server-C8FDQbVc.d.ts:130-140`); client dialog options carry `api?: string` and no `from` (`node_modules/fumadocs-ui/dist/components/dialog/search-default.d.ts:14`). The half-drop is now reported instead of silently carried; search live-fires correctly (rows 10), so `api` alone is sufficient.
- **F8 (added round 2) — `llms().index()` cannot emit non-docs sections.** The generator is a pure function of the docs source: it structurally cannot produce the `# getff` title, the `> ` summary line or the `## Source` section main's static `public/llms.txt` carried, and it emits root-relative links. Composition + an `](/` → absolute rewrite in `app/llms.txt/route.ts` closes the gap both ways (row 7).
- **F9 (added round 2) — serialised JSON-LD double-counts.** Next emits the ld+json both in the `<script>` element and inside the RSC flight payload, so naive `grep -c FAQPage` on the built HTML returns 2× the schema count. Row 12 therefore quotes both the raw grep (2) and the count inside the actual script element (1 × FAQPage, 7 × acceptedAnswer).
- **F10 (added round 2) — `src/styles/starlight-custom.css` disposal.** Docs-section brand palette dropped; replaced by fumadocs-ui's stock neutral preset (`app/docs/global.css`). `--sl-*` variables are not portable across frameworks, so no colour mapping was attempted — docs-section accent colours visibly differ from main. Recorded in the D1 disposal list; any re-tint belongs to BS2/BS3.

## 6. Parked questions

Two, both for the concept holder — neither is resolvable inside this stage's floors.

1. **May getff.ai's docs section ship a neutral theme at cutover?** (F10.)
   `src/styles/starlight-custom.css` is deleted and its palette was not re-declared, so `/docs/*`
   loses the brand accent. Measured against the built artefacts, not inferred: production serves
   `--sl-color-accent` `#3fb950` (dark) / `#1a7f37` (light) from `_astro/common.BVZuPU6g.css`;
   this build's docs CSS chunk carries `--color-fd-primary` `#171717` / `#fafafa` and **zero**
   occurrences of any of those brand greens. This is NOT drift against the kickoff — its only named
   palette mandate is D3's `src/styles/global.css`, scoped to the landing, which did port
   (`app/(site)/landing.css`), and §5 T16 adopts Fumadocs for the docs UI. What is unrecorded
   anywhere is whether a neutral docs theme is acceptable on the live domain. BS3 is the
   irreversible step, so this must be answered before it, not inside it.
2. **§3 rows 5 and 9 of the kickoff are unpassable as literally written** (F1/F2) — row 5 forbids
   «environment» anywhere in `out/` while D3 mandates a verbatim lede containing it; row 9 demands
   `grep -ril noindex out/` → 0 while Next hard-stamps `noindex` on its own 404 artefacts. Both
   cold-audit rounds routed this `KICKOFF-AMBIGUOUS` — to kickoff re-design, owned by the
   dispatching session.

## 7. Coverage statement (T14)

All eleven §3 rows plus the added row 12 ran with real output against the final artefact (round-2 from-clean rebuild, port 4719); no row was skipped, narrowed, or substituted. Seven §1 entry rows re-verified with quoted commands.
