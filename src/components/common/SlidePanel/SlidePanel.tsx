import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink, Calendar } from 'lucide-react';
import { MediaCoverage } from '@/data/germanierMediaCoverage';
import { useSlidePanels, PANEL_WIDTH } from './SlidePanelContext';
import './SlidePanel.css';

// Check if device is mobile for optimized animations
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

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
    const [loadProgress, setLoadProgress] = useState(0);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

    // Simulated progress animation
    const startProgressSimulation = useCallback(() => {
        setLoadProgress(0);

        // Clear any existing interval
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        // Simulate progress: fast at first, then slows down as it approaches 90%
        progressIntervalRef.current = setInterval(() => {
            setLoadProgress(prev => {
                if (prev >= 90) {
                    // Stop at 90% until actual load completes
                    return prev;
                }
                // Slow down as we approach 90%
                const increment = Math.max(1, (90 - prev) * 0.1);
                return Math.min(90, prev + increment);
            });
        }, 100);
    }, []);

    const completeProgress = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        // Complete to 100%
        setLoadProgress(100);
        // Reset after animation completes
        setTimeout(() => {
            setLoadProgress(0);
        }, 300);
    }, []);

    // Reset loading state when article changes
    useEffect(() => {
        if (!blocksIframe && article.type !== 'instagram') {
            setIsLoading(true);
            setLoadError(false);
            startProgressSimulation();
        }

        // Handle Instagram loading with progress
        if (article.type === 'instagram') {
            setIsLoading(true);
            startProgressSimulation();

            // Process Instagram embeds if this is an Instagram panel
            if (typeof window !== 'undefined' && (window as any).instgrm) {
                // Small timeout to ensure DOM is ready
                setTimeout(() => {
                    (window as any).instgrm.Embeds.process();
                    // Complete loading after embed processes
                    setTimeout(() => {
                        completeProgress();
                        setIsLoading(false);
                    }, 500);
                }, 100);
            } else {
                // If Instagram SDK not loaded, complete after a delay
                setTimeout(() => {
                    completeProgress();
                    setIsLoading(false);
                }, 2000);
            }
        }

        // Cleanup interval on unmount
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [article.url, blocksIframe, article.type, startProgressSimulation, completeProgress]);

    const handleIframeLoad = () => {
        completeProgress();
        setIsLoading(false);
    };

    const handleIframeError = () => {
        completeProgress();
        setIsLoading(false);
        setLoadError(true);
    };

    const handleOpenExternal = () => {
        window.open(article.url, '_blank', 'noopener,noreferrer');
    };

    // Memoize transition config for performance
    const transitionConfig = useMemo(() =>
        isMobile
            ? { type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] } // Faster tween on mobile
            : { type: 'spring', damping: 30, stiffness: 300 }
        , []);

    return (
        <motion.div
            ref={panelRef}
            className="slide-panel"
            style={{
                width: PANEL_WIDTH,
                right: rightOffset,
                zIndex: 1000 + panel.zIndex,
                willChange: 'transform', // Hint browser for GPU acceleration
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={transitionConfig}
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
            {/* Content - Preview style for blocked sites, iframe for others, or specialized Instagram view */}
            {article.type === 'instagram' ? (
                <div className="slide-panel-content instagram-panel">
                    {/* Loading Progress Bar */}
                    {isLoading && loadProgress > 0 && (
                        <div className="slide-panel-progress-container">
                            <div className="slide-panel-progress">
                                <div
                                    className="slide-panel-progress-bar"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Loading Skeleton - shown while Instagram embed loads */}
                    {isLoading && (
                        <div className="instagram-loading-skeleton">
                            <div className="instagram-skeleton-header">
                                <div className="instagram-gradient-bg" />
                            </div>
                            <div className="instagram-skeleton-content">
                                <div className="skeleton-avatar" />
                                <div className="skeleton-line skeleton-line-short" />
                                <div className="skeleton-line skeleton-line-medium" />
                                <div className="skeleton-line skeleton-line-long" />
                                <div className="skeleton-grid">
                                    <div className="skeleton-grid-item" />
                                    <div className="skeleton-grid-item" />
                                    <div className="skeleton-grid-item" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instagram Embed */}
                    <div className={`instagram-embed-container ${isLoading ? 'instagram-embed-loading' : ''}`}>
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink={article.url}
                            data-instgrm-version="14"
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '0',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                margin: '0 auto',
                                maxWidth: '540px',
                                minWidth: '326px',
                                padding: '0',
                                width: 'calc(100% - 2px)',
                            }}
                        >
                            <div style={{ padding: '16px' }}>
                                <a
                                    href={article.url}
                                    style={{
                                        background: 'transparent',
                                        lineHeight: '1.5',
                                        padding: '0',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        width: '100%',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View this profile on Instagram
                                </a>
                            </div>
                        </blockquote>
                    </div>
                </div>
            ) : blocksIframe ? (
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
                    {/* Loading Progress Bar */}
                    {isLoading && loadProgress > 0 && (
                        <div className="slide-panel-progress-container">
                            <div className="slide-panel-progress">
                                <div
                                    className="slide-panel-progress-bar"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

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
