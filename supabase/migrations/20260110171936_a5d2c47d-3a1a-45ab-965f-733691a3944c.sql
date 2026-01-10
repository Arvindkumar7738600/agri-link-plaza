-- Create enum for provider types
CREATE TYPE public.provider_type AS ENUM ('equipment_owner', 'skilled_farmer', 'expert_farmer', 'fpo_provider');

-- Create enum for approval status
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create providers table (main registration info)
CREATE TABLE public.providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  provider_type provider_type NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  phone_verified BOOLEAN NOT NULL DEFAULT false,
  address TEXT,
  district TEXT,
  state TEXT,
  pincode TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  identity_proof_type TEXT,
  identity_proof_url TEXT,
  profile_photo_url TEXT,
  approval_status approval_status NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create equipment listings table
CREATE TABLE public.equipment_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  equipment_type TEXT NOT NULL,
  equipment_name TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  power_capacity TEXT,
  features TEXT[],
  hourly_rate DECIMAL(10, 2),
  daily_rate DECIMAL(10, 2),
  availability_status TEXT NOT NULL DEFAULT 'available',
  photos TEXT[],
  location TEXT,
  district TEXT,
  state TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skilled farmer profiles table
CREATE TABLE public.skilled_farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  skills TEXT[] NOT NULL,
  experience_years INTEGER,
  languages TEXT[],
  specialties TEXT[],
  hourly_rate DECIMAL(10, 2),
  daily_rate DECIMAL(10, 2),
  availability_status TEXT NOT NULL DEFAULT 'available',
  bio TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert farmer profiles table (premium profiles)
CREATE TABLE public.expert_farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  qualifications TEXT[],
  expertise_areas TEXT[] NOT NULL,
  consultation_modes TEXT[], -- online, in-person, phone
  consultation_fee DECIMAL(10, 2),
  experience_years INTEGER,
  languages TEXT[],
  certifications TEXT[],
  bio TEXT,
  is_verified_expert BOOLEAN NOT NULL DEFAULT false,
  availability_status TEXT NOT NULL DEFAULT 'available',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FPO provider profiles table
CREATE TABLE public.fpo_provider_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  fpo_name TEXT NOT NULL,
  registration_number TEXT,
  member_count INTEGER,
  services_offered TEXT[],
  crops_handled TEXT[],
  operating_areas TEXT[],
  contact_person TEXT,
  contact_phone TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skilled_farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fpo_provider_profiles ENABLE ROW LEVEL SECURITY;

-- Providers policies
CREATE POLICY "Users can view their own provider profile"
ON public.providers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own provider profile"
ON public.providers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own provider profile"
ON public.providers FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved providers"
ON public.providers FOR SELECT
USING (approval_status = 'approved');

-- Equipment listings policies
CREATE POLICY "Anyone can view active equipment from approved providers"
ON public.equipment_listings FOR SELECT
USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.approval_status = 'approved'
  )
);

CREATE POLICY "Providers can manage their own equipment"
ON public.equipment_listings FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.user_id = auth.uid()
  )
);

-- Skilled farmer profiles policies
CREATE POLICY "Anyone can view active skilled farmers from approved providers"
ON public.skilled_farmer_profiles FOR SELECT
USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.approval_status = 'approved'
  )
);

CREATE POLICY "Providers can manage their own skilled farmer profile"
ON public.skilled_farmer_profiles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.user_id = auth.uid()
  )
);

-- Expert farmer profiles policies
CREATE POLICY "Anyone can view active expert farmers from approved providers"
ON public.expert_farmer_profiles FOR SELECT
USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.approval_status = 'approved'
  )
);

CREATE POLICY "Providers can manage their own expert farmer profile"
ON public.expert_farmer_profiles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.user_id = auth.uid()
  )
);

-- FPO provider profiles policies
CREATE POLICY "Anyone can view active FPO profiles from approved providers"
ON public.fpo_provider_profiles FOR SELECT
USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.approval_status = 'approved'
  )
);

CREATE POLICY "Providers can manage their own FPO profile"
ON public.fpo_provider_profiles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.providers p 
    WHERE p.id = provider_id AND p.user_id = auth.uid()
  )
);

-- Create storage bucket for provider documents
INSERT INTO storage.buckets (id, name, public) VALUES ('provider-documents', 'provider-documents', true);

-- Storage policies for provider documents
CREATE POLICY "Anyone can view provider documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'provider-documents');

CREATE POLICY "Authenticated users can upload provider documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'provider-documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own provider documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'provider-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create trigger for updated_at
CREATE TRIGGER update_providers_updated_at
BEFORE UPDATE ON public.providers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_equipment_listings_updated_at
BEFORE UPDATE ON public.equipment_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skilled_farmer_profiles_updated_at
BEFORE UPDATE ON public.skilled_farmer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_farmer_profiles_updated_at
BEFORE UPDATE ON public.expert_farmer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fpo_provider_profiles_updated_at
BEFORE UPDATE ON public.fpo_provider_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();