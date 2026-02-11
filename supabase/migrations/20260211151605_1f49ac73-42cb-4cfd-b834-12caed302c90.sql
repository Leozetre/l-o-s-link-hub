
-- Table for tracking link clicks (public, no auth required)
CREATE TABLE public.link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_name TEXT NOT NULL,
  link_category TEXT NOT NULL DEFAULT 'other',
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (tracking doesn't need auth)
CREATE POLICY "Anyone can insert click events"
ON public.link_clicks
FOR INSERT
WITH CHECK (true);

-- No select/update/delete for anonymous users
-- Only readable via service role (edge function or dashboard)

-- Index for analytics queries
CREATE INDEX idx_link_clicks_name ON public.link_clicks (link_name);
CREATE INDEX idx_link_clicks_created ON public.link_clicks (created_at DESC);
CREATE INDEX idx_link_clicks_category ON public.link_clicks (link_category);
