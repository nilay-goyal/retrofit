import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Clock,
  DollarSign,
  TrendingUp,
  Loader2,
  Calendar,
  Target
} from "lucide-react";
import { useDashboard } from '@/hooks/useDashboard';

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
  const { quotes, stats, loading, error, hasQuotes } = useDashboard();

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#4f75fd]" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state when no quotes exist
  if (!hasQuotes) {
    return (
      <div className="p-6">
        {/* Header with Add New Project Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Metrics</h1>
            <p className="text-muted-foreground">Create your first quote to see your dashboard metrics</p>
          </div>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white border-0">
            <Link to="/quote-builder">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Quote
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Quotes Yet</h2>
            <p className="text-gray-600 mb-8">
              Start by creating your first quote to track your projects, revenue, and performance metrics.
            </p>
            <Button asChild size="lg" className="bg-[#4f75fd] hover:bg-[#618af2] text-white">
              <Link to="/quote-builder">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show dashboard with data
  return (
    <div className="p-6">
      {/* Header with Add New Project Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Metrics</h1>
          <p className="text-muted-foreground">Track your quotes and performance</p>
        </div>
        <Button asChild className="bg-green-500 hover:bg-green-600 text-white border-0">
          <Link to="/quote-builder">
            <Plus className="w-4 h-4 mr-2" />
            Create Quote
          </Link>
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Quotes This Month
              </p>
              <div className="p-2 rounded-lg bg-[#2b3b26]/10">
                <FileText className="w-5 h-5 text-construction" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {stats.quotesThisMonth}
              </p>
              <p className="text-sm font-medium text-construction">
                {stats.quotesThisMonthChange} from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Total Revenue
              </p>
              <div className="p-2 rounded-lg bg-[#4f75fd]/10">
                <DollarSign className="w-5 h-5 text-[#4f75fd]" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-[#4f75fd]">
                {stats.totalRevenueChange} from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Avg. Quote Time
              </p>
              <div className="p-2 rounded-lg bg-[#8fc1d6]/10">
                <Clock className="w-5 h-5 text-safety" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {stats.averageQuoteTime} min
              </p>
              <p className="text-sm font-medium text-safety">
                {stats.averageQuoteTimeChange} from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Approval Rate
              </p>
              <div className="p-2 rounded-lg bg-[#4f75fd]/10">
                <TrendingUp className="w-5 h-5 text-[#4f75fd]" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {stats.approvalRate}%
              </p>
              <p className="text-sm font-medium text-[#4f75fd]">
                {stats.approvalRateChange} from last month
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Your Quotes Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Quotes</h2>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {quotes.map((quote, index) => (
          <Card key={quote.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300 border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground">Quote {index + 1}</h3>
                <span className="text-xs text-muted-foreground">{quote.createdAt}</span>
              </div>
              <p className="text-sm text-muted-foreground">{quote.client}</p>
              <p className="text-xs text-muted-foreground">{quote.project}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#4f75fd]">{quote.amount}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {quote.status}
                </span>
              </div>
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