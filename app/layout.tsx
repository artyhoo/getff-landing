import type { Metadata } from 'next';
import { siteOrigin } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    template: '%s — getff',
    default: 'getff',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'getff',
    images: [{ url: '/og-card.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@artyhoo',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'getff blog' }],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
