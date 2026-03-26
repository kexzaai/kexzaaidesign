'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, Check } from 'lucide-react';
import clsx from 'clsx';
import { useNotification } from '@/contexts/NotificationContext';

import { MessageData } from '@/types';

interface ChatBubbleProps {
  message: MessageData;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { addNotification } = useNotification();
  const [isHovered, setIsHovered] = useState(false);
  const [draftStatus, setDraftStatus] = useState<'draft' | 'sent'>('draft');

  const containerClasses = clsx(
    "flex w-full mb-4 px-4",
    message.isCurrentUser && !message.isAIDraft ? "justify-end" : "justify-start"
  );

  const bubbleClasses = clsx(
    "relative max-w-[75%] px-4 py-3 rounded-2xl glass-panel group transition-all duration-300",
    message.isAIDraft 
      ? "bg-gradient-to-r border-amber-500/30 from-amber-500/10 to-transparent bg-white/5 border border-white/10" 
      : message.isCurrentUser
        ? "bg-violet-600/40 border border-violet-500/30 text-white rounded-tr-sm"
        : "bg-white/10 border border-white/10 text-gray-100 rounded-tl-sm"
  );

  const handleSendDraft = () => {
    setDraftStatus('sent');
    addNotification({
      title: 'Draft Sent',
      message: 'Your AI drafted message has been sent to the client channel.',
      priority: 'Low'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
    >
      <div 
        className={bubbleClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!message.isCurrentUser && !message.isAIDraft && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-violet-300">{message.senderName}</span>
            <span className="text-[10px] text-gray-500">{message.timestamp}</span>
          </div>
        )}
        
        {message.isAIDraft && (
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Bot className="w-3.5 h-3.5" /> 
              AI Draft Suggestion <Sparkles className="w-3 h-3" />
            </div>
            <span className="text-[10px] text-gray-500 hidden group-hover:block transition-all">{message.timestamp}</span>
          </div>
        )}

        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>

        {message.isCurrentUser && !message.isAIDraft && (
          <div className="text-right mt-1">
            <span className="text-[10px] text-violet-200/50">{message.timestamp}</span>
          </div>
        )}

        {/* AI Draft Inline Actions */}
        {message.isAIDraft && draftStatus === 'draft' && (
          <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
            <button 
              onClick={handleSendDraft}
              className="flex-1 py-1.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white text-xs font-medium rounded-lg shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send to Client
            </button>
            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-white/5">
              Edit
            </button>
          </div>
        )}
        
        {message.isAIDraft && draftStatus === 'sent' && (
           <div className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
             <Check className="w-3.5 h-3.5" /> Sent successfully
           </div>
        )}
      </div>
    </motion.div>
  );
}
