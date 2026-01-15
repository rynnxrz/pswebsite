import React, { useRef, useState, useEffect } from 'react';
import { Expand, Minimize2, Play, MousePointerClick, Loader2 } from 'lucide-react';
import './ExpandableImage.css';
import '../../Tooltip.css';

interface ExpandableImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    interactiveSrc?: string; // Optional URL for interactive content (iframe)
    deferInteraction?: boolean; // If true, requires user action to load iframe
    isNested?: boolean;
    fetchPriority?: 'high' | 'low' | 'auto';
    loading?: 'lazy' | 'eager';
    width?: string | number;
    height?: string | number;
    srcSet?: string;
    sizes?: string;
    // New Props for customization
    customTrigger?: {
        label: string;
        icon?: React.ReactNode;
        className?: string;
    };
    badgeText?: string;
    enableTheaterMode?: boolean; // New prop: forces CSS modal instead of Native Fullscreen
}

export const ExpandableImage: React.FC<ExpandableImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    interactiveSrc,
    deferInteraction = false,
    isNested = false, // New prop to disable outer frame
    fetchPriority = 'auto',
    loading,
    width,
    height,
    srcSet,
    sizes,
    customTrigger,
    badgeText,
    enableTheaterMode = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isInteractionStarted, setIsInteractionStarted] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    const toggleFullscreen = async () => {
        const element = containerRef.current;
        if (!element) return;

        // If Theater Mode is enabled, strictly use CSS Overlay (no Native API)
        if (enableTheaterMode) {
            setIsFullscreen(prev => !prev);
            // If entering theater mode, also start interaction if not already
            if (!isFullscreen && interactiveSrc) {
                setIsInteractionStarted(true);
            }
            return;
        }

        try {
            if (!isFullscreen) {
                // Try native fullscreen first
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if ((element as any).webkitRequestFullscreen) {
                    (element as any).webkitRequestFullscreen();
                } else {
                    // Fallback for iOS Safari which often doesn't support fullscreen API on divs
                    setIsFullscreen(true);
                }
            } else {
                if (document.fullscreenElement) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen();
                }
                // Always unset state
                setIsFullscreen(false);
            }
        } catch (err) {
            console.warn('Fullscreen API failed, falling back to CSS mode:', err);
            // Fallback to CSS-only fullscreen
            setIsFullscreen(!isFullscreen);
        }
    };

    useEffect(() => {
        // ... (Keyboard/Event handlers) generally same, but 'fullscreenchange' won't fire for CSS mode.
        // We still keep them for fallback native usage.
        const handleFullscreenChange = () => {
            if (!enableTheaterMode) {
                // Sync state with native fullscreen changes (e.g. user pressed Esc)
                const isNativeFullscreen = document.fullscreenElement !== null || (document as any).webkitFullscreenElement !== null;
                if (isNativeFullscreen) {
                    setIsFullscreen(true);
                } else {
                    // Only reset if we were strictly in native mode? 
                    // Issue: if we are in CSS mode, this event won't fire.
                    // If we were in native mode and exited, this fires.
                    // We should accept the source of truth if native API is involved.
                    if (document.fullscreenElement === null) setIsFullscreen(false);
                }
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // If in CSS fallback mode, or just to be safe, turn off fullscreen state
                // Native ESC already handled by browser + fullscreenchange, but this covers CSS mode
                setIsFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('fullscreenchange', handleFullscreenChange);
            window.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [enableTheaterMode]);

    // Reset interaction state if interactiveSrc changes (e.g. in a gallery)
    useEffect(() => {
        setIsInteractionStarted(false);
        setIsIframeLoaded(false);
    }, [interactiveSrc]);

    const showIframe = interactiveSrc && (!deferInteraction || isInteractionStarted);

    // If Theater Mode is enabled and user clicks trigger, we might want to enter theater mode directly?
    // Current behavior: Trigger sets isInteractionStarted.
    // Enhanced behavior: If enableTheaterMode, Trigger calls toggleFullscreen instead of just local interaction?
    // User Request: "Click demo to enter theater mode".
    const handleTriggerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (enableTheaterMode) {
            toggleFullscreen(); // This will also set isInteractionStarted(true) inside toggle
        } else {
            setIsInteractionStarted(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`expanded-image-container ${!isNested ? 'section-image' : ''} ${containerClassName} ${isFullscreen ? 'fullscreen-mode' : ''} 
                ${enableTheaterMode && isFullscreen ? 'is-theater-mode' : ''}
                ${showIframe ? 'interactive-active' : ''}`}
        >
            {/* Status Badge */}
            {badgeText && !isFullscreen && (
                <div className="status-badge">
                    <span className="status-dot"></span>
                    {badgeText}
                </div>
            )}

            {/* Main Content Area */}
            <div className="content-wrapper">
                {showIframe ? (
                    <>
                        {!isIframeLoaded && (
                            <div className="iframe-loader">
                                <Loader2 className="animate-spin" size={32} />
                            </div>
                        )}
                        <iframe
                            src={interactiveSrc}
                            className={`interactive-iframe ${className}`}
                            title={alt}
                            style={{ width: '100%', height: '100%', border: 'none', opacity: isIframeLoaded ? 1 : 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            onLoad={() => setIsIframeLoaded(true)}
                        />
                    </>
                ) : (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src={src}
                            alt={alt}
                            className={className}
                            // @ts-expect-error - React 18 doesn't support fetchpriority type yet
                            fetchpriority={fetchPriority}
                            loading={loading}
                            width={width}
                            height={height}
                            srcSet={srcSet}
                            sizes={sizes}
                        />
                        {interactiveSrc && deferInteraction && (
                            <button
                                className={`interaction-trigger-overlay ${customTrigger ? 'is-custom' : ''}`}
                                onClick={handleTriggerClick}
                                aria-label={customTrigger?.label || "Start Interaction"}
                            >
                                {customTrigger ? (
                                    <div className={`interaction-pill-button ${customTrigger.className || ''}`}>
                                        {customTrigger.icon || <MousePointerClick size={20} />}
                                        <span>{customTrigger.label}</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="interaction-play-button">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                        <span className="interaction-label">Click to Interact</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className={`controls-overlay ${interactiveSrc ? 'visible' : ''}`}>
                <div className="tooltip-container">
                    <button
                        className="action-btn"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Exit Fullscreen" : (enableTheaterMode ? "Enter Theater Mode" : "Enter Fullscreen")}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                        {isFullscreen ? <Minimize2 size={20} /> : <Expand size={20} />}
                    </button>
                    <span className="tooltip-text">
                        {isFullscreen ? "Exit Fullscreen" : (enableTheaterMode ? "Enter Theater Mode" : "Enter Fullscreen")}
                    </span>
                </div>
            </div>
        </div>
    );
};
