// src/components/projects/AdminTimeGraph.tsx

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useOnScreen } from '../../hooks/useOnScreen';
import { GraphCard } from '../common/GraphCard/GraphCard';

export const AdminTimeGraph = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    const containerClass = `admin-time-graph-container ${isVisible ? 'animate-start' : ''}`;
    const segments = [
        {
            id: 'pdf',
            percent: 42,
            barClass: 'bg-rose-500',
            textClass: 'text-rose-400',
            labelKey: 'ivy.context.chart.pdf_label',
            descKey: 'ivy.context.chart.pdf_desc',
            legendClass: 'admin-legend-redundant'
        },
        {
            id: 'photo',
            percent: 26,
            barClass: 'bg-orange-500',
            textClass: 'text-orange-400',
            labelKey: 'ivy.context.chart.photo_label',
            descKey: 'ivy.context.chart.photo_desc',
            legendClass: 'admin-legend-redundant'
        },
        {
            id: 'email',
            percent: 10,
            barClass: 'bg-amber-500',
            textClass: 'text-amber-400',
            labelKey: 'ivy.context.chart.email_label',
            descKey: 'ivy.context.chart.email_desc',
            legendClass: 'admin-legend-redundant'
        },
        {
            id: 'crm',
            percent: 22,
            barClass: 'bg-emerald-500',
            textClass: 'text-emerald-400',
            labelKey: 'ivy.context.chart.crm_label',
            descKey: 'ivy.context.chart.crm_desc',
            legendClass: 'admin-legend-focus'
        }
    ];
    const chartAriaLabel = `${t('ivy.context.chart.title')}: ${segments.map((segment) => (
        `${segment.percent}% ${t(segment.labelKey)}`
    )).join(', ')}.`;

    return (
        <GraphCard title={t('ivy.context.chart.title')} className={containerClass} forwardRef={ref}>
            {/* Stacked bar visualization */}
            <div className="admin-bar-container" role="img" aria-label={chartAriaLabel}>
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className={`admin-bar-segment ${segment.id === 'crm' ? 'admin-segment-focus' : ''} ${segment.barClass}`}
                        style={{ width: `${segment.percent}%` }}
                        title={`${segment.percent}% ${t(segment.labelKey)}`}
                    >
                        <span className="admin-bar-label">{segment.percent}%</span>
                    </div>
                ))}
            </div>

            {/* Legend with descriptions */}
            <div className="admin-legend-container">
                {segments.map((segment) => {
                    const highlightClass = segment.id === 'crm' ? `admin-legend-highlight ${segment.textClass}` : '';

                    return (
                        <div key={segment.id} className={`admin-legend-item ${segment.legendClass}`}>
                            <div className={`admin-legend-marker ${segment.barClass}`}></div>
                            <div className="admin-legend-content">
                                <div className="admin-legend-header">
                                    <span className={`admin-legend-percentage ${segment.textClass}`}>{segment.percent}%</span>
                                    <span>{t(segment.labelKey)}</span>
                                </div>
                                <span className={`admin-legend-desc ${highlightClass}`}>{t(segment.descKey)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary callout */}
            <div className="admin-time-summary">
                <span className="admin-summary-label">{t('ivy.context.chart.insight_label')}</span>
                <span className="admin-summary-text">{t('ivy.context.chart.insight')}</span>
            </div>
        </GraphCard>
    );
};
