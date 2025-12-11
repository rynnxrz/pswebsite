// src/components/Portfolio.tsx

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { pageTransition } from '../utils/animations';
import { Expand, Download, Copy } from 'lucide-react';
import { useNotification } from '../components/NotificationContext';
import './Portfolio.css';

const TooltipButton = ({ onClick, children, tooltipText, href, download, isMobile }: any) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => !isMobile && setTooltipVisible(true);
  const handleMouseLeave = () => setTooltipVisible(false);

  const commonProps = {
    className: 'action-btn',
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
  };

  return (
    <div className="tooltip-container">
      {href ? (
        <a href={href} download={download} {...commonProps} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <button {...commonProps}>{children}</button>
      )}
      {tooltipVisible && <span className="tooltip-text">{tooltipText}</span>}
    </div>
  );
};

export const Portfolio = () => {
  const pdfContainerRef = useRef<HTMLElement>(null);
  const { showNotification } = useNotification();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const portfolioPdfUrl = "https://drive.usercontent.google.com/download?id=1cfOeyQdeB95VFB889BVrqjhxi4_qVXqg&export=download&authuser=0";

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Successfully copied to clipboard', url);
    });
  };

  const toggleFullscreen = () => {
    const element = pdfContainerRef.current;
    if (!element) return;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.error(err));
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
            {!isMobile && (
              <TooltipButton onClick={toggleFullscreen} tooltipText="Full window view" isMobile={isMobile}>
                <Expand size={16} />
              </TooltipButton>
            )}
            <TooltipButton href={portfolioPdfUrl} download="Rongze_Xu_Portfolio.pdf" tooltipText="Download PDF" isMobile={isMobile}>
              <Download size={16} />
            </TooltipButton>
            <TooltipButton onClick={handleCopyLink} tooltipText="Copy URL" isMobile={isMobile}>
              <Copy size={16} />
            </TooltipButton>
          </div>
        </header>

        <section ref={pdfContainerRef} className="pdf-container">
          {isMobile ? (
            <div className="mobile-overlay">
              <p>For the best viewing experience, please download the PDF.</p>
            </div>
          ) : (
            <iframe
              src="/portfolio_small.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
              title="Portfolio PDF"
              className="pdf-viewer"
            />
          )}
        </section>
      </div>
    </motion.div>
  );
};