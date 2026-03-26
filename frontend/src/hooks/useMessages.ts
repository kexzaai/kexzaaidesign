'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { MessageData } from '@/types';

export function useMessages(channelId: string) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !channelId) return;

    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        const mappedMessages = (data as any[] || []).map(m => ({
          ...m,
          senderName: m.sender_name || 'Me',
          isCurrentUser: m.sender_id === user.id,
          timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setMessages(mappedMessages as MessageData[]);
      }
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel(`room-${channelId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      }, (payload: { new: any }) => {
        const newMessage = payload.new;
        setMessages(prev => [...prev, {
          ...newMessage,
          senderName: newMessage.sender_name || 'Me',
          isCurrentUser: newMessage.sender_id === user.id,
          timestamp: new Date(newMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } as MessageData]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, channelId]);

  const sendMessage = async (content: string) => {
    if (!user || !channelId) return;

    const { error } = await supabase
      .from('messages')
      .insert([{
        channel_id: channelId,
        sender_id: user.id,
        sender_name: user.user_metadata.full_name || 'Me',
        content,
      }]);

    if (error) throw error;
  };

  return { messages, loading, error, sendMessage };
}
