import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';

type Quote = Tables<'quotes'>;

export interface QuoteDisplay {
  id: string;
  client: string;
  email: string;
  project: string;
  amount: number;
  status: string;
  createdAt: string;
  address: string;
  squareFootage: number;
  materialCost: number;
  laborCost: number;
  rebateAmount: number;
  notes: string | null;
}

export function useQuotes() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<QuoteDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all user quotes
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
      
      const formattedQuotes: QuoteDisplay[] = (quotesData || []).map(quote => ({
        id: quote.id,
        client: quote.client_name,
        email: quote.client_email || '',
        project: `${quote.project_name} - ${quote.square_footage || 0} sq ft`,
        amount: quote.amount || 0,
        status: quote.status,
        createdAt: quote.created_at || '',
        address: quote.address || '',
        squareFootage: quote.square_footage || 0,
        materialCost: quote.material_cost || 0,
        laborCost: quote.labor_cost || 0,
        rebateAmount: quote.rebate_amount || 0,
        notes: quote.notes
      }));
      
      setQuotes(formattedQuotes);
    } catch (err) {
      console.error('Error loading quotes:', err);
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  // Update quote status
  const updateQuoteStatus = async (quoteId: string, newStatus: string) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', quoteId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local state
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, status: newStatus } : quote
      ));
      
      return true;
    } catch (err) {
      console.error('Error updating quote status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update quote status');
      return false;
    }
  };

  // Delete quote
  const deleteQuote = async (quoteId: string) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local state
      setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
      
      return true;
    } catch (err) {
      console.error('Error deleting quote:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete quote');
      return false;
    }
  };

  // Get quote statistics
  const getQuoteStats = () => {
    const totalQuotes = quotes.length;
    const approvedQuotes = quotes.filter(q => q.status === 'Approved');
    const totalValue = quotes.reduce((sum, quote) => sum + quote.amount, 0);
    const approvedValue = approvedQuotes.reduce((sum, quote) => sum + quote.amount, 0);
    
    return {
      totalQuotes,
      approvedQuotes: approvedQuotes.length,
      totalValue,
      approvedValue
    };
  };

  // Filter quotes
  const filterQuotes = (searchTerm: string, statusFilter: string) => {
    return quotes.filter(quote => {
      const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || quote.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  useEffect(() => {
    loadQuotes();
  }, [user]);

  return {
    quotes,
    loading,
    error,
    loadQuotes,
    updateQuoteStatus,
    deleteQuote,
    getQuoteStats,
    filterQuotes
  };
}

// Hook for individual quote details
export function useQuoteDetails(quoteId: string) {
  const { user } = useAuth();
  const [quote, setQuote] = useState<QuoteDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuote = async () => {
    if (!user || !quoteId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: quoteData, error: quoteError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .eq('user_id', user.id)
        .single();

      if (quoteError) {
        if (quoteError.code === 'PGRST116') {
          setError('Quote not found');
        } else {
          throw quoteError;
        }
        return;
      }
      
      const formattedQuote: QuoteDisplay = {
        id: quoteData.id,
        client: quoteData.client_name,
        email: quoteData.client_email || '',
        project: `${quoteData.project_name} - ${quoteData.square_footage || 0} sq ft`,
        amount: quoteData.amount || 0,
        status: quoteData.status,
        createdAt: quoteData.created_at || '',
        address: quoteData.address || '',
        squareFootage: quoteData.square_footage || 0,
        materialCost: quoteData.material_cost || 0,
        laborCost: quoteData.labor_cost || 0,
        rebateAmount: quoteData.rebate_amount || 0,
        notes: quoteData.notes
      };
      
      setQuote(formattedQuote);
    } catch (err) {
      console.error('Error loading quote:', err);
      setError(err instanceof Error ? err.message : 'Failed to load quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, [user, quoteId]);

  return {
    quote,
    loading,
    error,
    loadQuote
  };
}

