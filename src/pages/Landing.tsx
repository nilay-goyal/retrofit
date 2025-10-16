import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Calculator, 
  Clock, 
  FileText, 
  HardHat,
  CheckCircle,
  ArrowRight,
  Camera,
  DollarSign,
  MapPin,
  Lightbulb,
  Target,
  Users,
  Leaf
} from "lucide-react";
import heroImage from "@/assets/hero-contractor.jpg";
import heroTrees from "@/assets/hero-trees.jpg";
import newLogo from "@/assets/new-logo.png";
import workerThinking from "@/assets/worker-thinking.jpg";
import workerSmiling from "@/assets/worker-smiling.jpg";
import mainLogo from "@/assets/main-logo.png";

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

// Custom styles for organic shapes and serif fonts with vibrant color palette
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
  
  .serif-font {
    font-family: 'Playfair Display', serif;
  }
  
  .organic-blob-1 {
    clip-path: polygon(0% 0%, 85% 0%, 100% 15%, 100% 85%, 75% 100%, 0% 100%);
  }
  
  .organic-blob-2 {
    clip-path: polygon(0% 20%, 100% 0%, 100% 80%, 20% 100%);
  }
  
  .organic-blob-3 {
    clip-path: polygon(0% 0%, 90% 10%, 100% 90%, 10% 100%);
  }
  
  .tree-blob {
    clip-path: polygon(50% 0%, 100% 0%, 100% 70%, 80% 100%, 0% 100%, 0% 30%);
  }
  
  .rounded-triangle {
    width: 0;
    height: 0;
    border-left: 250px solid transparent;
    border-right: 250px solid transparent;
    border-bottom: 380px solid #4f75fd;
    border-radius: 40px;
    transform: rotate(-5deg);
  }
`;

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const ctaText = user ? "Go to Dashboard" : "Get Started";
  const ctaLink = user ? "/dashboard" : "/auth";

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src={mainLogo}
                  alt="Retrofit.ai Logo"
                  className="h-40 w-auto"
                />
              </Link>
              <Button asChild variant="construction" size="sm">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-construction-navy leading-tight">
                    Professional Insulation Quotes in{" "}
                    <span className="text-construction-green">
                      Minutes
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    Stop spending 3+ hours on quotes. Upload photos, enter measurements, 
                    and generate professional PDFs with automatic calculations and rebate finding.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="construction" size="lg">
                    <Link to={ctaLink}>
                      {ctaText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-construction-green/10 rounded-3xl opacity-50 blur-xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-card">
                  <img
                    src={heroImage}
                    alt="Professional construction worker on job site"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-construction-navy">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 3-step process to create professional quotes that win more business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-6 text-center space-y-4 hover:shadow-card transition-all duration-300 bg-white border-gray-200">
                    <div className="flex items-center justify-center w-16 h-16 bg-construction-green rounded-2xl mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-construction-navy">
                        {index + 1}. {feature.title}
                      </h3>
                      <p className="text-gray-600">
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
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-card">
                <img
                  src={workerSmiling}
                  alt="Smiling construction worker"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-construction-navy">
                    Win More Business with Professional Quotes
                  </h2>
                  <p className="text-xl text-gray-600">
                    Stand out from competitors with detailed, professional quotes 
                    that show your expertise and build customer trust.
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-construction-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button asChild variant="construction" size="lg">
                  <Link to={ctaLink}>
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section - Who we are */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-construction-navy">
                  Who we are & What's our story?
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    Retrofit.ai is a Canadian cleantech startup focused on removing the friction from home energy retrofits. We're building AI tools to empower retrofit professionals, installers, and energy advisors to get more projects approved, faster.
                  </p>
                  <p>
                    We know the retrofit space isn't broken—it's just bottlenecked by paperwork, delays, and fragmented tools. We're here to change that.
                  </p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-card">
                <img
                  src={workerThinking}
                  alt="Construction worker thinking on site"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-construction-navy">
                Who makes up Retrofit.ai?
              </h2>
              <p className="text-sm text-construction-green font-medium uppercase tracking-wide">
                The team behind the vision.
              </p>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Founded in 2025 in Toronto, Retrofit.ai was established by four undergraduate students from Toronto Metropolitan University and the University of Toronto, specializing in computer science, engineering, and finance.
                </p>
                <p>
                  Having worked at the intersection of cleantech and housing, we saw firsthand how inefficient, manual, and bureaucratic the retrofit process can be. From delayed quotes to confusing rebate applications, Retrofit.ai aims to streamline this process for the contractors who make retrofit possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-construction-navy">
                So Why Now?
              </h2>
              <p className="text-gray-600 font-medium">
                Why is now the time for our product?
              </p>
            </div>

            {/* Fact Box */}
            <div className="mb-16">
              <Card className="bg-white border-gray-200 max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Lightbulb className="h-8 w-8 text-construction-green" />
                  </div>
                  <h3 className="text-xl font-bold text-construction-navy mb-4">Did you know?</h3>
                  <p className="text-gray-700">
                    In Canada there are over 11 million existing homes that require retrofitting to reduce energy consumption and meet climate goals.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Content Blocks */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-construction-green mr-2" />
                    <h3 className="text-xl font-bold text-construction-navy">Net-zero by 2050</h3>
                  </div>
                  <p className="text-gray-700">
                    To achieve net zero by 2050, the Canadian federal government aims for deep energy-saving retrofits in residential buildings. On-site fuel use for heating, cooling, and hot water contributes about 13% of Canada's greenhouse gas emissions, increasing to 18% when including electricity for lighting and appliances.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-construction-green mr-2" />
                    <h3 className="text-xl font-bold text-construction-navy">Incentives vs. Uptake</h3>
                  </div>
                  <p className="text-gray-700">
                    Canada's governments allocate over $9 billion annually for retrofit incentives, yet only 1–3% of eligible homeowners participate. Challenges include overwhelming administrative tasks, homeowner confusion, and unclear timelines.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Badge variant="construction" className="mb-2">Our Role</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-construction-navy mb-4">Our Role</h3>
                  <p className="text-gray-700">
                    Retrofit.ai streamlines every step—connecting clients, CEAs, contractors, and rebate programs through one simple interface.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-construction-navy">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Ready to Transform Your Quote Process?
                </h2>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                  Join contractors who are winning more business with professional, 
                  fast quotes that impress homeowners.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="construction" size="lg">
                  <Link to={ctaLink}>
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src={mainLogo}
                  alt="Retrofit.ai Logo"
                  className="h-32 w-auto"
                />
              </Link>
              <div className="text-sm text-gray-600">
                © 2025 Retrofit.ai. Built for insulation contractors.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}