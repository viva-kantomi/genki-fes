import { useEffect, useState, useRef } from 'react';
import shopsData from '../../../data/shops.json';
import styles from './Event2026.module.css';

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
      <section className={styles.hero2026}>
        <div className={styles.heroInner}>
          <p className={styles.heroDate}>{eventInfo.dateShort}</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleYear}>2026</span>
            <span className={styles.titleMain}>げんきフェスタ</span>
          </h1>
          <p className={styles.heroTheme}>テーマ：「{eventInfo.theme}」</p>
          <div className={styles.heroInfo}>
            <p>{eventInfo.location}</p>
            <p>{eventInfo.time} / 入場無料</p>
          </div>
        </div>
      </section>

      {/* カウントダウン */}
      <section className={styles.countdownSection}>
        <div className={styles.container}>
          <p className={styles.countdownLabel}>開催まであと</p>
          <div className={styles.countdownDisplay}>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{days}</span>
              <span className={styles.countdownUnit}>日</span>
            </div>
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>CONCEPT</p>
          <h2 className={styles.sectionTitle}>元気、無限大！</h2>
          <p className={styles.sectionLead}>
            今年のげんきフェスタは「元気、無限大！」をテーマに、
            老若男女みんなが楽しめるフェスティバルを目指します。
            地域の絆を深め、笑顔あふれる一日を一緒に作りましょう！
          </p>
        </div>
      </section>

      {/* タイムスケジュール */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>TIMETABLE</p>
          <h2 className={styles.sectionTitle}>タイムスケジュール</h2>
          <p className={styles.scheduleNotice}>※現在調整中です。決まり次第更新します。</p>
          <div className={styles.timetable}>
            {schedule.map((item, index) => (
              <div key={index} className={styles.timetableItem}>
                <div className={styles.timetableTime}>{item.time}</div>
                <div className={styles.timetableContent}>
                  <p className={styles.timetableTitle}>{item.content}</p>
                  {item.description && <p className={styles.timetableDesc}>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.timetableNote}>※スケジュールは予告なく変更になる場合があります</p>
        </div>
      </section>

      {/* 全体エリア紹介 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>AREA MAP</p>
          <h2 className={styles.sectionTitle}>会場マップ</h2>

          {/* 全体マップ画像（仮） */}
          <div className={styles.mapOverview}>
            <div className={styles.mapPlaceholder}>
              <span className={styles.placeholderText}>会場全体マップ</span>
              <span className={styles.placeholderSub}>（準備中）</span>
            </div>
          </div>

          <p className={styles.mapDescription}>
            宮本町商店街の4つのエリアで、さまざまな出店やイベントをお楽しみいただけます。
          </p>

          {/* エリア一覧 */}
          <div className={styles.areaGrid}>
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => scrollToArea(area.id)}
                className={styles.areaCardLink}
                style={{ '--area-color': area.color } as React.CSSProperties}
              >
                <div className={styles.areaBadge}>{area.id}</div>
                <div className={styles.areaInfo}>
                  <h3 className={styles.areaName}>{area.name}</h3>
                  <span className={styles.areaArrow}>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 個別エリア紹介 + 出店情報 */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>SHOPS</p>
          <h2 className={styles.sectionTitle}>エリア別出店情報</h2>

          {areas.map((area) => (
            <div
              key={area.id}
              ref={(el) => { areaRefs.current[area.id] = el; }}
              className={styles.areaSection}
              style={{ '--area-color': area.color } as React.CSSProperties}
            >
              {/* スティッキーヘッダー */}
              <div className={styles.areaStickyHeader}>
                <div className={styles.areaHeaderContent}>
                  <span className={styles.areaHeaderBadge}>{area.id}</span>
                  <span className={styles.areaHeaderName}>{area.name}</span>
                </div>
              </div>

              {/* エリア画像（仮） */}
              <div className={styles.areaImageWrapper}>
                <div className={styles.areaImagePlaceholder}>
                  <span className={styles.placeholderText}>{area.name}</span>
                  <span className={styles.placeholderSub}>（写真準備中）</span>
                </div>
              </div>

              {/* 出店一覧 */}
              <div className={styles.shopList}>
                {shops[area.id]?.map((shop, index) => (
                  <div key={index} className={styles.shopCard}>
                    {/* 上部：画像 + 基本情報 */}
                    <div className={styles.shopCardHeader}>
                      {shop.hasImage ? (
                        <div className={styles.shopImage}>
                          <img src={getShopImagePath(shop.enName)} alt={shop.name} />
                        </div>
                      ) : (
                        <div className={`${styles.shopImage} ${styles.shopImagePlaceholder}`}>
                          <span>No Image</span>
                        </div>
                      )}
                      <div className={styles.shopInfo}>
                        <div className={styles.shopCategory}>{shop.category}</div>
                        <h4 className={styles.shopName}>{shop.name}</h4>
                        <p className={styles.shopSummary}>{shop.summary}</p>
                      </div>
                    </div>
                    {/* 下部：詳細・アピールポイント */}
                    {(shop.detail || shop.appeal) && (
                      <div className={styles.shopCardBody}>
                        {shop.detail && (
                          <div className={styles.shopDetail}>
                            <span className={styles.shopDetailLabel}>詳細</span>
                            <p>{shop.detail}</p>
                          </div>
                        )}
                        {shop.appeal && (
                          <div className={styles.shopAppeal}>
                            <span className={styles.shopAppealLabel}>アピールポイント</span>
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
      <section className={`${styles.section} ${styles.sectionBlue}`}>
        <div className={styles.container}>
          <p className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>ACCESS</p>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleYellow}`}>アクセス</h2>
          <div className={styles.accessInfo}>
            <div className={styles.accessItem}>
              <h3>電車でお越しの方</h3>
              <p>上信電鉄「上州富岡駅」より徒歩約10分</p>
            </div>
            <div className={styles.accessItem}>
              <h3>お車でお越しの方</h3>
              <p>上信越自動車道「富岡IC」より約10分</p>
              <p>※会場周辺の駐車場をご利用ください</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
