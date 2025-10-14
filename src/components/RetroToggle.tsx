// src/components/RetroToggle.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RetroToggle.css';

export const RetroToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [isPulled, setIsPulled] = useState(false);

  const toggleSwitch = () => {
    if (isPulled) return;
    setIsPulled(true);
    setTimeout(() => {
      setIsOn(prevIsOn => !prevIsOn);
    }, 150);
    setTimeout(() => {
      setIsPulled(false);
    }, 300);
  };

  const crtVariants = {
    hidden: { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
  };

  // --- 1. Revert to chain-stretch animation ---
  const chainInitialHeight = 32;
  const pullDistance = 20;

  return (
    <>
      {/* 2. Tooltip has been removed */}
      <div className="pull-chain-switch" onClick={toggleSwitch}>
        <div className="switch-wrapper">
          {/* 3. Animate the height of the chain directly */}
          <motion.div
            className="chain"
            animate={{ 
              height: isPulled ? chainInitialHeight + pullDistance : chainInitialHeight 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          ></motion.div>
          <div className="handle"></div>
        </div>
      </div>

      <AnimatePresence>
        {isOn && (
          <motion.div
            className="crt-screen"
            variants={crtVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <iframe
              src="/mosaic3d/index.html"
              title="Mosaic 3D"
              className="content-iframe"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};