// src/components/About.tsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageTransition } from '../utils/animations';
import './About.css';

const experienceData = [
  { role: 'Product Designer', company: 'OraNutrition Ltd.', period: 'Jul 2023 - Dec 2023' },
  { role: 'UX Designer', company: 'Avatr Technology Ltd.', period: 'Jan 2024 - Mar 2024' },
  { role: 'Research Intern', company: 'Tsinghua University - ANTA Group', period: 'Mar 2024 - Aug 2024' }
];

const educationData = [
  { degree: 'Master of Research, Design', institution: 'Royal College of Art', period: 'Sep 2024 - Jul 2025' },
  { degree: 'Bachelor of Computer Science', institution: 'University of Auckland', period: 'Jan 2020 - May 2024' }
];

export const About = () => {
  return (
    <motion.div {...pageTransition} className="main-content-container-about">
      
      <section className="intro-section-about">
        <div className="grid-col-left-about">
          <h1 className="about-name">rongze xu</h1>
          <p className="about-subtitle">product designer & developer</p>
        </div>
        <div className="grid-col-right-about">
          <p className="about-bio">
            an innovative product designer and developer based in London.
          </p>
          <Link to="/portfolio" className="about-link">
            <span>view portfolio</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </Link>
        </div>
      </section>

      <section className="details-section-about">
        {/* Experience */}
        <div className="grid-col-left-about">
          <div className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <h3>experience</h3>
          </div>
        </div>
        <div className="grid-col-right-about">
          <div className="list-container">
            {experienceData.map((item) => (
              <div className="list-item" key={item.company}>
                <div className="item-main"><p className="item-title">{item.role}</p><p className="item-subtitle">{item.company}</p></div>
                <p className="item-period">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Separator Row 1 */}
        <div className="grid-col-left-about"></div>
        <div className="grid-col-right-about"><hr className="project-separator"/></div>

        {/* Education */}
        <div className="grid-col-left-about">
          <div className="section-title">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"></path></svg>
            <h3>education</h3>
          </div>
        </div>
        <div className="grid-col-right-about">
          <div className="list-container">
            {educationData.map((item) => (
              <div className="list-item" key={item.institution}>
                <div className="item-main"><p className="item-title">{item.degree}</p><p className="item-subtitle">{item.institution}</p></div>
                <p className="item-period">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Separator Row 2 */}
        <div className="grid-col-left-about"></div>
        <div className="grid-col-right-about"><hr className="project-separator"/></div>
        
        {/* Skills */}
        <div className="grid-col-left-about">
           <div className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <h3>skills</h3>
          </div>
        </div>
        <div className="grid-col-right-about">
          <div className="list-container">
              <div className="skills-item"><p className="item-title">UX Research & Design</p><p className="item-subtitle">Workshop Facilitation, User-Centered Design, Prototyping, Design Systems, Figma.</p></div>
              <div className="skills-item"><p className="item-title">Technical</p><p className="item-subtitle">Python, SQL, HTML/CSS, JavaScript, Kotlin, Three.js.</p></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};