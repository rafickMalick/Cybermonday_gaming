'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { fmt, r2 } from '@/lib/format';
import { buildLines, cartCount, computeTotals, totalRows } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { CartLineRow, CrossSell, TotalRows } from '@/components/CartParts';
import { RewardsBar } from '@/components/RewardsBar';
import { Arrow, PayBadges } from '@/components/ui';

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const prize = useStore((s) => s.prize);
  const lines = useMemo(() => buildLines(cart), [cart]);
  const T = useMemo(() => computeTotals(cart, !!prize, 'std'), [cart, prize]);
  const empty = cart.length === 0;

  return (
    <section className="wrap animate-rise py-[clamp(28px,5vw,56px)] flex flex-col gap-6">
      <h1 className="text-[clamp(36px,6vw,64px)] tracking-[-0.04em] leading-[.95] border-b-2 border-divider pb-4">
        Panier <span className="text-accent">({cartCount(cart)})</span>
      </h1>
      <div className="grid gap-[clamp(24px,4vw,48px)] items-start grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))]">
        <div className="flex flex-col gap-6 min-w-0">
          <RewardsBar sub={T.sub} variant="page" />
          {empty && (
            <div className="border-2 border-dashed border-divider p-8 flex flex-col gap-3 items-start">
              <span className="font-extrabold text-[22px] leading-[1.2]">Ton panier est vide.</span>
              <Link href="/deals" className="btn btn-primary min-h-[48px] px-[18px]">Voir les Cyber Deals →</Link>
            </div>
          )}
          <div className="flex flex-col border-t-2 border-divider">
            {lines.map((l) => <CartLineRow key={l.key} l={l} variant="page" />)}
          </div>
          <CrossSell cart={cart} variant="page" />
        </div>

        <aside className="border-2 border-divider p-5 flex flex-col gap-3 bg-surface">
          <h3 className="text-[22px]">Récapitulatif</h3>
          <TotalRows rows={totalRows(T)} size="md" />
          <div className="flex justify-between items-baseline border-t-2 border-divider pt-3"><span className="font-extrabold">Total TTC</span><span className="font-extrabold text-[30px] leading-none">{fmt(T.total)}</span></div>
          <span className="text-[13px] text-accent-400 font-semibold">Tu économises {fmt(T.saved)} aujourd&apos;hui</span>
          <span className="text-[13px] muted">ou <strong className="text-ink">4 × {fmt(r2(T.total / 4))}</strong> sans frais par carte</span>
          <Link
            href="/checkout"
            aria-disabled={empty}
            className={`btn btn-primary min-h-[56px] justify-between text-[17px] px-5 ${empty ? 'opacity-45 pointer-events-none' : ''}`}
          >
            Passer au paiement <Arrow />
          </Link>
          <PayBadges />
          <span className="text-xs text-ink/60">Retours gratuits 30 jours · Garantie 2 ans · Paiement 3D Secure</span>
        </aside>
      </div>
    </section>
  );
}
