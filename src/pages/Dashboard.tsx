import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Clock,
  DollarSign,
  TrendingUp
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
        <Button asChild className="bg-green-500 hover:bg-green-600 text-white border-0">
          <Link to="/quote-builder">
            <Plus className="w-4 h-4 mr-2" />
            Create Quote
          </Link>
        </Button>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <div className={`p-2 rounded-lg ${stat.color === 'text-construction' ? 'bg-[#2b3b26]/10' : stat.color === 'text-success' ? 'bg-[#4f75fd]/10' : stat.color === 'text-safety' ? 'bg-[#8fc1d6]/10' : 'bg-[#4f75fd]/10'}`}>
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


        {/* Your Quotes Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Your Quotes</h2>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {recentQuotes.map((quote, index) => (
            <Card key={quote.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
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
          <Button asChild variant="outline" className="bg-white hover:bg-gray-50 text-green-500 border-green-500">
            <Link to="/quotes">See All Quotes</Link>
          </Button>
        </div>
    </div>
  );
}