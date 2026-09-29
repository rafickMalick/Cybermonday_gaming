'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

/** true une fois le store persisté relu depuis localStorage */
export function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setOk(true));
    if (useStore.persist.hasHydrated()) setOk(true);
    return unsub;
  }, []);
  return ok;
}
