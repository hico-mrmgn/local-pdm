export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">地域課題、どう解く？</p>
        <p className="mt-1">まちに、プロダクト思考を。</p>
        <p className="mt-4 text-xs">
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
