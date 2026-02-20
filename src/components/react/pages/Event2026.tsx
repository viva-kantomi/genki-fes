import { useEffect, useState, useRef } from 'react';
import shopsData from '../../../data/shops.json';

// イベント情報
const eventInfo = {
  date: '2026年5月24日（日）',
  dateShort: '2026.5.24 SUN',
  time: '10:00〜16:00',
  location: '群馬県富岡市 宮本町商店街',
  theme: '元気、無限大！',
};

// タイムスケジュール（未定）
const schedule = [
  { time: '10:00', content: '開場', description: '各エリアオープン' },
  { time: '10:30', content: '調整中', description: '詳細は後日発表' },
  { time: '11:00', content: '調整中', description: '詳細は後日発表' },
  { time: '12:00', content: '調整中', description: '詳細は後日発表' },
  { time: '13:00', content: '調整中', description: '詳細は後日発表' },
  { time: '14:00', content: '調整中', description: '詳細は後日発表' },
  { time: '15:00', content: '調整中', description: '詳細は後日発表' },
  { time: '16:00', content: '閉場', description: '' },
];

// 出店情報の型
interface Shop {
  name: string;
  enName: string;
  category: string;
  summary: string;
  detail?: string;
  appeal?: string;
  hasImage?: boolean;
}

// エリア情報・出店情報をJSONから読み込み
const areas = shopsData.areas;
const shops = shopsData.shops as Record<string, Shop[]>;

// 特設ページ用アセットのベースパス
const basePath = import.meta.env.BASE_URL || '/';
const assetsPath = `${basePath}assets/genki-festa-2026/`;

// 出店画像パスを生成
const getShopImagePath = (enName: string) => `${assetsPath}shops/${enName}.webp`;

