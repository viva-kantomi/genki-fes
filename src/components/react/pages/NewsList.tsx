import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './NewsList.module.css';

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
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>NEWS</p>
          <h1 className={styles.pageTitle}>お知らせ</h1>
        </div>
      </div>

      <div className={styles.container}>
        {loading ? (
          <div className={styles.loading}>読み込み中...</div>
        ) : (
          <ul className={styles.newsList}>
            {news.map((item) => (
              <li key={item.key}>
                <Link to={`/note/${item.key}/`} className={styles.newsCard}>
                  <time dateTime={new Date(item.publishedAt).toISOString()}>
                    {new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </time>
                  <div className={styles.newsBody}>
                    <h2 className={styles.newsTitle}>{item.title}</h2>
                    <p className={styles.newsDesc}>{item.body}</p>
                  </div>
                  <svg className={styles.newsArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!loading && news.length === 0 && (
          <div className={styles.empty}>
            <p>お知らせはまだありません</p>
          </div>
        )}
      </div>
    </>
  );
}
