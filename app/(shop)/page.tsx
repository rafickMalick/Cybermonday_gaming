import Link from 'next/link';
import { BY_ID, CATALOG } from '@/data/catalog';
import { CATS, REVIEWS } from '@/data/content';
import { fmt, pctOff } from '@/lib/format';
import { CountdownCells } from '@/components/Countdown';
import { ProductCard } from '@/components/ProductCard';
import { ProductVisual } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { StockBar } from '@/components/StockBar';
import { Wheel } from '@/components/Wheel';
import { Arrow, TrustGrid } from '@/components/ui';

export default function HomePage() {
  const hero = BY_ID.m27;
  const featured = CATALOG.filter((p) => p.featured);
  return (
    <>
      {/* HERO */}
      <section className="border-b-2 border-divider grid-bg">
        <div className="wrap py-[clamp(32px,7vw,88px)] grid gap-[clamp(32px,5vw,64px)] items-end grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-extrabold tracking-[.16em] text-accent-400">CYBER MONDAY 2026 · 30.11 — 48 H SEULEMENT</span>
            <h1 className="text-[clamp(52px,10vw,128px)] leading-[.88] tracking-display text-balance">
              LEVEL UP.<br />
              <span className="text-accent" style={{ textShadow: '0 0 32px rgb(236 48 19 / .65)' }}>−50 %</span>
            </h1>
            <p className="text-[clamp(16px,1.6vw,19px)] max-w-[460px] text-ink/80 text-pretty">
              Claviers, souris, casques, écrans et chaises pour joueurs exigeants. Stocks limités, prix qui ne reviendront pas avant l&apos;an prochain.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/deals" className="btn btn-primary animate-glow min-h-[52px] min-w-[240px] justify-between text-base px-5">
                Voir les Cyber Deals <Arrow />
              </Link>
              <a href="#wheel" className="btn btn-secondary min-h-[52px] text-base px-5">Tourner la roue</a>
            </div>
          </div>

          <div className="border-2 border-accent bg-bg shadow-neon-hero">
            <div className="flex justify-between items-center px-4 py-2.5 bg-accent text-bg font-extrabold text-[13px] tracking-[.08em]">
              <span>FLASH DEAL DU JOUR</span><span>−{pctOff(hero.old, hero.price)} %</span>
            </div>
            <div className="relative aspect-video border-b-2 border-divider">
              <ProductVisual code={hero.code} className="w-full h-full" codeClass="text-[clamp(56px,9vw,104px)] neon-text" />
              <span className="absolute left-3 bottom-2.5 text-[11px] tracking-[.1em] text-ink/55">VISUEL PRODUIT · {hero.cat.toUpperCase()}</span>
            </div>
            <div className="p-4 flex flex-col gap-3.5">
              <div>
                <div className="font-extrabold text-xl leading-[1.2]">{hero.name}</div>
                <div className="text-[13px] text-ink/65">{hero.short}</div>
              </div>
              <CountdownCells />
              <StockBar p={hero} size="lg" />
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-extrabold text-[32px] leading-none">{fmt(hero.price)}</span>
                  <s className="text-[15px] text-ink/55">{fmt(hero.old)}</s>
                </div>
                <Link href={`/produit/${hero.id}`} className="btn btn-primary min-h-[48px] px-[18px]">Je le veux →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROUE — juste sous la hero */}
      <Wheel />

      <section className="border-b-2 border-divider"><div className="max-w-[1280px] mx-auto"><TrustGrid variant="strip" /></div></section>

      {/* CATÉGORIES */}
      <Reveal className="wrap py-[clamp(40px,6vw,72px)] flex flex-col gap-6">
        <div className="flex justify-between items-end gap-4 flex-wrap">
          <h2 className="text-[clamp(28px,4vw,44px)] tracking-title">Choisis ton arme</h2>
          <span className="text-[13px] text-ink/60">{CATS.length} catégories · {CATALOG.length} références en promo</span>
        </div>
        <div className="grid gap-[2px] bg-divider border-2 border-divider grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          {CATS.map((c) => (
            <Link key={c.id} href={`/deals?cat=${encodeURIComponent(c.id)}`} className="bg-bg p-5 min-h-[150px] flex flex-col justify-between gap-6 hover:bg-surface">
              <span className="text-xs font-extrabold text-accent-400">{c.n}</span>
              <span className="flex flex-col gap-1">
                <span className="font-extrabold text-2xl leading-none tracking-[-0.02em]">{c.id}</span>
                <span className="text-[13px] text-ink/65">{c.sub}</span>
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* VEDETTES */}
      <Reveal className="border-t-2 border-divider">
        <div className="wrap py-[clamp(40px,6vw,72px)] flex flex-col gap-6">
          <div className="flex justify-between items-end gap-4 flex-wrap">
            <div>
              <span className="eyebrow">EN VEDETTE</span>
              <h2 className="text-[clamp(28px,4vw,44px)] tracking-title mt-1">Les deals qui partent le plus vite</h2>
            </div>
            <Link href="/deals" className="btn btn-ghost min-h-[44px]">Tous les deals →</Link>
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))]">
            {featured.map((p) => <ProductCard key={p.id} p={p} variant="featured" />)}
          </div>
        </div>
      </Reveal>

      {/* AVIS */}
      <Reveal className="border-t-2 border-divider">
        <div className="wrap py-[clamp(40px,6vw,72px)] flex flex-col gap-6">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="font-extrabold text-[clamp(44px,7vw,80px)] leading-none tracking-[-0.04em] text-accent" style={{ textShadow: '0 0 28px rgb(236 48 19 / .5)' }}>12 480</span>
            <span className="text-[17px] max-w-[360px]">joueurs se sont équipés ce week-end. Note moyenne <strong>4,8/5</strong> sur 9 312 avis vérifiés.</span>
          </div>
          <div className="grid gap-[2px] bg-divider border-2 border-divider grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="bg-bg p-5 flex flex-col gap-3 m-0">
                <span className="text-accent tracking-[2px]" aria-label="5 étoiles sur 5">★★★★★</span>
                <blockquote className="m-0 text-[15px] text-pretty">« {r.text} »</blockquote>
                <figcaption className="mt-auto text-xs text-ink/60"><strong className="text-ink">{r.name}</strong> · {r.meta}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
