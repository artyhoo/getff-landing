/**
 * FAQPage structured data — ported verbatim from the Starlight `head:` block
 * in src/content/docs/docs/faq.md (front-matter is not a Fumadocs concept;
 * the JSON-LD is injected by the docs page for the faq slug instead).
 */
export const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an executable AGENTS.md?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AGENTS.md where every enforceable claim carries an enforcement line (which gate, which toolchain, live status), is backed by a test that live-fires the negative example against the real rule, and whose body is generated and byte-gated against drift. See the definition page for a full walkthrough.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does getff need an LLM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. The enforcement gates it generates are native toolchain gates (ESLint, husky, clippy, cargo-deny) that run deterministically, with no model call in the loop. $0 LLM calls in CI is enforced by a test in getff's own repo, not a marketing claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is getff open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Source-available under FSL-1.1-ALv2, not OSI open source. Every release converts to Apache-2.0 two years after it ships. We say this first, on purpose.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from Packmind?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Packmind runs an LLM-in-the-loop standards platform with its own runtime and org-wide features. getff compiles conventions into native toolchain gates instead — no runtime of its own, no LLM call to enforce a rule. If you need an LLM-driven standards platform with organization-wide rollout features, that's a real reason to pick Packmind instead.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from agnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "agnix lints your agent configuration files. getff takes a different problem: making the claims inside those files executable, so a claim that stops being true fails a gate instead of silently going stale.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from CodeRabbit or Qodo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "CodeRabbit and Qodo do LLM-powered code review, which is a genuinely useful complement, not a replacement. getff's gates are deterministic and cost nothing per run, because they're native toolchain rules (ESLint/husky, clippy/cargo-deny), not a model call.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work without Claude Code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The generated gates do, yes. Once getff compiles your conventions into ESLint rules, husky hooks, clippy lints, or cargo-deny policy, those gates live in your toolchain and run in any editor, any CI, with or without Claude Code.',
      },
    },
  ],
});
