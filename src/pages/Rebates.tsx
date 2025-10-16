import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Star, ExternalLink } from 'lucide-react';
import { useRebates } from '@/hooks/useRebates';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

// Real Toronto rebates data from the City of Toronto website
const torontoRebates = [
  {
    id: "RB-001",
    name: "Basement Flooding Protection",
    buildingType: "Residential",
    incentiveAmount: "Up to $3,400",
    description: "Eligible work includes installing a backwater valve, a sump pump, severance and capping of a home's storm sewer, or external weeping tile connection.",
    websiteUrl: "https://www.toronto.ca/services-payments/water-environment/managing-rain-melted-snow/basement-flooding/basement-flooding-protection-program/",
    provider: "City of Toronto"
  },
  {
    id: "RB-002",
    name: "Canada Greener Homes Loan",
    buildingType: "Residential",
    incentiveAmount: "Up to $40,000 (maximum) Up to $5,000 (minimum)",
    description: "Offers interest-free financing to help homeowners complete the energy retrofits an energy advisor recommends.",
    websiteUrl: "https://www.nrcan.gc.ca/energy-efficiency/homes/canada-greener-homes-grant/canada-greener-homes-loan/24286",
    provider: "Natural Resources Canada"
  },
  {
    id: "RB-003",
    name: "Green/Cool Roofs",
    buildingType: "Residential",
    incentiveAmount: "Up to $2 to $5/m2 for a cool roof (to a maximum of $50,000) or $100/m2 for a green roof (to a maximum of $100,000)",
    description: "Grants are available to support the installation of green and cool roofs on residential homes. A green or cool roof can reduce a home's energy use, retain stormwater and more.",
    websiteUrl: "https://www.toronto.ca/services-payments/water-environment/environmental-grants-incentives-2/green-your-roof/",
    provider: "City of Toronto"
  },
  {
    id: "RB-004",
    name: "Home Assistance Program",
    buildingType: "Residential",
    incentiveAmount: "Free",
    description: "If eligible, you can receive the following free of charge: ENERGY STAR® light bulbs (LED), power bars with timers, efficiency showerheads (standard and handheld), or aerators (kitchen and bathroom).",
    websiteUrl: "https://saveonenergy.ca/Consumer/Programs/Home-Assistance-Program.aspx",
    provider: "Save on Energy"
  },
  {
    id: "RB-005",
    name: "Home Winterproofing Program",
    buildingType: "Residential",
    incentiveAmount: "Free energy-efficient upgrades, including insulation, draft proofing and a smart thermostat",
    description: "Enbridge Gas and Save on Energy have teamed up to make energy-saving upgrades at no cost. If your home and household income levels qualify, you'll be eligible for free insulation, draft proofing, a smart thermostat, Energy Star® appliances and more.",
    websiteUrl: "https://www.enbridgegas.com/residential/rebates-energy-conservation/home-winterproofing-program",
    provider: "Enbridge Gas & Save on Energy"
  },
  {
    id: "RB-006",
    name: "Smart Thermostat",
    buildingType: "Residential",
    incentiveAmount: "$75",
    description: "Two programs: Before You Buy and After You Buy. The 'Before you buy' rebate provides $75 off when purchasing a qualifying smart thermostat at checkout from participating retailers. The 'After you buy' rebate provides a $75 Enbridge Gas bill credit to Enbridge Gas customers or a rebate cheque to electricity customers.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-007",
    name: "Heat Pump Water Heater",
    buildingType: "Residential",
    incentiveAmount: "$500",
    description: "A home energy assessment is required before starting any work.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-008",
    name: "Windows and Doors",
    buildingType: "Residential",
    incentiveAmount: "$100 per rough opening",
    description: "A home energy assessment is required before starting any work.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-009",
    name: "Insulation",
    buildingType: "Residential",
    incentiveAmount: "Up to $8,900",
    description: "Rebates are available for attic, wall, foundation, and exposed floor insulation. A home energy assessment is required before beginning work.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-010",
    name: "Air Sealing",
    buildingType: "Residential",
    incentiveAmount: "Up to $250",
    description: "A home energy assessment is required before starting any work.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-011",
    name: "Heat Pumps",
    buildingType: "Residential",
    incentiveAmount: "Up to $12,000",
    description: "You are not eligible for a rebate if you have an existing heat pump system in your home—first-time installations of heat pumps only. The installed heat pump must be on Natural Resources Canada's qualified products list as a cold climate air-source or ground-source heat pump.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  },
  {
    id: "RB-012",
    name: "Rooftop Solar Panels and Battery Storage",
    buildingType: "Residential",
    incentiveAmount: "Up to $10,000",
    description: "New installations only; replacement solar is not eligible for rebates. Solar panels must be sized for load displacement only. Net metering is not permitted.",
    websiteUrl: "https://www.homerenovationsavings.ca/?utm%5Fsource=newsletter&utm%5Fmedium=email&utm%5Fcampaign=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1%5Fsee%5Frebates&utm%5Fid=ENB%5F2515%5FHRS%5FComing%5FSoon%5Fcustomers%5Feblast%5F1&utm%5Fcontent=see%5Frebates#rebates",
    provider: "Home Renovation Savings"
  }
];

const Rebates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    savedRebates, 
    loading, 
    error, 
    isRebateSaved, 
    toggleSaveRebate 
  } = useRebates();
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleSaved = async (rebate: RebateData) => {
    const success = await toggleSaveRebate(rebate);
    if (success) {
      toast({
        title: isRebateSaved(rebate.id) ? "Rebate unsaved" : "Rebate saved",
        description: `${rebate.name} has been ${isRebateSaved(rebate.id) ? 'removed from' : 'added to'} your saved rebates.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update saved rebates. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRebateClick = (websiteUrl: string, rebateName: string) => {
    window.open(websiteUrl, '_blank');
    toast({
      title: "Opening rebate website",
      description: `Redirecting to ${rebateName} application page...`,
    });
  };

  const filteredRebates = torontoRebates.filter(rebate =>
    rebate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rebate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rebate.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center p-6 border-b">
          <h1 className="text-2xl font-semibold">Toronto Rebates & Incentives</h1>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rebates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-center p-6 border-b">
        <h1 className="text-2xl font-semibold">Toronto Rebates & Incentives</h1>
      </div>

      <div className="p-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search rebates by name, provider, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Rebates Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Rebate Name</TableHead>
                <TableHead className="font-semibold">Provider</TableHead>
                <TableHead className="font-semibold">Incentive Amount</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRebates.map((rebate) => (
                <TableRow key={rebate.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{rebate.id}</TableCell>
                  <TableCell 
                    className="cursor-pointer hover:text-primary font-medium"
                    onClick={() => handleRebateClick(rebate.websiteUrl, rebate.name)}
                  >
                    {rebate.name}
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                      {rebate.provider}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {rebate.incentiveAmount}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRebateClick(rebate.websiteUrl, rebate.name)}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Apply
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleSaved(rebate)}
                      className="p-1 h-auto"
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          isRebateSaved(rebate.id) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Saved Rebates Section */}
        {savedRebates.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Saved Rebates</h2>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="mt-4 space-y-2">
              {savedRebates.map(savedRebate => (
                <div key={savedRebate.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <span className="font-medium">{savedRebate.rebate_name}</span>
                    <p className="text-sm text-gray-600">{savedRebate.rebate_provider} - {savedRebate.rebate_amount}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRebateClick(savedRebate.rebate_url, savedRebate.rebate_name)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Rebates;