export function Event2026() {
  const [days, setDays] = useState('---');
  const [, setActiveArea] = useState<string | null>(null);
  const areaRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date('2026-05-24T10:00:00+09:00');
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      const daysLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      setDays(daysLeft.toString());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // スクロール監視でアクティブエリアを更新
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const area of areas) {
        const element = areaRefs.current[area.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveArea(area.id);
            return;
          }
        }
      }
      setActiveArea(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToArea = (areaId: string) => {
    const element = areaRefs.current[areaId];
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ヒーローセクション */}
      <section className="hero-2026">
        <div className="hero-inner">
          <p className="hero-date">{eventInfo.dateShort}</p>
          <h1 className="hero-title">
            <span className="title-year">2026</span>
            <span className="title-main">げんきフェスタ</span>
          </h1>
          <p className="hero-theme">テーマ：「{eventInfo.theme}」</p>
          <div className="hero-info">
            <p>{eventInfo.location}</p>
            <p>{eventInfo.time} / 入場無料</p>
          </div>
        </div>
      </section>

      {/* カウントダウン */}
      <section className="countdown-section">
        <div className="container">
          <p className="countdown-label">開催まであと</p>
          <div className="countdown-display">
            <div className="countdown-item">
              <span className="countdown-number">{days}</span>
              <span className="countdown-unit">日</span>
            </div>
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section className="section">
        <div className="container">
          <p className="section-label">CONCEPT</p>
          <h2 className="section-title">元気、無限大！</h2>
          <p className="section-lead">
            今年のげんきフェスタは「元気、無限大！」をテーマに、
            老若男女みんなが楽しめるフェスティバルを目指します。
            地域の絆を深め、笑顔あふれる一日を一緒に作りましょう！
          </p>
        </div>
      </section>

      {/* タイムスケジュール */}
      <section className="section section--white">
        <div className="container">
          <p className="section-label">TIMETABLE</p>
          <h2 className="section-title">タイムスケジュール</h2>
          <p className="schedule-notice">※現在調整中です。決まり次第更新します。</p>
          <div className="timetable">
            {schedule.map((item, index) => (
              <div key={index} className="timetable-item">
                <div className="timetable-time">{item.time}</div>
                <div className="timetable-content">
                  <p className="timetable-title">{item.content}</p>
                  {item.description && <p className="timetable-desc">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="timetable-note">※スケジュールは予告なく変更になる場合があります</p>
        </div>
      </section>

      {/* 全体エリア紹介 */}
      <section className="section">
        <div className="container">
          <p className="section-label">AREA MAP</p>
          <h2 className="section-title">会場マップ</h2>

          {/* 全体マップ画像（仮） */}
          <div className="map-overview">
            <div className="map-placeholder">
              <span className="placeholder-text">会場全体マップ</span>
              <span className="placeholder-sub">（準備中）</span>
            </div>
          </div>

          <p className="map-description">
            宮本町商店街の4つのエリアで、さまざまな出店やイベントをお楽しみいただけます。
          </p>

          {/* エリア一覧 */}
          <div className="area-grid">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => scrollToArea(area.id)}
                className="area-card-link"
                style={{ '--area-color': area.color } as React.CSSProperties}
              >
                <div className="area-badge">{area.id}</div>
                <div className="area-info">
                  <h3 className="area-name">{area.name}</h3>
                  <span className="area-arrow">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 個別エリア紹介 + 出店情報 */}
      <section className="section section--white">
        <div className="container">
          <p className="section-label">SHOPS</p>
          <h2 className="section-title">エリア別出店情報</h2>

          {areas.map((area) => (
            <div
              key={area.id}
              ref={(el) => { areaRefs.current[area.id] = el; }}
              className="area-section"
              style={{ '--area-color': area.color } as React.CSSProperties}
            >
              {/* スティッキーヘッダー */}
              <div className="area-sticky-header">
                <div className="area-header-content">
                  <span className="area-header-badge">{area.id}</span>
                  <span className="area-header-name">{area.name}</span>
                </div>
              </div>

              {/* エリア画像（仮） */}
              <div className="area-image-wrapper">
                <div className="area-image-placeholder">
                  <span className="placeholder-text">{area.name}</span>
                  <span className="placeholder-sub">（写真準備中）</span>
                </div>
              </div>

              {/* 出店一覧 */}
              <div className="shop-list">
                {shops[area.id]?.map((shop, index) => (
                  <div key={index} className="shop-card">
                    {/* 上部：画像 + 基本情報 */}
                    <div className="shop-card-header">
                      {shop.hasImage ? (
                        <div className="shop-image">
                          <img src={getShopImagePath(shop.enName)} alt={shop.name} />
                        </div>
                      ) : (
                        <div className="shop-image shop-image--placeholder">
                          <span>No Image</span>
                        </div>
                      )}
                      <div className="shop-info">
                        <div className="shop-category">{shop.category}</div>
                        <h4 className="shop-name">{shop.name}</h4>
                        <p className="shop-summary">{shop.summary}</p>
                      </div>
                    </div>
                    {/* 下部：詳細・アピールポイント */}
                    {(shop.detail || shop.appeal) && (
                      <div className="shop-card-body">
                        {shop.detail && (
                          <div className="shop-detail">
                            <span className="shop-detail-label">詳細</span>
                            <p>{shop.detail}</p>
                          </div>
                        )}
                        {shop.appeal && (
                          <div className="shop-appeal">
                            <span className="shop-appeal-label">アピールポイント</span>
                            <p>{shop.appeal}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* アクセス */}
      <section className="section section--blue">
        <div className="container">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>ACCESS</p>
          <h2 className="section-title">アクセス</h2>
          <div className="access-info">
            <div className="access-item">
              <h3>電車でお越しの方</h3>
              <p>上信電鉄「上州富岡駅」より徒歩約10分</p>
            </div>
            <div className="access-item">
              <h3>お車でお越しの方</h3>
              <p>上信越自動車道「富岡IC」より約10分</p>
              <p>※会場周辺の駐車場をご利用ください</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }

        /* ヒーロー */
        .hero-2026 {
          background: linear-gradient(135deg, var(--color-blue) 0%, var(--color-primary) 50%, var(--color-secondary) 100%);
          padding: var(--space-2xl) var(--space-md);
          text-align: center;
          color: white;
          border-bottom: 2px solid var(--color-border);
        }

        .hero-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-date {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: var(--space-sm);
          opacity: 0.9;
        }

        .hero-title {
          margin-bottom: var(--space-md);
        }

        .title-year {
          display: block;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          text-shadow: 3px 3px 0 var(--color-border);
        }

        .title-main {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          margin-top: var(--space-xs);
        }

        .hero-theme {
          font-size: 1rem;
          font-weight: 700;
          background: var(--color-yellow);
          color: var(--color-text);
          display: inline-block;
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-md);
        }

        .hero-info {
          font-size: 0.9rem;
          line-height: 1.8;
          opacity: 0.95;
        }

        /* カウントダウン */
        .countdown-section {
          background: var(--color-yellow);
          padding: var(--space-lg) 0;
          text-align: center;
          border-bottom: 2px solid var(--color-border);
        }

        .countdown-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--space-xs);
        }

        .countdown-display {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
        }

        .countdown-item {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .countdown-number {
          font-size: 3rem;
          font-weight: 900;
          color: var(--color-primary);
          line-height: 1;
        }

        .countdown-unit {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
        }

        /* セクション共通 */
        .section {
          padding: var(--space-xl) 0;
        }

        .section--white {
          background: var(--color-bg-white);
        }

        .section--blue {
          background: var(--color-primary);
          color: white;
        }

        .section--accent {
          background: var(--color-secondary);
          color: white;
          text-align: center;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-primary);
          margin-bottom: var(--space-xs);
        }

        .section--blue .section-label {
          color: var(--color-yellow);
        }

        .section-title {
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 1.4;
          margin-bottom: var(--space-md);
          padding: var(--space-sm) var(--space-lg);
          background: var(--color-primary);
          color: white;
          border: 3px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
        }

        .section--blue .section-title {
          background: var(--color-yellow);
          color: var(--color-text);
        }

        .section-lead {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--color-text-muted);
        }

        /* スケジュール注意書き */
        .schedule-notice {
          background: var(--color-yellow);
          color: var(--color-text);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: var(--space-md);
          text-align: center;
        }

        /* タイムテーブル */
        .timetable {
          display: flex;
          flex-direction: column;
        }

        .timetable-item {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--color-border);
        }

        .timetable-time {
          font-size: 1rem;
          font-weight: 900;
          color: var(--color-primary);
          min-width: 60px;
        }

        .timetable-content {
          flex: 1;
        }

        .timetable-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .timetable-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .timetable-note {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-top: var(--space-md);
        }

        /* 全体マップ */
        .map-overview {
          margin-bottom: var(--space-md);
        }

        .map-placeholder,
        .area-image-placeholder {
          background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
        }

        .map-placeholder {
          aspect-ratio: 16 / 9;
        }

        .placeholder-text {
          font-size: 1rem;
          font-weight: 700;
        }

        .placeholder-sub {
          font-size: 0.8rem;
          margin-top: var(--space-xs);
        }

        .map-description {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: var(--space-lg);
        }

        /* エリアグリッド */
        .area-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
        }

        .area-card-link {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: white;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--color-text);
          transition: all 0.2s;
          border-left: 4px solid var(--area-color);
          cursor: pointer;
          width: 100%;
          text-align: left;
        }

        .area-card-link:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .area-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--area-color);
          color: white;
          font-weight: 900;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .area-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .area-name {
          font-size: 0.85rem;
          font-weight: 700;
          margin: 0;
        }

        .area-arrow {
          color: var(--color-text-muted);
          font-size: 1rem;
        }

        /* 個別エリアセクション */
        .area-section {
          margin-bottom: var(--space-2xl);
          scroll-margin-top: 100px;
        }

        .area-section:last-child {
          margin-bottom: 0;
        }

        /* スティッキーヘッダー */
        .area-sticky-header {
          position: sticky;
          top: 56px;
          z-index: 10;
          background: var(--area-color);
          margin: 0 calc(-1 * var(--space-md));
          padding: var(--space-sm) var(--space-md);
          border-bottom: 2px solid var(--color-border);
        }

        .area-header-content {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          max-width: 600px;
          margin: 0 auto;
        }

        .area-header-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          color: var(--area-color);
          font-weight: 900;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .area-header-name {
          color: white;
          font-weight: 700;
          font-size: 1rem;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
        }

        /* エリア画像 */
        .area-image-wrapper {
          margin: var(--space-md) 0;
        }

        .area-image-placeholder {
          aspect-ratio: 16 / 10;
        }

        /* 出店リスト */
        .shop-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .shop-card {
          background: white;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        /* 上部：画像 + 基本情報 */
        .shop-card-header {
          display: flex;
          gap: var(--space-sm);
          padding: var(--space-md);
        }

        .shop-image {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .shop-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shop-image--placeholder {
          background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          font-size: 0.7rem;
        }

        .shop-info {
          flex: 1;
          min-width: 0;
        }

        .shop-category {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          background: var(--color-bg);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-xs);
          color: var(--color-text-muted);
        }

        .shop-name {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .shop-summary {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin: 0;
          line-height: 1.5;
        }

        /* 下部：詳細・アピールポイント */
        .shop-card-body {
          padding: var(--space-md);
          border-top: 1px solid var(--color-border);
          background: var(--color-bg);
        }

        .shop-detail,
        .shop-appeal {
          margin-bottom: var(--space-sm);
        }

        .shop-detail:last-child,
        .shop-appeal:last-child {
          margin-bottom: 0;
        }

        .shop-detail-label,
        .shop-appeal-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          margin-bottom: 4px;
          border-radius: var(--radius-sm);
        }

        .shop-detail-label {
          background: var(--color-blue);
          color: white;
        }

        .shop-appeal-label {
          background: var(--color-yellow);
          color: var(--color-text);
        }

        .shop-detail p,
        .shop-appeal p {
          font-size: 0.85rem;
          color: var(--color-text);
          margin: 0;
          line-height: 1.6;
        }

        /* アクセス */
        .access-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .access-item {
          background: rgba(255,255,255,0.1);
          padding: var(--space-md);
          border-radius: var(--radius-md);
        }

        .access-item h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: var(--space-xs);
          color: var(--color-yellow);
        }

        .access-item p {
          font-size: 0.85rem;
          line-height: 1.7;
          opacity: 0.95;
        }

        /* CTA */
        .cta-title {
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: var(--space-xs);
        }

        .cta-lead {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: var(--space-md);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-lg);
          background: white;
          color: var(--color-secondary);
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: all 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 400px) {
          .area-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
