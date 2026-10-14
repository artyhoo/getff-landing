# Eight-page publication preparation

This is a bounded additive publication, not the full S2 destructive cutover. The existing Fumadocs loader still supplies HTML, Markdown copies, LLM text, search and sitemap from one collection.

`scripts/prepare-framework-docs.mjs` validates the literal framework pin against the fetched SHA, copies all legacy docs and overlays exactly the eight paths in `framework-publication.json`. It strips framework-only metadata for Fumadocs but preserves each authoritative Markdown body. Unpublished relative documentation links point to immutable GitHub source; links between the eight published pages point to local HTML. Existing legacy sources are unchanged except the old generic index is replaced in the generated collection. No unfinished family is published.

Run the same source preparation before npm ci in both PR and deploy:
```sh
node scripts/fetch-framework.mjs
node scripts/prepare-framework-docs.mjs
npm ci
node --test tests/framework-publication.test.mjs
node scripts/check-pin-json.mjs
npm run build
node scripts/write-redirect-stubs.mjs
node scripts/check-publication.mjs
node scripts/check-redirects.mjs --framework-full .framework-full
node scripts/check-links.mjs
```
The full-surface checkout must use the same resolved SHA, as already wired in the workflows. PR checks also retain the Mermaid integration/negative build and the existing gate self tests.

Production's fetch adds `--require-main`: it rejects a literal preview pin until it equals the current remote framework main SHA. PR checks can preview the specifically admitted staged source. A release requires actual framework promotion, the literal pin rebound to that admitted promoted main SHA, renewed affected checks and exact Root source/effect acceptance. This preparation changes no settings, secrets, domains, permissions, framework checkout or runtime.

Merging the admitted landing PR to main triggers the existing deploy.yml push-main workflow, whose build exports out/ and deploy job uses actions/deploy-pages. A manual workflow_dispatch uses the same source gate. Framework repository_dispatch notifications are not handled here and do not publish content. No new observer, service, schedule or branch pin is introduced.

Expected public pages:
- https://getff.ai/docs/
- https://getff.ai/docs/why/
- https://getff.ai/docs/how-it-works/
- https://getff.ai/docs/installation/
- https://getff.ai/docs/quick-start/
- https://getff.ai/docs/ai-agents/
- https://getff.ai/docs/reference/B/
- https://getff.ai/docs/reference/D/inject-matching-rule/

Final acceptance must verify the successful deploy at the admitted source and these real public contents, including Markdown, search, sitemap and any intentional redirects. A green preview does not establish public deployment, complete S1/S2, or the default full-site manifest/quality debt.
