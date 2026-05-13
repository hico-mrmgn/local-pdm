import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      className="block focus-visible:outline-none"
    >
      <Card className="h-full transition hover:border-foreground/30 hover:shadow-md">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            {showSection ? (
              <Badge variant="secondary">{SECTION_LABEL[article.section]}</Badge>
            ) : (
              <span />
            )}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
          <CardTitle className="text-lg leading-snug md:text-xl">
            {article.title}
          </CardTitle>
          {article.description && (
            <CardDescription className="line-clamp-3">
              {article.description}
            </CardDescription>
          )}
        </CardHeader>
        {article.tags && article.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="outline" className="font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
