import { useTranslation } from 'react-i18next';
import styles from './DecisionCard.module.css';

type DecisionCardProps = {
    insightKey: string;
    decisionKey: string;
};

export const DecisionCard = ({ insightKey, decisionKey }: DecisionCardProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.cardLabel}>{t('ivy.decision.insight_label')}</div>
                <div className={styles.cardBody}>{t(insightKey)}</div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardLabel}>{t('ivy.decision.decision_label')}</div>
                <div className={styles.cardBody}>{t(decisionKey)}</div>
            </div>
        </div>
    );
};
