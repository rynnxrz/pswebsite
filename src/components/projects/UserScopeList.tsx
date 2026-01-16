import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ScanEye from 'lucide-react/dist/esm/icons/scan-eye';
import CalendarClock from 'lucide-react/dist/esm/icons/calendar-clock';
import Keyboard from 'lucide-react/dist/esm/icons/keyboard';
import { useOnScreen } from '../../hooks/useOnScreen';
import './UserScopeList.css';

export const UserScopeList = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '0px', 0.2, false);

    return (
        <div ref={ref} className={`user-scope-list ${isVisible ? 'animate-start' : ''}`}>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <ScanEye size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.read')}</p>
                </div>
            </div>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <CalendarClock size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.plan')}</p>
                </div>
            </div>
            <div className="uj-list-item">
                <div className="uj-item-icon">
                    <Keyboard size={18} strokeWidth={2} />
                </div>
                <div className="uj-item-main">
                    <p className="uj-item-title">{t('project_p.scope.input')}</p>
                </div>
            </div>
        </div>
    );
};
