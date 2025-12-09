
// ProjectP.tsx
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { Download, Check, Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNotification } from '../NotificationContext';

import './ProjectP.css';
import { WorkloadAnalysisGraph } from './WorkloadAnalysisGraph';
import { StackedGallery } from '../common/StackedGallery/StackedGallery';
import { JourneyMap } from './JourneyMap';
import { UserScopeList } from './UserScopeList';
import '../Tooltip.css';

export const ProjectP = () => {
  const { t, i18n } = useTranslation();
  // const { showNotification } = useNotification();

  // State

  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  // Section definitions (kept for future use if navigator is restored)
  const sections = [
    { id: 'intro', title: 'Intro' },
    { id: 'team', title: 'Team & My Role' },
    { id: 'scope', title: 'User Scope' },
    { id: 'rationale', title: 'Project Rationale' },
    { id: 'research', title: 'Research Findings' },
    { id: 'choices', title: 'Key Design Choices' },
    { id: 'excellence', title: 'Unique Excellence' },
    { id: 'reflection', title: 'Reflection' },
  ];



  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

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

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [sections]);

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

  const activeSectionTitle = sections.find(s => s.id === activeSection)?.title;

  return (
    <motion.div {...pageTransition} className="project-detail-container">
      <div className="project-content-wrapper">

        {/* Sticky Header */}
        <header className={`project-header ${isScrolled ? 'sticky-active' : ''}`}>
          <div className="project-header-text-container">
            <div className={`header-main-info ${isScrolled && activeSection ? 'scrolled-mode' : ''}`}>
              {/* 
                 When scrolled, we might want to hide the big title and show section nav. 
                 For now, keeping it simple as per original design or the verified behavior.
                 If checking ProjectP.css, .header-main-info.scrolled-mode exists.
               */}
              <h1 className="project-title" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t('project_p.header.title')}
              </h1>

              {!isScrolled ? (
                <span className="project-date">{t('project_p.header.date')}</span>
              ) : (
                <div className="section-navigator">
                  <span className="divider">/</span>
                  <span className="active-section-name">{activeSectionTitle || 'Intro'}</span>

                  {/* Dropdown Menu */}
                  <div className="section-dropdown">
                    {sections.map(section => (
                      <div
                        key={section.id}
                        className={`dropdown-item ${activeSection === section.id ? 'active' : ''}`}
                        onClick={(e) => scrollToSection(section.id, e)}
                      >
                        {section.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons-container">
            <div className="tooltip-container">
              <a href="/assets/portfolio_small.pdf" download className="action-btn">
                <Download size={16} />
              </a>
              <span className="tooltip-text">{t('project_p.header.download')}</span>
            </div>

            <div className="tooltip-container">
              <button onClick={handleCopyLink} className="action-btn">
                {copied ? <Check size={16} /> : <LinkIcon size={16} />}
              </button>
              <span className="tooltip-text">
                {copied ? t('project_p.header.copied') : t('project_p.header.copy')}
              </span>
            </div>
          </div>
        </header>

        {/* 2. Intro Section */}
        <section id="intro" className="project-section">
          <h2>{t('project_p.intro.title')}</h2>
          <p className="intro-text">
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

        <hr className="section-divider" />

        {/* 3. Team & My Role */}
        <section id="team" className="project-section">
          <h2>{t('project_p.team.title')}</h2>
          <div className="role-grid">
            <div className="role-card">
              <h3>{t('project_p.team.client')}</h3>
              <p><strong>{t('project_p.team.clientDesc')}</strong></p>
              <ul>
                {(t('project_p.team.clientPoints', { returnObjects: true }) as string[]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="context-note">{t('project_p.team.context')}</p>
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
          </div>

        </section>

        <hr className="section-divider" />

        {/* 4. User Scope */}
        <section id="scope" className="project-section">
          <h2>{t('project_p.scope.title')}</h2>
          <p className="intro-text">{t('project_p.scope.content')}</p>
          {/* New User Journey Graph replaces the old list and image */}
          <UserScopeList />
        </section>

        <hr className="section-divider" />

        {/* 5. Project Rationale */}
        <section id="rationale" className="project-section">
          <h2>{t('project_p.rationale.title')}</h2>
          <div className="rationale-block">
            <h3>{t('project_p.rationale.subtitle')}</h3>
            <blockquote className="project-quote">
              {t('project_p.rationale.quote')}
            </blockquote>
          </div>

        </section>

        <hr className="section-divider" />

        {/* 6. Research Findings */}
        <section id="research" className="project-section">
          <h2>{t('project_p.research.title')}</h2>

          <div className="research-subsection">
            <h3>{t('project_p.research.subtitle1')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('project_p.research.content1') }} />

            <div className="insight-box">
              <h4>{t('project_p.research.insights')}</h4>
              <ul>
                {(t('project_p.research.points1', { returnObjects: true }) as string[]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <WorkloadAnalysisGraph />

          <div className="research-subsection">
            <h3>{t('project_p.research.subtitle2')}</h3>
            <p>{t('project_p.research.content2')}</p>
            <ul className="plain-list">
              {(t('project_p.research.points2', { returnObjects: true }) as string[]).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="research-subsection highlight-bg">
            <h3>{t('project_p.research.subtitle3')}</h3>
            <p>{t('project_p.research.content3')}</p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* 7. Key Design Choices */}
        <section id="choices" className="project-section">
          <h2>{t('project_p.choices.title')}</h2>
          <h3>{t('project_p.choices.subtitle')}</h3>

          <p className="whitespace-pre-line mb-8 font-medium text-gray-300 text-lg">
            {t('project_p.choices.intro')}
          </p>

          <JourneyMap />
        </section>

        <hr className="section-divider" />

        {/* 8. Unique Excellence */}
        <section id="excellence" className="project-section">
          <h2>{t('project_p.excellence.title')}</h2>
          <h3>{t('project_p.excellence.subtitle')}</h3>

          <div className="excellence-block">
            <h4>{t('project_p.excellence.section1.title')}</h4>
            <p>{t('project_p.excellence.section1.content')}</p>
            <ul>
              {(t('project_p.excellence.section1.list', { returnObjects: true }) as string[]).map((point, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>

            {/* Stacked Cards for Unified Experience */}
            <StackedGallery
              defaultImage="/assets/images/ora-web/stacked-card-1.png"
              images={[
                { id: 1, src: '/assets/images/ora-web/stacked-card-1.png', alt: 'Unified View 1' },
                { id: 2, src: '/assets/images/ora-web/stacked-card-2.png', alt: 'Unified View 2' }
              ]}
            />

            <p>{t('project_p.excellence.section1.content2')}</p>
            <ul>
              {(t('project_p.excellence.section1.points', { returnObjects: true }) as string[]).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p>{t('project_p.excellence.section1.content3')}</p>
          </div>

          <div className="excellence-block">
            <h4>{t('project_p.excellence.section2.title')}</h4>
            <p>{t('project_p.excellence.section2.content')}</p>
            <ul>
              {(t('project_p.excellence.section2.list', { returnObjects: true }) as string[]).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p>{t('project_p.excellence.section2.content2')}</p>
            <p>{t('project_p.excellence.section2.content3')}</p>
            <ul>
              {(t('project_p.excellence.section2.points', { returnObjects: true }) as string[]).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p className="final-note">
              {t('project_p.excellence.section2.content4')}
            </p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* 9. Reflection */}
        <section id="reflection" className="project-section">
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
