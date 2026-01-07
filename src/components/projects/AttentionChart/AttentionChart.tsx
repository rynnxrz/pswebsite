
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';

export const AttentionChart = () => {
    const { t } = useTranslation();
    const adminTooltipId = 'admin-tasks-tooltip';
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Initial State: 70% Design, 20% Craft, 10% Admin
    // Fixed Order: Design -> Craft -> Admin
    // Labels: All Above. Uniform styling.
    const initialSegments = [
        { id: 'design', value: 70, label: t('ivy_j.context.chart.design'), colorClass: styles.design, textColor: 'var(--text-secondary)', showLabel: true },
        { id: 'craft', value: 20, label: t('ivy_j.context.chart.craft'), colorClass: styles.craft, textColor: 'var(--text-secondary)', showLabel: true },
        { id: 'admin', value: 10, label: t('ivy_j.context.chart.admin'), colorClass: styles.admin, textColor: 'var(--text-secondary)', showLabel: true }
    ];

    // Current State: 20% Design, 20% Craft, 60% Admin
    // Fixed Order: Design -> Craft -> Admin
    // Labels: All Above. Uniform styling.
    const currentSegments = [
        { id: 'design', value: 20, label: t('ivy_j.context.chart.design'), colorClass: styles.design, textColor: 'var(--text-secondary)', showLabel: true },
        { id: 'craft', value: 20, label: t('ivy_j.context.chart.craft'), colorClass: styles.craft, textColor: 'var(--text-secondary)', showLabel: true },
        { id: 'admin', value: 60, label: t('ivy_j.context.chart.admin'), colorClass: styles.admin, textColor: 'var(--text-secondary)', showLabel: true, isPrimary: false }
    ];

    const adminTasks = t('ivy_j.context.chart.admin_tasks', { returnObjects: true }) as string[];

    const barVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: (custom: number) => ({
            width: `${custom}%`,
            opacity: 1,
            transition: { duration: 0.8, ease: "circOut", delay: 0.2 }
        })
    };

    const tooltipVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 4 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 4,
            transition: { duration: 0.15, ease: "easeIn" }
        }
    };

    return (
        <div className={styles.container}>

            {/* Row 1: Initial */}
            <div className={styles.chartRow}>
                <div className={styles.rowHeader}>
                    <span className={styles.stateLabel}>{t('ivy_j.context.chart.initial_label')}</span>
                </div>

                <div className={styles.barArea}>
                    <div className={styles.barTrack}>
                        {initialSegments.map((segment) => (
                            <motion.div
                                key={segment.id}
                                className={`${styles.segment} ${segment.colorClass}`}
                                custom={segment.value}
                                variants={barVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                            >
                                {/* Direct Labels (now Below) */}
                                {segment.showLabel && (
                                    <div className={styles.labelBelow}>
                                        {segment.label}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Connecting Visual Line */}
            <div className={styles.connectorContainer}>
                <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                    <line
                        x1="70%" y1="0"
                        x2="20%" y2="100%"
                        stroke="var(--connector-line, #888)"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        opacity="0.5"
                    />
                </svg>
            </div>

            {/* Row 2: Current */}
            <div className={styles.chartRow}>
                <div className={styles.rowHeader}>
                    <span className={styles.stateLabel}>{t('ivy_j.context.chart.current_label')}</span>
                </div>

                <div className={styles.barArea}>
                    <div className={styles.barTrack}>
                        {currentSegments.map((segment) => (
                            <motion.div
                                key={segment.id}
                                className={`${styles.segment} ${segment.colorClass} ${segment.id === 'admin' ? styles.interactiveSegment : ''}`}
                                custom={segment.value}
                                variants={barVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={segment.id === 'admin' ? { scale: 1.02, zIndex: 10 } : {}}
                                viewport={{ once: false }}
                                onHoverStart={() => setHoveredId(segment.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                tabIndex={segment.id === 'admin' ? 0 : undefined}
                                aria-describedby={segment.id === 'admin' ? adminTooltipId : undefined}
                            >
                                {/* Direct Labels (now Below) */}
                                {segment.showLabel && (
                                    <div className={styles.labelBelow}>
                                        {segment.label}
                                    </div>
                                )}

                                <AnimatePresence>
                                    {segment.id === 'admin' && hoveredId === 'admin' && (
                                        <motion.div
                                            className={styles.tooltip}
                                            id={adminTooltipId}
                                            role="tooltip"
                                            variants={tooltipVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className={styles.tooltipArrow} />
                                            <ul className={styles.tooltipList}>
                                                {Array.isArray(adminTasks) && adminTasks.map((task, i) => (
                                                    <li key={i} className={styles.tooltipItem}>{task}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
