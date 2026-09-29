import { CheckoutHeader } from '@/components/CheckoutHeader';

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
