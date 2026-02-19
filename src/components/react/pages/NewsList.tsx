import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NewsItem {
  key: string;
  title: string;
  publishedAt: string;
  body: string;
}

export function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const basePath = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // ビルド時に生成されたJSONからデータ取得
    fetch(`${basePath}data/note-articles.json`)
      .then(res => res.json())
      .then((data: Array<{ key: string; title: string; publishedAt: string; body: string }>) => {
        setNews(data.map((item) => ({
          key: item.key,
          title: item.title,
          publishedAt: item.publishedAt,
          body: item.body?.slice(0, 100) || '',
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch news:', err);
        setLoading(false);
      });
  }, [basePath]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <p className="page-label">NEWS</p>
          <h1>お知らせ</h1>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="loading">読み込み中...</div>
        ) : (
          <ul className="news-list">
            {news.map((item) => (
              <li key={item.key}>
                <Link to={`/note/${item.key}/`} className="news-card">
                  <time dateTime={new Date(item.publishedAt).toISOString()}>
                    {new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </time>
                  <div className="news-body">
                    <h2 className="news-title">{item.title}</h2>
                    <p className="news-desc">{item.body}</p>
                  </div>
                  <svg className="news-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!loading && news.length === 0 && (
          <div className="empty">
            <p>お知らせはまだありません</p>
          </div>
        )}
      </div>

      <style>{`
        .container { max-width: 600px; margin: 0 auto; padding: 0 var(--space-md); }
        .page-header { background: var(--color-bg-white); padding: var(--space-lg) 0; border-bottom: 1px solid var(--color-border); }
        .page-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; color: var(--color-primary); margin-bottom: var(--space-xs); }
        .page-header h1 { font-size: 1.5rem; font-weight: 900; }
        .news-list { list-style: none; padding: var(--space-md) 0 var(--space-2xl); }
        .news-card { display: flex; align-items: flex-start; gap: var(--space-sm); padding: var(--space-md); margin-bottom: var(--space-sm); background: var(--color-bg-white); border-radius: var(--radius-md); border: 1px solid var(--color-border); text-decoration: none; color: var(--color-text); transition: all 0.2s; }
        .news-card:hover { border-color: var(--color-primary); box-shadow: var(--shadow-sm); }
        .news-card:hover .news-arrow { transform: translateX(4px); color: var(--color-primary); }
        .news-card time { font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); flex-shrink: 0; padding-top: 2px; }
        .news-body { flex: 1; min-width: 0; }
        .news-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; line-height: 1.4; }
        .news-desc { font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .news-arrow { color: var(--color-text-muted); flex-shrink: 0; margin-top: 2px; transition: all 0.2s; }
        .empty { text-align: center; padding: var(--space-2xl); color: var(--color-text-muted); }
        .loading { text-align: center; padding: var(--space-2xl); color: var(--color-text-muted); }
      `}</style>
    </>
  );
}
