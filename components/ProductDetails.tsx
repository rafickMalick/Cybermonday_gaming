import type { Product } from '@/data/catalog';
import { RATING_BARS, REVIEWS } from '@/data/content';
import { Reveal } from './Reveal';

export function ProductDetails({ prod }: { prod: Product }) {
  return (
    <>
      <Reveal id="desc" className="scroll-mt-32 grid gap-[clamp(24px,4vw,56px)] border-t-2 border-divider pt-[clamp(24px,4vw,40px)] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <div className="flex flex-col gap-3.5">
          <span className="eyebrow">DESCRIPTION</span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] tracking-title leading-none text-balance">{prod.tagline}</h2>
          {prod.desc.map((para) => <p key={para} className="text-base leading-[1.65] max-w-[62ch] text-ink/80 text-pretty">{para}</p>)}
        </div>
        <div className="grid gap-[2px] bg-divider border-2 border-divider self-start">
          {prod.highlights.map((h, i) => (
            <div key={h.t} className="bg-bg p-[18px] grid grid-cols-[40px_minmax(0,1fr)] gap-3">
              <span className="font-extrabold text-lg leading-[1.3] text-accent">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-extrabold text-base">{h.t}</span>
                <span className="text-sm text-ink/70 text-pretty">{h.d}</span>
              </div>
            </div>
          ))}
          <div className="bg-surface px-[18px] py-3.5 text-[13px]"><strong>Dans la boîte :</strong> {prod.box}</div>
        </div>
      </Reveal>

      <Reveal className="grid gap-[clamp(24px,4vw,56px)] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl">Caractéristiques</h3>
          <table className="table-specs">
            <tbody>
              {prod.specs.map(([k, v]) => (
                <tr key={k}><td className="text-ink/60 w-2/5 pr-2 align-top">{k}</td><td className="font-semibold">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="text-2xl">Avis joueurs</h3>
            <span className="font-extrabold text-[32px] leading-none text-accent">{String(prod.rating).replace('.', ',')}</span>
            <span className="text-[13px] text-ink/60">sur {prod.reviews.toLocaleString('fr-FR')} avis vérifiés</span>
          </div>
          <div className="flex flex-col gap-1">
            {RATING_BARS.map(([star, w]) => (
              <div key={star} className="grid grid-cols-[24px_1fr_40px] gap-2.5 items-center text-xs">
                <span>{star}★</span>
                <div className="h-1.5 bg-surface"><div className="h-full bg-accent" style={{ width: `${w}%` }} /></div>
                <span className="text-right text-ink/60">{w}%</span>
              </div>
            ))}
          </div>
          {REVIEWS.map((r) => (
            <div key={r.name} className="border-t-2 border-divider pt-3 flex flex-col gap-1.5">
              <div className="flex justify-between gap-2 text-[13px]"><strong>{r.name}</strong><span className="text-accent" aria-label="5 étoiles sur 5">★★★★★</span></div>
              <p className="text-sm text-pretty">{r.text}</p>
              <span className="text-xs text-ink/60">{r.meta}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
}
