import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mermaid';

/**
 * MDX component map for the docs body.
 *
 * Without this the MDX renders with bare HTML tags: code fences come out as a raw
 * `<pre class="shiki">` with no copy button and no language chrome, headings get no
 * anchor links, and the Card/Callout/Tabs components are simply unavailable to
 * content. `defaultMdxComponents` is what wires all of it — it is not decoration.
 *
 * The Quickstart pages are the reason this matters most: every step there is a
 * command the reader is meant to run, and a command you cannot copy is a step you
 * have to retype.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Build-time SVG renderer for ```mermaid fences (rewritten to
    // <Mermaid chart="…"/> by remarkMdxMermaid in source.config.ts — R6).
    // It throws on unsupported types and on silently-dropped syntax, which
    // fails the static-export build instead of publishing a broken diagram.
    Mermaid,
    ...components,
  };
}
