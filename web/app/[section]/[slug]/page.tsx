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
      <div className="mb-10 border-b border-border pb-8">
        <Link
          href={`/${section}`}
          className="eyebrow hover:text-foreground"
        >
          {SECTION_LABEL[section]}
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.4] tracking-tight md:text-4xl md:leading-[1.35]">
          {frontmatter.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time className="tabular-nums" dateTime={frontmatter.publishedAt}>
            {formatDate(frontmatter.publishedAt)}
          </time>
          {frontmatter.draft && <Badge variant="outline">DRAFT</Badge>}
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {frontmatter.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:leading-[1.9] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-foreground prose-blockquote:not-italic prose-blockquote:font-normal prose-code:rounded-none prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-img:my-8">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
