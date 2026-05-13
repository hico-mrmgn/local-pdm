import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), '..', 'content');

export type Section = 'analysis' | 'prototype' | 'experiments' | 'logs' | 'frameworks';

export const SECTIONS: Section[] = ['analysis', 'prototype', 'experiments', 'logs', 'frameworks'];

export const SECTION_LABEL: Record<Section, string> = {
  analysis: '構造分析',
  prototype: 'プロトタイピング',
  experiments: '検証',
  logs: 'ログ',
  frameworks: 'フレームワーク',
};

export const SECTION_TAGLINE: Record<Section, string> = {
  analysis: 'PdM視点で地域課題を言語化・構造化する',
  prototype: '課題発見→仮説→プロト→学びのサイクルを実名フィールドで',
  experiments: '作ったもの・試したことのレポート',
  logs: '喜茂別での動きなど、等身大の記録',
  frameworks: '地域でも事業でも、課題を解く前に立ち戻れる考え方',
};

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
  section: Section;
  title: string;
  description?: string;
  publishedAt: string;
  tags?: string[];
}

export interface Article {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

function normalizePublishedAt(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '');
}

async function readMdxFile(section: Section, file: string): Promise<Article> {
  const slug = file.replace(/\.mdx$/, '');
  const fullPath = path.join(CONTENT_ROOT, section, file);
  const raw = await fs.readFile(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = {
    ...(data as Frontmatter),
    publishedAt: normalizePublishedAt((data as Frontmatter).publishedAt),
  };
  return { slug, frontmatter, content };
}

function toSummary(a: Article): ArticleSummary {
  return {
    slug: a.slug,
    section: a.frontmatter.section,
    title: a.frontmatter.title,
    description: a.frontmatter.description,
    publishedAt: a.frontmatter.publishedAt,
    tags: a.frontmatter.tags,
  };
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
    .filter((a) => SHOW_DRAFTS || !a.frontmatter.draft)
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function listAllArticles(): Promise<ArticleSummary[]> {
  const lists = await Promise.all(SECTIONS.map((s) => listArticles(s)));
  return lists
    .flat()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function readArticle(
  section: Section,
  slug: string,
): Promise<Article | null> {
  try {
    const article = await readMdxFile(section, `${slug}.mdx`);
    if (!SHOW_DRAFTS && article.frontmatter.draft) return null;
    return article;
  } catch {
    return null;
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}
