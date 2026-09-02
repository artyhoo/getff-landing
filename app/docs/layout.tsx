import './global.css';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { source } from '@/lib/source';
import { searchApi } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    template: '%s · getff docs',
    default: 'getff docs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      // Dark is the brand default (the landing is dark-only, app/(site)/landing.css),
      // but the docs keep a real light theme and the theme switch: forcing dark-only on
      // a documentation section removes a legitimate reading preference. `system` stays
      // available through the switch; `defaultTheme` only sets the first visit.
      theme={{ defaultTheme: 'dark' }}
      search={{
        options: {
          // Client-side search over the statically exported index.
          // `api` is spelled out explicitly (lib/site.ts): the fumadocs-core
          // default reads Vite's import.meta.env.BASE_URL, undefined under Next.
          type: 'static',
          api: searchApi,
        },
      }}
    >
      <DocsLayout
        tree={source.pageTree}
        // Plain <a>, not next/link: the site segment carries its own global CSS
        // (F6 in the stage report), so crossing segments must be a full page load.
        nav={{
          title: (
            <span className="font-mono font-bold tracking-tight">
              getff<span className="text-fd-muted-foreground"> docs</span>
            </span>
          ),
          url: '/',
        }}
        githubUrl="https://github.com/artyhoo/getff"
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
