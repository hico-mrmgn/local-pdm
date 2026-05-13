import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const sans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '地域課題、どう解く？',
    template: '%s | 地域課題、どう解く？',
  },
  description: 'まちに、プロダクト思考を。PdMが地域課題に向き合う実践記録。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
