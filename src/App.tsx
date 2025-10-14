// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <RetroToggle />
        <DynamicIsland />

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Home />} />
              <Route path="/settings" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </AnimatePresence>
        </main>

        <BottomNav />
      </Router>
    </NotificationProvider>
  );
}

export default App;