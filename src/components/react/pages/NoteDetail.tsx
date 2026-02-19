import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NoteArticle {
  key: string;
  title: string;
  publishedAt: string;
  body: string;
  noteUrl: string;
}

export function NoteDetail() {
  const { key } = useParams();
  const [article, setArticle] = useState<NoteArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!key) return;

    fetch(`https://note.com/api/v2/notes/${key}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setArticle({
            key: data.data.key,
            title: data.data.name,
            publishedAt: data.data.publishAt,
            body: data.data.body || '',
            noteUrl: data.data.noteUrl || `https://note.com/viva_kantomi/n/${key}`,
          });
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch note article:', err);
        setError(true);
        setLoading(false);
      });
  }, [key]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">読み込み中...</div>
        <style>{`
          .container { max-width: 600px; margin: 0 auto; padding: var(--space-2xl) var(--space-md); }
          .loading { text-align: center; color: var(--color-text-muted); }
        `}</style>
      </div>
    );
  }

  if (error || !article) {
    return (
      <>
        <div className="page-header">
          <div className="container">
            <Link to="/news/" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              NEWS一覧に戻る
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="error">
            <p>記事が見つかりませんでした。</p>
            <a href={`https://note.com/viva_kantomi/n/${key}`} target="_blank" rel="noopener noreferrer" className="note-link">
              note.comで確認する
            </a>
          </div>
        </div>
        <style>{`
          .container { max-width: 600px; margin: 0 auto; padding: 0 var(--space-md); }
          .page-header { background: var(--color-bg-white); padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border); }
          .back-link { display: inline-flex; align-items: center; gap: var(--space-xs); font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-decoration: none; }
          .error { text-align: center; padding: var(--space-2xl); }
          .note-link { display: inline-block; margin-top: var(--space-md); padding: var(--space-sm) var(--space-lg); background: var(--color-primary); color: white; font-weight: 700; text-decoration: none; border-radius: var(--radius-full); }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link to="/news/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            NEWS一覧に戻る
          </Link>
        </div>
      </div>

      <div className="container">
        <article className="article">
          <header className="article-header">
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1>{article.title}</h1>
          </header>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }} />

          <footer className="article-footer">
            <a href={article.noteUrl} target="_blank" rel="noopener noreferrer" className="note-link">
              note.comで続きを読む
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          </footer>
        </article>
      </div>

      <style>{`
        .container { max-width: 600px; margin: 0 auto; padding: 0 var(--space-md); }
        .page-header { background: var(--color-bg-white); padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border); }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-xs); font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-decoration: none; }
        .back-link:hover { color: var(--color-secondary); }
        .article { padding: var(--space-lg) 0 var(--space-2xl); }
        .article-header { margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 1px solid var(--color-border); }
        .article-header time { font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); }
        .article-header h1 { font-size: 1.5rem; font-weight: 900; margin-top: var(--space-sm); line-height: 1.4; }
        .article-body { font-size: 0.95rem; line-height: 1.9; color: var(--color-text); }
        .article-body p { margin-bottom: var(--space-md); }
        .article-body img { max-width: 100%; height: auto; border-radius: var(--radius-md); margin: var(--space-md) 0; }
        .article-footer { margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border); text-align: center; }
        .note-link { display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-sm) var(--space-lg); background: #41C9B4; color: white; font-size: 0.9rem; font-weight: 700; text-decoration: none; border-radius: var(--radius-full); transition: all 0.2s; }
        .note-link:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
      `}</style>
    </>
  );
}
