-- Create saved_rebates table
CREATE TABLE IF NOT EXISTS saved_rebates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rebate_id TEXT NOT NULL,
  rebate_name TEXT NOT NULL,
  rebate_provider TEXT NOT NULL,
  rebate_amount TEXT NOT NULL,
  rebate_url TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_saved_rebates_user_id ON saved_rebates(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_rebates_rebate_id ON saved_rebates(rebate_id);

-- Enable Row Level Security
ALTER TABLE saved_rebates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own saved rebates" ON saved_rebates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved rebates" ON saved_rebates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved rebates" ON saved_rebates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved rebates" ON saved_rebates
  FOR DELETE USING (auth.uid() = user_id);

