import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import './OraModelShiftSchematic.css';

/**
 * Slide 5 · A · 02 MODEL SHIFT
 * Visual contrast: department-centric spreadsheets (Before) vs. a single
 * order object with status attributes (After), plus a horizontal status
 * flow at the bottom. Screen = minimum labels, rest is verbal narration.
 */
export const OraModelShiftSchematic: React.FC = () => {
    const { t } = useTranslation();

    const beforeBoxes = asArray<string>(
        t('project_p.pitchv2.a02.schematic.beforeBoxes', { returnObjects: true }),
    );
    const afterTitle = t('project_p.pitchv2.a02.schematic.afterTitle');
    const afterSubtitle = t('project_p.pitchv2.a02.schematic.afterSubtitle');
    const statusFlow = asArray<string>(
        t('project_p.pitchv2.a02.schematic.statusFlow', { returnObjects: true }),
    );
    const beforeLabel = t('project_p.pitchv2.a02.schematic.beforeLabel');
    const afterLabel = t('project_p.pitchv2.a02.schematic.afterLabel');

    return (
        <div className="omss-root">
            <div className="omss-compare">
                {/* Before: 4 dept boxes */}
                <div className="omss-side omss-side--before">
                    <div className="omss-side-label">{beforeLabel}</div>
                    <div className="omss-boxes">
                        {beforeBoxes.map((label, i) => (
                            <div key={i} className="omss-dept-box">
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow between sides */}
                <div className="omss-arrow" aria-hidden="true">
                    <ArrowRight size={32} strokeWidth={1.5} />
                </div>

                {/* After: one order object with status attributes */}
                <div className="omss-side omss-side--after">
                    <div className="omss-side-label">{afterLabel}</div>
                    <div className="omss-object">
                        <div className="omss-object-head">
                            <div className="omss-object-title">{afterTitle}</div>
                            {afterSubtitle && (
                                <div className="omss-object-subtitle">{afterSubtitle}</div>
                            )}
                        </div>
                        <div className="omss-status-grid">
                            {statusFlow.map((label, i) => (
                                <div key={i} className="omss-status-chip">
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: horizontal status flow */}
            <div className="omss-flow" role="list">
                {statusFlow.map((label, i) => (
                    <React.Fragment key={i}>
                        <div className="omss-flow-step" role="listitem">
                            {label}
                        </div>
                        {i < statusFlow.length - 1 && (
                            <div className="omss-flow-arrow" aria-hidden="true">
                                <ArrowRight size={14} strokeWidth={1.5} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

function asArray<T>(value: unknown): T[] {
    return Array.isArray(value) ? (value as T[]) : [];
}
