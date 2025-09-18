import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pageTransition } from '../utils/animations';
import './Portfolio.css'; // 引入新的CSS文件

export const Portfolio = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const pdfContainer = document.querySelector('.pdf-container');
    
    if (!isFullscreen) {
      if (pdfContainer?.requestFullscreen) {
        pdfContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div {...pageTransition} className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero-text">
          <h1 className="portfolio-main-title">Rongze's Work</h1>
          <p className="portfolio-subtitle">Select product & design work. Present in portable document format.</p>
          <Link to="/" className="homepage-link">View Homepage</Link>
        </div>
      </section>

      <section className="portfolio-content">
        <div className="pdf-container">
          <button onClick={toggleFullscreen} className="embedded-fullscreen-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
          
          <iframe
            src="/portfolio.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=70"
            title="Portfolio PDF"
            className="pdf-viewer"
          />
        </div>
      </section>
    </motion.div>
  );
};