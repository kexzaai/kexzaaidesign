'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskBoard from '@/components/TaskBoard';
import AIPriorityCard from '@/components/AIPriorityCard';
import { Task, TaskStatus } from '@/types';
import { useTasks } from '@/hooks/useTasks';

import { useClerk, ClerkSuggestion } from '@/hooks/useClerk';

export default function WorkflowPage() {
  const { tasks, loading: tasksLoading, error, updateTaskStatus } = useTasks();
  const { suggestions: clerkSuggestions, loading: clerkLoading } = useClerk();
  
  // Filter for priority-specific suggestions if needed
  const suggestions = clerkSuggestions.filter((s: ClerkSuggestion) => s.type === 'Action' || s.type === 'Insight');

  const handleTaskStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Failed to update task status:', err);
      // Revert UI or show error notification via context if needed
    }
  };

  const handleApplySuggestion = (taskId: string, priority: string) => {
    // Eventually update the task priority via updateTask hook
    console.log('Applying priority', priority, 'to task', taskId);
  };

  const handleDismissSuggestion = (id: string) => {
    console.log('Dismissed suggestion', id);
  };

  if (tasksLoading || clerkLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400 font-medium">
        Error loading workflow: {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Workflow & Tasks</h1>
          <p className="text-gray-400 mt-1">Manage client deliverables, track deadlines, and monitor team progress.</p>
        </div>
        <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">
          + New Task
        </button>
      </div>

      <div className="flex gap-6 h-full">
        {/* Main Board Area */}
        <div className="flex-1">
          <TaskBoard 
            initialTasks={tasks} 
            onTaskStatusChange={handleTaskStatusChange} 
          />
        </div>

        {/* Right Sidebar for AI & Activity */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4">
          <div className="glass-panel p-5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4 relative z-10">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Digital Clerk
            </h3>
            
            <div className="space-y-3 relative z-10">
              <AnimatePresence>
                {suggestions.map(s => (
                  <AIPriorityCard 
                    key={s.id} 
                    suggestion={s} 
                    onApply={handleApplySuggestion}
                    onDismiss={handleDismissSuggestion}
                  />
                ))}
              </AnimatePresence>
              
              {suggestions.length === 0 && (
                <div className="text-sm text-gray-400 text-center py-6 border border-white/5 rounded-lg">
                  All caught up! No active suggestions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
