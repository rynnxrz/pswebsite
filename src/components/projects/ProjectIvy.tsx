import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectP.css';
import './ProjectIvy.css';
import { ProjectHeader } from '../common/ProjectHeader/ProjectHeader';
import { DemoStage } from '../common/DemoStage/DemoStage';

import { ProjectRecommendation } from '../common/ProjectRecommendation/ProjectRecommendation';

export const ProjectIvy = () => {
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = useState('');

    const navSections = [
        { id: 'summary', title: t('ivy.section.summary') },
        { id: 'context', title: t('ivy.section.context') },
        { id: 'decisions', title: t('ivy.section.decisions') },
        { id: 'non-decisions', title: t('ivy.section.non_decisions') },
        { id: 'reflection', title: t('ivy.section.reflection') },
    ];

    const recommendedProjects = [
        {
            id: 'oraweb',
            title: t('recommendations.projects.oraweb.title'),
            description: t('recommendations.projects.oraweb.description'),
            image: '/assets/images/ora-web/Mockup.webp'
        }
    ];

    useEffect(() => {
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

        navSections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
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
                        src={`https://ivyjstudio.shipbyx.com/?lang=${i18n.language}`}
                    />
                </div>
            </div>

            <div className="project-content-wrapper">

                <ProjectHeader
                    title={t('ivy.header.title')}
                    date={t('ivy.header.date')}
                    sections={navSections}
                    activeSection={activeSection}
                    onSectionClick={scrollToSection}
                    downloadTooltip={t('ivy.header.download')}
                    copyTooltip={t('ivy.header.copy')}
                    copiedTooltip={t('ivy.header.copied')}
                />

                {/* Hero Section */}
                <section id="summary" className="project-section compact-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.summary')}</div>
                    <h2>{t('ivy.summary.headline')}</h2>
                    <h3>{t('ivy.summary.subheadline')}</h3>
                    <p>{t('ivy.summary.body')}</p>
                </section>

                <hr className="section-divider compact-divider" />

                {/* 01. Context */}
                <section id="context" className="project-section compact-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.context')}</div>
                    <h2>{t('ivy.context.title')}</h2>
                    <h3>{t('ivy.context.context_title')}</h3>
                    <p>{t('ivy.context.context_body')}</p>
                    <h3>{t('ivy.context.why_title')}</h3>
                    <p>{t('ivy.context.why_body')}</p>
                    <h3>{t('ivy.context.impact_title')}</h3>
                    <table className="ivy-decision-table">
                        <thead>
                            <tr>
                                <th>{t('ivy.context.table.headers.user_type')}</th>
                                <th>{t('ivy.context.table.headers.key_pain_point')}</th>
                                <th>{t('ivy.context.table.headers.time_drain')}</th>
                                <th>{t('ivy.context.table.headers.emotional_impact')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t('ivy.context.table.rows.founder.user_type')}</td>
                                <td>{t('ivy.context.table.rows.founder.key_pain_point')}</td>
                                <td>{t('ivy.context.table.rows.founder.time_drain')}</td>
                                <td>{t('ivy.context.table.rows.founder.emotional_impact')}</td>
                            </tr>
                            <tr>
                                <td>{t('ivy.context.table.rows.clients.user_type')}</td>
                                <td>{t('ivy.context.table.rows.clients.key_pain_point')}</td>
                                <td>{t('ivy.context.table.rows.clients.time_drain')}</td>
                                <td>{t('ivy.context.table.rows.clients.emotional_impact')}</td>
                            </tr>
                            <tr>
                                <td>{t('ivy.context.table.rows.stakeholders.user_type')}</td>
                                <td>{t('ivy.context.table.rows.stakeholders.key_pain_point')}</td>
                                <td>{t('ivy.context.table.rows.stakeholders.time_drain')}</td>
                                <td>{t('ivy.context.table.rows.stakeholders.emotional_impact')}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <hr className="section-divider" />

                {/* 02. Design Decisions */}
                <section id="decisions" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.decisions')}</div>
                    <h2>{t('ivy.decisions.title')}</h2>
                    {['d1', 'd2', 'd3', 'd4'].map((key) => {
                        const isDualScenario = key === 'd4';
                        const happySteps = isDualScenario
                            ? (t('ivy.decisions.d4.how.happy_steps', { returnObjects: true }) as string[])
                            : [];
                        const unhappySteps = isDualScenario
                            ? (t('ivy.decisions.d4.how.unhappy_steps', { returnObjects: true }) as string[])
                            : [];

                        return (
                            <div key={key} style={{ marginBottom: '3.5rem' }}>
                                <h3>{t(`ivy.decisions.${key}.title`)}</h3>
                                <h4>Problem</h4>
                                <p>{t(`ivy.decisions.${key}.problem`)}</p>
                                <h4>Solution</h4>
                                <p>{t(`ivy.decisions.${key}.solution`)}</p>
                                <h4>How it Works</h4>
                                {isDualScenario ? (
                                    <>
                                        <p><strong>{t('ivy.decisions.d4.how.happy_title')}</strong></p>
                                        <ol>
                                            {Array.isArray(happySteps) && happySteps.map((step) => (
                                                <li key={step}>{step}</li>
                                            ))}
                                        </ol>
                                        <p><strong>{t('ivy.decisions.d4.how.unhappy_title')}</strong></p>
                                        <ol>
                                            {Array.isArray(unhappySteps) && unhappySteps.map((step) => (
                                                <li key={step}>{step}</li>
                                            ))}
                                        </ol>
                                    </>
                                ) : (
                                    <p>{t(`ivy.decisions.${key}.how`)}</p>
                                )}
                                <h4>Design Rationale</h4>
                                <p>{t(`ivy.decisions.${key}.rationale`)}</p>
                            </div>
                        );
                    })}
                </section>

                <hr className="section-divider" />

                {/* 03. Key Non-Design Decisions */}
                <section id="non-decisions" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.non_decisions')}</div>
                    <h2>{t('ivy.non_decisions.title')}</h2>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h3>{t('ivy.non_decisions.d1.title')}</h3>
                        <p>{t('ivy.non_decisions.d1.rationale')}</p>
                    </div>
                    <div>
                        <h3>{t('ivy.non_decisions.d2.title')}</h3>
                        <p>{t('ivy.non_decisions.d2.rationale')}</p>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* 04. Reflection */}
                <section id="reflection" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.reflection')}</div>
                    <div className="ivy-statement-card" style={{ background: 'transparent', textAlign: 'left', padding: '0' }}>
                        <h2>{t('ivy.reflection.title')}</h2>
                        <p>{t('ivy.reflection.body')}</p>
                        <p><em>{t('ivy.reflection.note')}</em></p>
                    </div>
                </section>

                <hr className="section-divider" />

                <ProjectRecommendation projects={recommendedProjects} />

            </div>
        </motion.div>
    );
};
