'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BY_ID } from '@/data/catalog';
import { PRIZES, WINNING_PRIZE_INDEX } from '@/data/content';
import { r2 } from './format';
import {
  PACK_DISCOUNT,
  buildLines,
  computeTotals,
  type CartLine,
  type Pay,
  type PackInfo,
  type Ship,
} from './pricing';

export interface Order {
  num: string;
  cat: string;
  total: number;
  placedAt: number;
  lines: { qty: number; name: string; total: number }[];
}

interface State {
  // — persisté —
  cart: CartLine[];
  /** Gain de la roue (libellé) ; null tant que la roue n'a pas été tournée */
  prize: string | null;
  rot: number;
  ship: Ship;
  pay: Pay;
  order: Order | null;
  upgradeEnd: number;
  upgradeAdded: boolean;
  // — éphémère —
  spinning: boolean;
  drawerOpen: boolean;
  /** Incrémenté à chaque ajout : déclenche l'animation du compteur du panier */
  pulse: number;
  bump: boolean;

  addProduct: (id: string, variant?: string, qty?: number) => void;
  addCross: (id: string, openDrawer?: boolean) => void;
  addPack: (pack: PackInfo, variant?: string) => void;
  setQty: (key: string, delta: number) => void;
  spin: () => void;
  setShip: (s: Ship) => void;
  setPay: (p: Pay) => void;
  toggleBump: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  placeOrder: () => string | null;
  addUpgrade: () => void;
}

let spinTimer: ReturnType<typeof setTimeout> | undefined;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      prize: null,
      rot: 0,
      ship: 'std',
      pay: 'card',
      order: null,
      upgradeEnd: 0,
      upgradeAdded: false,
      spinning: false,
      drawerOpen: false,
      pulse: 0,
      bump: false,

      addProduct: (id, variant = '', qty = 1) => {
        const p = BY_ID[id];
        const key = `${id}|${variant}`;
        const cart = get().cart.slice();
        const i = cart.findIndex((l) => l.key === key);
        if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + qty };
        else cart.push({ key, ids: [id], qty, unit: p.price, meta: variant });
        set({ cart, drawerOpen: true, pulse: get().pulse + 1 });
      },

      addCross: (id, openDrawer = true) => {
        const p = BY_ID[id];
        const key = `${id}|setup`;
        const cart = get().cart.slice();
        if (cart.some((l) => l.key === key)) return;
        cart.push({ key, ids: [id], qty: 1, unit: r2(p.price * (1 - PACK_DISCOUNT)), meta: 'Prix setup −10 %' });
        // Sur /panier le tiroir ne s'ouvre pas (comportement du prototype)
        set({ cart, drawerOpen: openDrawer, pulse: get().pulse + 1 });
      },

      addPack: (pack, variant = '') => {
        const [mainId] = pack.ids;
        if (pack.ids.length < 2) return get().addProduct(mainId, variant, 1);
        const key = `pack|${pack.ids.join('+')}|${variant}`;
        const cart = get().cart.slice();
        const i = cart.findIndex((l) => l.key === key);
        if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + 1 };
        else
          cart.push({
            key,
            ids: pack.ids,
            qty: 1,
            unit: pack.price,
            full: pack.full,
            meta: `Pack Setup −10 %${variant ? ` · ${variant}` : ''}`,
          });
        set({ cart, drawerOpen: true, pulse: get().pulse + 1 });
      },

      setQty: (key, delta) =>
        set({
          cart: get()
            .cart.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
            .filter((l) => l.qty > 0),
        }),

      spin: () => {
        const s = get();
        if (s.prize || s.spinning) return;
        const idx = WINNING_PRIZE_INDEX;
        const target = s.rot + 360 * 6 + ((((360 - idx * 45) - (s.rot % 360)) % 360) + 360) % 360;
        set({ spinning: true, rot: target });
        spinTimer = setTimeout(() => set({ spinning: false, prize: PRIZES[idx] }), 4300);
      },

      setShip: (ship) => set({ ship }),
      setPay: (pay) => set({ pay }),
      toggleBump: () => set({ bump: !get().bump }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      placeOrder: () => {
        const s = get();
        if (!s.cart.length) return null;
        const TC = computeTotals(s.cart, !!s.prize, s.ship, s.bump);
        const lines = buildLines(s.cart);
        const order: Order = {
          num: `OVR-${Math.floor(100000 + Math.random() * 899999)}`,
          cat: BY_ID[s.cart[0].ids[0]].cat,
          total: TC.total,
          placedAt: Date.now(),
          lines: lines.map((l) => ({ qty: l.qty, name: l.name, total: l.total })),
        };
        set({ order, cart: [], drawerOpen: false, bump: false, upgradeEnd: Date.now() + 10 * 60e3, upgradeAdded: false });
        return order.num;
      },

      addUpgrade: () => set({ upgradeAdded: true }),
    }),
    {
      name: 'ovrclk-state-v1',
      storage: createJSONStorage(() => localStorage),
      // On réhydrate côté client dans <Providers> pour éviter tout écart SSR / client
      skipHydration: true,
      partialize: (s) => ({
        cart: s.cart,
        prize: s.prize,
        rot: s.rot,
        ship: s.ship,
        pay: s.pay,
        order: s.order,
        upgradeEnd: s.upgradeEnd,
        upgradeAdded: s.upgradeAdded,
      }),
    },
  ),
);

export const cancelSpinTimer = () => spinTimer && clearTimeout(spinTimer);
