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

  const issueByKey = new Map<string, number>();
  [...latest]
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
    .forEach((a, i) => issueByKey.set(`${a.section}/${a.slug}`, i + 1));
  const issueOf = (a: { section: string; slug: string }) =>
    issueByKey.get(`${a.section}/${a.slug}`);

  return (
    <div className="space-y-20">
      <section>
        <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-serif text-xl font-bold tracking-tight">最新の記事</h2>
          <span className="text-xs tabular-nums text-muted-foreground">{latest.length}本</span>
        </div>
        {latest.length === 0 ? (
          <p className="text-sm text-muted-foreground">記事はまだありません。</p>
        ) : (
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {latest.slice(0, 6).map((a) => (
              <ArticleCard
                key={`${a.section}-${a.slug}`}
                article={a}
                issueNumber={issueOf(a)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-14">
        {perSection.map(({ section, items }) => (
          <div key={section}>
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <div>
                <p className="eyebrow">{`0${SECTIONS.indexOf(section) + 1}`}</p>
                <Link
                  href={`/${section}`}
                  className="mt-1 inline-block font-serif text-lg font-bold tracking-tight hover:text-accent md:text-xl"
                >
                  {SECTION_LABEL[section]}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SECTION_TAGLINE[section]}
                </p>
              </div>
              <Link
                href={`/${section}`}
                className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
              >
                一覧 →
              </Link>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">記事はまだありません。</p>
            ) : (
              <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                {items.slice(0, 2).map((a) => (
                  <ArticleCard
                    key={`${a.section}-${a.slug}`}
                    article={a}
                    showSection={false}
                    issueNumber={issueOf(a)}
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
