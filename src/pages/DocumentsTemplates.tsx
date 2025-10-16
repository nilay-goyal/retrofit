import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, FileText, Download, Upload, Folder } from 'lucide-react';

// Document Templates Data
const documentTemplates = {
  BLANK: { name: 'Blank Template', url: 'PLACEHOLDER_BLANK_PDF' },
  QUOTE: { name: 'Quote Template', url: 'PLACEHOLDER_QUOTE_PDF' },
  RECEIPT: { name: 'Receipt Template', url: 'PLACEHOLDER_RECEIPT_PDF' },
  FORM: { name: 'Form Template', url: 'PLACEHOLDER_FORM_PDF' },
  EMAIL: { name: 'Email Template', url: 'PLACEHOLDER_EMAIL_PDF' }
};

// TO REPLACE PLACEHOLDERS: Update the 'url' values with actual PDF file paths or URLs

// Groups Data
const groups = [
  { id: 1, name: 'All Quotes', documents: ['Quote_001.pdf', 'Quote_002.pdf'] },
  { id: 2, name: 'May Docs', documents: ['Invoice_May.pdf', 'Receipt_May.pdf'] },
  { id: 3, name: 'Grants Residence', documents: ['Grant_Application.pdf', 'Property_Deed.pdf'] },
  { id: 4, name: 'Receipts', documents: ['Receipt_001.pdf', 'Receipt_002.pdf', 'Receipt_003.pdf'] }
];

export default function DocumentsTemplates() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Download template function
  const downloadTemplate = (templateKey: keyof typeof documentTemplates) => {
    const template = documentTemplates[templateKey];
    if (template.url.includes('PLACEHOLDER')) {
      alert('PDF template not yet available. Please add the PDF file.');
      return;
    }
    // Actual download code here
    const link = document.createElement('a');
    link.href = template.url;
    link.download = template.name;
    link.click();
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      console.log('Uploaded files:', fileNames);
      alert(`Successfully uploaded ${fileNames.length} file(s): ${fileNames.join(', ')}`);
    }
  };

  // Handle group click
  const handleGroupClick = (groupId: number) => {
    setSelectedGroup(selectedGroup === groupId ? null : groupId);
  };

  // Handle new group creation
  const handleNewGroup = () => {
    const groupName = prompt('Enter new group name:');
    if (groupName) {
      console.log('Creating new group:', groupName);
      alert(`New group "${groupName}" created!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents & Templates</h1>
            <p className="text-gray-600">Manage your document templates and organize files</p>
          </div>
        </div>

        {/* Section 1 - Document Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Document Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(documentTemplates).map(([key, template]) => (
              <Card 
                key={key}
                className="bg-white shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => downloadTemplate(key as keyof typeof documentTemplates)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4f75fd] to-[#618af2] rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">{key}</h3>
                  <p className="text-xs text-gray-500 mt-1">{template.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2 - My Groups */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Existing Groups */}
            {groups.map((group) => (
              <Card 
                key={group.id}
                className={`bg-white shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer ${
                  selectedGroup === group.id ? 'ring-2 ring-[#4f75fd]' : ''
                }`}
                onClick={() => handleGroupClick(group.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c1fabe] to-[#a2d5cc] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Folder className="w-8 h-8 text-[#2b3b26]" />
                  </div>
                  <h3 className="font-medium text-gray-900">{group.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{group.documents.length} documents</p>
                  
                  {/* Upload Button */}
                  <div className="mt-3">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id={`upload-${group.id}`}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById(`upload-${group.id}`)?.click();
                      }}
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* New Group Card */}
            <Card 
              className="bg-white shadow-sm border-2 border-dashed border-gray-300 hover:border-[#4f75fd] hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={handleNewGroup}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">New group</h3>
                <p className="text-xs text-gray-500 mt-1">Click to create</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Group Documents */}
        {selectedGroup && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Documents in "{groups.find(g => g.id === selectedGroup)?.name}"
            </h3>
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  {groups.find(g => g.id === selectedGroup)?.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#4f75fd]" />
                        <span className="text-gray-900">{doc}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recently Uploaded Files</h3>
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="text-gray-900">{file}</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Developer Notes</h4>
            <p className="text-sm text-blue-800">
              To replace placeholder PDFs: Update the 'url' values in the documentTemplates object with actual PDF file paths or URLs.
              The downloadTemplate function will handle the actual file downloads once real URLs are provided.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

