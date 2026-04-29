import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '地域課題、どう解く？',
  description: 'まちに、プロダクト思考を。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900 antialiased">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <header className="mb-12">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold">地域課題、どう解く？</h1>
              <p className="mt-1 text-sm text-gray-600">まちに、プロダクト思考を。</p>
            </Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
