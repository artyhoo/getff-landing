import { blogSlug, blogSource } from '@/lib/blog';
import { siteOrigin } from '@/lib/site';

/**
 * /rss.xml — ported from src/pages/rss.xml.js (T16: our code; Fumadocs ships
 * no blog module). Static export writes a real out/rss.xml file.
 */
export const dynamic = 'force-static';

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET() {
  const posts = blogSource
    .getPages()
    .filter((page) =>
      process.env.NODE_ENV === 'production' ? page.data.draft !== true : true,
    )
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts
    .map((post) => {
      const link = `${siteOrigin}/blog/${blogSlug(post)}/`;
      return [
        '    <item>',
        `      <title>${xmlEscape(post.data.title)}</title>`,
        `      <link>${xmlEscape(link)}</link>`,
        `      <guid>${xmlEscape(link)}</guid>`,
        `      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>`,
        `      <description>${xmlEscape(post.data.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>getff blog</title>
    <link>${siteOrigin}</link>
    <description>Notes on making conventions executable: enforcement gates, doc drift, and what it takes to keep an AGENTS.md honest.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
