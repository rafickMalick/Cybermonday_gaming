'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/catalog';
import { fmt, pctOff, r2 } from '@/lib/format';
import { fourX, packInfo, productNudge } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { BundlePicker } from './BundlePicker';
import { Countdown } from './Countdown';
import { StickyAddBar } from './StickyAddBar';
import { StockBar } from './StockBar';
import { Arrow, PayBadges, QtyStepper, TrustGrid } from './ui';
import { ProductVisual } from './ProductVisual';

/** Partie interactive de la fiche : galerie, prix, variantes, pack, ajout, bundle, barre collante mobile */
export function ProductView({ prod }: { prod: Product }) {
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [off, setOff] = useState<Record<string, boolean>>({});
  const [viewers, setViewers] = useState(37);
  const cart = useStore((s) => s.cart);
  const addProduct = useStore((s) => s.addProduct);
  const addPack = useStore((s) => s.addPack);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.25) setViewers((v) => Math.max(18, Math.min(64, v + Math.round(Math.random() * 6 - 3))));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const variantName = prod.variants?.[variant] ?? '';
  const pack = useMemo(() => packInfo(prod, off), [prod, off]);
  const sub = useMemo(() => r2(cart.reduce((a, l) => a + l.unit * l.qty, 0)), [cart]);
  const nudge = productNudge(sub, prod, qty, pack);
  const hasPack = pack.selectedIds.length > 0;
  const onAddPack = () => addPack(pack, variantName);
  const toggle = (id: string) => setOff((o) => ({ ...o, [id]: !o[id] }));

  return (
    <>
      <div className="grid gap-[clamp(24px,4vw,56px)] items-start grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        {/* Galerie */}
        <div className="flex flex-col gap-2">
          <div className="relative border-2 border-divider">
            <ProductVisual code={prod.code} className="aspect-square" codeClass="text-[clamp(80px,14vw,160px)]" />
            <span className="absolute top-0 left-0 bg-accent text-bg font-extrabold text-lg px-3.5 py-2">−{pctOff(prod.old, prod.price)} %</span>
            <span className="absolute left-3.5 bottom-3 text-[11px] tracking-[.1em] text-ink/55">VISUEL PRODUIT 1/4</span>
          </div>
          <div className="grid grid-cols-4 gap-2" aria-hidden>
            {[0, 1, 2, 3].map((i) => <div key={i} className={`aspect-square border-2 bg-surface ${i === 0 ? 'border-accent' : 'border-divider'}`} />)}
          </div>
        </div>

        {/* Achat */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{prod.cat.toUpperCase()}</span>
            <h1 className="text-[clamp(32px,4.5vw,52px)] tracking-[-0.035em] leading-[.98]">{prod.name}</h1>
            <span className="text-[15px] text-ink/70">{prod.short}</span>
            <a href="#desc" className="self-start flex gap-1.5 items-center text-[13px] font-semibold text-accent-400 underline underline-offset-[3px] hover:text-accent">
              Lire la description complète <span className="inline-block animate-bob" aria-hidden>↓</span>
            </a>
            <div className="flex gap-4 flex-wrap items-center text-[13px]">
              <span><span className="text-accent tracking-[2px]" aria-hidden>★★★★★</span> <strong>{String(prod.rating).replace('.', ',')}</strong> · {prod.reviews.toLocaleString('fr-FR')} avis</span>
              <span className="flex items-center gap-1.5 text-accent-400 font-semibold"><span className="w-[7px] h-[7px] bg-accent animate-pulse-slow" aria-hidden />{viewers} joueurs regardent ce produit</span>
            </div>
          </div>

          <div className="border-2 border-accent flex flex-col">
            <div className="flex justify-between items-center gap-2.5 flex-wrap px-3.5 py-2.5 bg-accent/[.14]">
              <span className="text-xs font-extrabold tracking-[.1em] text-accent-400">FLASH DEAL · SE TERMINE DANS</span>
              <Countdown className="font-extrabold text-[22px] leading-none" />
            </div>
            <div className="p-3.5 flex flex-col gap-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-extrabold text-[44px] leading-none tracking-title">{fmt(prod.price)}</span>
                <s className="text-[17px] text-ink/55">{fmt(prod.old)}</s>
                <span className="tag bg-accent text-bg font-extrabold">Tu économises&nbsp;{fmt(prod.old - prod.price)}</span>
              </div>
              <span className="text-[13px] muted">ou <strong className="text-ink">4 × {fmt(fourX(prod.price))}</strong> sans frais par carte</span>
              <StockBar p={prod} size="lg" soldText={`${Math.round((1 - prod.left / prod.total) * 100)} % du stock vendu`} />
            </div>
          </div>

          {prod.variants && (
            <div className="flex flex-col gap-2" role="radiogroup" aria-label={prod.variantTitle}>
              <span className="text-[13px] font-semibold">{prod.variantTitle} : <span className="text-accent-400">{variantName}</span></span>
              <div className="flex gap-2 flex-wrap">
                {prod.variants.map((v, i) => (
                  <button key={v} role="radio" aria-checked={i === variant} onClick={() => setVariant(i)}
                    className={`min-h-[44px] flex items-center px-4 text-sm border-2 ${i === variant ? 'border-accent bg-accent/[.14] font-extrabold' : 'border-divider hover:border-ink'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasPack && (
            <div className="border-2 border-accent bg-accent/10 p-3.5 flex flex-col gap-2.5">
              <span className="text-xs font-extrabold tracking-[.1em] text-accent-400">RECOMMANDÉ · 68 % DES JOUEURS PRENNENT LE PACK</span>
              <span className="font-extrabold text-[15px] text-pretty">{prod.name} + {pack.selectedIds.map((id) => pack.accessories.find((a) => a.id === id)!.name).join(' + ')}</span>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="font-extrabold text-[28px] leading-none">{fmt(pack.price)}</span>
                <s className="text-ink/55">{fmt(pack.full)}</s>
                <span className="font-extrabold text-sm whitespace-nowrap text-accent-400">−{fmt(pack.save)} en plus</span>
              </div>
              <button onClick={onAddPack} className="btn btn-primary animate-glow min-h-[56px] justify-between text-[17px] px-5">Ajouter le pack Setup <Arrow /></button>
            </div>
          )}

          <div className="flex gap-2">
            <QtyStepper qty={qty} onDec={() => setQty((q) => Math.max(1, q - 1))} onInc={() => setQty((q) => Math.min(9, q + 1))} />
            <button onClick={() => addProduct(prod.id, variantName, qty)} className="btn btn-secondary flex-1 min-h-[56px] justify-between text-base px-5">Ajouter seul <span>{fmt(prod.price * qty)}</span></button>
          </div>
          <div className="flex gap-2.5 items-center text-[13px] font-semibold border-2 border-dashed border-divider px-3 py-2.5"><span className="text-accent" aria-hidden>◆</span><span>{nudge}</span></div>

          <TrustGrid variant="product" />
          <PayBadges />
        </div>
      </div>

      <BundlePicker prod={prod} pack={pack} off={off} onToggle={toggle} onAdd={onAddPack} />

      <StickyAddBar
        label={pack.ids.length > 1 ? `Pack Setup · ${pack.ids.length} articles` : prod.name}
        price={pack.price}
        full={pack.full}
        cta={pack.ids.length > 1 ? 'Ajouter le pack' : 'Ajouter'}
        onAdd={onAddPack}
      />
    </>
  );
}
