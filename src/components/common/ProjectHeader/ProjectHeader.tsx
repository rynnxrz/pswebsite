import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Download from 'lucide-react/dist/esm/icons/download';
import Check from 'lucide-react/dist/esm/icons/check';
import LinkIcon from 'lucide-react/dist/esm/icons/link';
import Play from 'lucide-react/dist/esm/icons/play';
import './ProjectHeader.css';

interface ProjectHeaderProps {
    title: string;
    date: string;
    sections: Array<{ id: string; title: string }>;
    activeSection: string;
    onSectionClick: (id: string, e: React.MouseEvent) => void;
    downloadTooltip?: string;
    copyTooltip?: string;
    copiedTooltip?: string;
    pitchTooltip?: string;
    onPlayPitch?: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
    title,
    date,
    sections,
    activeSection,
    onSectionClick,
    downloadTooltip,
    copyTooltip,
    copiedTooltip,
    pitchTooltip,
    onPlayPitch,
}) => {
    const { t } = useTranslation();
    const finalDownloadTooltip = downloadTooltip || t('project.tooltips.download');
    const finalCopyTooltip = copyTooltip || t('project.tooltips.copy');
    const finalCopiedTooltip = copiedTooltip || t('project.tooltips.copied');
    const finalPitchTooltip = pitchTooltip || t('project.tooltips.pitch');
    const [isScrolled, setIsScrolled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let isTicking = false;

        const updateScrollState = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const totalScroll = Math.max(docHeight - winHeight, 1);
            const progress = Math.min(100, Math.max(0, Math.round((scrollTop / totalScroll) * 100)));

            setScrollProgress(progress);
            isTicking = false;
        };

        const handleScroll = () => {
            if (!isTicking) {
                window.requestAnimationFrame(updateScrollState);
                isTicking = true;
            }
        };

        updateScrollState();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isSticky = !entry.isIntersecting;
                setIsScrolled(isSticky);
                // Dispatch custom event for sticky state change
                window.dispatchEvent(new CustomEvent('projectheader-sticky', { detail: { isSticky } }));
            },
            { threshold: 0 }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = (e: React.MouseEvent) => {
        e.preventDefault();
        window.print();
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const activeSectionTitle = sections.find((s) => s.id === activeSection)?.title;

    return (
        <>
            <div ref={sentinelRef} className="project-header-sentinel" aria-hidden="true" />
            <header className={`project-header ${isScrolled ? 'sticky-active' : ''}`}>
                <div className="project-header-text-container">
                    <div className={`header-main-info ${isScrolled && activeSection ? 'scrolled-mode' : ''}`}>
                        <h1 className="project-title">
                            <button
                                className="project-title-button"
                                type="button"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                {title}
                            </button>
                        </h1>

                        {!isScrolled ? (
                            <span className="project-date">{date}</span>
                        ) : (
                            <div className="section-navigator">
                                <span className="divider">/</span>
                                <button
                                    type="button"
                                    className="active-section-name"
                                    aria-haspopup="menu"
                                    aria-expanded={isMenuOpen}
                                    onClick={toggleMenu}
                                    onBlur={(e) => {
                                        if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                                            closeMenu();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            closeMenu();
                                        }
                                    }}
                                >
                                    {activeSectionTitle || 'Intro'}
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`section-dropdown ${isMenuOpen ? 'open' : ''}`}
                                    role="menu"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            closeMenu();
                                        }
                                    }}
                                >
                                    {sections.map((section) => (
                                        <button
                                            type="button"
                                            key={section.id}
                                            className={`dropdown-item ${activeSection === section.id ? 'active' : ''}`}
                                            onClick={(e) => {
                                                onSectionClick(section.id, e);
                                                closeMenu();
                                            }}
                                            role="menuitem"
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="action-buttons-container">
                    {onPlayPitch && (
                        <div className="tooltip-container tooltip-bottom">
                            <button onClick={onPlayPitch} className="action-btn" aria-label="Play Pitch Deck">
                                <Play size={16} />
                            </button>
                            <span className="tooltip-text">{finalPitchTooltip}</span>
                        </div>
                    )}

                    <div className="tooltip-container tooltip-bottom">
                        <button onClick={handlePrint} className="action-btn" aria-label="Print/Download PDF">
                            <Download size={16} />
                        </button>
                        <span className="tooltip-text">{finalDownloadTooltip}</span>
                    </div>

                    <div className="tooltip-container tooltip-bottom">
                        <button onClick={handleCopyLink} className="action-btn" aria-label="Copy Link">
                            {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                        </button>
                        <span className="tooltip-text">{copied ? finalCopiedTooltip : finalCopyTooltip}</span>
                    </div>
                </div>

                <div className={`header-progress-track ${isScrolled ? 'visible' : ''}`}>
                    <div className="header-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
                </div>
            </header>
        </>
    );
};
