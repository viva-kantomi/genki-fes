import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eventsData from '../../../data/events.json';
import { Countdown } from '../Countdown';
import styles from './Home.module.css';

interface NoteArticle {
  key: string;
  title: string;
  publishedAt: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  schedule: string;
  description: string;
  link: string | null;
  image: string | null;
  featured: boolean;
  badge: string | null;
  order: number;
}

// 特設ページ表示フラグ
const showGenkiFestaSpecial = import.meta.env.PUBLIC_SHOW_GENKI_FESTA_SPECIAL === 'true';

export function Home() {
  const [noteArticles, setNoteArticles] = useState<NoteArticle[]>([]);
  const basePath = import.meta.env.BASE_URL || '/';

  // ロゴ画像を環境変数で切り替え
  const logoImage = showGenkiFestaSpecial
    ? `${basePath}images/top_logo_special.webp`
    : `${basePath}images/top_logo.webp`;

  // order 3までのイベントを取得
  const topEvents = (eventsData as Event[])
    .sort((a, b) => a.order - b.order)
    .filter((event) => event.order <= 3);

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
      {/* SP用カウントダウン */}
      {showGenkiFestaSpecial && <Countdown />}

      {/* ヒーロー */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={`${styles.scrollRow} ${styles.scrollRow1}`}>
            <div className={`${styles.scrollTrack} ${styles.scrollRight}`}>
              {[10, 11, 12, 13, 14, 10, 11, 12, 13, 14].map((num, i) => (
                <img key={i} src={`${basePath}images/top_images/${num}.webp`} alt="" className={styles.heroBgImg} loading="eager" />
              ))}
            </div>
          </div>
          <div className={`${styles.scrollRow} ${styles.scrollRow2}`}>
            <div className={`${styles.scrollTrack} ${styles.scrollLeft}`}>
              {[15, 16, 17, 18, 10, 15, 16, 17, 18, 10].map((num, i) => (
                <img key={i} src={`${basePath}images/top_images/${num}.webp`} alt="" className={styles.heroBgImg} loading="eager" />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroClouds}>
          <div className={`${styles.cloud} ${styles.cloud1}`}></div>
          <div className={`${styles.cloud} ${styles.cloud2}`}></div>
          <div className={`${styles.cloud} ${styles.cloud3}`}></div>
          <div className={`${styles.cloud} ${styles.cloud4}`}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLogoArea}>
            {showGenkiFestaSpecial ? (
              <Link to="/genki-festa-2026/" className={styles.heroLogoLink}>
                <img src={logoImage} alt="げんきフェスタ2026 5/24 SUN" className={styles.heroLogo} />
                <span className={styles.heroLogoBtn}>
                  特設ページはこちら
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            ) : (
              <div className={styles.heroLogoStatic}>
                <img src={logoImage} alt="げんき塾チーム" className={styles.heroLogo} />
              </div>
            )}
          </div>
          <div className={styles.heroActionCards}>
            <Link to="/events/" className={`${styles.heroActionCard} ${styles.heroActionCardEnjoy}`}>
              <span className={styles.heroActionLabel}>楽しむ</span>
              <span className={styles.heroActionDesc}>イベント詳細</span>
            </Link>
            <Link to="/about/" className={`${styles.heroActionCard} ${styles.heroActionCardEntertain}`}>
              <span className={styles.heroActionLabel}>楽しませる</span>
              <span className={styles.heroActionDesc}>出店・参加方法</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SP用動画セクション */}
      <section className={`${styles.section} ${styles.sectionVideoSp}`}>
        <div className={styles.container}>
          <p className={styles.videoSpLabel}>2025年のげんきフェスタの様子</p>
          <div className={styles.videoSpContainer}>
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
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>ABOUT US</p>
          <h2 className={styles.sectionTitle}>私たちについて</h2>
          <div className={styles.aboutBox}>
            <p className={styles.aboutLine}>わたしたちは、特定の団体ではありません</p>
            <p className={styles.aboutLine}>決まったメンバーも</p>
            <p className={styles.aboutLine}>決まった役割もありません</p>
            <p className={styles.aboutLine}>不定形で上下もない</p>
            <p className={styles.aboutLine}>名前のない<strong>「なにか」</strong>です！</p>
            <img src={`${basePath}images/common/ameba.webp`} alt="" className={styles.aboutImage} />
            <p className={styles.aboutLine}>いつも説明に困っています！</p>
          </div>
          <div className={styles.sectionAction}>
            <Link to="/about/" className={styles.btnOutline}>
              詳細はこちら
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* イベント紹介 */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>EVENTS</p>
          <h2 className={styles.sectionTitle}>主なイベント</h2>
          <div className={styles.eventCards}>
            {topEvents.map((event) => (
              <div key={event.id} className={`${styles.eventCard} ${styles.eventCardNoLink}`}>
                {event.image && (
                  <img src={`${basePath}${event.image.replace(/^\//, '')}`} alt={event.title} className={styles.eventCardImage} />
                )}
                <div className={styles.eventCardOverlay}>
                  <h3 className={styles.eventCardTitle}>{event.title}</h3>
                  <p className={styles.eventCardSchedule}>{event.schedule}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.eventNote}>他にも地域勉強会やゼミの発表会も！</p>
          <div className={styles.sectionAction}>
            <Link to="/events/" className={styles.btnOutline}>
              イベント詳細
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* お知らせ（noteから取得） */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>NEWS</p>
          <h2 className={styles.sectionTitle}>お知らせ</h2>
          <ul className={styles.newsList}>
            {noteArticles.map((article) => (
              <li key={article.key}>
                <Link to={`/note/${article.key}/`} className={styles.newsCard}>
                  <time dateTime={new Date(article.publishedAt).toISOString()}>
                    {new Date(article.publishedAt).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}
                  </time>
                  <span className={styles.newsTitle}>{article.title}</span>
                  <svg className={styles.newsArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.sectionAction}>
            <a href="https://note.com/viva_kantomi" target="_blank" rel="noopener noreferrer" className={styles.btnOutline}>
              お知らせ一覧
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SNS */}
      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>最新情報をフォロー</h2>
          <p className={styles.ctaLead}>SNSでげんき塾チームの情報をお届けします</p>
          <div className={styles.snsLinks}>
            <a href="#" className={styles.snsLink} aria-label="Instagram">
              <img src={`${basePath}images/common/sns/icons8-instagram-100.png`} alt="Instagram" width="32" height="32" />
            </a>
            <a href="#" className={styles.snsLink} aria-label="YouTube">
              <img src={`${basePath}images/common/sns/icons8-youtube-100.png`} alt="YouTube" width="32" height="32" />
            </a>
            <a href="#" className={styles.snsLink} aria-label="Facebook">
              <img src={`${basePath}images/common/sns/icons8-facebook-100.png`} alt="Facebook" width="32" height="32" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
