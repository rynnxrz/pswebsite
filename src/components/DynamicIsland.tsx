// src/components/DynamicIsland.tsx

import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useNotification } from './NotificationContext';
import './DynamicIsland.css';

export const DynamicIsland = () => {
  const { isVisible, message } = useNotification();

  return (
    <div className="dynamic-island-wrapper">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="dynamic-island-base"
            initial={{
              scale: 0.85,
              opacity: 0,
              y: -30, // 从顶部更远一点的位置开始
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
              y: -30,
            }}
            // 设置变换原点为顶部中心，让缩放感觉更自然
            style={{ transformOrigin: "top center" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            {/* 内容不再需要自己的动画，由父容器统一处理 */}
            <div className="island-content">
              <Info size={16} className="icon" />
              <p className="message">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};