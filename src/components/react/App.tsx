import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

  return (
    <BrowserRouter basename={basePath.replace(/\/$/, '')}>
      <NavigationListener />
      <Header />
      <MobileNav />
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
