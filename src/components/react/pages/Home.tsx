import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NoteArticle {
  key: string;
  title: string;
  publishedAt: string;
}

export function Home() {
  const [noteArticles, setNoteArticles] = useState<NoteArticle[]>([]);
  const basePath = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // ビルド時に生成されたJSONからデータ取得
    fetch(`${basePath}data/note-articles.json`)
      .then(res => res.json())
      .then((data: Array<{ key: string; title: string; publishedAt: string }>) => {
        setNoteArticles(data.slice(0, 3).map((item) => ({
          key: item.key,
          title: item.title,
          publishedAt: item.publishedAt,
        })));
      })
      .catch(err => console.error('Failed to fetch note articles:', err));
  }, [basePath]);

  return (
    <>
      {/* ヒーロー */}
      <section className="hero">
        <div className="hero-bg">
          <div className="scroll-row scroll-row--1">
            <div className="scroll-track scroll-right">
              {[10, 11, 12, 13, 14, 10, 11, 12, 13, 14].map((num, i) => (
                <img key={i} src={`${basePath}images/top_images/${num}.webp`} alt="" className="hero-bg-img" loading="eager" />
              ))}
            </div>
          </div>
          <div className="scroll-row scroll-row--2">
            <div className="scroll-track scroll-left">
              {[15, 16, 17, 18, 10, 15, 16, 17, 18, 10].map((num, i) => (
                <img key={i} src={`${basePath}images/top_images/${num}.webp`} alt="" className="hero-bg-img" loading="eager" />
              ))}
            </div>
          </div>
        </div>
        <div className="hero-clouds">
          <div className="cloud cloud--1"></div>
          <div className="cloud cloud--2"></div>
          <div className="cloud cloud--3"></div>
          <div className="cloud cloud--4"></div>
        </div>
        <div className="hero-content">
          <div className="hero-logo-area">
            <Link to="/2026/" className="hero-logo-link">
              <img src={`${basePath}images/genki_festa_logo.webp`} alt="げんきフェスタ2026 5/24 SUN" className="hero-logo" />
              <span className="hero-logo-btn">
                特設ページはこちら
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </div>
          <div className="hero-action-cards">
            <Link to="/events/" className="hero-action-card hero-action-card--enjoy">
              <span className="hero-action-label">楽しむ</span>
              <span className="hero-action-desc">イベント一覧</span>
            </Link>
            <Link to="/about/" className="hero-action-card hero-action-card--entertain">
              <span className="hero-action-label">楽しませる</span>
              <span className="hero-action-desc">出店・参加方法</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SP用動画セクション */}
      <section className="section section--video-sp">
        <div className="container">
          <p className="video-sp-label">2025年のげんきフェスタの様子</p>
          <div className="video-sp-container">
            <iframe
              src="https://www.youtube-nocookie.com/embed/1OqHFpav2X0?rel=0"
              title="げんきフェスタ プロモーション動画"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ABOUT US セクション */}
      <section id="about" className="section">
        <div className="container">
          <p className="section-label">ABOUT US</p>
          <h2 className="section-title">私たちについて</h2>
          <div className="about-box">
            <p className="about-line">わたしたちは、特定の団体ではありません</p>
            <p className="about-line">決まったメンバーも</p>
            <p className="about-line">決まった役割もありません</p>
            <p className="about-line">不定形で上下もない</p>
            <p className="about-line">名前のない<strong>「なにか」</strong>です！</p>
            <img src={`${basePath}images/common/ameba.webp`} alt="" className="about-image" />
            <p className="about-line">いつも説明に困っています！</p>
          </div>
          <div className="section-action">
            <Link to="/about/" className="btn-outline">
              詳細はこちら
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* イベント紹介 */}
      <section className="section section--white">
        <div className="container">
          <p className="section-label">EVENTS</p>
          <h2 className="section-title">主なイベント</h2>
          <div className="event-cards">
            <Link to="/2026/" className="event-card">
              <img src={`${basePath}images/event_cards_genki.jpg`} alt="げんきフェスタ" className="event-card-image" />
              <div className="event-card-overlay">
                <h3 className="event-card-title">げんきフェスタ</h3>
                <p className="event-card-schedule">毎年5月開催</p>
              </div>
            </Link>
            <Link to="/events/" className="event-card">
              <img src={`${basePath}images/event_cards_getsunomi.jpg`} alt="月のみ" className="event-card-image" />
              <div className="event-card-overlay">
                <h3 className="event-card-title">月のみ</h3>
                <p className="event-card-schedule">毎週月曜日開催</p>
              </div>
            </Link>
            <Link to="/events/" className="event-card">
              <img src={`${basePath}images/event_cards_yomise.jpg`} alt="夜店" className="event-card-image" />
              <div className="event-card-overlay">
                <h3 className="event-card-title">夜店</h3>
                <p className="event-card-schedule">毎年7月開催</p>
              </div>
            </Link>
          </div>
          <p className="event-note">他にも地域勉強会やゼミの発表会も！</p>
          <div className="section-action">
            <Link to="/events/" className="btn-outline">
              イベント一覧
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* お知らせ（noteから取得） */}
      <section className="section">
        <div className="container">
          <p className="section-label">NEWS</p>
          <h2 className="section-title">お知らせ</h2>
          <ul className="news-list">
            {noteArticles.map((article) => (
              <li key={article.key}>
                <Link to={`/note/${article.key}/`} className="news-card">
                  <time dateTime={new Date(article.publishedAt).toISOString()}>
                    {new Date(article.publishedAt).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}
                  </time>
                  <span className="news-title">{article.title}</span>
                  <svg className="news-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-action">
            <a href="https://note.com/viva_kantomi" target="_blank" rel="noopener noreferrer" className="btn-outline">
              お知らせ一覧
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SNS */}
      <section className="section section--accent">
        <div className="container">
          <h2 className="cta-title">最新情報をフォロー</h2>
          <p className="cta-lead">SNSでげんき塾チームの情報をお届けします</p>
          <div className="sns-links">
            <a href="#" className="sns-link" aria-label="Instagram">
              <img src={`${basePath}images/common/sns/icons8-instagram-100.png`} alt="Instagram" width="32" height="32" />
            </a>
            <a href="#" className="sns-link" aria-label="YouTube">
              <img src={`${basePath}images/common/sns/icons8-youtube-100.png`} alt="YouTube" width="32" height="32" />
            </a>
            <a href="#" className="sns-link" aria-label="Facebook">
              <img src={`${basePath}images/common/sns/icons8-facebook-100.png`} alt="Facebook" width="32" height="32" />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }

        /* ヒーロー */
        .hero {
          position: relative;
          min-height: auto;
          padding-bottom: var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          background: linear-gradient(180deg, #87CEEB 0%, #E0F4FF 50%, #FFF8E7 100%);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to bottom, transparent 0%, rgba(255, 248, 231, 0.3) 30%, rgba(255, 248, 231, 0.6) 60%, rgba(255, 248, 231, 0.9) 85%, #FFF8E7 100%);
          pointer-events: none;
        }

        .scroll-row {
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
        }

        .scroll-row--1 { top: 3%; }
        .scroll-row--2 { top: 38%; }

        .scroll-track {
          display: flex;
          gap: 12px;
          width: max-content;
        }

        .scroll-right { animation: scroll-right 25s linear infinite; }
        .scroll-left { animation: scroll-left 30s linear infinite; }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .hero-bg-img {
          width: 140px;
          height: auto;
          border-radius: 0;
          border: 2px solid var(--color-border);
          opacity: 0.9;
          box-shadow: 4px 4px 0 var(--color-border);
          flex-shrink: 0;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 56px;
          width: 100%;
        }

        .hero-logo-area {
          width: 90%;
          text-align: center;
          margin-bottom: var(--space-md);
          margin-top: -100px;
        }

        .hero-clouds {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .cloud {
          position: absolute;
          background: white;
          border-radius: 100px;
          opacity: 0.9;
          filter: blur(2px);
        }

        .cloud::before, .cloud::after {
          content: '';
          position: absolute;
          background: white;
          border-radius: 50%;
        }

        .cloud--1 {
          width: 120px;
          height: 40px;
          top: 10%;
          left: -150px;
          animation: cloud-float 25s linear infinite;
        }

        .cloud--1::before { width: 50px; height: 50px; top: -25px; left: 20px; }
        .cloud--1::after { width: 60px; height: 60px; top: -30px; left: 50px; }

        .cloud--2 {
          width: 100px;
          height: 35px;
          top: 25%;
          left: -120px;
          animation: cloud-float 30s linear infinite 5s;
        }

        .cloud--2::before { width: 45px; height: 45px; top: -22px; left: 15px; }
        .cloud--2::after { width: 50px; height: 50px; top: -25px; left: 40px; }

        .cloud--3 {
          width: 80px;
          height: 30px;
          top: 5%;
          right: -100px;
          animation: cloud-float-reverse 22s linear infinite 2s;
        }

        .cloud--3::before { width: 35px; height: 35px; top: -18px; left: 10px; }
        .cloud--3::after { width: 40px; height: 40px; top: -20px; left: 30px; }

        .cloud--4 {
          width: 90px;
          height: 32px;
          top: 35%;
          right: -110px;
          animation: cloud-float-reverse 28s linear infinite 8s;
        }

        .cloud--4::before { width: 40px; height: 40px; top: -20px; left: 12px; }
        .cloud--4::after { width: 45px; height: 45px; top: -22px; left: 35px; }

        @keyframes cloud-float {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }

        @keyframes cloud-float-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100vw - 200px)); }
        }

        .hero-action-cards {
          display: flex;
          gap: var(--space-sm);
          width: 90%;
          max-width: 400px;
          font-family: var(--font-main);
        }

        .hero-action-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-md) var(--space-sm);
          background: rgba(255, 255, 255, 0.95);
          border: 3px solid var(--color-border);
          border-radius: 0;
          text-decoration: none;
          color: var(--color-text);
          box-shadow: 4px 4px 0 var(--color-border);
          transition: all 0.2s;
          backdrop-filter: blur(8px);
          font-family: var(--font-main);
        }

        .hero-action-card:hover {
          box-shadow: 2px 2px 0 var(--color-border);
          transform: translate(2px, 2px);
        }

        .hero-action-card:active {
          box-shadow: 0 0 0 var(--color-border);
          transform: translate(4px, 4px);
        }

        .hero-action-card--enjoy {
          background: rgba(235, 186, 36, 0.95);
          color: var(--color-text);
        }

        .hero-action-card--entertain {
          background: rgba(40, 111, 170, 0.95);
          color: white;
        }

        .hero-action-label {
          font-size: 1.1rem;
          font-weight: 900;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
        }

        .hero-action-desc {
          font-size: 0.7rem;
          opacity: 0.9;
          margin-top: 2px;
        }

        .hero-logo-link {
          display: inline-block;
          position: relative;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .hero-logo-link:hover { transform: scale(1.05); }

        .hero-logo {
          width: 320px;
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
          animation: logo-bounce 3s ease-in-out infinite;
        }

        @keyframes logo-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .hero-logo-btn {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-primary);
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          transition: all 0.2s;
          text-shadow: 1px 1px 0 var(--color-border);
          white-space: nowrap;
        }

        .hero-logo-link:hover .hero-logo-btn {
          box-shadow: 1px 1px 0 var(--color-border);
          transform: translateX(-50%) translate(2px, 2px);
        }

        /* セクション共通 */
        .section { padding: var(--space-2xl) 0; }
        .section--white { background: var(--color-bg-white); }
        .section--accent {
          background: var(--color-primary);
          color: white;
          padding: var(--space-lg) 0;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-primary);
          margin-bottom: var(--space-xs);
        }

        .section--accent .section-label { color: rgba(255,255,255,0.7); }

        .section-title {
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 1.5;
          margin-bottom: var(--space-md);
          padding: var(--space-sm) var(--space-lg);
          background: var(--color-primary);
          color: white;
          border: 3px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
        }

        .section-lead {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: var(--space-lg);
        }

        .section-action {
          text-align: center;
          margin-top: var(--space-md);
        }

        /* 私たちについてボックス */
        .about-box {
          text-align: center;
        }

        .about-line {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.8;
          color: var(--color-text);
          margin-bottom: var(--space-xs);
        }

        .about-line strong {
          color: var(--color-red);
          font-size: 1.1rem;
          font-weight: 900;
        }

        .about-image {
          width: 120px;
          height: auto;
          margin: var(--space-md) auto;
          display: block;
        }

        .about-punch {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-muted);
        }

        /* イベントカード */
        .event-cards {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .event-card {
          display: block;
          position: relative;
          overflow: hidden;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          text-decoration: none;
          aspect-ratio: 16 / 9;
          transition: all 0.2s;
        }

        .event-card:hover {
          box-shadow: 2px 2px 0 var(--color-border);
          transform: translate(2px, 2px);
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

        .event-card-title {
          font-size: 1.2rem;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.05em;
        }

        .event-card-schedule {
          font-size: 0.85rem;
          font-weight: 700;
          margin-top: 4px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .event-note {
        font-weight: bold;
          text-align: center;
          font-size: 0.9rem;
          margin-top: var(--space-md);
        }

        /* お知らせ */
        .news-list { list-style: none; }

        .news-card {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          text-decoration: none;
          color: var(--color-text);
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s;
        }

        .news-card:hover { background: var(--color-bg-white); }

        .news-card time {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .news-title {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .news-arrow {
          color: var(--color-text-muted);
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .news-card:hover .news-arrow {
          transform: translateX(4px);
          color: var(--color-primary);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          background: white;
          color: var(--color-primary);
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          transition: all 0.2s;
        }

        .btn-outline:hover {
          background: var(--color-primary);
          color: white;
          box-shadow: 2px 2px 0 var(--color-border);
          transform: translate(2px, 2px);
        }

        /* CTA */
        .cta-title {
          font-size: 1.25rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: var(--space-xs);
        }

        .cta-lead {
          font-size: 0.85rem;
          text-align: center;
          opacity: 0.9;
          margin-bottom: var(--space-md);
        }

        .sns-links {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
        }

        .sns-link {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .sns-link:hover { transform: scale(1.1); }

        .sns-link img {
          width: 48px;
          height: 48px;
        }

        /* SP用動画セクション */
        .section--video-sp {
          padding: var(--space-lg) 0;
          background: var(--color-bg-white);
        }

        .video-sp-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--space-sm);
          text-align: center;
        }

        .video-sp-container {
          aspect-ratio: 16/9;
          width: 100%;
          border: 2px solid var(--color-border);
          overflow: hidden;
        }

        .video-sp-container iframe {
          width: 100%;
          height: 100%;
        }

        /* PC表示時はSNSセクションと動画セクションを非表示 */
        @media (min-width: 1200px) {
          .section--accent { display: none; }
          .section--video-sp { display: none; }
        }

        @media (min-width: 1024px) and (max-width: 1199px) and (orientation: landscape) {
          .section--accent { display: none; }
          .section--video-sp { display: none; }
        }

        @media (min-width: 768px) {
          .hero-logo { width: 350px; }
          .hero-bg-img { width: 180px; }
          .scroll-row--1 { top: 2%; }
          .scroll-row--2 { top: 35%; }
          .hero-action-cards { max-width: 450px; gap: var(--space-md); }
          .hero-action-card { padding: var(--space-lg) var(--space-md); }
          .hero-action-label { font-size: 1.25rem; }
          .hero-action-desc { font-size: 0.8rem; }
        }
      `}</style>
    </>
  );
}
