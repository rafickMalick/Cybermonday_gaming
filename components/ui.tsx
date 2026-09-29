import { PAY, TRUST } from '@/data/content';

export function PayBadges() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PAY.map((b) => <span key={b} className="tag-pay">{b}</span>)}
    </div>
  );
}

/** Blocs de réassurance en grille visible (cellules séparées par des traits de 2px) */
export function TrustGrid({ variant }: { variant: 'strip' | 'product' | 'confirm' }) {
  const wrapCls = {
    strip: 'grid gap-[2px] bg-divider grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]',
    product: 'grid grid-cols-2 gap-[2px] bg-divider border-2 border-divider',
    confirm: 'grid grid-cols-2 gap-[2px] bg-divider border-2 border-divider self-start',
  }[variant];
  const cell = {
    strip: 'px-[clamp(16px,3vw,28px)] py-[18px] gap-0.5',
    product: 'px-3 py-2.5',
    confirm: 'p-3.5',
  }[variant];
  const t1 = variant === 'strip' ? 'text-[15px]' : variant === 'product' ? 'text-[13px]' : 'text-sm';
  const t2 = variant === 'strip' ? 'text-[13px] text-ink/65' : 'text-xs text-ink/60';
  return (
    <div className={wrapCls}>
      {TRUST.map((t) => (
        <div key={t.title} className={`bg-bg flex flex-col ${cell}`}>
          <span className={`font-extrabold ${t1}`}>{t.title}</span>
          <span className={t2}>{t.sub}</span>
        </div>
      ))}
    </div>
  );
}

export function QtyStepper({ qty, onDec, onInc, size = 'lg' }: { qty: number; onDec: () => void; onInc: () => void; size?: 'lg' | 'md' | 'sm' }) {
  const dim = { lg: ['w-11 text-xl', 'w-9', 'h-11'], md: ['w-10 h-9', 'w-7', ''], sm: ['w-9 h-8', 'w-6 text-[13px]', ''] }[size];
  return (
    <div className="flex border-2 border-divider">
      <button onClick={onDec} aria-label="Diminuer la quantité" className={`${dim[0]} ${dim[2]} flex items-center justify-center hover:text-accent`}>−</button>
      <span className={`${dim[1]} flex items-center justify-center font-extrabold`} aria-live="polite">{qty}</span>
      <button onClick={onInc} aria-label="Augmenter la quantité" className={`${dim[0]} ${dim[2]} flex items-center justify-center hover:text-accent`}>+</button>
    </div>
  );
}

export const Arrow = ({ nudge = true }: { nudge?: boolean }) => (
  <span aria-hidden className={`inline-block ${nudge ? 'animate-nudge' : ''}`}>→</span>
);
