// Catalogue OVRCLK — transcrit du <script data-dc-script> de "OVRCLK Cyber Monday v2".
// Tous les prix sont en euros TTC.

export type Category = 'Claviers' | 'Souris' | 'Casques' | 'Écrans' | 'Chaises' | 'Accessoires';

export interface Highlight { t: string; d: string }

export interface Product {
  id: string;
  cat: Category;
  code: string;
  name: string;
  short: string;
  /** Prix barré */
  old: number;
  price: number;
  /** Stock restant / stock initial */
  left: number;
  total: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  /** Titre du sélecteur de variante (ex. « Switchs ») */
  variantTitle?: string;
  variants?: string[];
  specs: [string, string][];
  tagline: string;
  desc: string[];
  highlights: Highlight[];
  box: string;
}

type Raw = Omit<Product, 'tagline' | 'desc' | 'highlights' | 'box'>;
type Desc = { tag: string; p: string[]; hl: [string, string][]; box: string };

const RAW: Raw[] = [
  { id: 'k75', cat: 'Claviers', code: 'K-75', name: 'OVR K-75 Hall Effect', short: 'Clavier 75 % · switchs magnétiques · 8 000 Hz', old: 189.99, price: 119.99, left: 14, total: 120, rating: 4.8, reviews: 1284, featured: true, variantTitle: 'Switchs', variants: ['Linear Red', 'Tactile Brown', 'Rapid Trigger'], specs: [['Format', '75 %, 84 touches'], ['Switchs', 'Hall Effect, 0,1–4 mm réglable'], ['Polling', '8 000 Hz filaire'], ['Connectique', 'USB-C détachable'], ['Éclairage', 'RGB par touche']] },
  { id: 'vx1', cat: 'Souris', code: 'VX-1', name: 'OVR VX-1 Ultralight', short: '54 g · capteur 26K DPI · sans fil 4K Hz', old: 99.99, price: 59.99, left: 9, total: 150, rating: 4.9, reviews: 2210, featured: true, variantTitle: 'Coloris', variants: ['Noir', 'Blanc', 'Rouge'], specs: [['Poids', '54 g'], ['Capteur', 'Optique 26 000 DPI'], ['Autonomie', '95 h'], ['Connexion', '2,4 GHz / USB-C']] },
  { id: 'h7', cat: 'Casques', code: 'H-7', name: 'OVR H-7 Wireless', short: 'Son spatial 7.1 · 2,4 GHz + Bluetooth · 50 h', old: 179.99, price: 109.99, left: 22, total: 100, rating: 4.7, reviews: 864, featured: true, specs: [['Transducteurs', '50 mm graphène'], ['Autonomie', '50 h'], ['Micro', 'Détachable, réduction de bruit IA'], ['Poids', '290 g']] },
  { id: 'm27', cat: 'Écrans', code: 'M27', name: 'OVR Nightview 27" OLED', short: 'QHD · 240 Hz · 0,03 ms · HDR True Black 400', old: 799, price: 549, left: 6, total: 60, rating: 4.9, reviews: 512, featured: true, specs: [['Dalle', 'QD-OLED 27"'], ['Définition', '2560 × 1440'], ['Fréquence', '240 Hz'], ['Temps de réponse', '0,03 ms GtG'], ['Connectique', 'DP 1.4, 2 × HDMI 2.1']] },
  { id: 'throne', cat: 'Chaises', code: 'TX', name: 'OVR Throne X', short: 'Accoudoirs 4D · inclinaison 165° · tissu respirant', old: 449, price: 299, left: 11, total: 80, rating: 4.6, reviews: 743, variantTitle: 'Taille', variants: ['Standard', 'XL'], specs: [['Inclinaison', '90–165°'], ['Accoudoirs', '4D magnétiques'], ['Charge max.', '150 kg'], ['Garantie', '5 ans structure']] },
  { id: 'm32', cat: 'Écrans', code: 'M32', name: 'OVR Nightview 32" 4K', short: '4K · 160 Hz · IPS Black · USB-C 90 W', old: 899, price: 649, left: 17, total: 70, rating: 4.7, reviews: 301, specs: [['Dalle', 'IPS Black 32"'], ['Définition', '3840 × 2160'], ['Fréquence', '160 Hz'], ['USB-C', '90 W']] },
  { id: 'k60', cat: 'Claviers', code: 'K-60', name: 'OVR K-60 Mini', short: '60 % · hot-swap · RGB par touche', old: 99.99, price: 64.99, left: 31, total: 120, rating: 4.6, reviews: 958, variantTitle: 'Switchs', variants: ['Linear Red', 'Tactile Brown'], specs: [['Format', '60 %, 61 touches'], ['Switchs', 'Hot-swap 5 broches'], ['Connectique', 'USB-C']] },
  { id: 'vx2', cat: 'Souris', code: 'VX-2', name: 'OVR VX-2 Pro Ergo', short: 'Ergonomique · 8 boutons · 90 h', old: 129.99, price: 79.99, left: 25, total: 90, rating: 4.7, reviews: 402, specs: [['Poids', '74 g'], ['Boutons', '8 programmables'], ['Autonomie', '90 h']] },
  { id: 'pad', cat: 'Accessoires', code: 'PAD', name: 'Tapis Void XL', short: '900 × 400 mm · surface speed', old: 39.99, price: 19.99, left: 40, total: 200, rating: 4.8, reviews: 1650, specs: [['Dimensions', '900 × 400 × 4 mm'], ['Surface', 'Speed micro-tissée']] },
  { id: 'caps', cat: 'Accessoires', code: 'CAP', name: 'Keycaps PBT Neon', short: 'Double-shot · profil Cherry', old: 49.99, price: 29.99, left: 18, total: 90, rating: 4.7, reviews: 388, specs: [['Matériau', 'PBT double-shot'], ['Touches', '129']] },
  { id: 'mic', cat: 'Accessoires', code: 'C1', name: 'Micro Stream C1', short: 'USB-C · cardioïde · bras inclus', old: 129.99, price: 79.99, left: 12, total: 60, rating: 4.6, reviews: 276, specs: [['Directivité', 'Cardioïde'], ['Résolution', '24 bits / 96 kHz']] },
  { id: 'arm', cat: 'Accessoires', code: 'ARM', name: 'Bras écran Axis', short: "Vérin à gaz · jusqu'à 34\"", old: 89.99, price: 59.99, left: 20, total: 80, rating: 4.7, reviews: 190, specs: [['Compatibilité', '17–34", 2–9 kg']] },
  { id: 'stand', cat: 'Accessoires', code: 'STD', name: 'Support casque Halo', short: 'Hub USB 3.0 · base lestée', old: 29.99, price: 17.99, left: 35, total: 100, rating: 4.5, reviews: 144, specs: [['Hub', '2 × USB 3.0']] },
  { id: 'lumbar', cat: 'Accessoires', code: 'LMB', name: 'Coussin lombaire Memory', short: 'Mousse à mémoire de forme', old: 39.99, price: 24.99, left: 28, total: 90, rating: 4.4, reviews: 98, specs: [['Matière', 'Mousse viscoélastique']] },
];

