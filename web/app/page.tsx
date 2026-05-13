import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import {
  SECTIONS,
  SECTION_LABEL,
  SECTION_TAGLINE,
  listAllArticles,
  listArticles,
} from '@/lib/content';

export default async function Home() {
  const [latest, perSection] = await Promise.all([
    listAllArticles(),
    Promise.all(SECTIONS.map((s) => listArticles(s).then((items) => ({ section: s, items })))),
  ]);

  return (
    <div className="space-y-16">
      <section className="border-b border-border pb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Concept
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          地域課題は、<br className="md:hidden" />
          プロダクト思考で解ける。
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          PdMとしての経験とAI活用を通じて、地域課題の解決アプローチを発信するメディア。
          僕自身の実践を見せることで、読者が「自分でもできる」と思って動き出すきっかけをつくる。
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">最新の記事</h2>
          <span className="text-xs text-muted-foreground">
            {latest.length}本
          </span>
        </div>
        {latest.length === 0 ? (
          <p className="text-sm text-muted-foreground">記事はまだありません。</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {latest.slice(0, 6).map((a) => (
              <ArticleCard key={`${a.section}-${a.slug}`} article={a} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-10">
        <h2 className="text-xl font-semibold">セクション</h2>
        {perSection.map(({ section, items }) => (
          <div key={section}>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                <Link
                  href={`/${section}`}
                  className="text-lg font-semibold hover:text-accent"
                >
                  {SECTION_LABEL[section]}
                </Link>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {SECTION_TAGLINE[section]}
                </p>
              </div>
              <Link
                href={`/${section}`}
                className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
              >
                一覧を見る →
              </Link>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">記事はまだありません。</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {items.slice(0, 2).map((a) => (
                  <ArticleCard
                    key={`${a.section}-${a.slug}`}
                    article={a}
                    showSection={false}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
