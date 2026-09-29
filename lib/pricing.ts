import { BUNDLES, BY_ID, CATALOG, type Product } from '@/data/catalog';
import { MILESTONES } from '@/data/content';
import { fmt, r2 } from './format';

// ─── Règles de prix (transcrites du prototype v2) ───────────────────────────
export const TIER_DISCOUNT_AT = 349; // −10 % sur tout le panier
export const TIER_DISCOUNT = 0.1;
export const GIFT_AT = 199; // tapis Void XL offert
export const FREE_SHIPPING_AT = 99; // livraison standard offerte
export const SHIPPING_STD = 6.99;
export const SHIPPING_EXP = 9.99;
export const PACK_DISCOUNT = 0.1; // −10 % sur le pack
export const SPIN_DISCOUNT = 0.1; // code SPIN10
export const CARE_PLUS = 14.99; // OVR Care+ (order bump, checkout uniquement)
export const UPGRADE_DISCOUNT = 0.2; // Next Upgrade −20 %

export type Ship = 'std' | 'exp';
export type Pay = 'card' | 'paypal' | 'apple';

export interface CartLine {
  key: string;
  ids: string[];
  qty: number;
  /** Prix unitaire de la ligne (pack ou produit seul) */
  unit: number;
  /** Prix plein du pack, avant −10 % */
  full?: number;
  meta: string;
}

export interface Totals {
  sub: number;
  old: number;
  tier: number;
  gift: boolean;
  bumpV: number;
  reward: number;
  spinD: number;
  shipStd: number;
  shipping: number;
  total: number;
  saved: number;
}

export function computeTotals(cart: CartLine[], hasPrize: boolean, ship: Ship, bump = false): Totals {
  let sub = 0;
  let old = 0;
  for (const l of cart) {
    sub += l.unit * l.qty;
    old += l.ids.reduce((a, id) => a + BY_ID[id].old, 0) * l.qty;
  }
  sub = r2(sub);
  const tier = sub >= TIER_DISCOUNT_AT ? TIER_DISCOUNT : 0;
  const gift = sub >= GIFT_AT;
  const reward = r2(sub * tier);
  const spinD = hasPrize ? r2((sub - reward) * SPIN_DISCOUNT) : 0;
  const shipStd = sub === 0 || sub >= FREE_SHIPPING_AT ? 0 : SHIPPING_STD;
  const shipping = ship === 'exp' ? SHIPPING_EXP : shipStd;
  const bumpV = bump && sub > 0 ? CARE_PLUS : 0;
  const total = r2(sub - reward - spinD + shipping + bumpV);
  const saved = r2(old - sub + reward + spinD + (gift ? BY_ID.pad.old : 0));
  return { sub, old, tier, gift, bumpV, reward, spinD, shipStd, shipping, total, saved };
}

export const cartCount = (cart: CartLine[]) => cart.reduce((a, l) => a + l.qty, 0);

// ─── Palier suivant ─────────────────────────────────────────────────────────
export const nextMilestone = (v: number) => MILESTONES.find(([at]) => v < at) ?? null;

export function rewardMessage(sub: number) {
  const next = nextMilestone(sub);
  return next ? `Plus que ${fmt(next[0] - sub)} pour ${next[1]}` : 'Niveau max : −10 % débloqué';
}

// ─── Lignes affichées ───────────────────────────────────────────────────────
export interface LineView {
  key: string;
  code: string;
  qty: number;
  total: number;
  name: string;
  meta: string;
}

export function buildLines(cart: CartLine[]): LineView[] {
  return cart.map((l) => {
    const names = l.ids.map((id) => BY_ID[id].name);
    return {
      key: l.key,
      code: BY_ID[l.ids[0]].code,
      qty: l.qty,
      total: l.unit * l.qty,
      name: l.ids.length > 1 ? `${names[0]} + ${l.ids.length - 1} accessoire${l.ids.length > 2 ? 's' : ''}` : names[0],
      meta: l.ids.length > 1 ? `${l.meta} · ${names.slice(1).join(', ')}` : l.meta || BY_ID[l.ids[0]].cat,
    };
  });
}

