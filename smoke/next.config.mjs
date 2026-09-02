/**
 * getff-docs-smoke — static-export smoke for BS0 leg A.
 *
 * D1: output: 'export' (real files in out/), basePath env-driven defaulting
 * to the GitHub Pages project-page form /getff-docs-smoke.
 * turbopack.root is pinned to this directory because the parent landing repo
 * ships a package-lock.json that Turbopack would otherwise mis-infer as the
 * workspace root.
 */
import { createMDX } from 'fumadocs-mdx/next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/getff-docs-smoke';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default createMDX()(nextConfig);
