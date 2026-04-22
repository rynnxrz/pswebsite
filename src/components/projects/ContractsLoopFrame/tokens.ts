// Tokens and variants for the Contracts Loop frame animation.
// Values sourced from design-extract.md §1.1–1.7 and §4.
// NAKED = Chromium UA defaults (what the browser renders with no styles).
// TOKEN = the Ora design system applied to the contracts table.

import type { Transition, Variants } from 'framer-motion';

// Phase model — 3-phase loop, 12 s total.
//   hidden (1.5 s)  — everything at opacity 0, y+8 (pre-enter state)
//   naked  (3.5 s)  — UA-default rendering; the "before" state
//   styled (7.0 s)  — ORA design-system applied; the "after" state

export type Phase = 'hidden' | 'naked' | 'styled';

export const PHASE_DURATION: Record<Phase, number> = {
    hidden: 1500,
    naked:  3500,
    styled: 7000,
};

export const NEXT: Record<Phase, Phase> = {
    hidden: 'naked',
    naked:  'styled',
    styled: 'hidden',
};

// Font stacks — shared by NAKED / TOKEN constants below.

const SYSTEM_FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif';

const SERIF_FONT = '"Times New Roman", Times, serif';

// NAKED — Chromium user-agent defaults.
// mutedColor intentionally equals textColor so the bare table has no visual
// hierarchy (matches how raw HTML renders).
export const NAKED = {
    cellPadding: '1px 2px',
    cellBoxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)',
    fontFamily: SERIF_FONT,
    fontSize: '16px',
    bodyFontWeight: 400,
    textColor: '#000000',
    mutedColor: '#000000',
    rowBg: 'rgba(255,255,255,0)',

    theadBg: 'rgba(255,255,255,0)',
    theadColor: '#000000',
    theadFontSize: '16px',
    theadFontWeight: 700,
    theadLetterSpacing: 'normal',
    theadTextTransform: 'none' as const,
    theadBoxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)',

    buttonPadding: '1px 6px',
    buttonBg: 'rgb(239, 239, 239)',
    buttonColor: '#000000',
    buttonBoxShadow: 'inset 0 0 0 2px rgb(118, 118, 118)',
    buttonFontFamily: SERIF_FONT,
    buttonFontSize: '13.333px',
    buttonFontWeight: 400,
    buttonBorderRadius: '0px',

    inputPadding: '1px 2px',
    inputBg: '#ffffff',
    inputBoxShadow: 'inset 0 0 0 2px rgb(118, 118, 118)',
    inputFontFamily: SERIF_FONT,
    inputFontSize: '13.333px',
    inputBorderRadius: '0px',
    inputColor: '#000000',

    containerBg: 'rgba(255,255,255,0)',
    containerBoxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)',
    containerBorderRadius: '0px',

    toolbarBoxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)',

    pillBg: 'rgb(239, 239, 239)',
    pillBoxShadow: 'inset 0 0 0 2px rgb(118, 118, 118)',
    pillColor: '#000000',
    pillBorderRadius: '0px',
    pillFontSize: '13.333px',
    pillFontWeight: 400,
    pillActiveBg: 'rgb(239, 239, 239)',
    pillActiveColor: '#000000',
    pillActiveBoxShadow: 'inset 0 0 0 2px rgb(118, 118, 118)',

    tabBg: 'rgb(239, 239, 239)',
    tabColor: '#000000',
    tabBoxShadow: 'inset 0 0 0 2px rgb(118, 118, 118)',
    tabActiveBg: 'rgb(239, 239, 239)',
    tabActiveColor: '#000000',
    tabFontSize: '13.333px',
    tabFontWeight: 400,
    tabBorderRadius: '0px',
};

