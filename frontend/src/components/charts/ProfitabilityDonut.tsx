'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Income Tax', value: 45 },
  { name: 'GST Filing', value: 30 },
  { name: 'Audit', value: 15 },
  { name: 'Advisory', value: 10 },
];

const COLORS = ['#8B5CF6', '#F59E0B', '#3B82F6', '#10B981'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 border border-white/20 shadow-xl !bg-[#0f0c29]/90 backdrop-blur-3xl">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
          <span className="text-gray-300 font-medium">{payload[0].name}:</span>
          <span className="text-white font-bold">{payload[0].value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ProfitabilityDonut() {
  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Total Margin</span>
        <span className="text-3xl font-bold text-white text-gradient">68%</span>
      </div>
      
      {/* Custom Legend */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: COLORS[index], color: COLORS[index] }} />
            <span className="text-gray-300">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