/** « Complete Your Setup » du panier : accessoires absents du panier, −10 % */
export function buildCross(cart: CartLine[]): { p: Product; pack: number }[] {
  const inCart = new Set(cart.flatMap((l) => l.ids));
  const ids: string[] = [];
  for (const l of cart) {
    for (const id of BUNDLES[BY_ID[l.ids[0]].cat] ?? []) {
      if (!inCart.has(id) && !ids.includes(id)) ids.push(id);
    }
  }
  return ids.slice(0, 3).map((id) => ({ p: BY_ID[id], pack: r2(BY_ID[id].price * (1 - PACK_DISCOUNT)) }));
}

export interface TotalRow { label: string; value: string; accent?: boolean }

export function totalRows(t: Totals, shipLabel = 'Livraison'): TotalRow[] {
  const rows: TotalRow[] = [{ label: 'Sous-total', value: fmt(t.sub) }];
  if (t.reward) rows.push({ label: `Récompense XP −${Math.round(t.tier * 100)} %`, value: `−${fmt(t.reward)}`, accent: true });
  if (t.spinD) rows.push({ label: 'Code SPIN10 (roue)', value: `−${fmt(t.spinD)}`, accent: true });
  if (t.gift) rows.push({ label: 'Cadeau · Tapis Void XL', value: 'Offert', accent: true });
  rows.push({ label: shipLabel, value: t.shipping ? fmt(t.shipping) : 'Offerte' });
  if (t.bumpV) rows.push({ label: 'OVR Care+ · garantie 3 ans', value: fmt(t.bumpV) });
  return rows;
}

// ─── Pack Setup (BundlePicker) ──────────────────────────────────────────────
export interface PackInfo {
  accessories: Product[];
  selectedIds: string[];
  ids: string[];
  full: number;
  price: number;
  save: number;
}

export function packInfo(prod: Product, off: Record<string, boolean>): PackInfo {
  const accessories = (BUNDLES[prod.cat] ?? []).map((id) => BY_ID[id]);
  const selectedIds = accessories.filter((a) => !off[a.id]).map((a) => a.id);
  const ids = [prod.id, ...selectedIds];
  const full = r2(ids.reduce((a, id) => a + BY_ID[id].price, 0));
  const price = ids.length > 1 ? r2(full * (1 - PACK_DISCOUNT)) : full;
  return { accessories, selectedIds, ids, full, price, save: r2(full - price) };
}

/** Message d'incitation sous le bouton d'ajout de la fiche produit */
export function productNudge(sub: number, prod: Product, qty: number, pack: PackInfo) {
  const projSolo = sub + prod.price * qty;
  const projPack = sub + pack.price;
  const unlock = MILESTONES.filter(([at]) => projPack >= at && projSolo < at && sub < at).pop();
  if (pack.ids.length > 1 && unlock) return `Avec le pack, ton panier passe à ${fmt(projPack)} et débloque ${unlock[1]}.`;
  const nn = nextMilestone(projSolo);
  return nn ? `Après cet ajout, plus que ${fmt(nn[0] - projSolo)} pour ${nn[1]}.` : 'Cet ajout débloque −10 % sur tout le panier.';
}

// ─── Stock / carte produit ──────────────────────────────────────────────────
export const soldPct = (p: Product) => Math.round((1 - p.left / p.total) * 100);
export const isLowStock = (p: Product) => p.left <= 12;
export const stockLabel = (p: Product) => (isLowStock(p) ? `Plus que ${p.left} en stock` : `${soldPct(p)} % déjà vendus`);
export const fourX = (price: number) => r2(price / 4);
export const dealCount = (cat: string) => CATALOG.filter((p) => cat === 'Tous' || p.cat === cat).length;
