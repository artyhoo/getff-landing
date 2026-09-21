/**
 * Typed loaders for the pinned hero copy + face-facts (D28 §5.9, S1 BUILD).
 *
 * The hero's copy is NOT authored in this repo: `docs/site/hero-copy.json`
 * and `face-facts.json` are fetched from the framework pin (framework.pin →
 * .framework/ via scripts/fetch-framework.mjs). This module is the landing's
 * build-time access layer — a server-only fs read (page.tsx is statically
 * rendered under `output: 'export'`, so this runs once per build, never per
 * request and never in the browser).
 *
 * Every access is validated against the SHARED Zod schemas
 * (lib/pin-schemas.mjs — the same definitions scripts/check-pin-json.mjs
 * enforces), so a malformed pin fails the build here too — defence in depth
 * behind the R18 gate, never a silent undefined prop.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { heroCopySchema, faceFactsSchema } from './pin-schemas.mjs';

/** Root of the fetched pin — overridable for tests, mirroring the fetch script. */
const SITE_DIR = process.env.FRAMEWORK_DIR
  ? resolve(process.env.FRAMEWORK_DIR, 'docs/site')
  : resolve(process.cwd(), '.framework', 'docs', 'site');

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroCopy {
  cta: { primary: CtaLink; secondary: CtaLink };
  agentLine: { text: string; copyValue: string };
  howItWorksLink: { section: string; step: number; label: string; href: string };
  install: {
    oneCommand: { heading: string; body: string; command: string };
    plugin: { heading: string; body: string; commands: string[] };
    more: { label: string; href: string };
  };
  feelIt: { agentsMdLink: { label: string } };
  limits: { handWritten: string[] };
}

export interface MaturityRow {
  label: string;
  definition: string;
  caveat: string;
  'verified-at': string;
  generation?: string;
}

export interface FaceMaturity {
  layers: Record<string, MaturityRow>;
  stacks: Record<string, MaturityRow>;
}

/** Minimal structural mirror of Zod's discriminated safeParse result. */
interface ParseOk<T> {
  success: true;
  data: T;
}
interface ParseErr {
  success: false;
  error: { issues: ReadonlyArray<{ path: ReadonlyArray<string | number | symbol>; message: string }> };
}
type ParseResult<T> = ParseOk<T> | ParseErr;

function readValidated<T>(file: string, schema: { safeParse(data: unknown): ParseResult<T> }): T {
  const path = resolve(SITE_DIR, file);
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(
      `[hero-copy] cannot read ${path} — run \`node scripts/fetch-framework.mjs\` BEFORE npm ci (R5 ordering). Cause: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((i) => `${i.path.map(String).join('.') || '<root>'}: ${i.message}`)
      .join('; ');
    throw new Error(`[hero-copy] pin file ${file} failed validation (R18): ${detail}`);
  }
  return parsed.data;
}

/** Validated hero copy from the pin. Throws (build fails) on a malformed pin. */
export function getHeroCopy(): HeroCopy {
  // passthrough fields live outside the narrowed interface; the interface is
  // the contract the page actually consumes.
  return readValidated('hero-copy.json', heroCopySchema) as unknown as HeroCopy;
}

/** Validated face-facts maturity block (the §06 stack line's data). */
export function getFaceMaturity(): FaceMaturity {
  const data = readValidated<{ maturity: FaceMaturity }>('face-facts.json', faceFactsSchema);
  return data.maturity;
}
