import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, FileText, Download, Upload, Folder, Loader2, Trash2, Eye } from 'lucide-react';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { useToast } from '@/hooks/use-toast';

// Document Templates Data
const documentTemplates = {
  BLANK: { name: 'Blank Template', url: 'PLACEHOLDER_BLANK_PDF' },
  QUOTE: { name: 'Quote Template', url: 'PLACEHOLDER_QUOTE_PDF' },
  RECEIPT: { name: 'Receipt Template', url: 'PLACEHOLDER_RECEIPT_PDF' },
  FORM: { name: 'Form Template', url: 'PLACEHOLDER_FORM_PDF' },
  EMAIL: { name: 'Email Template', url: 'PLACEHOLDER_EMAIL_PDF' }
};

export default function DocumentsTemplates() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    groups, 
    files, 
    loading, 
    uploading, 
    error, 
    createGroup, 
    uploadFiles, 
    deleteFile, 
    deleteGroup, 
    getFilesByGroup,
    getUngroupedFiles 
  } = useDocumentTemplates();
  
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Download template function
  const downloadTemplate = (templateKey: keyof typeof documentTemplates) => {
    const template = documentTemplates[templateKey];
    if (template.url.includes('PLACEHOLDER')) {
      toast({
        title: "Template not available",
        description: "PDF template not yet available. Please add the PDF file.",
        variant: "destructive",
      });
      return;
    }
    // Actual download code here
    const link = document.createElement('a');
    link.href = template.url;
    link.download = template.name;
    link.click();
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, groupId?: string) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const success = await uploadFiles(files, groupId);
    if (success) {
      toast({
        title: "Files uploaded successfully",
        description: `Successfully uploaded ${files.length} file(s)`,
      });
    } else {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }
    
    // Reset input
    event.target.value = '';
  };

  // Handle group click
  const handleGroupClick = (groupId: string) => {
    setSelectedGroup(selectedGroup === groupId ? null : groupId);
  };

  // Handle new group creation
  const handleNewGroup = async () => {
    const groupName = prompt('Enter new group name:');
    if (groupName && groupName.trim()) {
      const success = await createGroup(groupName.trim());
      if (success) {
        toast({
          title: "Group created",
          description: `New group "${groupName}" created successfully!`,
        });
      } else {
        toast({
          title: "Failed to create group",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle file download
  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    link.click();
  };

  // Handle file deletion
  const handleFileDelete = async (fileId: string, fileName: string) => {
    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const success = await deleteFile(fileId);
      if (success) {
        toast({
          title: "File deleted",
          description: `"${fileName}" has been deleted successfully.`,
        });
      } else {
        toast({
          title: "Failed to delete file",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#4f75fd]" />
              <p className="text-gray-600">Loading documents...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Existing Groups */}
            {groups.map((group) => {
              const groupFiles = getFilesByGroup(group.id);
              return (
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
                    <p className="text-xs text-gray-500 mt-1">{groupFiles.length} documents</p>
                    
                    {/* Upload Button */}
                    <div className="mt-3">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                        onChange={(e) => handleFileUpload(e, group.id)}
                        className="hidden"
                        id={`upload-${group.id}`}
                        disabled={uploading}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        disabled={uploading}
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById(`upload-${group.id}`)?.click();
                        }}
                      >
                        {uploading ? (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Upload className="w-3 h-3 mr-1" />
                        )}
                        Upload
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

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
                {(() => {
                  const groupFiles = getFilesByGroup(selectedGroup);
                  if (groupFiles.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <Folder className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No documents in this group yet.</p>
                        <p className="text-sm">Upload files to get started.</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="space-y-2">
                      {groupFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#4f75fd]" />
                            <div>
                              <span className="text-gray-900 font-medium">{file.name}</span>
                              <p className="text-xs text-gray-500">{formatFileSize(file.file_size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFileDownload(file.file_url, file.name)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(file.file_url, '_blank')}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFileDelete(file.id, file.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ungrouped Files */}
        {getUngroupedFiles().length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ungrouped Files</h3>
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  {getUngroupedFiles().map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-yellow-600" />
                        <div>
                          <span className="text-gray-900 font-medium">{file.name}</span>
                          <p className="text-xs text-gray-500">{formatFileSize(file.file_size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFileDownload(file.file_url, file.name)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(file.file_url, '_blank')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFileDelete(file.id, file.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
            <h4 className="font-medium text-blue-900 mb-2">Document Management</h4>
            <p className="text-sm text-blue-800">
              Upload and organize your documents by creating groups. Files are stored securely and can be downloaded or viewed anytime. 
              Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

