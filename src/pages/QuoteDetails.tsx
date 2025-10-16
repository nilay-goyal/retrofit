import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Edit, Mail, Phone, MapPin, Calendar, DollarSign, Upload, Camera, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useQuoteDetails } from '@/hooks/useQuotes';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
    case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quote, loading, error } = useQuoteDetails(id || '');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#4f75fd]" />
              <p className="text-gray-600">Loading quote details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !quote) {
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
              <p className="text-muted-foreground">{error || "The quote you're looking for doesn't exist."}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = quote.materialCost + quote.laborCost;
  const tax = subtotal * 0.13; // 13% HST
  const total = subtotal + tax - quote.rebateAmount;

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const nextImage = () => {
    const allImages = [...(quote?.images || []), ...uploadedImages];
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    const allImages = [...(quote?.images || []), ...uploadedImages];
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

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
                    Created: {new Date(quote.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    Square Footage: {quote.squareFootage.toLocaleString()} sq ft
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    Total Amount: ${quote.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Carousel Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-green-500" />
                Project Images
              </CardTitle>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const allImages = [...(quote?.images || []), ...uploadedImages];
              if (allImages.length === 0) {
                return (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No images uploaded yet</p>
                  </div>
                );
              }

              return (
                <div className="space-y-3">
                  {/* Main Image Display */}
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={allImages[currentImageIndex]}
                      alt={`Project image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Carousel */}
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-green-500 shadow-md'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Project Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{quote.project}</p>
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

        {/* Quote Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Materials */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Materials</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex-1">
                    <div className="font-medium">Insulation Materials</div>
                    <div className="text-sm text-muted-foreground">
                      {quote.squareFootage} sq ft × $2.50/sq ft
                    </div>
                  </div>
                  <div className="font-medium">${quote.materialCost.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Labor */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Labor</h3>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex-1">
                  <div className="font-medium">Professional Installation</div>
                  <div className="text-sm text-muted-foreground">
                    {quote.squareFootage} sq ft × $1.80/sq ft
                  </div>
                </div>
                <div className="font-medium">${quote.laborCost.toLocaleString()}</div>
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
              {quote.rebateAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Rebate</span>
                  <span>-${quote.rebateAmount.toFixed(2)}</span>
                </div>
              )}
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