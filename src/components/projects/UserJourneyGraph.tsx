import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanEye, CalendarClock, Keyboard } from 'lucide-react';
import { useOnScreen } from '../../hooks/useOnScreen';
import './UserJourneyGraph.css';

export const UserJourneyGraph = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    return (
        <div ref={ref} className={`user-journey-list ${isVisible ? 'animate-start' : ''}`}>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <ScanEye size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.read')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.readDesc')}</p>
                </div>
            </div>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <CalendarClock size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.plan')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.planDesc')}</p>
                </div>
            </div>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <Keyboard size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.input')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.inputDesc')}</p>
                </div>
            </div>
        </div>
    );
};
