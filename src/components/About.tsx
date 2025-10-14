// src/components/About.tsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageTransition } from '../utils/animations';
import './About.css'; // We will use a dedicated CSS file to avoid class conflicts

const experienceData = [
  {
    role: 'Product Designer',
    company: 'OraNutrition Ltd.',
    period: 'Jul 2023 - Dec 2023'
  },
  {
    role: 'UX Designer',
    company: 'Avatr Technology Ltd.',
    period: 'Jan 2024 - Mar 2024'
  },
  {
    role: 'Research Intern',
    company: 'Tsinghua University - ANTA Group',
    period: 'Mar 2024 - Aug 2024'
  }
];

const educationData = [
  {
    degree: 'Master of Research, Design',
    institution: 'Royal College of Art',
    period: 'Sep 2024 - Jul 2025'
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University of Auckland',
    period: 'Jan 2020 - May 2024'
  }
];

export const About = () => {
  return (
    <motion.div {...pageTransition} className="page-container">
      <div className="content-wrapper">
        
        {/* Header Section */}
        <div className="grid-left">
          <h1 className="about-name">Rongze Xu</h1>
          <p className="about-subtitle">Product Designer & Developer</p>
        </div>
        <div className="grid-right">
          <p className="about-bio">
            An innovative product designer and developer based in London, with expertise in B2B SaaS and AI-powered applications.
          </p>
          <Link to="/portfolio" className="about-link">View Portfolio</Link>
        </div>

        {/* Divider */}
        <div className="about-divider-container">
          <hr className="about-divider" />
        </div>

        {/* Experience Section */}
        <div className="grid-left">
          <div className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <h3>Experience</h3>
          </div>
        </div>
        <div className="grid-right">
          <div className="list-container">
            {experienceData.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="item-main">
                  <p className="item-title">{item.role}</p>
                  <p className="item-subtitle">{item.company}</p>
                </div>
                <p className="item-period">{item.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="grid-left">
          <div className="section-title">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"></path></svg>
            <h3>Education</h3>
          </div>
        </div>
        <div className="grid-right">
          <div className="list-container">
            {educationData.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="item-main">
                  <p className="item-title">{item.degree}</p>
                  <p className="item-subtitle">{item.institution}</p>
                </div>
                <p className="item-period">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="grid-left">
           <div className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <h3>Skills</h3>
          </div>
        </div>
        <div className="grid-right">
          <div className="list-container">
              <div className="skills-item">
                  <p className="item-title">UX Research & Design</p>
                  <p className="item-subtitle">Workshop Facilitation, User-Centered Design, Prototyping, Design Systems, Figma.</p>
              </div>
              <div className="skills-item">
                  <p className="item-title">Technical</p>
                  <p className="item-subtitle">Python, SQL, HTML/CSS, JavaScript, Kotlin, Three.js.</p>
              </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};