import styles from './About.module.css';

export function About() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>ABOUT</p>
          <h1 className={styles.pageTitle}>げんき塾チームについて</h1>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.mottoSection}>
          <p className={styles.mottoLabel}>MOTTO</p>
          <p className={styles.motto}>楽しませる方が<br />もっと楽しい</p>
        </section>

        <section className={styles.contentSection}>
          <h1 className={styles.contentSectionTitle}>私たちについて</h1>
          <div className={styles.aboutText}>
            <p className={styles.lead}>私たちは、特定の団体ではありません。</p>
            <p className={styles.highlight}>あえて言葉にするなら<br/><strong>「まちの常連」</strong>です。</p>
            <p>
              決まったメンバーも、決まった役割もない。<br />
              それでも集まり、何かをしているうちに、<br />
              気づけば地域の出来事のそばに立っています。
            </p>
            <p className={styles.highlight}>私たちを結んでいるのは<br />
              <strong>目的</strong>ではありません。<br />
            </p>
            <p className={styles.highlight}>
              私たちを結んでいるのは<br />
              <strong>時間</strong>と<strong>行動</strong>です。
            </p>
            <div className={styles.activityList}>
              <span>げんきフェスタ</span>
              <span>飲み会</span>
              <span>旅や交流</span>
              <span>ボランティア</span>
              <span>マラソン</span>
              <span>ゲストハウス</span>
              <span>勉強会</span>
              <span>地域活性化</span>
              <span>ワークショップ</span>
            </div>
            <p className={styles.highlight}>
              その積み重ねが、<br />
              関係人口のハブとなり、<br />
              学びや出会いを呼び込みました。
            </p>
          </div>
        </section>

        <section className={styles.conclusionSection}>
          <p className={styles.conclusionText}>
            名前がなくても、<br />
            組織でなくても、<br />
            <strong>ワクワクする「なにか」が<br />ここにあります。</strong>
          </p>
        </section>

        <section className={styles.joinSection}>
          <div className={styles.joinBox}>
            <h2 className={styles.joinBoxTitle}>参加してみたい方へ</h2>
            <p className={styles.joinBoxText}>SNSからお問い合わせいただき、<br/>
              まずは毎週 月曜日開催の<br/><strong>月のみ</strong>にお越しください！</p>
            <p className={styles.joinBoxText}><a href="/" className={styles.tsukinomiLink}>月のみの詳細はコチラ</a></p>
            <div className={styles.snsLinks}>
              <a href="#" className={styles.snsLink} aria-label="Facebook">
                <img src={`${import.meta.env.BASE_URL}images/common/sns/icons8-facebook-100.png`} alt="Facebook" width="48" height="48" />
              </a>
              <a href="#" className={styles.snsLink} aria-label="Instagram">
                <img src={`${import.meta.env.BASE_URL}images/common/sns/icons8-instagram-100.png`} alt="Instagram" width="48" height="48" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
