import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanEye, CalendarClock, Keyboard } from 'lucide-react';
import { usePrintMode } from '../../hooks/usePrintMode';
import './UserVoiceQuotes.css';

interface Quote {
    text: string;
    role: string;
    tags: string[];
}

interface Props {
    filterTag?: string | null;
}

// Semantic Role Colors (Matching graph-theme.css logic)
const ROLE_COLORS = {
    DECISION: '#00B3C7',   // Teal - Read/Director
    MANAGEMENT: '#F7941D', // Orange - Plan/Manager
    OPERATION: '#27AE60',  // Green - Input/Operator
};

// Helper to get color based on tag
const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
        case 'read': return ROLE_COLORS.DECISION;
        case 'plan': return ROLE_COLORS.MANAGEMENT;
        case 'input': return ROLE_COLORS.OPERATION;
        case 'view': return ROLE_COLORS.MANAGEMENT; // Assuming Manager for 'view' based on context (Cleo/Ethan)
        default: return '#a0a0a0';
    }
};

export const UserVoiceQuotes = ({ filterTag }: Props) => {
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isPrintMode = usePrintMode();

    const allQuotes = t('project_p.research.user_voice.quotes', { returnObjects: true }) as Quote[];

    const quotes = isPrintMode
        ? allQuotes
        : filterTag
            ? allQuotes.filter(q => q.tags.includes(filterTag))
            : allQuotes;

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [filterTag]);

    const getIcon = (tag: string, useColor: boolean = true) => {
        const color = useColor ? getTagColor(tag) : 'var(--text-secondary)';
        switch (tag.toLowerCase()) {
            case 'read': return <ScanEye size={14} color={color} />;
            case 'plan': return <CalendarClock size={14} color={color} />;
            case 'input': return <Keyboard size={14} color={color} />;
            case 'view': return <ScanEye size={14} color={color} />;
            default: return null;
        }
    };

    return (
        <div className="user-voice-container">
            <div className="quotes-scroll-container" ref={scrollContainerRef}>
                {quotes.map((quote, index) => {
                    // Determine primary color - use the first tag's color
                    const primaryColor = getTagColor(quote.tags[0]);

                    return (
                        <div
                            key={index}
                            className="quote-card"
                            style={{
                                // Glassmorphism overrides
                                background: 'var(--graph-bg)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: 'var(--graph-border)'
                            }}
                        >
                            <p className="quote-text">"{quote.text}"</p>
                            <div className="quote-footer">
                                <span className="quote-role">
                                    <span
                                        className="role-dot"
                                        style={{ backgroundColor: primaryColor }}
                                    ></span>
                                    {quote.role}
                                </span>
                                <div className="quote-tags">
                                    {quote.tags.map((tag, tagIndex) => {
                                        // Use neutral style for tags
                                        return (
                                            <span
                                                key={tagIndex}
                                                className="quote-tag"
                                                style={{
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    color: 'var(--text-secondary)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    background: 'rgba(255, 255, 255, 0.05)'
                                                }}
                                            >
                                                {getIcon(tag, false)} {/* Pass false to disable dynamic coloring for icon */}
                                                {tag}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};
