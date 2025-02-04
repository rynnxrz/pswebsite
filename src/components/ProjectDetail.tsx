import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

export const ProjectDetail = () => {
  const { id } = useParams();
  const project = id === 'p' ? {
    title: "Project P: InnerPeace Stress Management Android Application Design",
    description: "A mobile app designed to help users manage stress and maintain mental well-being.",
    image: "/images/project-p.jpg"
  } : {
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