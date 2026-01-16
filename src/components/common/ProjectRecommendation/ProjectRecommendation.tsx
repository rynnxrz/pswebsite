import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ProjectRecommendation.css';

export interface RecommendedProject {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ProjectRecommendationProps {
  projects: RecommendedProject[];
}

export const ProjectRecommendation = ({ projects }: ProjectRecommendationProps) => {
  const { t } = useTranslation();


  return (
    <section className="project-recommendation">
      <div className="typo-eyebrow">{t('recommendations.eyebrow')}</div>
      <h2>{t('recommendations.title')}</h2>
      <div className="project-recommendation-grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="project-recommendation-card"
          >
            <div className="project-recommendation-media">
              <img
                src={project.image}
                alt={project.title}
                loading="eager"
              />
            </div>
            <div className="project-recommendation-body">
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="project-recommendation-cta">{t('recommendations.cta')}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
