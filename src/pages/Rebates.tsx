import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Star, Home } from 'lucide-react';

const mockRebates = [
  {
    id: "RB - 001",
    name: "Enbridge HER+ Program",
    buildingType: "Residential",
    incentiveAmount: null,
    dueDate: "Sept 10, 2025",
    saved: false
  },
  {
    id: "RB - 002", 
    name: "Home Energy Loan Program (HELP)...",
    buildingType: "Residential",
    incentiveAmount: null,
    dueDate: "Sept 10, 2025",
    saved: true
  },
  {
    id: "RB - 003",
    name: "HELP Incentives - Toronto",
    buildingType: "Residential", 
    incentiveAmount: null,
    dueDate: "Sept 10, 2025",
    saved: true
  },
  {
    id: "RB - 004",
    name: "Renovate Lanark",
    buildingType: "Residential",
    incentiveAmount: true,
    dueDate: "Sept 10, 2025",
    saved: true
  },
  {
    id: "RB - 005",
    name: "Save ON - Energy Affordability Prog...",
    buildingType: "Residential",
    incentiveAmount: true, 
    dueDate: "Sept 10, 2025",
    saved: true
  },
  {
    id: "RB - 006",
    name: "Home Winterproofing Program (Enb...",
    buildingType: "Residential",
    incentiveAmount: true,
    dueDate: "Sept 10, 2025", 
    saved: true
  },
  {
    id: "RB - 007",
    name: "Better Homes Kingston",
    buildingType: "Residential",
    incentiveAmount: true,
    dueDate: "Sept 10, 2025",
    saved: true
  },
  {
    id: "RB - 008",
    name: "Better Homes Ottawa", 
    buildingType: "Residential",
    incentiveAmount: true,
    dueDate: "Sept 10, 2025",
    saved: true
  }
];

const Rebates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRebates, setSavedRebates] = useState<string[]>(
    mockRebates.filter(rebate => rebate.saved).map(rebate => rebate.id)
  );

  const toggleSaved = (rebateId: string) => {
    setSavedRebates(prev => 
      prev.includes(rebateId) 
        ? prev.filter(id => id !== rebateId)
        : [...prev, rebateId]
    );
  };

  const filteredRebates = mockRebates.filter(rebate =>
    rebate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rebate.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90">
            Edit Job ✏️
          </Button>
        </div>
        
        <h1 className="text-2xl font-semibold text-center flex-1">Rebates Dashboard</h1>
        
        <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90">
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </div>

      <div className="p-6">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search Rebates..."
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
                <TableHead className="font-semibold">Building Type</TableHead>
                <TableHead className="font-semibold">Incentive Amount</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRebates.map((rebate) => (
                <TableRow key={rebate.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{rebate.id}</TableCell>
                  <TableCell>{rebate.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                      {rebate.buildingType}
                    </span>
                  </TableCell>
                  <TableCell>
                    {rebate.incentiveAmount ? (
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{rebate.dueDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaved(rebate.id)}
                      className="p-1 h-auto"
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          savedRebates.includes(rebate.id) 
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
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Saved Rebates</h2>
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rebates;