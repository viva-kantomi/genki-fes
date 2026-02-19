import { Link } from 'react-router-dom';
import eventsData from '../../../data/events.json';

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
    <div className="event-card event-card--no-link">
      <div className="event-card-inner">
        {/* 上部：画像エリア */}
        <div className="event-card-header">
          {event.image ? (
            <>
              <img
                src={`${basePath}${event.image.replace(/^\//, '')}`}
                alt={event.title}
                className="event-card-image"
              />
              <div className="event-card-overlay">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-schedule">{event.schedule}</p>
              </div>
            </>
          ) : (
            <div className={`event-card-no-image ${colorClass}`}>
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-card-schedule">{event.schedule}</p>
            </div>
          )}
          {/* 特設ページへのバナー（画像に重ねる） */}
          {isGenkiFestaSpecial && (
            <Link to={event.link!} className="event-card-special-link">
              <img
                src={`${basePath}images/top_logo_special.webp`}
                alt="げんきフェスタ2026"
                className="event-card-special-image"
              />
              <span className="event-card-special-btn">特設ページはコチラ</span>
            </Link>
          )}
        </div>

        {/* 下部：詳細情報エリア */}
        <div className="event-card-body">
          {/* 詳細テキスト */}
          {event.details && event.details.length > 0 && (
            <div className="event-card-details">
              {event.details.map((detail, index) => (
                <p key={index} className="event-card-detail-line">
                  {detail}
                </p>
              ))}
            </div>
          )}

          {/* チャット風コメント */}
          {event.comments && event.comments.length > 0 && (
            <div className="event-card-comments">
              {event.comments.map((comment, index) => (
                <div key={index} className={`chat-row ${index % 2 === 0 ? 'chat-row--left' : 'chat-row--right'}`}>
                  <div className="chat-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                    </svg>
                  </div>
                  <div className="chat-bubble">
                    <span className="chat-text">{comment}</span>
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
      <section className="page-header">
        <div className="container">
          <p className="page-label">EVENTS</p>
          <h1 className="page-title">イベント詳細</h1>
          <p className="page-lead">げんき塾チームが企画・運営するイベントをご紹介します</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 毎週イベント（赤） */}
          <div className="event-category">
            <h2 className="category-title category-title--red">毎週イベント</h2>
            <div className="event-cards">
              {weeklyEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass="event-card-no-image--red" />
              ))}
            </div>
          </div>

          {/* 年に一度のイベント（青） */}
          <div className="event-category">
            <h2 className="category-title category-title--blue">年に一度のイベント</h2>
            <div className="event-cards">
              {yearlyEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass="event-card-no-image--blue" />
              ))}
            </div>
          </div>

          {/* 不定期開催（黄） */}
          <div className="event-category">
            <h2 className="category-title category-title--yellow">不定期開催</h2>
            <div className="event-cards">
              {irregularEvents.map((event) => (
                <EventCard key={event.id} event={event} colorClass="event-card-no-image--yellow" />
              ))}
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
        .page-header {
          background: var(--color-bg-white);
          padding: var(--space-xl) 0;
          border-bottom: 2px solid var(--color-border);
          text-align: center;
        }
        .page-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-primary);
          margin-bottom: var(--space-xs);
        }
        .page-title {
          font-size: 1.75rem;
          font-weight: 900;
          margin-bottom: var(--space-sm);
        }
        .page-lead {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .section {
          padding: var(--space-xl) 0;
        }
        .event-category {
          margin-bottom: var(--space-xl);
        }
        .event-category:last-child {
          margin-bottom: 0;
        }
        .category-title {
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 900;
          padding: var(--space-xs) var(--space-md);
          margin-bottom: var(--space-md);
          border: 2px solid var(--color-border);
          box-shadow: 3px 3px 0 var(--color-border);
        }
        .category-title--red {
          background: var(--color-red);
          color: white;
          text-shadow: 1px 1px 0 var(--color-border);
        }
        .category-title--blue {
          background: var(--color-blue);
          color: white;
          text-shadow: 1px 1px 0 var(--color-border);
        }
        .category-title--yellow {
          background: var(--color-yellow);
          color: var(--color-text);
        }

        /* イベントカード */
        .event-cards {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .event-card {
          display: block;
          overflow: hidden;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          text-decoration: none;
          color: var(--color-text);
          background: var(--color-bg-white);
        }

        .event-card--no-link {
          cursor: default;
        }

        .event-card-inner {
          display: flex;
          flex-direction: column;
        }

        /* 上部：画像ヘッダー */
        .event-card-header {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .event-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: var(--space-md);
          padding-top: var(--space-xl);
          background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 100%);
          color: white;
        }

        .event-card-no-image {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: var(--space-md);
          text-align: center;
        }

        .event-card-no-image--red {
          background: var(--color-red);
          color: white;
        }

        .event-card-no-image--blue {
          background: var(--color-blue);
          color: white;
        }

        .event-card-no-image--yellow {
          background: var(--color-yellow);
          color: var(--color-text);
        }

        .event-card-title {
          font-size: 1.3rem;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.05em;
        }

        .event-card-no-image .event-card-title {
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
        }

        .event-card-no-image--yellow .event-card-title {
          text-shadow: none;
        }

        .event-card-schedule {
          font-size: 0.85rem;
          font-weight: 700;
          margin-top: 4px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .event-card-no-image .event-card-schedule {
          text-shadow: none;
          opacity: 0.9;
        }

        /* 特設ページへのバナーリンク（画像に重ねる・右下配置） */
        .event-card-special-link {
          position: absolute;
          bottom: var(--space-sm);
          right: var(--space-sm);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-decoration: none;
          width: 50%;
        }

        .event-card-special-image {
          width: 100%;
          height: auto;
          margin-right: -20px;
          margin-bottom: -30px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .event-card-special-btn {
          display: inline-block;
          padding: 4px var(--space-sm);
          background: var(--color-primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          border: 2px solid var(--color-border);
          box-shadow: 3px 3px 0 var(--color-border);
          transition: all 0.2s;
          text-shadow: 1px 1px 0 var(--color-border);
          margin-top: -2px;
        }

        .event-card-special-link:hover .event-card-special-btn {
          box-shadow: 1px 1px 0 var(--color-border);
          transform: translate(2px, 2px);
        }

        .event-card-special-link:active .event-card-special-btn {
          box-shadow: 0 0 0 var(--color-border);
          transform: translate(3px, 3px);
        }

        /* 下部：詳細情報 */
        .event-card-body {
          padding: var(--space-md);
          border-top: 2px solid var(--color-border);
          background: white;
        }

        .event-card-details {
          margin-bottom: var(--space-md);
        }

        .event-card-detail-line {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-text);
          margin-bottom: var(--space-xs);
        }

        .event-card-detail-line:last-child {
          margin-bottom: 0;
        }

        /* チャット風コメント */
        .event-card-comments {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .chat-row {
          display: flex;
          align-items: flex-end;
          gap: var(--space-xs);
        }

        .chat-row--left {
          flex-direction: row;
        }

        .chat-row--right {
          flex-direction: row-reverse;
        }

        .chat-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chat-icon svg {
          width: 18px;
          height: 18px;
          color: var(--color-text-muted);
        }

        .chat-bubble {
          position: relative;
          max-width: calc(100% - 44px);
        }

        .chat-text {
          display: inline-block;
          padding: var(--space-sm) var(--space-md);
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 16px;
          border: 2px solid var(--color-border);
          background: white;
          color: var(--color-text);
        }

        .chat-row--left .chat-text {
          border-bottom-left-radius: 4px;
        }

        .chat-row--right .chat-text {
          border-bottom-right-radius: 4px;
        }
      `}</style>
    </>
  );
}
