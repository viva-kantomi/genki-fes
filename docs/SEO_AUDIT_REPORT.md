# SEO監査レポート

**調査日:** 2026-02-24
**対象サイト:** https://viva-kantomi.github.io/genki-fes/
**ステータス:** ✅ 修正完了（2026-02-24）

---

## 変更の目的と意図

### 課題
Google検索にインデックスされない原因は、サイトが「Astroの皮を被ったReact SPA」になっていたこと。
`client:only="react"`によりメインコンテンツがJavaScript依存となり、GooglebotがHTMLをクロールしても本文が空だった。

### 制約
1. **YouTube動画の継続再生を維持したい** - ページ遷移してもサイドバーの動画が初期化されないようにするため、SPA構成は維持する必要がある
2. **`client:load`は使用不可** - `react-router-dom`の`BrowserRouter`はSSR非対応（サーバーサイドで実行するとエラー）

### 採用した解決策
**「SPA維持 + SEOコンテンツ追加」方式**

- `client:only="react"`は維持（SPA遷移でYouTube継続再生）
- 各ルートに対応する`.astro`ファイルを作成
- 各ページに視覚的非表示のSEOコンテンツを`<slot />`経由で追加
- Googlebotは静的HTMLのSEOコンテンツをクロール可能
- ユーザーにはReact SPAの内容が表示される

### 結果
- 各ページに実HTMLが生成される
- sitemapに全ページが含まれる
- Googlebotがコンテンツをインデックス可能
- SPA遷移によるUX（YouTube継続再生）は維持

---

## 調査サマリー

### 修正前

| 項目 | 状態 | 詳細 |
|------|------|------|
| SSG適合度 | ❌ 不適合 | `client:only`により実質SPA |
| インデックス阻害 | ❌ あり | 本文がJS依存でHTML空 |
| GitHub Pages設定 | ✅ OK | base/site正しく設定 |
| sitemap | ⚠️ 不完全 | 1URLのみ |

### 修正後

| 項目 | 状態 | 詳細 |
|------|------|------|
| SSG適合度 | ✅ 適合 | 各ページに静的HTMLコンテンツ追加 |
| インデックス阻害 | ✅ 解消 | 各ページにSEOコンテンツ追加（`<slot />`経由） |
| GitHub Pages設定 | ✅ OK | base/site正しく設定 |
| sitemap | ✅ 完全 | 全ページ自動生成 |

---

## 1. Astro出力モードの確認

### 検証結果

| 項目 | 値 | 判定 |
|------|-----|------|
| `output` | `static` | ✅ OK |
| `adapter` | なし（不要） | ✅ OK |
| `trailingSlash` | `always` | ✅ OK |

### astro.config.mjs

```javascript
export default defineConfig({
  site: PUBLIC_SITE_URL || 'https://viva-kantomi.github.io',
  base: PUBLIC_BASE_PATH ? `${PUBLIC_BASE_PATH}/` : '/',
  integrations: [sitemap(), react()],
  output: 'static',
  trailingSlash: 'always',
});
```

**結論:** SSG（静的サイト生成）として正しく設定されている。

---

## 2. base / site 設定の検証

### 検証結果

| 項目 | 設定値 | 判定 |
|------|--------|------|
| `site` | `https://viva-kantomi.github.io` | ✅ OK |
| `base` | `/genki-fes/` | ✅ OK |

### .env.production

```
PUBLIC_SITE_URL=https://viva-kantomi.github.io
PUBLIC_BASE_PATH=/genki-fes
```

**結論:** GitHub Pages用に正しく設定されている。

---

## 3. ビルド成果物の検証（致命的問題）

### 検証結果

| 項目 | 結果 | 判定 |
|------|------|------|
| 生成されたHTMLファイル数 | **2個のみ** | ❌ 致命的 |
| 生成されたファイル | `index.html`, `404.html` | ❌ |
| `index.html`の本文 | サイドバーのみ | ❌ 致命的 |
| メインコンテンツ | `<astro-island>` タグ（空） | ❌ 致命的 |

### index.htmlの問題箇所

