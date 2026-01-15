import { useEffect, useRef, useState } from 'react';
import './DemoStage.css';

interface DemoStageProps {
    /** Title displayed in header and used for accessibility */
    title: string;
    /** URL for the iframe content */
    src: string;
    /** Optional poster image shown before iframe loads */
    poster?: string;
    /** Caption text below the stage */
    caption?: string;
}

export const DemoStage = ({
    title,
    src,
    poster,
    caption,
}: DemoStageProps) => {
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    // hasLoaded: controls whether iframe is rendered (lazy by interaction)
    const [hasLoaded, setHasLoaded] = useState(false);

    // isOpen: fullscreen theater mode
    const [isOpen, setIsOpen] = useState(false);

    const openDemo = () => {
        if (!hasLoaded) setHasLoaded(true);
        setIsOpen(true);
    };

    const closeDemo = () => {
        setIsOpen(false);
        // Return focus to trigger
        triggerRef.current?.focus();
    };

    // Keyboard handler for Esc
    useEffect(() => {
        if (!isOpen) return;

        // Focus the close button when theater opens to ensure Esc works immediately
        // (Prevent focus from getting lost or trapped in iframe)
        closeBtnRef.current?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeDemo();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        document.body.classList.add('demo-stage-open');

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.classList.remove('demo-stage-open');
        };
    }, [isOpen]);

    return (
        <>
            {/* Fullscreen Theater Mode */}
            {isOpen && (
                <section
                    className="demoTheater"
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    <header className="demoHeader">
                        <div className="demoTitle">
                            <span className="demoTitleDot" />
                            {title}
                        </div>
                        <div className="demoActions">
                            <button
                                ref={closeBtnRef}
                                className="demoBtn"
                                onClick={closeDemo}
                                aria-label="Close demo"
                            >
                                <span>Close</span>
                            </button>
                        </div>
                    </header>
                    <div className="demoTheaterViewport">
                        {hasLoaded && (
                            <iframe
                                title={title}
                                src={src}
                                loading="lazy"
                                allow="fullscreen"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                className="demoIframe"
                            />
                        )}
                    </div>
                </section>
            )}

            {/* Preview Stage (inline, always in document flow) */}
            <div className="demoStage">
                <header className="demoHeader">
                    <div className="demoTitle">
                        <span className="demoTitleDot" />
                        {title}
                    </div>
                    <div className="demoActions">
                        <button
                            ref={triggerRef}
                            className="demoBtn demoBtnPrimary"
                            onClick={openDemo}
                            aria-label="Try live demo"
                        >
                            <span>Try live demo</span>
                        </button>
                    </div>
                </header>

                {/* Poster with clickable overlay */}
                <div className="demoViewport">
                    <button
                        className="demoCover"
                        onClick={openDemo}
                        aria-label="Try live demo"
                    >
                        {poster && <img className="demoPoster" src={poster} alt="" />}
                        <div className="demoCoverHint">
                            Click to interact · Scroll continues to article
                        </div>
                    </button>
                </div>
            </div>

            {/* Caption */}
            {caption && <p className="demoCaption">{caption}</p>}
        </>
    );
};
