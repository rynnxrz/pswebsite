import { useRef } from 'react';
import './UserJourneyGraph.css';
import { useOnScreen } from '../../hooks/useOnScreen';
import { ScanEye, CalendarClock, Keyboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UserJourneyGraph = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);
    const containerClass = `user-journey-list ${isVisible ? 'animate-start' : ''}`;

    return (
        <div className={containerClass} ref={ref}>
            {/* Read */}
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <ScanEye size={20} strokeWidth={1.5} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.read')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.readDesc')}</p>
                </div>
            </div>

            {/* Plan */}
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <CalendarClock size={20} strokeWidth={1.5} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.plan')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.planDesc')}</p>
                </div>
            </div>

            {/* Input */}
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <Keyboard size={20} strokeWidth={1.5} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.input')}</p>
                    <p className="uj-item-subtitle">{t('project_p.scope.inputDesc')}</p>
                </div>
            </div>
        </div>
    );
};
