import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

/**
 * Named components that can be embedded inside a slide via `content.component`
 * or inside a split slot. Each key maps to a real React component in the
 * PitchDeckModal's componentMap.
 */
export type PitchComponentKey =
    | 'WorkloadAnalysisGraph'
    | 'UserStakeholdersGraph'
    | 'UserVoiceQuotes'
    | 'OraModelShiftSchematic'
    | 'ContractsLoopFrame';

/**
 * STAR label rendered above the headline on every non-title slide.
 * e.g. { letter: 'A', step: '01', name: 'INSIGHT' } → "A · 01 · INSIGHT"
 */
export interface StarLabel {
    letter: 'S' | 'T' | 'A' | 'R';
    step?: string;
    name?: string;
}

export interface PainResponseRow {
    problem: string;
    response: string;
}

export interface SplitSlot {
    component?: PitchComponentKey;
    componentProps?: Record<string, unknown>;
    media?: string; // mp4 or image path
    textList?: PainResponseRow[];
}

export interface PitchSlide {
    type: 'title' | 'statement' | 'visual' | 'decision' | 'reflection' | 'split';
    content: {
        starLabel?: StarLabel;
        headline?: string;
        subheadline?: string;
        body?: string;
        stat?: { value: string; label: string };
        media?: string;
        /** For `visual` type: replace stat/quote with a named component. */
        component?: PitchComponentKey;
        componentProps?: Record<string, unknown>;
        /** For `split` type: left/right slot content. */
        left?: SplitSlot;
        right?: SplitSlot;
    };
}

type ProjectId = 'project_p' | 'ivy';

/**
 * Extract minimal, visual-first slides from project translation data.
 * Uses exact original sentences - no rephrasing, only reduction.
 */
export function usePitchDeckSlides(projectId: ProjectId): PitchSlide[] {
    const { t } = useTranslation();

    if (projectId === 'project_p') {
        return getOraSlides(t);
    } else if (projectId === 'ivy') {
        return getIvySlides(t);
    }

    return [];
}

/**
 * ORA Web · STAR-structured 7-slide deck.
 * Screen = STAR label + visual + minimal headline. Narration is verbal.
 *
 * Slide 1  Title        — ORA Web + date (no STAR label)
 * Slide 2  S · Situation — 4 Google Sheets + Dynamics 365 fragmentation (text-only)
 * Slide 3  T · Task      — UserStakeholdersGraph (three-tier role mapping)
 * Slide 4  A · 01 INSIGHT    — split: WorkloadAnalysisGraph (54/37/9) + Flora quote
 * Slide 5  A · 02 MODEL SHIFT — OraModelShiftSchematic (dept → order object)
 * Slide 6  A · 03 UI         — ContractsLoopFrame (looping token → naked → styled)
 * Slide 7  R · Result         — split: pain→response list + dashboard video
 */
function getOraSlides(t: TFunction): PitchSlide[] {
    const painResponse = t('project_p.pitchv2.r.painResponse', {
        returnObjects: true,
    }) as PainResponseRow[];

    return [
        // 1. Title
        {
            type: 'title',
            content: {
                headline: t('project_p.header.title'),
                subheadline: t('project_p.header.date'),
            },
        },
        // 2. S · Situation — text-only
        {
            type: 'statement',
            content: {
                starLabel: { letter: 'S', name: 'SITUATION' },
                headline: t('project_p.pitchv2.s.headline'),
            },
        },
        // 3. T · Task — UserStakeholdersGraph
        {
            type: 'visual',
            content: {
                starLabel: { letter: 'T', name: 'TASK' },
                headline: t('project_p.pitchv2.t.headline'),
                component: 'UserStakeholdersGraph',
            },
        },
        // 4. A · 01 INSIGHT — split (chart + Flora quote)
        {
            type: 'split',
            content: {
                starLabel: { letter: 'A', step: '01', name: 'INSIGHT' },
                headline: t('project_p.pitchv2.a01.headline'),
                left: { component: 'WorkloadAnalysisGraph' },
                right: {
                    component: 'UserVoiceQuotes',
                    componentProps: { filterRole: 'Flora' },
                },
            },
        },
        // 5. A · 02 MODEL SHIFT — OraModelShiftSchematic
        {
            type: 'visual',
            content: {
                starLabel: { letter: 'A', step: '02', name: 'MODEL SHIFT' },
                headline: t('project_p.pitchv2.a02.headline'),
                component: 'OraModelShiftSchematic',
            },
        },
        // 6. A · 03 UI — ContractsLoopFrame (looping animation)
        {
            type: 'visual',
            content: {
                starLabel: { letter: 'A', step: '03', name: 'UI' },
                headline: t('project_p.pitchv2.a03.headline'),
                component: 'ContractsLoopFrame',
            },
        },
        // 7. R · Result — split (pain→response list + dashboard video)
        {
            type: 'split',
            content: {
                starLabel: { letter: 'R', name: 'RESULT' },
                headline: t('project_p.pitchv2.r.headline'),
                left: {
                    textList: Array.isArray(painResponse) ? painResponse : [],
                },
                right: {
                    media: '/assets/images/ora-web/videoloop/03dashboard.mp4',
                },
            },
        },
    ];
}

function getIvySlides(t: TFunction): PitchSlide[] {
    const slides: PitchSlide[] = [];

    // 1. Title slide
    slides.push({
        type: 'title',
        content: {
            headline: t('ivy.header.title'),
            subheadline: t('ivy.header.date'),
        },
    });

    // 2. Statement slide
    slides.push({
        type: 'statement',
        content: {
            headline: t('ivy.summary.title'),
        },
    });

    // 3. Visual slide - context quote
    slides.push({
        type: 'visual',
        content: {
            headline: t('ivy.context.title'),
            body: t('ivy.context.quote'),
        },
    });

    // 4-7. Decision slides
    const decisionKeys = ['d1', 'd2', 'd3', 'd4'];
    decisionKeys.forEach((key, index) => {
        slides.push({
            type: 'decision',
            content: {
                headline: t(`ivy.decisions.${key}.title`),
                body: t(`ivy.decisions.${key}.solution`),
                media: `/assets/images/ivy-j/videoloop/0${index + 1}.mp4`,
            },
        });
    });

    // 8. Reflection slide
    const reflectionData = t('ivy.reflection.content', { returnObjects: true });
    const reflectionContent = Array.isArray(reflectionData) ? reflectionData : [];
    slides.push({
        type: 'reflection',
        content: {
            headline: t('ivy.reflection.title'),
            body: reflectionContent.length > 0 ? reflectionContent[0]?.heading : undefined,
        },
    });

    return slides;
}
