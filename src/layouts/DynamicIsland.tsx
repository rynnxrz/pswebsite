// src/components/DynamicIsland.tsx

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react'; // A more appropriate icon for success
import { useNotification } from '../components/NotificationContext';
import './DynamicIsland.css';

export const DynamicIsland = () => {
  // Now includes subMessage
  const { isVisible, message, subMessage } = useNotification();

  return (
    <div className="dynamic-island-wrapper">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="dynamic-island-base"
            initial={{ scale: 0.85, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -30 }}
            style={{ transformOrigin: "top center" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="island-content">
              <CheckCircle2 size={20} className="icon" />
              <div className="message-wrapper">
                <p className="message">{message}</p>
                {/* Conditionally render the sub-message if it exists */}
                {subMessage && <p className="sub-message">{subMessage}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};