'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentData } from '@/types';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchDocuments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setDocuments(data || []);
      }
      setLoading(false);
    };

    fetchDocuments();

    const channel = supabase
      .channel('documents-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'documents',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchDocuments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const uploadDocument = async (file: File) => {
    if (!user) return;

    // 1. Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('vault')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('vault')
      .getPublicUrl(filePath);

    // 3. Save metadata to database
    const newDoc = {
      user_id: user.id,
      filename: file.name,
      type: file.name.endsWith('.pdf') ? 'PDF' : file.type.startsWith('image/') ? 'IMAGE' : 'DOC',
      sizeKb: Math.round(file.size / 1024),
      priority: 'Normal',
      url: publicUrl,
      storage_path: filePath
    };

    const { data, error: dbError } = await supabase
      .from('documents')
      .insert([newDoc])
      .select();

    if (dbError) throw dbError;
    return data[0];
  };

  const deleteDocument = async (docId: string, storagePath: string) => {
    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from('vault')
      .remove([storagePath]);

    if (storageError) throw storageError;

    // 2. Delete from Database
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', docId);

    if (dbError) throw dbError;
  };

  return { documents, loading, error, uploadDocument, deleteDocument };
}