// TOKEN — Ora design system, sourced from design-extract.md §1.1–1.7 and §4.
export const TOKEN = {
    // Table cells (§4 .data td)
    cellPadding: '8px 12px',
    cellBoxShadow: '0 1px 0 0 #e6edf2 inset',
    fontFamily: SYSTEM_FONT,
    fontSize: '13px',
    bodyFontWeight: 400,
    textColor: '#2f3c49',
    mutedColor: '#616a76',
    rowBg: '#ffffff',

    // Thead (§4 .data thead th)
    theadBg: '#f7f8fa',
    theadColor: '#616a76',
    theadFontSize: '12px',
    theadFontWeight: 600,
    theadLetterSpacing: '0.48px',
    theadTextTransform: 'uppercase' as const,
    theadBoxShadow: '0 -1px 0 0 #d1d6dd inset',

    // Primary button (§4 .primary-btn) — "+ Import New"
    buttonPadding: '0 16px',
    buttonBg: '#2b7f8c',
    buttonColor: '#ffffff',
    buttonBoxShadow: '0 1px 2px rgba(23, 34, 45, 0.06)',
    buttonFontFamily: SYSTEM_FONT,
    buttonFontSize: '14.72px',
    buttonFontWeight: 700,
    buttonBorderRadius: '8px',

    // Search input (§4 .search-field)
    inputPadding: '0 13.12px',
    inputBg: '#ffffff',
    inputBoxShadow: 'inset 0 0 0 1px #bfcad1',
    inputFontFamily: SYSTEM_FONT,
    inputFontSize: '13px',
    inputBorderRadius: '8px',
    inputColor: '#17222d',

    // Surface card (§1.2, §4 .surface) — border only, no drop shadow.
    containerBg: '#ffffff',
    containerBoxShadow: 'inset 0 0 0 1px #d6dee4',
    containerBorderRadius: '8px',

    // Toolbar bottom divider (§4 .toolbar)
    toolbarBoxShadow: '0 1px 0 0 #dde7ec inset',

    // Status pills (§4 .status-pill)
    pillBg: '#ffffff',
    pillBoxShadow: 'inset 0 0 0 1px #ccd7de, 0 1px 2px rgba(23, 34, 45, 0.06)',
    pillColor: '#27414b',
    pillBorderRadius: '6px',
    pillFontSize: '13.76px',
    pillFontWeight: 700,
    pillActiveBg: '#177187',
    pillActiveColor: '#ffffff',
    pillActiveBoxShadow: 'inset 0 0 0 1px #177187, 0 1px 2px rgba(23, 34, 45, 0.06)',

    // Tabs (§4 .tab)
    tabBg: 'rgba(228, 241, 244, 0)',
    tabColor: '#31424d',
    tabBoxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)',
    tabActiveBg: '#e4f1f4',
    tabActiveColor: '#0e6173',
    tabFontSize: '13.12px',
    tabFontWeight: 700,
    tabBorderRadius: '6px',
};

export const STATUS_DOT_COLOR = {
    red: '#ef4444',
    orange: '#f59e0b',
    green: '#10b981',
    grey: '#7f8d97',
} as const;

export type StatusTone = keyof typeof STATUS_DOT_COLOR;

// Box-model mapping.
// styled → TOKEN. hidden inherits TOKEN too, so styled→hidden doesn't snap
// the layout back to naked's 1px padding (spec constraint #3).
// Only naked renders the UA box-model.
export function boxModelFor(phase: Phase) {
    return phase === 'naked' ? NAKED : TOKEN;
}

// Variants — every variant has exactly 3 keys: hidden / naked / styled.

const HIDDEN_CELL = { opacity: 0, y: 8 };

// Top-level container — controls stagger only, no visual change.
export const containerVariants: Variants = {
    hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
    naked:  { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    styled: { transition: { staggerChildren: 0.10 } },
};

export const cellVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.textColor,
        backgroundColor: NAKED.rowBg,
        boxShadow: NAKED.cellBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.fontSize,
        fontWeight: NAKED.bodyFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.textColor,
        backgroundColor: TOKEN.rowBg,
        boxShadow: TOKEN.cellBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.fontSize,
        fontWeight: TOKEN.bodyFontWeight,
    },
};

export const mutedCellVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.mutedColor,
        backgroundColor: NAKED.rowBg,
        boxShadow: NAKED.cellBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.fontSize,
        fontWeight: NAKED.bodyFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.mutedColor,
        backgroundColor: TOKEN.rowBg,
        boxShadow: TOKEN.cellBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.fontSize,
        fontWeight: TOKEN.bodyFontWeight,
    },
};

