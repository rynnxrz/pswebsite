import { useEffect, useState } from 'react';

export const usePrintMode = () => {
    const [isPrintMode, setIsPrintMode] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia('print');
        const handleChange = (event: MediaQueryListEvent) => {
            setIsPrintMode(event.matches);
        };
        const handleBeforePrint = () => setIsPrintMode(true);
        const handleAfterPrint = () => setIsPrintMode(false);

        setIsPrintMode(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    return isPrintMode;
};
