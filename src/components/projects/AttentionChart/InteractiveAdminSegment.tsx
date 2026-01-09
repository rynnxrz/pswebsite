import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';

type InteractiveAdminSegmentProps = {
    value: number;
    variants: Variants;
    tooltipId: string;
};

export const InteractiveAdminSegment = ({ value, variants, tooltipId }: InteractiveAdminSegmentProps) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const adminTasks = t('ivy_j.context.chart.admin_tasks', { returnObjects: true }) as string[];
    const segmentStyle = { ['--segment-width' as any]: `${value}%` };

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
        <motion.div
            className={`${styles.segment} ${styles.admin} ${styles.interactiveSegment}`}
            custom={value}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.02, zIndex: 10 }}
            viewport={{ once: false }}
            style={segmentStyle}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            tabIndex={0}
            aria-describedby={tooltipId}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={styles.tooltip}
                        id={tooltipId}
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
    );
};
