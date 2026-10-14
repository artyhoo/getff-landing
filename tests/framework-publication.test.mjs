import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
const sha = '1234567890123456789012345678901234567890';
const pages = ['index.md', 'why.md', 'how-it-works.md', 'installation.md', 'quick-start.md', 'ai-agents.md', 'reference/B.md', 'reference/D/inject-matching-rule.md'];
function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), 'getff-publication-'));
  const write = (p, text) => { const target = resolve(root, p); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, text); };
  write('framework.pin', sha + '\n');
  write('.framework/SHA', sha + '\n');
  write('framework-publication.json', JSON.stringify({ version: 1, pages }));
  write('content/docs/beta.md', '---\ntitle: Beta\n---\nLegacy programme content.\n');
  write('content/docs/index.md', '---\ntitle: Docs\n---\nOld generic docs.\n');
  for (const p of pages) write('.framework/docs/site/' + p, '---\ntitle: ' + p + '\ndescription: Pinned description\ndocs-refresh: first\ndocs-refresh: second\n---\n# ' + p + '\n\nPinned content for ' + p + '.\n');
  return { root, write };
}
function run(root) { return spawnSync(process.execPath, ['scripts/prepare-framework-docs.mjs', '--root', root], { cwd: resolve(import.meta.dirname, '..'), encoding: 'utf8' }); }
test('publishes exactly eight pinned pages while preserving legacy programme bytes', () => {
  const f = fixture();
  try {
    const result = run(f.root);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(readFileSync(resolve(f.root, '.framework-docs/beta.md'), 'utf8'), '---\ntitle: Beta\n---\nLegacy programme content.\n');
    const index = readFileSync(resolve(f.root, '.framework-docs/index.md'), 'utf8');
    assert.ok(index.includes('# index.md\n\nPinned content for index.md.'));
    assert.ok(!index.includes('Old generic docs.'));
    assert.ok(!index.includes('docs-refresh:'));
    const proof = JSON.parse(readFileSync(resolve(f.root, '.framework-docs.provenance.json'), 'utf8'));
    assert.equal(proof.sha, sha);
    assert.equal(proof.pages.length, 8);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
test('a missing admitted source fails without replacing a previous resolved collection', () => {
  const f = fixture();
  try {
    f.write('.framework-docs/index.md', 'Prior accepted collection');
    rmSync(resolve(f.root, '.framework/docs/site/why.md'));
    const result = run(f.root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /why.md/);
    assert.equal(readFileSync(resolve(f.root, '.framework-docs/index.md'), 'utf8'), 'Prior accepted collection');
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
test('a checkout from another SHA is rejected before emitting content', () => {
  const f = fixture();
  try {
    f.write('.framework/SHA', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n');
    const result = run(f.root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /pin.*mismatch/i);
    assert.equal(existsSync(resolve(f.root, '.framework-docs')), false);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
test('published relative links become HTML routes and other links retain immutable source provenance', async () => {
  const { projectFrameworkLink } = await import('../lib/framework-links.ts');
  assert.equal(projectFrameworkLink('../B.md#list', 'reference/D/inject-matching-rule.md', sha, pages), '/docs/reference/B/#list');
  assert.equal(projectFrameworkLink('../../terms.md#gate', 'reference/D/inject-matching-rule.md', sha, pages), 'https://github.com/artyhoo/getff/blob/' + sha + '/docs/site/terms.md#gate');
  assert.equal(projectFrameworkLink('why.md?mode=read#proof', 'index.md', sha, pages), '/docs/why/?mode=read#proof');
  assert.equal(projectFrameworkLink('../../README.md#why-this-exists', 'index.md', sha, pages), 'https://github.com/artyhoo/getff/blob/' + sha + '/README.md#why-this-exists');
  assert.equal(projectFrameworkLink('https://example.com/a.md#x', 'index.md', sha, pages), 'https://example.com/a.md#x');
  assert.equal(projectFrameworkLink('#current', 'index.md', sha, pages), '#current');
});

test('the Mermaid build probe plants into the collection that the production build reads', () => {
  const root = resolve(import.meta.dirname, '..');
  const fixture = resolve(root, '.framework-docs/mermaid-build-fixture.md');
  assert.equal(existsSync(fixture), false, 'No foreign fixture may be overwritten');
  const args = ['scripts/self-test-mermaid-build.mjs'];
  try {
    const result = spawnSync(process.execPath, [...args, 'plant'], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(existsSync(fixture), 'Probe must enter the resolved production collection');
  } finally { spawnSync(process.execPath, [...args, 'clean'], { cwd: root, encoding: 'utf8' }); }
});

test('the production fetch rejects a preview pin outside current framework main', () => {
  const root = mkdtempSync(resolve(tmpdir(), 'getff-release-pin-'));
  try {
    const repo = resolve(root, 'repo');
    mkdirSync(repo);
    const git = args => {
      const r = spawnSync('git', args, { cwd: repo, encoding: 'utf8', env: { ...process.env, GIT_AUTHOR_NAME: 'Fixture', GIT_AUTHOR_EMAIL: 'fixture@example.invalid', GIT_COMMITTER_NAME: 'Fixture', GIT_COMMITTER_EMAIL: 'fixture@example.invalid' } });
      assert.equal(r.status, 0, r.stderr);
      return r.stdout.trim();
    };
    git(['init', '-q', '--initial-branch=main']);
    mkdirSync(resolve(repo, 'docs/site'), { recursive: true });
    writeFileSync(resolve(repo, 'docs/site/index.md'), 'Main source');
    git(['add', 'docs']); git(['commit', '-qm', 'Initial source']);
    const main = git(['rev-parse', 'HEAD']);
    git(['checkout', '-qb', 'preview']);
    writeFileSync(resolve(repo, 'docs/site/index.md'), 'Unpromoted source');
    git(['commit', '-qam', 'Preview source']);
    const preview = git(['rev-parse', 'HEAD']);
    const pin = resolve(root, 'framework.pin');
    const env = { ...process.env, FRAMEWORK_PIN: pin, FRAMEWORK_REPO: repo, FRAMEWORK_DIR: resolve(root, 'checkout') };
    writeFileSync(pin, preview + '\n');
    const reject = spawnSync(process.execPath, ['scripts/fetch-framework.mjs', '--require-main'], { cwd: resolve(import.meta.dirname, '..'), encoding: 'utf8', env });
    assert.notEqual(reject.status, 0, 'An unpromoted preview cannot deploy');
    assert.match(reject.stderr, /release pin.*framework main/i);
    writeFileSync(pin, main + '\n');
    const accept = spawnSync(process.execPath, ['scripts/fetch-framework.mjs', '--require-main'], { cwd: resolve(import.meta.dirname, '..'), encoding: 'utf8', env });
    assert.equal(accept.status, 0, accept.stderr);
    assert.equal(readFileSync(resolve(root, 'checkout/docs/site/index.md'), 'utf8'), 'Main source');
  } finally { rmSync(root, { recursive: true, force: true }); }
});
