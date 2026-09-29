'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { fmt, r2 } from '@/lib/format';
import { buildLines, cartCount, computeTotals, totalRows } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { Arrow } from './ui';
import { CartLineRow, CrossSell, TotalRows } from './CartParts';
import { RewardsBar } from './RewardsBar';

/** Tiroir latéral : s'ouvre à chaque ajout au panier */
export function CartDrawer() {
  const open = useStore((s) => s.drawerOpen);
  const close = useStore((s) => s.closeDrawer);
  const cart = useStore((s) => s.cart);
  const prize = useStore((s) => s.prize);
  const pathname = usePathname();

  const lines = useMemo(() => buildLines(cart), [cart]);
  const T = useMemo(() => computeTotals(cart, !!prize, 'std'), [cart, prize]);
  const count = cartCount(cart);

  useEffect(() => { close(); }, [pathname, close]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, close]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Panier">
      <div onClick={close} className="absolute inset-0 bg-black/65 backdrop-blur-[3px] animate-fade" />
      <aside className="relative w-[min(440px,100%)] h-full bg-bg border-l-2 border-accent flex flex-col shadow-neon-drawer animate-slide">
        <div className="flex justify-between items-center px-4 py-3.5 border-b-2 border-divider">
          <span className="font-extrabold text-xl leading-none">Panier <span className="text-accent">({count})</span></span>
          <button onClick={close} className="btn btn-icon !w-11 !h-11" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <RewardsBar sub={T.sub} variant="drawer" />
        <div className="flex-1 overflow-y-auto px-4 flex flex-col">
          {!cart.length && <div className="py-8 font-extrabold">Ton panier est vide.</div>}
          {lines.map((l) => <CartLineRow key={l.key} l={l} variant="drawer" />)}
          <CrossSell cart={cart} variant="drawer" />
        </div>
        <div className="border-t-2 border-divider px-4 py-3.5 flex flex-col gap-1.5 bg-surface">
          <TotalRows rows={totalRows(T)} size="sm" />
          <div className="flex justify-between items-baseline pt-1"><span className="font-extrabold">Total</span><span className="font-extrabold text-[26px] leading-none">{fmt(T.total)}</span></div>
          <span className="text-xs muted">ou 4 × {fmt(r2(T.total / 4))} sans frais</span>
          <Link
            href="/checkout"
            aria-disabled={!cart.length}
            onClick={(e) => { if (!cart.length) e.preventDefault(); }}
            className={`btn btn-primary min-h-[54px] justify-between text-base px-[18px] mt-1.5 ${cart.length ? '' : 'opacity-45 pointer-events-none'}`}
          >
            Passer au paiement <Arrow />
          </Link>
          <Link href="/panier" className="btn btn-ghost min-h-[40px] text-[13px]">Voir le panier détaillé</Link>
        </div>
      </aside>
    </div>
  );
}
