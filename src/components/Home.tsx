// src/components/Home.tsx

import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { Link } from 'react-router-dom'; // --- 1. 引入 Link 组件 ---
import { pageTransition } from '../utils/animations';
import { ProjectCard } from './ProjectCard';
import { useNotification } from './NotificationContext';
import './Home.css';

const projectsData = [
  {
    title: "Ora Web",
    image: "/assets/images/ora-web-cover.png",
    description: "We increased factory management efficiency by integrating contract and production data into a simple ERP tool.",
    tags: ["ERP System", "Service Design", "Product Assistant"],
  },
  {
    title: "Innerpeace",
    image: "/assets/images/innerpeace-cover.png",
    description: "We created a low-cost mental health app for students, optimized to run on affordable Android devices, enabling large-scale testing with a research database and delivering accessible stress-relief at scale.",
    tags: ["UX Research", "Android App", "Scalable"],
  },
];


export const Home = () => {
  const { showNotification } = useNotification();

  const handleProjectClick = () => {
    showNotification('vibe coding in progress  — stay tuned!');
  };

  return (
    <motion.div {...pageTransition}>
      <main className="content-container">
        {/* --- Section 1: 个人介绍 --- */}
        <section className="intro-section">
          <div className="grid-col-left">
            <h1 className="intro-name">rongze xu</h1>
            <p className="intro-subtitle">product designer & developer</p>
          </div>
          <div className="grid-col-right">
            <div className="intro-text">
              <p className="intro-statement">
                rongze is an innovative product designer and developer based in london.
              </p>
              
              {/* --- 2. 修改点: 将 a 标签替换为 Link 组件，并添加 SVG 图标 --- */}
              <Link to="/portfolio" className="portfolio-link">
                <span>view portfolio</span>
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
              </Link>
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
              <h2 className="projects-heading">projects</h2>
            </div>
          </div>
          <div className="grid-col-right">
            <div className="project-list">
              
              {projectsData.map((project, index) => (
                <Fragment key={project.title}>
                  <div className="project-card-link" onClick={handleProjectClick}>
                    <ProjectCard 
                      title={project.title} 
                      image={project.image}
                      description={project.description}
                      tags={project.tags}
                    />
                  </div>
                  
                  {index < projectsData.length - 1 && (
                    <hr className="project-separator" />
                  )}
                </Fragment>
              ))}

            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};