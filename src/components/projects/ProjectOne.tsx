import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

export const ProjectOne = () => {
  const project = {
    title: "Project One: Hitch'n Farm Bridging the Nature Gap in Cities",
    description: "An innovative solution to connect urban dwellers with nature and sustainable farming practices.",
    image: "/images/project-one.jpg"
  };

  return (
    <motion.div {...pageTransition} className="project-detail">
      <h1 className="home-title">{project.title}</h1>
      <div className="project-detail-image">
        <img src={project.image} alt={project.title} />
      </div>
      <p className="home-description">{project.description}</p>
    </motion.div>
  );
};