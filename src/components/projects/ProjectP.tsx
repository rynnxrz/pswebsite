import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNotification } from '../NotificationContext';

import './ProjectP.css';
import { WorkloadAnalysisGraph } from './WorkloadAnalysisGraph';
import { StackedGallery } from '../common/StackedGallery/StackedGallery';
import { HorizontalScrollContainer } from '../common/HorizontalScrollContainer/HorizontalScrollContainer';
import { ProjectHeader } from '../common/ProjectHeader/ProjectHeader';
import { DesignMoves } from './DesignMoves';
import { UserScopeList } from './UserScopeList';
import { UserStakeholdersGraph } from './UserStakeholdersGraph';
import { UserVoiceQuotes } from './UserVoiceQuotes';
import '../Tooltip.css';

export const ProjectP = () => {
  const { t, i18n } = useTranslation();
  const [activeQuoteFilter, setActiveQuoteFilter] = useState<string | null>(null);
  // const { showNotification } = useNotification();

  // State
  const [activeSection, setActiveSection] = useState('');

  // Section definitions for Navigation
  // Grouping intro, team, scope, rationale under "Project Info"
  const navSections = [
    { id: 'intro', title: 'Project Info' },
    { id: 'research', title: 'Research Findings' },
    { id: 'choices', title: 'Key Design Choices' },
    { id: 'reflection', title: 'Reflection' },
  ];

  // IDs that belong to "Project Info"
  const projectInfoIds = ['intro', 'team', 'scope', 'rationale'];

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
      { threshold: 0, rootMargin: '-20% 0px -60% 0px' }
    );

    // Observe all sections including the ones grouped under Project Info
    const observableIds = [...projectInfoIds, 'research', 'choices', 'reflection'];
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

  // Determine which nav ID should be active based on the currently intersecting section
  const headerActiveSection = projectInfoIds.includes(activeSection) ? 'intro' : activeSection;

  return (
    <motion.div {...pageTransition} className="project-detail-container">
      <div className="project-content-wrapper">

        <ProjectHeader
          title={t('project_p.header.title')}
          date={t('project_p.header.date')}
          sections={navSections}
          activeSection={headerActiveSection}
          onSectionClick={scrollToSection}
          downloadTooltip={t('project_p.header.download')}
          copyTooltip={t('project_p.header.copy')}
          copiedTooltip={t('project_p.header.copied')}
        />

        {/* 2. Intro Section */}
        <section id="intro" className="project-section compact-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.project_info')}</div>

          <p className="project-description">
            {t('project_p.intro.content')}
          </p>
          <StackedGallery
            defaultImage="/assets/images/ora-web/Mockup.png"
            images={[
              {
                id: 'dashboard-mockup',
                src: '/assets/images/ora-web/Mockup.png',
                alt: 'Dashboard Mockup'
              },
              {
                id: 'dashboard-interactive',
                src: '/assets/images/ora-web/dashboard-mockup.png',
                alt: 'Interactive Dashboard Preview',
                interactiveSrc: `/dashboard_refactor.html?lang=${i18n.language}`
              },
              { id: 'factory-photo', src: '/assets/images/ora-web/intro-placeholder.png', alt: 'Factory Context' }
            ]}
          />
        </section>

        <hr className="section-divider compact-divider" />

        {/* 3. Team & My Role */}
        <section id="team" className="project-section compact-section">
          <h2>{t('project_p.team.title')}</h2>
          <HorizontalScrollContainer className="role-grid">
            <div className="role-card">
              <h3>{t('project_p.team.client')}</h3>
              <p><strong>{t('project_p.team.clientDesc')}</strong></p>
              <ul>
                {(t('project_p.team.clientPoints', { returnObjects: true }) as string[]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="context-note" dangerouslySetInnerHTML={{ __html: t('project_p.team.context') }} />
            </div>
            <div className="role-card">
              <h3>{t('project_p.team.role')}</h3>
              <p><strong>{t('project_p.team.roleDesc')}</strong></p>
              <ul>
                {(t('project_p.team.rolePoints', { returnObjects: true }) as string[]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="role-card highlight">
              <h3>{t('project_p.team.duration')}</h3>
              <p>{t('project_p.team.durationDesc')}</p>
            </div>
          </HorizontalScrollContainer>

        </section>

        <hr className="section-divider compact-divider" />

        {/* 4. User Scope */}
        <section id="scope" className="project-section compact-section">
          <h2>{t('project_p.scope.title')}</h2>
          <p className="intro-text">{t('project_p.scope.content')}</p>
          {/* New User Journey Graph replaces the old list and image */}
          <UserScopeList />
        </section>

        <hr className="section-divider compact-divider" />

        {/* 5. Project Rationale */}
        <section id="rationale" className="project-section compact-section">
          <h2>{t('project_p.rationale.title')}</h2>
          <div className="rationale-block">
            <blockquote
              className="project-quote"
              dangerouslySetInnerHTML={{ __html: t('project_p.rationale.quote') }}
            />
          </div>

        </section>

        <hr className="section-divider" />

        {/* 6. Research Findings */}
        <section id="research" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.research_findings')}</div>
          <h2>{t('project_p.research.title')}</h2>

          <div className="research-subsection">
            <p dangerouslySetInnerHTML={{ __html: t('project_p.research.content1') }} />


          </div>

          <WorkloadAnalysisGraph />

          <div className="research-interactive-wrapper">
            <UserStakeholdersGraph onFilterChange={setActiveQuoteFilter} />
            <UserVoiceQuotes filterTag={activeQuoteFilter} />
          </div>
        </section>

        <hr className="section-divider" />

        {/* 7. Key Design Choices */}
        <section id="choices" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.key_design_choices')}</div>
          <h2>{t('project_p.choices.title')}</h2>

          <DesignMoves />

        </section>

        <hr className="section-divider" />

        {/* 9. Reflection */}
        <section id="reflection" className="project-section">
          <div className="typo-eyebrow" style={{ marginBottom: '0.5rem' }}>{t('project_p.section.reflection')}</div>
          <h2>{t('project_p.reflection.title')}</h2>
          <h3>{t('project_p.reflection.subtitle')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('project_p.reflection.content') }} />
          <ul>
            {(t('project_p.reflection.list', { returnObjects: true }) as string[]).map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
          <StackedGallery images={[{ id: 'reflection-kano', src: '/assets/images/ora-web/reflection-placeholder.png', alt: 'Kano Model Reflection' }]} />
          <p>{t('project_p.reflection.content2')}</p>
          <ul>
            {(t('project_p.reflection.points', { returnObjects: true }) as string[]).map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
          <p className="reflection-footer">
            {t('project_p.reflection.content3')}
          </p>
        </section>

      </div>
    </motion.div>
  );
};
