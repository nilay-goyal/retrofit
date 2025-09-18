import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Edit, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';

// Mock data - in a real app this would come from an API
const allQuotes = [
  {
    id: "Q-001",
    client: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Toronto, ON",
    project: "Attic Insulation - R50",
    description: "Complete attic insulation upgrade including air sealing and vapor barrier installation",
    squareFootage: 1200,
    amount: 4500,
    status: "pending",
    date: "2024-01-15",
    expiryDate: "2024-02-15",
    materials: [
      { name: "Blown-in Cellulose Insulation", quantity: "25 bags", unitPrice: 45, total: 1125 },
      { name: "Vapor Barrier", quantity: "1200 sq ft", unitPrice: 1.25, total: 1500 },
      { name: "Air Sealing Materials", quantity: "1 set", unitPrice: 250, total: 250 }
    ],
    labor: {
      description: "Professional installation and cleanup",
      hours: 16,
      rate: 85,
      total: 1360
    },
    notes: "Customer requested eco-friendly materials. Property is a 1950s bungalow with existing R20 insulation to be topped up."
  },
  {
    id: "Q-002", 
    client: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Ottawa, ON",
    project: "Basement Insulation",
    description: "Full basement wall and rim joist insulation with moisture control",
    squareFootage: 800,
    amount: 6200,
    status: "approved",
    date: "2024-01-20",
    expiryDate: "2024-02-20",
    materials: [
      { name: "Spray Foam Insulation", quantity: "800 sq ft", unitPrice: 4.50, total: 3600 },
      { name: "Rim Joist Sealing", quantity: "200 linear ft", unitPrice: 8, total: 1600 },
      { name: "Moisture Barrier", quantity: "800 sq ft", unitPrice: 1.25, total: 1000 }
    ],
    labor: {
      description: "Professional spray foam application",
      hours: 12,
      rate: 85,
      total: 1020
    },
    notes: "Basement shows some moisture issues. Recommended dehumidifier installation."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const quote = allQuotes.find(q => q.id === id);
  
  if (!quote) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => navigate('/quotes')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quotes
          </Button>
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Quote Not Found</h2>
              <p className="text-muted-foreground">The quote you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = quote.materials.reduce((sum, item) => sum + item.total, 0) + quote.labor.total;
  const tax = subtotal * 0.13; // 13% HST
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate('/quotes')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quotes
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Quote
            </Button>
          </div>
        </div>

        {/* Quote Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">Quote {quote.id}</CardTitle>
                <p className="text-lg font-medium text-muted-foreground">{quote.project}</p>
              </div>
              <Badge className={getStatusColor(quote.status)}>
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div>
                <h3 className="font-semibold mb-3">Client Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{quote.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {quote.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {quote.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {quote.address}
                  </div>
                </div>
              </div>

              {/* Quote Information */}
              <div>
                <h3 className="font-semibold mb-3">Quote Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Created: {new Date(quote.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Expires: {new Date(quote.expiryDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    Square Footage: {quote.squareFootage.toLocaleString()} sq ft
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{quote.description}</p>
            {quote.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-muted-foreground text-sm">{quote.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Materials & Labor Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Materials */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Materials</h3>
              <div className="space-y-3">
                {quote.materials.map((material, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50">
                    <div className="flex-1">
                      <div className="font-medium">{material.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {material.quantity} × ${material.unitPrice}
                      </div>
                    </div>
                    <div className="font-medium">${material.total.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Labor</h3>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex-1">
                  <div className="font-medium">{quote.labor.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {quote.labor.hours} hours × ${quote.labor.rate}/hour
                  </div>
                </div>
                <div className="font-medium">${quote.labor.total.toLocaleString()}</div>
              </div>
            </div>

            {/* Totals */}
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>HST (13%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteDetails;