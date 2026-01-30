import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';

type ChartRow = {
    labelKey: string;
    design: number;
    craft: number;
    admin: number;
};

type AttentionChartProps = {
    variant?: 'context' | 'target';
};

export const AttentionChart = ({ variant = 'context' }: AttentionChartProps) => {
    const { t } = useTranslation();
    const segmentStyle = (value: number) => ({ ['--segment-width' as any]: `${value}%` });

    const contextRows: ChartRow[] = [
        { labelKey: 'ivy.chart.before', design: 70, craft: 20, admin: 10 },
        { labelKey: 'ivy.chart.current', design: 15, craft: 15, admin: 70 },
    ];

    const targetRows: ChartRow[] = [
        { labelKey: 'ivy.chart.current', design: 15, craft: 15, admin: 70 },
        { labelKey: 'ivy.chart.target', design: 50, craft: 36, admin: 14 },
    ];

    const rows = variant === 'target' ? targetRows : contextRows;

    const barVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: (custom: number) => ({
            width: `${custom}%`,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }
        })
    };

    return (
        <div className={styles.container}>
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
                            <span style={{ width: `${row.design}%` }}>{t('ivy.chart.design')}</span>
                            <span style={{ width: `${row.craft}%` }}>{t('ivy.chart.craft')}</span>
                            <span>{t('ivy.chart.admin')}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Legend */}
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.design}`} />
                    <span>{t('ivy.chart.design')}</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.craft}`} />
                    <span>{t('ivy.chart.craft')}</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.admin}`} />
                    <span>{t('ivy.chart.admin')}</span>
                </div>
            </div>
        </div>
    );
};
