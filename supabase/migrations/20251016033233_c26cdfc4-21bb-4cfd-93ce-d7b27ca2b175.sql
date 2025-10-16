-- Create quotes table
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  project_name TEXT NOT NULL,
  project_type TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  amount DECIMAL(10, 2),
  approved_amount DECIMAL(10, 2),
  square_footage DECIMAL(10, 2),
  material_cost DECIMAL(10, 2),
  labor_cost DECIMAL(10, 2),
  rebate_amount DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_photos table
CREATE TABLE public.quote_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_measurements table
CREATE TABLE public.quote_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  length DECIMAL(10, 2),
  width DECIMAL(10, 2),
  measurement_type TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rebates table
CREATE TABLE public.rebates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  building_type TEXT,
  incentive_amount DECIMAL(10, 2),
  due_date DATE,
  is_saved BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extend profiles table with settings fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS billing_address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS billing_city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS billing_state TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS billing_zip_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light';

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rebates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quotes
CREATE POLICY "Users can view their own quotes"
  ON public.quotes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes"
  ON public.quotes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quotes"
  ON public.quotes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for quote_photos
CREATE POLICY "Users can view their own quote photos"
  ON public.quote_photos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quote photos"
  ON public.quote_photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quote photos"
  ON public.quote_photos FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for quote_measurements
CREATE POLICY "Users can view their own quote measurements"
  ON public.quote_measurements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quote measurements"
  ON public.quote_measurements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quote measurements"
  ON public.quote_measurements FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quote measurements"
  ON public.quote_measurements FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for rebates
CREATE POLICY "Users can view their own rebates"
  ON public.rebates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rebates"
  ON public.rebates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rebates"
  ON public.rebates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rebates"
  ON public.rebates FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger for quotes
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create updated_at trigger for rebates
CREATE TRIGGER update_rebates_updated_at
  BEFORE UPDATE ON public.rebates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();