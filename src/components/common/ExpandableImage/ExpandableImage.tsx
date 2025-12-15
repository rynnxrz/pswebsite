import React, { useRef, useState, useEffect } from 'react';
import { Expand, Minimize2 } from 'lucide-react';
import './ExpandableImage.css';
import '../../Tooltip.css';

interface ExpandableImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    interactiveSrc?: string; // Optional URL for interactive content (iframe)
    isNested?: boolean;
    fetchPriority?: 'high' | 'low' | 'auto';
    loading?: 'lazy' | 'eager';
    width?: string | number;
    height?: string | number;
}

export const ExpandableImage: React.FC<ExpandableImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    interactiveSrc,
    isNested = false, // New prop to disable outer frame
    fetchPriority = 'auto',
    loading,
    width,
    height
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        const element = containerRef.current;
        if (!element) return;

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
        const handleFullscreenChange = () => {
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
    }, []);

    return (
        <div
            ref={containerRef}
            className={`expanded-image-container ${!isNested ? 'section-image' : ''} ${containerClassName} ${isFullscreen ? 'fullscreen-mode' : ''}`}
        >
            {/* Main Content Area */}
            <div className="content-wrapper">
                {interactiveSrc ? (
                    <iframe
                        src={interactiveSrc}
                        className={`interactive-frame ${className}`}
                        title={alt}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className={className}
                        fetchPriority={fetchPriority}
                        loading={loading}
                        width={width}
                        height={height}
                    />
                )}
            </div>

            <div className={`controls-overlay ${interactiveSrc ? 'visible' : ''}`}>
                <div className="tooltip-container">
                    <button
                        className="action-btn"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                        {isFullscreen ? <Minimize2 size={20} /> : <Expand size={20} />}
                    </button>
                    <span className="tooltip-text">
                        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    </span>
                </div>
            </div>
        </div>
    );
};
