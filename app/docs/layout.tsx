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
      <DocsLayout tree={source.pageTree} sidebar={{ collapsible: false }}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
