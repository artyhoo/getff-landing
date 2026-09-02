import { llms } from 'fumadocs-core/source';
import { source } from '@/lib/source';
import { siteOrigin } from '@/lib/site';

/**
 * D4: llms.txt index generated from the actual page tree
 * (fumadocs.dev/docs/integrations/llms). Static export writes out/llms.txt.
 *
 * llms().index() only knows the docs tree, so the title, the `> ` project
 * summary line and the `## Source` section of main's deleted public/llms.txt
 * (shape reference per D6) are composed around the generated `## Docs` list.
 * Links are made absolute: this file is consumed off-site.
 */
export const dynamic = 'force-static';

export function GET() {
  const generated = llms(source)
    .index()
    .replaceAll('](/', `](${siteOrigin}/`);
  const body = [
    '# getff',
    '> Compiles codebase conventions into native toolchain gates (ESLint/husky, clippy/cargo-deny). Deterministic, local-first, $0 LLM in CI. Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.',
    generated,
    '## Source',
    '- [GitHub](https://github.com/artyhoo/getff)',
  ].join('\n');
  return new Response(body);
}
