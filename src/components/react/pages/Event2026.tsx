import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const schedule = [
  { time: '10:00', content: '開場', description: 'フードエリア・ワークショップエリアオープン' },
  { time: '11:00', content: 'オープニングセレモニー', description: 'メインステージにて' },
  { time: '11:30', content: 'ライブステージ開始', description: '地元アーティストによるライブ' },
  { time: '12:00', content: 'キッズタイム', description: 'サブステージで子ども向けショー' },
  { time: '14:00', content: 'スペシャルゲストライブ', description: '詳細は後日発表！' },
  { time: '16:00', content: 'フィナーレ', description: '全員参加のダンスタイム' },
  { time: '17:00', content: '閉場', description: '' },
];

const areas = [
  { name: 'メインステージ', icon: '🎵', description: '音楽ライブ、ダンスパフォーマンス' },
  { name: 'サブステージ', icon: '🎭', description: 'キッズショー、トークイベント' },
  { name: 'フードエリア', icon: '🍔', description: '地元グルメ30店舗以上' },
  { name: 'ワークショップ', icon: '🎨', description: '工作・体験ブース' },
  { name: 'キッズエリア', icon: '🎠', description: '遊具・ゲームコーナー' },
  { name: '休憩エリア', icon: '🌳', description: '日陰・給水スポット' },
];

