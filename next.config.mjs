import { createMDX } from 'fumadocs-mdx/next';

const nextConfig = {
  // Static export — deployed as plain files (D8 deploys ./out).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

const withMDX = createMDX()(nextConfig);

export default withMDX;
