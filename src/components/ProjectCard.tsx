// force update test
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

export const ProjectCard = ({ title, description, image }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="project-card"
  >
    <div className="project-image">
      <img src={image} alt={title} />
    </div>
    <h3 className="project-title">{title}</h3>
    {/* Render the description */}
    <p className="project-description">{description}</p>
  </motion.div>
);
