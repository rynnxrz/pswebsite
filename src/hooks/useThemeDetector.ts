import { useState, useEffect } from 'react';

export const useThemeDetector = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof document === 'undefined') return 'dark';
        return (document.documentElement.dataset.theme as 'light' | 'dark') || 'dark';
    });

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme'
                ) {
                    const newTheme = (document.documentElement.dataset.theme as 'light' | 'dark') || 'dark';
                    setTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    return theme;
};
