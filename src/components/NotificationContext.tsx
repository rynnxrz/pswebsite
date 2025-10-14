// src/components/NotificationContext.tsx

import { createContext, useState, useContext, ReactNode } from 'react';

interface NotificationContextType {
  isVisible: boolean;
  message: string;
  subMessage: string;
  showNotification: (msg: string, subMsg?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [subMessage, setSubMessage] = useState(''); // New state for the sub-message

  const showNotification = (msg: string, subMsg: string = '') => {
    setMessage(msg);
    setSubMessage(subMsg); // Set the sub-message
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Keep it visible for 4 seconds
  };

  return (
    <NotificationContext.Provider value={{ isVisible, message, subMessage, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};