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

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            if (mediaQuery.addEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    return isPrintMode;
};
