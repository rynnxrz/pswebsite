import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';
import { InteractiveAdminSegment } from './InteractiveAdminSegment';

type CurrentWorkloadBarProps = {
    className?: string;
};

export const CurrentWorkloadBar = ({ className = '' }: CurrentWorkloadBarProps) => {
    const { t } = useTranslation();
    const adminTooltipId = 'admin-tasks-tooltip-current';
    const currentDesignVal = 15;
    const currentCraftVal = 15;
    const currentAdminVal = 70;

    const barVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: (custom: number) => ({
            width: `${custom}%`,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
        })
    };

    const containerClass = [styles.container, className].filter(Boolean).join(' ');

    return (
        <div className={containerClass}>
            <div className={styles.chartRow}>
                <div className={styles.rowHeader}>
                    <span className={styles.stateLabel}>{t('ivy.cost.current.label')}</span>
                </div>

                <div className={styles.barArea}>
                    <div className={styles.barTrack}>
                        <motion.div
                            className={`${styles.segment} ${styles.design}`}
                            custom={currentDesignVal}
                            variants={barVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                        />
                        <motion.div
                            className={`${styles.segment} ${styles.craft}`}
                            custom={currentCraftVal}
                            variants={barVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                        />
                        <InteractiveAdminSegment
                            value={currentAdminVal}
                            variants={barVariants}
                            tooltipId={adminTooltipId}
                        />
                    </div>
                    <div className={styles.labelsBelow}>
                        <span style={{ width: `${currentDesignVal}%` }}>{t('ivy_j.context.chart.design')}</span>
                        <span style={{ width: `${currentCraftVal}%` }}>{t('ivy_j.context.chart.craft')}</span>
                        <span>{t('ivy_j.context.chart.admin')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
