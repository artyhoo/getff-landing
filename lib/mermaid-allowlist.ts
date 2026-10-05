/**
 * Mermaid pre-render allow-list (R6, S1 BUILD).
 *
 * WHY THIS EXISTS: `beautiful-mermaid` 1.1.3's throw is a HEADER check only —
 * content inside a SUPPORTED type is dropped silently and byte-identically
 * (measured 2026-09-21: a `click` directive and a garbage line render as if
 * absent). Without this gate the renderer would swap a visible dropped fence
 * for an INVISIBLE dropped edge, which is worse than the silent code-block
 * fallback the design rejected (rollout spec R6, Mermaid record).
 *
 * So: the component validates its input here BEFORE calling
 * `renderMermaidSVG`, and THROWS on anything outside the grammar below.
 * Fail direction is fixed — a diagram this list rejects must either gain a
 * measured, parser-verified pattern here (widen) or never ship (never relax
 * the throw).
 *
 * GRAMMAR PROVENANCE: every pattern below mirrors a regex the installed
 * parser actually handles — `beautiful-mermaid/src/parser.ts`
 * (flowchart + state), `src/sequence/parser.ts`, `src/class/parser.ts`,
 * `src/er/parser.ts`, `src/xychart/parser.ts` at 1.1.3. Unsupported TYPE
 * headers throw here too (measured: the library itself throws on `gantt` —
 * that arm is the first fixture).
 *
 * CROSS-REPO SEAM (recorded, unresolved): rollout spec R19 wants the
 * framework-side fence check and this component to enforce ONE shared list.
 * A single module cannot be imported across two repositories today; the
 * candidate home is the pin (`docs/site/**`), which both sides already
 * fetch. Until that lands, THIS copy is the landing's enforcing gate and the
 * duplication is a reported finding — not a silent drift.
 *
 * Supported set = the library's 6 types: flowchart, state, sequence, class,
 * ER, XY chart.
 */

export const SUPPORTED_TYPES = [
  'flowchart',
  'state',
  'sequence',
  'class',
  'er',
  'xychart',
] as const;

export type MermaidType = (typeof SUPPORTED_TYPES)[number];

/** Header → type. Everything else is an unsupported type → throw. */
export function detectType(chart: string): MermaidType {
  const first = chart.trim().split(/[\n;]/)[0]?.trim().toLowerCase() ?? '';
  if (/^(?:graph|flowchart)\s+(?:td|tb|lr|bt|rl)\s*$/i.test(first)) return 'flowchart';
  if (/^statediagram(?:-v2)?\s*$/i.test(first)) return 'state';
  if (/^sequencediagram\s*$/i.test(first)) return 'sequence';
  if (/^classdiagram\s*$/i.test(first)) return 'class';
  if (/^erdiagram\s*$/i.test(first)) return 'er';
  if (/^xychart(?:-beta)?\s*$/i.test(first)) return 'xychart';

  throw new Error(
    `[mermaid] unsupported diagram type in header ${JSON.stringify(first)} — ` +
      `supported: ${SUPPORTED_TYPES.join(', ')}. ` +
      `The renderer would fail or silently mis-render this fence; the build stops here (R6).`,
  );
}

/**
 * One regex per line-level construct the installed parser demonstrably
 * HANDLES, per type. A line matching none of its type's patterns throws.
 * `%%` comments are allowed in every type (comments carry no renderable
 * content; flowchart/state strip them pre-parse, the other parsers drop
 * them — measured, no visible artefact either way).
 */