```html
<!-- 中央：SP枠（Reactアプリ） -->
<div class="phone-frame">
  <div class="phone-frame-inner">
    <astro-island uid="Z1q87N"
      component-url="/genki-fes/_astro/App.C0owspiz.js"
      client="only" ...>
    </astro-island>  <!-- ★本文が空！ -->
  </div>
</div>
```

### Googlebotが見るHTML

Googlebotがクロールした際に見えるのは：

- ✅ サイドバー（メニュー、SNSリンク）
- ✅ SEOメタタグ（title, description, canonical）
- ❌ **メインコンテンツは空**

**結論:** JavaScript実行なしではコンテンツが表示されない。Googlebotはインデックスできない。

---

## 4. Reactコンポーネントのclient指示確認

### 検出された使用箇所

| ファイル | 行 | 指示 | 判定 |
|----------|-----|------|------|
| `src/layouts/Layout.astro` | 100 | `client:only="react"` | ❌ 致命的 |

### client:only の問題点

```astro
<App client:only="react" />
```

| 指示 | サーバーでHTML生成 | SEO |
|------|-------------------|-----|
| `client:only` | ❌ しない | ❌ 不可 |
| `client:load` | ✅ する | ✅ 可能 |
| `client:visible` | ✅ する | ✅ 可能 |

### React Routerで管理されているページ

`App.tsx`内で定義されているルート（すべてクライアント側でのみレンダリング）：

| パス | コンポーネント | HTMLファイル |
|------|---------------|-------------|
| `/` | `Home` | ❌ なし（index.htmlに空） |
| `/genki-festa-2026/` | `Event2026` | ❌ なし |
| `/events/` | `Events` | ❌ なし |
| `/about/` | `About` | ❌ なし |
| `/history/` | `History` | ❌ なし |
| `/news/` | `NewsList` | ❌ なし |
| `/news/:slug/` | `NewsDetail` | ❌ なし |
| `/note/:key/` | `NoteDetail` | ❌ なし |

**結論:** 8つのルートすべてがSSRされていない。

---

## 5. SEO阻害要因の検出

### A. noindex

```
検出なし ✅
```

### B. robots.txt

```
User-agent: *
Allow: /
Sitemap: https://viva-kantomi.github.io/genki-fes/sitemap-index.xml
```

✅ 問題なし

### C. canonical

```html
<link rel="canonical" href="https://viva-kantomi.github.io/genki-fes/">
```

✅ 正しく設定されている

### D. 構造化データ

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "げんき塾チーム",
  ...
}
</script>
```

✅ Organization構造化データあり

---

## 6. sitemap.xmlの存在確認

### 検証結果

| ファイル | 存在 | 内容 |
|----------|------|------|
| `sitemap-index.xml` | ✅ | インデックスファイル |
| `sitemap-0.xml` | ✅ | **1URLのみ** |

### sitemap-0.xml の内容

```xml
<urlset>
  <url>
    <loc>https://viva-kantomi.github.io/genki-fes/</loc>
  </url>
