# web/ — メディア構築

Next.js 15（App Router）+ MDX + Tailwind CSS で構築するフロントエンド。
記事ソースは [../content/](../content/) を読み込む。

## セットアップ

```bash
pnpm install
pnpm dev      # 開発サーバー
pnpm build    # 本番ビルド
pnpm start    # 本番サーバー
```

デフォルトは `http://localhost:3000`。ポートが使用中の場合 Next.js が自動で空きポートに切り替える。

## 構成

```
web/
├── app/
│   ├── layout.tsx                共通ヘッダー＋Tailwindの読み込み
│   ├── page.tsx                  トップ（analysis 記事一覧）
│   ├── globals.css               Tailwind base
│   └── analysis/[slug]/page.tsx  記事詳細（MDX レンダリング）
├── lib/
│   └── content.ts                ../content/<section>/*.mdx を読む
├── next.config.mjs               outputFileTracingRoot を親に設定
├── tailwind.config.ts            @tailwindcss/typography を有効化
└── package.json
```

## MDX レンダリング

`next-mdx-remote/rsc` で Server Component から直接レンダリング。`gray-matter` で frontmatter をパース。

セクション（prototype/experiments/logs）の追加は `app/<section>/[slug]/page.tsx` を `analysis/[slug]/page.tsx` をコピーして作る。

## ホスティング

Vercel。プロジェクト `local-pdm` の Root Directory を `web/` に設定し、`main` への push で自動デプロイされる。本番 URL: https://local-pdm.vercel.app
