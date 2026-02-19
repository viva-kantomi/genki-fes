import { Link } from 'react-router-dom';
import eventsData from '../../../data/events.json';

interface Event {
  id: string;
  title: string;
  date: string;
  schedule: string;
  description: string;
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
            <div className="event-buttons">
              {weeklyEvents.map((event) => (
                <div key={event.id} className="event-button event-button--red">
                  <span className="event-button-title">{event.title}</span>
                  {event.description && (
                    <span className="event-button-desc">{event.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 年に一度のイベント（青） */}
          <div className="event-category">
            <h2 className="category-title category-title--blue">年に一度のイベント</h2>
            <div className="event-buttons">
              {yearlyEvents.map((event) => (
                event.id === 'genki-festa-2026' && showGenkiFestaSpecial && event.link ? (
                  <Link key={event.id} to={event.link} className="event-button event-button--blue event-button--link">
                    <span className="event-button-title">{event.title}</span>
                    {event.description && (
                      <span className="event-button-desc">{event.description}</span>
                    )}
                    <span className="event-button-badge">特設ページへ</span>
                  </Link>
                ) : (
                  <div key={event.id} className="event-button event-button--blue">
                    <span className="event-button-title">{event.title}</span>
                    {event.description && (
                      <span className="event-button-desc">{event.description}</span>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* 不定期開催（黄） */}
          <div className="event-category">
            <h2 className="category-title category-title--yellow">不定期開催</h2>
            <div className="event-buttons">
              {irregularEvents.map((event) => (
                <div key={event.id} className="event-button event-button--yellow">
                  <span className="event-button-title">{event.title}</span>
                  {event.description && (
                    <span className="event-button-desc">{event.description}</span>
                  )}
                </div>
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
        .event-buttons {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .event-button {
          display: flex;
          flex-direction: column;
          padding: var(--space-md);
          border: 2px solid var(--color-border);
          box-shadow: 4px 4px 0 var(--color-border);
          text-decoration: none;
        }
        .event-button--red {
          background: var(--color-red);
          color: white;
        }
        .event-button--blue {
          background: var(--color-blue);
          color: white;
        }
        .event-button--yellow {
          background: var(--color-yellow);
          color: var(--color-text);
        }
        .event-button--link {
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .event-button--link:hover {
          box-shadow: 2px 2px 0 var(--color-border);
          transform: translate(2px, 2px);
        }
        .event-button--link:active {
          box-shadow: 0 0 0 var(--color-border);
          transform: translate(4px, 4px);
        }
        .event-button-title {
          font-size: 1.2rem;
          font-weight: 900;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
        }
        .event-button--yellow .event-button-title {
          text-shadow: none;
        }
        .event-button-desc {
          font-size: 0.85rem;
          margin-top: var(--space-xs);
          opacity: 0.95;
        }
        .event-button-badge {
          display: inline-block;
          margin-top: var(--space-sm);
          padding: 4px 12px;
          background: var(--color-yellow);
          color: var(--color-text);
          font-size: 0.75rem;
          font-weight: 700;
          border: 2px solid var(--color-border);
          align-self: flex-start;
        }
      `}</style>
    </>
  );
}
