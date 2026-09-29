'use client';

import type { Product } from '@/data/catalog';
import { fmt } from '@/lib/format';
import type { PackInfo } from '@/lib/pricing';
import { Arrow } from './ui';
import { ProductImg } from './ProductVisual';

/** « Complete Your Setup » : sélection des accessoires, −10 % sur tout le pack */
export function BundlePicker({ prod, pack, off, onToggle, onAdd }: { prod: Product; pack: PackInfo; off: Record<string, boolean>; onToggle: (id: string) => void; onAdd: () => void }) {
  return (
    <div className="border-2 border-divider">
      <div className="flex justify-between items-end gap-3 flex-wrap p-[clamp(16px,3vw,28px)] border-b-2 border-divider">
        <div>
          <span className="eyebrow">BUNDLE · −10 % SUR LE PACK</span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] mt-1 tracking-title">Complete Your Setup</h2>
        </div>
        <span className="text-[13px] muted">Sélectionne tes accessoires, la remise s&apos;applique à tout le pack.</span>
      </div>
      <div className="grid gap-[2px] bg-divider grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]">
        <div className="bg-bg p-4 flex flex-col gap-2.5">
          <div className="aspect-[16/10] flex items-center justify-center bg-surface font-extrabold text-4xl leading-none text-accent"><ProductImg code={prod.code} /></div>
          <span className="text-[11px] tracking-[.1em] text-accent-400 font-extrabold">CE PRODUIT</span>
          <span className="font-extrabold text-[15px]">{prod.name}</span>
          <span className="font-extrabold">{fmt(prod.price)}</span>
        </div>
        {pack.accessories.map((a) => {
          const on = !off[a.id];
          return (
            <button key={a.id} onClick={() => onToggle(a.id)} role="checkbox" aria-checked={on} className={`bg-bg p-4 flex flex-col gap-2.5 ${on ? '' : 'opacity-50'}`}>
              <div className="relative aspect-[16/10] flex items-center justify-center bg-surface font-extrabold text-4xl leading-none text-accent">
                <ProductImg code={a.code} />
                <span className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center border-2 text-bg text-sm ${on ? 'border-accent bg-accent' : 'border-divider bg-transparent'}`} aria-hidden>{on ? '✓' : ''}</span>
              </div>
              <span className="text-[11px] tracking-[.1em] text-ink/60 font-extrabold">+ {a.cat.toUpperCase()}</span>
              <span className="font-extrabold text-[15px]">{a.name}</span>
              <span className="flex gap-2 items-baseline"><span className="font-extrabold">{fmt(a.price)}</span><s className="text-xs text-ink/55">{fmt(a.old)}</s></span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center gap-4 flex-wrap p-[clamp(16px,3vw,28px)] border-t-2 border-divider bg-surface">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] text-ink/70">Prix du pack ({pack.ids.length} articles)</span>
          <span className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-extrabold text-[32px] leading-none">{fmt(pack.price)}</span>
            <s className="text-ink/55">{fmt(pack.full)}</s>
            <span className="font-extrabold text-accent-400 text-sm">−{fmt(pack.save)}</span>
          </span>
        </div>
        <button onClick={onAdd} className="btn btn-primary min-h-[52px] min-w-[min(100%,280px)] justify-between text-base px-5">Ajouter le pack <Arrow /></button>
      </div>
    </div>
  );
}