const DESC: Record<string, Desc> = {
  k75: { tag: 'Chaque milliseconde compte.', p: ["Le K-75 remplace les contacts mécaniques par des capteurs magnétiques Hall Effect : tu choisis la profondeur d'activation de chaque touche, de 0,1 à 4 mm, et le Rapid Trigger réarme la touche dès que tu la relâches.", "Châssis aluminium, mousse d'isolation double couche et stabilisateurs lubrifiés d'usine pour une frappe feutrée. Le format 75 % libère de la place pour la souris sans sacrifier les flèches ni la rangée F."], hl: [['Rapid Trigger', 'Réactivation instantanée pour les contre-strafes.'], ['8 000 Hz', 'Latence divisée par 8 face à un clavier classique.'], ['Profils embarqués', '5 profils stockés, aucun logiciel requis en tournoi.']], box: "clavier, câble USB-C tressé, extracteur de touches, guide." },
  vx1: { tag: '54 grammes. Zéro compromis.', p: ["La VX-1 est taillée pour le FPS compétitif : coque alvéolée sans trous apparents, patins PTFE pur et capteur 26K qui suit même les flicks les plus violents.", "Sa connexion sans fil à 4 000 Hz rivalise avec le filaire, et 95 heures d'autonomie tiennent une semaine de sessions intensives."], hl: [['Ultralight', '54 g, équilibre centré pour le claw et le fingertip.'], ['Capteur 26K', 'Précision au pixel, aucun lissage.'], ['4K Hz sans fil', 'Dongle inclus, latence de 0,25 ms.']], box: 'souris, dongle 4K, câble USB-C, grip tape.' },
  h7: { tag: 'Entends-les avant qu\'ils te voient.', p: ["Les transducteurs graphène de 50 mm du H-7 restituent les pas et les rechargements avec une précision de positionnement redoutable grâce au son spatial 7.1.", "Double connexion 2,4 GHz + Bluetooth pour jouer et prendre un appel en même temps, micro détachable avec réduction de bruit IA et 50 heures d'autonomie."], hl: [['Spatial 7.1', 'Localisation précise des ennemis.'], ['Double connexion', 'PC, console et smartphone simultanément.'], ['50 h', 'Recharge rapide : 15 min = 8 h.']], box: 'casque, dongle USB-C, micro détachable, câble.' },
  m27: { tag: 'Le noir absolu à 240 Hz.', p: ["La dalle QD-OLED du Nightview 27\" affiche des noirs parfaits et des couleurs éclatantes, avec un temps de réponse de 0,03 ms : aucun flou de mouvement, même dans les scènes les plus rapides.", "Traitement anti-reflet mat, protection anti-marquage automatique et garantie burn-in de 3 ans incluse."], hl: [['QD-OLED', 'Contraste infini, HDR True Black 400.'], ['240 Hz · 0,03 ms', 'Fluidité et netteté de niveau esport.'], ['Garantie burn-in', '3 ans, échange sans frais.']], box: 'écran, pied réglable, câbles DP et HDMI, alimentation.' },
  throne: { tag: 'Des heures de jeu, zéro douleur.', p: ["La Throne X soutient ta posture sur les longues sessions : support lombaire intégré réglable, assise en mousse haute densité et tissu respirant qui évite la surchauffe.", "Accoudoirs 4D magnétiques, inclinaison jusqu'à 165° et base aluminium certifiée pour 150 kg."], hl: [['Ergonomie', 'Support lombaire et cervical ajustables.'], ['Respirant', 'Tissu technique, plus frais que le similicuir.'], ['5 ans', 'Garantie sur la structure.']], box: 'chaise à monter (15 min), outils, coussin cervical.' },
  m32: { tag: 'La 4K pour jouer et créer.', p: ["Le Nightview 32\" combine une dalle IPS Black au contraste doublé et une fréquence de 160 Hz : assez rapide pour le jeu, assez fidèle pour le montage vidéo.", "Un seul câble USB-C suffit pour afficher, charger ton portable à 90 W et brancher clavier et souris sur le hub intégré."], hl: [['4K 160 Hz', 'Netteté et fluidité réunies.'], ['IPS Black', 'Contraste 2 000:1, couleurs calibrées.'], ['USB-C 90 W', 'Un câble pour tout le bureau.']], box: 'écran, pied, câbles USB-C, DP et HDMI.' },
  k60: { tag: 'Compact, personnalisable.', p: ["Le K-60 Mini libère un maximum d'espace pour la souris. Ses switchs hot-swap se changent sans soudure : essaie, mixe, trouve ta frappe idéale.", "RGB par touche, couches programmables et coque en ABS renforcé."], hl: [['60 %', 'Idéal pour les grands mouvements de souris.'], ['Hot-swap', 'Compatible switchs 3 et 5 broches.'], ['Couches', 'Toutes les fonctions accessibles via Fn.']], box: 'clavier, câble USB-C, extracteur 2-en-1.' },
  vx2: { tag: 'La précision qui tient la distance.', p: ["La VX-2 Pro épouse la main droite pour les longues sessions MMO et MOBA, avec 8 boutons programmables à portée de pouce.", "Molette métallique à défilement libre et 90 heures d'autonomie."], hl: [['Ergonomique', 'Forme sculptée pour la main droite.'], ['8 boutons', 'Macros et raccourcis embarqués.'], ['90 h', 'Charge via USB-C.']], box: 'souris, dongle, câble USB-C.' },
  pad: { tag: 'Glisse maximale.', p: ["Le Void XL couvre clavier et souris avec une surface micro-tissée ultra-rapide et une base caoutchouc antidérapante.", "Bords cousus pour ne jamais s'effilocher, lavable à 30 °C."], hl: [['900 × 400 mm', 'Tout ton setup sur une surface.'], ['Speed', 'Friction faible et constante.'], ['Lavable', 'Bords cousus renforcés.']], box: 'tapis roulé.' },
  caps: { tag: 'Ton clavier, ta signature.', p: ["Ces keycaps PBT double-shot ne brillent jamais et gardent leurs légendes intactes, même après des années de jeu.", "129 touches compatibles avec la plupart des claviers mécaniques et magnétiques."], hl: [['PBT', 'Toucher sec, sans lustrage.'], ['Double-shot', 'Légendes indélébiles.'], ['129 touches', 'Compatible ISO et ANSI.']], box: 'keycaps, extracteur.' },
  mic: { tag: 'Une voix de studio pour tes streams.', p: ["Le Stream C1 capte ta voix en 24 bits / 96 kHz grâce à sa capsule cardioïde qui ignore le bruit du clavier.", "Bras articulé, filtre anti-pop et bouton de mute tactile inclus."], hl: [['Cardioïde', 'Isole ta voix du clavier.'], ['24 bits', 'Qualité broadcast.'], ['Plug & play', 'USB-C, aucun pilote.']], box: 'micro, bras articulé, filtre anti-pop, câble.' },
  arm: { tag: 'Libère ton bureau.', p: ["Le bras Axis soulève ton écran jusqu'à 34\" et 9 kg et se positionne d'un doigt grâce à son vérin à gaz.", "Fixation pince ou passe-câble, gestion des câbles intégrée."], hl: [['Vérin à gaz', 'Réglage fluide en hauteur et profondeur.'], ["Jusqu'à 34\"", 'Compatible VESA 75/100.'], ['Rangement câbles', 'Bureau net.']], box: 'bras, pince, visserie VESA.' },
  stand: { tag: 'Range ton casque avec style.', p: ["Le support Halo garde ton casque à portée de main et ajoute deux ports USB 3.0 à ton bureau.", "Base lestée antidérapante."], hl: [['Hub USB 3.0', '2 ports supplémentaires.'], ['Stable', 'Base lestée.'], ['Universel', 'Tous formats de casque.']], box: 'support, câble USB.' },
  lumbar: { tag: 'Le dos soutenu.', p: ["Ce coussin en mousse à mémoire de forme épouse le creux de ton dos pour limiter la fatigue lors des longues sessions.", "Housse respirante lavable en machine."], hl: [['Mémoire de forme', "S'adapte à ta morphologie."], ['Sangle réglable', 'Toutes chaises.'], ['Lavable', 'Housse amovible.']], box: 'coussin, housse.' },
};

