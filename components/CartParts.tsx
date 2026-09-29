'use client';

import { fmt } from '@/lib/format';
import { buildCross, type LineView, type TotalRow } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { QtyStepper } from './ui';
import { ProductImg } from './ProductVisual';

export function CartLineRow({ l, variant }: { l: LineView; variant: 'page' | 'drawer' }) {
  const setQty = useStore((s) => s.setQty);
  const page = variant === 'page';
  return (
    <div className={page ? 'grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-4 border-b-2 border-divider' : 'grid grid-cols-[64px_minmax(0,1fr)] gap-3 py-3.5 border-b border-divider'}>
      <div className={`aspect-square flex items-center justify-center bg-surface font-extrabold leading-none text-accent ${page ? 'text-[22px]' : 'text-[15px]'}`}><ProductImg code={l.code} /></div>
      <div className={`flex flex-col min-w-0 ${page ? 'gap-2' : 'gap-1.5'}`}>
        <div className={`flex justify-between ${page ? 'gap-3' : 'gap-2'}`}>
          <span className={`font-extrabold ${page ? 'text-base' : 'text-sm'}`}>{l.name}</span>
          <span className={`font-extrabold whitespace-nowrap ${page ? 'text-lg leading-[1.2]' : ''}`}>{fmt(l.total)}</span>
        </div>
        <span className={`text-accent-400 ${page ? 'text-[13px]' : 'text-xs'}`}>{l.meta}</span>
        <div className="flex justify-between items-center">
          <QtyStepper size={page ? 'md' : 'sm'} qty={l.qty} onDec={() => setQty(l.key, -1)} onInc={() => setQty(l.key, 1)} />
          <button onClick={() => setQty(l.key, -999)} className={`btn btn-ghost ${page ? 'min-h-[40px] text-[13px]' : 'text-xs min-h-[36px]'}`}>Retirer</button>
        </div>
      </div>
    </div>
  );
}

/** « Complete Your Setup » (−10 %) — grille sur /panier, liste dans le tiroir */
export function CrossSell({ cart, variant, onAdded }: { cart: Parameters<typeof buildCross>[0]; variant: 'page' | 'drawer'; onAdded?: () => void }) {
  const addCross = useStore((s) => s.addCross);
  const cross = buildCross(cart);
  if (!cross.length) return null;
  const add = (id: string) => { addCross(id, variant === 'drawer'); onAdded?.(); };
  if (variant === 'drawer')
    return (
      <div className="py-4 flex flex-col gap-2.5">
        <span className="text-xs font-extrabold tracking-[.1em] text-accent-400">COMPLETE YOUR SETUP · −10 %</span>
        {cross.map(({ p, pack }) => (
          <div key={p.id} className="grid grid-cols-[48px_minmax(0,1fr)_auto] gap-2.5 items-center border-2 border-divider p-2">
            <div className="aspect-square flex items-center justify-center bg-surface font-extrabold text-xs leading-none text-accent"><ProductImg code={p.code} /></div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-[13px]">{p.name}</span>
              <span className="text-xs"><strong>{fmt(pack)}</strong> <s className="text-ink/55">{fmt(p.price)}</s></span>
            </div>
            <button onClick={() => add(p.id)} className="btn btn-secondary min-h-[44px] min-w-[44px] px-3 justify-center" aria-label={`Ajouter ${p.name} au setup`}>+</button>
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="eyebrow">−10 % SUPPLÉMENTAIRES</span>
        <h3 className="mt-0.5 text-2xl">Complete Your Setup</h3>
      </div>
      <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(min(100%,180px),1fr))]">
        {cross.map(({ p, pack }) => (
          <div key={p.id} className="border-2 border-divider p-3 flex flex-col gap-2">
            <div className="aspect-[16/10] flex items-center justify-center bg-surface font-extrabold text-[28px] leading-none text-accent"><ProductImg code={p.code} /></div>
            <span className="font-extrabold text-sm">{p.name}</span>
            <span className="flex gap-2 items-baseline"><span className="font-extrabold">{fmt(pack)}</span><s className="text-xs text-ink/55">{fmt(p.price)}</s></span>
            <button onClick={() => add(p.id)} className="btn btn-secondary min-h-[44px]">+ Ajouter au setup</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TotalRows({ rows, size }: { rows: TotalRow[]; size: 'sm' | 'md' }) {
  return (
    <>
      {rows.map((r) => (
        <div key={r.label} className={`flex justify-between gap-3 ${size === 'md' ? 'text-sm' : 'text-[13px]'} ${r.accent ? 'text-accent-400' : ''}`}>
          <span>{r.label}</span><span className="font-semibold">{r.value}</span>
        </div>
      ))}
    </>
  );
}
