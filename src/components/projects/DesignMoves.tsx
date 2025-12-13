import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './DesignMoves.css';

interface DesignMove {
    id: string;
    headline: string;
    context: {
        pain: string;
        strategy: string;
    };
    image: {
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
    const [activeTabId, setActiveTabId] = useState('link');

    const tabs = t('project_p.design_moves.tabs', { returnObjects: true }) as Tab[];
    const moves = t('project_p.design_moves.moves', { returnObjects: true }) as DesignMove[];

    const activeMove = moves.find(m => m.id === activeTabId) || moves[0];


    // Placeholder images map
    const imageMap: Record<string, string> = {
        link: '/assets/images/ora-web/Unify.mp4', // Replaced with video
        unify: '/assets/images/ora-web/move-unify-placeholder.png', // Replace later
        reveal: '/assets/images/ora-web/move-reveal-placeholder.png'  // Replace later
    };

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
                        {/* Row 1: Headline + Scope */}
                        <div className="dm-header-row">
                            <h3 className="dm-headline">{activeMove.headline}</h3>
                        </div>

                        {/* Row 2: Context (Pain & Strategy) */}
                        <div className="dm-context-row">
                            <div className="dm-context-card pain">
                                <h4>The Pain</h4>
                                <p>{activeMove.context.pain}</p>
                            </div>
                            <div className="dm-context-card move">
                                <h4>The Move</h4>
                                <p>{activeMove.context.strategy}</p>
                            </div>
                        </div>

                        {/* Row 3: Visual */}
                        <div className="dm-visual-row">
                            <div className="dm-image-wrapper">
                                {imageMap[activeTabId].endsWith('.mp4') ? (
                                    <video
                                        src={imageMap[activeTabId]}
                                        className="dm-main-image"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={imageMap[activeTabId]}
                                        alt={activeMove.image.alt}
                                        className="dm-main-image"
                                    />
                                )}
                                <div className="dm-annotation">
                                    <ArrowUpRight size={16} className="dm-arrow" />
                                    <span>{activeMove.image.annotation}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
