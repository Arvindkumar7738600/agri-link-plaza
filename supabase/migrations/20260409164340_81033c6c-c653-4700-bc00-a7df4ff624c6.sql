
-- Chat messages table for storing conversation history
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_chat_messages_user_session ON public.chat_messages (user_id, session_id, created_at);

-- Equipment images table
CREATE TABLE public.equipment_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_listing_id UUID NOT NULL REFERENCES public.equipment_listings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.equipment_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view equipment images"
  ON public.equipment_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.equipment_listings el
    JOIN public.providers p ON p.id = el.provider_id
    WHERE el.id = equipment_images.equipment_listing_id
      AND el.is_active = true
      AND p.approval_status = 'approved'
  ));

CREATE POLICY "Providers can manage their own equipment images"
  ON public.equipment_images FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.providers p
    WHERE p.id = equipment_images.provider_id
      AND p.user_id = auth.uid()
  ));

CREATE INDEX idx_equipment_images_listing ON public.equipment_images (equipment_listing_id, display_order);
