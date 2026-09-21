/**
 * check-pin-json.mjs — the R18 Zod backstop over the fetched pin (S1 BUILD).
 *
 * The landing build consumes `docs/site/**` from `.framework/` (fetched by
 * scripts/fetch-framework.mjs from the SHA `framework.pin` resolves to). This
 * gate makes a malformed pin a RED build instead of a silently wrong page:
 *
 *   1. `docs/site/hero-copy.json`    — Zod, marker `getff-hero-copy/1`
 *   2. `docs/site/face-facts.json`   — Zod, marker `getff.face-facts/v1`
 *      (maturity.layers + maturity.stacks rows)
 *   3. `docs/site/reference/<F>.json` — validated against the PIN'S OWN
 *      `reference/schema/<F>.schema.json` (draft-07 subset validator below —
 *      zero extra deps, no hand-copied Zod mirror, so the schemas cannot drift
 *      from the data; P-AB). The subset covers every keyword the pin's eleven
 *      schemas use (measured 2026-09-21): type, properties, required,
 *      additionalProperties, items, const, enum, anyOf, oneOf, minLength,
 *      minItems, minimum.
 *
 * Fail-closed: a missing file, a wrong `schema` marker or a missing required
 * field exits non-zero and NAMES the file and the failing path — never a bare
 * exit code. Logging: one INFO line per artefact (file, schema, row/member
 * count); LOG_LEVEL=debug adds per-issue detail.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const SITE = process.env.FRAMEWORK_DIR ? resolve(process.env.FRAMEWORK_DIR, 'docs/site') : resolve(REPO_ROOT, '.framework', 'docs', 'site');
const DEBUG = process.env.LOG_LEVEL === 'debug';

const issues = [];
let checked = 0;
let familyCount = 0;
const info = (msg) => console.log(`[check-pin-json] ${msg}`);
const fail = (file, msg) => issues.push(`${file}: ${msg}`);

/** Internal-path assertion for hero hrefs (the FS8 hero rule asserts this too). */
const internalHref = z.string().refine((s) => s.startsWith('/') && !s.startsWith('//'), 'must be an internal path starting with "/"');

// ── 1. hero-copy.json ────────────────────────────────────────────────────────
const heroCopySchema = z
  .object({
    schema: z.literal('getff-hero-copy/1'),
    cta: z.object({
      primary: z.object({ label: z.string().min(1), href: internalHref }),
      secondary: z.object({ label: z.string().min(1), href: internalHref }),
    }),
    agentLine: z.object({ text: z.string().min(1), copyValue: z.string().min(1) }),
    howItWorksLink: z.object({
      section: z.string().min(1),
      step: z.number().int().positive(),
      label: z.string().min(1),
      href: internalHref,
    }),
    install: z.object({
      section: z.string().min(1),
      oneCommand: z.object({ heading: z.string().min(1), body: z.string().min(1), command: z.string().min(1) }),
      plugin: z.object({ heading: z.string().min(1), body: z.string().min(1), commands: z.array(z.string().min(1)).min(1) }),
      more: z.object({ label: z.string().min(1), href: internalHref }),
    }),
    feelIt: z.object({
      section: z.string().min(1),
      agentsMdLink: z.object({ label: z.string().min(1) }),
    }),
    limits: z.object({
      section: z.string().min(1),
      handWritten: z.array(z.string().min(1)).min(1),
    }),
  })
  .passthrough(); // forward-compat: added fields flow through; removals fail closed

// ── 2. face-facts.json (the maturity block the hero §06 line renders) ───────
const maturityRow = z
  .object({
    label: z.string().min(1),
    definition: z.string().min(1),
    caveat: z.string().min(1),
    'verified-at': z.string().min(1),
    generation: z.string().min(1).optional(), // present on generated stacks, absent on layers
  })
  .passthrough();
const faceFactsSchema = z
  .object({
    schema: z.literal('getff.face-facts/v1'),
    maturity: z.object({
      layers: z.record(z.string().min(1), maturityRow),
      stacks: z.record(z.string().min(1), maturityRow),
    }),
  })
  .passthrough();

/** Parse + validate one JSON artefact against a Zod schema; count rows. */
function zodCheck(relPath, schema, schemaMarker, countRows) {
  const abs = resolve(SITE, relPath);
  if (!existsSync(abs)) return fail(relPath, 'FILE MISSING — run `node scripts/fetch-framework.mjs` first (R5: before npm ci)');
  let raw;
  try {
    raw = JSON.parse(readFileSync(abs, 'utf8'));
  } catch (err) {
    return fail(relPath, `not valid JSON: ${err.message}`);
  }
  if (schemaMarker && raw.schema !== schemaMarker) {
    return fail(relPath, `wrong schema marker: expected "${schemaMarker}", got ${JSON.stringify(raw.schema)}`);
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    for (const iss of parsed.error.issues) {
      fail(relPath, `at ${iss.path.join('.') || '<root>'}: ${iss.message}`);
    }
    return;
  }
  checked++;
  info(`${relPath} — ${schemaMarker} — ${countRows(parsed.data)}`);
}

// ── 3. draft-07 subset validator for the pin's own reference schemas ─────────
const JSON_TYPES = { object: 'object', array: 'array', string: 'string', boolean: 'boolean', null: 'null' };
const isNum = (t) => t === 'number' || t === 'integer';