export const headerCellVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.theadColor,
        backgroundColor: NAKED.theadBg,
        boxShadow: NAKED.theadBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.theadFontSize,
        fontWeight: NAKED.theadFontWeight,
        letterSpacing: NAKED.theadLetterSpacing,
        textTransform: NAKED.theadTextTransform,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.theadColor,
        backgroundColor: TOKEN.theadBg,
        boxShadow: TOKEN.theadBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.theadFontSize,
        fontWeight: TOKEN.theadFontWeight,
        letterSpacing: TOKEN.theadLetterSpacing,
        textTransform: TOKEN.theadTextTransform,
    },
};

// Overlay used for the container's drop-in border + radius.
export const shadowVariants: Variants = {
    hidden: { opacity: 0, borderRadius: '0px' },
    naked:  { opacity: 0, borderRadius: '0px' },
    styled: { opacity: 1, borderRadius: TOKEN.containerBorderRadius },
};

export const toolbarDividerVariants: Variants = {
    hidden: { opacity: 0 },
    naked:  { opacity: 0 },
    styled: { opacity: 1 },
};

export const primaryButtonVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.buttonColor,
        backgroundColor: NAKED.buttonBg,
        boxShadow: NAKED.buttonBoxShadow,
        fontFamily: NAKED.buttonFontFamily,
        fontSize: NAKED.buttonFontSize,
        fontWeight: NAKED.buttonFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.buttonColor,
        backgroundColor: TOKEN.buttonBg,
        boxShadow: TOKEN.buttonBoxShadow,
        fontFamily: TOKEN.buttonFontFamily,
        fontSize: TOKEN.buttonFontSize,
        fontWeight: TOKEN.buttonFontWeight,
    },
};

export const pillIdleVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.pillColor,
        backgroundColor: NAKED.pillBg,
        boxShadow: NAKED.pillBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.pillFontSize,
        fontWeight: NAKED.pillFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.pillColor,
        backgroundColor: TOKEN.pillBg,
        boxShadow: TOKEN.pillBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.pillFontSize,
        fontWeight: TOKEN.pillFontWeight,
    },
};

export const pillActiveVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.pillActiveColor,
        backgroundColor: NAKED.pillActiveBg,
        boxShadow: NAKED.pillActiveBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.pillFontSize,
        fontWeight: NAKED.pillFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.pillActiveColor,
        backgroundColor: TOKEN.pillActiveBg,
        boxShadow: TOKEN.pillActiveBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.pillFontSize,
        fontWeight: TOKEN.pillFontWeight,
    },
};

export const tabIdleVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.tabColor,
        backgroundColor: NAKED.tabBg,
        boxShadow: NAKED.tabBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.tabFontSize,
        fontWeight: NAKED.tabFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.tabColor,
        backgroundColor: TOKEN.tabBg,
        boxShadow: TOKEN.tabBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.tabFontSize,
        fontWeight: TOKEN.tabFontWeight,
    },
};

export const tabActiveVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.tabActiveColor,
        backgroundColor: NAKED.tabActiveBg,
        boxShadow: NAKED.tabBoxShadow,
        fontFamily: NAKED.fontFamily,
        fontSize: NAKED.tabFontSize,
        fontWeight: NAKED.tabFontWeight,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.tabActiveColor,
        backgroundColor: TOKEN.tabActiveBg,
        boxShadow: TOKEN.tabBoxShadow,
        fontFamily: TOKEN.fontFamily,
        fontSize: TOKEN.tabFontSize,
        fontWeight: TOKEN.tabFontWeight,
    },
};

export const inputVariants: Variants = {
    hidden: HIDDEN_CELL,
    naked: {
        opacity: 1,
        y: 0,
        color: NAKED.inputColor,
        backgroundColor: NAKED.inputBg,
        boxShadow: NAKED.inputBoxShadow,
        fontFamily: NAKED.inputFontFamily,
        fontSize: NAKED.inputFontSize,
    },
    styled: {
        opacity: 1,
        y: 0,
        color: TOKEN.inputColor,
        backgroundColor: TOKEN.inputBg,
        boxShadow: TOKEN.inputBoxShadow,
        fontFamily: TOKEN.inputFontFamily,
        fontSize: TOKEN.inputFontSize,
    },
};

