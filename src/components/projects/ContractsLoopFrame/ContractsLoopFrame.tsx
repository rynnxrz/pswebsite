import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Search from 'lucide-react/dist/esm/icons/search';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Plus from 'lucide-react/dist/esm/icons/plus';
import { ContractsTable } from './ContractsTable';
import { ContractsToolbar } from './ContractsToolbar';
import {
    boxModelFor,
    CELL_TRANSITION,
    containerVariants,
    inputVariants,
    NEXT,
    NAKED,
    PHASE_DURATION,
    primaryButtonVariants,
    REDUCED_TRANSITION,
    SHADOW_TRANSITION,
    shadowVariants,
    TOKEN,
    type Phase,
} from './tokens';
import './ContractsLoopFrame.css';

// Inner composition renders at a fixed width; narrower viewports get a
// uniform transform:scale() — spec constraint #9, no responsive reflow.
const INNER_WIDTH = 900;
const INNER_HEIGHT_FALLBACK = 560;

function useLoopPhase() {
    const reduced = useReducedMotion();
    const [phase, setPhase] = useState<Phase>('hidden');

    // SSR: reduced is null on the server, only resolved after hydration.
    // If the user truly prefers reduced motion, jump to `styled` immediately —
    // don't wait out the setTimeout cycle.
    useEffect(() => {
        if (reduced) setPhase('styled');
    }, [reduced]);

    useEffect(() => {
        if (reduced) return;
        const t = window.setTimeout(
            () => setPhase((p) => NEXT[p]),
            PHASE_DURATION[phase],
        );
        return () => window.clearTimeout(t);
    }, [phase, reduced]);

    return { phase, reduced };
}

function useFitScale(
    outerRef: React.RefObject<HTMLDivElement | null>,
    innerRef: React.RefObject<HTMLDivElement | null>,
) {
    const [scale, setScale] = useState(1);
    const [innerHeight, setInnerHeight] = useState(INNER_HEIGHT_FALLBACK);

    useLayoutEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        const compute = () => {
            const width = outer.clientWidth;
            const next = Math.min(1, width / INNER_WIDTH);
            setScale(next);
            setInnerHeight(inner.offsetHeight || INNER_HEIGHT_FALLBACK);
        };

        compute();

        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(compute);
            ro.observe(outer);
            ro.observe(inner);
            return () => ro.disconnect();
        }

        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, [outerRef, innerRef]);

    return { scale, innerHeight };
}

export const ContractsLoopFrame = () => {
    const { t } = useTranslation();
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const { phase, reduced } = useLoopPhase();
    const { scale, innerHeight } = useFitScale(outerRef, innerRef);

    const boxModel = boxModelFor(phase);
    const isNaked = phase === 'naked';
    const transition = reduced ? REDUCED_TRANSITION : CELL_TRANSITION;

    return (
        <div className="clf-root" data-phase={phase}>
            <div className="clf-bleed-outer" ref={outerRef}>
                <div
                    className="clf-scale-host"
                    style={{ height: innerHeight * scale }}
                >
                    <motion.div
                        ref={innerRef}
                        className="clf-inner"
                        variants={containerVariants}
                        initial={reduced ? false : 'hidden'}
                        animate={phase}
                        style={{
                            width: INNER_WIDTH,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                        }}
                    >
                        <div className="clf-stage-root">
                            <div className="clf-doc">
                                {/* Page header: title + filters + Import New */}
                                <motion.div
                                    className="clf-page-header"
                                    layout
                                    transition={transition}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end',
                                        gap: 16,
                                        padding: isNaked ? '2px 2px' : '0 4px',
                                        marginBottom: isNaked ? 6 : 16,
                                    }}
                                >
                                    <motion.h3
                                        layout
                                        variants={{
                                            hidden: { opacity: 0, y: 8 },
                                            naked: {
                                                opacity: 1,
                                                y: 0,
                                                color: '#000',
                                                fontSize: '24px',
                                                fontWeight: 700,
                                                fontFamily: NAKED.fontFamily,
                                                letterSpacing: 'normal',
                                            },
                                            styled: {
                                                opacity: 1,
                                                y: 0,
                                                color: '#17222d',
                                                fontSize: '28.8px',
                                                fontWeight: 800,
                                                fontFamily: TOKEN.fontFamily,
                                                letterSpacing: '-0.864px',
                                            },
                                        }}
                                        transition={transition}
                                        style={{
                                            margin: 0,
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        Contract Table
                                    </motion.h3>

                                    <motion.div
                                        className="clf-page-actions"
                                        layout
                                        transition={transition}
                                        style={{
                                            display: 'flex',
                                            gap: 12,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <motion.div
                                            layout
                                            variants={inputVariants}
                                            transition={transition}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                width: isNaked ? 'auto' : 170,
                                                height: isNaked ? 'auto' : 38,
                                                padding: isNaked
                                                    ? '1px 2px'
                                                    : '0 12px',
                                                borderRadius:
                                                    boxModel.inputBorderRadius,
                                                color: '#8896a1',
                                                justifyContent: 'space-between',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <span>All</span>
                                            <ChevronDown
                                                size={isNaked ? 12 : 14}
                                            />
                                        </motion.div>

                                        <motion.div
                                            layout
                                            variants={inputVariants}
                                            transition={transition}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                width: isNaked ? 'auto' : 190,
                                                height: isNaked ? 'auto' : 36,
                                                padding: isNaked
                                                    ? '1px 2px'
                                                    : '0 13.12px',
                                                borderRadius:
                                                    boxModel.inputBorderRadius,
                                            }}
                                        >
                                            <Search
                                                size={isNaked ? 12 : 16}
                                                color={
                                                    isNaked ? '#000' : '#7f8d97'
                                                }
                                            />
                                            <span
                                                style={{
                                                    color: isNaked
                                                        ? '#000'
                                                        : '#8896a1',
                                                    flex: 1,
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                Contracts Number
                                            </span>
                                        </motion.div>

                                        <motion.button
                                            type="button"
                                            layout
                                            variants={primaryButtonVariants}
                                            transition={transition}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 6,
                                                height: isNaked ? 'auto' : 36,
                                                padding: isNaked
                                                    ? '1px 6px'
                                                    : '0 16px',
                                                borderRadius:
                                                    boxModel.buttonBorderRadius,
                                                border: 'none',
                                                cursor: 'default',
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            <Plus size={isNaked ? 12 : 16} />
                                            <span>
                                                {t(
                                                    'project_p.frame.toolbar.import',
                                                )}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>

                                {/* Surface: border/shadow overlay + toolbar + table */}
                                <motion.div
                                    className="clf-surface"
                                    layout
                                    transition={transition}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius:
                                            boxModel.containerBorderRadius,
                                        backgroundColor: boxModel.containerBg,
                                    }}
                                >
                                    <motion.div
                                        aria-hidden
                                        variants={shadowVariants}
                                        transition={SHADOW_TRANSITION}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            pointerEvents: 'none',
                                            boxShadow: TOKEN.containerBoxShadow,
                                            borderRadius: 'inherit',
                                        }}
                                    />
                                    <ContractsToolbar phase={phase} />
                                    <ContractsTable phase={phase} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <p className="clf-caption">{t('project_p.frame.caption')}</p>
        </div>
    );
};
