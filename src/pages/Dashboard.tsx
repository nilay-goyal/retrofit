import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Calculator, 
  FileText, 
  Clock,
  DollarSign,
  TrendingUp,
  Eye
} from "lucide-react";

// Mock data for demonstration
const recentQuotes = [
  {
    id: 1,
    client: "Smith Residence",
    project: "Attic Insulation - 1,200 sq ft",
    amount: "$2,850",
    status: "Pending",
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    client: "Johnson Home",
    project: "Wall Insulation - 800 sq ft",
    amount: "$3,400",
    status: "Approved",
    createdAt: "1 day ago"
  },
  {
    id: 3,
    client: "Williams Property",
    project: "Basement Insulation - 600 sq ft",
    amount: "$1,950",
    status: "Sent",
    createdAt: "3 days ago"
  }
];

const stats = [
  {
    label: "Quotes This Month",
    value: "24",
    change: "+18%",
    icon: FileText,
    color: "text-construction"
  },
  {
    label: "Total Revenue",
    value: "$84,500",
    change: "+24%",
    icon: DollarSign,
    color: "text-success"
  },
  {
    label: "Avg. Quote Time",
    value: "12 min",
    change: "-68%",
    icon: Clock,
    color: "text-safety"
  },
  {
    label: "Approval Rate",
    value: "78%",
    change: "+12%",
    icon: TrendingUp,
    color: "text-primary"
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
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Header with Add New Project Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Metrics</h1>
        </div>
        <Button className="bg-muted hover:bg-muted/80 text-foreground border">
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <div className={`p-2 rounded-lg ${stat.color === 'text-construction' ? 'bg-construction/10' : stat.color === 'text-success' ? 'bg-success/10' : stat.color === 'text-safety' ? 'bg-safety/10' : 'bg-primary/10'}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className={`text-sm font-medium ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-4 bg-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-construction/10">
                <Calculator className="w-5 h-5 text-construction" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Quick Quote</h3>
                <p className="text-xs text-muted-foreground">Create a new quote in 15 minutes</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/quote-builder">Create Quote</Link>
            </Button>
          </Card>

          <Card className="p-4 bg-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">View Quotes</h3>
                <p className="text-xs text-muted-foreground">View All</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/quotes">View All</Link>
            </Button>
          </Card>

          <Card className="p-4 bg-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-safety/10">
                <TrendingUp className="w-5 h-5 text-safety" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Analytics</h3>
                <p className="text-xs text-muted-foreground">Track site performance</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" disabled>
              Coming Soon
            </Button>
          </Card>
        </div>

        {/* Your Quotes Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Your Quotes</h2>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {recentQuotes.slice(0, 6).map((quote, index) => (
            <Card key={quote.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground">Quote {index + 1}</h3>
                  <span className="text-xs text-muted-foreground">{quote.createdAt}</span>
                </div>
                <p className="text-sm text-muted-foreground">{quote.client}</p>
                <p className="text-xs text-muted-foreground">{quote.project}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* See All Quotes Button */}
        <div className="text-center">
          <Button asChild variant="outline" className="bg-muted hover:bg-muted/80 text-foreground">
            <Link to="/quotes">See All Quotes</Link>
          </Button>
        </div>
    </div>
  );
}