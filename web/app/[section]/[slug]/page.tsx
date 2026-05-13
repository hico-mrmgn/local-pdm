import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import {
  SECTIONS,
  SECTION_LABEL,
  formatDate,
  listArticles,
  readArticle,
  type Section,
} from '@/lib/content';

export async function generateStaticParams() {
  const lists = await Promise.all(
    SECTIONS.map(async (section) => {
      const items = await listArticles(section);
      return items.map((a) => ({ section, slug: a.slug }));
    }),
  );
  return lists.flat();
}

function isSection(value: string): value is Section {
  return (SECTIONS as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const article = await readArticle(section, slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();

  const article = await readArticle(section, slug);
  if (!article) notFound();

  const { frontmatter } = article;

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8 border-b border-border pb-6">
        <Link
          href={`/${section}`}
          className="text-xs font-medium uppercase tracking-wider text-accent hover:underline"
        >
          {SECTION_LABEL[section]}
        </Link>
        <h1 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
          {frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={frontmatter.publishedAt}>
            {formatDate(frontmatter.publishedAt)}
          </time>
          {frontmatter.draft && (
            <Badge variant="accent" className="text-[10px]">
              DRAFT
            </Badge>
          )}
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((t) => (
              <Badge key={t} variant="outline" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-xl prose-h3:text-lg prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
