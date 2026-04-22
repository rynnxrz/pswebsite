import { motion, useReducedMotion } from 'framer-motion';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Settings from 'lucide-react/dist/esm/icons/settings';
import {
    boxModelFor,
    CELL_TRANSITION,
    containerVariants,
    pillActiveVariants,
    pillIdleVariants,
    REDUCED_TRANSITION,
    tabActiveVariants,
    tabIdleVariants,
    toolbarDividerVariants,
    type Phase,
} from './tokens';

interface ContractsToolbarProps {
    phase: Phase;
}

export const ContractsToolbar = ({ phase }: ContractsToolbarProps) => {
    const reduced = !!useReducedMotion();
    const boxModel = boxModelFor(phase);
    const transition = reduced ? REDUCED_TRANSITION : CELL_TRANSITION;

    const toolbarPadding = phase === 'naked' ? '4px 6px' : '12px 0 10.4px';
    const pillPadding = phase === 'naked' ? '1px 6px' : '0 13.6px';
    const pillHeight = phase === 'naked' ? 'auto' : '36px';
    const tabPadding = phase === 'naked' ? '1px 6px' : '0 12.8px';
    const tabHeight = phase === 'naked' ? 'auto' : '36px';

    return (
        <motion.div
            className="clf-toolbar"
            variants={containerVariants}
            layout
            transition={transition}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: toolbarPadding,
                position: 'relative',
            }}
        >
            {/* Toolbar bottom-divider overlay — fades in only on styled. */}
            <motion.div
                aria-hidden
                variants={toolbarDividerVariants}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    backgroundColor: '#dde7ec',
                    pointerEvents: 'none',
                }}
            />

            {/* Left: filter pills + More */}
            <motion.div
                className="clf-toolbar-left"
                variants={containerVariants}
                layout
                transition={transition}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: phase === 'naked' ? 6 : 12,
                    paddingLeft: phase === 'naked' ? 0 : 10.4,
                    flexWrap: 'wrap',
                }}
            >
                <motion.button
                    type="button"
                    variants={pillActiveVariants}
                    layout
                    transition={transition}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: phase === 'naked' ? 4 : 7.2,
                        padding: pillPadding,
                        height: pillHeight,
                        minHeight: phase === 'naked' ? 'auto' : 36,
                        borderRadius: boxModel.pillBorderRadius,
                        border: 'none',
                        cursor: 'default',
                        lineHeight: 1.2,
                    }}
                >
                    <span>All</span>
                    <span style={{ opacity: 0.7 }}>·</span>
                    <strong style={{ fontWeight: 700 }}>6</strong>
                </motion.button>

                <motion.button
                    type="button"
                    variants={pillIdleVariants}
                    layout
                    transition={transition}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: phase === 'naked' ? 4 : 7.2,
                        padding: pillPadding,
                        height: pillHeight,
                        minHeight: phase === 'naked' ? 'auto' : 36,
                        borderRadius: boxModel.pillBorderRadius,
                        border: 'none',
                        cursor: 'default',
                        lineHeight: 1.2,
                    }}
                >
                    <span>Pending Scheduling</span>
                    <span style={{ opacity: 0.7 }}>·</span>
                    <strong style={{ fontWeight: 700 }}>3</strong>
                </motion.button>

                <motion.button
                    type="button"
                    variants={pillIdleVariants}
                    layout
                    transition={transition}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: phase === 'naked' ? 4 : 7,
                        padding: phase === 'naked' ? '1px 6px' : '0 12.8px',
                        height: pillHeight,
                        minHeight: phase === 'naked' ? 'auto' : 36,
                        borderRadius: phase === 'naked' ? '0px' : '8px',
                        border: 'none',
                        cursor: 'default',
                        lineHeight: 1.2,
                    }}
                >
                    <span>More</span>
                    <ChevronDown size={phase === 'naked' ? 12 : 14} strokeWidth={2.2} />
                </motion.button>
            </motion.div>

            {/* Right: tabs + settings */}
            <motion.div
                className="clf-toolbar-right"
                variants={containerVariants}
                layout
                transition={transition}
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: phase === 'naked' ? 0 : 24,
                    paddingLeft: phase === 'naked' ? 0 : 12,
                    borderLeft:
                        phase === 'styled' ? '1px solid #dde7ec' : '1px solid transparent',
                }}
            >
                <motion.div
                    className="clf-tabs-list"
                    variants={containerVariants}
                    layout
                    transition={transition}
                    role="tablist"
                    style={{
                        display: 'inline-flex',
                        gap: phase === 'naked' ? 4 : 3.2,
                    }}
                >
                    {(['Reqs', 'Finance', 'Pkg', 'Plan'] as const).map((label, idx) => {
                        const isActive = idx === 0;
                        return (
                            <motion.button
                                key={label}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                variants={isActive ? tabActiveVariants : tabIdleVariants}
                                layout
                                transition={transition}
                                style={{
                                    minWidth: phase === 'naked' ? 'auto' : 64,
                                    minHeight: phase === 'naked' ? 'auto' : 36,
                                    padding: tabPadding,
                                    height: tabHeight,
                                    borderRadius: boxModel.tabBorderRadius,
                                    border: 'none',
                                    cursor: 'default',
                                    lineHeight: 1.2,
                                }}
                            >
                                {label}
                            </motion.button>
                        );
                    })}
                </motion.div>

                <motion.button
                    type="button"
                    aria-label="Column settings"
                    variants={tabIdleVariants}
                    layout
                    transition={transition}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: phase === 'naked' ? 'auto' : 36,
                        height: phase === 'naked' ? 'auto' : 36,
                        padding: phase === 'naked' ? '1px 6px' : 0,
                        borderRadius: boxModel.tabBorderRadius,
                        border: 'none',
                        cursor: 'default',
                        color: phase === 'naked' ? '#000' : '#5f707a',
                    }}
                >
                    <Settings size={phase === 'naked' ? 12 : 16} />
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
