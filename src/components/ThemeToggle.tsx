import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
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
  const [theme, setThemeState] = useState<ThemeMode>(() => getActiveTheme());

  useEffect(() => {
    setThemeState(getActiveTheme());
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const label = theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark');

  return (
    <button
      type="button"
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-icon">
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
};
