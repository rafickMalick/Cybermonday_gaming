'use client';

import Link from 'next/link';
import type { Product } from '@/data/catalog';
import { fmt, pctOff } from '@/lib/format';
import { fourX, isLowStock } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { ProductVisual } from './ProductVisual';
import { StockBar } from './StockBar';

export function ProductCard({ p, variant }: { p: Product; variant: 'featured' | 'deal' }) {
  const addProduct = useStore((s) => s.addProduct);
  const href = `/produit/${p.id}`;
  return (
    <article className={`border-2 border-divider flex flex-col transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-neon-card ${variant === 'featured' ? 'bg-bg' : ''}`}>
      <Link href={href} className="relative block" aria-label={p.name}>
        <ProductVisual code={p.code} className="aspect-[4/3]" codeClass="text-[56px]" />
        <span className="absolute top-0 left-0 bg-accent text-bg font-extrabold text-sm px-2.5 py-1.5">−{pctOff(p.old, p.price)} %</span>
        {variant === 'deal' && isLowStock(p) && (
          <span className="absolute top-0 right-0 bg-ink text-bg font-extrabold text-[11px] tracking-[.06em] px-2.5 py-[7px]">STOCK LIMITÉ</span>
        )}
      </Link>
      <div className="p-3.5 flex flex-col gap-2.5 flex-1">
        <div className="text-[11px] tracking-[.1em] text-ink/60">
          {p.cat.toUpperCase()} · <span className="text-accent-400">★ {String(p.rating).replace('.', ',')}</span> ({p.reviews.toLocaleString('fr-FR')})
        </div>
        <Link href={href} className="font-extrabold text-[17px] leading-[1.2] hover:text-accent-400">{p.name}</Link>
        {variant === 'deal' && <span className="text-[13px] muted">{p.short}</span>}
        <div className="mt-auto"><StockBar p={p} /></div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-extrabold text-[22px] leading-none">{fmt(p.price)}</span>
            <s className="text-[13px] text-ink/55">{fmt(p.old)}</s>
            {p.price >= 100 && <span className="text-[11px] mt-0.5 muted">ou 4 × {fmt(fourX(p.price))} sans frais</span>}
          </div>
          <button onClick={() => addProduct(p.id, p.variants?.[0] ?? '', 1)} className="btn btn-primary min-h-[44px] px-3.5">Ajouter +</button>
        </div>
      </div>
    </article>
  );
}
