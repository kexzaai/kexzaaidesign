'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';
import { Notification, useNotification } from '@/contexts/NotificationContext';
import clsx from 'clsx';

export default function NotificationBubble({ notification }: { notification: Notification }) {
  const { markAsRead, removeNotification } = useNotification();
  const [isHovered, setIsHovered] = useState(false);

  // Gradient based on priority
  const gradientClass = 
    notification.priority === 'High' ? 'from-amber-600/30 to-orange-500/20 border-amber-500/40 text-amber-100' :
    notification.priority === 'Medium' ? 'from-purple-600/30 to-pink-500/20 border-purple-500/40 text-purple-100' :
    'from-violet-600/30 to-blue-500/20 border-violet-500/40 text-violet-100';

  const Icon = 
    notification.priority === 'High' ? AlertTriangle :
    notification.priority === 'Medium' ? Bell : Info;

  const iconColor = 
    notification.priority === 'High' ? 'text-amber-400' :
    notification.priority === 'Medium' ? 'text-purple-400' : 'text-violet-400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "relative w-80 p-4 rounded-xl shadow-2xl glass-panel border backdrop-blur-3xl overflow-hidden group transition-all duration-300",
        gradientClass,
        notification.isRead ? "opacity-60" : "opacity-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      )}
    >
      <div className="flex items-start gap-3 relative z-10">
        <div className={clsx("p-2 rounded-full bg-white/10 shrink-0", iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 pr-6">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-sm leading-tight">{notification.title}</h4>
            <span className="text-[10px] text-white/50">{notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <p className="text-sm text-white/70 leading-snug">{notification.message}</p>
        </div>
        
        <button 
          onClick={() => removeNotification(notification.id)}
          className="absolute top-0 right-0 p-1 text-white/40 hover:text-white/80 transition-colors rounded-lg bg-black/20 hover:bg-black/40"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence>
        {isHovered && !notification.isRead && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex gap-2 mt-3 pt-3 border-t border-white/10 relative z-10 overflow-hidden"
          >
            <button 
              onClick={() => markAsRead(notification.id)}
              className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Mark Done
            </button>
            <button 
              onClick={() => setTimeout(removeNotification, 1000, notification.id)} // Simulated snooze
              className="flex-1 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-xs text-white/70 font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" /> Snooze
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Glow */}
      <div className={clsx("absolute -right-10 -bottom-10 w-32 h-32 blur-3xl rounded-full opacity-50 z-0", 
        notification.priority === 'High' ? 'bg-amber-500' :
        notification.priority === 'Medium' ? 'bg-purple-500' : 'bg-violet-500'
      )} />
    </motion.div>
  );
}
