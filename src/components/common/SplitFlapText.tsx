import { AnimatePresence, motion } from 'framer-motion';

interface SplitFlapTextProps {
    value: string;
}

export const SplitFlapText = ({ value }: SplitFlapTextProps) => {
    return (
        <div
            className="split-flap-container"
            style={{
                position: 'relative',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '600px',
            }}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={value}
                    initial={{ rotateX: -90, opacity: 0, filter: 'blur(2px)' }}
                    animate={{ rotateX: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ rotateX: 90, opacity: 0, filter: 'blur(2px)' }}
                    transition={{
                        rotateX: { type: "spring", stiffness: 200, damping: 20, mass: 0.8 },
                        opacity: { duration: 0.2, ease: "easeOut" },
                        filter: { duration: 0.2, ease: "easeOut" }
                    }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'block' }}
                    >
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="currentColor"
                            fontSize={value === '中' ? '15' : '13'}
                            fontWeight="600"
                            dy="1"
                        >
                            {value}
                        </text>
                    </svg>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
