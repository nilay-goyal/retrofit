import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { 
  Calculator, 
  FileText, 
  LayoutDashboard,
  HardHat,
  Menu,
  X 
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Quote", href: "/quote-builder", icon: Calculator },
  { name: "Quotes", href: "/quotes", icon: FileText },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

  // Protected routes - routes that require authentication
  const protectedRoutes = ["/dashboard", "/quotes", "/quote-builder", "/rebates", "/settings", "/templates"];
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  // Show sidebar layout for dashboard and related pages
  const showSidebar = location.pathname.startsWith('/dashboard') || 
                     location.pathname.startsWith('/quotes') || 
                     location.pathname.startsWith('/settings') ||
                     location.pathname.startsWith('/rebates') ||
                     location.pathname.startsWith('/templates');

  // Redirect to auth if accessing protected route without being logged in
  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      navigate("/auth");
    }
  }, [user, loading, isProtectedRoute, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render children directly if on landing or auth page
  if (isLandingPage || isAuthPage) {
    return <>{children}</>;
  }

  // Use sidebar layout for dashboard pages
  if (showSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 bg-gradient-subtle">
            <header className="h-12 flex items-center border-b bg-background/80 backdrop-blur-sm px-4">
              <SidebarTrigger />
              <div className="ml-4 flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-construction rounded-lg">
                  <HardHat className="w-5 h-5 text-construction-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">Retrofit.ai</h1>
                </div>
              </div>
            </header>
            <div>
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // Regular layout for other pages
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-construction rounded-lg">
                <HardHat className="w-6 h-6 text-construction-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Retrofit.ai</h1>
                <p className="text-xs text-muted-foreground font-medium">Professional Quotes</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}