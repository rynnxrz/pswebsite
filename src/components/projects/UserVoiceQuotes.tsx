import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanEye, CalendarClock, Keyboard, User } from 'lucide-react';
import './UserVoiceQuotes.css';

interface Quote {
    text: string;
    role: string;
    tags: string[];
}

interface Props {
    filterTag?: string | null;
}

export const UserVoiceQuotes = ({ filterTag }: Props) => {
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const allQuotes = t('project_p.research.user_voice.quotes', { returnObjects: true }) as Quote[];

    // Filter quotes if a tag is selected
    const quotes = filterTag
        ? allQuotes.filter(q => q.tags.includes(filterTag))
        : allQuotes;

    // Reset scroll position when filter changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [filterTag]);

    const getIcon = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'read':
                return <ScanEye size={14} />;
            case 'plan':
                return <CalendarClock size={14} />;
            case 'input':
                return <Keyboard size={14} />;
            default:
                return null;
        }
    };

    return (
        <div className="user-voice-container">
            <div className="quotes-scroll-container" ref={scrollContainerRef}>
                {quotes.map((quote, index) => (
                    <div key={index} className="quote-card">
                        <p className="quote-text">"{quote.text}"</p>
                        <div className="quote-footer">
                            <span className="quote-role">
                                <User size={14} />
                                {quote.role}
                            </span>
                            <div className="quote-tags">
                                {quote.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="quote-tag">
                                        {getIcon(tag)}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
