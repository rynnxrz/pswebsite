import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pageTransition } from '../utils/animations';
import './Home.css';

export const Home = () => {
  const [isMosaicExpanded, setIsMosaicExpanded] = useState(false);

  const handleMosaicClick = () => {
    // --- 新增的日志 ---
    console.log("Mosaic 窗口被点击了! 当前是否展开:", isMosaicExpanded);

    if (!isMosaicExpanded) {
      setIsMosaicExpanded(true);
    }
  };

  return (
    <motion.div {...pageTransition}>

      <div 
        className={`mosaic-container ${isMosaicExpanded ? 'expanded' : ''}`}
        onClick={handleMosaicClick} // 使用新的处理函数
      >
        <iframe
          src="/mosaic3d/index.html"
          title="Mosaic 3D Interactive App"
          className="mosaic-iframe"
        ></iframe>
        {isMosaicExpanded && (
          <button 
            className="mosaic-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsMosaicExpanded(false);
            }}
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
            <a href="https://www.instagram.com/rynn_rz/" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
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