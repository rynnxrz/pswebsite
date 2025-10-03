import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './components/Home';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { ScrollToTop } from './components/ScrollToTop'; // <-- 1. Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <-- 2. Place it here, inside the Router */}
      <div>
        <nav className="nav">
          <Link to="/" className="nav-brand">Rongze Xu</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
          </div>
        </nav>

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;