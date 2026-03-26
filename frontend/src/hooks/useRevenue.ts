'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface RevenueMetric {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}

export function useRevenue() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRevenueData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('revenue')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        setError(error.message);
      } else {
        // Calculate metrics from the raw data
        const totalRevenue = data.reduce((acc: number, curr: any) => acc + curr.amount, 0);
        const outstanding = data.filter((item: any) => item.status === 'Pending')
                                .reduce((acc: number, curr: any) => acc + curr.amount, 0);
        
        // Mocking trends for now as they require historical comparison
        const metrics = [
          {
            title: 'Total Revenue (YTD)',
            value: `₹${totalRevenue.toLocaleString('en-IN')}`,
            trend: '+12.5%',
            trendUp: true,
          },
          {
            title: 'Outstanding Invoices',
            value: `₹${outstanding.toLocaleString('en-IN')}`,
            trend: '-2.4%',
            trendUp: false,
          },
          {
            title: 'Profitability Margin',
            value: '68%',
            trend: '+5.2%',
            trendUp: true,
          }
        ];
        
        setMetrics(metrics);
        setChartData(data); // In a real app, you'd process this for the chart
      }
      setLoading(false);
    };

    fetchRevenueData();
  }, [user]);

  return { metrics, chartData, loading, error };
}
