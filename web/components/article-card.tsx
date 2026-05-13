import Link from 'next/link';
import {
  SECTION_LABEL,
  formatDate,
  type ArticleSummary,
} from '@/lib/content';

export function ArticleCard({
  article,
  showSection = true,
}: {
  article: ArticleSummary;
  showSection?: boolean;
}) {
  return (
    <Link
      href={`/${article.section}/${article.slug}`}
      className="group block border-t border-border pt-6 transition focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-3">
        {showSection ? (
          <span className="eyebrow">{SECTION_LABEL[article.section]}</span>
        ) : (
          <span />
        )}
        <time className="text-xs tabular-nums text-muted-foreground" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug tracking-tight transition group-hover:text-accent md:text-xl">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>
      )}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {article.tags.slice(0, 4).map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
