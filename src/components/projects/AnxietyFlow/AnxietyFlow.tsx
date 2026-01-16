import { motion } from 'framer-motion';
import Package from 'lucide-react/dist/esm/icons/package';
import CameraOff from 'lucide-react/dist/esm/icons/camera-off';
import Truck from 'lucide-react/dist/esm/icons/truck';
import { useTranslation } from 'react-i18next';
import styles from './AnxietyFlow.module.css';

export const AnxietyFlow = () => {
    const { t } = useTranslation();

    // Generate grid rectangles for the "fragmented" background
    const gridRects = Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className={styles.gridRect} />
    ));

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                {gridRects}
            </div>

            <div className={styles.content}>
                <div className={styles.flowContainer}>
                    {/* Step 1: Packing */}
                    <motion.div
                        className={styles.node}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.iconWrapper}>
                            <Package size={20} />
                        </div>
                        <div className={styles.label}>{t('ivy.cost.situation_b.step1')}</div>
                    </motion.div>

                    <div className={styles.connector} />

                    {/* Step 2: Memory Risk */}
                    <motion.div
                        className={`${styles.node} ${styles.riskNode}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.riskLabel}>{t('ivy.cost.situation_b.risk_label')}</div>
                        <div className={styles.iconWrapper}>
                            <CameraOff size={20} />
                        </div>
                        <div className={styles.label}>{t('ivy.cost.situation_b.step2')}</div>
                    </motion.div>

                    <div className={styles.connector} />

                    {/* Step 3: Shipping */}
                    <motion.div
                        className={styles.node}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={styles.iconWrapper}>
                            <Truck size={20} />
                        </div>
                        <div className={styles.label}>{t('ivy.cost.situation_b.step3')}</div>
                    </motion.div>

                    {/* Jagged Line to Dispute */}
                    <div className={styles.jaggedLine}>
                        <svg className={styles.jaggedSvg} viewBox="0 0 100 20" preserveAspectRatio="none">
                            <motion.path
                                d="M0,10 L20,10 L25,5 L35,15 L45,5 L55,15 L60,10 L100,10"
                                className={styles.jaggedPath}
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                            />
                        </svg>
                    </div>

                    {/* Dispute Node */}
                    <motion.div
                        className={styles.disputeNode}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5 }} // delay until line finishes
                    >
                        {t('ivy.cost.situation_b.dispute')}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
