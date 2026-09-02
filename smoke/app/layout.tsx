import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { basePath } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | getff-docs-smoke',
    default: 'getff-docs-smoke',
  },
  // D5: noindex on every page (metadata cascades to all routes)
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider
          search={{
            options: {
              // D3: client-side search over a statically exported index
              type: 'static',
              api: `${basePath}/api/search`,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
