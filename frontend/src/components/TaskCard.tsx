'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Task } from '@/types';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  isOverdue?: boolean;
}

const statusColors = {
  'Pending': 'text-gray-400 bg-gray-400/20',
  'In-Progress': 'text-amber-400 bg-amber-400/20',
  'Completed': 'text-emerald-400 bg-emerald-400/20'
};

const priorityColors = {
  'Low': 'bg-blue-500/20 text-blue-300',
  'Medium': 'bg-amber-500/20 text-amber-300',
  'High': 'bg-red-500/20 text-red-300'
};

const priorityIcons = {
  'Low': <CheckCircle2 className="w-3 h-3" />,
  'Medium': <Clock className="w-3 h-3" />,
  'High': <AlertCircle className="w-3 h-3" />
};

export default function TaskCard({ task, isOverdue = false }: TaskCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={clsx(
        "glass-card p-4 relative group cursor-grab active:cursor-grabbing",
        isOverdue ? "border-red-500/50 shadow-[0_4px_16px_0_rgba(239,68,68,0.2)]" : ""
      )}
    >
      {/* Status Ring / Indicator */}
      <div className="flex justify-between items-start mb-3">
        <div className={clsx("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5", priorityColors[task.priority])}>
          {priorityIcons[task.priority]}
          {task.priority} Priority
        </div>
        <div className={clsx("w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]", statusColors[task.status].split(' ')[0])} />
      </div>

      <h3 className="text-white font-semibold text-base leading-tight mb-1 group-hover:text-violet-300 transition-colors">{task.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4 group-hover:line-clamp-none transition-all">{task.description}</p>

      <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-gray-300">
          <User className="w-3.5 h-3.5" />
          <span className="truncate max-w-[100px]" title={task.client_name}>{task.client_name}</span>
        </div>
        <div className={clsx("flex items-center gap-1.5", isOverdue ? "text-red-400 font-semibold" : "text-gray-300")}>
          <Calendar className="w-3.5 h-3.5" />
          {new Date(task.deadline).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}
