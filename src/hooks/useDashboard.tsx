import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';

type Quote = Tables<'quotes'>;

export interface DashboardStats {
  quotesThisMonth: number;
  totalRevenue: number;
  averageQuoteTime: number;
  approvalRate: number;
  quotesThisMonthChange: string;
  totalRevenueChange: string;
  averageQuoteTimeChange: string;
  approvalRateChange: string;
}

export interface DashboardQuote {
  id: string;
  client: string;
  project: string;
  amount: string;
  status: string;
  createdAt: string;
}

export function useDashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    quotesThisMonth: 0,
    totalRevenue: 0,
    averageQuoteTime: 0,
    approvalRate: 0,
    quotesThisMonthChange: '+0%',
    totalRevenueChange: '+0%',
    averageQuoteTimeChange: '+0%',
    approvalRateChange: '+0%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user quotes
  const loadQuotes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (quotesError) throw quotesError;
      
      setQuotes(quotesData || []);
      calculateStats(quotesData || []);
    } catch (err) {
      console.error('Error loading quotes:', err);
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  // Calculate dashboard statistics
  const calculateStats = (quotesData: Quote[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filter quotes for current month
    const currentMonthQuotes = quotesData.filter(quote => {
      if (!quote.created_at) return false;
      const quoteDate = new Date(quote.created_at);
      return quoteDate.getMonth() === currentMonth && quoteDate.getFullYear() === currentYear;
    });
    
    // Filter quotes for last month
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastMonthQuotes = quotesData.filter(quote => {
      if (!quote.created_at) return false;
      const quoteDate = new Date(quote.created_at);
      return quoteDate.getMonth() === lastMonth && quoteDate.getFullYear() === lastMonthYear;
    });

    // Calculate current month stats
    const quotesThisMonth = currentMonthQuotes.length;
    const totalRevenue = quotesData.reduce((sum, quote) => sum + (quote.amount || 0), 0);
    const approvedQuotes = quotesData.filter(quote => quote.status === 'Approved').length;
    const approvalRate = quotesData.length > 0 ? Math.round((approvedQuotes / quotesData.length) * 100) : 0;
    
    // Calculate average quote time (mock calculation - in real app this would be based on actual time tracking)
    const averageQuoteTime = quotesData.length > 0 ? Math.round(Math.random() * 20 + 5) : 0; // 5-25 minutes
    
    // Calculate changes from last month
    const quotesThisMonthChange = lastMonthQuotes.length > 0 
      ? `+${Math.round(((quotesThisMonth - lastMonthQuotes.length) / lastMonthQuotes.length) * 100)}%`
      : quotesThisMonth > 0 ? '+100%' : '+0%';
    
    const lastMonthRevenue = lastMonthQuotes.reduce((sum, quote) => sum + (quote.amount || 0), 0);
    const totalRevenueChange = lastMonthRevenue > 0 
      ? `+${Math.round(((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)}%`
      : totalRevenue > 0 ? '+100%' : '+0%';
    
    const averageQuoteTimeChange = '-68%'; // Mock value
    const approvalRateChange = '+12%'; // Mock value

    setStats({
      quotesThisMonth,
      totalRevenue,
      averageQuoteTime,
      approvalRate,
      quotesThisMonthChange,
      totalRevenueChange,
      averageQuoteTimeChange,
      approvalRateChange
    });
  };

  // Format quotes for display
  const formatQuotesForDisplay = (quotesData: Quote[]): DashboardQuote[] => {
    return quotesData.slice(0, 5).map(quote => ({
      id: quote.id,
      client: quote.client_name,
      project: `${quote.project_name} - ${quote.square_footage || 0} sq ft`,
      amount: `$${(quote.amount || 0).toLocaleString()}`,
      status: quote.status,
      createdAt: formatTimeAgo(quote.created_at)
    }));
  };

  // Format time ago
  const formatTimeAgo = (dateString: string | null): string => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    loadQuotes();
  }, [user]);

  return {
    quotes: formatQuotesForDisplay(quotes),
    stats,
    loading,
    error,
    hasQuotes: quotes.length > 0,
    loadQuotes
  };
}

