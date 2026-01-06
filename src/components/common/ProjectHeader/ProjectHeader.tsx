import React, { useState, useEffect } from 'react';
import { Download, Check, Link as LinkIcon } from 'lucide-react';
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
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
    title,
    date,
    sections,
    activeSection,
    onSectionClick,
    downloadTooltip = 'Download PDF',
    copyTooltip = 'Copy Link',
    copiedTooltip = 'Copied!',
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let isTicking = false;

        const updateScrollState = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const totalScroll = Math.max(docHeight - winHeight, 1);
            const progress = Math.min(100, Math.max(0, Math.round((scrollTop / totalScroll) * 100)));

            setIsScrolled(scrollTop > 100);
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
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
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

    const activeSectionTitle = sections.find((s) => s.id === activeSection)?.title;

    return (
        <header className={`project-header ${isScrolled ? 'sticky-active' : ''}`}>
            <div className="project-header-text-container">
                <div className={`header-main-info ${isScrolled && activeSection ? 'scrolled-mode' : ''}`}>
                    <h1 className="project-title" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        {title}
                    </h1>

                    {!isScrolled ? (
                        <span className="project-date">{date}</span>
                    ) : (
                        <div className="section-navigator">
                            <span className="divider">/</span>
                            <span className="active-section-name">{activeSectionTitle || 'Intro'}</span>

                            {/* Dropdown Menu */}
                            <div className="section-dropdown">
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`dropdown-item ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={(e) => onSectionClick(section.id, e)}
                                    >
                                        {section.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="action-buttons-container">
                <div className="tooltip-container tooltip-bottom">
                    <button onClick={handlePrint} className="action-btn" aria-label="Print/Download PDF">
                        <Download size={16} />
                    </button>
                    <span className="tooltip-text">{downloadTooltip}</span>
                </div>

                <div className="tooltip-container tooltip-bottom">
                    <button onClick={handleCopyLink} className="action-btn" aria-label="Copy Link">
                        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                    </button>
                    <span className="tooltip-text">{copied ? copiedTooltip : copyTooltip}</span>
                </div>
            </div>

            <div className={`header-progress-track ${isScrolled ? 'visible' : ''}`}>
                <div className="header-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>
        </header>
    );
};
