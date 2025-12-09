// src/components/projects/WorkloadAnalysisGraph.tsx

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './WorkloadAnalysisGraph.css';
import { useOnScreen } from '../../hooks/useOnScreen';

export const WorkloadAnalysisGraph = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    // triggerOnce: false allows animation to replay every time it enters viewport
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    // Only add 'animate-start' class when visible
    const containerClass = `workload-graph-container ${isVisible ? 'animate-start' : ''}`;

    return (
        <div className={containerClass} ref={ref}>
            <div className="workload-graph-title">{t('workloadGraph.title')}</div>

            {/* 3. Animation: animate-grow-width handled in CSS */}
            <div className="bar-container">
                {/* 54% Standard Input - Green */}
                <div
                    className="bar-segment bg-emerald-500"
                    style={{ width: '54%' }}
                ></div>

                {/* 37% Formatting - Amber (Focal Point) */}
                <div
                    className="bar-segment bg-amber-500"
                    style={{ width: '37%' }}
                ></div>

                {/* 9% Clear/Delete - Gray */}
                <div
                    className="bar-segment bg-gray-600"
                    style={{ width: '9%' }}
                ></div>
            </div>

            {/* 4. Legends/Narrative */}
            <div className="legend-container">
                <div className="legend-item">
                    <div className="legend-marker bg-emerald-500"></div>
                    <div className="legend-content">
                        <div className="legend-header">
                            <span className="legend-percentage text-emerald-400">54%</span>
                            <span>{t('workloadGraph.dataEntry')}</span>
                        </div>
                        <span className="legend-desc">{t('workloadGraph.dataEntryDesc')}</span>
                    </div>
                </div>

                <div className="legend-item">
                    {/* Focal Point */}
                    <div className="legend-marker bg-amber-500"></div>
                    <div className="legend-content">
                        <div className="legend-header">
                            <span className="legend-percentage text-amber-400">37%</span>
                            <span>{t('workloadGraph.formatting')}</span>
                        </div>
                        {/* Explicit narrative: "Ad-hoc reminders" */}
                        <span className="legend-desc legend-highlight text-amber-400">
                            {t('workloadGraph.formattingDesc')}
                        </span>
                    </div>
                </div>

                <div className="legend-item">
                    <div className="legend-marker bg-gray-600"></div>
                    <div className="legend-content">
                        <div className="legend-header">
                            <span className="legend-percentage text-gray-400">9%</span>
                            <span>{t('workloadGraph.clearDelete')}</span>
                        </div>
                        <span className="legend-desc">{t('workloadGraph.clearDeleteDesc')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
