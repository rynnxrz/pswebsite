import React, { ReactNode } from 'react';
import styles from './GraphCard.module.css';

interface GraphCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
    forwardRef?: React.Ref<HTMLDivElement>;
}

export const GraphCard = ({ title, children, className = '', forwardRef }: GraphCardProps) => {
    return (
        <div className={`${styles.card} ${className}`} ref={forwardRef}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