export function Event2026() {
  const [days, setDays] = useState('---');

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date('2026-08-15T10:00:00+09:00');
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      const daysLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      setDays(daysLeft.toString());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero-2026">
        <div className="hero-inner">
          <p className="hero-date">2026.8.15 SAT</p>
          <h1 className="hero-title">
            <span className="title-year">2026</span>
            <span className="title-main">げんきフェスタ</span>
          </h1>
          <p className="hero-theme">テーマ：「元気、無限大！」</p>
          <div className="hero-info">
            <p>東京・お台場 海浜公園</p>
            <p>10:00〜17:00 / 入場無料</p>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="container">
          <p className="countdown-label">開催まであと</p>
          <div className="countdown-display">
            <div className="countdown-item">
              <span className="countdown-number">{days}</span>
              <span className="countdown-unit">日</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-label">CONCEPT</p>
          <h2 className="section-title">元気、無限大！</h2>
          <p className="section-lead">
            今年のげんきフェスタは「元気、無限大！」をテーマに、
            老若男女みんなが楽しめるフェスティバルを目指します。
            地域の絆を深め、笑顔あふれる一日を一緒に作りましょう！
          </p>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <p className="section-label">TIMETABLE</p>
          <h2 className="section-title">タイムスケジュール</h2>
          <div className="timetable">
            {schedule.map((item, index) => (
              <div key={index} className="timetable-item">
                <div className="timetable-time">{item.time}</div>
                <div className="timetable-content">
                  <p className="timetable-title">{item.content}</p>
                  {item.description && <p className="timetable-desc">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="timetable-note">※スケジュールは予告なく変更になる場合があります</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-label">AREA MAP</p>
          <h2 className="section-title">エリア紹介</h2>
          <div className="areas">
            {areas.map((area, index) => (
              <div key={index} className="area-card">
                <span className="area-icon">{area.icon}</span>
                <div className="area-body">
                  <h3 className="area-name">{area.name}</h3>
                  <p className="area-desc">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>ACCESS</p>
          <h2 className="section-title">アクセス</h2>
          <div className="access-info">
            <div className="access-item">
              <h3>電車でお越しの方</h3>
              <p>りんかい線「東京テレポート駅」徒歩5分</p>
              <p>ゆりかもめ「お台場海浜公園駅」徒歩3分</p>
            </div>
            <div className="access-item">
              <h3>お車でお越しの方</h3>
              <p>首都高速湾岸線「お台場」出口より5分</p>
              <p>※駐車場には限りがあります。公共交通機関をご利用ください。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container">
          <h2 className="cta-title">最新情報をチェック！</h2>
          <p className="cta-lead">出演者・出店情報など随時更新中</p>
          <Link to="/news/" className="cta-btn">
            NEWS一覧へ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        .container { max-width: 600px; margin: 0 auto; padding: 0 var(--space-md); }
        .hero-2026 { background: linear-gradient(135deg, var(--color-blue) 0%, var(--color-primary) 50%, var(--color-secondary) 100%); padding: var(--space-2xl) var(--space-md); text-align: center; color: white; border-bottom: 2px solid var(--color-border); }
        .hero-inner { max-width: 600px; margin: 0 auto; }
        .hero-date { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em; margin-bottom: var(--space-sm); opacity: 0.9; }
        .hero-title { margin-bottom: var(--space-md); }
        .title-year { display: block; font-size: 3.5rem; font-weight: 900; line-height: 1; text-shadow: 3px 3px 0 var(--color-border); }
        .title-main { display: block; font-size: 2rem; font-weight: 900; margin-top: var(--space-xs); }
        .hero-theme { font-size: 1rem; font-weight: 700; background: var(--color-yellow); color: var(--color-text); display: inline-block; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-full); margin-bottom: var(--space-md); }
        .hero-info { font-size: 0.9rem; line-height: 1.8; opacity: 0.95; }
        .countdown-section { background: var(--color-yellow); padding: var(--space-lg) 0; text-align: center; border-bottom: 2px solid var(--color-border); }
        .countdown-label { font-size: 0.8rem; font-weight: 700; color: var(--color-text); margin-bottom: var(--space-xs); }
        .countdown-display { display: flex; justify-content: center; gap: var(--space-md); }
        .countdown-item { display: flex; align-items: baseline; gap: 4px; }
        .countdown-number { font-size: 3rem; font-weight: 900; color: var(--color-primary); line-height: 1; }
        .countdown-unit { font-size: 1.25rem; font-weight: 700; color: var(--color-text); }
        .section { padding: var(--space-xl) 0; }
        .section--white { background: var(--color-bg-white); }
        .section--blue { background: var(--color-primary); color: white; }
        .section--accent { background: var(--color-secondary); color: white; text-align: center; }
        .section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; color: var(--color-primary); margin-bottom: var(--space-xs); }
        .section--blue .section-label { color: var(--color-yellow); }
        .section-title { display: inline-block; font-size: 1.5rem; font-weight: 900; line-height: 1.4; margin-bottom: var(--space-md); padding: var(--space-sm) var(--space-lg); background: var(--color-primary); color: white; border: 3px solid var(--color-border); border-radius: 0; box-shadow: 4px 4px 0 var(--color-border); }
        .section--blue .section-title { background: var(--color-yellow); color: var(--color-text); }
        .section-lead { font-size: 0.9rem; line-height: 1.8; color: var(--color-text-muted); }
        .timetable { display: flex; flex-direction: column; }
        .timetable-item { display: flex; gap: var(--space-md); padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border); }
        .timetable-time { font-size: 1rem; font-weight: 900; color: var(--color-primary); min-width: 60px; }
        .timetable-content { flex: 1; }
        .timetable-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; }
        .timetable-desc { font-size: 0.8rem; color: var(--color-text-muted); }
        .timetable-note { font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--space-md); }
        .areas { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-sm); }
        .area-card { background: var(--color-bg-white); border: 2px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; }
        .area-icon { font-size: 2rem; display: block; margin-bottom: var(--space-xs); }
        .area-name { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
        .area-desc { font-size: 0.75rem; color: var(--color-text-muted); }
        .access-info { display: flex; flex-direction: column; gap: var(--space-md); }
        .access-item { background: rgba(255,255,255,0.1); padding: var(--space-md); border-radius: var(--radius-md); }
        .access-item h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: var(--space-xs); color: var(--color-yellow); }
        .access-item p { font-size: 0.85rem; line-height: 1.7; opacity: 0.95; }
        .cta-title { font-size: 1.5rem; font-weight: 900; margin-bottom: var(--space-xs); }
        .cta-lead { font-size: 0.9rem; opacity: 0.9; margin-bottom: var(--space-md); }
        .cta-btn { display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-sm) var(--space-lg); background: white; color: var(--color-secondary); font-size: 0.9rem; font-weight: 700; text-decoration: none; border-radius: var(--radius-full); transition: all 0.2s; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
        @media (max-width: 400px) { .areas { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
