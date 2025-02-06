// force update test
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  image: string;
  isLocked?: boolean;
}

export const ProjectCard = ({ title, image, isLocked }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className={`project-card ${isLocked ? 'is-locked' : ''}`}
  >
    <div className="project-image">
      <img src={image} alt={title} />
      {isLocked && (
        <motion.div
          className="lock-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.svg
            className="lock-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 1 0-8 0v2"/>
          </motion.svg>
          <span className="lock-text">In Progress</span>
          <div className="tooltip">Available after portfolio completion</div>
        </motion.div>
      )}
    </div>
    <h3 className="project-title">{title}</h3>
  </motion.div>
);
