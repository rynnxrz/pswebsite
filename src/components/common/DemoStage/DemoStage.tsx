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
    /** Preload iframe content before interaction */
    preload?: boolean;
}

export const DemoStage = ({
    title,
    src,
    poster,
    caption,
    preload = false,
}: DemoStageProps) => {
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    // hasLoaded: controls whether iframe is rendered (lazy by interaction)
    const [hasLoaded, setHasLoaded] = useState(preload);

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

    // Ensure preloaded iframe mounts on first paint.
    useEffect(() => {
        if (preload) {
            setHasLoaded(true);
        }
    }, [preload]);

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
            {hasLoaded && (
                <section
                    className={`demoTheater${isOpen ? '' : ' demoTheaterHidden'}`}
                    role={isOpen ? 'dialog' : undefined}
                    aria-modal={isOpen ? 'true' : undefined}
                    aria-hidden={!isOpen}
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
                        <iframe
                            title={title}
                            src={src}
                            loading="eager"
                            allow="fullscreen"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            className="demoIframe"
                        />
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
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="demoBtn demoBtnSecondary"
                            aria-label="Open in new tab"
                            style={{ marginRight: '0.5rem', textDecoration: 'none' }}
                        >
                            <span>Open in new tab</span>
                        </a>
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

                {/* Poster/Preview with clickable overlay */}
                <div className="demoViewport">
                    {poster ? (
                        <img className="demoPoster" src={poster} alt="" />
                    ) : (
                        <iframe
                            className="demoIframe"
                            src={src}
                            title={title}
                            loading="eager"
                            style={{ pointerEvents: 'none' }} // Ensure clicks go to the cover button
                            tabIndex={-1}
                        />
                    )}

                    <button
                        className="demoCover"
                        onClick={openDemo}
                        aria-label="Try live demo"
                    >
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
