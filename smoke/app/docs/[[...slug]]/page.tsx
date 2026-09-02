import { DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';

export function generateStaticParams() {
  return source.generateParams();
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
    <DocsPage tableOfContent={{ enabled: true }} full>
      <h1>{page.data.title}</h1>
      <p className="text-fd-muted-foreground mb-6">{page.data.description}</p>
      <div className="prose">
        <MDX />
      </div>
    </DocsPage>
  );
}
