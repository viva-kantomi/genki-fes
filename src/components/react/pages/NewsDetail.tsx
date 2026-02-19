import { Link } from 'react-router-dom';

export function NewsDetail() {

  // Content Collectionsのニュース詳細は静的ビルド時にしか取得できないため
  // このページはプレースホルダーとして、実際のニュースはnote.comから取得する形に統一
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
          <p className="not-found">
            このページは現在利用できません。<br />
            お知らせは<a href="https://note.com/viva_kantomi" target="_blank" rel="noopener noreferrer">note.com</a>でご確認ください。
          </p>
        </article>
      </div>

      <style>{`
        .container { max-width: 600px; margin: 0 auto; padding: 0 var(--space-md); }
        .page-header { background: var(--color-bg-white); padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border); }
        .back-link { display: inline-flex; align-items: center; gap: var(--space-xs); font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-decoration: none; }
        .back-link:hover { color: var(--color-secondary); }
        .article { padding: var(--space-xl) 0; }
        .not-found { text-align: center; padding: var(--space-2xl); color: var(--color-text-muted); line-height: 1.8; }
        .not-found a { color: var(--color-primary); }
      `}</style>
    </>
  );
}
