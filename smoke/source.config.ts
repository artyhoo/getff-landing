import { defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  docs: {
    // Required for getLLMText(): exposes processed Markdown per page
    // (fumadocs.dev/docs/integrations/llms).
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
