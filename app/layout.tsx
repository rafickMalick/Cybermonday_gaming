import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'OVRCLK //GEAR · Cyber Monday', template: '%s · OVRCLK //GEAR' },
  description: "Cyber Monday : claviers, souris, casques, écrans et chaises jusqu'à −50 %. Prix TTC en euros.",
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#121111' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
