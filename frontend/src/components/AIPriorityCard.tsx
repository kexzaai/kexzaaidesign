'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ClerkSuggestion } from '@/types';

interface AIPriorityCardProps {
  suggestion: ClerkSuggestion;
  onApply: (taskId: string, priority: string) => void;
  onDismiss: (id: string) => void;
}

export default function AIPriorityCard({ suggestion, onApply, onDismiss }: AIPriorityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-amber-500/10 p-4 mb-3"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-violet-500/20 text-violet-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            AI Priority Suggestion
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 uppercase tracking-wider">
              {suggestion.priority}
            </span>
          </h4>
          <p className="text-xs text-gray-300 mt-1.5 mb-3 leading-relaxed">
            {suggestion.description}
          </p>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onApply(suggestion.prefilledData?.task_id || suggestion.id, suggestion.priority)}
              className="text-xs font-medium px-3 py-1.5 rounded bg-violet-500 hover:bg-violet-600 text-white transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            >
              Apply Change <ArrowRight className="w-3 h-3" />
            </button>
            <button 
              onClick={() => onDismiss(suggestion.id)}
              className="text-xs font-medium px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
