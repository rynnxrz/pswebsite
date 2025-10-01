import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pageTransition } from '../utils/animations';
import './Home.css';

export const Home = () => {
  const [isMosaicExpanded, setIsMosaicExpanded] = useState(false);

  const handleMosaicExpand = () => {
    setIsMosaicExpanded(true);
  };

  const handleMosaicCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 防止事件冒泡到父级div
    setIsMosaicExpanded(false);
  };

  return (
    <motion.div {...pageTransition}>

      <div className={`mosaic-container ${isMosaicExpanded ? 'expanded' : ''}`}>
        
        {/* 仅在未展开时显示点击覆盖层 */}
        {!isMosaicExpanded && (
          <div
            className="mosaic-click-overlay"
            onClick={handleMosaicExpand}
          />
        )}

        <iframe
          src="/mosaic3d/index.html"
          title="Mosaic 3D Interactive App"
          className="mosaic-iframe"
          // 当展开时，允许与iframe交互
          style={{ pointerEvents: isMosaicExpanded ? 'auto' : 'none' }}
        ></iframe>

        {isMosaicExpanded && (
          <button
            className="mosaic-close-btn"
            onClick={handleMosaicCollapse}
          >
            &times;
          </button>
        )}
      </div>

      <section className="home-container">
        <div className="home-text">
          <h1 className="home-title">Rongze is an innovative Product Designer and Developer base in London.</h1>
          <p className="home-description">I find great joy in solving problems for others.</p>
          <Link to="/portfolio" className="portfolio-link">View portfolio</Link>
        </div>
      </section>

      <section id="contact" className="section-container">
        <div className="contact-section">
          <h2 className="home-title">Contact</h2>
          <div className="contact-links-container">
            <a href="https://www.instagram.com/rz.xu_/" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
              📷 Ins
            </a>
            <a href="mailto:rongze.work@gmail.com" className="contact-icon-link">
              ✉️ 邮件
            </a>
          </div>
        </div>
      </section>

    </motion.div>
  );
};