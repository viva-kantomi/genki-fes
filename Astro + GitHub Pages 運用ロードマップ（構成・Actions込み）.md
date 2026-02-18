# Astro + GitHub Pages 運用ロードマップ（構成・Actions込み）

## 0. ゴール定義（前提）
- フロント：Astro（静的生成）
- 初期ホスティング：GitHub Pages（GitHub Actionsで自動ビルド＆デプロイ）
- 将来：Cloudflare Pagesへ移行（Workers/D1でDB/APIを追加できる設計）
- 重要：URL構造を早期に固定して、移行してもURLを変えない

---

## 1. リポジトリ構成（最初から「移行しやすい切り方」）

### 1-1. 推奨ディレクトリ構成
- /src
  - /pages
    - index.astro
    - /news
      - [slug].astro
    - /about
      - index.astro
  - /layouts
  - /components
  - /styles
  - /lib
    - seo.ts
    - date.ts
- /content
  - /news
    - 2026-02-17-xxxxx.md
    - 2026-02-20-xxxxx.md
  - /pages
    - about.md
- /public
  - /images
  - favicon.svg
  - robots.txt
- /functions（将来用。Phase1では空でOK）
  - README.md
- /.github
  - /workflows
    - deploy-pages.yml
- astro.config.mjs
- package.json
- README.md

### 1-2. /content と /src の役割分担
- /content
  - Markdownなど「記事・固定文書」を置く（Git管理しやすい）
  - まずはDB無しで運用できる
- /src/pages
  - ルーティング定義（URLを決める場所）
  - /news/[slug].astro などで /content/news を参照して一覧・詳細を生成
- /functions（または /api）
  - Phase2以降に「DBが必要な機能」をここへ集約する想定
  - 例：/api/news（DBから取得）や /api/subscribe（通知登録）など
  - GitHub Pagesはサーバレス関数を動かせないので、Phase1では使わない（空でOK）

### 1-3. URL設計（移行しても変えない）
- 記事（お知らせ）：/news/スラッグ/
- 固定ページ：/about/ のようにディレクトリURL
- 画像：/images/...（public配下）
- 重要：GitHub Pagesの「/repo名/」が付く形にしない
  - 早期に独自ドメインを使うのが最も安全
  - どうしても /repo名/ が付く場合は、後で移行時にURLが変わるのでSEO的に不利になりやすい

---

## 2. Phase 1（GitHub Pagesで最速公開）

### 2-1. 初期セットアップ
1) Astroプロジェクト作成
- npm create astro@latest
- adapterは「static」（静的生成）で開始

2) コンテンツ運用の土台
- /content/news にMarkdown記事を置く
- /src/pages/news/[slug].astro で記事詳細を生成
- /src/pages/news/index.astro で一覧を生成

3) SEO最低限
- title/description/OGP
- sitemap.xml（Astroのintegration検討）
- robots.txt（publicに配置）
- 表示速度最優先（不要JSを増やさない）

### 2-2. GitHub Actions（ビルド＆デプロイ）
- 方針：GitHub Pages公式の Actions デプロイ方式を使う
- 前提：GitHub Pages の Source を「GitHub Actions」に設定

---

## 3. GitHub Pages用 GitHub Actions（deploy-pages.yml）
以下を .github/workflows/deploy-pages.yml に配置

（注意）
- このファイル中の node-version はプロジェクトに合わせて固定推奨
- package manager が yarn/pnpm の場合は該当箇所を置き換え

内容：

name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

---

## 4. Phase 1の完了条件（チェックリスト）
- main に push すると自動でPages更新される
- /news の一覧と詳細が静的生成される
- robots.txt / OGP / favicon が揃っている
- 主要ページの表示が軽い（不要なクライアントJSを増やしていない）
- URL設計が固定されている（後で移行しても同じ構造）

---

## 5. Phase 1.5（伸びる前の「移行準備」）
1) 独自ドメインを導入（推奨）
- ここで導入しておくと、Cloudflareへ移行してもURLが変わらない

2) 計測導入（最小限）
- アクセス解析を入れるなら軽量なものを優先
- まずは「ページ別PV」「流入元」だけ見えれば十分

3) 画像運用
- 画像は /public/images に集約
- できれば最初からWebP/AVIFなどを検討（ただし運用が破綻しない範囲で）

---

## 6. Phase 2（Cloudflareへ移行＋DB/APIを足す前提の設計）
この段階になったら以下を追加する想定（今は設計だけ置いておく）

### 6-1. 何をDBに載せるか（例）
- お知らせをCMSっぽく管理したい
- 申し込みフォームや問い合わせ
- 通知登録（メール or WebPush）
- イベント情報の一覧（検索など）

### 6-2. /functions の使い方（例）
- /functions/api/news.ts
  - D1からnewsを取得して返す
- /functions/api/subscribe.ts
  - 登録情報を保存する

Phase1の「Markdown運用」を残しつつ、
Phase2で「API/DB」に段階的に寄せられるのが理想

---

## 7. 実行順ロードマップ（最短）
- Day 1
  - Astro初期化
  - /content/news を作る
  - /news の一覧・詳細を作る
- Day 2
  - SEO最小セット（title/description/OGP/robots）
  - GitHub Actionsで自動デプロイ
- Day 3
  - お知らせ運用（3本ほど入れる）
  - 速度・UIの微調整
- Day 4-7
  - 固定ページ整備（about/contact/privacy等）
  - 独自ドメイン導入（可能ならここで）
- 以降（アクセスや要件が出たら）
  - Phase2計画：Cloudflare Pages + Workers + D1

---

## 8. 次にこちらで作れるもの（必要なら）
- Astro用の「newsテンプレ（frontmatter項目、OGP、一覧ソート、タグ）」一式
- URLを変えないための「独自ドメイン導入・移行手順書」
- Phase2用の「Workers + D1 のAPI設計（エンドポイント/テーブル/キャッシュ）」
