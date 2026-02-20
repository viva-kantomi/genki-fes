import { Link } from 'react-router-dom';
import eventsData from '../../../data/events.json';
import styles from './Events.module.css';

interface Event {
  id: string;
  title: string;
  date: string;
  schedule: string;
  description: string;
  details: string[];
  comments: string[];
  link: string | null;
  image: string | null;
  featured: boolean;
  badge: string | null;
  order: number;
  category: 'weekly' | 'yearly' | 'irregular';
}

// 全イベントをorder順に取得
const events = (eventsData as Event[]).sort((a, b) => a.order - b.order);

// カテゴリ別に分類
const weeklyEvents = events.filter((e) => e.category === 'weekly');
const yearlyEvents = events.filter((e) => e.category === 'yearly');
const irregularEvents = events.filter((e) => e.category === 'irregular');

// 特設ページ表示フラグ
const showGenkiFestaSpecial = import.meta.env.PUBLIC_SHOW_GENKI_FESTA_SPECIAL === 'true';

// basePath
const basePath = import.meta.env.BASE_URL || '/';

// イベントカードコンポーネント
function EventCard({ event, colorClass }: { event: Event; colorClass: string }) {
  const isGenkiFestaSpecial = event.id === 'genki-festa-2026' && showGenkiFestaSpecial && event.link;

  return (
    <div className={`${styles.eventCard} ${styles.eventCardNoLink}`}>
      <div className={styles.eventCardInner}>
        {/* 上部：画像エリア */}
        <div className={styles.eventCardHeader}>
          {event.image ? (
            <>
              <img
                src={`${basePath}${event.image.replace(/^\//, '')}`}
                alt={event.title}
                className={styles.eventCardImage}
              />
              <div className={styles.eventCardOverlay}>
                <h3 className={styles.eventCardTitle}>{event.title}</h3>
                <p className={styles.eventCardSchedule}>{event.schedule}</p>
              </div>
            </>
          ) : (
            <div className={`${styles.eventCardNoImage} ${colorClass}`}>
              <h3 className={styles.eventCardTitle}>{event.title}</h3>
              <p className={styles.eventCardSchedule}>{event.schedule}</p>
            </div>
          )}
          {/* 特設ページへのバナー（画像に重ねる） */}
          {isGenkiFestaSpecial && (
            <Link to={event.link!} className={styles.eventCardSpecialLink}>
              <img
                src={`${basePath}images/top_logo_special.webp`}
                alt="げんきフェスタ2026"
                className={styles.eventCardSpecialImage}
              />
              <span className={styles.eventCardSpecialBtn}>特設ページはコチラ</span>
            </Link>
          )}
        </div>

        {/* 下部：詳細情報エリア */}
        <div className={styles.eventCardBody}>
          {/* 詳細テキスト */}
          {event.details && event.details.length > 0 && (
            <div className={styles.eventCardDetails}>
              {event.details.map((detail, index) => (
                <p key={index} className={styles.eventCardDetailLine}>
                  {detail}
                </p>
              ))}
            </div>
          )}

          {/* チャット風コメント */}
          {event.comments && event.comments.length > 0 && (
            <div className={styles.eventCardComments}>
              {event.comments.map((comment, index) => (
                <div key={index} className={`${styles.chatRow} ${index % 2 === 0 ? styles.chatRowLeft : styles.chatRowRight}`}>
                  <div className={styles.chatIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                    </svg>
                  </div>
                  <div className={styles.chatBubble}>
                    <span className={styles.chatText}>{comment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export function Events() {
  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>EVENTS</p>
          <h1 className={styles.pageTitle}>イベント詳細</h1>
          <p className={styles.pageLead}>げんき塾チームが企画・運営するイベントをご紹介します</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          {/* 毎週イベント（赤） */}
          <div className={styles.eventCategory}>
            <h2 className={`${styles.categoryTitle} ${styles.categoryTitleRed}`}>毎週イベント</h2>
            <div className={styles.eventCards}>
              {weeklyEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass={styles.eventCardNoImageRed} />
              ))}
            </div>
          </div>

          {/* 年に一度のイベント（青） */}
          <div className={styles.eventCategory}>
            <h2 className={`${styles.categoryTitle} ${styles.categoryTitleBlue}`}>年に一度のイベント</h2>
            <div className={styles.eventCards}>
              {yearlyEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass={styles.eventCardNoImageBlue} />
              ))}
            </div>
          </div>

          {/* 不定期開催（黄） */}
          <div className={styles.eventCategory}>
            <h2 className={`${styles.categoryTitle} ${styles.categoryTitleYellow}`}>不定期開催</h2>
            <div className={styles.eventCards}>
              {irregularEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass={styles.eventCardNoImageYellow} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
