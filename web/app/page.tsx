import Link from 'next/link';
import {
  SECTIONS,
  SECTION_LABEL,
  SECTION_TAGLINE,
  formatDate,
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

  const pickup = latest[0];

  return (
    <div className="space-y-24">
      {pickup && (
        <section>
          <p className="eyebrow">Pickup / 最新の1本</p>
          <Link
            href={`/${pickup.section}/${pickup.slug}`}
            className="group mt-6 block"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow mt-1">{SECTION_LABEL[pickup.section]}</span>
              <div className="flex flex-col items-end leading-none">
                <span className="font-serif text-3xl italic text-foreground/80 md:text-4xl">
                  № {String(issueOf(pickup) ?? 0).padStart(3, '0')}
                </span>
                <time
                  className="mt-2 text-xs tabular-nums text-muted-foreground"
                  dateTime={pickup.publishedAt}
                >
                  {formatDate(pickup.publishedAt)}
                </time>
              </div>
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold leading-[1.4] tracking-tight transition group-hover:text-accent md:text-4xl md:leading-[1.35]">
              {pickup.title}
            </h2>
            {pickup.description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {pickup.description}
              </p>
            )}
            {pickup.tags && pickup.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {pickup.tags.slice(0, 4).map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            )}
          </Link>
        </section>
      )}

      <section>
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <p className="eyebrow">Index / 4 corners</p>
          <span className="text-xs tabular-nums text-muted-foreground">
            {latest.length}本
          </span>
        </div>
        <div className="mt-10 grid gap-x-14 gap-y-14 md:grid-cols-2">
          {perSection.map(({ section, items }, idx) => (
            <div key={section} className="border-t-2 border-accent pt-6">
              <div className="flex items-start justify-between gap-3">
                <span className="font-serif text-3xl italic text-accent leading-none">
                  № 0{idx + 1}
                </span>
                <Link
                  href={`/${section}`}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  一覧 →
                </Link>
              </div>
              <Link href={`/${section}`} className="mt-4 block group">
                <h3 className="font-serif text-2xl font-bold tracking-tight transition group-hover:text-accent">
                  {SECTION_LABEL[section]}
                </h3>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {SECTION_TAGLINE[section]}
              </p>
              <ul className="mt-6 space-y-4 border-t border-border pt-5">
                {items.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    記事はまだありません。
                  </li>
                )}
                {items.slice(0, 3).map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/${section}/${a.slug}`}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <span className="font-serif text-base leading-snug transition group-hover:text-accent">
                        {a.title}
                      </span>
                      <time
                        className="shrink-0 text-xs tabular-nums text-muted-foreground"
                        dateTime={a.publishedAt}
                      >
                        {formatDate(a.publishedAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
