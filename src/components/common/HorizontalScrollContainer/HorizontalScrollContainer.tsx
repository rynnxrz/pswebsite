import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HorizontalScrollContainer.css';

interface HorizontalScrollContainerProps {
    children: React.ReactNode;
    className?: string; // Class for the inner scrollable container (grid/flex layout)
    gradientOverlay?: boolean; // Optional: toggle the fade effect if needed, default true
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
    children,
    className = '',
    gradientOverlay = true
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            // Allow a small buffer (1px) for float calculation differences
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll(); // Initial check
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scrollContainer = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const container = containerRef.current;
            const items = container.children;

            // Default scroll amount if measurement fails (Mobile-ish default)
            let scrollAmount = container.clientWidth * 0.85;

            // Smart calculation: measure distance between the first two items
            // This accounts for width + gap automatically
            if (items.length >= 2) {
                const firstItem = items[0] as HTMLElement;
                const secondItem = items[1] as HTMLElement;
                const itemWidthWithGap = secondItem.offsetLeft - firstItem.offsetLeft;
                if (itemWidthWithGap > 0) {
                    scrollAmount = itemWidthWithGap;
                }
            } else if (items.length === 1) {
                // Fallback for single item, just use its width
                scrollAmount = (items[0] as HTMLElement).offsetWidth;
            }

            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`horizontal-scroll-wrapper ${gradientOverlay ? 'has-gradient' : ''}`}>
            {canScrollLeft && (
                <button
                    className="scroll-nav-btn nav-left"
                    onClick={() => scrollContainer('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            <div className={`horizontal-scroll-viewport ${className}`} ref={containerRef}>
                {children}
            </div>

            {canScrollRight && (
                <button
                    className="scroll-nav-btn nav-right"
                    onClick={() => scrollContainer('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
};
