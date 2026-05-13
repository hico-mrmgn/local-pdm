import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

const ABOUT_PATH = path.join(process.cwd(), '..', 'content', 'about.mdx');

async function loadAbout() {
  const raw = await fs.readFile(ABOUT_PATH, 'utf-8');
  const { data, content } = matter(raw);
  return { data: data as { title: string; description?: string }, content };
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadAbout();
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function AboutPage() {
  const { data, content } = await loadAbout();
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8 border-b border-border pb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          About
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
          {data.title}
        </h1>
        {data.description && (
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {data.description}
          </p>
        )}
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-xl prose-h3:text-lg prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
