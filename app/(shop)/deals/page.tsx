import type { Metadata } from 'next';
import Link from 'next/link';
import { CATALOG } from '@/data/catalog';
import { DEAL_FILTERS } from '@/data/content';
import { Countdown } from '@/components/Countdown';
import { dealsHref } from '@/data/content';
import { ProductCard } from '@/components/ProductCard';

export const metadata: Metadata = { title: 'Cyber Deals' };

export default function DealsPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = DEAL_FILTERS.includes(searchParams.cat ?? '') ? (searchParams.cat as string) : 'Tous';
  const list = CATALOG.filter((p) => cat === 'Tous' || p.cat === cat);
  return (
    <section className="wrap animate-rise py-[clamp(28px,5vw,56px)] flex flex-col gap-6">
      <div className="flex justify-between items-end gap-4 flex-wrap border-b-2 border-divider pb-5">
        <div>
          <span className="eyebrow">CYBER MONDAY · {list.length} RÉFÉRENCES</span>
          <h1 className="text-[clamp(40px,7vw,80px)] mt-1 tracking-display leading-[.9]">Cyber Deals</h1>
        </div>
        <div className="flex items-center gap-2.5 border-2 border-accent px-3.5 py-2">
          <span className="w-2 h-2 bg-accent animate-pulse" aria-hidden />
          <span className="text-xs font-semibold">Fin des prix flash dans</span>
          <Countdown className="font-extrabold text-xl leading-none" />
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto no-scrollbar" aria-label="Filtres">
        {DEAL_FILTERS.map((f) => (
          <Link
            key={f}
            href={dealsHref(f)}
            aria-current={f === cat ? 'true' : undefined}
            className={`whitespace-nowrap text-sm ${f === cat ? 'px-4 py-2.5 font-extrabold bg-accent text-bg' : 'px-3.5 py-2 font-semibold border-2 border-divider hover:border-accent'}`}
          >
            {f}
          </Link>
        ))}
      </nav>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))]">
        {list.map((p) => <ProductCard key={p.id} p={p} variant="deal" />)}
      </div>
    </section>
  );
}
