import type { Product } from '@/data/catalog';
import { soldPct, stockLabel } from '@/lib/pricing';

/** Barre de stock. `lg` = hero / fiche produit (6 px + néon + « x % vendus »), `sm` = cartes (4 px). */
export function StockBar({ p, size = 'sm', soldText }: { p: Product; size?: 'sm' | 'lg'; soldText?: string }) {
  const w = `${soldPct(p)}%`;
  const lg = size === 'lg';
  return (
    <div className={`flex flex-col ${lg ? 'gap-1.5' : 'gap-[5px]'}`}>
      <div className={`flex justify-between text-xs font-semibold ${lg ? '' : ''}`}>
        <span className="text-accent-400">{stockLabel(p)}</span>
        {lg && <span className="text-ink/60">{soldText ?? `${w} vendus`}</span>}
      </div>
      <div className={`bg-surface ${lg ? 'h-1.5' : 'h-1'}`}>
        <div className={`h-full bg-accent origin-left animate-fill ${lg ? 'shadow-neon-bar' : ''}`} style={{ width: w }} />
      </div>
    </div>
  );
}
