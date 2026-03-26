'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type NotificationPriority = 'High' | 'Medium' | 'Low';

export interface Notification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  targetLink?: string;
  isRead: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Some mock notifications to start
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Urgent Filing Due',
    message: 'TechCorp GST Returns are due today.',
    priority: 'High',
    isRead: false,
    timestamp: new Date()
  },
  {
    id: 'notif-2',
    title: 'AI Suggestion',
    message: 'Draft prepared for Sharma Associates.',
    priority: 'Medium',
    isRead: false,
    timestamp: new Date(Date.now() - 3600000)
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((notif: Omit<Notification, 'id' | 'isRead' | 'timestamp'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      isRead: false,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount, addNotification, markAsRead, markAllAsRead, removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
