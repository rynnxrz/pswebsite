import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="nav">
          <Link to="/" className="nav-brand">Rongze Xu</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <div className="nav-links">
              <span className="nav-link">English</span>
              <select className="nav-link">
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const Home = () => (
  <motion.div 
    {...pageTransition}
    className="home-container"
  >
    <div className="home-text">
      <h1 className="home-title">Rongze is an innovative UX Designer and Developer base in Auckland, New Zealand.</h1>
      <p className="home-description">I find great joy in solving problems for others.</p>
    </div>
    <div className="profile-image">
      <img src="/images/profile.jpg" alt="Profile" />
    </div>
  </motion.div>
);

const Projects = () => (
  <motion.div 
    {...pageTransition}
    className="projects-grid"
  >
    <h2 className="home-title">Projects</h2>
    <div className="projects-grid">
      <ProjectCard
        title="Project P: InnerPeace Stress Management Android Application Design"
        description="A mobile app designed to help users manage stress and maintain mental well-being."
        image="/images/project-p.jpg"
      />
      <ProjectCard
        title="Project One: Hitch'n Farm Bridging the Nature Gap in Cities"
        description="An innovative solution to connect urban dwellers with nature and sustainable farming practices."
        image="/images/project-one.jpg"
      />
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="project-card"
  >
    <div className="project-image">
      <img src={image} alt={title} />
    </div>
    <div className="project-content">
      <h3 className="home-title">{title}</h3>
      <p className="home-description">{description}</p>
    </div>
  </motion.div>
);

const About = () => (
  <motion.div 
    {...pageTransition}
    className="projects-grid"
  >
    <h2 className="home-title">About Me</h2>
    <div className="projects-grid">
      <AboutCard
        title="I find great joy in solving problems for others."
        description="Passionate about creating intuitive and impactful digital experiences."
      />
      <AboutCard
        title="I have a passion for human-centered design."
        description="Focusing on creating solutions that truly serve user needs."
      />
      <AboutCard
        title="I excel at spotting new opportunities."
        description="Always looking for innovative ways to solve design challenges."
      />
    </div>
  </motion.div>
);

const AboutCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="project-card"
  >
    <div className="project-content">
      <h3 className="home-title">{title}</h3>
      <p className="home-description">{description}</p>
    </div>
  </motion.div>
);

const Contact = () => (
  <motion.div 
    {...pageTransition}
    className="contact-form"
  >
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
  </motion.div>
);

export default App;
