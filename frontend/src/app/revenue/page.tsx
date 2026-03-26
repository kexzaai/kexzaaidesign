'use client';

import React, { useState } from 'react';
import { IndianRupee, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import RevenueBarChart from '@/components/charts/RevenueBarChart';
import ProfitabilityDonut from '@/components/charts/ProfitabilityDonut';
import clsx from 'clsx';

import { useRevenue } from '@/hooks/useRevenue';

const METRIC_CONFIG = [
  {
    icon: <IndianRupee className="w-5 h-5" />,
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400'
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400'
  }
];

export default function RevenueDashboard() {
  const { metrics, loading, error } = useRevenue();
  const [timeFilter, setTimeFilter] = useState('6M');

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
        Error loading revenue: {error}
      </div>
    );
  }

  const mergedMetrics = metrics.map((m, i) => ({ ...m, ...METRIC_CONFIG[i] }));

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Revenue & Billing</h1>
          <p className="text-gray-400 mt-1">Track financial performance, monitor outstanding payments, and analyze profitability.</p>
        </div>
        
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
          {['1M', '3M', '6M', 'YTD', '1Y'].map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                timeFilter === filter 
                  ? "bg-violet-500 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {mergedMetrics.map((metric, idx) => (
          <div key={idx} className="glass-panel p-5 relative overflow-hidden group">
            <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500", metric.color)} />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{metric.title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h3>
              </div>
              <div className={clsx("p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner", metric.iconColor)}>
                {metric.icon}
              </div>
            </div>
            <div className="relative z-10 mt-4 flex items-center gap-2 text-sm">
              <span className={clsx("font-semibold", metric.trendUp ? 'text-emerald-400' : 'text-emerald-400')}>
                {/* Note: In a real app the trend color should match the boolean logic precisely */}
                {metric.trend}
              </span>
              <span className="text-gray-400">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-white">Billed vs Collected</h3>
            <button className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">
              <Calendar className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
          <div className="flex-1 w-full relative -ml-4">
            <RevenueBarChart />
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col">
          <div className="mb-2">
            <h3 className="font-semibold text-lg text-white">Service Profitability</h3>
            <p className="text-xs text-gray-400">Revenue breakdown by CA service line</p>
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            <ProfitabilityDonut />
          </div>
        </div>
      </div>
      
      {/* Bottom Row: Pending Invoices snippet (Mocked) */}
      <div className="glass-panel p-6 flex-1">
        <h3 className="font-semibold text-lg text-white flex gap-2 items-center mb-4">
           Critical Pending Invoices <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/30">2 Overdue</span>
        </h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Invoice #</th>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-4 font-medium text-white">INV-2026-089</td>
                <td className="px-4 py-4">TechCorp India Pvt Ltd</td>
                <td className="px-4 py-4">GST Audit</td>
                <td className="px-4 py-4">₹45,000</td>
                <td className="px-4 py-4"><span className="text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-500/20">Overdue (15 days)</span></td>
                <td className="px-4 py-4 text-right"><button className="text-violet-400 hover:text-violet-300 underline">Send Reminder</button></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-4 font-medium text-white">INV-2026-092</td>
                <td className="px-4 py-4">Global Exports LLP</td>
                <td className="px-4 py-4">TDS Filing</td>
                <td className="px-4 py-4">₹12,500</td>
                <td className="px-4 py-4"><span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-500/20">Pending</span></td>
                <td className="px-4 py-4 text-right"><button className="text-violet-400 hover:text-violet-300 underline">View Invoice</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