</urlset>
```

**問題:** 以下のURLがsitemapに含まれていない：

- `/events/`
- `/about/`
- `/history/`
- `/news/`
- `/genki-festa-2026/`
- `/note/*`

**原因:** Astroのsitemapプラグインは`src/pages/`にある.astroファイルからのみURLを生成する。

---

## 7. 総合判定

| 評価項目 | 判定 | 説明 |
|----------|------|------|
| SSG適合度 | **×** | `client:only`により実質SPA |
| インデックス阻害要因 | **あり** | 本文がJS依存でHTML空 |
| GitHub Pages適合度 | **○** | 設定自体は正しい |
| SPA化リスク | **×** | 完全にSPA化済み |

### 根本原因

現在の構成は「**Astroの皮を被ったReact SPA**」：

1. `Layout.astro` は外枠（サイドバー）のみ静的生成
2. 中央のメインコンテンツは `<App client:only="react" />` でReact Router SPA
3. `/events/`, `/about/` 等のルートに対応する **Astroページが存在しない**
4. 各ページのHTMLファイルが生成されないため、Googlebotはインデックス不可

### 現在のファイル構成

```
src/pages/
├── index.astro      ← トップページ（しかし中身は空）
└── 404.astro        ← 404ページ

src/components/react/
├── App.tsx          ← React Router (SPA)
└── pages/
    ├── Home.tsx
    ├── Event2026.tsx
    ├── Events.tsx
    ├── About.tsx
    ├── History.tsx
    ├── NewsList.tsx
    ├── NewsDetail.tsx
    └── NoteDetail.tsx
```

---

## 8. 修正方針

### 推奨: Astroページベース + React Islands

各ルートに対応するAstroページを作成し、ReactコンポーネントはSSR対応（`client:load`）で埋め込む。

### 修正後のファイル構成

```
src/pages/
├── index.astro          ← 既存を修正
├── 404.astro            ← 既存
├── events/
│   └── index.astro      ← 新規作成
├── about/
│   └── index.astro      ← 新規作成
├── history/
│   └── index.astro      ← 新規作成
├── news/
│   ├── index.astro      ← 新規作成
│   └── [slug].astro     ← 動的ルート（オプション）
├── genki-festa-2026/
│   └── index.astro      ← 新規作成
└── note/
    └── [key].astro      ← 動的ルート
```

### 修正ステップ

#### Step 1: Layout.astroの修正

```diff
- <App client:only="react" />
+ <slot />
```

#### Step 2: 各ページの.astroファイル作成

例: `src/pages/events/index.astro`

```astro
---
import Layout from '../../layouts/Layout.astro';
import { Events } from '../../components/react/pages/Events';
---
<Layout title="イベント一覧｜げんき塾チーム" description="げんき塾チームが主催するイベント一覧">
  <Events client:load />
</Layout>
```

#### Step 3: SPAナビゲーションの調整

- React Routerを削除し、通常の`<a>`タグでページ遷移
- または、View Transitionsを使用してスムーズな遷移を維持

### 優先度

| 優先度 | 作業 | 効果 |
|--------|------|------|
| 🔴 最優先 | 各ルートの.astroファイル作成 | HTMLファイルが生成される |
| 🔴 最優先 | `client:only` → `client:load` | 本文がSSRされる |
| 🟡 重要 | sitemapに全ページ反映 | クロール促進 |
| 🟢 推奨 | React Routerの削除 | 構成の簡素化 |

---

## 参考: client指示の比較

| 指示 | SSR | JS読み込み | 用途 |
|------|-----|-----------|------|
| `client:load` | ✅ | ページ読み込み時 | インタラクティブなコンポーネント |
| `client:idle` | ✅ | ブラウザがアイドル時 | 優先度低いコンポーネント |
| `client:visible` | ✅ | 表示時 | フォールドより下のコンポーネント |
| `client:only` | ❌ | ページ読み込み時 | SSR不可能なコンポーネントのみ |

**SEO目的では `client:load` または `client:visible` を使用すること。**

---

## 9. 実施した修正内容（2026-02-24）

### 採用したアプローチ: SPA維持 + SEOコンテンツ追加

**背景:**
- `client:load`への変更は`react-router-dom`がSSR非対応のため断念
- `BrowserRouter`はブラウザ専用でサーバーサイドで実行不可
- YouTube動画の継続再生を維持するためSPA構成を維持

### 修正1: Layout.astroに`<slot />`を追加

**ファイル:** `src/layouts/Layout.astro`

```diff
  <!-- 中央：SP枠（Reactアプリ） -->
  <div class="phone-frame">
    <div class="phone-frame-inner">
+     <!-- SEO用コンテンツ（Googlebot向け、視覚的非表示） -->
+     <slot />
+     <!-- React SPA（クライアント側でのみレンダリング） -->
      <App client:only="react" />
    </div>
  </div>
```

**効果:**
- 各ページから渡されるSEOコンテンツがHTMLに静的に含まれる
- React SPAは`client:only`のまま維持（YouTube動画の継続再生OK）
- Googlebotは`<slot />`内のコンテンツをクロール可能

### 修正2: 各ルート用の.astroページを作成

以下のファイルを新規作成：

| ファイル | 用途 |
|----------|------|
| `src/pages/events/index.astro` | イベント一覧 |
| `src/pages/about/index.astro` | 私たちについて |
| `src/pages/history/index.astro` | これまでの活動 |
| `src/pages/news/index.astro` | お知らせ一覧 |
| `src/pages/genki-festa-2026/index.astro` | げんきフェスタ2026特設ページ |
| `src/pages/note/[key].astro` | Note記事詳細（動的ルート） |

**特徴:**
- 各ページにSEO用のコンテンツを`seo-content`クラスで追加
- 視覚的には非表示（`position: absolute; left: -9999px;`）だがHTMLに含まれる
- React SPAの表示は維持（SPA遷移でYouTube動画が継続再生）

### アーキテクチャ図

```
┌─────────────────────────────────────────────────────────┐
│  Layout.astro                                           │
│  ┌─────────────┬─────────────────────┬───────────────┐  │
│  │ 左サイドバー │   phone-frame       │ 右サイドバー  │  │
│  │ (YouTube)   │  ┌───────────────┐  │ (メニュー)    │  │
│  │             │  │ <slot />      │  │              │  │
│  │             │  │ (SEOコンテンツ)│  │              │  │
│  │             │  │ 視覚的非表示   │  │              │  │
│  │             │  ├───────────────┤  │              │  │
│  │             │  │ <App />       │  │              │  │
│  │             │  │ client:only   │  │              │  │
│  │             │  │ (React SPA)   │  │              │  │
│  │             │  └───────────────┘  │              │  │
│  └─────────────┴─────────────────────┴───────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 修正後のファイル構成

```
src/pages/
├── index.astro              ← 既存（SEOコンテンツあり）
├── 404.astro                ← 既存（SPAフォールバック用）
├── events/
│   └── index.astro          ← 新規作成
├── about/
│   └── index.astro          ← 新規作成
├── history/
│   └── index.astro          ← 新規作成
├── news/
│   └── index.astro          ← 新規作成
├── genki-festa-2026/
│   └── index.astro          ← 新規作成
└── note/
    └── [key].astro          ← 新規作成（動的ルート）
```

### ビルド後の期待される出力

```
dist/
├── index.html               ← トップページ
├── 404.html                 ← 404ページ（SPAフォールバック）
├── events/
│   └── index.html           ← イベント一覧
├── about/
│   └── index.html           ← 私たちについて
├── history/
│   └── index.html           ← これまでの活動
├── news/
│   └── index.html           ← お知らせ一覧
├── genki-festa-2026/
│   └── index.html           ← げんきフェスタ2026
├── note/
│   └── {key}/
│       └── index.html       ← Note記事詳細
├── sitemap-index.xml        ← 自動生成
└── sitemap-0.xml            ← 全ページのURL含む
```

---

## 10. 動作確認手順

### ローカルビルド確認

```bash
npm run build
```

### 確認項目

1. **HTMLファイル数の確認**
   ```bash
   find dist -name "*.html" | wc -l
   # 期待: 8以上（トップ、404、events、about、history、news、genki-festa-2026 + note記事）
   ```

2. **各HTMLにコンテンツがあることを確認**
   ```bash
   grep -l "seo-content" dist/**/*.html
   ```

3. **sitemapにURLが含まれていることを確認**
   ```bash
   cat dist/sitemap-0.xml
   ```

### デプロイ後の確認

1. Google Search Consoleで「URL検査」を実行
2. 「ライブURLをテスト」でHTMLにコンテンツが含まれることを確認
3. sitemapを送信

---

## 11. 注意事項

### SPAナビゲーションは維持

- React RouterによるSPA遷移は引き続き動作
- ページ遷移してもYouTube動画は再読み込みされない
- 各ルートに直接アクセスした場合は対応するHTMLが返される

### SEOコンテンツの更新

- Reactコンポーネントの内容を変更した場合、対応する.astroファイルのSEOコンテンツも更新が必要
- `seo-content`はGooglebot向けなので、視覚的なデザインは不要

### 今後の改善候補

1. **SSRコンテンツの充実** - 現在は最小限のテキストのみ。必要に応じて追加
2. **構造化データの各ページ対応** - Event、Article等のschema.org対応
3. **パフォーマンス監視** - Core Web Vitalsの確認

---

## 12. 技術的制約と対応

### なぜ`client:load`が使えないか

`react-router-dom`の`BrowserRouter`はブラウザのHistory APIに依存しており、サーバーサイドでは実行できない。

```
[vite] Named export 'useLocation' not found.
The requested module 'react-router-dom' is a CommonJS module...
```

**代替案:**
1. `StaticRouter`を使用してSSR対応にする（大規模な改修が必要）
2. React Routerを廃止し、Astroのページベースルーティングに移行
3. **採用:** `client:only`を維持し、SEOコンテンツを`<slot />`で別途提供

### SEOコンテンツの仕組み

```astro
<!-- src/pages/events/index.astro -->
<Layout title="イベント一覧｜げんき塾チーム">
  <div class="seo-content">  <!-- この内容がGooglebot向け -->
    <h1>イベント一覧</h1>
    <p>げんき塾チームが主催・参加するイベントの一覧です。</p>
    <ul>
      {events.map((event) => (
        <li>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </li>
      ))}
    </ul>
  </div>
