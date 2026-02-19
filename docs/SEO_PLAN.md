# げんきフェスタ SEO対策計画書

**対象サイト**: https://viva-kantomi.github.io/genki-fes/
**対象キーワード**: 群馬県、富岡市、げんきフェスタ、イベント、祭
**作成日**: 2026-02-19
**ステータス**: Phase 1 完了 / Phase 2 ローンチ時実施予定

---

## 実施済み（Phase 1）

### 1. robots.txt 修正 ✅
- **変更内容**: Sitemap URLを正しいURLに修正
- **ファイル**: `public/robots.txt`
```
Sitemap: https://viva-kantomi.github.io/genki-fes/sitemap-index.xml
```

### 2. デフォルト meta description 改善 ✅
- **変更内容**: キーワードを含む説明文に変更
- **ファイル**: `src/layouts/Layout.astro`
```
群馬県富岡市発！げんき塾チームが主催する「げんきフェスタ」公式サイト。
地域を元気にするイベント・お祭りの企画運営。音楽、グルメ、ワークショップ
など家族で楽しめるイベント情報をお届けします。
```

### 3. meta keywords 追加 ✅
- **ファイル**: `src/layouts/Layout.astro`
```html
<meta name="keywords" content="げんきフェスタ,群馬県,富岡市,イベント,祭,フェス,地域イベント,げんき塾チーム" />
```

### 4. 各ページ個別 meta description 設定 ✅

| ページ | title | description |
|--------|-------|-------------|
| トップ | げんき塾チーム｜群馬県富岡市のイベント・お祭り企画 | 群馬県富岡市を拠点に活動する「げんき塾チーム」公式サイト... |
| イベント一覧 | イベント一覧｜群馬県富岡市のげんきフェスタ・お祭り情報 | 群馬県富岡市で開催されるげんきフェスタ、げんきマルシェ... |
| 2026特設 | げんきフェスタ2026｜群馬県富岡市の夏祭り・イベント特設ページ | げんきフェスタ2026の特設ページ。群馬県富岡市発の... |
| HISTORY | 過去のげんきフェスタ｜群馬県富岡市のイベント・お祭りの歴史 | 群馬県富岡市で開催されてきた「げんきフェスタ」の歴史... |
| ABOUT | このサイトについて｜げんきフェスタ・群馬県富岡市のイベント情報 | 群馬県富岡市を拠点に活動する「げんき塾チーム」と... |

### 5. JSON-LD 構造化データ実装 ✅

#### Organization スキーマ（全ページ共通）
- **ファイル**: `src/layouts/Layout.astro`
```json
{
  "@type": "Organization",
  "name": "げんき塾チーム",
  "description": "群馬県富岡市を拠点とする地域イベント企画チーム",
  "address": {
    "addressLocality": "富岡市",
    "addressRegion": "群馬県"
  }
}
```

#### Event スキーマ（2026特設ページ）
- **ファイル**: `src/pages/2026/index.astro`
```json
{
  "@type": "Event",
  "name": "げんきフェスタ2026",
  "startDate": "2026-08-15T10:00:00+09:00",
  "endDate": "2026-08-15T17:00:00+09:00",
  "location": {...},
  "organizer": {...},
  "offers": { "price": "0" }
}
```

### 6. 言語設定 ✅
- **ファイル**: `src/layouts/Layout.astro`
```html
<html lang="ja">
<link rel="alternate" hreflang="ja" href={canonicalURL} />
```

### 7. モバイル向けメタタグ ✅
```html
<meta name="theme-color" content="#d92325" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

### 8. h1タグ設定 ✅
- トップページに視覚的非表示のh1を追加
- 各ページのh1タグを適切に設定

---

## ローンチ時実施予定（Phase 2）

### 1. Google Search Console 登録
- [ ] サイト所有権の確認
- [ ] サイトマップの送信（sitemap-index.xml）
- [ ] インデックス登録のリクエスト

### 2. Google Analytics 4 設定
- [ ] GA4プロパティ作成
- [ ] トラッキングコードの設置
- [ ] イベントトラッキング設定（ボタンクリック等）

### 3. OGP画像の最適化
- [ ] `og-default.png` の確認・作成
- [ ] サイズ: 1200x630px 推奨
- [ ] 各ページ用のOGP画像作成（必要に応じて）

### 4. パフォーマンス最適化
- [ ] Lighthouse スコア確認
- [ ] Core Web Vitals 対応
  - LCP（Largest Contentful Paint）
  - FID（First Input Delay）
  - CLS（Cumulative Layout Shift）
- [ ] 画像の最適化（WebP変換済み確認）

### 5. 外部サービス連携
- [ ] Google ビジネスプロフィール登録（ローカルSEO）
- [ ] SNSアカウントのURLをJSON-LDのsameAsに追加
- [ ] noteとの連携強化

### 6. コンテンツ追加
- [ ] イベントページの詳細情報追加
- [ ] 過去イベントの写真ギャラリー
- [ ] 出店者・出演者情報
- [ ] FAQ ページ作成

### 7. 地域SEO強化（ローカルSEO）
- [ ] 「群馬県 イベント」での検索対策
- [ ] 「富岡市 祭り」での検索対策
- [ ] 近隣地域キーワードの追加
  - 高崎市、前橋市、安中市 など

---

## 継続的な改善（Phase 3）

### モニタリング
- [ ] Search Console でのクエリ分析
- [ ] GA4 でのユーザー行動分析
- [ ] 検索順位のトラッキング

### コンテンツマーケティング
- [ ] ブログ記事の定期更新
- [ ] SNSとの連携強化
- [ ] プレスリリース配信

### 技術的SEO
- [ ] サイト速度の継続的監視
- [ ] 構造化データのテスト
- [ ] モバイルフレンドリーテスト

---

## 現在のSEO評価

### 改善前: 6.5/10
- 基本的なSEO対策は実装済み
- robots.txtに致命的エラー
- キーワード未使用
- 構造化データ未実装

### 改善後（Phase 1完了）: 8.0/10
- robots.txt 修正完了
- キーワード最適化完了
- JSON-LD 実装完了
- メタデータ最適化完了

### 目標（Phase 2完了後）: 9.0/10
- Google Search Console 連携
- GA4 設置
- パフォーマンス最適化

---

## 参考リンク

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Schema.org - Event](https://schema.org/Event)
- [Schema.org - Organization](https://schema.org/Organization)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [リッチリザルトテスト](https://search.google.com/test/rich-results)

---

## 変更履歴

| 日付 | 内容 |
|------|------|
| 2026-02-19 | Phase 1 実施完了 |
| - | Phase 2 ローンチ時実施予定 |
