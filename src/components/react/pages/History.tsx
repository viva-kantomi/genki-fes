import { Link } from 'react-router-dom';
import styles from './History.module.css';

const pastEvents = [
  {
    year: 2025,
    title: 'げんきフェスタ2025',
    theme: '笑顔でつながる夏',
    date: '2025年8月16日（土）',
    location: '東京・お台場',
    visitors: '約15,000人',
    highlights: ['地元バンド20組出演', 'フードブース30店舗', 'キッズエリア新設'],
  },
  {
    year: 2024,
    title: 'げんきフェスタ2024',
    theme: 'みんなの元気、集まれ！',
    date: '2024年8月17日（土）',
    location: '東京・お台場',
    visitors: '約12,000人',
    highlights: ['初の2ステージ制', 'ワークショップ15種類', 'リユース食器導入'],
  },
  {
    year: 2023,
    title: 'げんきフェスタ2023',
    theme: '復活！元気の夏',
    date: '2023年8月19日（土）',
    location: '東京・お台場',
    visitors: '約8,000人',
    highlights: ['4年ぶりの通常開催', 'オンライン配信併用', '地域団体コラボ企画'],
  },
  {
    year: 2022,
    title: 'げんきフェスタ2022 ONLINE',
    theme: 'つながる元気',
    date: '2022年8月20日（土）',
    location: 'オンライン開催',
    visitors: '視聴者約5,000人',
    highlights: ['完全オンライン開催', 'ライブ配信ステージ', 'オンラインワークショップ'],
  },
  {
    year: 2019,
    title: 'げんきフェスタ2019',
    theme: '令和最初の夏祭り',
    date: '2019年8月17日（土）',
    location: '東京・お台場',
    visitors: '約10,000人',
    highlights: ['過去最大規模開催', 'ゲストアーティスト招聘', '花火フィナーレ'],
  },
];

export function History() {
  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>HISTORY</p>
          <h1 className={styles.pageTitle}>過去のげんきフェスタ</h1>
          <p className={styles.pageLead}>これまでの軌跡と思い出を振り返ります</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.timeline}>
            {pastEvents.map((event) => (
              <div key={event.year} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineYear}>{event.year}</span>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.historyCard}>
                    <div className={styles.historyImage}>
                      <div className={styles.historyImagePlaceholder}>
                        <span className={styles.historyYearBadge}>{event.year}</span>
                      </div>
                    </div>
                    <div className={styles.historyBody}>
                      <h2 className={styles.historyTitle}>{event.title}</h2>
                      <p className={styles.historyTheme}>テーマ：{event.theme}</p>
                      <div className={styles.historyMeta}>
                        <p><strong>開催日：</strong>{event.date}</p>
                        <p><strong>会場：</strong>{event.location}</p>
                        <p><strong>来場者：</strong>{event.visitors}</p>
                      </div>
                      <div className={styles.historyHighlights}>
                        <p className={styles.highlightsLabel}>HIGHLIGHTS</p>
                        <ul>
                          {event.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>げんきフェスタ2026</h2>
          <p className={styles.ctaLead}>今年の開催情報をチェック！</p>
          <Link to="/genki-festa-2026/" className={styles.ctaBtn}>
            2026特設ページへ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
