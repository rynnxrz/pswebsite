import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './components/Home';
import { ProjectDetail } from './components/ProjectDetail';
import './App.css';

function App() {
  return (
    <Router>
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
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
