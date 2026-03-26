'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { name: 'Jan 26', billed: 400000, collected: 240000 },
  { name: 'Feb 26', billed: 300000, collected: 139800 },
  { name: 'Mar 26', billed: 200000, collected: 980000 },
  { name: 'Apr 26', billed: 278000, collected: 390800 },
  { name: 'May 26', billed: 189000, collected: 480000 },
  { name: 'Jun 26', billed: 239000, collected: 380000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 border border-white/20 shadow-xl !bg-[#0f0c29]/90 backdrop-blur-3xl">
        <p className="text-white font-semibold mb-2 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-300 capitalize">{entry.name}:</span>
            <span className="text-white font-bold">₹{(entry.value).toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueBarChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.5)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#fff' }} iconType="circle" />
          <Bar dataKey="billed" name="Billed Amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="collected" name="Collected Amount" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
