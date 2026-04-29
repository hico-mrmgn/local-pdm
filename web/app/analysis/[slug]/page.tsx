import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';

export async function generateStaticParams() {
  const articles = await listArticles('analysis');
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await readArticle('analysis', slug);
  if (!article) notFound();

  return (
    <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl">
      <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
        地域課題の構造と分析
      </p>
      <h1>{article.frontmatter.title}</h1>
      <MDXRemote source={article.content} />
    </article>
  );
}
