import { Suspense } from 'react';
import { PromoBar } from '@/components/PromoBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SocialToast } from '@/components/SocialToast';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <Suspense fallback={<div className="h-[97px] border-b-2 border-divider" />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SocialToast />
    </>
  );
}
