import Link from 'next/link';
import { listArticles } from '@/lib/content';

export default async function Home() {
  const articles = await listArticles('analysis');
  return (
    <main>
      <section>
        <h2 className="mb-4 text-lg font-semibold">地域課題の構造と分析</h2>
        {articles.length === 0 ? (
          <p className="text-sm text-gray-500">記事はまだありません。</p>
        ) : (
          <ul className="space-y-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/analysis/${a.slug}`}
                  className="block rounded border border-gray-200 p-4 transition hover:bg-gray-50"
                >
                  <h3 className="font-medium leading-snug">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 text-sm text-gray-600">{a.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
