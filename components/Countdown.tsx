'use client';

import { flashRemaining, useNow } from '@/hooks/useNow';
import { pad2 } from '@/lib/format';

export function useFlash() {
  const now = useNow();
  if (now == null) return { hh: '--', mm: '--', ss: '--' };
  const rem = flashRemaining(now);
  return {
    hh: pad2(Math.floor(rem / 3600e3)),
    mm: pad2(Math.floor(rem / 60e3) % 60),
    ss: pad2(Math.floor(rem / 1000) % 60),
  };
}

/** hh:mm:ss en ligne */
export function Countdown({ className = '' }: { className?: string }) {
  const { hh, mm, ss } = useFlash();
  return (
    <span className={className} suppressHydrationWarning>
      {hh}:{mm}:{ss}
    </span>
  );
}

/** Trois cellules HEURES / MINUTES / SECONDES (hero) : la seconde « tick » à chaque changement */
export function CountdownCells() {
  const { hh, mm, ss } = useFlash();
  const cell = 'bg-bg px-2.5 py-2';
  const num = 'font-extrabold text-[30px] leading-none';
  const lab = 'text-[10px] tracking-[.12em] text-ink/60';
  return (
    <div className="grid grid-cols-3 gap-[2px] bg-divider border-2 border-divider">
      <div className={cell}><div className={num}>{hh}</div><div className={lab}>HEURES</div></div>
      <div className={cell}><div className={num}>{mm}</div><div className={lab}>MINUTES</div></div>
      <div className={cell}>
        <div key={ss} className={`${num} text-accent animate-tick`}>{ss}</div>
        <div className={lab}>SECONDES</div>
      </div>
    </div>
  );
}
