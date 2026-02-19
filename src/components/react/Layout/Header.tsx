import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('nav-open', !isMenuOpen);
  };

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
          <Link to="/2026/" className="nav-link">2026</Link>
          <Link to="/news/" className="nav-link">NEWS</Link>
          <Link to="/about/" className="nav-link">ABOUT</Link>
        </nav>
        <button
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
          id="menuBtn"
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
