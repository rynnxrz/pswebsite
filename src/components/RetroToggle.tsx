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

  // 定义绳子的初始高度和被拉长后的高度
  const chainInitialHeight = 32;
  const pullDistance = 20;

  return (
    <>
      <div className="pull-chain-switch" onClick={toggleSwitch}>
        {/* 
          修改点 1: 
          - 这个 wrapper 不再有动画，它只是一个静态的布局容器。
        */}
        <div className="switch-wrapper">
          {/* 
            修改点 2:
            - 将动画应用到绳子 .chain 上。
            - 我们动画的是它的 height 属性。
          */}
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