import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/article-card';
import {
  SECTIONS,
  SECTION_LABEL,
  SECTION_TAGLINE,
  listArticles,
  type Section,
} from '@/lib/content';

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

function isSection(value: string): value is Section {
  return (SECTIONS as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  return {
    title: SECTION_LABEL[section],
    description: SECTION_TAGLINE[section],
  };
}

export default async function SectionIndex({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  const articles = await listArticles(section);

  return (
    <div className="space-y-10">
      <header className="border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Section
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          {SECTION_LABEL[section]}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          {SECTION_TAGLINE[section]}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">記事はまだありません。</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard
              key={`${a.section}-${a.slug}`}
              article={a}
              showSection={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
