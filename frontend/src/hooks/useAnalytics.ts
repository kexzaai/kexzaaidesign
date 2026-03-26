'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useAnalytics() {
  const [stats, setStats] = useState<any[]>([]);
  const [efficiencyData, setEfficiencyData] = useState<any[]>([]);
  const [performanceMatrix, setPerformanceMatrix] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      // In a real app, these would be complex aggregation queries or stored procedures
      // or fetching from a pre-calculated analytics table.
      const { data, error } = await supabase
        .from('analytics_summary')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "not found" if first time
        setError(error.message);
      } else if (data) {
        setStats(data.stats || []);
        setEfficiencyData(data.efficiency_data || []);
        setPerformanceMatrix(data.performance_matrix || null);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [user]);

  return { stats, efficiencyData, performanceMatrix, loading, error };
}
