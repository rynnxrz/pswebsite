import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink, Calendar } from 'lucide-react';
import { MediaCoverage } from '@/data/germanierMediaCoverage';
import { useSlidePanels, PANEL_WIDTH } from './SlidePanelContext';
import './SlidePanel.css';

interface SlidePanelProps {
    panel: {
        id: string;
        article: MediaCoverage;
        zIndex: number;
    };
    index: number;
    totalPanels: number;
}

export const SlidePanel: React.FC<SlidePanelProps> = ({ panel, index, totalPanels }) => {
    const { closePanel, getPanelOffset } = useSlidePanels();
    const panelRef = useRef<HTMLDivElement>(null);
    const { article } = panel;
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    // Check if this site blocks iframe
    const blocksIframe = article.blocksIframe === true;

    // Calculate dynamic offset from right based on position in stack
    // Total stack space is fixed, gap decreases as more panels open
    const rightOffset = getPanelOffset(index, totalPanels);

    // Format date
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closePanel(panel.id);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closePanel, panel.id]);

    // Focus trap
    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.focus();
        }
    }, []);

    // Reset loading state when article changes
    useEffect(() => {
        if (!blocksIframe) {
            setIsLoading(true);
            setLoadError(false);
        }
    }, [article.url, blocksIframe]);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setLoadError(true);
    };

    const handleOpenExternal = () => {
        window.open(article.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            ref={panelRef}
            className="slide-panel"
            style={{
                width: PANEL_WIDTH,
                right: rightOffset,
                zIndex: 1000 + panel.zIndex,
            }}
            initial={{ x: PANEL_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: PANEL_WIDTH }}
            transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300
            }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Article: ${article.headline}`}
        >
            {/* Header */}
            <div className="slide-panel-header">
                <div className="slide-panel-outlet">
                    <span className="outlet-name">{article.outlet}</span>
                    {article.language && article.language !== 'en' && (
                        <span className="language-tag">{article.language.toUpperCase()}</span>
                    )}
                </div>
                <div className="slide-panel-header-actions">
                    <button
                        className="slide-panel-external"
                        onClick={handleOpenExternal}
                        aria-label="Open in new tab"
                        title="Open in new tab"
                    >
                        <ExternalLink size={16} />
                    </button>
                    <button
                        className="slide-panel-close"
                        onClick={() => closePanel(panel.id)}
                        aria-label="Close panel"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Content - Preview style for blocked sites, iframe for others */}
            {blocksIframe ? (
                // Original preview style for sites that block iframe
                <div className="slide-panel-content">
                    <h2 className="slide-panel-headline">{article.headline}</h2>

                    <div className="slide-panel-meta">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                    </div>

                    {article.quote && (
                        <blockquote className="slide-panel-quote">
                            <span className="quote-mark">"</span>
                            {article.quote}
                            {article.quoteAuthor && (
                                <cite className="quote-author">— {article.quoteAuthor}</cite>
                            )}
                        </blockquote>
                    )}

                    {!article.quote && article.excerpt && (
                        <p className="slide-panel-excerpt">{article.excerpt}</p>
                    )}

                    <button
                        className="read-full-article-btn"
                        onClick={handleOpenExternal}
                    >
                        <span>Read on {article.outlet}</span>
                        <ExternalLink size={16} />
                    </button>
                </div>
            ) : (
                // Iframe for sites that allow embedding
                <div className="slide-panel-iframe-container">
                    {isLoading && (
                        <div className="slide-panel-loader">
                            <Loader2 className="animate-spin" size={32} />
                            <span>Loading {article.outlet}...</span>
                        </div>
                    )}

                    {loadError ? (
                        <div className="slide-panel-error">
                            <p>This site cannot be embedded.</p>
                            <button onClick={handleOpenExternal} className="open-external-btn">
                                <ExternalLink size={16} />
                                <span>Open {article.outlet} in new tab</span>
                            </button>
                        </div>
                    ) : (
                        <iframe
                            src={article.url}
                            className="slide-panel-iframe"
                            title={article.headline}
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            sandbox="allow-scripts allow-same-origin allow-popups"
                        />
                    )}
                </div>
            )}
        </motion.div>
    );
};

// Panel Manager - renders all panels
export const SlidePanelManager: React.FC = () => {
    const { panels } = useSlidePanels();

    return (
        <div className="slide-panel-container">
            <AnimatePresence>
                {panels.map((panel, index) => (
                    <SlidePanel
                        key={panel.id}
                        panel={panel}
                        index={index}
                        totalPanels={panels.length}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
