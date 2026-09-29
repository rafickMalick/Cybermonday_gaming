'use client';

import { fmt } from '@/lib/format';

/** Barre d'ajout collante — mobile uniquement (< 760 px), fiche produit */
export function StickyAddBar({ label, price, full, cta, onAdd }: { label: string; price: number; full: number; cta: string; onAdd: () => void }) {
  return (
    <>
      <div className="h-20 min-[760px]:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-30 bg-bg border-t-2 border-accent px-4 py-2.5 flex gap-3 items-center min-[760px]:hidden">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-accent-400">{label}</span>
          <span className="flex gap-2 items-baseline">
            <span className="font-extrabold text-xl leading-none">{fmt(price)}</span>
            {full !== price && <s className="text-xs text-ink/55">{fmt(full)}</s>}
          </span>
        </div>
        <button onClick={onAdd} className="btn btn-primary min-h-[48px] px-4">{cta} →</button>
      </div>
    </>
  );
}
