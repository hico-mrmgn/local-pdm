import Link from 'next/link';
import { SECTIONS, SECTION_LABEL } from '@/lib/content';

export function SiteHeader() {
  return (
    <header className="border-b-2 border-accent bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-8 md:flex-row md:items-end md:justify-between md:py-10">
        <Link href="/" className="inline-block">
          <span className="eyebrow">Local PdM Journal</span>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight md:text-[1.7rem]">
            地域課題、どう解く？
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            まちに、プロダクト思考を。
          </p>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
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
            about
          </Link>
        </nav>
      </div>
    </header>
  );
}
