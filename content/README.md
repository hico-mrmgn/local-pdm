# content/ — コンテンツ管理

記事本体・素材・記事生成プロンプトを管理する。`web/` を知らなくても運用できることを目指す。

## ディレクトリ

| パス | 用途 |
|---|---|
| [analysis/](analysis/) | 地域課題の構造と分析（3,000〜5,000字） |
| [prototype/](prototype/) | プロトタイプのつくりかた（3,000〜5,000字） |
| [experiments/](experiments/) | 実際にやってみた（2,000〜4,000字） |
| [logs/](logs/) | 活動ログ（1,000〜2,000字） |
| [drafts/](drafts/) | 公開前の下書き |
| [assets/](assets/) | 記事内で使う画像など。slug ごとにサブフォルダ |
| [sources/](sources/) | 議事録・現地メモなどの素材（gitignore 済み） |
| [prompts/](prompts/) | Claude で記事化する時のプロンプト集 |

## 記事ファイル

- 拡張子: `.mdx`
- ファイル名: `<slug>.mdx`（kebab-case 推奨、日付は frontmatter で）
- 置き場所: 該当セクションのディレクトリ直下

### frontmatter

```yaml
---
title: "記事タイトル"
section: analysis            # analysis | prototype | experiments | logs
fields: ["tigris"]           # 任意・複数可。tigris | seinen-bu | school | parenting
publishedAt: 2026-04-26
draft: false
description: "一覧やOGに使う短い説明"
tags: ["ゴミ問題", "環境設計"]
---
```

## 記事を書く流れ

1. ソースを集めて [sources/](sources/) に置く
2. [prompts/article-from-source.md](prompts/article-from-source.md) を Claude に渡す
3. 生成された記事を該当セクションに配置
4. frontmatter を埋める
5. push → AWS Amplify が公開

詳細は [../docs/workflow.md](../docs/workflow.md) を参照。
