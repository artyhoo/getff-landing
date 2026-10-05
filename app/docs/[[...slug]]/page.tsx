import { DocsBody, DocsDescription, DocsPage, DocsTitle, MarkdownCopyButton } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { faqJsonLd } from '@/lib/faq-jsonld';
import { getMDXComponents } from '@/mdx-components';

export function generateStaticParams() {
  return source.generateParams();
}

/**
 * URL of the page's raw-Markdown twin (D10). The hub page (`/docs`, from
 * content/docs/index.md) is the ONE page whose twin did not exist — the
 * literal route app/docs/index.md/route.ts was added in the same change, so
 * every page carrying the copy action has a twin (the D10 falsifier: a
 * missing twin 404s the copy button).
 */
function markdownUrlFor(url: string): string {
  return url === '/docs' ? '/docs/index.md' : `${url}.md`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      // The page tree's own headings. Without this the TOC renders empty — the
      // pre-existing defect: the built pages carried zero in-page anchors.
      toc={page.data.toc}
      // 'clerk' is the typed variant that shows reading progress against the
      // headings, not a plain list (fumadocs-ui/layouts/docs/page/slots/toc TOCProps).
      tableOfContent={{ style: 'clerk' }}
      // No breadcrumb prop on purpose: the docs tree is flat (five pages grouped by
      // meta.json separators, no folders), so a breadcrumb has no path to render and
      // would only repeat what the sidebar already shows.
      // Prev/next between sibling pages, driven by the same meta.json order as
      // the sidebar.
      footer={{ enabled: true }}
    >
      {/* FAQPage JSON-LD — ported from faq.md's Starlight `head:` front-matter.
          page.url carries the baseUrl: '/docs/faq', not 'faq'. */}
      {page.url === '/docs/faq' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {/* D10 page actions: the copy button fetches the page's raw-Markdown
          twin — every page rendered by this template has one (195 existing
          twins + the hub twin added with this change). */}
      <div className="flex flex-row gap-2 items-center border-b pb-2">
        <MarkdownCopyButton markdownUrl={markdownUrlFor(page.url)} />
      </div>
      {/* DocsBody, not a bare .prose div: it is what gives headings their anchor
          links and wires the MDX components (callouts, code blocks, tabs). */}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
