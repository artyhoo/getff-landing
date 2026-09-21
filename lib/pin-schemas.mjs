/**
 * Shared Zod schemas for the pinned framework JSON (R18, S1 BUILD).
 *
 * ONE source for BOTH consumers:
 *   · scripts/check-pin-json.mjs  — the R18 fail-closed gate (plain node)
 *   · lib/hero-copy.ts            — the hero/maturity loaders (TSX, build time)
 *
 * .mjs (not .ts) so the plain-node gate can import it; `allowJs: true` lets
 * the TS side import it. Shapes mirror the pin at the measured schema
 * markers — a pin that changes shape fails BOTH the gate and the build.
 */
import { z } from 'zod';

/** Hero hrefs are internal paths — the FS8 rule also asserts this. */
export const internalHref = z
  .string()
  .refine((s) => s.startsWith('/') && !s.startsWith('//'), 'must be an internal path starting with "/"');

export const heroCopySchema = z
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

export const maturityRowSchema = z
  .object({
    label: z.string().min(1),
    definition: z.string().min(1),
    caveat: z.string().min(1),
    'verified-at': z.string().min(1),
    generation: z.string().min(1).optional(), // present on generated stacks, absent on layers
  })
  .passthrough();

export const faceFactsSchema = z
  .object({
    schema: z.literal('getff.face-facts/v1'),
    maturity: z.object({
      layers: z.record(z.string().min(1), maturityRowSchema),
      stacks: z.record(z.string().min(1), maturityRowSchema),
    }),
  })
  .passthrough();
