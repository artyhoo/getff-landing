import { posix } from 'node:path';
import { readFileSync } from 'node:fs';

export function projectFrameworkLink(href: string, sourcePath: string, sha: string, published: string[]): string {
  if (!href || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(href)) return href;
  const match = href.match(/^([^?#]*)([?#][\s\S]*)?$/);
  if (!match?.[1]) return href;
  const target = posix.normalize(posix.join('docs/site', posix.dirname(sourcePath), match[1]));
  const suffix = match[2] ?? '';
  const member = target.startsWith('docs/site/') ? target.slice('docs/site/'.length) : '';
  if (published.includes(member)) {
    return '/docs/' + (member === 'index.md' ? '' : member.replace(/\.md$/, '') + '/') + suffix;
  }
  return 'https://github.com/artyhoo/getff/blob/' + sha + '/' + target.split('/').map(encodeURIComponent).join('/') + suffix;
}

type Node = { type?: string; url?: string; children?: Node[] };
export function remarkFrameworkLinks() {
  const { pages } = JSON.parse(readFileSync('framework-publication.json', 'utf8')) as { pages: string[] };
  const sha = readFileSync('.framework/SHA', 'utf8').trim();
  return (tree: Node, file: { path?: string }) => {
    const path = (file.path ?? '').replaceAll('\\', '/');
    const marker = '.framework-docs/';
    const index = path.lastIndexOf(marker);
    if (index < 0) return;
    const sourcePath = path.slice(index + marker.length);
    if (!pages.includes(sourcePath)) return; // Legacy prose keeps its existing interpretation.
    const visit = (node: Node) => {
      if (node.type === 'link' && node.url) node.url = projectFrameworkLink(node.url, sourcePath, sha, pages);
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
