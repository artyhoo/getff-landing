// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://getff.ai',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'getff docs',
      description:
        'getff compiles your conventions into native toolchain gates. Docs lie; tests don’t.',
      favicon: '/favicon-32.png',
      logo: {
        src: './src/assets/starlight-logo.png',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/artyhoo/getff' },
      ],
      customCss: ['./src/styles/starlight-custom.css'],
      editLink: {
        baseUrl: 'https://github.com/artyhoo/getff-landing/edit/main/',
      },
      sidebar: [
        {
          label: 'Get started',
          items: [
            { label: 'Quickstart — TypeScript', slug: 'docs/quickstart-ts' },
            { label: 'Quickstart — Rust', slug: 'docs/quickstart-rust' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Executable AGENTS.md, defined', slug: 'docs/executable-agents-md' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'FAQ', slug: 'docs/faq' },
            { label: 'Honest limits', slug: 'docs/limits' },
          ],
        },
        {
          label: 'More',
          items: [
            { label: 'Home', link: '/' },
            { label: 'Blog', link: '/blog/' },
            { label: 'Consulting', link: '/consulting/' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://getff.ai/og-card.png' },
        },
      ],
    }),
    sitemap(),
  ],
});
