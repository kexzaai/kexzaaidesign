'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const data = [
  { day: 'Mon', completed: 12, pending: 8, bottlenecks: 2 },
  { day: 'Tue', completed: 19, pending: 12, bottlenecks: 4 },
  { day: 'Wed', completed: 15, pending: 20, bottlenecks: 8 }, // Bottleneck peak
  { day: 'Thu', completed: 25, pending: 15, bottlenecks: 5 },
  { day: 'Fri', completed: 30, pending: 10, bottlenecks: 3 },
  { day: 'Sat', completed: 18, pending: 5, bottlenecks: 1 },
  { day: 'Sun', completed: 10, pending: 3, bottlenecks: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 border border-white/20 shadow-2xl !bg-[#0f0c29]/90 backdrop-blur-3xl min-w-[150px]">
        <p className="text-white font-bold mb-3 border-b border-white/10 pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center gap-4 text-sm mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-300 capitalize">{entry.name}:</span>
            </div>
            <span className="text-white font-mono font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function WorkflowEfficiencyChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBottlenecks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="rgba(255,255,255,0.4)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.4)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs text-gray-400 font-medium px-2">{value}</span>}
          />
          <Area 
            type="monotone" 
            dataKey="completed" 
            name="Tasks Completed"
            stroke="#8B5CF6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCompleted)" 
          />
          <Area 
            type="monotone" 
            dataKey="bottlenecks" 
            name="Bottlenecks"
            stroke="#F59E0B" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBottlenecks)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