export const CATALOG: Product[] = RAW.map((p) => {
  const d = DESC[p.id];
  return {
    ...p,
    tagline: d?.tag ?? p.name,
    desc: d?.p ?? [p.short],
    highlights: (d?.hl ?? []).map(([t, dd]) => ({ t, d: dd })),
    box: d?.box ?? 'produit, documentation.',
  };
});

export const BY_ID: Record<string, Product> = Object.fromEntries(CATALOG.map((p) => [p.id, p]));
/** Illustration produit (public/products/<id>.svg), retrouvée via le code affiché */
const ID_BY_CODE: Record<string, string> = Object.fromEntries(CATALOG.map((p) => [p.code, p.id]));
export const imageOfCode = (code: string): string => `/products/${ID_BY_CODE[code] ?? code}.svg`;
export const getProduct = (id: string): Product | undefined => BY_ID[id];

/** Accessoires proposés en « Complete Your Setup », par catégorie du produit principal */
export const BUNDLES: Record<Category, string[]> = {
  Claviers: ['pad', 'caps', 'vx1'],
  Souris: ['pad', 'k60', 'h7'],
  Casques: ['mic', 'stand', 'vx1'],
  Écrans: ['arm', 'k75', 'pad'],
  Chaises: ['lumbar', 'pad', 'h7'],
  Accessoires: ['pad', 'vx1', 'k75'],
};

/** Next Upgrade de la page de confirmation : [id produit, raison, titre] */
export const UPGRADE: Record<Category, [string, string, string]> = {
  Claviers: ['m27', 'Tes nouvelles touches méritent 240 Hz.', "Passe à l'OLED."],
  Souris: ['h7', 'Ta visée est prête, ton son aussi ?', 'Entends-les venir.'],
  Casques: ['mic', 'Ton son est pro, ta voix aussi.', 'Stream en clair.'],
  Écrans: ['throne', 'Un écran pareil se regarde bien assis.', 'Le trône qui va avec.'],
  Chaises: ['m27', "Bien installé, il te manque l'image.", "Passe à l'OLED."],
  Accessoires: ['k75', 'Le setup commence au clavier.', 'Upgrade ton clavier.'],
};
