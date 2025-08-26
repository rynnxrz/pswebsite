import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pageTransition } from '../utils/animations';

export const Portfolio = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const pdfContainer = document.querySelector('.pdf-container');
    
    if (!isFullscreen) {
      // Enter fullscreen
      if (pdfContainer?.requestFullscreen) {
        pdfContainer.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div {...pageTransition} className="portfolio-page">
      {/* Header Section - matching home page layout */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-text">
          <h1 className="portfolio-main-title">Rongze's Work</h1>
          <p className="portfolio-subtitle">Select product & design work. Present in portable document format.</p>
          <Link to="/" className="homepage-link">View Homepage</Link>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="portfolio-content">
        <div className="pdf-controls">
          <button onClick={toggleFullscreen} className="fullscreen-btn">
            {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          </button>
        </div>
        <div className="pdf-container">
          <iframe
            src="/portfolio.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Portfolio PDF"
            className="pdf-viewer"
          />
        </div>
      </section>
    </motion.div>
  );
};
