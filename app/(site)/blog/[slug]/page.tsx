import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogSlug, blogSource } from '@/lib/blog';

export function generateStaticParams() {
  return blogSource
    .getPages()
    .filter((page) =>
      // Dev keeps drafts visible; production filters them (ported from the
      // Astro getCollection predicate).
      process.env.NODE_ENV === 'production' ? page.data.draft !== true : true,
    )
    .map((page) => ({ slug: blogSlug(page) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) notFound();
  return {
    title: { absolute: `${post.data.title} — getff blog` },
    description: post.data.description,
    alternates: { canonical: `/blog/${blogSlug(post)}/` },
    openGraph: { type: 'article' },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) notFound();

  const MDX = post.data.body;

  return (
    <div className="wrap">
      <article className="post">
        <h1>{post.data.title}</h1>
        <p className="meta">
          <time dateTime={post.data.pubDate.toISOString()}>
            {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          {post.data.draft && ' · draft — not yet public'}
        </p>
        <MDX />
      </article>
    </div>
  );
}
