'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { NAV_LINKS, dealsHref } from '@/data/content';
import { cartCount } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { Logo } from './Logo';


export function Header() {
  const pathname = usePathname();
  const cat = useSearchParams().get('cat') ?? 'Tous';
  const count = useStore((s) => cartCount(s.cart));
  const pulse = useStore((s) => s.pulse);
  const openDrawer = useStore((s) => s.openDrawer);

  return (
    <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur-sm border-b-2 border-divider">
      <div className="wrap py-3 flex flex-wrap items-center gap-4">
        <Link href="/" className="flex items-baseline gap-1.5 mr-auto" aria-label="OVRCLK //GEAR — accueil">
          <Logo glow />
          <span className="text-[10px] tracking-[.14em] text-ink/60">{"//GEAR"}</span>
        </Link>
        <button onClick={openDrawer} className="btn btn-secondary min-h-[44px] gap-2.5" aria-label={`Ouvrir le panier, ${count} article${count > 1 ? 's' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Panier
          <span key={pulse} className={`inline-block bg-accent text-bg min-w-[22px] px-1.5 py-0.5 text-xs text-center ${pulse ? 'animate-bump' : ''}`}>{count}</span>
        </button>
        <nav className="basis-full flex gap-1 overflow-x-auto no-scrollbar whitespace-nowrap -mx-2" aria-label="Catégories">
          {NAV_LINKS.map((n) => {
            const active = pathname === '/deals' && cat === n.cat;
            return (
              <Link key={n.cat} href={dealsHref(n.cat)} className={`px-2 py-1.5 text-sm font-semibold hover:text-accent ${active ? 'text-accent' : 'text-ink'}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
