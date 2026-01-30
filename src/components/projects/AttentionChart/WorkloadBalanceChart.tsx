import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';

type WorkloadBalanceChartProps = {
    className?: string;
};

type WorkloadRow = {
    labelKey: string;
    design: number;
    craft: number;
    admin: number;
};

export const WorkloadBalanceChart = ({ className = '' }: WorkloadBalanceChartProps) => {
    const { t } = useTranslation();
    const segmentStyle = (value: number) => ({ ['--segment-width' as any]: `${value}%` });

    const rows: WorkloadRow[] = [
        { labelKey: 'ivy.target.chart.before', design: 15, craft: 15, admin: 70 },
        { labelKey: 'ivy.target.chart.target', design: 50, craft: 36, admin: 14 },
    ];

    const barVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: (custom: number) => ({
            width: `${custom}%`,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }
        })
    };

    const containerClass = [styles.container, className].filter(Boolean).join(' ');

    return (
        <div className={containerClass}>
            {rows.map((row) => (
                <div key={row.labelKey} className={styles.chartRow}>
                    <div className={styles.rowHeader}>
                        <span className={styles.stateLabel}>{t(row.labelKey)}</span>
                    </div>

                    <div className={styles.barArea}>
                        <div className={styles.barTrack}>
                            <motion.div
                                className={`${styles.segment} ${styles.design}`}
                                custom={row.design}
                                variants={barVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                style={segmentStyle(row.design)}
                            />
                            <motion.div
                                className={`${styles.segment} ${styles.craft}`}
                                custom={row.craft}
                                variants={barVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                style={segmentStyle(row.craft)}
                            />
                            <motion.div
                                className={`${styles.segment} ${styles.admin}`}
                                custom={row.admin}
                                variants={barVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                style={segmentStyle(row.admin)}
                            />
                        </div>
                        <div className={styles.labelsBelow}>
                            <span style={{ width: `${row.design}%` }}>{t('ivy_j.context.chart.design')}</span>
                            <span style={{ width: `${row.craft}%` }}>{t('ivy_j.context.chart.craft')}</span>
                            <span>{t('ivy_j.context.chart.admin')}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
