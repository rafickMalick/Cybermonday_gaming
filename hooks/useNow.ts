'use client';

import { useEffect, useState } from 'react';

/** Horloge partagée. null au rendu serveur / 1er rendu client (évite les écarts d'hydratation). */
export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

const SIX_H = 6 * 3600e3;

/** Flash deal : compte à rebours vers le prochain multiple de 6 h */
export function flashRemaining(now: number) {
  return Math.max(0, Math.ceil(now / SIX_H) * SIX_H - now);
}
