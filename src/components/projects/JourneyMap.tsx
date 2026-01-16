// src/components/projects/JourneyMap.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import ScanEye from 'lucide-react/dist/esm/icons/scan-eye';
import CalendarClock from 'lucide-react/dist/esm/icons/calendar-clock';
import Keyboard from 'lucide-react/dist/esm/icons/keyboard';
import { HorizontalScrollContainer } from '../common/HorizontalScrollContainer/HorizontalScrollContainer';
import './JourneyMap.css';

export const JourneyMap: React.FC = () => {
    const { t } = useTranslation();

    const getIcon = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'read':
                return <ScanEye size={18} strokeWidth={2} />;
            case 'plan':
                return <CalendarClock size={18} strokeWidth={2} />;
            case 'input':
                return <Keyboard size={18} strokeWidth={2} />;
            default:
                return null;
        }
    };

    const stages = ['stage1', 'stage2', 'stage3'];

    return (
        <HorizontalScrollContainer className="journey-map-container">
            {stages.map((stageKey) => {
                const stageData = t(`project_p.choices.journeyMap.${stageKey}`, { returnObjects: true }) as any;
                const tags = stageData.tags || [];

                return (
                    <div key={stageKey} className="journey-stage">
                        <div className="journey-stage-title">{stageData.title}</div>

                        <div className="journey-section pains-section">
                            <div className="journey-section-label">
                                <span className="journey-dot dot-pains"></span>
                                <span>The Pains</span>
                            </div>
                            <div className="journey-content-text pains-text">{stageData.pains}</div>
                        </div>

                        <div className="journey-section move-section">
                            <div className="journey-section-label">
                                <span className="journey-dot dot-move"></span>
                                <span>The Move</span>
                            </div>
                            <div className="journey-content-text move-text">{stageData.move}</div>
                        </div>

                        <div className="journey-tags">
                            {tags.map((tag: string) => (
                                <div key={tag} className="journey-tag">
                                    {getIcon(tag)}
                                    <span>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </HorizontalScrollContainer>
    );
};
