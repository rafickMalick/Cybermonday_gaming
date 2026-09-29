'use client';

import { useEffect, useRef } from 'react';

/** Apparition au scroll pour les sections sous la ligne de flottaison (désactivée avec prefers-reduced-motion). */
export function Reveal({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1)';
        el.style.opacity = '1';
        el.style.transform = 'none';
        io.disconnect();
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <section id={id} ref={ref} className={className}>{children}</section>;
}
