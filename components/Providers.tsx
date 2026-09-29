'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useStore.persist.rehydrate();
  }, []);
  return <>{children}</>;
}
