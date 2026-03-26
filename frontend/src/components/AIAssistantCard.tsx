'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, X, Check, Eye, Bot, AlertCircle } from 'lucide-react';
import { ClerkSuggestion } from '@/types';
import clsx from 'clsx';

interface AIAssistantCardProps {
  suggestion: ClerkSuggestion;
  onSend: (id: string) => void;
  onIgnore: (id: string) => void;
  onReview: (id: string) => void;
}

export default function AIAssistantCard({ suggestion, onSend, onIgnore, onReview }: AIAssistantCardProps) {
  // Confidence Score Color Logic
  const confidenceColor = 
    suggestion.confidence >= 90 ? 'text-emerald-400 bg-emerald-400/20 border-emerald-500/30' :
    suggestion.confidence >= 70 ? 'text-amber-400 bg-amber-400/20 border-amber-500/30' :
    'text-red-400 bg-red-400/20 border-red-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3 shadow-lg relative group overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className={clsx("p-2 rounded-full border border-violet-500/20 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.2)]", 
          suggestion.type === 'Message' ? "bg-blue-500/10" : "bg-amber-500/10"
        )}>
          {suggestion.type === 'Message' ? <Send className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-white">{suggestion.title}</h4>
            <div className={clsx("px-2 py-0.5 rounded-full text-[10px] font-bold border", confidenceColor)}>
              {suggestion.confidence}% Match
            </div>
          </div>
          
          <p className="text-xs text-gray-300 mb-3 leading-relaxed mt-1">
            {suggestion.description}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => onSend(suggestion.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
            >
              <Check className="w-3 h-3" /> {suggestion.type === 'Message' ? 'Send' : 'Apply'}
            </button>
            <button 
              onClick={() => onReview(suggestion.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3 h-3" /> Review
            </button>
            <button 
              onClick={() => onIgnore(suggestion.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-transparent hover:bg-white/5 text-gray-400 transition-colors flex items-center gap-1.5 ml-auto"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
