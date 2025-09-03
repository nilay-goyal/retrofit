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
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your insulation quotes and track your business
            </p>
          </div>
          <Button asChild variant="construction" size="lg">
            <Link to="/quote-builder">
              <Plus className="w-5 h-5" />
              New Quote
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 hover:shadow-card transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className={`text-sm font-semibold ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-construction/10`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-construction">
                <Calculator className="w-6 h-6 text-construction-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">Quick Quote</h3>
                <p className="text-sm text-muted-foreground">Start a new quote in 15 minutes</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/quote-builder">Create Quote</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">View Quotes</h3>
                <p className="text-sm text-muted-foreground">Manage all your quotes</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/quotes">View All</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-safety/20">
                <TrendingUp className="w-6 h-6 text-safety" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your performance</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" disabled>
              Coming Soon
            </Button>
          </Card>
        </div>

        {/* Recent Quotes */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-foreground">Recent Quotes</h2>
              <Button asChild variant="link">
                <Link to="/quotes">View All</Link>
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {recentQuotes.map((quote) => (
              <div key={quote.id} className="p-6 hover:bg-accent/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{quote.client}</h3>
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(quote.status)}`}
                      >
                        {quote.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{quote.project}</p>
                    <p className="text-sm text-muted-foreground">{quote.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{quote.amount}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}