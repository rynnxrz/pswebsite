import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Sun from 'lucide-react/dist/esm/icons/sun';
import { useTranslation } from 'react-i18next';
import { setTheme } from '../utils/theme';
import './ThemeToggle.css';

type ThemeMode = 'dark' | 'light';

const getActiveTheme = (): ThemeMode => {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  const theme = document.documentElement.dataset.theme;
  return theme === 'light' ? 'light' : 'dark';
};

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [theme, setThemeState] = useState<ThemeMode>(() => getActiveTheme());
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const isProjectPage = location.pathname.startsWith('/project/') || location.pathname === '/germanier-paris-2026';

  useEffect(() => {
    setThemeState(getActiveTheme());
  }, []);

  // Listen for project header sticky state changes
  useEffect(() => {
    // Reset sticky state on location change to avoid stale state
    setIsHeaderSticky(false);

    const handleStickyChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isSticky: boolean }>;
      setIsHeaderSticky(customEvent.detail.isSticky);
    };

    window.addEventListener('projectheader-sticky', handleStickyChange as EventListener);
    return () => {
      window.removeEventListener('projectheader-sticky', handleStickyChange as EventListener);
    };
  }, [location.pathname]); // Re-bind on location change to ensure clean state

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const label = theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark');

  // On project pages, hide until header becomes sticky
  const isVisible = !isProjectPage || isHeaderSticky;

  return (
    <button
      type="button"
      className={`theme-toggle ${theme}${isProjectPage ? ' project-page-toggle' : ''}${isHeaderSticky ? ' sticky-mode' : ''}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <span className="theme-toggle-icon">
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
};
