import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'lucide-react/dist/esm/icons/image';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import styles from './DisputeFlow.module.css';

const sources = [
    { icon: Image, key: 0, labelKey: 'ivy.real_cost.case2.fragmentation.source_a', descKey: 'ivy.real_cost.case2.fragmentation.source_a_desc' },
    { icon: MessageCircle, key: 1, labelKey: 'ivy.real_cost.case2.fragmentation.source_b', descKey: 'ivy.real_cost.case2.fragmentation.source_b_desc' },
    { icon: FileText, key: 2, labelKey: 'ivy.real_cost.case2.fragmentation.source_c', descKey: 'ivy.real_cost.case2.fragmentation.source_c_desc' },
];

export const DisputeFlow = () => {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    };

    const nodeVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <AlertTriangle size={16} className={styles.alertIcon} />
                <span className={styles.trigger}>{t('ivy.real_cost.case2.label')}</span>
            </div>

            <h4 className={styles.title}>{t('ivy.real_cost.case2.title')}</h4>
            <p className={styles.desc}>{t('ivy.real_cost.case2.description')}</p>

            <motion.div
                className={styles.flow}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {sources.map((source, index) => {
                    const Icon = source.icon;
                    return (
                        <motion.div key={source.key} className={styles.step} variants={nodeVariants}>
                            <div className={styles.iconBox}>
                                <Icon size={18} strokeWidth={1.5} />
                            </div>
                            <div className={styles.sourceText}>
                                <span className={styles.label}>{t(source.labelKey)}</span>
                                <span className={styles.subLabel}>{t(source.descKey)}</span>
                            </div>
                            {index < sources.length - 1 && (
                                <span className={styles.arrow} aria-hidden="true">→</span>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className={styles.factBox}>
                <p className={styles.fact}><strong>{t('ivy.real_cost.case2.gap')}</strong> {t('ivy.real_cost.case2.gap_desc')}</p>
            </div>

            <p className={styles.summary}>{t('ivy.real_cost.case2.summary_cost')}</p>
        </div>
    );
};
