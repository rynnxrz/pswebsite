import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { pageTransition } from '../utils/animations';
import './Portfolio.css';

export const Portfolio = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. 确保这里是大文件的 Google Drive 下载链接
  const highQualityPdfUrl = "https://drive.usercontent.google.com/download?id=1cfOeyQdeB95VFB889BVrqjhxi4_qVXqg&export=download&authuser=0";

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const pdfContainer = document.querySelector('.pdf-container');
    if (!pdfContainer) return;

    if (!isFullscreen) {
      pdfContainer.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
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
          <div className="pdf-controls">
            <a 
              href={highQualityPdfUrl} 
              download="Rongze_Xu_Portfolio_HQ.pdf" 
              className="pdf-btn download-btn"
              title="Download High Quality PDF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
            <button onClick={toggleFullscreen} className="pdf-btn fullscreen-btn" title="Toggle Fullscreen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </button>
          </div>
          
          {/* 2. 确保这里是小文件 portfolio_small.pdf */}
          <iframe
            src="/portfolio_small.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Portfolio PDF"
            className="pdf-viewer"
          />
        </div>
      </section>
    </motion.div>
  );
};