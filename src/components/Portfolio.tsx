// src/components/Portfolio.tsx

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { pageTransition } from '../utils/animations';
import { Expand, Download, Copy, Check } from 'lucide-react';
import './Portfolio.css';

export const Portfolio = () => {
  const [isCopied, setIsCopied] = useState(false);
  const pdfContainerRef = useRef<HTMLElement>(null);

  const portfolioPdfUrl = "https://drive.usercontent.google.com/download?id=1cfOeyQdeB95VFB889BVrqjhxi4_qVXqg&export=download&authuser=0";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleFullscreen = () => {
    const element = pdfContainerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.div {...pageTransition} className="portfolio-page-container">
      <div className="portfolio-content-wrapper">

        <header className="portfolio-header">
          <div className="portfolio-header-text">
            <h2 className="portfolio-title">product & design portfolio</h2>
            <p className="portfolio-date">October 14th, 2025</p>
          </div>
          <div className="action-buttons-container">
            {/* --- 1. 为全屏按钮的容器添加一个特定的类名 --- */}
            <div className="tooltip-container fullscreen-btn-container">
              <button onClick={toggleFullscreen} className="action-btn">
                <Expand size={16} />
              </button>
              <span className="tooltip-text">Full window view</span>
            </div>
            <div className="tooltip-container">
              <a 
                href={portfolioPdfUrl} 
                download="Rongze_Xu_Portfolio.pdf" 
                className="action-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
              </a>
              <span className="tooltip-text">Download PDF</span>
            </div>
            <div className="tooltip-container">
              <button onClick={handleCopyLink} className="action-btn">
                {isCopied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
              </button>
              <span className="tooltip-text">Copy URL</span>
            </div>
          </div>
        </header>

        <section ref={pdfContainerRef} className="pdf-container">
          <iframe
            src="/portfolio_small.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Portfolio PDF"
            className="pdf-viewer"
          />
        </section>
        
      </div>
    </motion.div>
  );
};