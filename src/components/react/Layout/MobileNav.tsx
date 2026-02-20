import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export function MobileNav({ isOpen, closeMenu }: MobileNavProps) {
  return (
    <nav className={`nav-mobile ${isOpen ? 'active' : ''}`}>
      <Link to="/" className="nav-mobile-link nav-blue" onClick={closeMenu}>トップ</Link>
      <Link to="/events/" className="nav-mobile-link nav-yellow" onClick={closeMenu}>イベント詳細</Link>
      <Link to="/history/" className="nav-mobile-link nav-red" onClick={closeMenu}>これまでの活動</Link>
      <Link to="/genki-festa-2026/" className="nav-mobile-link nav-blue" onClick={closeMenu}>2026 げんきフェスタ 特設ページ</Link>
      <Link to="/news/" className="nav-mobile-link nav-yellow" onClick={closeMenu}>お知らせ</Link>
      <Link to="/about/" className="nav-mobile-link nav-red" onClick={closeMenu}>私たちについて</Link>
    </nav>
  );
}
