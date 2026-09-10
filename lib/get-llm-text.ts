import { source } from '@/lib/source';

/**
 * Render one page as Markdown for llms-full.txt / .md twins.
 * Requires `includeProcessedMarkdown: true` in source.config.ts.
 */
export async function getLLMText(page: (typeof source)['$inferPage']): Promise<string> {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
