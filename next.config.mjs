import { createMDX } from 'fumadocs-mdx/next';

// R8 (rollout-and-cutover design, amended cold round 1 TD-5): the S1 smoke
// preview is the GitHub Pages _project_ site artyhoo/getff-docs-smoke, served
// under a path prefix. The smoke build sets basePath/assetPrefix from the
// ONE env var PREVIEW_BASE_PATH (e.g. `/getff-docs-smoke`); production sets
// NEITHER — "the landing config has no prefix today and must not grow one".
// That env var is the ONLY permitted preview delta (T-S1-B): a preview that
// differs from production by anything else certifies an artifact that will
// not ship. The deterministic gates in pr.yml run against the production
// config and must never see this variable set.
const previewBasePath = process.env.PREVIEW_BASE_PATH;

if (previewBasePath && !/^\/[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*$/.test(previewBasePath)) {
  throw new Error(
    `[next.config] PREVIEW_BASE_PATH="${previewBasePath}" is not a root-relative path prefix ` +
      `(expected e.g. /getff-docs-smoke) — refusing to build a preview whose URL shape was never agreed`,
  );
}

const nextConfig = {
  // Static export — deployed as plain files (D8 deploys ./out).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Preview-only prefix (R8). The spread keeps the production config object
  // byte-identical to the pre-S1 shape when the variable is absent.
  ...(previewBasePath ? { basePath: previewBasePath, assetPrefix: previewBasePath } : {}),
};

const withMDX = createMDX()(nextConfig);

export default withMDX;
