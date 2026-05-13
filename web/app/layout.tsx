import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '地域課題、どう解く？',
    template: '%s | 地域課題、どう解く？',
  },
  description: 'まちに、プロダクト思考を。PdMが地域課題に向き合う実践記録。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
