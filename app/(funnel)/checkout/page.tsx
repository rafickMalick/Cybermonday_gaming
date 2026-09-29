'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useFlash } from '@/components/Countdown';
import { Arrow, PayBadges } from '@/components/ui';
import { TotalRows } from '@/components/CartParts';
import { ProductImg } from '@/components/ProductVisual';
import { useHydrated } from '@/hooks/useHydrated';
import { fmt, r2 } from '@/lib/format';
import { CARE_PLUS, buildLines, cartCount, computeTotals, totalRows, type Pay } from '@/lib/pricing';
import { useStore } from '@/lib/store';

const inp = 'input !min-h-[48px] !text-base';
const H2 = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <h2 className="text-lg flex gap-2.5"><span className="text-accent">{n}</span>{children}</h2>
);
const PAY_LABEL: Record<Pay, string> = { card: 'Carte', paypal: 'PayPal', apple: 'Apple Pay' };

/** Checkout : une seule page, sans navigation */
export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { mm, ss } = useFlash();
  const cart = useStore((s) => s.cart);
  const prize = useStore((s) => s.prize);
  const ship = useStore((s) => s.ship);
  const pay = useStore((s) => s.pay);
  const bump = useStore((s) => s.bump);
  const setShip = useStore((s) => s.setShip);
  const setPay = useStore((s) => s.setPay);
  const toggleBump = useStore((s) => s.toggleBump);
  const placeOrder = useStore((s) => s.placeOrder);
  const placing = useRef(false);

  const lines = useMemo(() => buildLines(cart), [cart]);
  const T = useMemo(() => computeTotals(cart, !!prize, 'std'), [cart, prize]);
  const TC = useMemo(() => computeTotals(cart, !!prize, ship, bump), [cart, prize, ship, bump]);

  // Panier vide → retour au panier (sauf pendant la validation de commande)
  useEffect(() => {
    if (hydrated && !cart.length && !placing.current) router.replace('/panier');
  }, [hydrated, cart.length, router]);

  const submit = () => {
    placing.current = true;
    const num = placeOrder();
    if (num) router.push(`/confirmation/${num}`);
    else placing.current = false;
  };

  if (!hydrated || !cart.length) return <div className="wrap-md py-20 text-ink/60" aria-busy>Chargement…</div>;

  return (
    <section className="wrap-md animate-rise pt-[clamp(20px,4vw,40px)] pb-14 grid gap-[clamp(24px,4vw,48px)] items-start grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]">
      <div className="flex flex-col gap-7 min-w-0">
        <div className="flex flex-col gap-1.5">
          <Link href="/panier" className="btn btn-ghost self-start min-h-[36px] text-[13px]">← Retour au panier</Link>
          <h1 className="text-[clamp(32px,5vw,48px)] tracking-title">Paiement</h1>
          <span className="text-[13px] muted">Une seule étape. Tes prix Cyber Monday sont réservés <span suppressHydrationWarning>{mm}:{ss}</span>.</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-extrabold tracking-[.12em]">PAIEMENT EXPRESS · 1 CLIC</span>
          <div className="grid grid-cols-3 gap-2">
            {['Apple Pay', 'PayPal', 'Google Pay'].map((n) => (
              <button key={n} onClick={submit} className="btn btn-secondary min-h-[52px] justify-center text-center">{n}</button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-xs muted"><span className="h-[2px] bg-divider" />ou remplis tes infos<span className="h-[2px] bg-divider" /></div>
        </div>

        <form className="contents" onSubmit={(e) => { e.preventDefault(); submit(); }} id="checkout-form">
          <div className="flex flex-col gap-3">
            <H2 n="01">Contact</H2>
            <div className="field"><label htmlFor="email">E-mail</label><input id="email" className={inp} type="email" autoComplete="email" placeholder="toi@exemple.fr" /></div>
          </div>

          <div className="flex flex-col gap-3 border-t-2 border-divider pt-6">
            <H2 n="02">Livraison</H2>
            <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))]">
              <div className="field"><label htmlFor="fn">Prénom</label><input id="fn" className={inp} autoComplete="given-name" placeholder="Lina" /></div>
              <div className="field"><label htmlFor="ln">Nom</label><input id="ln" className={inp} autoComplete="family-name" placeholder="Moreau" /></div>
            </div>
            <div className="field"><label htmlFor="addr">Adresse</label><input id="addr" className={inp} autoComplete="street-address" placeholder="12 rue des Arcades" /></div>
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3">
              <div className="field"><label htmlFor="zip">Code postal</label><input id="zip" className={inp} autoComplete="postal-code" placeholder="75011" /></div>
              <div className="field"><label htmlFor="city">Ville</label><input id="city" className={inp} autoComplete="address-level2" placeholder="Paris" /></div>
            </div>
            <div className="flex flex-col border-2 border-divider">
              <label className="radio p-3.5 min-h-[48px] justify-between border-b-2 border-divider">
                <span className="flex items-center gap-2.5"><input type="radio" name="ship" checked={ship === 'std'} onChange={() => setShip('std')} /><span className="dot" />Standard · 48 h</span>
                <strong>{T.shipStd ? fmt(T.shipStd) : 'Offerte'}</strong>
              </label>
              <label className="radio p-3.5 min-h-[48px] justify-between">
                <span className="flex items-center gap-2.5"><input type="radio" name="ship" checked={ship === 'exp'} onChange={() => setShip('exp')} /><span className="dot" />Express · 24 h</span>
                <strong>9,99 €</strong>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t-2 border-divider pt-6">
            <H2 n="03">Paiement</H2>
            <div className="seg grid grid-cols-3">
              {(Object.keys(PAY_LABEL) as Pay[]).map((k) => (
                <label key={k} className="seg-opt min-h-[48px]"><input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} />{PAY_LABEL[k]}</label>
              ))}
            </div>
            {pay === 'card' ? (
              <>
                <div className="field"><label htmlFor="cc">Numéro de carte</label><input id="cc" className={inp} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="field"><label htmlFor="exp">Expiration</label><input id="exp" className={inp} autoComplete="cc-exp" placeholder="MM / AA" /></div>
                  <div className="field"><label htmlFor="cvc">CVC</label><input id="cvc" className={inp} autoComplete="cc-csc" placeholder="123" /></div>
                </div>
              </>
            ) : (
              <div className="border-2 border-divider p-3.5 text-sm text-ink/75">Tu seras redirigé·e vers {PAY_LABEL[pay]} pour valider le paiement.</div>
            )}
            <span className="flex gap-2 items-center text-xs muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect width="18" height="11" x="3" y="11" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Chiffrement SSL 256 bits · 3D Secure · aucune donnée bancaire stockée
            </span>
          </div>
        </form>
      </div>

      <aside className="border-2 border-divider bg-surface p-5 flex flex-col gap-3.5 md:sticky md:top-4">
        <h3 className="text-xl">Ta commande ({cartCount(cart)})</h3>
        {lines.map((l) => (
          <div key={l.key} className="grid grid-cols-[52px_minmax(0,1fr)_auto] gap-3 items-center">
            <div className="relative aspect-square flex items-center justify-center bg-bg font-extrabold text-[13px] leading-none text-accent">
              <ProductImg code={l.code} />
              <span className="absolute -top-1.5 -right-1.5 bg-ink text-bg text-[11px] min-w-[18px] h-[18px] flex items-center justify-center">{l.qty}</span>
            </div>
            <div className="flex flex-col min-w-0"><span className="font-semibold text-[13px]">{l.name}</span><span className="text-xs text-accent-400">{l.meta}</span></div>
            <span className="font-extrabold text-sm whitespace-nowrap">{fmt(l.total)}</span>
          </div>
        ))}
        <div className="flex gap-2">
          <input className="input !min-h-[44px]" placeholder="Code promo" value={prize ? 'SPIN10' : ''} readOnly aria-label="Code promo" />
          <button type="button" className="btn btn-secondary min-h-[44px]"><span className="whitespace-nowrap">{prize ? 'Appliqué ✓' : 'Appliquer'}</span></button>
        </div>
        <label className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 cursor-pointer border-2 border-dashed border-accent p-3 bg-bg">
          <input type="checkbox" checked={bump} onChange={toggleBump} className="w-[22px] h-[22px] m-0 accent-accent" />
          <span className="flex flex-col gap-1">
            <span className="font-extrabold text-sm">Oui, j&apos;ajoute OVR Care+ · {fmt(CARE_PLUS)}</span>
            <span className="text-xs muted">Garantie étendue à 3 ans et remplacement express sous 48 h sur toute la commande. Proposé uniquement ici.</span>
          </span>
        </label>
        <div className="border-t-2 border-divider pt-3 flex flex-col gap-2">
          <TotalRows rows={totalRows(TC, ship === 'exp' ? 'Livraison express' : 'Livraison standard')} size="md" />
        </div>
        <div className="flex justify-between items-baseline border-t-2 border-divider pt-3"><span className="font-extrabold">Total TTC</span><span className="font-extrabold text-[30px] leading-none">{fmt(TC.total)}</span></div>
        <button onClick={submit} className="btn btn-primary min-h-[58px] justify-between text-[17px] px-5">Payer {fmt(TC.total)} <Arrow /></button>
        <span className="text-xs muted">ou 4 × {fmt(r2(TC.total / 4))} sans frais avec ta carte</span>
        <span className="text-xs muted">
          En payant, tu acceptes nos <Link href="/legal/cgv" className="underline text-accent-400">CGV</Link> et notre <Link href="/legal/privacy" className="underline text-accent-400">politique de confidentialité</Link>.
        </span>
        <PayBadges />
        <span className="text-xs text-ink/60">Satisfait ou remboursé 30 jours · Garantie constructeur 2 ans</span>
      </aside>
    </section>
  );
}
