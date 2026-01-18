import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useTranslation } from 'react-i18next';
import { ProjectRecommendation } from '../common/ProjectRecommendation/ProjectRecommendation';

export const ProjectOne = () => {
  const { t } = useTranslation();
  const project = {
    title: t('home.projects.one.title'),
    description: t('home.projects.one.description'),
    image: "/images/project-one.jpg"
  };
  const recommendedProjects = [
    {
      id: 'oraweb',
      title: t('recommendations.projects.oraweb.title'),
      description: t('recommendations.projects.oraweb.description'),
      image: '/assets/images/ora-web/orawebn.webp'
    }
  ];

  return (
    <motion.div {...pageTransition} className="project-detail">
      <h1 className="home-title">{project.title}</h1>
      <div className="project-detail-image">
        <img src={project.image} alt={project.title} />
      </div>
      <p className="home-description">{project.description}</p>
      <div className="project-recommendation-shell">
        <ProjectRecommendation projects={recommendedProjects} />
      </div>
    </motion.div>
  );
};
