'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNotification } from '@/contexts/NotificationContext';
import NotificationBubble from './NotificationBubble';

export default function NotificationContainer() {
  const { notifications } = useNotification();
  
  // Show only unread notifications, max 5 at a time
  const visibleNotifications = notifications.filter(n => !n.isRead).slice(0, 5);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
      <div className="flex flex-col-reverse gap-3 pointer-events-auto">
        <AnimatePresence>
          {visibleNotifications.map(notification => (
            <NotificationBubble 
              key={notification.id} 
              notification={notification} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
