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
import mainLogo from "@/assets/main-logo.png";

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
          <main className="flex-1 bg-gray-50">
            <header className="h-12 flex items-center border-b bg-white px-4">
              <SidebarTrigger />
              <Link to="/" className="ml-4 flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src={mainLogo}
                  alt="Retrofit.ai Logo"
                  className="h-16 w-auto"
                />
              </Link>
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
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #c1fabe 0%, #a2d5cc 50%, #8fc1d6 100%)'
    }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src={mainLogo}
                alt="Retrofit.ai Logo"
                className="h-32 w-auto"
              />
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
                        ? "bg-[#4f75fd] text-white shadow-lg"
                        : "text-black hover:text-[#4f75fd] hover:bg-white/50"
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
          <div className="md:hidden border-t border-white/20 bg-white/80 backdrop-blur-sm">
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
                        ? "bg-[#4f75fd] text-white"
                        : "text-black hover:text-[#4f75fd] hover:bg-white/50"
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