import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Users } from "lucide-react";
import heroTrees from "@/assets/hero-trees.jpg";
import logoRfai from "@/assets/logo-rfai.png";
import workerThinking from "@/assets/worker-thinking.jpg";
import workerSmiling from "@/assets/worker-smiling.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-construction/5 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Who we are & What's our story?
              </h1>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Retrofit.ai is a Canadian cleantech startup focused on removing the friction from home energy retrofits. We're building AI tools to empower retrofit professionals, installers, and energy advisors to get more projects approved, faster.
                </p>
                <p>
                  We know the retrofit space isn't broken—it's just bottlenecked by paperwork, delays, and fragmented tools. We're here to change that.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroTrees}
                alt="Tall trees from ground, looking up at the sky"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src={logoRfai}
                alt="Retrofit.ai logo"
                className="rounded-2xl shadow-xl w-full h-96 object-contain bg-construction/10 p-8"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Who makes up Retrofit.ai?
              </h2>
              <p className="text-sm text-construction font-medium uppercase tracking-wide">
                The team behind the vision.
              </p>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2025 in Toronto, Retrofit.ai was established by four undergraduate students from Toronto Metropolitan University and the University of Toronto, specializing in computer science, engineering, and finance.
                </p>
                <p>
                  Having worked at the intersection of cleantech and housing, we saw firsthand how inefficient, manual, and bureaucratic the retrofit process can be. From delayed quotes to confusing rebate applications, Retrofit.ai aims to streamline this process for contractors, CEAs, and homeowners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 bg-gradient-to-r from-construction/5 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              So Why Now?
            </h2>
            <p className="text-construction font-medium">
              Why is now the time for our product?
            </p>
          </div>

          {/* Fact Box */}
          <div className="mb-16">
            <Card className="bg-construction/10 border-construction/20 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-construction" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Did you know?</h3>
                <p className="text-muted-foreground">
                  In Canada there are over 11 million existing homes that require retrofitting to reduce energy consumption and meet climate goals.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content Blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-construction mr-2" />
                  <h3 className="text-xl font-bold text-foreground">Net-zero by 2050</h3>
                </div>
                <p className="text-muted-foreground">
                  To achieve net zero by 2050, the Canadian federal government aims for deep energy-saving retrofits in residential buildings. On-site fuel use for heating, cooling, and hot water contributes about 13% of Canada's greenhouse gas emissions, increasing to 18% when including electricity for lighting and appliances.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-construction mr-2" />
                  <h3 className="text-xl font-bold text-foreground">Incentives vs. Uptake</h3>
                </div>
                <p className="text-muted-foreground">
                  Canada's governments allocate over $9 billion annually for retrofit incentives, yet only 1–3% of eligible homeowners participate. Challenges include overwhelming administrative tasks, homeowner confusion, and unclear timelines.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Badge variant="construction" className="mb-2">Our Role</Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Role</h3>
                <p className="text-muted-foreground">
                  Retrofit.ai streamlines every step—connecting clients, CEAs, contractors, and rebate programs through one simple interface.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Workers Images */}
          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={workerThinking}
              alt="Worker in safety vest thinking"
              className="rounded-2xl shadow-xl w-full h-64 object-cover"
            />
            <img
              src={workerSmiling}
              alt="Smiling worker with hard hat"
              className="rounded-2xl shadow-xl w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-construction/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              So how do we work?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                We're a lean, mission-driven team based in Canada, working closely with retrofit professionals and early partners to shape the future of retrofit delivery.
              </p>
              <p>
                If you're a CEA, contractor, utility, or municipal program lead—we'd love to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Button asChild variant="default" size="lg">
                <Link to="/quote-builder">The Product</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">Reach Out</Link>
              </Button>
              <Button asChild variant="construction" size="lg">
                <Link to="/dashboard">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;