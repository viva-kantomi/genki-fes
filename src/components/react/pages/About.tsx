export function About() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <p className="page-label">ABOUT</p>
          <h1>げんき塾チームについて</h1>
        </div>
      </div>

      <div className="container">
        <section className="motto-section">
          <p className="motto-label">MOTTO</p>
          <p className="motto">楽しませる方が<br />もっと楽しい</p>
        </section>

        <section className="content-section">
          <h2>わたしたちについて</h2>
          <div className="about-text">
            <p className="lead">わたしたちは、特定の団体ではありません。</p>
            <p className="highlight">あえて言うなら、<strong>「まちの常連」</strong>です。</p>
            <p>
              決まったメンバーも、決まった役割もない。<br />
              それでも集まり、何かをしているうちに、<br />
              気づけば地域の出来事のそばに立っています。
            </p>
            <p className="emphasis">
              私たちを結んでいるのは、目的ではなく、<br />
              <strong>続いてきた時間と行い</strong>です。
            </p>
            <div className="activity-list">
              <span>飲み会</span>
              <span>飾り付けづくり</span>
              <span>地域イベント</span>
              <span>旅や交流</span>
            </div>
            <p>
              その積み重ねが、<br />
              関係人口のハブとなり、<br />
              外からの学びや出会いを呼び込みました。
            </p>
          </div>
        </section>

        <section className="conclusion-section">
          <p className="conclusion-text">
            名前がなくても、<br />
            組織でなくても、<br />
            <strong>続いている関係が、ここにあります。</strong>
          </p>
        </section>

        <section className="join-section">
          <div className="join-box">
            <h2>参加してみたい方へ</h2>
            <p>SNSからお問い合わせいただき、</p>
            <p>まずは毎週 月曜日開催の<br/><strong>月のみ</strong>にお越しください！</p>
            <div className="sns-links">
              <a href="#" className="sns-link" aria-label="Facebook">
                <img src={`${import.meta.env.BASE_URL}images/common/sns/icons8-facebook-100.png`} alt="Facebook" width="48" height="48" />
              </a>
              <a href="#" className="sns-link" aria-label="Instagram">
                <img src={`${import.meta.env.BASE_URL}images/common/sns/icons8-instagram-100.png`} alt="Instagram" width="48" height="48" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }
        .page-header {
          background: var(--color-bg-white);
          padding: var(--space-lg) 0;
          border-bottom: 1px solid var(--color-border);
        }
        .page-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-secondary);
          margin-bottom: var(--space-xs);
        }
        .page-header h1 {
          font-size: 1.5rem;
          font-weight: 900;
        }
        .content-section {
          padding: var(--space-lg) 0;
        }
        .content-section:last-child {
          padding-bottom: var(--space-2xl);
        }
        .content-section h2 {
          font-size: 1rem;
          font-weight: 900;
          margin-bottom: var(--space-sm);
        }
        .content-section p {
          font-size: 0.95rem;
          line-height: 2;
          color: var(--color-text);
        }

        /* モットーセクション */
        .motto-section {
          padding: var(--space-xl) 0;
          text-align: center;
          background: linear-gradient(135deg, var(--color-red) 0%, #ff4d4f 100%);
          margin: 0 calc(-1 * var(--space-md));
          padding-left: var(--space-md);
          padding-right: var(--space-md);
          position: relative;
          overflow: hidden;
        }
        .motto-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.03) 10px,
            rgba(255,255,255,0.03) 20px
          );
        }
        .motto-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.8);
          margin-bottom: var(--space-sm);
          position: relative;
        }
        .motto {
          font-size: 1.8rem;
          font-weight: 900;
          color: white;
          line-height: 1.4;
          text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
          position: relative;
        }

        /* わたしたちについて */
        .about-text {
          font-size: 1rem;
          line-height: 2;
          color: var(--color-text);
        }
        .about-text p {
          margin-bottom: var(--space-lg);
          font-weight: 500;
        }
        .about-text p:last-child {
          margin-bottom: 0;
        }
        .about-text .lead {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .about-text .highlight {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .about-text .highlight strong {
          color: var(--color-red);
          font-size: 1.3rem;
        }
        .about-text .emphasis {
          padding: var(--space-md);
          background: var(--color-bg);
          border-left: 4px solid var(--color-yellow);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .about-text .emphasis strong {
          color: var(--color-blue);
        }
        .activity-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
          padding: var(--space-md) 0;
        }
        .activity-list span {
          display: inline-block;
          padding: 12px 16px;
          background: var(--color-yellow);
          color: var(--color-text);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          text-shadow: none;
        }
        .activity-list span:nth-child(2) {
          background: var(--color-red);
          color: white;
          text-shadow: 1px 1px 0 var(--color-border);
        }
        .activity-list span:nth-child(3) {
          background: var(--color-blue);
          color: white;
          text-shadow: 1px 1px 0 var(--color-border);
        }
        .activity-list span:nth-child(4) {
          background: white;
        }
        /* conclusionセクション */
        .conclusion-section {
          padding: var(--space-xl) 0;
          text-align: center;
          background: linear-gradient(135deg, var(--color-blue) 0%, #3d8fd1 100%);
          margin: 0 calc(-1 * var(--space-md));
          padding-left: var(--space-md);
          padding-right: var(--space-md);
          position: relative;
          overflow: hidden;
        }
        .conclusion-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.03) 10px,
            rgba(255,255,255,0.03) 20px
          );
        }
        .conclusion-text {
          font-size: 1.1rem;
          font-weight: 500;
          color: white;
          line-height: 1.8;
          position: relative;
        }
        .conclusion-text strong {
          display: block;
          font-size: 1.3rem;
          font-weight: 900;
          margin-top: var(--space-sm);
          text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
        }
        /* 参加してみたい方へセクション */
        .join-section {
          padding: var(--space-lg) 0 var(--space-2xl);
        }
        .join-box {
          padding: var(--space-lg);
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--color-border);
          text-align: center;
        }
        .join-box h2 {
          font-size: 1.2rem;
          font-weight: 900;
          margin-bottom: var(--space-md);
          color: var(--color-text);
        }
        .join-box p {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: var(--space-xs);
        }
        .join-box p strong {
          color: var(--color-red);
          font-size: 1.1rem;
        }
        .join-box .sns-links {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          margin-top: var(--space-md);
        }
        .contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-md);
        }
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-text);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: all 0.2s;
        }
        .contact-link:hover {
          background: var(--color-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
