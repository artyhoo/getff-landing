import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

export const docs = defineDocs({
  docs: {
    // Required for getLLMText(): exposes processed Markdown per page
    // (fumadocs.dev/docs/integrations/llms).
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    canonicalUrl: z.string().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // Function form so the fumadocs preset's own remark plugins are preserved
    // and the mermaid fence rewrite runs after them (R6). `remarkMdxMermaid`
    // rewrites ```mermaid fences into <Mermaid chart="…"/> nodes, which the
    // component map below resolves to the build-time SVG server component.
    remarkPlugins: (plugins) => [...plugins, remarkMdxMermaid],
  },
});
