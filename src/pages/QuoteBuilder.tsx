import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Calculator, 
  FileText, 
  Camera,
  Ruler,
  DollarSign,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, title: "Project Info", icon: FileText },
  { id: 2, title: "Photos & Measurements", icon: Camera },
  { id: 3, title: "Calculations", icon: Calculator },
  { id: 4, title: "Review & Generate", icon: CheckCircle }
];

export default function QuoteBuilder() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Project Info
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectAddress: "",
    postalCode: "",
    projectType: "",
    description: "",
    
    // Step 2: Measurements
    length: "",
    width: "",
    height: "",
    squareFootage: "",
    photos: [] as File[],
    
    // Step 3: Calculations (auto-calculated)
    materialRate: 2.50, // $2.50 per sq ft
    laborRate: 1.80, // $1.80 per sq ft
    materialCost: 0,
    laborCost: 0,
    rebateAmount: 0,
    totalCost: 0
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate square footage when dimensions change
    if (field === "length" || field === "width") {
      const length = field === "length" ? parseFloat(value) : parseFloat(formData.length);
      const width = field === "width" ? parseFloat(value) : parseFloat(formData.width);
      if (length && width) {
        setFormData(prev => ({ ...prev, squareFootage: (length * width).toString() }));
      }
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...Array.from(files)] 
      }));
    }
  };

  const calculateCosts = () => {
    const sqft = parseFloat(formData.squareFootage) || 0;
    const materialRate = parseFloat(formData.materialRate.toString()) || 0;
    const laborRate = parseFloat(formData.laborRate.toString()) || 0;
    const materialCost = sqft * materialRate;
    const laborCost = sqft * laborRate;
    const baseTotal = materialCost + laborCost;
    
    // Mock rebate calculation based on postal code
    const rebateAmount = formData.postalCode ? baseTotal * 0.15 : 0; // 15% rebate
    const totalCost = baseTotal - rebateAmount;
    
    setFormData(prev => ({
      ...prev,
      materialCost,
      laborCost,
      rebateAmount,
      totalCost
    }));
  };

  const nextStep = () => {
    if (currentStep === 2) {
      calculateCosts();
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const saveQuote = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save quotes.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          user_id: user.id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          address: formData.projectAddress,
          project_name: formData.projectType || 'Insulation Project',
          project_type: formData.projectType,
          square_footage: parseFloat(formData.squareFootage) || 0,
          material_cost: formData.materialCost,
          labor_cost: formData.laborCost,
          amount: formData.totalCost,
          rebate_amount: formData.rebateAmount,
          notes: formData.description,
          status: 'Pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Quote saved successfully!",
        description: "Your quote has been saved and will appear on your dashboard.",
      });

      // Navigate to dashboard after successful save
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving quote:', err);
      toast({
        title: "Error saving quote",
        description: err instanceof Error ? err.message : "Failed to save quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Project Information</h2>
              <p className="text-muted-foreground">Enter client details and project information</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email Address</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Phone Number</Label>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectAddress">Project Address *</Label>
                  <Input
                    id="projectAddress"
                    value={formData.projectAddress}
                    onChange={(e) => handleInputChange("projectAddress", e.target.value)}
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <Label htmlFor="projectType">Project Type</Label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    placeholder="Attic Insulation"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the insulation project, any special requirements, or notes..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Photos & Measurements</h2>
              <p className="text-muted-foreground">Upload job site photos and enter measurements</p>
            </div>
            
            {/* Photo Upload */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-construction" />
                  <Label className="text-lg font-semibold">Job Site Photos</Label>
                </div>
                
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-construction transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Drag and drop photos here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Upload photos of the area to be insulated
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {formData.photos.length} photo(s) uploaded
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((file, index) => (
                        <div key={index} className="px-3 py-1 bg-construction/10 text-construction text-sm rounded-full">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Measurements */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-construction" />
                  <Label className="text-lg font-semibold">Measurements</Label>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="length">Length (ft) *</Label>
                    <Input
                      id="length"
                      type="number"
                      value={formData.length}
                      onChange={(e) => handleInputChange("length", e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (ft) *</Label>
                    <Input
                      id="width"
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (ft)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="squareFootage">Total Sq Ft</Label>
                    <Input
                      id="squareFootage"
                      type="number"
                      value={formData.squareFootage}
                      onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                      placeholder="600"
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Cost Calculations</h2>
              <p className="text-muted-foreground">Enter your rates and calculate costs with rebates</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/20 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#4f75fd]" />
                  Material & Labor Costs
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Area to insulate:</span>
                    <span className="font-semibold">{formData.squareFootage} sq ft</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="materialRate">Material Rate ($/sq ft)</Label>
                      <Input
                        id="materialRate"
                        type="number"
                        step="0.01"
                        value={formData.materialRate}
                        onChange={(e) => handleInputChange("materialRate", e.target.value)}
                        placeholder="2.50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="laborRate">Labor Rate ($/sq ft)</Label>
                      <Input
                        id="laborRate"
                        type="number"
                        step="0.01"
                        value={formData.laborRate}
                        onChange={(e) => handleInputChange("laborRate", e.target.value)}
                        placeholder="1.80"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Materials:</span>
                      <span className="font-semibold">${formData.materialCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Labor:</span>
                      <span className="font-semibold">${formData.laborCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Subtotal:</span>
                      <span>${(formData.materialCost + formData.laborCost).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calculateCosts}
                    className="w-full bg-[#4f75fd] hover:bg-[#618af2] text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Recalculate Costs
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-safety" />
                  Available Rebates
                </h3>
                
                <div className="space-y-3">
                  {formData.postalCode ? (
                    <>
                      <div className="p-4 bg-[#4f75fd]/10 border border-[#4f75fd]/20 rounded-lg">
                        <p className="text-sm font-medium text-[#4f75fd] mb-1">
                          ✓ Rebate Found for {formData.postalCode}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Energy Efficiency Rebate Program
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Rebate amount (15%):</span>
                        <span className="font-semibold text-[#4f75fd]">-${formData.rebateAmount.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        Enter postal code to check for available rebates
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            <Card className="p-6 bg-gradient-to-r from-[#4f75fd]/5 to-[#618af2]/5 border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Total Project Cost</h3>
                  <p className="text-muted-foreground">Final amount after rebates</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#4f75fd]">
                    ${formData.totalCost.toFixed(2)}
                  </div>
                  {formData.rebateAmount > 0 && (
                    <div className="text-sm text-[#4f75fd]">
                      You save ${formData.rebateAmount.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Review & Generate Quote</h2>
              <p className="text-muted-foreground">Review your quote details and generate PDF</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Project Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client:</span>
                    <span className="font-medium">{formData.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{formData.projectAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project:</span>
                    <span className="font-medium">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span className="font-medium">{formData.squareFootage} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photos:</span>
                    <span className="font-medium">{formData.photos.length} uploaded</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Materials:</span>
                    <span className="font-medium">${formData.materialCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Labor:</span>
                    <span className="font-medium">${formData.laborCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rebates:</span>
                    <span className="font-medium text-success">-${formData.rebateAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-construction">${formData.totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="text-center space-y-4">
              <div className="p-6 bg-gradient-to-r from-[#4f75fd]/5 to-[#618af2]/5 rounded-lg border-white/20">
                <CheckCircle className="w-16 h-16 text-[#4f75fd] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Quote Ready to Generate!
                </h3>
                <p className="text-muted-foreground">
                  Your professional PDF quote will include all project details, 
                  photos, calculations, and rebate information.
                </p>
              </div>
              
              <Button 
                onClick={saveQuote}
                disabled={saving}
                variant="construction" 
                size="xl" 
                className="w-full sm:w-auto bg-[#4f75fd] hover:bg-[#618af2] text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving Quote...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Save Quote
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #c1fabe 0%, #a2d5cc 50%, #8fc1d6 100%)'
    }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive 
                        ? "bg-construction text-construction-foreground border-construction shadow-construction" 
                        : isCompleted
                          ? "bg-success text-success-foreground border-success"
                          : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${isActive ? "text-construction" : "text-muted-foreground"}`}>
                      Step {step.id}
                    </div>
                    <div className={`text-xs ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-construction transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-white/20">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-white/80 hover:bg-white text-[#4f75fd] border-[#4f75fd]"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button 
            variant="construction"
            onClick={nextStep}
            disabled={currentStep === 4}
            className="bg-[#4f75fd] hover:bg-[#618af2] text-white"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}