# web/ — メディア構築

Next.js（App Router）+ MDX + Tailwind CSS + shadcn/ui で構築するフロントエンド。
記事ソースは [../content/](../content/) を読み込む。

## ステータス

未初期化。Phase 1 で `create-next-app` で初期化する。

## 想定する構成（初期化時のメモ）

```
web/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                 トップ
│   │   ├── analysis/
│   │   │   ├── page.tsx             一覧
│   │   │   └── [slug]/page.tsx      記事
│   │   ├── prototype/
│   │   ├── experiments/
│   │   ├── logs/
│   │   └── about/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          shadcn/ui
│   ├── article/                     ArticleCard, MDX renderer など
│   └── layout/                      Header, Footer
├── lib/
│   ├── content.ts                   ../content の MDX を読み込み
│   ├── mdx.ts                       MDX レンダラ設定
│   └── sections.ts                  セクション・フィールドの定義
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ホスティング

AWS Amplify。monorepo の `web/` をビルドルートに指定する。
