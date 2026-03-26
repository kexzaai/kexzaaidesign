'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minus, Sparkles } from 'lucide-react';
import { useClerk } from '@/hooks/useClerk';
import AIAssistantCard from './AIAssistantCard';

export default function DigitalClerkPanel() {
  const { suggestions, loading } = useClerk();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dragConstraintsRef = useRef(null);

  if (!isVisible) return null;

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const activeSuggestions = suggestions.filter(s => !dismissedIds.includes(s.id));

  const handleAction = (id: string, actionName: string) => {
    // In a real app, this would trigger global state or API calls
    console.log(`Action ${actionName} applied on ${id}`);
    setDismissedIds(prev => [...prev, id]);
  };

  return (
    <>
      <div ref={dragConstraintsRef} className="fixed inset-0 pointer-events-none z-50">
        <motion.div
          drag
          dragConstraints={dragConstraintsRef}
          dragMomentum={false}
          initial={{ opacity: 0, y: 50, x: 'calc(100vw - 380px)' }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto absolute top-24 shadow-[0_15px_50px_-12px_rgba(139,92,246,0.3)]"
          style={{ width: '340px' }}
        >
          {/* Main Glass Panel */}
          <div className="glass-panel overflow-hidden border-violet-500/30 bg-[#0B0914]/90 backdrop-blur-2xl">
            {/* Header / Drag Handle */}
            <div className="p-3 bg-gradient-to-r from-violet-600/20 to-amber-500/10 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center relative">
                  <span className="absolute inset-0 bg-violet-400 blur-md opacity-40 animate-pulse rounded-full" />
                  <Bot className="w-4 h-4 text-violet-300 relative z-10" />
                </div>
                <h3 className="font-semibold text-white/90 text-sm flex items-center gap-1.5">
                  Digital Clerk <Sparkles className="w-3 h-3 text-amber-400" />
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-3">
                        <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        <span className="text-xs text-gray-500">Clerk is thinking...</span>
                      </div>
                    ) : activeSuggestions.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <AnimatePresence mode="popLayout">
                          {activeSuggestions.map((suggestion) => (
                            <AIAssistantCard
                              key={suggestion.id}
                              suggestion={suggestion}
                              onSend={(id) => handleAction(id, 'send')}
                              onReview={(id) => handleAction(id, 'review')}
                              onIgnore={(id) => handleAction(id, 'ignore')}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400 text-sm">
                        No active suggestions right now.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
