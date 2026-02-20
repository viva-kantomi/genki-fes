import { Link } from 'react-router-dom';
import styles from './NewsDetail.module.css';

export function NewsDetail() {

  // Content Collectionsのニュース詳細は静的ビルド時にしか取得できないため
  // このページはプレースホルダーとして、実際のニュースはnote.comから取得する形に統一
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
          <p className={styles.notFound}>
            このページは現在利用できません。<br />
            お知らせは<a href="https://note.com/viva_kantomi" target="_blank" rel="noopener noreferrer">note.com</a>でご確認ください。
          </p>
        </article>
      </div>
    </>
  );
}
