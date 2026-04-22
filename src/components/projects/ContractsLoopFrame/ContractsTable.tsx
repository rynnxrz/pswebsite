import { motion, useReducedMotion } from 'framer-motion';
import MoreHorizontal from 'lucide-react/dist/esm/icons/more-horizontal';
import {
    boxModelFor,
    CELL_TRANSITION,
    cellVariants,
    COLUMN_LABELS,
    COLUMN_TEMPLATE,
    containerVariants,
    CONTRACT_ROWS,
    headerCellVariants,
    mutedCellVariants,
    REDUCED_TRANSITION,
    statusDotVariants,
    STATUS_DOT_COLOR,
    type ContractRow,
    type Phase,
} from './tokens';

interface ContractsTableProps {
    phase: Phase;
}

// Spec's §"已知风险" fallback: `<motion.td> + layout` is unreliable under
// browser table-layout algorithms. We render a CSS-grid "table" of motion
// divs with ARIA table roles instead.
export const ContractsTable = ({ phase }: ContractsTableProps) => {
    const reduced = !!useReducedMotion();
    const boxModel = boxModelFor(phase);
    const transition = reduced ? REDUCED_TRANSITION : CELL_TRANSITION;

    const firstColPaddingLeft = phase === 'naked' ? '2px' : '24px';
    const lastColPaddingRight = phase === 'naked' ? '2px' : '24px';

    return (
        <motion.div
            role="table"
            aria-label="Contracts"
            variants={containerVariants}
            className="clf-table"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {/* Header row */}
            <motion.div
                role="row"
                variants={containerVariants}
                layout
                transition={transition}
                style={{
                    display: 'grid',
                    gridTemplateColumns: COLUMN_TEMPLATE,
                    width: '100%',
                    height: phase === 'naked' ? 'auto' : 38,
                }}
            >
                {COLUMN_LABELS.map((label, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === COLUMN_LABELS.length - 1;
                    const padLeft = isFirst ? firstColPaddingLeft : undefined;
                    const padRight = isLast ? lastColPaddingRight : undefined;

                    const [padBlock, padInline] = boxModel.cellPadding.split(' ');
                    const resolvedPadding = `${padBlock} ${padRight ?? padInline} ${padBlock} ${padLeft ?? padInline}`;

                    return (
                        <motion.div
                            key={`head-${idx}`}
                            role="columnheader"
                            variants={headerCellVariants}
                            layout
                            transition={transition}
                            style={{
                                padding: resolvedPadding,
                                textAlign: idx === 5 ? 'right' : 'left',
                                whiteSpace: 'nowrap',
                                lineHeight: phase === 'naked' ? 1.4 : '16.8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: idx === 5 ? 'flex-end' : 'flex-start',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {label}
                        </motion.div>
                    );
                })}
            </motion.div>

            {CONTRACT_ROWS.map((row) => (
                <BodyRow
                    key={row.contractNo}
                    row={row}
                    phase={phase}
                    transition={transition}
                    firstColPaddingLeft={firstColPaddingLeft}
                    lastColPaddingRight={lastColPaddingRight}
                />
            ))}
        </motion.div>
    );
};

interface BodyRowProps {
    row: ContractRow;
    phase: Phase;
    transition: typeof CELL_TRANSITION;
    firstColPaddingLeft: string;
    lastColPaddingRight: string;
}

function BodyRow({
    row,
    phase,
    transition,
    firstColPaddingLeft,
    lastColPaddingRight,
}: BodyRowProps) {
    const boxModel = boxModelFor(phase);
    const [padBlock, padInline] = boxModel.cellPadding.split(' ');

    const firstPad = `${padBlock} ${padInline} ${padBlock} ${firstColPaddingLeft}`;
    const innerPad = `${padBlock} ${padInline}`;
    const lastPad = `${padBlock} ${lastColPaddingRight} ${padBlock} ${padInline}`;

    return (
        <motion.div
            role="row"
            variants={containerVariants}
            layout
            transition={transition}
            style={{
                display: 'grid',
                gridTemplateColumns: COLUMN_TEMPLATE,
                width: '100%',
            }}
        >
            <motion.div
                role="cell"
                variants={mutedCellVariants}
                layout
                transition={transition}
                style={{ ...cellBase(firstPad, phase), fontVariantNumeric: 'tabular-nums' }}
            >
                {row.date}
            </motion.div>

            <motion.div
                role="cell"
                variants={cellVariants}
                layout
                transition={transition}
                style={{ ...cellBase(innerPad, phase), fontVariantNumeric: 'tabular-nums' }}
            >
                {row.contractNo}
            </motion.div>

            <motion.div
                role="cell"
                variants={cellVariants}
                layout
                transition={transition}
                style={cellBase(innerPad, phase)}
            >
                {row.brand}
            </motion.div>

            <motion.div
                role="cell"
                variants={cellVariants}
                layout
                transition={transition}
                style={cellBase(innerPad, phase)}
            >
                {row.product}
            </motion.div>

            <motion.div
                role="cell"
                variants={mutedCellVariants}
                layout
                transition={transition}
                style={cellBase(innerPad, phase)}
            >
                {row.spec}
            </motion.div>

            <motion.div
                role="cell"
                variants={cellVariants}
                layout
                transition={transition}
                style={{
                    ...cellBase(innerPad, phase),
                    justifyContent: 'flex-end',
                    fontVariantNumeric: 'tabular-nums',
                }}
            >
                {row.qty}
            </motion.div>

            <motion.div
                role="cell"
                variants={cellVariants}
                layout
                transition={transition}
                style={{ ...cellBase(innerPad, phase), gap: phase === 'naked' ? 4 : 8 }}
            >
                <motion.span
                    aria-hidden
                    variants={statusDotVariants}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                        display: 'inline-block',
                        flex: '0 0 auto',
                        width: phase === 'styled' ? 7.68 : 0,
                        height: 7.68,
                        borderRadius: 9999,
                        backgroundColor: STATUS_DOT_COLOR[row.statusTone],
                    }}
                />
                <span
                    style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        gap: phase === 'styled' ? 1.28 : 0,
                        lineHeight: 1.4,
                    }}
                >
                    <span
                        style={{
                            fontWeight: phase === 'styled' ? 700 : 'inherit',
                            color: phase === 'styled' ? '#2f343b' : 'inherit',
                            fontSize: phase === 'styled' ? 12 : 'inherit',
                        }}
                    >
                        {row.statusTitle}
                    </span>
                    {row.statusSubtitle && (
                        <span
                            style={{
                                fontWeight: phase === 'styled' ? 500 : 'inherit',
                                color: phase === 'styled' ? '#2f343b' : 'inherit',
                                fontSize: phase === 'styled' ? 12 : 'inherit',
                            }}
                        >
                            {row.statusSubtitle}
                        </span>
                    )}
                </span>
            </motion.div>

            <motion.div
                role="cell"
                variants={mutedCellVariants}
                layout
                transition={transition}
                style={{
                    ...cellBase(lastPad, phase),
                    justifyContent: 'center',
                }}
            >
                <motion.button
                    type="button"
                    aria-label="Actions"
                    layout
                    transition={transition}
                    style={{
                        width: phase === 'styled' ? 26.4 : 'auto',
                        height: phase === 'styled' ? 26.4 : 'auto',
                        padding: phase === 'naked' ? '1px 4px' : 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                            phase === 'naked' ? 'rgb(239, 239, 239)' : 'transparent',
                        boxShadow:
                            phase === 'naked'
                                ? 'inset 0 0 0 2px rgb(118, 118, 118)'
                                : 'none',
                        borderRadius: phase === 'naked' ? 0 : 6,
                        border: 'none',
                        color: phase === 'naked' ? '#000' : '#6a7b85',
                        cursor: 'default',
                        fontFamily: 'inherit',
                    }}
                >
                    <MoreHorizontal size={phase === 'naked' ? 12 : 14} />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

function cellBase(padding: string, phase: Phase): React.CSSProperties {
    return {
        padding,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        lineHeight: phase === 'naked' ? 1.2 : '18.2px',
        minHeight: phase === 'naked' ? 'auto' : 34,
    };
}
