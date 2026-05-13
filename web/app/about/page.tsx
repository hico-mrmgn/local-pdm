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
      <div className="mb-10 border-b border-border pb-8">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.35] tracking-tight md:text-4xl">
          {data.title}
        </h1>
        {data.description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {data.description}
          </p>
        )}
      </div>

      <div className="prose prose-slate max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:leading-[1.9] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-foreground prose-blockquote:not-italic prose-blockquote:font-normal prose-code:rounded-none prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
