import type { Category } from './catalog';

export const CATS: { id: Exclude<Category, 'Accessoires'>; n: string; sub: string }[] = [
  { id: 'Claviers', n: '01', sub: "jusqu'à −37 %" },
  { id: 'Souris', n: '02', sub: "jusqu'à −40 %" },
  { id: 'Casques', n: '03', sub: "jusqu'à −39 %" },
  { id: 'Écrans', n: '04', sub: "jusqu'à −31 %" },
  { id: 'Chaises', n: '05', sub: "jusqu'à −33 %" },
];

/** Filtres de /deals : « Tous », les 5 catégories, puis Accessoires */
export const DEAL_FILTERS: string[] = ['Tous', ...CATS.map((c) => c.id), 'Accessoires'];

export const PRIZES = ['−5 %', 'Livraison offerte', '−10 %', 'Tapis offert', '−15 %', '−8 %', '−20 %', 'Retente'];
/** La roue s'arrête toujours sur cet index (−10 % = code SPIN10), comme dans le prototype */
export const WINNING_PRIZE_INDEX = 2;

export const REVIEWS = [
  { name: 'Yanis_R', meta: 'Acheteur vérifié · il y a 2 jours', text: 'Livré en 36 h, emballage nickel. Le rapid trigger change complètement mes duels sur Valorant.' },
  { name: 'Clara.exe', meta: 'Acheteuse vérifiée · il y a 5 jours', text: "J'ai pris le pack complet, la remise bundle rend le tout moins cher que le clavier seul ailleurs." },
  { name: 'MaxOnFire', meta: 'Acheteur vérifié · il y a 1 semaine', text: "Retour d'une souris sans discussion, remboursé en 3 jours. Service au top." },
];

export const TRUST = [
  { title: 'Livraison 48 h', sub: 'Offerte dès 99 €' },
  { title: 'Retours 30 jours', sub: 'Gratuits, sans justification' },
  { title: 'Garantie 2 ans', sub: 'Échange express' },
  { title: 'Paiement sécurisé', sub: '3D Secure · SSL 256 bits' },
];

export const PAY = ['CB', 'Visa', 'Mastercard', 'PayPal', 'Apple Pay', '4× sans frais'];

/** [prénom, ville, id produit | 'pack', il y a] */
export const TOASTS: [string, string, string, string][] = [
  ['Lucas', 'Lyon', 'k75', '2 min'],
  ['Inès', 'Lille', 'm27', '4 min'],
  ['Hugo', 'Nantes', 'pack', '1 min'],
  ['Sarah', 'Bordeaux', 'vx1', '3 min'],
  ['Noah', 'Marseille', 'throne', '6 min'],
  ['Léa', 'Toulouse', 'h7', '2 min'],
];

/** Paliers de récompenses : seuil (€ TTC) et libellé */
export const MILESTONES: [number, string][] = [
  [99, 'la livraison offerte'],
  [199, 'le tapis Void XL offert'],
  [349, '−10 % sur tout le panier'],
];
export const MILESTONE_LABELS: [number, string][] = [
  [99, 'Livraison offerte'],
  [199, 'Tapis XL offert'],
  [349, '−10 % sur tout'],
];

export const RATING_BARS: [number, number][] = [[5, 82], [4, 12], [3, 4], [2, 1], [1, 1]];

export const NAV_LINKS = [{ label: 'Cyber Deals', cat: 'Tous' }, ...CATS.map((x) => ({ label: x.id, cat: x.id as string }))];
export const dealsHref = (cat: string) => (cat === 'Tous' ? '/deals' : `/deals?cat=${encodeURIComponent(cat)}`);