/** Validate `data` against one schema node; push human-readable path'd errors. */
function validateNode(node, data, path, file, errs) {
  if (node === true || node === undefined) return true;
  if (node === false) { errs.push(`${path || '<root>'}: schema forbids any value`); return false; }
  if (Array.isArray(node.anyOf) && !node.anyOf.some((s) => validateNode(s, data, path, file, []))) {
    errs.push(`${path || '<root>'}: matched none of anyOf`);
    return false;
  }
  if (Array.isArray(node.oneOf)) {
    const matches = node.oneOf.filter((s) => validateNode(s, data, path, file, [])).length;
    if (matches !== 1) { errs.push(`${path || '<root>'}: matched ${matches} of oneOf (need exactly 1)`); return false; }
    return true;
  }
  const type = node.type;
  const actual = Array.isArray(data) ? 'array' : data === null ? 'null' : typeof data;
  if (type) {
    const ok = Array.isArray(type) ? type.some((t) => (isNum(t) ? isNum(t) && actual === 'number' : actual === JSON_TYPES[t])) : isNum(type) ? actual === 'number' && (type !== 'integer' || Number.isInteger(data)) : actual === JSON_TYPES[type];
    if (!ok) { errs.push(`${path || '<root>'}: expected type ${JSON.stringify(type)}, got ${actual}`); return false; }
  }
  if (node.const !== undefined && JSON.stringify(data) !== JSON.stringify(node.const)) {
    errs.push(`${path || '<root>'}: expected const ${JSON.stringify(node.const)}, got ${JSON.stringify(data)}`);
  }
  if (Array.isArray(node.enum) && !node.enum.some((v) => JSON.stringify(v) === JSON.stringify(data))) {
    errs.push(`${path || '<root>'}: ${JSON.stringify(data)} not in enum ${JSON.stringify(node.enum)}`);
  }
  if (typeof data === 'string') {
    if (typeof node.minLength === 'number' && data.length < node.minLength) errs.push(`${path || '<root>'}: shorter than minLength ${node.minLength}`);
  }
  if (typeof data === 'number') {
    if (typeof node.minimum === 'number' && data < node.minimum) errs.push(`${path || '<root>'}: below minimum ${node.minimum}`);
  }
  if (Array.isArray(data)) {
    if (typeof node.minItems === 'number' && data.length < node.minItems) errs.push(`${path || '<root>'}: fewer than minItems ${node.minItems}`);
    if (node.items) data.forEach((item, i) => validateNode(node.items, item, `${path}[${i}]`, file, errs));
  }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const req of node.required ?? []) {
      if (!(req in data)) errs.push(`${path || '<root>'}: missing required property "${req}"`);
    }
    for (const [key, sub] of Object.entries(node.properties ?? {})) {
      if (key in data) validateNode(sub, data[key], path ? `${path}.${key}` : key, file, errs);
    }
    if (node.additionalProperties === false) {
      for (const key of Object.keys(data)) {
        if (!(node.properties ?? {})[key]) errs.push(`${path || '<root>'}: unexpected property "${key}" (additionalProperties: false)`);
      }
    }
  }
  return errs.length === 0;
}

/** Validate one reference family against the pin's own schema file. */
function referenceCheck(jsonName) {
  const relJson = `reference/${jsonName}`;
  const relSchema = `reference/schema/${jsonName.replace(/\.json$/, '.schema.json')}`;
  const jsonPath = resolve(SITE, relJson);
  const schemaPath = resolve(SITE, relSchema);
  if (!existsSync(schemaPath)) return fail(relJson, `pin carries no schema for it (expected ${relSchema}) — refusing to hand-mirror (P-AB)`);
  if (!existsSync(jsonPath)) return fail(relJson, 'FILE MISSING — run `node scripts/fetch-framework.mjs` first');
  let data;
  let schema;
  try {
    data = JSON.parse(readFileSync(jsonPath, 'utf8'));
    schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  } catch (err) {
    return fail(relJson, `not valid JSON: ${err.message}`);
  }
  const errs = [];
  validateNode(schema, data, '', relJson, errs);
  if (errs.length) {
    for (const e of errs.slice(0, DEBUG ? errs.length : 5)) fail(relJson, e);
    if (!DEBUG && errs.length > 5) fail(relJson, `…and ${errs.length - 5} more (LOG_LEVEL=debug to see all)`);
    return;
  }
  checked++;
  info(`${relJson} — ${data.schemaVersion} — family ${data.family} "${data.familyName}" — ${data.members.length} members`);
}

// ── Run ──────────────────────────────────────────────────────────────────────
if (!existsSync(SITE)) {
  fail('docs/site', 'the fetched pin tree is absent — run `node scripts/fetch-framework.mjs` BEFORE npm ci (R5 ordering)');
} else {
  zodCheck('hero-copy.json', heroCopySchema, 'getff-hero-copy/1', () => 'hero copy block');
  zodCheck(
    'face-facts.json',
    faceFactsSchema,
    'getff.face-facts/v1',
    (d) => `${Object.keys(d.maturity.layers).length} layers + ${Object.keys(d.maturity.stacks).length} stacks`,
  );
  const families = existsSync(resolve(SITE, 'reference'))
    ? readdirSync(resolve(SITE, 'reference')).filter((f) => f.endsWith('.json'))
    : [];
  if (families.length === 0) fail('reference/', 'no reference family JSONs found in the pin');
  familyCount = families.length;
  for (const f of families.sort()) referenceCheck(f);
}

if (issues.length) {
  console.error(`\n[check-pin-json] FAIL — ${issues.length} issue(s) in the fetched pin:`);
  for (const i of issues) console.error(`  ✗ ${i}`);
  console.error('[check-pin-json] A malformed pin must never reach the build (R18 backstop).');
  process.exit(1);
}
console.log(`[check-pin-json] PASS — ${checked} artefacts validated against the pin (hero-copy, face-facts, ${familyCount} reference families)`);
