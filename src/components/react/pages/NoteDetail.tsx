import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './NoteDetail.module.css';

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
      <div className={styles.containerLoading}>
        <div className={styles.loading}>読み込み中...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <Link to="/news/" className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              NEWS一覧に戻る
            </Link>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.error}>
            <p>記事が見つかりませんでした。</p>
            <a href={`https://note.com/viva_kantomi/n/${key}`} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
              note.comで確認する
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <Link to="/news/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            NEWS一覧に戻る
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className={styles.articleTitle}>{article.title}</h1>
          </header>

          <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: article.body }} />

          <footer className={styles.articleFooter}>
            <a href={article.noteUrl} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
              note.comで続きを読む
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          </footer>
        </article>
      </div>
    </>
  );
}
