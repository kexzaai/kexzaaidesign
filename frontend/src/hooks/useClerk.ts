'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

import { ClerkSuggestion } from '@/types';

export type { ClerkSuggestion };

export function useClerk() {
  const [suggestions, setSuggestions] = useState<ClerkSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchSuggestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clerk_suggestions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const mapped = (data || []).map((s: any) => ({
          ...s,
          timestamp: 'Just now' // Or format s.created_at
        }));
        setSuggestions(mapped);
      }
      setLoading(false);
    };

    fetchSuggestions();

    const channel = supabase
      .channel('clerk-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'clerk_suggestions',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchSuggestions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { suggestions, loading, error };
}
