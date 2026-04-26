# 地域課題、どう解く？

> まちに、プロダクト思考を。

PdMとしての経験と AI 活用を通じて、地域課題の解決アプローチを発信するメディア（仮ドメイン: `localpdm.jp`）のリポジトリ。

詳細は [docs/design-doc.md](docs/design-doc.md) を参照。

## ディレクトリ構成

```
local-pdm/
├── docs/        設計・運用ドキュメント（Design Doc、文体方針、ワークフロー）
├── web/         メディア構築（Next.js + MDX + Tailwind + shadcn/ui）
└── content/     コンテンツ管理（記事 MDX、素材、生成プロンプト）
```

メディア構築（`web/`）と コンテンツ管理（`content/`）を意図的に分離している。

- **`web/`**: フロントエンドアプリ。`content/` の MDX を読み込んでレンダリング。AWS Amplify でホスティング予定。
- **`content/`**: 記事と素材。執筆者と読者の体験に最適化。`web/` を知らなくても運用できる。
- **`docs/`**: 「なぜこのメディアか」「どう書くか」を集約。記事生成プロンプトの一次ソース。

## コンテンツの4セクション

| セクション | ディレクトリ | 目安文字数 |
|---|---|---|
| 地域課題の構造と分析 | [content/analysis/](content/analysis/) | 3,000〜5,000 |
| プロトタイプのつくりかた | [content/prototype/](content/prototype/) | 3,000〜5,000 |
| 実際にやってみた | [content/experiments/](content/experiments/) | 2,000〜4,000 |
| 活動ログ | [content/logs/](content/logs/) | 1,000〜2,000 |

## コンテンツループ

```
事実（経験・直面したこと） → 分析 → 仮説・プロト → 検証 → また新しい事実
```

プロダクト開発のサイクルそのものを、地域課題解決の方法論として構造で示す。詳細は [docs/content-loop.md](docs/content-loop.md)。

## 執筆ワークフロー

```
活動・会議・現地メモ（ソースは何でもいい）
　↓
Claude で構造化・記事化（プロンプト: content/prompts/）
　↓
Markdown(MDX) として content/ にコミット
　↓
web/ が読み込んで公開
```

詳細は [docs/workflow.md](docs/workflow.md)。

## 開発状況

Phase 1（MVP）に向けた土台のみ。`web/` の Next.js 初期化はこれから。フェーズ計画は [Design Doc §8](docs/design-doc.md) を参照。
