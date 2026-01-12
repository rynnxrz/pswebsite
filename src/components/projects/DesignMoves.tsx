import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    const [activeTabId, setActiveTabId] = useState('unify'); // Default to first new id
    const isPrintMode = usePrintMode();

    const tabs = t('project_p.design_moves.tabs', { returnObjects: true }) as Tab[];
    const moves = t('project_p.design_moves.moves', { returnObjects: true }) as DesignMove[];

    const activeMove = moves.find(m => m.id === activeTabId) || moves[0];


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
            <div className="dm-detailed-content">
                {/* 1. Context Row (Side by Side: Problem & Solution) */}
                <div className="dm-context-row">
                    <div className="dm-context-card pain">
                        <h4>{move.problem.title}</h4>
                        <p>{move.problem.body}</p>
                    </div>
                    <div className="dm-context-card move">
                        <h4>{move.solution.title}</h4>
                        <p>{move.solution.body}</p>
                    </div>
                </div>

                {/* 2. Visual & How it Works */}
                <div className="dm-visual-section">
                    <div className="dm-image-wrapper">
                        {imageSrc && (
                            isVideo ? (
                                <video
                                    src={imageSrc}
                                    className="dm-main-image"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={imageSrc}
                                    alt={move.image?.alt || ''}
                                    className="dm-main-image"
                                />
                            )
                        )}
                        {move.image?.annotation && (
                            <div className="dm-annotation">
                                <ArrowUpRight size={16} className="dm-arrow" />
                                <span>{move.image.annotation}</span>
                            </div>
                        )}
                    </div>

                    {/* How It Works (Below visual, smaller font) */}
                    <div className="dm-how-it-works">
                        <strong>{move.how_it_works.title}: </strong>
                        {move.how_it_works.body}
                    </div>
                </div>

                {/* 3. Rationale */}
                <div className="dm-rationale">
                    <h4>{move.rationale.title}</h4>
                    <p>{move.rationale.body}</p>
                </div>
            </div>
        );
    };

    if (isPrintMode) {
        return (
            <div className="design-moves-container">
                {moves.map((move) => (
                    <div key={move.id} className="dm-print-block">
                        <div className="dm-content-container">
                            {renderMoveContent(move)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="design-moves-container">
            {/* Header / Tabs */}
            <div className="dm-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`dm-tab ${activeTabId === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTabId(tab.id)}
                    >
                        <span className="dm-tab-title">{tab.title}</span>
                        <span className="dm-tab-subtitle">{tab.subtitle}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="dm-content-area">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="dm-content-container"
                    >
                        {renderMoveContent(activeMove)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
