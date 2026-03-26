'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ChevronDown, 
  Calendar, 
  Filter, 
  ArrowUpRight 
} from 'lucide-react';
import WorkflowEfficiencyChart from '../../components/analytics/WorkflowEfficiencyChart';
import TeamPerformanceMatrix from '../../components/analytics/TeamPerformanceMatrix';
import PredictiveInsightsCard from '../../components/analytics/PredictiveInsightsCard';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useAnalytics } from '@/hooks/useAnalytics';

const STATS_CONFIG = [
  { 
    icon: <Clock className="w-5 h-5 text-violet-400" />,
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30'
  },
  { 
    icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30'
  },
  { 
    icon: <Users className="w-5 h-5 text-amber-400" />,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30'
  },
  { 
    icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
    color: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-500/30'
  }
];

export default function AnalyticsPage() {
  const { stats, loading, error } = useAnalytics();
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400 font-medium">
        Error loading analytics: {error}
      </div>
    );
  }

  // Merge the config (icons/colors) with the real data
  const mergedStats = (stats || []).map((s, i) => ({ ...s, ...STATS_CONFIG[i] }));

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Firm Insights & Analytics</h1>
          <p className="text-gray-400 mt-1">Deep-dive into performance metrics, team orchestration, and predictive workload forecasting.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
              <Calendar className="w-4 h-4 text-violet-400" />
              {timePeriod}
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
            </button>
          </div>
          <button className="p-2.5 bg-violet-600/20 border border-violet-500/30 rounded-xl hover:bg-violet-600/30 transition-all text-violet-400 shadow-inner">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mergedStats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className={clsx(stat.borderColor, "glass-panel p-5 relative overflow-hidden group border-b-2")}
          >
            <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-100 transition-opacity duration-700", stat.color)} />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                  <span className={clsx("text-[10px] font-bold px-1.5 py-0.5 rounded-full", 
                    stat.trend.includes('+') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                    stat.trend === 'Steady' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 
                    'bg-red-500/20 text-red-400 border border-red-500/20'
                  )}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10 mt-4 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-medium">Updated 10m ago</span>
              <button className="text-[10px] text-violet-400 font-bold hover:underline flex items-center gap-0.5">
                DETAILS <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Trends */}
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl text-white">Workflow Efficiency & Bottlenecks</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-gray-400">Processed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-gray-400">Critical Delays</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-black/10 rounded-2xl p-4 border border-white/5">
             <WorkflowEfficiencyChart />
          </div>
        </div>

        {/* AI Predictive Insights */}
        <div className="lg:col-span-1">
          <PredictiveInsightsCard />
        </div>
      </div>

      {/* Secondary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        {/* Team Performance */}
        <div className="glass-panel p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-white">Team Performance Index</h3>
            <p className="text-xs text-gray-400 mt-1">Holistic view across Accuracy, Speed, and Compliance markers.</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-t from-black/20 to-transparent rounded-2xl border border-white/5 shadow-inner">
            <TeamPerformanceMatrix />
          </div>
        </div>

        {/* Revenue Contribution Heatmap Snippet */}
        <div className="glass-panel p-6">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-white">Top Revenue Drivers</h3>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">By Service Line</button>
           </div>
           
           <div className="space-y-4">
              {[
                { name: 'Income Tax Audit', value: 45, color: 'bg-violet-500' },
                { name: 'GST Filing', value: 30, color: 'bg-indigo-500' },
                { name: 'Corporate Advisory', value: 15, color: 'bg-amber-500' },
                { name: 'TDS Management', value: 10, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.name} className="relative group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-gray-300">{item.name}</span>
                    <span className="text-xs font-bold text-white">₹{(item.value * 25000).toLocaleString('en-IN')} <span className="text-gray-500 font-normal ml-1">({item.value}%)</span></span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <motion.div 
                      key={item.name}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }} 
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={clsx("h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", item.color)} 
                    />
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-8 pt-8 border-t border-white/5">
              <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group">
                 View Detailed Revenue Audit <TrendingUp className="w-4 h-4 text-violet-400 group-hover:scale-125 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
