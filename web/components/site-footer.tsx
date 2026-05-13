export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-12 text-sm text-muted-foreground">
        <p className="font-serif text-base font-semibold text-foreground">
          地域課題、どう解く？
        </p>
        <p className="mt-1">まちに、プロダクト思考を。</p>
        <p className="mt-6 text-xs leading-relaxed">
          このサイトの記事・コード・AIプロンプトは{' '}
          <a
            href="https://github.com/hico-mrmgn/local-pdm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-foreground"
          >
            GitHub
          </a>
          {' '}で公開しています。
        </p>
        <p className="mt-2 text-xs">
          © {new Date().getFullYear()} 加藤朝彦 / Tigris
        </p>
      </div>
    </footer>
  );
}
