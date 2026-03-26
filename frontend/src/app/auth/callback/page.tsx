'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (!error) {
        router.push('/workflow');
      } else {
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f0c29]">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Completing authentication...</p>
      </div>
    </div>
  );
}
