import type { Metadata } from 'next';
import { blogSlug, blogSource } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on making conventions executable: enforcement gates, doc drift, and what it takes to keep an AGENTS.md honest.',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndexPage() {
  const allPosts = blogSource.getPages().filter((page) => {
    // Dev keeps drafts visible; production filters them (ported from the
    // Astro getCollection predicate).
    return process.env.NODE_ENV === 'production' ? page.data.draft !== true : true;
  });
  const posts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return (
    <div className="wrap">
      <header className="hero" style={{ textAlign: 'left', paddingTop: 'var(--space-m)' }}>
        <h1 style={{ fontSize: 'var(--step-2)' }}>Blog</h1>
      </header>

      {posts.length === 0 && (
        <p className="fineprint" style={{ marginInline: 0 }}>
          No posts published yet. <a href="/">Subscribe on the homepage</a> to hear when the first one ships.
        </p>
      )}

      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.url}>
            <h2><a href={`/blog/${blogSlug(post)}/`}>{post.data.title}</a></h2>
            <time dateTime={post.data.pubDate.toISOString()}>
              {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <p>{post.data.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
