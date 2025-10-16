import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export interface SettingsData {
  profile: {
    name: string;
    email: string;
    phone: string;
  };
  account: {
    email: string;
    password: string;
  };
  preferences: {
    notifications: boolean;
    dataSync: boolean;
  };
  personalInfo: {
    nextOfKin: string;
    city: string;
    country: string;
    expiryDate: string;
    billingAddress: string;
    billingCity: string;
    province: string;
  };
}

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: '',
      email: '',
      phone: ''
    },
    account: {
      email: '',
      password: '••••••••'
    },
    preferences: {
      notifications: true,
      dataSync: true
    },
    personalInfo: {
      nextOfKin: '',
      city: '',
      country: '',
      expiryDate: '',
      billingAddress: '',
      billingCity: '',
      province: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user profile data
  const loadSettings = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // If no profile exists, create one
        if (profileError.code === 'PGRST116') {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: '',
              email: user.email || '',
              phone: '',
              city: '',
              state: '',
              billing_address: '',
              billing_city: '',
              billing_state: '',
              notifications_enabled: true,
              email_notifications: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (insertError) throw insertError;
          
          setSettings({
            profile: {
              name: newProfile.full_name || '',
              email: newProfile.email || '',
              phone: newProfile.phone || ''
            },
            account: {
              email: newProfile.email || '',
              password: '••••••••'
            },
            preferences: {
              notifications: newProfile.notifications_enabled ?? true,
              dataSync: newProfile.email_notifications ?? true
            },
            personalInfo: {
              nextOfKin: '', // This field doesn't exist in profiles table
              city: newProfile.city || '',
              country: newProfile.state || '',
              expiryDate: '',
              billingAddress: newProfile.billing_address || '',
              billingCity: newProfile.billing_city || '',
              province: newProfile.billing_state || ''
            }
          });
        } else {
          throw profileError;
        }
      } else {
        // Profile exists, load the data
        setSettings({
          profile: {
            name: profile.full_name || '',
            email: profile.email || '',
            phone: profile.phone || ''
          },
          account: {
            email: profile.email || '',
            password: '••••••••'
          },
          preferences: {
            notifications: profile.notifications_enabled ?? true,
            dataSync: profile.email_notifications ?? true
          },
          personalInfo: {
            nextOfKin: '', // This field doesn't exist in profiles table
            city: profile.city || '',
            country: profile.state || '',
            expiryDate: '',
            billingAddress: profile.billing_address || '',
            billingCity: profile.billing_city || '',
            province: profile.billing_state || ''
          }
        });
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  // Save settings to database
  const saveSettings = async (updatedSettings: SettingsData) => {
    if (!user) return false;
    
    try {
      setSaving(true);
      setError(null);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updatedSettings.profile.name,
          email: updatedSettings.profile.email,
          phone: updatedSettings.profile.phone,
          city: updatedSettings.personalInfo.city,
          state: updatedSettings.personalInfo.country,
          billing_address: updatedSettings.personalInfo.billingAddress,
          billing_city: updatedSettings.personalInfo.billingCity,
          billing_state: updatedSettings.personalInfo.province,
          notifications_enabled: updatedSettings.preferences.notifications,
          email_notifications: updatedSettings.preferences.dataSync,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setSettings(updatedSettings);
      return true;
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Update individual settings
  const updateSettings = (section: keyof SettingsData, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    loadSettings();
  }, [user]);

  return {
    settings,
    loading,
    saving,
    error,
    loadSettings,
    saveSettings,
    updateSettings
  };
}

