import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATALOG, getProduct } from '@/data/catalog';
import { ProductDetails } from '@/components/ProductDetails';
import { ProductView } from '@/components/ProductView';

export const generateStaticParams = () => CATALOG.map((p) => ({ id: p.id }));

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProduct(params.id);
  return p ? { title: p.name, description: p.short } : {};
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const prod = getProduct(params.id);
  if (!prod) notFound();
  return (
    <section className="wrap animate-rise pt-5 pb-[clamp(40px,6vw,72px)] flex flex-col gap-[clamp(32px,5vw,56px)]">
      <nav aria-label="Fil d'Ariane" className="text-[13px] flex gap-2 flex-wrap text-ink/60">
        <Link href="/" className="hover:text-accent">Accueil</Link><span>/</span>
        <Link href="/deals" className="hover:text-accent">Cyber Deals</Link><span>/</span>
        <span className="text-ink">{prod.name}</span>
      </nav>
      <ProductView prod={prod} />
      <ProductDetails prod={prod} />
    </section>
  );
}
