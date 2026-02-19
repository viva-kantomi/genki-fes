import { Link } from 'react-router-dom';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-text">げんき塾チーム</span>
        </Link>
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/events/" className="nav-link">EVENTS</Link>
          <Link to="/history/" className="nav-link">HISTORY</Link>
          <Link to="/genki-festa-2026/" className="nav-link">2026</Link>
          <Link to="/news/" className="nav-link">NEWS</Link>
          <Link to="/about/" className="nav-link">ABOUT</Link>
        </nav>
        <button
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
          aria-label="メニューを開く"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