export const statusDotVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    naked:  { opacity: 0, scale: 0 },
    styled: { opacity: 1, scale: 1 },
};

// Shared transitions. Per spec constraint #1: never `transition: all`.
// fontSize lands a touch before layout FLIP so type is settled before the
// box-model snaps to its new width — avoids a visible collision.
export const CELL_TRANSITION: Transition = {
    layout:   { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    fontSize: { duration: 0.35, ease: 'easeOut' },
    default:  { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
};

export const SHADOW_TRANSITION: Transition = {
    duration: 0.6,
    ease: 'easeOut',
};

export const REDUCED_TRANSITION: Transition = { duration: 0 };

// Contracts table data — column widths, template, rows, labels.

// Widths sum to INNER_WIDTH (900px) so the last column's right edge aligns
// with the toolbar's right padding. Product absorbs the slack.
export const COLUMN_WIDTHS = {
    date: 96,
    contractNo: 120,
    brand: 56,
    product: 248,
    spec: 120,
    qty: 80,
    status: 140,
    actions: 40,
} as const;

export const COLUMN_TEMPLATE = [
    COLUMN_WIDTHS.date,
    COLUMN_WIDTHS.contractNo,
    COLUMN_WIDTHS.brand,
    COLUMN_WIDTHS.product,
    COLUMN_WIDTHS.spec,
    COLUMN_WIDTHS.qty,
    COLUMN_WIDTHS.status,
    COLUMN_WIDTHS.actions,
]
    .map((w) => `${w}px`)
    .join(' ');

export interface ContractRow {
    date: string;
    contractNo: string;
    brand: string;
    product: string;
    spec: string;
    qty: string;
    statusTitle: string;
    statusSubtitle?: string;
    statusTone: StatusTone;
}

export const CONTRACT_ROWS: ContractRow[] = [
    {
        date: '01/01/2026',
        contractNo: 'LTUM-202600001',
        brand: 'Little',
        product: 'Liquid Calcium (Xylitol V2)',
        spec: '10 ml / sachet',
        qty: '900,000',
        statusTitle: 'Pending',
        statusSubtitle: 'Scheduling',
        statusTone: 'red',
    },
    {
        date: '04/03/2026',
        contractNo: 'ORA-2026-002',
        brand: 'Ora',
        product: 'Protein Powder',
        spec: '20 g / box',
        qty: '300',
        statusTitle: 'Pending',
        statusSubtitle: 'Production',
        statusTone: 'orange',
    },
    {
        date: '12/03/2026',
        contractNo: 'LTUM-202600003',
        brand: 'Little',
        product: 'Fiber Drink',
        spec: '30 ml / sachet',
        qty: '240,000',
        statusTitle: 'Production',
        statusSubtitle: 'On-Going',
        statusTone: 'orange',
    },
    {
        date: '22/03/2026',
        contractNo: 'LTUM-202600004',
        brand: 'Little',
        product: 'Multivitamin',
        spec: '500 mg / tab',
        qty: '60,000',
        statusTitle: 'Done',
        statusTone: 'green',
    },
    {
        date: '29/03/2026',
        contractNo: 'ORA-2026-005',
        brand: 'Ora',
        product: 'Collagen Peptide',
        spec: '10 g / sachet',
        qty: '450,000',
        statusTitle: 'Pending',
        statusSubtitle: 'Preparation',
        statusTone: 'red',
    },
    {
        date: '04/04/2026',
        contractNo: 'LTUM-202600006',
        brand: 'Little',
        product: 'Vitamin D3 Drops',
        spec: '15 ml / bottle',
        qty: '90,000',
        statusTitle: 'New',
        statusSubtitle: 'Contract',
        statusTone: 'grey',
    },
];

export const COLUMN_LABELS = [
    'Date',
    'Contract No',
    'Brand',
    'Product',
    'Spec',
    'Qty',
    'Status',
    '',
] as const;
