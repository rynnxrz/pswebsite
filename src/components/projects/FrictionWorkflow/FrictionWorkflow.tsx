import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Database, PenTool, FileOutput, Send } from 'lucide-react';
import styles from './FrictionWorkflow.module.css';
import { useOnScreen } from '../../../hooks/useOnScreen';

type LaneKey = 'inbox' | 'system' | 'tools';

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

    const steps = [
        {
            icon: Mail,
            labelKey: 'ivy_j.real_cost.situation_a.step1.label',
            lane: 'inbox' as LaneKey,
        },
        {
            icon: Database,
            labelKey: 'ivy_j.real_cost.situation_a.step2.label',
            lane: 'system' as LaneKey,
        },
        {
            icon: PenTool,
            labelKey: 'ivy_j.real_cost.situation_a.step3.label',
            lane: 'tools' as LaneKey,
        },
        {
            icon: FileOutput,
            labelKey: 'ivy_j.real_cost.situation_a.step4.label',
            lane: 'tools' as LaneKey,
        },
        {
            icon: Send,
            labelKey: 'ivy_j.real_cost.situation_a.step5.label',
            lane: 'inbox' as LaneKey,
        },
    ];

    const viewBoxWidth = 1000;
    const viewBoxHeight = 250;
    const stepPercents = [15, 40, 58, 74, 96];

    const laneY: Record<LaneKey, number> = {
        inbox: 35,
        system: 115,
        tools: 195,
    };

    const points = steps.map((step, index) => ({
        x: (stepPercents[index] / 100) * viewBoxWidth,
        y: laneY[step.lane],
    }));

    const mainPathD = buildSmoothPath(points);

    const first = points[0];
    const last = points[points.length - 1];
    const loopY = 240;
    const loopBend = 50;
    const loopSpan = 140;
    const loopSegmentD = [
        `C ${last.x + loopBend} ${last.y + 6} ${last.x + loopBend} ${loopY} ${last.x} ${loopY}`,
        `C ${last.x - loopSpan} ${loopY} ${first.x + loopSpan} ${loopY} ${first.x} ${loopY}`,
        `C ${first.x - loopBend} ${loopY} ${first.x - loopBend} ${first.y - 6} ${first.x} ${first.y}`,
    ].join(' ');

    const loopPathD = `M ${last.x} ${last.y} ${loopSegmentD}`;

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
        window.addEventListener('scroll', resetOnActivity, { passive: true });
        window.addEventListener('pointerdown', resetOnActivity, { passive: true });
        window.addEventListener('pointermove', resetOnActivity, { passive: true });
        window.addEventListener('touchstart', resetOnActivity, { passive: true });
        window.addEventListener('keydown', resetOnActivity);

        return () => {
            window.removeEventListener('scroll', resetOnActivity);
            window.removeEventListener('pointerdown', resetOnActivity);
            window.removeEventListener('pointermove', resetOnActivity);
            window.removeEventListener('touchstart', resetOnActivity);
            window.removeEventListener('keydown', resetOnActivity);
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
            if (idleTimeoutId !== null) {
                window.clearTimeout(idleTimeoutId);
            }
        };
    }, [isVisible]);

    const lanes: Array<{ key: LaneKey; label: string }> = [
        { key: 'inbox', label: t('ivy_j.real_cost.situation_a.lane.inbox') },
        { key: 'system', label: t('ivy_j.real_cost.situation_a.lane.system') },
        { key: 'tools', label: t('ivy_j.real_cost.situation_a.lane.tools') },
    ];

    const loopCallout = {
        title: t('ivy_j.real_cost.situation_a.total_load'),
        desc: t('ivy_j.real_cost.situation_a.loop'),
    };

    const summary = {
        problemTitle: t('ivy.cost.situation_a.summary.problem_title'),
        strategyTitle: t('ivy.cost.situation_a.summary.strategy_title'),
        goalLabel: t('ivy.cost.situation_a.summary.goal_label'),
        issueLabel: t('ivy.cost.situation_a.summary.issue_label'),
        impactLabel: t('ivy.cost.situation_a.summary.impact_label'),
        decisionLabel: t('ivy.cost.situation_a.summary.decision_label'),
        tradeoffsLabel: t('ivy.cost.situation_a.summary.tradeoffs_label'),
        issueBody: t('ivy.cost.situation_a.summary.issue_body'),
        impactBody: t('ivy.cost.situation_a.summary.impact_body'),
        decisionBody: t('ivy.cost.situation_a.summary.decision_body'),
        tradeoffsBody: t('ivy.cost.situation_a.summary.tradeoffs_body'),
        goalBody: t('ivy.cost.situation_a.summary.goal_body'),
    };

    const legendText = t('ivy_j.real_cost.situation_a.legend');

    const switchLabels = [
        { from: 0, to: 1, labelKey: 'ivy_j.real_cost.situation_a.switch1' },
        { from: 1, to: 2, labelKey: 'ivy_j.real_cost.situation_a.switch2' },
        { from: 3, to: 4, labelKey: 'ivy_j.real_cost.situation_a.switch3' },
    ];

    const mainPathStyle = {
        strokeWidth: 1 + fatigueLevel * 0.6,
        opacity: 0.4 + fatigueLevel * 0.3,
    };

    return (
        <div
            className={styles.wrapper}
            ref={ref}
            style={{
                ['--fatigue-level' as any]: fatigueLevel.toFixed(2),
            }}
        >
            <div className={styles.frame}>
                <div className={styles.summaryHeader}>
                    <div className={styles.summaryColumns}>
                        <div className={styles.summaryColumn}>
                            <div className={styles.summaryHeading}>{summary.problemTitle}</div>
                            <div className={styles.summaryItem}>
                                <span className={styles.summaryLabel}>{summary.issueLabel}</span>
                                <span className={styles.summaryBody}>{summary.issueBody}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span className={styles.summaryLabel}>{summary.impactLabel}</span>
                                <span className={styles.summaryBody}>{summary.impactBody}</span>
                            </div>
                        </div>
                        <div className={styles.summaryColumn}>
                            <div className={styles.summaryHeading}>{summary.strategyTitle}</div>
                            <div className={styles.summaryItem}>
                                <span className={styles.summaryLabel}>{summary.decisionLabel}</span>
                                <span className={styles.summaryBody}>{summary.decisionBody}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span className={styles.summaryLabel}>{summary.tradeoffsLabel}</span>
                                <span className={styles.summaryBody}>{summary.tradeoffsBody}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.summaryGoal}>
                        <span className={styles.summaryGoalLabel}>{summary.goalLabel}</span>
                        <span className={styles.summaryGoalBody}>{summary.goalBody}</span>
                    </div>
                </div>

                <div className={styles.legend}>
                    <span className={styles.legendDot} aria-hidden="true" />
                    <span className={styles.legendText}>{legendText}</span>
                </div>

                <div className={styles.graphArea}>
                    <div className={styles.laneLabels} aria-hidden="true">
                        {lanes.map((lane) => (
                            <div
                                key={lane.key}
                                className={styles.laneLabelRow}
                                style={{ top: `${(laneY[lane.key] / viewBoxHeight) * 100}%` }}
                            >
                                <span className={styles.laneLabel}>{lane.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.canvas}>
                        <div className={styles.lanes} aria-hidden="true">
                            {lanes.map((lane) => (
                                <div
                                    key={lane.key}
                                    className={styles.laneRow}
                                    style={{ top: `${(laneY[lane.key] / viewBoxHeight) * 100}%` }}
                                >
                                    <span className={styles.laneLine} />
                                </div>
                            ))}
                        </div>

                        <div className={styles.graphInner}>
                            <svg
                                className={styles.path}
                                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path className={styles.mainPath} d={mainPathD} style={mainPathStyle} />
                                <path className={styles.loopPath} d={loopPathD} />
                            </svg>

                            <div className={styles.nodes}>
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const point = points[index];
                                    return (
                                        <div
                                            key={step.labelKey}
                                            className={styles.step}
                                            style={{
                                                left: `${(point.x / viewBoxWidth) * 100}%`,
                                                top: `${(point.y / viewBoxHeight) * 100}%`,
                                                ['--step-index' as any]: index + 1,
                                            }}
                                        >
                                            <div className={styles.nodeInner}>
                                                <div className={styles.iconWrapper}>
                                                    <Icon size={18} strokeWidth={1.6} />
                                                </div>
                                                <div className={styles.content}>
                                                    <div className={styles.label}>{t(step.labelKey)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.switchLayer} aria-hidden="true">
                                {switchLabels.map((label) => {
                                    const from = points[label.from];
                                    const to = points[label.to];
                                    const midX = (from.x + to.x) / 2;
                                    const midY = (from.y + to.y) / 2;
                                    return (
                                        <div
                                            key={label.labelKey}
                                            className={styles.switchLabel}
                                            style={{
                                                left: `${(midX / viewBoxWidth) * 100}%`,
                                                top: `${(midY / viewBoxHeight) * 100}%`,
                                            }}
                                        >
                                            <span className={styles.switchLine} />
                                            <span className={styles.switchText}>{t(label.labelKey)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.loopCallout}>
                            <span className={styles.loopTitle}>{loopCallout.title}</span>
                            <span className={styles.loopDesc}>{loopCallout.desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
