# 執筆ワークフロー

「思考は僕、執筆はAI」を体現するための運用フロー。

```
活動・会議・現地活動
　↓
ソース（議事録・メモ・会話・写真など何でも） → content/sources/ に保管
　↓
Claude で構造化・記事化（content/prompts/ のテンプレートを使う）
　↓
content/<section>/ に MDX としてコミット
　↓
web/ がビルド時に読み込み → Vercel で公開
```

## ステップ詳細

### 1. ソースを集める
- 何でもよい。Notion議事録、ボイスメモ文字起こし、Slack の発言、写真
- 公開しない素材は `content/sources/` に置く（gitignore 対象）

### 2. 記事化する
- `content/prompts/article-from-source.md` のプロンプトを Claude に渡す
- 文体は [style-guide.md](./style-guide.md) に従う
- セクションと文字数の目安は [design-doc.md](./design-doc.md) §2 を参照

### 3. 記事を配置する
- ファイル名: `<slug>.mdx`（日付は frontmatter で管理）
- 置き場所: `content/<section>/`
- 画像などのアセット: `content/assets/<slug>/`

### 4. frontmatter
```yaml
---
title: "記事タイトル"
section: analysis  # analysis | prototype | experiments | logs
fields: ["tigris"]  # tigris | seinen-bu | school | parenting （任意・複数可）
publishedAt: 2026-04-26
draft: false
description: "OG/一覧用の短い説明"
tags: ["ゴミ問題", "環境設計"]
---
```

### 5. 公開
- main ブランチへの push で Vercel が自動ビルド・デプロイ（プロジェクト: `local-pdm`、Root Directory: `web/`）
- 公開後、X に手動でポスト
