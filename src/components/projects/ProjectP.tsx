import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './ProjectP.css';
import { DemoStage } from '../common/DemoStage/DemoStage';
import { ProjectHeader } from '../common/ProjectHeader/ProjectHeader';
import { UserStakeholdersGraph } from './UserStakeholdersGraph';
import { DesignMoves } from './DesignMoves';
import { UserVoiceQuotes } from './UserVoiceQuotes';
import { WorkloadAnalysisGraph } from './WorkloadAnalysisGraph';
import { ProjectRecommendation } from '../common/ProjectRecommendation/ProjectRecommendation';

import '../Tooltip.css';

export const ProjectP = () => {
  const { t, i18n } = useTranslation();
  const [activeQuoteFilter, setActiveQuoteFilter] = useState<string | null>(null);
  // const { showNotification } = useNotification();

  // State
  const [activeSection, setActiveSection] = useState('');

  // Section definitions for Navigation
  // Adjusted to match new content hierarchy
  const navSections = [
    { id: 'summary', title: t('project_p.nav.summary') },
    { id: 'problem', title: t('project_p.nav.problem') },
    { id: 'decisions', title: t('project_p.nav.decisions') },
    { id: 'reflection', title: t('project_p.nav.reflection') },
  ];

  // IDs that belong to the summary/problem area if we want to group them, but they are distinct now.
  // For scrolling logic, we can keep it simple.
  const recommendedProjects = [
    {
      id: 'ivy-j-studio',
      title: t('recommendations.projects.ivy-j-studio.title'),
      description: t('recommendations.projects.ivy-j-studio.description'),
      image: '/assets/images/ivy-j/project-card.webp'
    }
  ];

  useEffect(() => {
    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -50% 0px' }
    );

    const observableIds = ['summary', 'problem', 'decisions', 'reflection'];
    observableIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div {...pageTransition} className="project-detail-container">
      {/* Hero Demo Stage - Breakout Layout */}
      <div className="bleed">
        <div className="bleedInner">
          <DemoStage
            title="Live Prototype"
            src={`https://ora.shipbyx.com/?lang=${i18n.language}`}
            preload
          />
        </div>
      </div>

      <div className="project-content-wrapper">

        <ProjectHeader
          title={t('project_p.header.title')}
          date={t('project_p.header.date')}
          sections={navSections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          downloadTooltip={t('project.tooltips.download')}
          copyTooltip={t('project.tooltips.copy')}
          copiedTooltip={t('project.tooltips.copied')}
        />

        {/* 1. Summary Section */}
        <section id="summary" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.summary')}</div>
          <h2>{t('project_p.summary.title')}</h2>
          <p className="summary-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{t('project_p.summary.subtitle')}</p>


          <div className="summary-body">
            {/* Points moved to subtitle */}
          </div>



        </section>

        <hr className="section-divider" />

        {/* 2. Context & Problem */}
        <section id="problem" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.problem')}</div>
          <h2>{t('project_p.problem.title')}</h2>

          <div className="problem-grid">
            <div className="problem-item">
              <h3>{t('project_p.problem.context.title')}</h3>
              <p>{t('project_p.problem.context.body')}</p>
            </div>
            <div className="problem-item">
              <h3>{t('project_p.problem.broken_decision.title')}</h3>
              <p>{t('project_p.problem.broken_decision.body')}</p>
              <WorkloadAnalysisGraph />
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>{t('project_p.problem.impact.title')}</h3>
            <p>{t('project_p.problem.impact.body')}</p>
          </div>

          <div className="research-subsection">
            {/* Reusing existing Evidence components here */}
            {/* The WorkloadAnalysisGraph was part of the research findings, keeping it if relevant, or maybe remove if not mentioned in new copy? 
                The user specifically asked for 'Who are the Users Behind the Data', which is UserStakeholdersGraph.
                I will comment out WorkloadAnalysisGraph for now as it's not explicitly requested in the new flow "How This Affected Different Teams" -> "Below place the Who are the Users...".
             */}
            {/* <WorkloadAnalysisGraph /> */}
            <div className="research-interactive-wrapper">
              <UserStakeholdersGraph onFilterChange={setActiveQuoteFilter} />
              <UserVoiceQuotes filterTag={activeQuoteFilter} />
            </div>
          </div>
        </section>

        <hr className="section-divider" />


        {/* 3. Decisions */}
        <section id="decisions" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.decisions')}</div>
          <h2>{t('project_p.decisions.title')}</h2>

          <DesignMoves />

        </section>

        <hr className="section-divider" />

        {/* 4. Reflection */}
        <section id="reflection" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.reflection')}</div>
          <h2>{t('project_p.reflection.title')}</h2>
          <p>{t('project_p.reflection.body')}</p>
        </section>

        <hr className="section-divider" />

        {/* Back to Demo Hint */}
        <div className="back-to-demo-hint">
          <div className="back-to-demo-row">
            <button
              type="button"
              className="back-to-demo-button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={t('project.backToDemo.hint')}
            >
              {t('project.backToDemo.hint')}
            </button>
            <span className="project-update-widget" aria-label="Latest update">
              <span className="update-indicator" aria-hidden="true" />
              <span className="update-text">{t('project.backToDemo.oraUpdate')}</span>
            </span>
          </div>
        </div>

        <ProjectRecommendation projects={recommendedProjects} />

      </div>
    </motion.div>
  );
};
