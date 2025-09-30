import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Search, 
  Key, 
  Bell, 
  Trash2, 
  RefreshCw, 
  Upload,
  MapPin,
  Calendar
} from "lucide-react";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567"
  });

  const [accountData, setAccountData] = useState({
    email: "john.smith@email.com",
    password: "••••••••"
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    clearCache: false,
    dataSync: true
  });

  const [personalInfo, setPersonalInfo] = useState({
    nextOfKin: {
      fullName: "Jane Smith",
      city: "Toronto",
      country: "Canada",
      expiryDate: "2025-12-31"
    },
    billingAddress: {
      address: "123 Main Street",
      city: "Toronto",
      province: "Ontario"
    }
  });

  const [supportMessage, setSupportMessage] = useState("");

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccountChange = (field: string, value: string) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalInfoChange = (section: string, field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image uploaded:', file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Profile Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback className="text-2xl font-semibold bg-green-500 text-white">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                  </div>
                  <Label className="text-sm font-medium text-gray-700">Profile</Label>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Help, Support & Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="support-message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="support-message"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="mt-1 min-h-[120px] border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            
            {/* Account Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="account-email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="account-email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) => handleAccountChange('email', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={accountData.password}
                    onChange={(e) => handleAccountChange('password', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Key className="w-4 h-4 mr-2" />
                  Manage Password
                </Button>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">Notifications</Label>
                    <p className="text-xs text-gray-500">Receive email notifications</p>
                  </div>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache/Storage
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Data Sync
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Personal Information Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Next of Kin Subsection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Next of Kin</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="kin-name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="kin-name"
                        type="text"
                        value={personalInfo.nextOfKin.fullName}
                        onChange={(e) => handlePersonalInfoChange('nextOfKin', 'fullName', e.target.value)}
                        className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="kin-city" className="text-sm font-medium text-gray-700">
                          City
                        </Label>
                        <Input
                          id="kin-city"
                          type="text"
                          value={personalInfo.nextOfKin.city}
                          onChange={(e) => handlePersonalInfoChange('nextOfKin', 'city', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kin-country" className="text-sm font-medium text-gray-700">
                          Country
                        </Label>
                        <Input
                          id="kin-country"
                          type="text"
                          value={personalInfo.nextOfKin.country}
                          onChange={(e) => handlePersonalInfoChange('nextOfKin', 'country', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="Country"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="expiry-date" className="text-sm font-medium text-gray-700">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry-date"
                        type="date"
                        value={personalInfo.nextOfKin.expiryDate}
                        onChange={(e) => handlePersonalInfoChange('nextOfKin', 'expiryDate', e.target.value)}
                        className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Billing Address Subsection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Billing Address</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="billing-address" className="text-sm font-medium text-gray-700">
                        Address
                      </Label>
                      <Input
                        id="billing-address"
                        type="text"
                        value={personalInfo.billingAddress.address}
                        onChange={(e) => handlePersonalInfoChange('billingAddress', 'address', e.target.value)}
                        className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter billing address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="billing-city" className="text-sm font-medium text-gray-700">
                          City
                        </Label>
                        <Input
                          id="billing-city"
                          type="text"
                          value={personalInfo.billingAddress.city}
                          onChange={(e) => handlePersonalInfoChange('billingAddress', 'city', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing-province" className="text-sm font-medium text-gray-700">
                          Province
                        </Label>
                        <Input
                          id="billing-province"
                          type="text"
                          value={personalInfo.billingAddress.province}
                          onChange={(e) => handlePersonalInfoChange('billingAddress', 'province', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="Province"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
