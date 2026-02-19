import { Link } from 'react-router-dom';

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
      <section className="page-header">
        <div className="container">
          <p className="page-label">HISTORY</p>
          <h1 className="page-title">過去のげんきフェスタ</h1>
          <p className="page-lead">これまでの軌跡と思い出を振り返ります</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="timeline">
            {pastEvents.map((event) => (
              <div key={event.year} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-year">{event.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="history-card">
                    <div className="history-image">
                      <div className="history-image-placeholder">
                        <span className="history-year-badge">{event.year}</span>
                      </div>
                    </div>
                    <div className="history-body">
                      <h2 className="history-title">{event.title}</h2>
                      <p className="history-theme">テーマ：{event.theme}</p>
                      <div className="history-meta">
                        <p><strong>開催日：</strong>{event.date}</p>
                        <p><strong>会場：</strong>{event.location}</p>
                        <p><strong>来場者：</strong>{event.visitors}</p>
                      </div>
                      <div className="history-highlights">
                        <p className="highlights-label">HIGHLIGHTS</p>
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

      <section className="section section--accent">
        <div className="container">
          <h2 className="cta-title">げんきフェスタ2026</h2>
          <p className="cta-lead">今年の開催情報をチェック！</p>
          <Link to="/2026/" className="cta-btn">
            2026特設ページへ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
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
        .section--accent {
          background: var(--color-primary);
          color: white;
          text-align: center;
        }
        .timeline {
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-border);
        }
        .timeline-item {
          position: relative;
          padding-left: 60px;
          padding-bottom: var(--space-xl);
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-marker {
          position: absolute;
          left: 0;
          top: 0;
          width: 42px;
          height: 42px;
          background: var(--color-primary);
          border: 2px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-year {
          font-size: 0.7rem;
          font-weight: 900;
          color: white;
        }
        .history-card {
          background: var(--color-bg-white);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .history-image-placeholder {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--color-yellow) 0%, var(--color-accent) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .history-year-badge {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          text-shadow: 2px 2px 0 var(--color-border);
        }
        .history-body {
          padding: var(--space-md);
        }
        .history-title {
          font-size: 1.1rem;
          font-weight: 900;
          margin-bottom: var(--space-xs);
        }
        .history-theme {
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-bottom: var(--space-sm);
        }
        .history-meta {
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: var(--space-md);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--color-border);
        }
        .history-meta p {
          margin-bottom: 2px;
        }
        .history-meta strong {
          color: var(--color-text);
        }
        .history-highlights {
          font-size: 0.85rem;
        }
        .highlights-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-secondary);
          margin-bottom: var(--space-xs);
        }
        .history-highlights ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
        }
        .history-highlights li {
          background: var(--color-bg);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          border: 1px solid var(--color-border);
        }
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
      `}</style>
    </>
  );
}
