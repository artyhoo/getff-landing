import { blogSlug, blogSource } from '@/lib/blog';
import { source } from '@/lib/source';
import { siteOrigin } from '@/lib/site';

/**
 * /sitemap-0.xml — every exported HTML page: landing, consulting, blog
 * (incl. posts), and the five docs pages (T16: our code, no sitemap dep).
 */
export const dynamic = 'force-static';

export function GET() {
  const urls: string[] = [
    `${siteOrigin}/`,
    `${siteOrigin}/consulting/`,
    `${siteOrigin}/blog/`,
  ];

  for (const post of blogSource.getPages()) {
    if (process.env.NODE_ENV === 'production' && post.data.draft === true) continue;
    urls.push(`${siteOrigin}/blog/${blogSlug(post)}/`);
  }

  // Docs pages are enumerated from the source at build time; page.url
  // already carries '/docs/'.
  for (const page of source.getPages()) {
    urls.push(`${siteOrigin}${page.url}/`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
