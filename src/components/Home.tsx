import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { pageTransition } from '../utils/animations';
import PasswordModal from './PasswordModal';

const projects = [
  {
    id: 'dialogic',
    title: "Dialogic Framework",
    image: "/images/Framework.png",
    locked: true,
  },
  {
    id: 'p',
    title: "InnerPeace",
    image: "/images/project-p.jpg",
    locked: true,
  },
  {
    id: 'one',
    title: "Hitch'n Farm",
    image: "/images/project-one.jpg",
    locked: true,
  },
];

export const Home = () => {
  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  const handleLockedClick = (projectId: string) => {
    setCurrentProject(projectId);
    setShowModal(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (password === 'uoa') {
      if (currentProject) {
        setUnlockedProjects(prev => [...prev, currentProject]);
      }
      setShowModal(false);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <motion.div {...pageTransition}>
      <section className="home-container">
        <div className="home-text">
          <h1 className="home-title">Rongze is an innovative UX Designer and Developer base in London.</h1>
          <p className="home-description">I find great joy in solving problems for others.</p>
          <Link to="/portfolio" className="portfolio-link">View portfolio</Link>
        </div>
        <div className="profile-image">
          <img src="/images/profile.jpg" alt="Profile" />
        </div>
      </section>

      <section id="projects" className="section-container">
        <h2 className="home-title">Projects</h2>
        <div className="projects-grid">
          {projects.map(project => {
            if (project.locked && !unlockedProjects.includes(project.id)) {
              return (
                <div
                  key={project.id}
                  onClick={() => handleLockedClick(project.id)}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    isLocked={true}
                  />
                </div>
              );
            } else {
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    isLocked={false}
                  />
                </Link>
              );
            }
          })}
        </div>
      </section>

      <section id="contact" className="section-container">
        <div className="contact-section">
          <h2 className="home-title">Contact</h2>
          <a href="mailto:rongze.work@gmail.com" className="contact-link">
            rongze.work@gmail.com
          </a>
        </div>
      </section>

      {showModal && (
        <PasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
};