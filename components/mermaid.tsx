/**
 * Mermaid — async SERVER component over `beautiful-mermaid` (R6, S1 BUILD).
 *
 * Fumadocs' recipe renders a silent code-block fallback when the renderer
 * throws; THIS component deliberately does NOT (rollout spec R6: a dropped
 * diagram must fail the build, not demote itself to a fenced block nobody
 * reads). Under `output: 'export'` every page is prerendered at build time,
 * so a throw here IS a red build — the designed gate.
 *
 * Order of arms:
 *   1. lib/mermaid-allowlist.ts `assertAllowed` — throws on an unsupported
 *      TYPE and on any line the renderer would drop silently.
 *   2. `renderMermaid` (async) — throws on a malformed header.
 *
 * Theme: fd design tokens as CSS variables (R6 falsifier: an SVG unreadable
 * in dark theme → pass fd bg/fg tokens BEFORE considering a client
 * renderer). `transparent: true` keeps the page background in dark mode.
 */
import { renderMermaid } from 'beautiful-mermaid';
import type { SVGProps } from 'react';
import { assertAllowed } from '@/lib/mermaid-allowlist';

export async function Mermaid({ chart }: { chart: string } & Omit<SVGProps<SVGSVGElement>, 'viewBox'>) {
  assertAllowed(chart);

  const svg = await renderMermaid(chart, {
    bg: 'var(--color-fd-background)',
    fg: 'var(--color-fd-foreground)',
    line: 'var(--color-fd-border)',
    accent: 'var(--color-fd-primary)',
    muted: 'var(--color-fd-muted-foreground)',
    surface: 'var(--color-fd-card)',
    border: 'var(--color-fd-border)',
    transparent: true,
  });

  // `renderMermaid` returns a self-contained `<svg>` string; inject it as
  // raw markup — the input was allow-listed and the output is build-time SVG.
  return <div className="mermaid-svg [&>svg]:mx-auto [&>svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default Mermaid;
