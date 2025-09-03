import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Clock, 
  FileText, 
  HardHat,
  CheckCircle,
  ArrowRight,
  Camera,
  DollarSign,
  MapPin
} from "lucide-react";
import heroImage from "@/assets/hero-contractor.jpg";

const features = [
  {
    icon: Camera,
    title: "Photo Upload",
    description: "Upload job site photos and enter basic measurements"
  },
  {
    icon: Calculator,
    title: "Auto-Calculate",
    description: "System calculates materials, labor costs, and rebates automatically"
  },
  {
    icon: FileText,
    title: "Professional PDFs",
    description: "Generate branded, professional quotes ready to send"
  },
  {
    icon: MapPin,
    title: "Rebate Finder",
    description: "Find available rebates by postal code automatically"
  }
];

const benefits = [
  "15-minute quote generation vs 3+ hours manually",
  "Professional, branded PDF quotes",
  "Automatic material and labor calculations",
  "Built-in rebate database by location",
  "Mobile-friendly for job site use"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-construction rounded-lg">
                <HardHat className="w-6 h-6 text-construction-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Retrofit.ai</h1>
                <p className="text-xs text-muted-foreground font-medium">Professional Quotes</p>
              </div>
            </div>
            <Button asChild variant="construction" size="sm">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Professional Insulation Quotes in{" "}
                  <span className="text-transparent bg-gradient-construction bg-clip-text">
                    15 Minutes
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Stop spending 3+ hours on quotes. Upload photos, enter measurements, 
                  and generate professional PDFs with automatic calculations and rebate finding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/dashboard">
                    Start Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="#features">See How It Works</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-construction" />
                  <span className="text-sm font-semibold">15 min quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-safety" />
                  <span className="text-sm font-semibold">Auto rebate finder</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-construction rounded-3xl opacity-10 blur-xl"></div>
              <img
                src={heroImage}
                alt="Professional contractor using tablet on construction site"
                className="relative rounded-3xl shadow-glow w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple 3-step process to create professional quotes that win more business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6 text-center space-y-4 hover:shadow-card transition-all duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-construction rounded-2xl mx-auto">
                    <Icon className="w-8 h-8 text-construction-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {index + 1}. {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Win More Business with Professional Quotes
                </h2>
                <p className="text-xl text-muted-foreground">
                  Stand out from competitors with detailed, professional quotes 
                  that show your expertise and build customer trust.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-construction mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild variant="construction" size="lg">
                <Link to="/dashboard">
                  Start Creating Quotes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Transform Your Quoting Process
                  </h3>
                  <p className="text-muted-foreground">
                    From hours of manual work to professional results in minutes
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-destructive">3+ Hours</div>
                    <div className="text-sm text-muted-foreground">Manual Process</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-construction">15 Minutes</div>
                    <div className="text-sm text-muted-foreground">With Retrofit.ai</div>
                  </div>
                </div>

                <div className="bg-gradient-construction/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-construction mb-1">92%</div>
                  <div className="text-sm text-muted-foreground">Time Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                Ready to Transform Your Quote Process?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join contractors who are winning more business with professional, 
                fast quotes that impress homeowners.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="safety" size="xl">
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-construction rounded-lg">
                <HardHat className="w-5 h-5 text-construction-foreground" />
              </div>
              <div>
                <div className="font-bold text-foreground">Retrofit.ai</div>
                <div className="text-xs text-muted-foreground">Professional Insulation Quotes</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Retrofit.ai. Built for insulation contractors.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}