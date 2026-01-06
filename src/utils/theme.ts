type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'theme';

const getTimeTheme = (): ThemeMode => {
  const hour = new Date().getHours();
  const isDaylight = hour >= 7 && hour < 19;
  return isDaylight ? 'light' : 'dark';
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
};

const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const initTheme = (): ThemeMode => {
  const storedTheme = getStoredTheme();
  const theme = storedTheme ?? getTimeTheme();
  applyTheme(theme);
  return theme;
};

export const setTheme = (theme: ThemeMode) => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
};

export const clearTheme = () => {
  window.localStorage.removeItem(THEME_STORAGE_KEY);
  applyTheme(getSystemTheme());
};
