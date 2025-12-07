import { useState, useEffect, MutableRefObject } from 'react';

export function useOnScreen<T extends Element>(
    ref: MutableRefObject<T | null>,
    rootMargin: string = '0px',
    threshold: number = 0.2,
    triggerOnce: boolean = true // Default to true to maintain existing behavior
): boolean {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (triggerOnce) {
                    // Trigger only once when it enters the viewport
                    if (entry.isIntersecting) {
                        setIntersecting(true);
                        observer.unobserve(element);
                    }
                } else {
                    // Update state whenever intersection changes
                    setIntersecting(entry.isIntersecting);
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, rootMargin, threshold]);

    return isIntersecting;
}
