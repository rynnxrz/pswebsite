import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import { usePrintMode } from '../../hooks/usePrintMode';
import './DesignMoves.css';

interface DesignMove {
    id: string;
    headline: string;
    problem: { title: string; body: string };
    solution: { title: string; body: string };
    how_it_works: { title: string; body: string };
    rationale: { title: string; body: string };
    image?: {
        alt: string;
        annotation: string;
    };
}

interface Tab {
    id: string;
    title: string;
    subtitle: string;
}

export const DesignMoves = () => {
    const { t } = useTranslation();
    const isPrintMode = usePrintMode();
    const prefersReducedMotion = useReducedMotion();

    const tabs = t('project_p.design_moves.tabs', { returnObjects: true }) as Tab[];
    const moves = t('project_p.design_moves.moves', { returnObjects: true }) as DesignMove[];

    // Default to the first item open
    const [openItems, setOpenItems] = useState<string[]>(moves.length > 0 ? [moves[0].id] : []);

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Placeholder images map
    const imageMap: Record<string, string> = {
        unify: '/assets/images/ora-web/Unify.mp4',
        guide: '/assets/images/ora-web/move-guide-placeholder.png',
        reveal: '/assets/images/ora-web/move-reveal-placeholder.png'
    };

    const renderMoveContent = (move: DesignMove) => {
        const imageSrc = imageMap[move.id];
        const isVideo = imageSrc?.endsWith('.mp4');

        return (
            <div className="dm-accordion-body-content">
                {/* 1. Problem Section (Top) */}
                <div className="dm-context-card pain">
                    <h4>{move.problem.title}</h4>
                    <p>{move.problem.body}</p>
                </div>

                {/* 2. Solution Section (Middle - Stacked) */}
                <div className="dm-context-card move">
                    <h4>{move.solution.title}</h4>
                    <p>{move.solution.body}</p>
                </div>

                {/* 3. Visual Section */}
                <div className="dm-visual-section">
                    <div className="dm-image-wrapper">
                        {imageSrc && (
                            isVideo ? (
                                <video
                                    src={imageSrc}
                                    className="dm-main-image"
                                    autoPlay={!prefersReducedMotion}
                                    loop={!prefersReducedMotion}
                                    muted
                                    playsInline
                                    controls
                                    aria-label={move.image?.alt || move.headline}
                                />
                            ) : (
                                <img
                                    src={imageSrc}
                                    alt={move.image?.alt || move.headline}
                                    className="dm-main-image"
                                    loading="lazy"
                                />
                            )
                        )}
                        {move.image?.annotation && (
                            <div className="dm-annotation">
                                <ArrowUpRight size={16} className="dm-arrow" />
                                <span className="dm-annotation-text">{move.image.annotation}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Footer (How it Works + Rationale) */}
                <div className="dm-footer-section">
                    <div className="dm-footer-block">
                        <span className="dm-footer-label">{move.how_it_works.title}:</span>
                        {move.how_it_works.body}
                    </div>
                    <div className="dm-footer-block">
                        <span className="dm-footer-label">{move.rationale.title}:</span>
                        {move.rationale.body}
                    </div>
                </div>
            </div>
        );
    };

    // Print Mode: Just render everything stacked
    if (isPrintMode) {
        return (
            <div className="design-moves-container">
                {moves.map((move) => (
                    <div key={move.id} className="dm-print-block">
                        <h3>{move.headline}</h3>
                        {renderMoveContent(move)}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="design-moves-container">
            {moves.map((move) => {
                const tabInfo = tabs.find(t => t.id === move.id);
                // Extract "01.", "02." from title if present, or just use index
                // Assuming title format "01. Title", let's split if possible or just render.
                // Based on translation.json: "01. Unify Views", we can just use it as is.
                // Logic: Let's split Number and Text for better styling if possible, but keeping it simple is safer.
                // Let's rely on the tab title which has the numbering "01. Unify Views"

                const isOpen = openItems.includes(move.id);
                const headerId = `dm-header-${move.id}`;
                const panelId = `dm-panel-${move.id}`;

                return (
                    <div key={move.id} className="dm-accordion-item">
                        <button
                            className="dm-accordion-header"
                            onClick={() => toggleItem(move.id)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            id={headerId}
                            type="button"
                        >
                            <div className="dm-header-left">
                                {/* Use tab title/subtitle combo if available, else headline */}
                                {tabInfo ? (
                                    <>
                                        {/* Keep numeric prefixes for visual continuity */}
                                        <span className="dm-header-number">{tabInfo.title.split('.')[0]}</span>
                                        <h3 className="dm-header-title">
                                            {tabInfo.title.split('.').slice(1).join('.').trim()} {tabInfo.subtitle}
                                        </h3>
                                    </>
                                ) : (
                                    <h3 className="dm-header-title">{move.headline}</h3>
                                )}
                            </div>
                            <div className="dm-header-icon">
                                <ChevronDown size={20} />
                            </div>
                        </button>

                        {/* Always render content in DOM for print CSS to work */}
                        <motion.div
                            initial={false}
                            animate={isOpen
                                ? { height: 'auto', opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                            className="dm-accordion-panel"
                            id={panelId}
                            role="region"
                            aria-labelledby={headerId}
                        >
                            {renderMoveContent(move)}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};
