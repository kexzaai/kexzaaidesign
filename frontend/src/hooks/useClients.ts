'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Client } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setClients(data || []);
      }
      setLoading(false);
    };

    fetchClients();

    const channel = supabase
      .channel('clients-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'clients',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchClients();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const createClient = async (client: Partial<Client>) => {
    const { data, error } = await supabase
      .from('clients')
      .insert([{ ...client, user_id: user?.id }])
      .select();

    if (error) throw error;
    return data[0];
  };

  return { clients, loading, error, createClient };
}
