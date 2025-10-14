// src/App.tsx

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './components/Home';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { ScrollToTop } from './components/ScrollToTop';
import { RetroToggle } from './components/RetroToggle';
import { BottomNav } from './components/BottomNav';
import { NotificationProvider } from './components/NotificationContext';
import { DynamicIsland } from './components/DynamicIsland.tsx';
import './App.css';
import './components/Tooltip.css';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {location.pathname === '/' && <RetroToggle />}
      <DynamicIsland />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* --- Change: Route is now /about --- */}
            <Route path="/about" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            {/* Add fallbacks for old paths if desired */}
            <Route path="/profile" element={<Home />} />
            <Route path="/settings" element={<Portfolio />} />
          </Routes>
        </AnimatePresence>
      </main>
      <BottomNav />
    </>
  );
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}

export default App;