import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Eye, 
  Download, 
  Edit,
  Filter,
  Calendar,
  DollarSign
} from "lucide-react";

// Mock data for demonstration
const allQuotes = [
  {
    id: 1,
    client: "Smith Residence",
    email: "john.smith@email.com",
    project: "Attic Insulation - 1,200 sq ft",
    amount: 2850,
    status: "Pending",
    createdAt: "2024-03-15",
    address: "123 Oak Street, Springfield"
  },
  {
    id: 2,
    client: "Johnson Home",
    email: "mary.johnson@email.com", 
    project: "Wall Insulation - 800 sq ft",
    amount: 3400,
    status: "Approved",
    createdAt: "2024-03-14",
    address: "456 Pine Avenue, Springfield"
  },
  {
    id: 3,
    client: "Williams Property",
    email: "bob.williams@email.com",
    project: "Basement Insulation - 600 sq ft", 
    amount: 1950,
    status: "Sent",
    createdAt: "2024-03-12",
    address: "789 Maple Drive, Springfield"
  },
  {
    id: 4,
    client: "Davis Residence",
    email: "sarah.davis@email.com",
    project: "Whole House Insulation - 2,000 sq ft",
    amount: 5200,
    status: "Approved",
    createdAt: "2024-03-10",
    address: "321 Elm Street, Springfield"
  },
  {
    id: 5,
    client: "Brown Property", 
    email: "mike.brown@email.com",
    project: "Attic Insulation - 900 sq ft",
    amount: 2150,
    status: "Rejected",
    createdAt: "2024-03-08",
    address: "654 Cedar Lane, Springfield"
  },
  {
    id: 6,
    client: "Wilson Home",
    email: "lisa.wilson@email.com",
    project: "Crawl Space Insulation - 450 sq ft",
    amount: 1400,
    status: "Sent",
    createdAt: "2024-03-05",
    address: "987 Birch Road, Springfield"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-safety/10 text-safety border-safety/20";
    case "Approved":
      return "bg-success/10 text-success border-success/20";
    case "Sent":
      return "bg-primary/10 text-primary border-primary/20";
    case "Rejected":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function Quotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredQuotes = allQuotes.filter(quote => {
    const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0);
  const approvedQuotes = filteredQuotes.filter(q => q.status === "Approved");
  const approvedValue = approvedQuotes.reduce((sum, quote) => sum + quote.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Quotes</h1>
            <p className="text-muted-foreground">
              Manage and track all your insulation quotes
            </p>
          </div>
          <Button asChild variant="construction" size="lg">
            <Link to="/quote-builder">
              <Plus className="w-5 h-5" />
              New Quote
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Quotes</p>
                <p className="text-2xl font-bold text-foreground">{filteredQuotes.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Approved</p>
                <p className="text-2xl font-bold text-success">{approvedQuotes.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Calendar className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Value</p>
                <p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-construction/10">
                <DollarSign className="w-6 h-6 text-construction" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Approved Value</p>
                <p className="text-2xl font-bold text-success">${approvedValue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search quotes by client, project, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Sent">Sent</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Quotes Grid */}
        <div className="grid gap-6">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{quote.client}</h3>
                      <p className="text-sm text-muted-foreground">{quote.email}</p>
                    </div>
                    <span 
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(quote.status)}`}
                    >
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">{quote.project}</p>
                    <p className="text-sm text-muted-foreground">{quote.address}</p>
                    <p className="text-sm text-muted-foreground">Created: {new Date(quote.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-construction">
                      ${quote.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">No quotes found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "All" 
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first quote to get started"
                  }
                </p>
              </div>
              {!searchTerm && statusFilter === "All" && (
                <Button asChild variant="construction">
                  <Link to="/quote-builder">Create First Quote</Link>
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}