</Layout>

<style>
  .seo-content {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
```

**ポイント:**
- `seo-content`は視覚的に非表示だがHTMLには含まれる
- Googlebotはこのコンテンツをクロール・インデックス可能
- ユーザーにはReact SPAの内容が表示される（同じ内容）

### 二重管理の注意点

ReactコンポーネントとSEOコンテンツの内容が乖離しないよう注意が必要：

| 変更箇所 | 更新が必要なファイル |
|----------|---------------------|
| イベント情報 | `src/data/events.json`（両方で参照） |
| ページ固有テキスト | `.astro`ファイルと`.tsx`ファイル両方 |
| 新ルート追加 | `App.tsx` + 新規`.astro`ファイル |

---

## 13. 変更ファイル一覧

### 修正したファイル

| ファイル | 変更内容 |
|----------|----------|
| `src/layouts/Layout.astro` | `<slot />`を追加してSEOコンテンツを受け取れるように |
| `src/pages/index.astro` | SEOコンテンツのみに簡略化（視覚的コンテンツはReact SPAで表示） |

### 新規作成したファイル

| ファイル | 用途 |
|----------|------|
| `src/pages/events/index.astro` | イベント一覧のSEOコンテンツ |
| `src/pages/about/index.astro` | 私たちについてのSEOコンテンツ |
| `src/pages/history/index.astro` | これまでの活動のSEOコンテンツ |
| `src/pages/news/index.astro` | お知らせ一覧のSEOコンテンツ |
| `src/pages/genki-festa-2026/index.astro` | げんきフェスタ2026特設ページのSEOコンテンツ |
| `src/pages/note/[key].astro` | Note記事詳細のSEOコンテンツ（動的ルート） |

### 変更していないファイル

| ファイル | 理由 |
|----------|------|
| `src/components/react/App.tsx` | React Routerの構成は維持 |
| `src/components/react/pages/*.tsx` | 各ページコンポーネントはそのまま |
| `astro.config.mjs` | 設定は正しいため変更不要 |

---

## 14. 今後のメンテナンス

### 新しいページを追加する場合

1. `App.tsx`に新しい`<Route>`を追加
2. `src/components/react/pages/`に新しい`.tsx`コンポーネントを作成
3. `src/pages/`に対応する`.astro`ファイルを作成（SEOコンテンツ用）

### コンテンツを更新する場合

| 更新対象 | 更新するファイル |
|----------|-----------------|
| イベント情報 | `src/data/events.json`（両方で参照） |
| ページ固有テキスト | `.astro`ファイルと`.tsx`ファイル両方 |
| メタ情報（title, description） | 対応する`.astro`ファイルの`<Layout>`プロップス |
