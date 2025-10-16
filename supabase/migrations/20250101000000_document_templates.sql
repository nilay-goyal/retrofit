-- Create document_groups table
CREATE TABLE IF NOT EXISTS document_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_files table
CREATE TABLE IF NOT EXISTS document_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  group_id UUID REFERENCES document_groups(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_document_groups_user_id ON document_groups(user_id);
CREATE INDEX IF NOT EXISTS idx_document_files_user_id ON document_files(user_id);
CREATE INDEX IF NOT EXISTS idx_document_files_group_id ON document_files(group_id);

-- Enable Row Level Security
ALTER TABLE document_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for document_groups
CREATE POLICY "Users can view their own document groups" ON document_groups
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own document groups" ON document_groups
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own document groups" ON document_groups
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own document groups" ON document_groups
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for document_files
CREATE POLICY "Users can view their own document files" ON document_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own document files" ON document_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own document files" ON document_files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own document files" ON document_files
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Create storage policies
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents" ON storage.objects
  FOR UPDATE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

