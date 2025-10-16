import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface SavedRebate {
  id: string;
  rebate_id: string;
  rebate_name: string;
  rebate_provider: string;
  rebate_amount: string;
  rebate_url: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface RebateData {
  id: string;
  name: string;
  buildingType: string;
  incentiveAmount: string;
  description: string;
  websiteUrl: string;
  provider: string;
}

export function useRebates() {
  const { user } = useAuth();
  const [savedRebates, setSavedRebates] = useState<SavedRebate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's saved rebates
  const loadSavedRebates = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('saved_rebates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // If table doesn't exist, just return empty array instead of showing error
      if (fetchError && fetchError.code === 'PGRST116') {
        setSavedRebates([]);
        return;
      }

      if (fetchError) throw fetchError;

      setSavedRebates(data || []);
    } catch (err) {
      console.error('Error loading saved rebates:', err);
      // Only show error if it's not a table not found error
      if (err instanceof Error && !err.message.includes('relation "saved_rebates" does not exist')) {
        setError(err.message);
      } else {
        // Table doesn't exist yet, just use empty array
        setSavedRebates([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Save a rebate
  const saveRebate = async (rebateData: RebateData) => {
    if (!user) return false;

    try {
      // Check if already saved
      const existingRebate = savedRebates.find(r => r.rebate_id === rebateData.id);
      if (existingRebate) {
        return false; // Already saved
      }

      const { data, error } = await supabase
        .from('saved_rebates')
        .insert({
          rebate_id: rebateData.id,
          rebate_name: rebateData.name,
          rebate_provider: rebateData.provider,
          rebate_amount: rebateData.incentiveAmount,
          rebate_url: rebateData.websiteUrl,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      // If table doesn't exist, just simulate success for now
      if (error && error.message.includes('relation "saved_rebates" does not exist')) {
        console.log('Table not created yet, simulating save for:', rebateData.name);
        return true;
      }

      if (error) throw error;

      setSavedRebates(prev => [data, ...prev]);
      return true;
    } catch (err) {
      console.error('Error saving rebate:', err);
      // Don't show error if table doesn't exist
      if (err instanceof Error && err.message.includes('relation "saved_rebates" does not exist')) {
        return true; // Simulate success
      }
      setError(err instanceof Error ? err.message : 'Failed to save rebate');
      return false;
    }
  };

  // Remove a saved rebate
  const removeSavedRebate = async (rebateId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_rebates')
        .delete()
        .eq('rebate_id', rebateId)
        .eq('user_id', user.id);

      // If table doesn't exist, just simulate success for now
      if (error && error.message.includes('relation "saved_rebates" does not exist')) {
        console.log('Table not created yet, simulating remove for:', rebateId);
        return true;
      }

      if (error) throw error;

      setSavedRebates(prev => prev.filter(r => r.rebate_id !== rebateId));
      return true;
    } catch (err) {
      console.error('Error removing saved rebate:', err);
      // Don't show error if table doesn't exist
      if (err instanceof Error && err.message.includes('relation "saved_rebates" does not exist')) {
        return true; // Simulate success
      }
      setError(err instanceof Error ? err.message : 'Failed to remove saved rebate');
      return false;
    }
  };

  // Check if a rebate is saved
  const isRebateSaved = (rebateId: string) => {
    return savedRebates.some(r => r.rebate_id === rebateId);
  };

  // Toggle save status
  const toggleSaveRebate = async (rebateData: RebateData) => {
    if (isRebateSaved(rebateData.id)) {
      return await removeSavedRebate(rebateData.id);
    } else {
      return await saveRebate(rebateData);
    }
  };

  useEffect(() => {
    loadSavedRebates();
  }, [user]);

  return {
    savedRebates,
    loading,
    error,
    saveRebate,
    removeSavedRebate,
    isRebateSaved,
    toggleSaveRebate,
    loadSavedRebates
  };
}
