import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, renameSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
const root = resolve(process.argv[2] === '--root' ? process.argv[3] : '.');
try {
  const pin = readFileSync(resolve(root, 'framework.pin'), 'utf8').split('\n').map(s => s.replace(/#.*$/, '').trim()).filter(Boolean);
  const sha = readFileSync(resolve(root, '.framework/SHA'), 'utf8').trim();
  if (pin.length !== 1 || !/^[a-f0-9]{40}$/.test(pin[0]) || pin[0] !== sha) throw new Error('Literal pin / checkout SHA mismatch');
  const { pages } = JSON.parse(readFileSync(resolve(root, 'framework-publication.json'), 'utf8'));
  if (!Array.isArray(pages) || pages.length !== 8 || new Set(pages).size !== 8 || pages.some(p => typeof p !== 'string' || p.includes('..') || !/^[a-zA-Z0-9/-]+\.md$/.test(p))) throw new Error('Expected exactly eight unique admitted Markdown paths');
  const inputs = pages.map(path => {
    const raw = readFileSync(resolve(root, '.framework/docs/site', path), 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) throw new Error(path + ': missing frontmatter');
    const field = name => {
      const value = match[1].match(new RegExp('^' + name + ': (.+)$', 'm'))?.[1]?.trim();
      if (!value) throw new Error(path + ': missing ' + name);
      return value.startsWith('"') ? JSON.parse(value) : value.startsWith("'") ? value.slice(1, -1).replaceAll("''", "'") : value;
    };
    const title = field('title'), description = field('description');
    return { path, title, description, body: match[2], sha256: createHash('sha256').update(raw).digest('hex') };
  });
  // Validate every input before replacing the prior collection.
  const target = resolve(root, '.framework-docs'), next = resolve(root, '.framework-docs.next');
  rmSync(next, { recursive: true, force: true });
  cpSync(resolve(root, 'content/docs'), next, { recursive: true });
  for (const input of inputs) {
    const dest = resolve(next, input.path);
    mkdirSync(dirname(dest), { recursive: true });
    // Framework-only freshness/execution metadata is not Fumadocs YAML.
    // The body remains authoritative; do not copy repeated docs-refresh keys.
    writeFileSync(dest, '---\ntitle: ' + JSON.stringify(input.title) + '\ndescription: ' + JSON.stringify(input.description) + '\n---\n' + input.body);
  }
  const metaPath = resolve(next, 'meta.json');
  if (existsSync(metaPath)) {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const published = ['index', 'quick-start', 'installation', 'why', 'how-it-works', 'ai-agents'];
    meta.pages = ['---Get started---', ...published, ...(meta.pages ?? []).filter(p => !published.includes(p))];
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
    const refPath = resolve(next, 'reference/meta.json');
    if (existsSync(refPath)) {
      const ref = JSON.parse(readFileSync(refPath, 'utf8'));
      ref.pages = ['B', 'D', ...(ref.pages ?? []).filter(p => p !== 'B' && p !== 'D')];
      writeFileSync(refPath, JSON.stringify(ref, null, 2) + '\n');
    }
  }
  rmSync(target, { recursive: true, force: true });
  renameSync(next, target);
  writeFileSync(resolve(root, '.framework-docs.provenance.json'), JSON.stringify({ sha, pages: inputs.map(({ path, title, sha256 }) => ({ path, title, sha256 })) }, null, 2) + '\n');
  console.log('Prepared 8 pinned framework pages; retained legacy docs outside those paths. SHA=' + sha);
} catch (error) {
  console.error('[prepare-framework-docs] FAIL: ' + error.message);
  process.exitCode = 1;
}
