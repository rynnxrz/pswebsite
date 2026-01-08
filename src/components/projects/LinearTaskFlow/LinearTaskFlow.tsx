import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Database, PenTool, FileOutput, Send } from 'lucide-react';
import styles from './LinearTaskFlow.module.css';
import { useOnScreen } from '../../../hooks/useOnScreen';

type TaskStep = {
    icon: typeof Mail;
    labelKey: string;
};

export const LinearTaskFlow = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    const steps: TaskStep[] = [
        { icon: Mail, labelKey: 'ivy.taskflow.step1' },
        { icon: Database, labelKey: 'ivy.taskflow.step2' },
        { icon: PenTool, labelKey: 'ivy.taskflow.step3' },
        { icon: FileOutput, labelKey: 'ivy.taskflow.step4' },
        { icon: Send, labelKey: 'ivy.taskflow.step5' },
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
