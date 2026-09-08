import type { Metadata } from 'next';
import { CopyButton } from './components/CopyButton';
import { DemoVideo } from './components/DemoVideo';

const description =
  'getff compiles your conventions into native toolchain gates (ESLint/husky for npm, clippy/cargo-deny for cargo). Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.';

export const metadata: Metadata = {
  title: { absolute: 'getff — Docs lie. Tests don’t.' },
  description,
  alternates: { canonical: '/' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'getff',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  description,
  url: 'https://getff.ai',
  softwareVersion: 'current',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  license: 'https://fsl.software/',
};

export default function HomePage() {
  return (
    <main className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI DX</p>

            <h1 className="hero-h1">Docs lie. Tests <span className="u-pass">don’t.</span></h1>

            <p className="lede">
              AI DX for your codebase: conventions AI agents can’t silently bypass — and an AI-run
              dev environment around them.
            </p>

            <div className="cta-row">
              <a className="btn primary" href="/docs/quickstart-ts/">Get started</a>
              <a className="btn ghost" href="https://github.com/artyhoo/getff/blob/main/AGENTS.md">Open the executable AGENTS.md</a>
            </div>

            <p className="fineprint">
              Source-available (FSL-1.1-ALv2 → Apache-2.0 after 2 years).
              Deterministic. Local-first. $0 LLM calls in CI — enforced by a test.
            </p>
          </div>

          <div className="hero-term">
            <div className="term" aria-hidden="true">
              <div className="term-bar">
                <span className="term-dots"><i></i><i></i><i></i></span>
                <span className="term-title">make self-audit</span>
              </div>
              <div className="term-body"><pre><span className="c-prompt">$</span> git clone https://github.com/artyhoo/getff
<span className="c-prompt">$</span> cd getff &amp;&amp; make self-audit
<span className="c-pass"># green: every AGENTS.md claim verified</span>
<span className="c-comment"># now break any enforcement line, run it again</span>
<span className="c-prompt">$</span> make self-audit
<span className="c-fail"># red: the gate names the claim that lied</span></pre></div>
            </div>
          </div>
        </div>
      </header>

      {/* B-D2 two-layer panel. Card bodies reuse only already-deployed claims. */}
      <section id="ai-dx" aria-labelledby="ai-dx-title">
        <h2 id="ai-dx-title">AI DX on both sides of the keyboard</h2>
        <div className="panel-grid">
          <a className="panel-card" href="/docs/daily-cycle-rules/">
            <span className="badge">beta</span>
            <h3>Rules from live docs</h3>
            <p>Conventions compiled into native toolchain gates — ESLint/husky for npm; for cargo, the demo today is clippy, with cargo-deny on the roadmap.</p>
          </a>
          <a className="panel-card" href="/docs/factory-overview/">
            <span className="badge badge-exp">experimental</span>
            <h3>The AI factory</h3>
            <p>Its own AGENTS.md is executable: every claim carries a live-fired enforcement status.</p>
          </a>
        </div>
      </section>

      <section id="pain">
        <h2><span className="num">01</span>The pain</h2>
        <div className="pain-row">
          <div className="pain-item">
            <span className="x" aria-hidden="true">✗</span><h3>Your agent ignores your rules.</h3>
            <p>CLAUDE.md and AGENTS.md are prose. The spec itself says the agent
            “simply parses the text you provide”. Parsing is not enforcement.</p>
          </div>
          <div className="pain-item">
            <span className="x" aria-hidden="true">✗</span><h3><code>as any</code> creeps back.</h3>
            <p>Conventions you never wrote down break silently. Conventions you
            DID write down break politely.</p>
          </div>
          <div className="pain-item">
            <span className="x" aria-hidden="true">✗</span><h3>Tests pass, protection doesn’t.</h3>
            <p>LLM-generated tests are often tautological: green, and guarding
            nothing.</p>
          </div>
        </div>
      </section>

      <section id="demo">
        <h2><span className="num">02</span>20 seconds each. No narration needed.</h2>
        <div className="demo-grid">
          <DemoVideo
            title="git commit — pre-push gate"
            poster="/demo/violation-blocked.poster.webp"
            src="/demo/violation-blocked.mp4"
            label="An agent adds as any; the pre-push hook kills it before CI even wakes up"
          >
            <span className="arr">→</span> An agent adds <code>as any</code>; the pre-push hook kills it before CI even wakes up.
          </DemoVideo>
          <DemoVideo
            title="make self-audit — doc drift"
            poster="/demo/doc-drift-gate.poster.webp"
            src="/demo/doc-drift-gate.mp4"
            label="A claim in AGENTS.md stops being true; make self-audit fails and names the exact line"
          >
            <span className="arr">→</span> A claim in AGENTS.md stops being true; <code>make self-audit</code> fails and names the exact line.
          </DemoVideo>
        </div>
      </section>

      <section id="how">
        <h2><span className="num">03</span>How it works</h2>
        <ol className="steps-timeline">
          <li>
            <span className="step-n">01</span>
            <span className="body"><strong>Write the convention once</strong> — a rule file, not a prompt.</span>
          </li>
          <li>
            <span className="step-n">02</span>
            <span className="body"><strong>getff compiles it</strong> into native gates: ESLint/husky for npm, clippy/cargo-deny for cargo. No custom runtime, no LLM in the loop.</span>
          </li>
          <li>
            <span className="step-n">03</span>
            <span className="body"><strong>It fails early</strong> — <span className="chan-chain"><span className="chan">edit-time</span><span className="arr">→</span><span className="chan">pre-commit</span><span className="arr">→</span><span className="chan">pre-push</span><span className="arr">→</span><span className="chan chan-last">CI</span></span>. CI is the last resort, not the first.</span>
          </li>
        </ol>
      </section>

      <section id="feel-it">
        <h2><span className="num">04</span>Feel it in 90 seconds</h2>
        <div className="term block">
          <div className="term-bar">
            <span className="term-dots"><i></i><i></i><i></i></span>
            <span className="term-title">bash</span>
            <CopyButton />
          </div>
          <div className="term-body"><pre><span className="c-prompt">$</span> <span data-copy-text>git clone https://github.com/artyhoo/getff</span>
<span className="c-prompt">$</span> <span data-copy-text>cd getff &amp;&amp; make self-audit</span>        <span className="c-pass"># green: every AGENTS.md claim verified</span>
<span className="c-comment"># now open AGENTS.md, break any enforcement line, run it again</span>
<span className="c-prompt">$</span> <span data-copy-text>make self-audit</span>                    <span className="c-fail"># red: the gate names the claim that lied</span></pre></div>
        </div>
        <p className="fineprint">That AGENTS.md is not a mock. It is the live root doc of this repo.</p>
      </section>

      <section id="install">
        <h2><span className="num">05</span>Install</h2>
        <div className="term block">
          <div className="term-bar">
            <span className="term-dots"><i></i><i></i><i></i></span>
            <span className="term-title">claude</span>
            <CopyButton />
          </div>
          <div className="term-body"><pre><span data-copy-text>/plugin marketplace add artyhoo/getff
/plugin install getff@getff</span></pre></div>
        </div>
        <p className="fineprint">The plugin never silently mutates your git or CI. The hard layer (hooks + CI gates) is one explicit opt-in command.</p>
      </section>

      <section id="limits">
        <h2><span className="num">06</span>Honest limits</h2>
        <div className="limits-frame">
          <div className="frame-label"><span className="c-prompt">$</span> getff --limits</div>
          <ul className="limits">
            <li><span>Executable AGENTS.md today = <strong>this repo’s own</strong>. Generating <em>yours</em> from <em>your</em> conventions is the next milestone, not a shipped feature.</span></li>
            <li><span>Stacks today: <strong>TypeScript/JS</strong> (ESLint/husky) and <strong>Rust</strong> gate generation (clippy/cargo-deny). Other toolchains are on the roadmap, not in the box.</span></li>
            <li><span>Source-available (<strong>FSL-1.1-ALv2</strong>), not OSI open source. Every release becomes Apache-2.0 after 2 years. We say this first, on purpose.</span></li>
          </ul>
        </div>
      </section>

      <section id="email">
        <h2><span className="num">07</span>Get updates</h2>
        <div className="email-box">
          <p>One email when the generator milestone ships. No digest, no drip.</p>
          <form action="https://buttondown.com/api/emails/embed-subscribe/getff" method="post" className="embeddable-buttondown-form">
            <label htmlFor="bd-email">Enter your email</label>
            <input type="email" name="email" id="bd-email" placeholder="you@example.com" required />
            <input type="submit" value="Subscribe" />
          </form>
        </div>
      </section>

    </main>
  );
}
