/**
 * check-hero-fs8.mjs — the FS8 hero guard (face.md :409, S1 BUILD).
 *
 * SPEC, AS WRITTEN: `grep -nE 'four stacks|Python|Go|cargo|clippy|Rust|roadmap|alpha|beta'
 * app/(site)/page.tsx` outside the component's props returns nothing; both CTAs internal.
 *
 * RECORDED SCOPE DEVIATION (a spec defect, not silently taken — kickoff §8):
 * the literal whole-file grep CANNOT pass, because §5.9 itself declares
 * sections UNTOUCHED that carry those very words in hand-written copy:
 *   · the metadata `description` const (cargo/clippy/roadmap sentence),
 *   · the §01 panel cards («clippy, with cargo-deny on the roadmap»),
 *   · the §03 step-02 body (same sentence).
 * §5.9 forbids touching them, and `hero-copy.json` (S0b's content) has no
 * fields that would replace them — so a whole-file grep fails on spec-
 * protected text. The guard therefore scans the whole file MINUS those
 * three recorded untouched regions. In the scanned region a stack/maturity
 * word may appear ONLY as data fed from the pin (hero-copy.json /
 * face-facts.json via lib/hero-copy.ts + the MaturityStackLine component) —
 * i.e. there must be NO literal hit at all.
 *
 * Also asserts: both hero CTAs are internal (href starts with "/").
 *
 * Exit non-zero on any violation; every hit names its line.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const PAGE = resolve(REPO_ROOT, 'app/(site)/page.tsx');
const DEBUG = process.env.LOG_LEVEL === 'debug';

// SUBSTRING semantics, deliberately — identical to FS8's spec grep. Stricter
// than word-boundary matching (it would also catch «betas», «Go-based»), and
// a guard must fail closed: a false-positive hit costs a re-word, a missed
// hit is a stack claim the gate never saw.
const PATTERN = /(four stacks|Python|Go|cargo|clippy|Rust|roadmap|alpha|beta)/g;

const lines = readFileSync(PAGE, 'utf8').split('\n');

// ── Locate the recorded untouched regions (line ranges, 1-based inclusive) ──
function findRange(startRe, endRe, name) {
  const s = lines.findIndex((l) => startRe.test(l));
  if (s === -1) return null;
  const rest = lines.slice(s + 1);
  const e = rest.findIndex((l) => endRe.test(l));
  if (e === -1) return null;
  return { name, from: s + 1, to: s + 1 + e + 1 };
}

const untouched = [
  findRange(/^const description =/, /';\s*$/, 'metadata description const (§5.9-untouched)'),
  findRange(/<section id="ai-dx"/, /<\/section>/, '§01 panel cards (§5.9-untouched)'),
  findRange(/<span className="step-n">02<\/span>/, /<\/li>/, '§03 step-02 body (§5.9-untouched)'),
].filter(Boolean);

if (untouched.length !== 3 && process.env.STRICT_REGIONS === '1') {
  console.error('[check-hero-fs8] FAIL: expected 3 recorded untouched regions, found ' + untouched.length);
  process.exit(1);
}

const inUntouched = (n) => untouched.some((r) => n >= r.from && n <= r.to);

// ── Scan the guarded region ──────────────────────────────────────────────────
const hits = [];
for (let i = 0; i < lines.length; i++) {
  const lineNo = i + 1;
  if (inUntouched(lineNo)) continue;
  for (const m of lines[i].matchAll(PATTERN)) {
    hits.push({ line: lineNo, match: m[1], text: lines[i].trim().slice(0, 90) });
  }
}

console.log(`[check-hero-fs8] scanning ${PAGE.replace(REPO_ROOT + '/', '')}`);
console.log(`[check-hero-fs8] excluded ${untouched.length} recorded §5.9-untouched region(s): ${untouched.map((r) => r.name).join(' · ')}`);
if (DEBUG) for (const r of untouched) console.log(`[check-hero-fs8]   region: lines ${r.from}-${r.to} (${r.name})`);

if (hits.length) {
  console.error(`[check-hero-fs8] FAIL — stack/maturity word(s) OUTSIDE the pin-fed props and outside the recorded untouched regions (FS8):`);
  for (const h of hits) console.error(`  ✗ line ${h.line}: /${h.match}/ — ${h.text}`);
  console.error('[check-hero-fs8] a stack word in the hero must come from the pin (hero-copy.json / face-facts.json), never a literal.');
  process.exit(1);
}
console.log('[check-hero-fs8] PASS — no stack/maturity literal outside the pin-fed data');

// ── Both CTAs internal ───────────────────────────────────────────────────────
const ctaRe = /<a className="btn (?:primary|ghost)" href="([^"]*)"/g;
const external = [];
for (let i = 0; i < lines.length; i++) {
  for (const m of lines[i].matchAll(ctaRe)) {
    if (!m[1].startsWith('/')) external.push(`line ${i + 1}: ${m[1]}`);
  }
}
if (external.length) {
  console.error('[check-hero-fs8] FAIL — hero CTA href(s) are not internal (FS8: both CTAs internal):');
  for (const e of external) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('[check-hero-fs8] PASS — both hero CTAs are internal');
