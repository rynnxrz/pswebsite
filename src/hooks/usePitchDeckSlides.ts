import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

export interface PitchSlide {
    type: 'title' | 'statement' | 'visual' | 'decision' | 'reflection';
    content: {
        headline?: string;
        subheadline?: string;
        body?: string;
        stat?: { value: string; label: string };
        media?: string; // video/image path
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

function getOraSlides(t: TFunction): PitchSlide[] {
    const slides: PitchSlide[] = [];

    // 1. Title slide
    slides.push({
        type: 'title',
        content: {
            headline: t('project_p.header.title'),
            subheadline: t('project_p.header.date'),
        },
    });

    // 2. Statement slide - summary title only
    slides.push({
        type: 'statement',
        content: {
            headline: t('project_p.summary.title'),
        },
    });

    // 3. Visual slide - workload breakdown
    slides.push({
        type: 'visual',
        content: {
            headline: t('project_p.problem.broken_decision.title'),
            stat: { value: '54%', label: t('workloadGraph.dataEntry') },
        },
    });

    // 4-6. Decision slides
    const movesData = t('project_p.design_moves.moves', { returnObjects: true });
    const moves = Array.isArray(movesData) ? movesData : [];
    const oraVideoMap = [
        '/assets/images/ora-web/videoloop/01contractable.mp4',
        '/assets/images/ora-web/videoloop/02editcontracts.mp4',
        '/assets/images/ora-web/videoloop/03dashboard.mp4',
    ];
    moves.forEach((move: any, index: number) => {
        slides.push({
            type: 'decision',
            content: {
                headline: `0${index + 1}. ${move.headline}`,
                body: move.solution?.body,
                media: oraVideoMap[index] || oraVideoMap[0],
            },
        });
    });

    // 7. Reflection slide
    slides.push({
        type: 'reflection',
        content: {
            headline: t('project_p.reflection.title'),
        },
    });

    return slides;
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
