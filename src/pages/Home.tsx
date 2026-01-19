// src/components/Home.tsx

import { motion } from 'framer-motion';
import { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pageTransition } from '../utils/animations';
import { ProjectCard } from '../components/ProjectCard';
import { useNotification } from '../components/NotificationContext';

import './Home.css';

const projectsData = [
  {
    id: "ivy-j-studio",
    image: "/assets/images/ivy-j/project-card.webp",
  },
  {
    id: "oraweb",
    image: "/assets/images/ora-web/orawebn.webp",
  },
  // {
  //   id: "one",
  //   image: "/assets/images/innerpeace-cover.webp",
  // },
];


export const Home = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleProjectClick = (id: string, title: string) => {
    if (id === 'one') {
      showNotification(
        t('home.projects.notification.title'),
        t('home.projects.notification.description', { title })
      );
      return;
    }
    navigate(`/project/${id}`);
  };

  return (
    <motion.div {...pageTransition}>
      <main className="content-container">
        {/* --- Section 1: 个人介绍 --- */}
        <section className="intro-section">
          <div className="grid-col-left">
            <h1 className="intro-name">{t('home.intro.name')}</h1>
            <p className="intro-subtitle">{t('home.intro.subtitle')}</p>
          </div>
          <div className="grid-col-right">
            <div className="intro-text">
              <p className="intro-statement">
                {t('home.intro.statement')}
              </p>

              {/* --- 2. 修改点: 将 a 标签替换为 Link 组件，并添加 SVG 图标 --- */}
              {/* <Link to="/portfolio" className="portfolio-link">
                <span>{t('home.intro.viewPortfolio')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link> */}
            </div>
          </div>
        </section>

        {/* --- Section 2: 项目列表 --- */}
        <section className="projects-section">
          <div className="grid-col-left">
            <div className="projects-heading-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 21V9"></path>
              </svg>
              <h2 className="projects-heading">{t('home.projects.heading')}</h2>
            </div>
          </div>
          <div className="grid-col-right">
            <div className="project-list">

              {projectsData.map((project, index) => {
                const title = t(`home.projects.${project.id}.title`);
                const description = t(`home.projects.${project.id}.description`);
                const dateRaw = t(`home.projects.${project.id}.date`);
                const lastUpdated = t('home.projects.lastUpdated');
                const date = dateRaw ? `${lastUpdated} ${dateRaw}` : undefined;
                const tags = t(`home.projects.${project.id}.tags`, { returnObjects: true }) as string[];

                return (
                  <Fragment key={project.id}>
                    <div
                      className="project-card-link"
                      onClick={() => handleProjectClick(project.id, title)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleProjectClick(project.id, title);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <ProjectCard
                        title={title}
                        image={project.image}
                        description={description}
                        tags={tags}
                        date={date}
                      />
                    </div>

                    {index < projectsData.length - 1 && (
                      <hr className="project-separator" />
                    )}
                  </Fragment>
                );
              })}

            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};