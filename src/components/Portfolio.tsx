// src/components/Portfolio.tsx

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { pageTransition } from '../utils/animations';
import { Expand, Download, Copy } from 'lucide-react';
import { useNotification } from './NotificationContext'; // Import the notification hook
import './Portfolio.css';

// A reusable component for tooltipped buttons
const TooltipButton = ({ onClick, children, tooltipText, href, download }: any) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleMouseDown = () => setTooltipVisible(false);
  const handleMouseLeave = () => setTooltipVisible(true);

  const commonProps = {
    className: 'action-btn',
    onMouseDown: handleMouseDown,
  };

  const buttonContent = (
    <div
      className="tooltip-container"
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <a href={href} download={download} {...commonProps} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <button onClick={onClick} {...commonProps}>{children}</button>
      )}
      {tooltipVisible && <span className="tooltip-text">{tooltipText}</span>}
    </div>
  );

  return buttonContent;
};

export const Portfolio = () => {
  const pdfContainerRef = useRef<HTMLElement>(null);
  const { showNotification } = useNotification(); // Get the notification function

  const portfolioPdfUrl = "https://drive.usercontent.google.com/download?id=1cfOeyQdeB95VFB889BVrqjhxi4_qVXqg&export=download&authuser=0";

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      // Use the new notification system
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
            <TooltipButton onClick={toggleFullscreen} tooltipText="Full window view">
              <Expand size={16} />
            </TooltipButton>
            <TooltipButton href={portfolioPdfUrl} download="Rongze_Xu_Portfolio.pdf" tooltipText="Download PDF">
              <Download size={16} />
            </TooltipButton>
            <TooltipButton onClick={handleCopyLink} tooltipText="Copy URL">
              <Copy size={16} />
            </TooltipButton>
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