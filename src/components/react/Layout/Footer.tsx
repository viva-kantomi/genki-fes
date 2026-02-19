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
          <Link to="/events/">イベント一覧</Link>
          <Link to="/history/">HISTORY</Link>
          <Link to="/news/">NEWS</Link>
          <Link to="/about/">ABOUT</Link>
        </nav>
        <p className="copyright">&copy; 2026 げんき塾チーム</p>
        <p className="credits">icon by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a></p>
      </div>
    </footer>
  );
}
