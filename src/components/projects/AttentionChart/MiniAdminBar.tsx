import { useTranslation } from 'react-i18next';
import styles from './AttentionChart.module.css';

export const MiniAdminBar = () => {
    const { t } = useTranslation();
    const design = 15;
    const craft = 15;
    const admin = 70;

    return (
        <div className={styles.miniWrapper}>
            <div className={styles.miniTrack}>
                <div className={`${styles.miniSegment} ${styles.design}`} style={{ width: `${design}%` }} />
                <div className={`${styles.miniSegment} ${styles.craft}`} style={{ width: `${craft}%` }} />
                <div className={`${styles.miniSegment} ${styles.admin}`} style={{ width: `${admin}%` }} />
            </div>
            <div className={styles.miniLabel}>{t('ivy.real_cost.anchor_label')}</div>
        </div>
    );
};
