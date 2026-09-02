'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Copy button for a terminal block: copies the command text
 * (data-copy-text spans) of the nearest .term. Ported from the
 * inline <script> in src/pages/index.astro.
 */
export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    const term = e.currentTarget.closest('.term');
    if (!term) return;
    const text = Array.from(term.querySelectorAll<HTMLElement>('[data-copy-text]'))
      .map((el) => el.textContent)
      .join('\n')
      .trim();
    let ok = false;
    try {
      // Race a timeout: some embedded contexts leave writeText pending forever.
      ok = await Promise.race([
        navigator.clipboard.writeText(text).then(
          () => true,
          () => false,
        ),
        new Promise<boolean>((r) => setTimeout(() => r(false), 500)),
      ]);
    } catch {
      ok = false;
    }
    if (!ok) {
      // Fallback for contexts where the async clipboard API is unavailable.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }
  }, []);

  return (
    <button className={copied ? 'term-copy copied' : 'term-copy'} type="button" onClick={onClick}>
      {copied ? 'copied' : 'copy'}
    </button>
  );
}
