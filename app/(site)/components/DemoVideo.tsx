'use client';

import { useEffect, useRef } from 'react';

/**
 * Demo video in terminal chrome, honouring prefers-reduced-motion —
 * stop the loop, leave the poster/frame. Ported from the inline
 * <script> in src/pages/index.astro.
 */
export function DemoVideo({
  title,
  poster,
  src,
  label,
  children,
}: {
  title: string;
  poster: string;
  src: string;
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => {
      if (reduce.matches) {
        video.pause();
        video.removeAttribute('autoplay');
      } else {
        video.play().catch(() => {});
      }
    };
    applyMotion();
    reduce.addEventListener('change', applyMotion);
    return () => reduce.removeEventListener('change', applyMotion);
  }, []);

  return (
    <figure className="demo">
      <div className="term">
        <div className="term-bar">
          <span className="term-dots"><i></i><i></i><i></i></span>
          <span className="term-title">{title}</span>
        </div>
        <video
          ref={ref}
          className="demo-video"
          width="1200"
          height="600"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption>{children}</figcaption>
    </figure>
  );
}
