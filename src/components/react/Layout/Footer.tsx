import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-text">げんき塾チーム</span>
        </div>
        <nav className="footer-nav">
          <Link to="/">トップ</Link>
          <Link to="/events/">イベント詳細</Link>
          <Link to="/history/">これまでの活動</Link>
          <Link to="/genki-festa-2026/">2026 げんきフェスタ<br/>特設ページ</Link>
          <Link to="/news/">お知らせ</Link>
          <Link to="/about/">私たちについて</Link>
        </nav>
        <p className="copyright">&copy; 2026 げんき塾チーム</p>
        <p className="credits">icon by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a></p>
      </div>
    </footer>
  );
}
