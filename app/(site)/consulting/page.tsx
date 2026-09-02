import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulting',
  description:
    'I set this discipline up for teams: an enforcement audit and native gates wired into your toolchain, no LLM bill attached.',
  alternates: { canonical: '/consulting/' },
};

export default function ConsultingPage() {
  return (
    <div className="wrap">
      <header className="hero" style={{ textAlign: 'left', paddingTop: 'var(--space-m)' }}>
        <h1 style={{ fontSize: 'var(--step-2)' }}>I set this discipline up for teams.</h1>
        <p className="hook" style={{ marginInline: 0, maxWidth: '55ch', textAlign: 'left' }}>
          If your agents keep breaking conventions you thought were documented,
          I do an enforcement audit — what’s drifting, what’s enforceable,
          what’s prose — and wire the gates in: ESLint/husky/CI for npm
          stacks, clippy/cargo-deny for Rust. Deterministic, local-first, no LLM
          bill attached.
        </p>
        <p style={{ maxWidth: '55ch' }}>
          Write me: <a href="mailto:hi@getff.ai">hi@getff.ai</a>. Include a repo
          link if you can; I reply with what I’d check first.
        </p>
      </header>
    </div>
  );
}
