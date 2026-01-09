import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, PenTool, FileOutput, type LucideIcon } from 'lucide-react';
import styles from './LinearTaskFlow.module.css';
import { useOnScreen } from '../../../hooks/useOnScreen';

type TaskStep = {
    icon: LucideIcon;
    labelKey: string;
    descKey: string;
};

export const LinearTaskFlow = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    const steps: TaskStep[] = [
        { icon: Database, labelKey: 'ivy.real_cost.case1.steps.step1', descKey: 'ivy.real_cost.case1.steps.step1_desc' },
        { icon: PenTool, labelKey: 'ivy.real_cost.case1.steps.step2', descKey: 'ivy.real_cost.case1.steps.step2_desc' },
        { icon: FileOutput, labelKey: 'ivy.real_cost.case1.steps.step3', descKey: 'ivy.real_cost.case1.steps.step3_desc' },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const nodeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <motion.div
                className={styles.timeline}
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={step.labelKey}
                            className={styles.node}
                            variants={nodeVariants}
                        >
                            <div className={styles.iconWrapper}>
                                <Icon size={20} strokeWidth={1.5} />
                            </div>
                            <div className={styles.label}>{t(step.labelKey)}</div>
                            <div className={styles.desc}>{t(step.descKey)}</div>
                            {index < steps.length - 1 && (
                                <div className={styles.connector} aria-hidden="true" />
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};
