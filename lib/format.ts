const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

/** Prix TTC en euros : 1 234,56 € */
export const fmt = (v: number) => EUR.format(v);
export const r2 = (v: number) => Math.round(v * 100) / 100;
export const pad2 = (n: number) => String(n).padStart(2, '0');
export const pctOff = (old: number, price: number) => Math.round((1 - price / old) * 100);
