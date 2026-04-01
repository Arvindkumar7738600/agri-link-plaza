
-- Create hires table for farmer hiring
CREATE TABLE public.hires (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  farmer_name text NOT NULL,
  farmer_location text,
  farmer_skills text[],
  client_name text NOT NULL,
  client_phone text NOT NULL,
  client_address text,
  hire_date date NOT NULL,
  hire_time text NOT NULL,
  duration_type text NOT NULL DEFAULT 'daily',
  rate text,
  special_requirements text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hires ENABLE ROW LEVEL SECURITY;

-- Users can create their own hires
CREATE POLICY "Users can create their own hires" ON public.hires FOR INSERT TO public WITH CHECK (auth.uid() = user_id);

-- Users can view their own hires
CREATE POLICY "Users can view their own hires" ON public.hires FOR SELECT TO public USING (auth.uid() = user_id);

-- Users can update their own hires
CREATE POLICY "Users can update their own hires" ON public.hires FOR UPDATE TO public USING (auth.uid() = user_id);
