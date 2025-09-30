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
      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border">
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
        <section className="relative overflow-hidden py-20 sm:py-32" style={{
          background: 'linear-gradient(180deg, #c1fabe 0%, #a2d5cc 50%, #8fc1d6 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight serif-font">
                    Professional Insulation Quotes in{" "}
                    <span className="text-transparent bg-gradient-to-r from-[#4f75fd] to-[#618af2] bg-clip-text">
                      Minutes
                    </span>
                  </h1>
                  <p className="text-xl text-black max-w-2xl">
                    Stop spending 3+ hours on quotes. Upload photos, enter measurements, 
                    and generate professional PDFs with automatic calculations and rebate finding.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="hero" size="xl" className="bg-[#4f75fd] text-white hover:bg-[#618af2]">
                    <Link to={ctaLink}>
                      {ctaText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-8 pt-4">
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f75fd] to-[#618af2] rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative tree-blob overflow-hidden rounded-3xl">
                  <img
                    src={heroTrees}
                    alt="Tall sequoia/redwood trees shot from ground looking up at canopy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20" style={{
          background: 'linear-gradient(180deg, #8fc1d6 0%, #84b3dd 50%, #7aa7e3 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-black serif-font">
                How It Works
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Simple 3-step process to create professional quotes that win more business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-6 text-center space-y-4 hover:shadow-card transition-all duration-300 bg-white/80 backdrop-blur-sm border-black/20">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#4f75fd] to-[#618af2] rounded-2xl mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-black serif-font">
                        {index + 1}. {feature.title}
                      </h3>
                      <p className="text-black">
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
        <section className="py-20" style={{
          background: 'linear-gradient(180deg, #7aa7e3 0%, #6f9ce9 50%, #c1fabe 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-black serif-font">
                    Win More Business with Professional Quotes
                  </h2>
                  <p className="text-xl text-black">
                    Stand out from competitors with detailed, professional quotes 
                    that show your expertise and build customer trust.
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#4f75fd] mt-0.5 flex-shrink-0" />
                      <span className="text-black font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button asChild variant="construction" size="lg" className="bg-[#4f75fd] text-white hover:bg-[#618af2]">
                  <Link to="/dashboard">
                    Start Creating Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-card border border-black/20">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-black mb-2 serif-font">
                      Transform Your Quoting Process
                    </h3>
                    <p className="text-black">
                      From hours of manual work to professional results in minutes
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-[#2b3b26]">3+ Hours</div>
                      <div className="text-sm text-black">Manual Process</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-[#4f75fd]">15 Minutes</div>
                      <div className="text-sm text-black">With Retrofit.ai</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#4f75fd] to-[#618af2] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">92%</div>
                    <div className="text-sm text-white">Time Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section - Who we are */}
        <section className="py-20" style={{
          background: 'linear-gradient(180deg, #c1fabe 0%, #a2d5cc 50%, #8fc1d6 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-black serif-font">
                  Who we are & What's our story?
                </h2>
                <div className="space-y-4 text-lg text-black">
                  <p>
                    Retrofit.ai is a Canadian cleantech startup focused on removing the friction from home energy retrofits. We're building AI tools to empower retrofit professionals, installers, and energy advisors to get more projects approved, faster.
                  </p>
                  <p>
                    We know the retrofit space isn't broken—it's just bottlenecked by paperwork, delays, and fragmented tools. We're here to change that.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="organic-blob-1 overflow-hidden rounded-2xl">
                  <img
                    src={heroTrees}
                    alt="Tall trees from ground, looking up at the sky"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20" style={{
          background: 'linear-gradient(180deg, #8fc1d6 0%, #84b3dd 50%, #7aa7e3 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="organic-blob-2 overflow-hidden rounded-2xl">
                  <img
                    src={newLogo}
                    alt="Retrofit.ai logo"
                    className="w-full h-96 object-contain bg-white/10 p-8"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-black serif-font">
                  Who makes up Retrofit.ai?
                </h2>
                <p className="text-sm text-[#4f75fd] font-medium uppercase tracking-wide">
                  The team behind the vision.
                </p>
                <div className="space-y-4 text-lg text-black">
                  <p>
                    Founded in 2025 in Toronto, Retrofit.ai was established by four undergraduate students from Toronto Metropolitan University and the University of Toronto, specializing in computer science, engineering, and finance.
                  </p>
                  <p>
                    Having worked at the intersection of cleantech and housing, we saw firsthand how inefficient, manual, and bureaucratic the retrofit process can be. From delayed quotes to confusing rebate applications, Retrofit.ai aims to streamline this process for the contractors who make retrofit possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="py-20" style={{
          background: 'linear-gradient(180deg, #7aa7e3 0%, #6f9ce9 50%, #4f75fd 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black serif-font">
                So Why Now?
              </h2>
              <p className="text-black font-medium">
                Why is now the time for our product?
              </p>
            </div>

            {/* Fact Box */}
            <div className="mb-16">
              <Card className="bg-white/80 backdrop-blur-sm border-black/20 max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Lightbulb className="h-8 w-8 text-[#4f75fd]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4 serif-font">Did you know?</h3>
                  <p className="text-black">
                    In Canada there are over 11 million existing homes that require retrofitting to reduce energy consumption and meet climate goals.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Content Blocks */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/80 backdrop-blur-sm border-black/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-[#4f75fd] mr-2" />
                    <h3 className="text-xl font-bold text-black serif-font">Net-zero by 2050</h3>
                  </div>
                  <p className="text-black">
                    To achieve net zero by 2050, the Canadian federal government aims for deep energy-saving retrofits in residential buildings. On-site fuel use for heating, cooling, and hot water contributes about 13% of Canada's greenhouse gas emissions, increasing to 18% when including electricity for lighting and appliances.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-black/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-[#4f75fd] mr-2" />
                    <h3 className="text-xl font-bold text-black serif-font">Incentives vs. Uptake</h3>
                  </div>
                  <p className="text-black">
                    Canada's governments allocate over $9 billion annually for retrofit incentives, yet only 1–3% of eligible homeowners participate. Challenges include overwhelming administrative tasks, homeowner confusion, and unclear timelines.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-black/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Badge variant="construction" className="mb-2">Our Role</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4 serif-font">Our Role</h3>
                  <p className="text-black">
                    Retrofit.ai streamlines every step—connecting clients, CEAs, contractors, and rebate programs through one simple interface.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Workers Images */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="organic-blob-3 overflow-hidden rounded-2xl">
                <img
                  src={workerThinking}
                  alt="Worker in safety vest thinking"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="organic-blob-1 overflow-hidden rounded-2xl">
                <img
                  src={workerSmiling}
                  alt="Smiling worker with hard hat"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" style={{
          background: 'linear-gradient(180deg, #4f75fd 0%, #618af2 50%, #4f75fd 100%)'
        }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white serif-font">
                  Ready to Transform Your Quote Process?
                </h2>
                <p className="text-xl text-white max-w-2xl mx-auto">
                  Join contractors who are winning more business with professional, 
                  fast quotes that impress homeowners.
                </p>
                <p className="text-lg text-white max-w-2xl mx-auto">
                  We're a lean, mission-driven team based in Canada, working closely with retrofit professionals and early partners to shape the future of retrofit delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="safety" size="xl" className="bg-white text-[#4f75fd] hover:bg-gray-100">
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 py-12" style={{
          background: 'linear-gradient(180deg, #4f75fd 0%, #618af2 50%, #4f75fd 100%)'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src={mainLogo}
                  alt="Retrofit.ai Logo"
                  className="h-32 w-auto"
                />
              </Link>
              <div className="text-sm text-white">
                © 2025 Retrofit.ai. Built for insulation contractors.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}