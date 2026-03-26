'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

import { ChannelData } from '@/types';

export function useChannels() {
  const [channels, setChannels] = useState<ChannelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchChannels = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        setError(error.message);
      } else {
        setChannels(data || []);
      }
      setLoading(false);
    };

    fetchChannels();

    const channel = supabase
      .channel('channels-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'channels',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchChannels();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { channels, loading, error };
}
