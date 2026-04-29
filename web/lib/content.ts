import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), '..', 'content');

export type Section = 'analysis' | 'prototype' | 'experiments' | 'logs';

export interface Frontmatter {
  title: string;
  section: Section;
  fields?: string[];
  publishedAt: string;
  draft?: boolean;
  description?: string;
  tags?: string[];
}

export interface ArticleSummary {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
}

export interface Article {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

async function readMdxFile(section: Section, file: string): Promise<Article> {
  const slug = file.replace(/\.mdx$/, '');
  const fullPath = path.join(CONTENT_ROOT, section, file);
  const raw = await fs.readFile(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as Frontmatter, content };
}

export async function listArticles(section: Section): Promise<ArticleSummary[]> {
  const dir = path.join(CONTENT_ROOT, section);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const articles = await Promise.all(
    entries.filter((f) => f.endsWith('.mdx')).map((f) => readMdxFile(section, f)),
  );

  return articles
    .filter((a) => !a.frontmatter.draft)
    .map((a) => ({
      slug: a.slug,
      title: a.frontmatter.title,
      description: a.frontmatter.description,
      publishedAt: a.frontmatter.publishedAt,
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function readArticle(
  section: Section,
  slug: string,
): Promise<Article | null> {
  try {
    return await readMdxFile(section, `${slug}.mdx`);
  } catch {
    return null;
  }
}
