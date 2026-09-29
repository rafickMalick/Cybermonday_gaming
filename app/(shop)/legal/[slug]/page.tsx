import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LEGAL, LEGAL_UPDATED, getLegal } from '@/data/legal';

export const generateStaticParams = () => LEGAL.map((d) => ({ slug: d.id }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getLegal(params.slug);
  return d ? { title: d.title } : {};
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = getLegal(params.slug);
  if (!doc) notFound();
  return (
    <section className="wrap py-[clamp(28px,5vw,56px)] flex flex-wrap gap-[clamp(24px,4vw,56px)] items-start">
      <aside className="flex-[1_1_240px] flex flex-col border-t-2 border-divider md:sticky md:top-[120px]">
        <span className="eyebrow pt-3.5 pb-2">INFORMATIONS LÉGALES</span>
        {LEGAL.map((d) =>
          d.id === doc.id ? (
            <span key={d.id} aria-current="page" className="min-h-[44px] flex items-center justify-between px-3 text-sm font-extrabold bg-accent text-bg">{d.label}<span aria-hidden>→</span></span>
          ) : (
            <Link key={d.id} href={`/legal/${d.id}`} className="min-h-[44px] flex items-center px-3 text-sm font-semibold border-b border-divider hover:text-accent">{d.label}</Link>
          ),
        )}
      </aside>
      <article className="flex-[999_1_480px] min-w-0 flex flex-col gap-7 max-w-[760px]">
        <div className="flex flex-col gap-2.5 border-b-2 border-divider pb-6">
          <h1 className="text-[clamp(34px,5.5vw,60px)] tracking-[-0.04em] leading-[.95] text-balance">{doc.title}</h1>
          <span className="text-[13px] text-ink/60">Dernière mise à jour : {LEGAL_UPDATED}</span>
          <p className="text-[17px] text-ink/80 text-pretty">{doc.intro}</p>
        </div>
        {doc.sections.map((sec, i) => (
          <div key={sec.h} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
            <span className="font-extrabold text-lg leading-[1.3] text-accent">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex flex-col gap-2.5">
              <h2 className="text-xl">{sec.h}</h2>
              {sec.p.map((para) => <p key={para} className="text-[15px] leading-[1.65] text-ink/80 text-pretty">{para}</p>)}
            </div>
          </div>
        ))}
        <div className="border-2 border-divider p-[18px] flex flex-col gap-1.5 bg-surface">
          <span className="font-extrabold">Une question ?</span>
          <span className="text-sm text-ink/80">Service client joignable 7j/7 de 9 h à 21 h : support@ovrclk.fr · 01 84 60 42 42 (appel non surtaxé).</span>
        </div>
      </article>
    </section>
  );
}
