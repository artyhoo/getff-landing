/**
 * MaturityStackLine — the §06 «Honest limits» stack line (D28 §5.9, S1 BUILD).
 *
 * A build-time SERVER component rendering the stack maturity labels and
 * caveats from the PINNED face-facts.json (lib/hero-copy.ts). NOT a fence
 * region — the fence engine parses HTML comments only and cannot host a
 * region in TSX (face.md §5.9). The stack words therefore appear in this
 * file only as DATA read from the pin at build time — none are literals
 * here, which is what the FS8 guard (scripts/check-hero-fs8.mjs) asserts.
 *
 * `handWritten` bullets (executable-AGENTS.md-today, license) stay
 * hand-written in page.tsx — they are §5.9-untouched copy.
 */
import { getFaceMaturity } from '@/lib/hero-copy';

export function MaturityStackLine() {
  const stacks = getFaceMaturity().stacks;
  const entries = Object.entries(stacks);

  return (
    <li>
      <span>
        Stacks today, each with its live maturity label from the framework:
        <ul className="stack-maturity">
          {entries.map(([stack, row]) => (
            <li key={stack}>
              <strong>{stack}</strong> — <span className="badge">{row.label}</span>{' '}
              {row.caveat} <span className="c-comment">(verified {row['verified-at']})</span>
            </li>
          ))}
        </ul>
      </span>
    </li>
  );
}

export default MaturityStackLine;
