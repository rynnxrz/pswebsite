// src/App.tsx

import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ScrollToTop } from './components/common/ScrollToTop';
import { RetroToggle } from './components/RetroToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { BottomNav } from './layouts/BottomNav';
import { NotificationProvider } from './components/NotificationContext';
import { DynamicIsland } from './layouts/DynamicIsland';
import './App.css';
import './components/Tooltip.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Portfolio = lazy(() => import('./pages/Portfolio').then(module => ({ default: module.Portfolio })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const GermanierShow = lazy(() => import('./pages/GermanierShow').then(module => ({ default: module.GermanierShow })));

const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-system)'
  }}>
    <div style={{ opacity: 0.6 }}>Loading...</div>
  </div>
);

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const preloadWorkWithMe = () => {
      void import('./pages/Portfolio');
    };

    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(preloadWorkWithMe, { timeout: 1500 });
      return () => win.cancelIdleCallback?.(handle);
    }

    const timeout = window.setTimeout(preloadWorkWithMe, 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <ScrollToTop />
      <ThemeToggle />
      {location.pathname === '/' && <RetroToggle />}
      <DynamicIsland />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } />
            <Route path="/workwithme" element={
              <Suspense fallback={<PageLoader />}>
                <Portfolio />
              </Suspense>
            } />
            <Route path="/project/:id" element={
              <Suspense fallback={<PageLoader />}>
                <ProjectDetail />
              </Suspense>
            } />
            <Route path="/germanier-paris-2026" element={
              <Suspense fallback={<PageLoader />}>
                <GermanierShow />
              </Suspense>
            } />
            {/* Fallbacks */}
            <Route path="/profile" element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="/portfolio" element={
              <Suspense fallback={<PageLoader />}>
                <Portfolio />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<PageLoader />}>
                <Portfolio />
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <BottomNav />
    </>
  );
};

// import { useIpadCursor } from './hooks/useIpadCursor';

function App() {
  // useIpadCursor();

  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}

export default App;
