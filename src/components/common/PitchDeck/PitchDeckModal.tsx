import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { PitchSlide } from '../../../hooks/usePitchDeckSlides';
import './PitchDeckModal.css';

interface PitchDeckModalProps {
    isOpen: boolean;
    onClose: () => void;
    slides: PitchSlide[];
    projectTitle: string;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
    isOpen,
    onClose,
    slides,
    projectTitle,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goToNext = useCallback(() => {
        if (currentIndex < slides.length - 1) {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
        }
    }, [currentIndex, slides.length]);

    const goToPrev = useCallback(() => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    goToNext();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrev();
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, goToNext, goToPrev, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset index when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setDirection(0);
        }
    }, [isOpen]);

    // Touch swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        setTouchStart(null);
    };

    if (!isOpen || slides.length === 0) return null;

    const currentSlide = slides[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="pitch-deck-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Header */}
                    <header className="pitch-deck-header">
                        <span className="pitch-deck-project-title">{projectTitle}</span>
                        <div className="pitch-deck-controls">
                            <span className="pitch-deck-counter">
                                {currentIndex + 1} / {slides.length}
                            </span>
                            <button
                                className="pitch-deck-close"
                                onClick={onClose}
                                aria-label="Close pitch deck"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </header>

                    {/* Slide Content */}
                    <div className="pitch-deck-content">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className={`pitch-slide pitch-slide--${currentSlide.type}`}
                            >
                                {renderSlide(currentSlide)}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        className="pitch-deck-nav pitch-deck-nav--prev"
                        onClick={goToPrev}
                        disabled={currentIndex === 0}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        className="pitch-deck-nav pitch-deck-nav--next"
                        onClick={goToNext}
                        disabled={currentIndex === slides.length - 1}
                        aria-label="Next slide"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Progress dots */}
                    <div className="pitch-deck-progress">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`pitch-deck-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

function renderSlide(slide: PitchSlide): React.ReactNode {
    const { type, content } = slide;

    switch (type) {
        case 'title':
            return (
                <div className="slide-title-content">
                    <h1 className="slide-headline">{content.headline}</h1>
                    {content.subheadline && (
                        <p className="slide-subheadline">{content.subheadline}</p>
                    )}
                </div>
            );

        case 'statement':
            return (
                <div className="slide-statement-content">
                    <h2 className="slide-statement">{content.headline}</h2>
                </div>
            );

        case 'visual':
            return (
                <div className="slide-visual-content">
                    <h2 className="slide-visual-headline">{content.headline}</h2>
                    {content.stat && (
                        <div className="slide-stat">
                            <span className="slide-stat-value">{content.stat.value}</span>
                            <span className="slide-stat-label">{content.stat.label}</span>
                        </div>
                    )}
                    {content.body && <blockquote className="slide-quote">{content.body}</blockquote>}
                </div>
            );

        case 'decision':
            return (
                <div className="slide-decision-content">
                    <div className="slide-decision-text">
                        <h2 className="slide-decision-headline">{content.headline}</h2>
                        {content.body && <p className="slide-decision-body">{content.body}</p>}
                    </div>
                    {content.media && (
                        <div className="slide-decision-media">
                            {content.media.endsWith('.mp4') ? (
                                <video
                                    src={content.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="slide-video"
                                />
                            ) : (
                                <img src={content.media} alt="" className="slide-image" />
                            )}
                        </div>
                    )}
                </div>
            );

        case 'reflection':
            return (
                <div className="slide-reflection-content">
                    <h2 className="slide-reflection-headline">{content.headline}</h2>
                    {content.body && <p className="slide-reflection-body">{content.body}</p>}
                </div>
            );

        default:
            return null;
    }
}
