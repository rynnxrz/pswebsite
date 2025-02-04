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
      <div className="contact-form">
        <h2 className="home-title">Contact</h2>
        <form className="form-group">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="form-textarea"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="submit-button"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  </motion.div>
);