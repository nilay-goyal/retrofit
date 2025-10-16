import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Mail, Phone, HelpCircle, Settings as SettingsIcon, Shield, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    settings, 
    loading, 
    saving, 
    error, 
    saveSettings, 
    updateSettings 
  } = useSettings();
  
  const [supportMessage, setSupportMessage] = useState('');

  const handleProfileChange = (field: string, value: string) => {
    updateSettings('profile', field, value);
  };

  const handleAccountChange = (field: string, value: string) => {
    updateSettings('account', field, value);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    updateSettings('personalInfo', field, value);
  };

  const handlePreferencesChange = (field: string, value: boolean) => {
    updateSettings('preferences', field, value);
  };

  const handleSaveSettings = async () => {
    const success = await saveSettings(settings);
    if (success) {
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } else {
      toast({
        title: "Error saving settings",
        description: error || "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSupportSearch = () => {
    // Handle support search functionality
    console.log('Support search:', supportMessage);
  };

  const handleManagePassword = () => {
    // Handle password management
    console.log('Manage password clicked');
  };

  const handleClearCache = () => {
    // Handle cache clearing
    console.log('Clear cache clicked');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#4f75fd]" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 - Profile & Support */}
          <div className="space-y-6">
            {/* Profile Section */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-[#4f75fd]" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#4f75fd] to-[#618af2] rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Profile Fields */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help/Support Section */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-[#4f75fd]" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="support" className="text-sm font-medium text-gray-700">How can we help?</Label>
                  <Textarea
                    id="support"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Describe your issue or question..."
                    className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd] min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={handleSupportSearch}
                  className="w-full bg-[#4f75fd] hover:bg-[#618af2] text-white"
                >
                  Search Help Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Column 2 - Account & Preferences */}
          <div className="space-y-6">
            {/* Account Section */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-[#4f75fd]" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="account-email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input
                    id="account-email"
                    type="email"
                    value={settings.account.email}
                    onChange={(e) => handleAccountChange('email', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={settings.account.password}
                    onChange={(e) => handleAccountChange('password', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                    disabled={loading}
                  />
                </div>
                
                <Button 
                  onClick={handleManagePassword}
                  variant="outline"
                  className="w-full border-[#4f75fd] text-[#4f75fd] hover:bg-[#4f75fd] hover:text-white"
                >
                  Manage Password
                </Button>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <SettingsIcon className="w-5 h-5 text-[#4f75fd]" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Notifications</Label>
                    <p className="text-xs text-gray-500">Receive updates about your projects</p>
                  </div>
                  <Switch
                    checked={settings.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferencesChange('notifications', checked)}
                    disabled={loading}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Data Sync</Label>
                    <p className="text-xs text-gray-500">Sync data across devices</p>
                  </div>
                  <Switch
                    checked={settings.preferences.dataSync}
                    onCheckedChange={(checked) => handlePreferencesChange('dataSync', checked)}
                    disabled={loading}
                  />
                </div>
                
                <Button 
                  onClick={handleClearCache}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Clear Cache/Storage
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Column 3 - Personal Information */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-[#4f75fd]" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Next of Kin */}
                <div>
                  <Label htmlFor="nextOfKin" className="text-sm font-medium text-gray-700">Next of Kin</Label>
                    <Input
                      id="nextOfKin"
                      value={settings.personalInfo.nextOfKin}
                      onChange={(e) => handlePersonalInfoChange('nextOfKin', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                </div>

                {/* City and Country Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input
                      id="city"
                      value={settings.personalInfo.city}
                      onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                    <Input
                      id="country"
                      value={settings.personalInfo.country}
                      onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Expiry Date */}
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={settings.personalInfo.expiryDate}
                    onChange={(e) => handlePersonalInfoChange('expiryDate', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                    disabled={loading}
                  />
                </div>

                {/* Billing Address */}
                <div>
                  <Label htmlFor="billingAddress" className="text-sm font-medium text-gray-700">Billing Address</Label>
                  <Input
                    id="billingAddress"
                    value={settings.personalInfo.billingAddress}
                    onChange={(e) => handlePersonalInfoChange('billingAddress', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                    disabled={loading}
                  />
                </div>

                {/* City and Province Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="billingCity" className="text-sm font-medium text-gray-700">City</Label>
                    <Input
                      id="billingCity"
                      value={settings.personalInfo.billingCity}
                      onChange={(e) => handlePersonalInfoChange('billingCity', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="province" className="text-sm font-medium text-gray-700">Province</Label>
                    <Input
                      id="province"
                      value={settings.personalInfo.province}
                      onChange={(e) => handlePersonalInfoChange('province', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-[#4f75fd] focus:ring-[#4f75fd]"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            disabled={loading || saving}
            className="bg-[#4f75fd] hover:bg-[#618af2] text-white px-8"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

