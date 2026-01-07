
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectP.css'; // Reusing base styles
import './ProjectIvy.css'; // Custom styles
import { ProjectHeader } from '../common/ProjectHeader/ProjectHeader';
import { StackedGallery } from '../common/StackedGallery/StackedGallery';

import { AttentionChart } from './AttentionChart/AttentionChart';

export const ProjectIvy = () => {
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = useState('');

    const navSections = [
        { id: 'intro', title: 'Overview' },
        { id: 'context', title: 'Context' },
        { id: 'cost', title: 'The Real Cost' },
        { id: 'target', title: 'Design Target' },
        { id: 'decisions', title: 'Key Decisions' },
        { id: 'system', title: 'The System' },
        { id: 'ai', title: 'AI Capability' },
        { id: 'outcome', title: 'Outcome' },
        { id: 'reflection', title: 'Reflection' },
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
                <section id="intro" className="project-section compact-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.overview')}</div>

                    <p className="project-description" dangerouslySetInnerHTML={{ __html: t('ivy.intro.title') }} />

                    <StackedGallery
                        priority={true}
                        defaultImage="/assets/images/ivy-j/hero-main.webp"
                        images={[
                            {
                                id: 'hero-main',
                                src: '/assets/images/ivy-j/hero-main.webp',
                                srcSet: '/assets/images/ivy-j/hero-main-mobile.webp 800w, /assets/images/ivy-j/hero-main.webp 2560w',
                                sizes: '(max-width: 768px) 100vw, 80vw',
                                thumbnailSrc: '/assets/images/ivy-j/hero-main-thumb.webp',
                                alt: 'Ivy J Studio System Interface',
                                interactiveSrc: `https://ivyjstudio.shipbyx.com/?lang=${i18n.language}`,
                                deferInteraction: true
                            }
                        ]}
                    />
                </section>

                <hr className="section-divider compact-divider" />

                {/* 01. Context */}
                <section id="context" className="project-section compact-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.context')}</div>
                    <h3>{t('ivy.context.title')}</h3>
                    <p>{t('ivy.context.content')}</p>
                    <p><strong>{t('ivy.context.problem')}</strong></p>

                    <AttentionChart />
                </section>

                <hr className="section-divider" />

                {/* 02. The Real Cost */}
                <section id="cost" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.cost')}</div>
                    <h3>{t('ivy.cost.title')}</h3>

                    <div className="ivy-comparison-grid">
                        <div>
                            <h4>{t('ivy.cost.situation_a.title')}</h4>
                            <p>{t('ivy.cost.situation_a.desc')}</p>
                            <div className="ivy-flow-container">
                                <div className="ivy-flow-step">1. Request Received</div>
                                <div className="ivy-flow-step">2. Manual Stock Check</div>
                                <div className="ivy-flow-step">3. Edit Illustrator File</div>
                                <div className="ivy-flow-step">4. Export PDF</div>
                                <div className="ivy-flow-step">5. Email Reply</div>
                            </div>
                        </div>
                        <div>
                            <h4>{t('ivy.cost.situation_b.title')}</h4>
                            <p>{t('ivy.cost.situation_b.desc')}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                                <div style={{ padding: '1rem', border: '1px solid #ffcccc', background: '#fffafa', borderRadius: '6px' }}>🚨 Shipping Dispute</div>
                                <div style={{ marginLeft: '1rem', borderLeft: '2px dashed #ccc', paddingLeft: '1rem' }}>
                                    <div>🔍 Search iPhone Photos</div>
                                    <div>📸 Find Timestamp</div>
                                    <div>📧 Send Proof</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* 03. Design Target */}
                <section id="target" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.target')}</div>
                    <div className="ivy-statement-card">
                        <div className="ivy-statement-text">{t('ivy.target.statement')}</div>
                        <div style={{ color: '#666' }}>
                            <div>❌ Not just features</div>
                            <div>❌ Not just speed</div>
                            <div>✅ Attention & Judgment</div>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* 04. Key Decisions */}
                <section id="decisions" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.decisions')}</div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h3>{t('ivy.decisions.d1.title')}</h3>
                        <table className="ivy-decision-table">
                            <thead>
                                <tr>
                                    <th>Option</th>
                                    <th>Looks Complete?</th>
                                    <th>Removes Real Work?</th>
                                    <th>Long-term Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Stripe Checkout</td>
                                    <td>✅ Yes</td>
                                    <td>❌ No</td>
                                    <td>🔴 High</td>
                                </tr>
                                <tr>
                                    <td><strong>Invoice-based</strong></td>
                                    <td>✅ Yes</td>
                                    <td>✅ <strong>Yes</strong></td>
                                    <td>🟢 Low</td>
                                </tr>
                            </tbody>
                        </table>
                        <p><em>{t('ivy.decisions.d1.why')}</em></p>
                        <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
                            <strong>Decision:</strong> {t('ivy.decisions.d1.decision')}
                        </div>
                    </div>

                    <div>
                        <h3>{t('ivy.decisions.d2.title')}</h3>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div className="ivy-chart-placeholder">
                                    {/* Simple Pie Chart Representation */}
                                    <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(#333 0% 70%, #ddd 70% 100%)' }}></div>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>⚫ System Logic (70%) ⚪ UI Polish (30%)</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p>{t('ivy.decisions.d2.why')}</p>
                                <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
                                    <strong>Decision:</strong> {t('ivy.decisions.d2.decision')}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* 05. The System */}
                <section id="system" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.system')}</div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h3>1. {t('ivy.system.p1.title')}</h3>
                        <div className="ivy-before-after">
                            <div style={{ opacity: 0.6 }}>
                                <div className="ivy-chart-placeholder">PDF Lookbook (Before)</div>
                                <ul>
                                    <li>Manual</li>
                                    <li>Static</li>
                                    <li>Rebuilt every time</li>
                                </ul>
                            </div>
                            <div>
                                <div className="ivy-chart-placeholder" style={{ border: '2px solid #000', color: '#000' }}>Live Catalog (After)</div>
                                <ul>
                                    <li><strong>Date-aware</strong></li>
                                    <li><strong>Shareable link</strong></li>
                                    <li><strong>Always current</strong></li>
                                </ul>
                            </div>
                        </div>
                        <p><strong>Result:</strong> {t('ivy.system.p1.result')}</p>
                    </div>

                    <div>
                        <h3>2. {t('ivy.system.p2.title')}</h3>
                        <div className="ivy-flow-step" style={{ justifyContent: 'center', background: 'transparent', borderLeft: 'none' }}>
                            Box Items 📦 <span className="ivy-flow-arrow">→</span> <strong style={{ border: '2px solid red', padding: '4px 8px', borderRadius: '4px', color: 'red' }}>Take Photo 📸</strong> <span className="ivy-flow-arrow">→</span> Ship 🚚 <span className="ivy-flow-arrow">→</span> Record Exists ✅
                        </div>
                        <p>{t('ivy.system.p2.content')}</p>
                        <p><strong>Result:</strong> {t('ivy.system.p2.result')}</p>
                    </div>
                </section>

                <hr className="section-divider" />

                {/* 06. AI Capability */}
                <section id="ai" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.ai')}</div>
                    <h3>{t('ivy.ai.title')}</h3>

                    <div className="ivy-statement-card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                            <div>Messy Inputs 📄</div>
                            <span className="ivy-flow-arrow">→</span>
                            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '6px' }}>AI Draft 🤖</div>
                            <span className="ivy-flow-arrow">→</span>
                            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '6px', background: '#000', color: '#fff' }}>Human Confirm 👩‍💻</div>
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}><em>{t('ivy.ai.design')}</em></p>
                    </div>
                    <p>{t('ivy.ai.content')}</p>
                </section>

                <hr className="section-divider" />

                {/* 07. Outcome */}
                <section id="outcome" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.outcome')}</div>
                    <h3>{t('ivy.outcome.title')}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '3rem auto', alignItems: 'center' }}>
                        <div style={{ textAlign: 'right', color: '#888' }}>
                            <h4>Before</h4>
                            <div>Operator</div>
                            <div>Checker</div>
                            <div>Defender</div>
                        </div>
                        <div style={{ fontSize: '2rem' }}>➡️</div>
                        <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            <h4>After</h4>
                            <div>Designer</div>
                            <div>Decision-maker</div>
                            <div>Strategist</div>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center' }}>{t('ivy.outcome.result')}</p>
                </section>

                <hr className="section-divider" />

                {/* 08. Reflection */}
                <section id="reflection" className="project-section">
                    <div className="typo-eyebrow section-eyebrow">{t('ivy.section.reflection')}</div>
                    <div className="ivy-statement-card" style={{ background: 'transparent', textAlign: 'left', padding: '0' }}>
                        <h3>{t('ivy.reflection.title')}</h3>
                        <p>{t('ivy.reflection.content')}</p>
                        <br />
                        <p><strong>{t('ivy.reflection.closing')}</strong></p>
                    </div>
                </section>

            </div>
        </motion.div>
    );
};
