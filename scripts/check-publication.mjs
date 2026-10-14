import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const out = resolve(process.env.OUT_DIR ?? 'out');
const pages = [
  ['', 'Introduction'], ['why', 'Why getff'], ['how-it-works', 'How it works'],
  ['installation', 'Installation'], ['quick-start', 'Quick start'],
  ['ai-agents', 'Use getff with your AI agent'], ['reference/B', 'Skills'],
  ['reference/D/inject-matching-rule', 'inject-matching-rule hook'],
];
const samples = {
  '': "getff turns your team's coding conventions into checks that fail.",
  why: 'Your team has conventions.',
  'how-it-works': 'After this page you can explain getff to a colleague with three pictures.',
  installation: 'getff installs files into your project:',
  'quick-start': 'Pick the card that matches your project.',
  'ai-agents': 'Your agent can read this site without you.',
  'reference/B': 'is how getff talks to your AI agent.',
  'reference/D/inject-matching-rule': 'This hook takes the middle road.',
};
const normal = s => s.replace(/&amp;/g, '&').replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex ?? dec, hex ? 16 : 10))).replace(/\s+/g, ' ').trim();
let failed = 0;
for (const [slug, title] of pages) {
  const url = '/docs/' + (slug ? slug + '/' : '');
  const htmlPath = resolve(out, 'docs', slug, 'index.html');
  const twinPath = resolve(out, 'docs', slug ? slug + '.md' : 'index.md');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  const md = existsSync(twinPath) ? readFileSync(twinPath, 'utf8') : '';
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m => m[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&'));
  const errors = [];
  const visible = normal(html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' '));
  if (!visible.includes(samples[slug]) || !normal(md).includes(samples[slug])) errors.push('missing source-specific body in HTML or Markdown');
  if (slug === 'how-it-works' && (html.match(/class="mermaid-svg/g) ?? []).length !== 3) errors.push('three diagrams not rendered as SVG');
  if (!headings.includes(title)) errors.push('missing expected H1: ' + title);
  if (/redirect stub written|http-equiv="refresh"/i.test(html)) errors.push('redirect stub instead of content');
  if (!md.startsWith('# ' + title + ' (')) errors.push('missing shared-source Markdown twin');
  const sitemap = readFileSync(resolve(out, 'sitemap-0.xml'), 'utf8');
  if (!sitemap.includes('https://getff.ai' + url)) errors.push('absent from sitemap');
  const llms = readFileSync(resolve(out, 'llms.txt'), 'utf8');
  if (!llms.includes(url.replace(/\/$/, ''))) errors.push('absent from LLM index');
  const search = JSON.parse(readFileSync(resolve(out, 'api/search'), 'utf8'));
  if (!search.internalDocumentIDStore?.internalIdToId?.includes(url.replace(/\/$/, ''))) errors.push('absent from search index');
  if (errors.length) { failed++; console.error('FAIL ' + url + ': ' + errors.join('; ')); }
  else console.log('PASS ' + url + ': HTML H1 + real content + Markdown twin + sitemap + LLM index + search');
}
if (failed) process.exitCode = 1;
else console.log('PUBLICATION_ROUTES=8/8');
