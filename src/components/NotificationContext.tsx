// src/context/NotificationContext.tsx

// 修改点 1: 移除了未使用的 'React'
import { createContext, useState, useContext, ReactNode } from 'react';

interface NotificationContextType {
  showNotification: (message: string) => void;
  message: string;
  isVisible: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // 修改点 2: 将 NodeJS.Timeout 替换为 number
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showNotification = (newMessage: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setMessage(newMessage);
    setIsVisible(true);

    const newTimeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    // setTimeout 在浏览器中返回的是 number 类型
    setTimeoutId(newTimeoutId as unknown as number);
  };

  const value = { showNotification, message, isVisible };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};