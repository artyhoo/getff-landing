import './landing.css';

/**
 * Site chrome (nav + footer), ported from src/layouts/BaseLayout.astro.
 * Plain <a> tags deliberately — cross-segment navigation (site ↔ docs)
 * must full-reload so each segment's global CSS stands alone.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sitenav">
        <a className="brand-link" href="/">get<span>ff</span></a>
        <a href="/docs/quickstart-ts/">Docs</a>
        <a href="/blog/">Blog</a>
        <a href="https://github.com/artyhoo/getff">GitHub</a>
        <a href="/consulting/">Consulting</a>
      </nav>
      {children}
      <footer className="sitefooter">
        <p>
          <a href="/docs/quickstart-ts/">Docs</a><span className="sep">·</span><a href="/blog/">Blog</a><span className="sep">·</span><a href="https://github.com/artyhoo/getff">GitHub</a><span className="sep">·</span><a href="/consulting/">Consulting</a><span className="sep">·</span><a href="mailto:hi@getff.ai">hi@getff.ai</a><span className="sep">·</span><a href="https://x.com/artyhoo">X @artyhoo</a><span className="sep">·</span><a href="https://bsky.app/profile/getff.ai">Bluesky @getff.ai</a><span className="sep">·</span>License FSL-1.1-ALv2
        </p>
      </footer>
    </>
  );
}
