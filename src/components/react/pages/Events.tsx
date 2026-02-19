import { Link } from 'react-router-dom';

const events = [
  {
    title: 'げんきフェスタ',
    description: '毎年夏に開催される地域最大のフェスティバル。音楽、グルメ、ワークショップなど盛りだくさん！',
    schedule: '毎年8月',
    link: '/2026/',
    featured: true,
  },
  {
    title: 'げんきマルシェ',
    description: '地元の新鮮野菜やハンドメイド雑貨が集まる月1マーケット。',
    schedule: '毎月第2日曜日',
    link: null,
    featured: false,
  },
  {
    title: 'げんきキッズフェス',
    description: '子どもたちが主役！工作やゲーム、ステージ発表など家族で楽しめるイベント。',
    schedule: '毎年5月',
    link: null,
    featured: false,
  },
  {
    title: 'げんき音楽祭',
    description: '地域のアマチュアバンドやアーティストが出演する音楽イベント。',
    schedule: '毎年10月',
    link: null,
    featured: false,
  },
];

export function Events() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="page-label">EVENTS</p>
          <h1 className="page-title">イベント一覧</h1>
          <p className="page-lead">げんき塾チームが企画・運営するイベントをご紹介します</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className={`event-card ${event.featured ? 'event-card--featured' : ''}`}>
                <div className="event-image">
                  <div className="event-image-placeholder">
                    {event.featured && <span className="event-badge">MAIN EVENT</span>}
                  </div>
                </div>
                <div className="event-body">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-schedule">{event.schedule}</p>
                  <p className="event-description">{event.description}</p>
                  {event.link && (
                    <Link to={event.link} className="event-link">
                      詳細を見る
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
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
        .event-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .event-card {
          background: var(--color-bg-white);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .event-card--featured {
          border-color: var(--color-primary);
          box-shadow: 0 4px 20px rgba(40, 111, 170, 0.15);
        }
        .event-image-placeholder {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--color-blue) 0%, var(--color-primary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .event-badge {
          position: absolute;
          top: var(--space-sm);
          left: var(--space-sm);
          background: var(--color-red);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
        }
        .event-body {
          padding: var(--space-md);
        }
        .event-title {
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: var(--space-xs);
        }
        .event-schedule {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--space-sm);
        }
        .event-description {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: var(--space-md);
        }
        .event-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          transition: all 0.2s;
        }
        .event-link:hover {
          color: var(--color-secondary);
        }
        .event-link svg {
          transition: transform 0.2s;
        }
        .event-link:hover svg {
          transform: translateX(4px);
        }
      `}</style>
    </>
  );
}
