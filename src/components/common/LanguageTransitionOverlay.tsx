import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SplitFlap } from 'react-split-flap';

interface LanguageTransitionOverlayProps {
    fromLang: string;
    toLang: string;
    onComplete: () => void;
}

export const LanguageTransitionOverlay = ({ fromLang, toLang, onComplete }: LanguageTransitionOverlayProps) => {
    // Target length is 7 for "ENGLISH"
    const LEN = 7;

    // Initialize with the starting word properly padded
    const getPaddedString = (lang: string) => {
        return lang === 'en' ? 'ENGLISH' : '中文     ';
    };

    const initialChars = getPaddedString(fromLang).split('');
    const [charStates, setCharStates] = useState<string[]>(initialChars);

    useEffect(() => {
        const targetStr = getPaddedString(toLang);
        const targetChars = targetStr.split('');

        // Timers array to clear on unmount
        const timers: NodeJS.Timeout[] = [];

        // Staggered update
        // Start the sequence after an initial Pause
        const startDelay = 50;

        targetChars.forEach((char, index) => {
            // Ripple delay: each character starts flipping 80ms after the previous one
            const delay = startDelay + (index * 80);

            const timer = setTimeout(() => {
                setCharStates(prev => {
                    const next = [...prev];
                    next[index] = char;
                    return next;
                });
            }, delay);

            timers.push(timer);
        });

        // 2. Complete callback
        // Dynamic buffer based on language length/complexity
        // ZH: 1s, EN: 1.25s
        const buffer = toLang === 'zh' ? 1000 : 1250;
        const totalDuration = startDelay + (LEN * 80) + buffer;

        const completeTimer = setTimeout(() => {
            onComplete();
        }, totalDuration);
        timers.push(completeTimer);

        return () => {
            timers.forEach(t => clearTimeout(t));
        };
    }, [toLang, onComplete]);

    // Custom character set including only necessary English and Chinese characters
    const customChars = [' ', 'E', 'N', 'G', 'L', 'I', 'S', 'H', '中', '文'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                padding: '40px',
                background: '#09090b',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                gap: '4px', // Space between individual flaps
            }}>
                {charStates.map((char, index) => (
                    <SplitFlap
                        key={index}
                        value={char}
                        chars={customChars}
                        length={1} // Single character mode
                        theme="dark"
                        size="large"
                        timing={50}
                        padMode="end"
                        background="#18181b"
                    />
                ))}
            </div>
        </motion.div>
    );
};
