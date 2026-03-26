'use client';

import React from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip
} from 'recharts';

const data = [
  { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
  { subject: 'Accuracy', A: 98, B: 130, fullMark: 150 },
  { subject: 'Volume', A: 86, B: 130, fullMark: 150 },
  { subject: 'Client Feedback', A: 99, B: 100, fullMark: 150 },
  { subject: 'Compliance', A: 85, B: 90, fullMark: 150 },
  { subject: 'Timeliness', A: 65, B: 85, fullMark: 150 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 border border-white/20 shadow-2xl !bg-[#0f0c29]/90 backdrop-blur-3xl min-w-[120px]">
        <p className="text-white font-bold mb-2 text-xs border-b border-white/10 pb-1">{payload[0].payload.subject}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-3">
            <span className="text-[10px] text-violet-400 font-medium">Core Audit Team:</span>
            <span className="text-white font-mono text-xs font-bold">{payload[0].value}%</span>
          </div>
          <div className="flex justify-between items-center gap-3">
            <span className="text-[10px] text-amber-400 font-medium">Average (Firm):</span>
            <span className="text-white font-mono text-xs font-bold">{payload[1].value}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TeamPerformanceMatrix() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis 
            dataKey="subject" 
            stroke="rgba(255,255,255,0.5)" 
            fontSize={11}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 150]} 
            tick={false} 
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Core Audit Team"
            dataKey="A"
            stroke="#8B5CF6"
            strokeWidth={2}
            fill="#8B5CF6"
            fillOpacity={0.5}
          />
          <Radar
            name="Average"
            dataKey="B"
            stroke="#F59E0B"
            strokeWidth={2}
            fill="#F59E0B"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
