import Link from 'next/link';
import { LEGAL } from '@/data/legal';
import { NAV_LINKS, dealsHref } from '@/data/content';
import { Logo } from './Logo';
import { PayBadges } from './ui';

const head = 'text-xs font-extrabold tracking-[.14em] text-accent-400';
const link = 'text-sm py-[3px] hover:text-accent';

export function Footer() {
  return (
    <footer className="border-t-2 border-divider">
      <div className="wrap pt-[clamp(32px,5vw,56px)] pb-6 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]">
        <div className="flex flex-col gap-2.5">
          <Logo />
          <span className="text-[13px] muted max-w-[240px]">Matériel gaming pour joueurs exigeants. Expédié depuis Lyon.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className={head}>BOUTIQUE</span>
          {NAV_LINKS.map((n) => <Link key={n.cat} href={dealsHref(n.cat)} className={link}>{n.label}</Link>)}
        </div>
        <div className="flex flex-col gap-2">
          <span className={head}>AIDE</span>
          <Link href="/legal/retours" className={link}>Retours et garantie</Link>
          <Link href="/legal/cgv" className={link}>Livraison et paiement</Link>
          <span className="text-sm muted">support@ovrclk.fr</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className={head}>LÉGAL</span>
          {LEGAL.filter((d) => d.id !== 'retours').map((d) => <Link key={d.id} href={`/legal/${d.id}`} className={link}>{d.label}</Link>)}
        </div>
      </div>
      <div className="wrap pt-4 pb-7 flex flex-wrap items-center justify-between gap-3 border-t border-divider">
        <span className="text-xs text-ink/60">© 2026 OVRCLK SAS · Prix TTC en euros · TVA incluse</span>
        <PayBadges />
      </div>
    </footer>
  );
}
