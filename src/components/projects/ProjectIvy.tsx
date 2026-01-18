import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectP.css';
import './ProjectIvy.css';
import { ProjectHeader } from '../common/ProjectHeader/ProjectHeader';
import { DemoStage } from '../common/DemoStage/DemoStage';

import { ProjectRecommendation } from '../common/ProjectRecommendation/ProjectRecommendation';
import { DesignMoves, type DesignMove } from './DesignMoves';


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
    const decisionLabels = t('project.labels', { returnObjects: true }) as { problem: string; solution: string; how: string; rationale: string };

    const decisionMoves: DesignMove[] = ['d1', 'd2', 'd3', 'd4'].map((key) => {
        const howData = t(`ivy.decisions.${key}.how`, { returnObjects: true }) as any;
        let howContent: React.ReactNode;

        if (typeof howData === 'string') {
            howContent = howData;
        } else if (howData?.table) {
            howContent = (
                <div className="ivy-stakeholder-table-wrapper">
                    <table className="ivy-decision-table ivy-workflow-table">
                        <thead>
                            <tr>
                                <th>Stage</th>
                                <th>Client Receives</th>
                                <th>Ivy J Studio Receives</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(howData.table) && howData.table.map((row: any, i: number) => (
                                <tr key={i}>
                                    <td>{row.stage}</td>
                                    <td>{row.client}</td>
                                    <td>{row.ivy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (howData?.steps) {
            howContent = (
                <ol>
                    {Array.isArray(howData.steps) && howData.steps.map((step: string, i: number) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                    ))}
                </ol>
            );
        } else if (howData?.happy_steps) {
            // Fallback for old structure if needed or if translation matches old format
            const happySteps = howData.happy_steps;
            const unhappySteps = howData.unhappy_steps;
            howContent = (
                <div>
                    <p><strong>{howData.happy_title}</strong></p>
                    <ol>
                        {Array.isArray(happySteps) && happySteps.map((step: string) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                    <p><strong>{howData.unhappy_title}</strong></p>
                    <ol>
                        {Array.isArray(unhappySteps) && unhappySteps.map((step: string) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </div>
            );
        } else {
            howContent = null;
        }

        return {
            id: key,
            headline: t(`ivy.decisions.${key}.title`),
            problem: { title: decisionLabels.problem, body: t(`ivy.decisions.${key}.problem`) },
            solution: { title: decisionLabels.solution, body: t(`ivy.decisions.${key}.solution`) },
            how_it_works: { title: decisionLabels.how, body: howContent },
            rationale: { title: decisionLabels.rationale, body: t(`ivy.decisions.${key}.rationale`) }
        };
    });
    const decisionTabs = decisionMoves.map((move) => ({
        id: move.id,
        title: move.headline,
        subtitle: ''
    }));

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
                        preload
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
                    downloadTooltip={t('project.tooltips.download')}
                    copyTooltip={t('project.tooltips.copy')}
                    copiedTooltip={t('project.tooltips.copied')}
                />

                {/* Hero Section */}
                <section id="summary" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.summary')}</div>
                    <h2>{t('ivy.summary.title')}</h2>
                    <p className="summary-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{t('ivy.summary.subtitle')}</p>
                </section>

                <hr className="section-divider compact-divider" />

                {/* 01. Context */}
                <section id="context" className="project-section compact-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.context')}</div>
                    <h2>{t('ivy.context.title')}</h2>
                    <blockquote className="ivy-quote">{t('ivy.context.quote')}</blockquote>
                    <p>{t('ivy.context.context_body')}</p>
                    <h3>{t('ivy.context.pain_title')}</h3>
                    <ul className="ivy-pain-list">
                        {(t('ivy.context.pain_points', { returnObjects: true }) as string[]).map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </section>

                <hr className="section-divider" />

                {/* 02. Design Decisions */}
                <section id="decisions" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.decisions')}</div>
                    <h2>{t('ivy.decisions.title')}</h2>
                    <DesignMoves
                        moves={decisionMoves}
                        tabs={decisionTabs}
                        imageMap={{
                            d1: '/assets/images/ivy-j/videoloop/01.mp4',
                            d2: '/assets/images/ivy-j/videoloop/03.mp4',
                            d3: '/assets/images/ivy-j/videoloop/04.mp4',
                            d4: '/assets/images/ivy-j/videoloop/05.mp4'
                        }}
                    />
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

                    <h2>{t('ivy.reflection.title')}</h2>

                    {(() => {
                        const content = t('ivy.reflection.content', { returnObjects: true });
                        if (Array.isArray(content)) {
                            return content.map((item: any, index: number) => (
                                <div key={index} className="ivy-statement-card" style={{ background: 'transparent', textAlign: 'left', padding: '0', marginBottom: '2rem' }}>
                                    <h3>{item.heading}</h3>
                                    <p>{item.body}</p>
                                </div>
                            ));
                        } else {
                            // Fallback
                            return (
                                <div className="ivy-statement-card" style={{ background: 'transparent', textAlign: 'left', padding: '0' }}>
                                    <p>{t('ivy.reflection.body')}</p>
                                    <p><em>{t('ivy.reflection.note')}</em></p>
                                </div>
                            );
                        }
                    })()}
                </section>

                <hr className="section-divider" />

                <ProjectRecommendation projects={recommendedProjects} />

            </div>
        </motion.div>
    );
};
