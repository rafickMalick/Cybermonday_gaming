import { imageOfCode } from '@/data/catalog';

/** Photo d'un produit, contenue dans son emplacement (le parent fournit le ratio et le fond). */
export function ProductImg({ code, className = '' }: { code: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageOfCode(code)} alt="" loading="lazy" draggable={false} className={`w-full h-full object-cover ${className}`} />;
}

/** Emplacement visuel produit : photo sur fond à lignes de balayage. */
export function ProductVisual({ code, className = '' }: { code: string; className?: string; codeClass?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-surface scan ${className}`}>
      <ProductImg code={code} className="absolute inset-0" />
    </div>
  );
}
