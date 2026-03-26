'use client';

import React from 'react';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PredictiveInsightsCard() {
  return (
    <div className="glass-panel p-6 relative overflow-hidden group h-full">
      {/* Dynamic Gold Glow Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-amber-400/30 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/10 rounded-full blur-[60px] -ml-16 -mb-16" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/30 border border-amber-500/30 shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="font-bold text-lg text-white">AI Predictions</h3>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Based on historical filing patterns and current team velocity, 
          <span className="text-amber-400 font-semibold mx-1">3 task bottlenecks</span> 
          are expected in the <span className="text-white font-medium">Audit Department</span> next week.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Recommended Action</span>
          </div>
          <p className="text-xs text-gray-400 leading-snug">
            Reassign 2 Junior CA tasks from Audit to Compliance to balance workload and ensure 100% deadline compliance.
          </p>
        </div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all"
        >
          Optimize Workload <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
