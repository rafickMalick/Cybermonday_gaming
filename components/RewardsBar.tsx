'use client';

import { MILESTONE_LABELS } from '@/data/content';
import { rewardMessage } from '@/lib/pricing';

export function RewardsBar({ sub, variant }: { sub: number; variant: 'page' | 'drawer' }) {
  const isPage = variant === 'page';
  const ms = MILESTONE_LABELS.map(([at, label]) => ({ at, label, ok: sub >= at }));
  return (
    <div className={isPage ? 'border-2 border-divider p-4 flex flex-col gap-3' : 'px-4 py-3.5 border-b-2 border-divider flex flex-col gap-2 bg-surface'}>
      <div className={`flex justify-between gap-2 ${isPage ? 'flex-wrap' : 'text-xs'}`}>
        <span className={`font-extrabold text-accent-400 ${isPage ? 'text-xs tracking-[.12em]' : 'tracking-[.1em]'}`}>XP RÉCOMPENSES</span>
        <span className={`font-semibold ${isPage ? 'text-[13px]' : ''}`}>{rewardMessage(sub)}</span>
      </div>
      <div className={`relative ${isPage ? 'h-2.5 bg-surface' : 'h-2 bg-bg'}`} role="progressbar" aria-valuemin={0} aria-valuemax={349} aria-valuenow={Math.min(349, Math.round(sub))}>
        <div className={`h-full bg-accent transition-[width] duration-500 ${isPage ? 'shadow-neon-bar-lg' : 'shadow-neon-bar'}`} style={{ width: `${Math.min(100, sub / 5)}%` }} />
      </div>
      <div className={`grid grid-cols-3 ${isPage ? 'gap-2' : 'gap-1.5'}`}>
        {ms.map((m) => (
          <div key={m.at} className={`flex flex-col ${isPage ? 'gap-0.5 text-xs' : 'text-[11px]'} ${m.ok ? '' : 'opacity-60'}`}>
            <span className={`font-extrabold ${m.ok ? 'text-accent' : 'text-ink'}`}>{m.ok ? '✓' : '◆'} {m.at} €</span>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
