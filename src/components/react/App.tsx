import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './Layout/Header';
import { Footer } from './Layout/Footer';
import { MobileNav } from './Layout/MobileNav';
import { Home } from './pages/Home';
import { Event2026 } from './pages/Event2026';
import { Events } from './pages/Events';
import { About } from './pages/About';
import { History } from './pages/History';
import { NewsList } from './pages/NewsList';
import { NewsDetail } from './pages/NewsDetail';
import { NoteDetail } from './pages/NoteDetail';

// ページ遷移時にスクロールをトップに戻す
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// サイドバーからのナビゲーションイベントをリッスン
function NavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigate = (e: CustomEvent<{ path: string }>) => {
      navigate(e.detail.path);
    };

    window.addEventListener('spa-navigate', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('spa-navigate', handleNavigate as EventListener);
    };
  }, [navigate]);

  return null;
}

export function App() {
  const basePath = import.meta.env.BASE_URL || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('nav-open', !isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('nav-open');
  };

  return (
    <BrowserRouter basename={basePath.replace(/\/$/, '')}>
      <ScrollToTop />
      <NavigationListener />
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileNav isOpen={isMenuOpen} closeMenu={closeMenu} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/2026/" element={<Event2026 />} />
          <Route path="/events/" element={<Events />} />
          <Route path="/about/" element={<About />} />
          <Route path="/history/" element={<History />} />
          <Route path="/news/" element={<NewsList />} />
          <Route path="/news/:slug/" element={<NewsDetail />} />
          <Route path="/note/:key/" element={<NoteDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
