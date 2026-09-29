'use client';

import { useEffect } from 'react';
import { PRIZES } from '@/data/content';
import { cancelSpinTimer, useStore } from '@/lib/store';
import { Arrow } from './ui';

const CONIC =
  'conic-gradient(from -22.5deg,#ec3013 0 45deg,#121111 45deg 90deg,#ec3013 90deg 135deg,#121111 135deg 180deg,#ec3013 180deg 225deg,#121111 225deg 270deg,#ec3013 270deg 315deg,#121111 315deg 360deg)';

/** Cyber Spin : 1 essai par joueur, gain persisté (code SPIN10 appliqué au panier) */
export function Wheel() {
  const prize = useStore((s) => s.prize);
  const rot = useStore((s) => s.rot);
  const spinning = useStore((s) => s.spinning);
  const spin = useStore((s) => s.spin);
  useEffect(() => () => cancelSpinTimer(), []);

  return (
    <section id="wheel" className="scroll-mt-20 border-b-2 border-divider bg-surface">
      <div className="wrap py-[clamp(40px,6vw,72px)] grid gap-[clamp(32px,5vw,64px)] items-center grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div className="relative w-[min(100%,420px)] aspect-square justify-self-center">
          <div
            aria-hidden
            className="absolute left-1/2 -top-1.5 -translate-x-1/2 z-[2] w-0 h-0 border-x-[14px] border-x-transparent border-t-[24px] border-t-ink"
          />
          <div
            className="absolute inset-0 rounded-full border-4 border-accent shadow-neon-wheel overflow-hidden"
            style={{
              transform: `rotate(${rot}deg)`,
              transition: spinning ? 'transform 4.2s cubic-bezier(.12,.7,.1,1)' : 'none',
              background: CONIC,
            }}
            role="img"
            aria-label={`Roue des gains : ${PRIZES.join(', ')}`}
          >
            {PRIZES.map((label, i) => (
              <div key={label} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${i * 45}deg)` }}>
                <span
                  className={`mt-[9%] font-extrabold text-[clamp(12px,2vw,15px)] max-w-[80px] text-center leading-[1.1] ${i % 2 ? 'text-ink' : 'text-bg'}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-[38%] rounded-full bg-ink text-bg flex items-center justify-center font-extrabold text-sm leading-none z-[1]">OVR</div>
        </div>

        <div className="flex flex-col gap-5">
          <span className="eyebrow">CYBER SPIN · 1 ESSAI PAR JOUEUR</span>
          <h2 className="text-[clamp(32px,5vw,56px)] leading-[.95] tracking-[-0.035em]">Tourne la roue,<br />débloque ta réduc.</h2>
          <p className="max-w-[440px] text-ink/75">Jusqu&apos;à −20 % supplémentaires, cumulables avec les Cyber Deals et les paliers de récompenses du panier.</p>
          {!prize && (
            <button onClick={spin} disabled={spinning} className="btn btn-primary animate-glow min-h-[52px] w-[min(100%,320px)] justify-between text-base px-5">
              {spinning ? 'La roue tourne…' : 'Lancer la roue'} <Arrow nudge={false} />
            </button>
          )}
          {prize && (
            <div className="border-2 border-accent p-4 flex flex-col gap-1.5 max-w-[420px] bg-bg" role="status">
              <span className="text-xs font-extrabold tracking-[.12em] text-accent-400">GAGNÉ !</span>
              <span className="font-extrabold text-[28px] leading-none">{prize} sur ta commande</span>
              <span className="text-[13px] text-ink/70">Code <strong className="text-ink">SPIN10</strong> appliqué automatiquement au panier.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