const LINE_GRAMMAR: Record<MermaidType, RegExp[]> = {
  flowchart: [
    /^%%/,
    /^(?:graph|flowchart)\s+(?:td|tb|lr|bt|rl)\s*$/i, // header
    /^classdef\s+\w+\s+.+$/i, // classDef name prop:val,…
    /^class\s+[\w,-]+\s+\w+$/i, // class A,B className
    /^style\s+[\w,-]+\s+.+$/i, // style A,B fill:#f00
    /^linkstyle\s+(?:default|[\d,\s]+)\s+.+$/i, // linkStyle 0/default stroke:…
    /^direction\s+(?:td|tb|lr|bt|rl)\s*$/i, // direction inside subgraph
    /^subgraph\s+.+$/i,
    /^end$/i,
    // node/edge lines: must carry a connection operator or declare nodes
    /(?:-{2,}>|-{3}|={2,}>|-\.->|-\.-|-{2,}\)|={2,}\)|-(?:\.\.)?-)/,
  ],
  state: [
    /^%%/,
    /^statediagram(?:-v2)?\s*$/i, // header
    /^direction\s+(?:td|tb|lr|bt|rl)\s*$/i,
    /^linkstyle\s+(?:default|[\d,\s]+)\s+.+$/i,
    /^state\s+(?:"[^"]+"\s+as\s+)?[\w\p{L}-]+\s*\{$/u, // composite open
    /^state\s+"[^"]+"\s+as\s+[\w\p{L}-]+\s*$/u, // alias
    /^\}$/, // composite close
    /^\[\*\]|[\w\p{L}-]+\s*-->\s*(?:\[\*\]|[\w\p{L}-]+)(?:\s*:\s*.+)?$/u, // transition
    /^[\w\p{L}-]+\s*:\s*.+$/u, // description
  ],
  sequence: [
    /^%%/,
    /^sequencediagram\s*$/i, // header
    /^(?:participant|actor)\s+\S+(?:\s+as\s+.+)?$/i,
    /^note\s+(?:left of|right of|over)\s+[^:]+:\s*.+$/i,
    /^(?:loop|alt|opt|par|critical|break|rect)\b.*$/i, // block openers (par/and RENDER at 1.1.3 — measured; spec's «dropped» claim is stale for this version)
    /^(?:else|and)\b.*$/i,
    /^end$/i,
    /^autonumber(?:\s+\d+)?\s*$/i,
    /^(?:activate|deactivate)\s+\S+$/i,
    // messages: A->>B:, A-->>B:, A-)B:, A--)B:, A-x B:, A--x B: — with optional
    // +/- activation markers attached to the target (A->>+B:) or after the text
    /^\S+\s*(?:->>|-->>|->|-->|-\)|--\)|-x|--x)\s*[+-]?[\w\p{L}-]+\s*:(?:\s.*)?(?:\s*[+-])?$/u,
  ],
  class: [
    /^%%/,
    /^classdiagram\s*$/i, // header
    /^class\s+\S+(?:~\w+~)?\s*\{$/, // class X[~T~] {
    /^class\s+\S+(?:~\w+~)?\s*$/, // class X
    /^\}$/, // block close
    /^<<\w+>>$/, // annotation line
    /^namespace\s+\S+\s*\{$/,
    /^[+\-#~]?.+\(.*\).*$/, // method member inside a class body (optional visibility)
    /^[+\-#~]?\w+(?:\s+\w+)?(?::\s*.+)?$/, // attribute member: `+String name`, `name`, `name: type` — parseMember renders «Type name» (≤2 words) and DROPS longer garbage (measured)
    /^\S+\s*:\s*.+$/, // top-level member `X : member`
    // relationships: <|-- *-- o-- --> ..> -- ..
    /^\S*\s*(?:"[^"]*"\s*)?(?:<\|--|\*--|o--|--\.\.|\.\.>|-->|--|\.\.)\s*(?:"[^"]*"\s*)?\S+.*$/,
  ],
  er: [
    /^%%/,
    /^erdiagram\s*$/i, // header
    /^\S+\s*\{$/, // ENTITY {
    /^\}$/, // block close
    /^\S+\s+\S+(?:\s+(?:pk|fk|uk|"[^"]*"))*.*$/i, // attribute line
    // relationship: A ||--o{ B : label
    /^\S+\s+[|o}{]+(?:--|\.\.)[|o}{]+\s+\S+\s*:\s*.+$/,
  ],
  xychart: [
    /^%%/,
    /^xychart(?:-beta)?\s*$/i, // header
    /^title\s+"[^"]+"$/i,
    /^x-axis\s+(?:"[^"]*"\s*)?\[[^\]]+\]$/i, // categories
    /^x-axis\s+(?:"[^"]*"\s+)?-?\d+(?:\.\d+)?\s*-->\s*-?\d+(?:\.\d+)?$/i, // range
    /^y-axis\s+(?:"[^"]*"\s*)?\[[^\]]+\]$/i,
    /^y-axis\s+(?:"[^"]*"\s+)?-?\d+(?:\.\d+)?\s*-->\s*-?\d+(?:\.\d+)?$/i,
    /^y-axis\s+"[^"]+"$/i,
    /^(?:bar|line)\s+\[[^\]]+\]$/i, // series declaration
    /^(?:bar|line)\s+\[[^\]]+\]\s*[,\]]?\s*$/i,
    /^[\d.,\s]+$/, // series data values
  ],
};

/** Raise a named, line-addressed error — never a bare rejection. */
function reject(type: MermaidType, lineNo: number, line: string, reason: string): never {
  throw new Error(
    `[mermaid] ${type} diagram, line ${lineNo}: ${reason}\n` +
      `  > ${line}\n` +
      `The renderer DROPS constructs outside its grammar silently, so this ` +
      `fence must not ship (R6 pre-render allow-list). Fix the diagram, or — ` +
      `if the parser provably handles it — widen lib/mermaid-allowlist.ts ` +
      `with the measured pattern.`,
  );
}

/**
 * Validate a whole chart against the per-type grammar. THROWS on the first
 * line outside it. Returns the detected type on success.
 */
export function assertAllowed(chart: string): MermaidType {
  const type = detectType(chart); // throws on unsupported type
  const patterns = LINE_GRAMMAR[type];
  const lines = chart.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) continue;
    if (patterns.some((re) => re.test(line))) continue;
    reject(
      type,
      i + 1,
      line,
      /^click\b/i.test(line)
        ? '`click` callback directives are dropped silently by the renderer — remove it (interaction cannot exist in a static export)'
        : /^(?:accmetadata|accDescr|accTitle|direction)\b/i.test(line) && type !== 'flowchart' && type !== 'state'
          ? 'accessibility/direction directives are not in the supported grammar'
          : 'not in the pre-render allow-list — the renderer would drop it silently',
    );
  }
  return type;
}
