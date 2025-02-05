import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import { pageTransition } from '../utils/animations';

export const Home = () => (
  <motion.div {...pageTransition}>
    <section className="home-container">
      <div className="home-text">
        <h1 className="home-title">Rongze is an innovative UX Designer and Developer base in London.</h1>
        <p className="home-description">I find great joy in solving problems for others.</p>
      </div>
      <div className="profile-image">
        <img src="/images/profile.jpg" alt="Profile" />
      </div>
    </section>

    <section id="projects" className="section-container">
      <h2 className="home-title">Projects</h2>
      <div className="projects-grid">
        <Link to="/project/p" style={{ textDecoration: 'none' }}>
          <ProjectCard
            title="Project P: InnerPeace Stress Management Android Application Design"
            description="A mobile app designed to help users manage stress and maintain mental well-being."
            image="/images/project-p.jpg"
          />
        </Link>
        <Link to="/project/one" style={{ textDecoration: 'none' }}>
          <ProjectCard
            title="Project One: Hitch'n Farm Bridging the Nature Gap in Cities"
            description="An innovative solution to connect urban dwellers with nature and sustainable farming practices."
            image="/images/project-one.jpg"
          />
        </Link>
      </div>
    </section>

    <section id="contact" className="section-container">
      <div className="contact-section">
        <h2 className="home-title">Contact</h2>
        <a href="mailto:rongze.work@foxmail.com" className="contact-link">
          rongze.work@foxmail.com
        </a>
      </div>
    </section>
  </motion.div>
);