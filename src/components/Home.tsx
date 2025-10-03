import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pageTransition } from '../utils/animations';
import { ProjectCard } from './ProjectCard';
import './Home.css';

export const Home = () => {
  const [isMosaicExpanded, setIsMosaicExpanded] = useState(false);

  const handleMosaicExpand = () => {
    setIsMosaicExpanded(true);
  };

  const handleMosaicCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMosaicExpanded(false);
  };

  return (
    <motion.div {...pageTransition}>

      <div className={`mosaic-container ${isMosaicExpanded ? 'expanded' : ''}`}>
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

      <section id="projects" className="section-container featured-projects">
        <div className="project-grid">
          <Link to="/project/p" className="project-card-link">
            <ProjectCard 
              title="Innerpeace" 
              image="/assets/images/innerpeace-cover.png"
              description="We created a low-cost mental health app for students, optimized to run on affordable Android devices, enabling large-scale testing with a research database and delivering accessible stress-relief at scale.
"
              tags={["UX Research", "Android App", "Scalable"]}
            />
          </Link>
          {/* 
            You can add another project here to test the 2-column layout
            <Link to="/project/one" className="project-card-link">
              <ProjectCard 
                title="Hitch'n Farm" 
                image="/path/to/your/other-image.jpg"
                description="A project bridging the nature gap in cities, nominated for a UX Design Award in 2023."
                tags={["Product Design", "Branding"]}
              />
            </Link>
          */}
        </div>
      </section>

      <section id="contact" className="section-container">
        <div className="contact-section">
          <h2 className="section-title">Contact</h2>
          <div className="contact-links-container">
            <a href="https://www.instagram.com/rzxu._/" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
              📷INS
            </a>
            <a href="mailto:rongze.work@gmail.com" className="contact-icon-link">
              📩EMAIL
            </a>
          </div>
        </div>
      </section>

    </motion.div>
  );
};