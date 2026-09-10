import { siteOrigin } from '@/lib/site';

/**
 * /sitemap-index.xml — emitted at the exact path main's robots.txt names
 * (`Sitemap: https://getff.ai/sitemap-index.xml`), so robots.txt stays
 * verbatim from main (D7: emit that path rather than edit robots).
 */
export const dynamic = 'force-static';

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteOrigin}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
