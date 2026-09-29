'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BY_ID, type Category } from '@/data/catalog';
import { UPGRADE } from '@/data/catalog';
import { useNow } from '@/hooks/useNow';
import { useHydrated } from '@/hooks/useHydrated';
import { fmt, pad2, r2 } from '@/lib/format';
import { UPGRADE_DISCOUNT } from '@/lib/pricing';
import { useStore } from '@/lib/store';
import { TrustGrid } from '@/components/ui';
import { ProductImg } from '@/components/ProductVisual';

export default function ConfirmationPage() {
  const { num } = useParams<{ num: string }>();
  const hydrated = useHydrated();
  const now = useNow();
  const order = useStore((s) => s.order);
  const upgradeEnd = useStore((s) => s.upgradeEnd);
  const upgradeAdded = useStore((s) => s.upgradeAdded);
  const addUpgrade = useStore((s) => s.addUpgrade);

  if (!hydrated || now == null) return <div className="wrap-md py-20 text-ink/60" aria-busy>Chargement…</div>;
  if (!order || order.num !== num) {
    return (
      <section className="wrap-md py-16 flex flex-col gap-4 items-start">
        <h1 className="text-4xl">Commande introuvable.</h1>
        <p className="muted">Nous ne retrouvons pas la commande {num} sur cet appareil.</p>
        <Link href="/" className="btn btn-secondary min-h-[48px] px-[18px]">Retour à l&apos;accueil</Link>
      </section>
    );
  }

  const [upId, reason, headline] = UPGRADE[order.cat as Category] ?? UPGRADE.Claviers;
  const up = BY_ID[upId];
  const rem = Math.max(0, upgradeEnd - now);
  const expired = !upgradeAdded && rem <= 0;
  const delivery = new Date(order.placedAt + 2 * 864e5).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <section className="wrap-md animate-rise py-[clamp(28px,5vw,64px)] flex flex-col gap-8">
      <div className="flex flex-col gap-3 border-b-2 border-divider pb-7">
        <span className="eyebrow">COMMANDE {order.num} · CONFIRMÉE</span>
        <h1 className="text-[clamp(48px,9vw,112px)] tracking-[-0.05em] leading-[.88]">
          GG.<br /><span className="text-accent neon-text">Setup verrouillé.</span>
        </h1>
        <p className="max-w-[520px] text-base text-ink/75">
          Un e-mail de confirmation arrive. Livraison estimée <strong className="text-ink">{delivery}</strong>. Suivi disponible dès l&apos;expédition.
        </p>
      </div>

      {/* NEXT UPGRADE */}
      <div className="border-2 border-accent bg-accent text-bg grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="p-[clamp(20px,4vw,36px)] flex flex-col gap-3.5">
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <span className="text-xs font-extrabold tracking-[.16em]">NEXT UPGRADE · RÉSERVÉ POUR TOI</span>
            <span className="font-extrabold text-2xl leading-none bg-bg text-accent px-2.5 py-1.5" aria-label="Temps restant">{pad2(Math.floor(rem / 60e3))}:{pad2(Math.floor(rem / 1000) % 60)}</span>
          </div>
          <h2 className="text-[clamp(30px,5vw,54px)] tracking-[-0.04em] leading-[.95] text-bg">{headline}</h2>
          <p className="text-[15px] font-semibold max-w-[420px]">{reason} −20 % supplémentaires sur le prix Cyber Monday, ajouté à la même livraison, sans ressaisir ta carte.</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-extrabold text-[40px] leading-none">{fmt(r2(up.price * (1 - UPGRADE_DISCOUNT)))}</span>
            <s className="text-base font-semibold">{fmt(up.price)}</s>
          </div>
          {!upgradeAdded && !expired && (
            <button onClick={addUpgrade} className="btn bg-bg text-ink hover:!bg-surface min-h-[56px] justify-between text-[17px] px-5 max-w-[360px]">Ajouter en 1 clic <span aria-hidden>→</span></button>
          )}
          {upgradeAdded && <div className="bg-bg text-ink px-4 py-3.5 font-extrabold max-w-[360px]" role="status">✓ Ajouté à la commande {order.num}</div>}
          {expired && <div className="border-2 border-bg px-4 py-3.5 font-extrabold max-w-[360px]">Offre expirée</div>}
        </div>
        <div className="relative min-h-[260px] flex items-center justify-center bg-bg">
          <ProductImg code={up.code} className="absolute inset-0 p-6" />
          <span className="absolute left-3.5 bottom-3 text-[11px] tracking-[.1em] text-ink/55">{up.name.toUpperCase()}</span>
        </div>
      </div>

      <div className="grid gap-[clamp(24px,4vw,48px)] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="flex flex-col gap-3">
          <h3 className="text-[22px]">Récapitulatif</h3>
          {order.lines.map((l, i) => (
            <div key={i} className="flex justify-between gap-3 border-b border-divider pb-2.5 text-sm"><span>{l.qty} × {l.name}</span><strong className="whitespace-nowrap">{fmt(l.total)}</strong></div>
          ))}
          <div className="flex justify-between items-baseline"><span className="font-extrabold">Total payé</span><span className="font-extrabold text-[26px] leading-none">{fmt(order.total)}</span></div>
        </div>
        <TrustGrid variant="confirm" />
      </div>
      <Link href="/" className="btn btn-secondary self-start min-h-[48px] px-[18px]">Retour à l&apos;accueil</Link>
    </section>
  );
}
