import Link from 'next/link';
import { SECTIONS, SECTION_LABEL } from '@/lib/content';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-end md:justify-between md:py-8">
        <Link href="/" className="inline-block">
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">
            地域課題、どう解く？
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            まちに、プロダクト思考を。
          </p>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {SECTION_LABEL[s]}
            </Link>
          ))}
          <Link
            href="/about"
            className="text-muted-foreground transition hover:text-foreground"
          >
            このメディアについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
