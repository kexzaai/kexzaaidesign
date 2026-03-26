'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Task, TaskStatus } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          client:clients(name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const mappedTasks = (data as any[] || []).map(t => ({
          ...t,
          client_name: (t as any).client?.name || 'In-House / Unknown'
        }));
        setTasks(mappedTasks as Task[]);
      }
      setLoading(false);
    };

    fetchTasks();

    // Real-time subscription
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tasks',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .eq('user_id', user?.id);

    if (error) throw error;
  };

  const createTask = async (task: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, user_id: user?.id }])
      .select();

    if (error) throw error;
    return data[0];
  };

  return { tasks, loading, error, updateTaskStatus, createTask };
}
