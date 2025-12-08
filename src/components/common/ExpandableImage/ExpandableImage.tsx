import React, { useRef, useState, useEffect } from 'react';
import { Expand, Minimize2 } from 'lucide-react';
import './ExpandableImage.css';

interface ExpandableImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    interactiveSrc?: string; // Optional URL for interactive content (iframe)
}

export const ExpandableImage: React.FC<ExpandableImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    interactiveSrc
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const element = containerRef.current;
        if (!element) return;

        if (!document.fullscreenElement) {
            element.requestFullscreen().catch((err) => console.error('Error attempting to enable fullscreen:', err));
        } else {
            document.exitFullscreen().catch((err) => console.error('Error attempting to exit fullscreen:', err));
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => window.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`section-image expanded-image-container ${containerClassName} ${isFullscreen ? 'fullscreen-mode' : ''}`}
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
                    <img src={src} alt={alt} className={className} />
                )}
            </div>

            <div className={`controls-overlay ${interactiveSrc ? 'visible' : ''}`}>
                <button
                    className="control-button"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize2 size={20} /> : <Expand size={20} />}
                </button>
            </div>
        </div>
    );
};
