import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import Layers from 'lucide-react/dist/esm/icons/layers';
import FileWarning from 'lucide-react/dist/esm/icons/file-warning';
import Image from 'lucide-react/dist/esm/icons/image';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import ClipboardCheck from 'lucide-react/dist/esm/icons/clipboard-check';
import styles from './FrictionWorkflow.module.css';
import { useOnScreen } from '../../../hooks/useOnScreen';

// --- Case 1: Workflow Graph Helpers ---
type LaneKey = 'top' | 'middle' | 'bottom';

const buildSmoothPath = (points: Array<{ x: number; y: number }>) => {
    return points.reduce((path, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const prev = points[index - 1];
        const dx = point.x - prev.x;
        const c1x = prev.x + dx * 0.5;
        const c2x = point.x - dx * 0.5;
        return `${path} C ${c1x} ${prev.y} ${c2x} ${point.y} ${point.x} ${point.y}`;
    }, '');
};

export const FrictionWorkflow = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);
    const [fatigueLevel, setFatigueLevel] = useState(0);

    // --- Animation Logic for Case 1 ---
    useEffect(() => {
        if (!isVisible) {
            setFatigueLevel(0);
            return;
        }

        const durationMs = 8000;
        const idleDelayMs = 800;
        let animationFrame: number | null = null;
        let idleTimeoutId: number | null = null;

        const startRamp = () => {
            const startTime = performance.now();
            const step = (now: number) => {
                const elapsed = now - startTime;
                const nextLevel = Math.min(elapsed / durationMs, 1);
                setFatigueLevel(nextLevel);
                if (nextLevel < 1) {
                    animationFrame = window.requestAnimationFrame(step);
                }
            };
            animationFrame = window.requestAnimationFrame(step);
        };

        const resetOnActivity = () => {
            setFatigueLevel(0);
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
            if (idleTimeoutId !== null) {
                window.clearTimeout(idleTimeoutId);
            }
            idleTimeoutId = window.setTimeout(startRamp, idleDelayMs);
        };

        resetOnActivity();
        // Attach interactive listeners to reset fatigue
        // Using window for global detection, or ref for local? 
        // Original logic used window.
        window.addEventListener('scroll', resetOnActivity, { passive: true });
        window.addEventListener('pointermove', resetOnActivity, { passive: true });

        return () => {
            window.removeEventListener('scroll', resetOnActivity);
            window.removeEventListener('pointermove', resetOnActivity);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            if (idleTimeoutId !== null) window.clearTimeout(idleTimeoutId);
        };
    }, [isVisible]);

    // --- Data: Case 1 (Efficiency) ---
    const steps = [
        {
            icon: RefreshCw,
            titleKey: 'ivy.real_cost.case1.steps.step1',
            descKey: 'ivy.real_cost.case1.steps.step1_desc',
            lane: 'middle' as LaneKey,
        },
        {
            icon: Layers, // Represents Layout/Design
            titleKey: 'ivy.real_cost.case1.steps.step2',
            descKey: 'ivy.real_cost.case1.steps.step2_desc',
            lane: 'top' as LaneKey,
        },
        {
            icon: FileWarning, // Represents Dead-end
            titleKey: 'ivy.real_cost.case1.steps.step3',
            descKey: 'ivy.real_cost.case1.steps.step3_desc',
            lane: 'bottom' as LaneKey,
        },
    ];

    const viewBoxWidth = 800;
    const viewBoxHeight = 180;
    const stepPercents = [15, 50, 85];
    const laneY: Record<LaneKey, number> = {
        top: 40,
        middle: 90,
        bottom: 140,
    };

    const points = steps.map((step, index) => ({
        x: (stepPercents[index] / 100) * viewBoxWidth,
        y: laneY[step.lane],
    }));

    const mainPathD = buildSmoothPath(points);
    const mainPathStyle = {
        strokeWidth: 1.5 + fatigueLevel * 0.5,
        opacity: 0.5 + fatigueLevel * 0.2,
    };

    // --- Data: Case 2 (Liability) ---
    const sources = [
        {
            key: 'source_a',
            icon: Image,
            label: t('ivy.real_cost.case2.fragmentation.source_a'),
            desc: t('ivy.real_cost.case2.fragmentation.source_a_desc'),
        },
        {
            key: 'source_b',
            icon: MessageCircle,
            label: t('ivy.real_cost.case2.fragmentation.source_b'),
            desc: t('ivy.real_cost.case2.fragmentation.source_b_desc'),
        },
        {
            key: 'source_c',
            icon: ClipboardCheck,
            label: t('ivy.real_cost.case2.fragmentation.source_c'),
            desc: t('ivy.real_cost.case2.fragmentation.source_c_desc'),
        },
    ];

    return (
        <div
            className={styles.wrapper}
            ref={ref}
            style={{
                ['--fatigue-level' as any]: fatigueLevel.toFixed(2),
            }}
        >
            {/* Header Section */}
            <header className={styles.mainHeader}>
                <div className={styles.visualAnchor}>
                    <span className={styles.anchorLabel}>{t('ivy.real_cost.anchor_label')}</span>
                    <div className={styles.anchorBar}>
                        <div className={styles.anchorFill} />
                    </div>
                </div>
                <h2 className={styles.mainTitle}>{t('ivy.real_cost.title')}</h2>
                <p className={styles.mainSubtitle}>{t('ivy.real_cost.subtitle')}</p>
            </header>

            <div className={styles.contentGrid}>
                {/* Case 1: Efficiency Cost */}
                <section className={styles.caseSection}>
                    <div className={styles.caseHeader}>
                        <span className={styles.caseTag}>{t('ivy.real_cost.case1.label')}</span>
                        <h3 className={styles.caseTitle}>{t('ivy.real_cost.case1.title')}</h3>
                        <p className={styles.caseDesc}>{t('ivy.real_cost.case1.description')}</p>
                    </div>

                    <div className={styles.graphContainer}>
                        <svg
                            className={styles.svgLayer}
                            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path className={styles.pathLine} d={mainPathD} style={mainPathStyle} />
                        </svg>

                        <div className={styles.nodesLayer}>
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const point = points[index];
                                return (
                                    <div
                                        key={step.titleKey}
                                        className={styles.nodeWrapper}
                                        style={{
                                            left: `${(point.x / viewBoxWidth) * 100}%`,
                                            top: `${(point.y / viewBoxHeight) * 100}%`,
                                            ['--step-index' as any]: index,
                                        }}
                                    >
                                        <div className={styles.iconCircle}>
                                            <Icon size={18} />
                                        </div>
                                        <div className={styles.nodeText}>
                                            <span className={styles.nodeTitle}>{t(step.titleKey)}</span>
                                            <span className={styles.nodeDesc}>{t(step.descKey)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.costFooter}>
                        <span className={styles.costHighlight}>{t('ivy.real_cost.case1.summary_cost')}</span>
                    </div>
                </section>

                {/* Case 2: Liability Cost */}
                <section className={styles.caseSection}>
                    <div className={styles.caseHeader}>
                        <span className={styles.caseTag}>{t('ivy.real_cost.case2.label')}</span>
                        <h3 className={styles.caseTitle}>{t('ivy.real_cost.case2.title')}</h3>
                        <p className={styles.caseDesc}>{t('ivy.real_cost.case2.description')}</p>
                    </div>

                    <div className={styles.fragmentationVisual}>
                        <div className={styles.sourcesRow}>
                            {sources.map(src => (
                                <div key={src.key} className={styles.sourceCard}>
                                    <div className={styles.sourceIcon}>
                                        <src.icon size={16} />
                                    </div>
                                    <div className={styles.sourceInfo}>
                                        <span className={styles.sourceLabel}>{src.label}</span>
                                        <span className={styles.sourceDesc}>{src.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.gapConnector}>
                            <div className={styles.gapLine} />
                            <div className={styles.gapLabel}>{t('ivy.real_cost.case2.gap')}</div>
                        </div>
                        <div className={styles.gapDescription}>
                            {t('ivy.real_cost.case2.gap_desc')}
                        </div>
                    </div>

                    <div className={styles.costFooter}>
                        <span className={styles.costHighlight}>{t('ivy.real_cost.case2.summary_cost')}</span>
                    </div>
                </section>
            </div>
        </div>
    );
};
