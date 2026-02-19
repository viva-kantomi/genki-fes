import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export function MobileNav({ isOpen, closeMenu }: MobileNavProps) {
  return (
    <nav className={`nav-mobile ${isOpen ? 'active' : ''}`}>
      <Link to="/" className="nav-mobile-link nav-blue" onClick={closeMenu}>トップ</Link>
      <Link to="/events/" className="nav-mobile-link nav-yellow" onClick={closeMenu}>イベント一覧</Link>
      <Link to="/history/" className="nav-mobile-link nav-red" onClick={closeMenu}>HISTORY</Link>
      <Link to="/2026/" className="nav-mobile-link nav-blue" onClick={closeMenu}>2026 げんきフェスタ 特設ページ</Link>
      <Link to="/news/" className="nav-mobile-link nav-yellow" onClick={closeMenu}>NEWS</Link>
      <Link to="/about/" className="nav-mobile-link nav-red" onClick={closeMenu}>ABOUT</Link>
    </nav>
  );
}
