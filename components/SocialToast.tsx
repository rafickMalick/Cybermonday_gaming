'use client';

import { usePathname } from 'next/navigation';
import { BY_ID } from '@/data/catalog';
import { TOASTS } from '@/data/content';
import { ProductImg } from '@/components/ProductVisual';
import { useNow } from '@/hooks/useNow';
import { useStore } from '@/lib/store';

/** Toast de preuve sociale : visible 6 s sur 12, jamais avec le tiroir ouvert ni sur la fiche produit mobile (barre collante) */
export function SocialToast() {
  const now = useNow();
  const drawerOpen = useStore((s) => s.drawerOpen);
  const pathname = usePathname();
  if (now == null || drawerOpen || pathname.startsWith('/legal')) return null;
  const phase = Math.floor(now / 1000) % 12;
  if (phase < 3 || phase >= 9) return null;
  const [who, city, pid, ago] = TOASTS[Math.floor(now / 12000) % TOASTS.length];
  const p = pid === 'pack' ? null : BY_ID[pid];
  const onProduct = pathname.startsWith('/produit');
  return (
    <div
      role="status"
      className={`fixed left-4 bottom-4 z-[25] max-w-[min(340px,calc(100%-32px))] bg-surface border-2 border-divider shadow-lg px-3 py-2.5 grid grid-cols-[44px_minmax(0,1fr)] gap-2.5 items-center animate-fade ${onProduct ? 'max-[759px]:hidden' : ''}`}
    >
      <div className="aspect-square flex items-center justify-center bg-bg font-extrabold text-[11px] leading-none text-accent">{p ? <ProductImg code={p.code} /> : 'PACK'}</div>
      <div className="flex flex-col gap-0.5 text-[13px]">
        <span><strong>{who}</strong> ({city}) vient d&apos;acheter</span>
        <span className="font-extrabold">{p ? p.name : 'le Pack Setup K-75 complet'}</span>
        <span className="text-[11px] muted">il y a {ago} · achat vérifié</span>
      </div>
    </div>
  );
}
